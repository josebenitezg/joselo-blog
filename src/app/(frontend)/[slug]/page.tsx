import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { RichTextContent } from "@/components/RichTextContent";
import {
  formatPostDate,
  getPublishedPostBySlug,
  readingLabel,
} from "@/lib/content";
import { absoluteUrl, siteConfig } from "@/lib/site";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return { title: "Post not found" };

  const url = absoluteUrl(`/${post.slug}`);
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [siteConfig.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  return (
    <article lang={post.language}>
      <header className="page-head">
        <h1>{post.title}</h1>
        <p className="meta">
          <time dateTime={post.date}>{formatPostDate(post.date, post.language)}</time>
          <span aria-hidden="true"> · </span>
          {readingLabel(post.readingMinutes, post.language)}
        </p>
      </header>
      {post.image ? (
        <Image
          className="cover"
          src={post.image}
          alt={post.imageAlt ?? ""}
          width={post.imageWidth ?? 1200}
          height={post.imageHeight ?? 800}
          preload
          sizes="(max-width: 41rem) calc(100vw - 3rem), 38rem"
        />
      ) : null}
      <RichTextContent content={post.content} />
    </article>
  );
}
