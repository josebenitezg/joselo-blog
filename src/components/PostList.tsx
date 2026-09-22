import Link from "next/link";
import { formatPostDate, type Post } from "@/lib/content";

export function PostList({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return <p>The first notes will be here soon.</p>;
  }

  return (
    // role="list" keeps list semantics in Safari/VoiceOver with list-style: none.
    <ul className="post-list" role="list">
      {posts.map((post) => (
        <li key={post.slug} lang={post.language}>
          <time className="meta" dateTime={post.date}>
            {formatPostDate(post.date, post.language)}
          </time>
          <h2>
            <Link href={`/${post.slug}`}>{post.title}</Link>
          </h2>
          <p>{post.description}</p>
        </li>
      ))}
    </ul>
  );
}
