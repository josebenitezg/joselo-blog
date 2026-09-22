import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RichTextContent } from "@/components/RichTextContent";
import { getPageBySlug } from "@/lib/content";

export const metadata: Metadata = {
  title: "Personal lab",
  description:
    "Personal notes on technology, self-experimentation, and human performance. Not medical advice.",
  alternates: { canonical: "/lab" },
};

export default async function LabPage() {
  const page = await getPageBySlug("lab");
  if (!page) notFound();

  return (
    <article>
      <header className="page-head">
        <h1>{page.headline}</h1>
        <p role="note">
          <strong>Not medical advice.</strong> Personal experiments only — not
          recommendations, and not a substitute for professional care.
        </p>
      </header>
      <RichTextContent content={page.content} />
    </article>
  );
}
