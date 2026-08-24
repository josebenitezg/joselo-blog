import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import config from "@payload-config";
import {
  convertMarkdownToLexical,
  editorConfigFactory,
} from "@payloadcms/richtext-lexical";
import { getPayload } from "payload";

import type { Page, Post } from "@/payload-types";
import {
  getAdminSeedConfig,
  helloWorldCoverSeedKey,
} from "@/seed/settings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const fixturesDirectory = path.join(dirname, "fixtures");
const wordPattern = /[\p{L}\p{N}]+/gu;

type Frontmatter = Record<string, unknown>;

function parseFixture(source: string) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error("Seed fixture is missing frontmatter.");

  const metadata: Frontmatter = {};
  for (const line of match[1].split("\n")) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    const rawValue = line.slice(separator + 1).trim();

    try {
      metadata[key] = JSON.parse(rawValue);
    } catch {
      metadata[key] = rawValue;
    }
  }

  return { metadata, markdown: match[2].trim() };
}

function requiredString(metadata: Frontmatter, key: string) {
  const value = metadata[key];
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`Fixture field "${key}" must be a non-empty string.`);
  }
  return value;
}

function stringArray(metadata: Frontmatter, key: string) {
  const value = metadata[key];
  if (!Array.isArray(value)) return [];
  return value.filter((entry): entry is string => typeof entry === "string");
}

function readingMinutes(markdown: string) {
  const words = markdown.match(wordPattern)?.length ?? 0;
  return Math.max(1, Math.ceil(words / 210));
}

function sourceHash(source: string) {
  return createHash("sha256").update(source).digest("hex");
}

function injectEquationBlocks(
  content: Post["content"] | Page["content"],
  formulas: Map<string, string>,
) {
  const root = content.root as typeof content.root & { children: unknown[] };

  root.children = root.children.map((node) => {
    if (!node || typeof node !== "object" || !("children" in node)) return node;
    const children = (node as { children?: unknown[] }).children;
    if (!Array.isArray(children) || children.length !== 1) return node;
    const textNode = children[0];
    if (!textNode || typeof textNode !== "object" || !("text" in textNode)) return node;
    const marker = (textNode as { text?: unknown }).text;
    if (typeof marker !== "string") return node;
    const formula = formulas.get(marker);
    if (!formula) return node;

    return {
      type: "block",
      version: 2,
      format: "",
      fields: {
        id: `equation-${marker.toLowerCase()}`,
        blockName: "",
        blockType: "equation",
        formula,
        display: true,
      },
    };
  });

  return content;
}

async function markdownToLexical(
  markdown: string,
  payloadConfig: Awaited<typeof config>,
) {
  const formulas = new Map<string, string>();
  const preparedMarkdown = markdown.replace(
    /\$\$\s*([\s\S]*?)\s*\$\$/g,
    (_match, formula: string) => {
      const marker = `PAYLOADFORMULA${String(formulas.size).padStart(4, "0")}END`;
      formulas.set(marker, formula.trim());
      return `\n\n${marker}\n\n`;
    },
  );
  const editorConfig = await editorConfigFactory.default({ config: payloadConfig });
  const content = convertMarkdownToLexical({
    editorConfig,
    markdown: preparedMarkdown,
  }) as Post["content"];

  return injectEquationBlocks(content, formulas);
}

