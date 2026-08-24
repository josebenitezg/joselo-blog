import Image from "next/image";
import Link from "next/link";
import {
  formatPostDate,
  readingLabel,
  type Post,
} from "@/lib/content";

type PostCardProps = {
  post: Post;
  index?: number;
  showImage?: boolean;
};

export function PostCard({ post, index, showImage = false }: PostCardProps) {
  return (
    <article
      className={`post-card${showImage && post.image ? " post-card--image" : ""}`}
      lang={post.language}
    >
      {showImage && post.image ? (
        <Link className="post-card__image" href={`/${post.slug}`} tabIndex={-1}>
          <Image
            src={post.image}
            alt={post.imageAlt ?? ""}
            fill
            sizes="(max-width: 760px) 100vw, 36vw"
          />
        </Link>
      ) : null}
      <div className="post-card__content">
        <div className="post-card__meta">
          {typeof index === "number" ? (
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          ) : null}
          <span>{post.kind}</span>
          <time dateTime={post.date}>{formatPostDate(post.date, post.language)}</time>
        </div>
        <h2>
          <Link href={`/${post.slug}`}>{post.title}</Link>
        </h2>
        <p>{post.description}</p>
        <div className="post-card__footer">
          <span>{readingLabel(post.readingMinutes, post.language)}</span>
          <Link className="text-link" href={`/${post.slug}`}>
            Read <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
