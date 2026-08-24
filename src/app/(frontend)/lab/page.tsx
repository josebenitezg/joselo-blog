import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RichTextContent } from "@/components/RichTextContent";
import { PageIntro } from "@/components/PageIntro";
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
    <>
      <PageIntro
        eyebrow="Personal lab · Not medical advice"
        title={page.headline}
        description={page.description}
      />
      <article className="page-body shell">
        <RichTextContent content={page.content} />
      </article>
    </>
  );
}
