import config from "@payload-config";
import { draftMode } from "next/headers";
import { getPayload } from "payload";
import { cache } from "react";

import type { Media, Page as PayloadPage, Post as PayloadPost } from "@/payload-types";

export type PostLanguage = "en" | "es";
export type PostKind = "essay" | "note" | "experiment";

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
  language: PostLanguage;
  kind: PostKind;
  content: PayloadPost["content"];
  readingMinutes: number;
};

export type ContentPage = {
  slug: "about" | "lab";
  title: string;
  headline: string;
  description: string;
  content: PayloadPage["content"];
};

function mediaUrl(cover: PayloadPost["cover"]) {
  if (!cover || typeof cover === "number") return undefined;
  const media = cover as Media;
  return media.url ?? undefined;
}

function mediaAlt(cover: PayloadPost["cover"]) {
  if (!cover || typeof cover === "number") return undefined;
  return (cover as Media).alt;
}

function toPost(post: PayloadPost): Post {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.publishedAt.slice(0, 10),
    tags: post.tags?.map(({ value }) => value) ?? [],
    image: mediaUrl(post.cover),
    imageAlt: mediaAlt(post.cover),
    language: post.language,
    kind: post.kind,
    content: post.content,
    readingMinutes: post.readingMinutes,
  };
}

function toPage(page: PayloadPage): ContentPage {
  return {
    slug: page.slug,
    title: page.title,
    headline: page.headline,
    description: page.description,
    content: page.content,
  };
}

export const getPublishedPosts = cache(async (): Promise<Post[]> => {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "posts",
    depth: 1,
    limit: 100,
    overrideAccess: false,
    pagination: false,
    sort: "-publishedAt",
    where: {
      _status: {
        equals: "published",
      },
    },
  });

  return result.docs.map(toPost);
});

export const getPublishedPostBySlug = cache(async (slug: string) => {
  const preview = (await draftMode()).isEnabled;
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "posts",
    depth: 1,
    draft: preview,
    limit: 1,
    overrideAccess: preview,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
      ...(preview ? {} : { _status: { equals: "published" } }),
    },
  });

  return result.docs[0] ? toPost(result.docs[0]) : null;
});

export const getPageBySlug = cache(async (slug: "about" | "lab") => {
  const preview = (await draftMode()).isEnabled;
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "pages",
    depth: 0,
    draft: preview,
    limit: 1,
    overrideAccess: preview,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
      ...(preview ? {} : { _status: { equals: "published" } }),
    },
  });

  return result.docs[0] ? toPage(result.docs[0]) : null;
});

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
