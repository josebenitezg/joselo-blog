import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RichTextContent } from "@/components/RichTextContent";
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
    <article>
      <header className="page-head">
        <h1>{page.headline}</h1>
      </header>
      <RichTextContent content={page.content} />
    </article>
  );
}
