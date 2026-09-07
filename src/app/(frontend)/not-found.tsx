import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found shell">
      <p className="eyebrow">404 · Lost note</p>
      <h1>This thought isn’t here.</h1>
      <p>It may still be a draft, or it may have moved somewhere else.</p>
      <Link className="text-link" href="/writing">
        Browse the archive
      </Link>
    </section>
  );
}
