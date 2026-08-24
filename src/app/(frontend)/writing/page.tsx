import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { WritingSearch, type SearchPost } from "@/components/WritingSearch";
import {
  formatPostDate,
  getPublishedPosts,
  readingLabel,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Writing",
  description: "Essays and notes by José Benítez.",
  alternates: { canonical: "/writing" },
};

export default async function WritingPage() {
  const posts = await getPublishedPosts();
  const searchPosts: SearchPost[] = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    displayDate: formatPostDate(post.date, post.language),
    readingLabel: readingLabel(post.readingMinutes, post.language),
    tags: post.tags,
    kind: post.kind,
    language: post.language,
  }));

  return (
    <>
      <PageIntro
        eyebrow="Archive"
        title="Writing"
        description="Personal essays, technical detours, and notes that became clearer by being written down."
      />
      <section className="shell archive" aria-label="Published writing">
        <WritingSearch posts={searchPosts} />
      </section>
    </>
  );
}