async function seed() {
  const payload = await getPayload({ config });

  const adminSeed = getAdminSeedConfig();
  if (adminSeed) {
    const existingAdmin = await payload.find({
      collection: "users",
      limit: 1,
      overrideAccess: true,
      pagination: false,
      where: { email: { equals: adminSeed.email } },
    });
    if (existingAdmin.docs.length === 0) {
      await payload.create({
        collection: "users",
        overrideAccess: true,
        data: {
          email: adminSeed.email,
          name: "José Benítez",
          password: adminSeed.password,
        },
      });
    }
  }

  const mediaResult = await payload.find({
    collection: "media",
    limit: 1,
    overrideAccess: true,
    pagination: false,
    where: { seedKey: { equals: helloWorldCoverSeedKey } },
  });
  const existingMedia = mediaResult.docs[0];
  const helloWorldMedia = existingMedia
    ? existingMedia
    : await payload.create({
        collection: "media",
        overrideAccess: true,
        data: {
          alt: "Abstract blue AI network",
          seedKey: helloWorldCoverSeedKey,
        },
        filePath: path.resolve(process.cwd(), "public/images/posts/hello-world.jpg"),
      });

  const postFiles = (await readdir(path.join(fixturesDirectory, "posts")))
    .filter((entry) => entry.endsWith(".mdx"))
    .sort();

  for (const fixtureName of postFiles) {
    const slug = fixtureName.replace(/\.mdx$/, "");
    const source = await readFile(
      path.join(fixturesDirectory, "posts", fixtureName),
      "utf8",
    );
    const { metadata, markdown } = parseFixture(source);
    const language = metadata.language === "es" ? "es" : "en";
    const rawKind = metadata.kind;
    const kind = rawKind === "note" || rawKind === "experiment" ? rawKind : "essay";
    const status = metadata.draft === true ? "draft" : "published";
    const image = typeof metadata.image === "string" ? metadata.image : "";
    const data = {
      title: requiredString(metadata, "title"),
      slug,
      description: requiredString(metadata, "description"),
      publishedAt: new Date(
        `${requiredString(metadata, "date")}T12:00:00.000Z`,
      ).toISOString(),
      language,
      kind,
      tags: stringArray(metadata, "tags").map((value) => ({ value })),
      cover: image ? helloWorldMedia.id : null,
      readingMinutes: readingMinutes(markdown),
      content: await markdownToLexical(markdown, payload.config),
      sourceHash: sourceHash(source),
      _status: status,
    } as const;
    const existing = await payload.find({
      collection: "posts",
      limit: 1,
      overrideAccess: true,
      pagination: false,
      where: { slug: { equals: slug } },
    });

    if (existing.docs[0]?.sourceHash === data.sourceHash) {
      continue;
    }

    if (existing.docs[0]) {
      await payload.update({
        collection: "posts",
        id: existing.docs[0].id,
        overrideAccess: true,
        draft: status === "draft",
        data,
      });
    } else {
      await payload.create({
        collection: "posts",
        overrideAccess: true,
        draft: status === "draft",
        data,
      });
    }
  }

  const pageFiles = (await readdir(path.join(fixturesDirectory, "pages")))
    .filter((entry) => entry.endsWith(".mdx"))
    .sort();

  for (const fixtureName of pageFiles) {
    const slug = fixtureName.replace(/\.mdx$/, "") as "about" | "lab";
    const source = await readFile(
      path.join(fixturesDirectory, "pages", fixtureName),
      "utf8",
    );
    const { metadata, markdown } = parseFixture(source);
    const data = {
      title: requiredString(metadata, "title"),
      slug,
      headline: requiredString(metadata, "headline"),
      description: requiredString(metadata, "description"),
      content: await markdownToLexical(markdown, payload.config),
      sourceHash: sourceHash(source),
      _status: "published" as const,
    };
    const existing = await payload.find({
      collection: "pages",
      limit: 1,
      overrideAccess: true,
      pagination: false,
      where: { slug: { equals: slug } },
    });

    if (existing.docs[0]?.sourceHash === data.sourceHash) {
      continue;
    }

    if (existing.docs[0]) {
      await payload.update({
        collection: "pages",
        id: existing.docs[0].id,
        overrideAccess: true,
        draft: false,
        data,
      });
    } else {
      await payload.create({
        collection: "pages",
        overrideAccess: true,
        draft: false,
        data,
      });
    }
  }

  payload.logger.info(
    `Seed complete: ${postFiles.length} posts, ${pageFiles.length} pages, media preserved.`,
  );
}

await seed();
