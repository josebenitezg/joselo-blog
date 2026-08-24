import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
    <article className="post-page" lang={post.language}>
      <header className="post-header shell">
        <Link className="back-link" href="/writing">
          <span aria-hidden="true">←</span> All writing
        </Link>
        <div className="post-header__meta">
          <span>{post.kind}</span>
          <time dateTime={post.date}>{formatPostDate(post.date, post.language)}</time>
          <span>{readingLabel(post.readingMinutes, post.language)}</span>
        </div>
        <h1>{post.title}</h1>
        <p className="post-header__description">{post.description}</p>
        {post.tags.length > 0 ? (
          <div className="tag-list" aria-label="Topics">
            {post.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        ) : null}
      </header>
      {post.image ? (
        <div className="post-cover shell">
          <Image
            src={post.image}
            alt={post.imageAlt ?? ""}
            fill
            priority
            sizes="(max-width: 1120px) 100vw, 1080px"
          />
        </div>
      ) : null}
      <div className="post-body shell">
        <RichTextContent content={post.content} />
      </div>
      <footer className="post-end shell">
        <p>End note</p>
        <Link className="text-link" href="/writing">
          Continue reading <span aria-hidden="true">↗</span>
        </Link>
      </footer>
    </article>
  );
}
