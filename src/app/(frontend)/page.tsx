import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { getPublishedPosts } from "@/lib/content";

export default async function HomePage() {
  const posts = await getPublishedPosts();
  const latestPosts = posts.slice(0, 3);

  return (
    <>
      <section className="hero shell">
        <p className="eyebrow">A personal publication by José Benítez</p>
        <h1>
          Unfinished thoughts,
          <br />
          <em>kept in public.</em>
        </h1>
        <div className="hero__footer">
          <p>
            Essays on discipline, technology, meaning, and the experiments in
            between. Written in English and Spanish.
          </p>
          <Link className="text-link" href="/writing">
            Start reading <span aria-hidden="true">↘</span>
          </Link>
        </div>
      </section>

      <section className="latest shell" aria-labelledby="latest-heading">
        <div className="section-heading">
          <h2 id="latest-heading">Latest writing</h2>
          <Link className="text-link" href="/writing">
            All writing <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="post-grid">
          {latestPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="lab-callout shell" aria-labelledby="lab-heading">
        <div>
          <p className="eyebrow">A personal lab</p>
          <h2 id="lab-heading">Curiosity, measured carefully.</h2>
        </div>
        <div>
          <p>
            Notes on sleep, recovery, attention, environment, and metabolic
            signals — documented as personal experiments, never medical advice.
          </p>
          <Link className="text-link" href="/lab">
            Enter the lab <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}
