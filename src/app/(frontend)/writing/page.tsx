import type { Metadata } from "next";
import { PostList } from "@/components/PostList";
import { getPublishedPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Writing",
  description: "Essays and notes by José Benítez.",
  alternates: { canonical: "/writing" },
};

export default async function WritingPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <header className="page-head">
        <h1>Writing</h1>
      </header>
      <PostList posts={posts} />
    </>
  );
}
