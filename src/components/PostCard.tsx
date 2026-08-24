import Link from "next/link";
import {
  formatPostDate,
  readingLabel,
  type Post,
} from "@/lib/content";

type PostCardProps = {
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="post-card" lang={post.language}>
      <Link className="post-card__link" href={`/${post.slug}`}>
        <time className="post-card__date" dateTime={post.date}>
          {formatPostDate(post.date, post.language)}
        </time>
        <div className="post-card__content">
          <h3>{post.title}</h3>
          <p>{post.description}</p>
        </div>
        <span className="post-card__reading">
          {readingLabel(post.readingMinutes, post.language)}
          <span aria-hidden="true">↗</span>
        </span>
      </Link>
    </article>
  );
}
