import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/MarkdownContent";
import { PageIntro } from "@/components/PageIntro";
import { getPageBySlug } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "About José Benítez and this personal publication.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const page = await getPageBySlug("about");
  if (!page) notFound();

  return (
    <>
      <PageIntro
        eyebrow="About"
        title={page.headline}
        description={page.description}
      />
      <article className="page-body shell">
        <MarkdownContent source={page.body} />
      </article>
    </>
  );
}
