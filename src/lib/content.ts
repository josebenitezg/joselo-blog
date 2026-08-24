import { cache } from "react";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type PostLanguage = "en" | "es";
export type PostKind = "essay" | "note" | "experiment";

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  image?: string;
  draft: boolean;
  language: PostLanguage;
  kind: PostKind;
  body: string;
  readingMinutes: number;
};

export type ContentPage = {
  slug: string;
  title: string;
  headline: string;
  description: string;
  body: string;
};

const postsDirectory = path.join(process.cwd(), "content/posts");
const pagesDirectory = path.join(process.cwd(), "content/pages");
const WORD_PATTERN = /[\p{L}\p{N}]+/gu;

function asString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function asDateString(value: unknown) {
  if (value instanceof Date && !Number.isNaN(value.valueOf())) {
    return value.toISOString().slice(0, 10);
  }

  return asString(value, "1970-01-01").slice(0, 10);
}

function asStringArray(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (entry): entry is string => typeof entry === "string" && entry.trim() !== "",
  );
}

function asLanguage(value: unknown): PostLanguage {
  return value === "es" ? "es" : "en";
}

function asKind(value: unknown): PostKind {
  if (value === "note" || value === "experiment") return value;
  return "essay";
}

function estimateReadingMinutes(body: string) {
  const words = body.match(WORD_PATTERN)?.length ?? 0;
  return Math.max(1, Math.ceil(words / 210));
}

function parsePost(slug: string, source: string): Post {
  const { data, content } = matter(source);
  const image = asString(data.image);

  return {
    slug,
    title: asString(data.title, "Untitled"),
    description: asString(data.description),
    date: asDateString(data.date),
    tags: asStringArray(data.tags),
    image: image || undefined,
    draft: data.draft === true,
    language: asLanguage(data.language),
    kind: asKind(data.kind),
    body: content.trim(),
    readingMinutes: estimateReadingMinutes(content),
  };
}

export const getAllPosts = cache(async (): Promise<Post[]> => {
  const fileNames = await readdir(postsDirectory);
  const posts = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith(".mdx"))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.mdx$/, "");
        const source = await readFile(path.join(postsDirectory, fileName), "utf8");
        return parsePost(slug, source);
      }),
  );

  return posts.toSorted((a, b) => b.date.localeCompare(a.date));
});

export async function getPublishedPosts() {
  return (await getAllPosts()).filter((post) => !post.draft);
}

export async function getPublishedPostBySlug(slug: string) {
  return (await getPublishedPosts()).find((post) => post.slug === slug) ?? null;
}

export const getPageBySlug = cache(
  async (slug: string): Promise<ContentPage | null> => {
    try {
      const source = await readFile(path.join(pagesDirectory, `${slug}.mdx`), "utf8");
      const { data, content } = matter(source);

      return {
        slug,
        title: asString(data.title, "Untitled"),
        headline: asString(data.headline),
        description: asString(data.description),
        body: content.trim(),
      };
    } catch (error) {
      const code = (error as NodeJS.ErrnoException).code;
      if (code === "ENOENT") return null;
      throw error;
    }
  },
);

export function formatPostDate(date: string, language: PostLanguage) {
  return new Intl.DateTimeFormat(language === "es" ? "es-ES" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
}

export function readingLabel(minutes: number, language: PostLanguage) {
  return language === "es" ? `${minutes} min de lectura` : `${minutes} min read`;
}
