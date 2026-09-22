import Link from "next/link";
import { PostList } from "@/components/PostList";
import { getPublishedPosts } from "@/lib/content";

const HOME_LIMIT = 5;

export default async function HomePage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <header className="page-head">
        <h1>José Benítez</h1>
        <p>
          Thinking out loud about technology, discipline, and being human — in
          English and <span lang="es">español</span>.
        </p>
      </header>
      <PostList posts={posts.slice(0, HOME_LIMIT)} />
      {posts.length > HOME_LIMIT ? (
        <p className="more">
          <Link href="/writing">All writing</Link>
        </p>
      ) : null}
    </>
  );
}
