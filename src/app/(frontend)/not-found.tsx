import Link from "next/link";

export default function NotFound() {
  return (
    <header className="page-head">
      <h1>This thought isn’t here.</h1>
      <p>
        It may still be a draft, or it may have moved.{" "}
        <Link href="/writing">See all writing</Link>.
      </p>
    </header>
  );
}
