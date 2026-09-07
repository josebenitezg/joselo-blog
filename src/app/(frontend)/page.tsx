import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { getPublishedPosts } from "@/lib/content";

export default async function HomePage() {
  const posts = await getPublishedPosts();
  const latestPosts = posts.slice(0, 3);

  return (
    <>
      <section className="hero shell">
        <div className="hero__words">
          <p className="eyebrow">A small corner of the internet</p>
          <h1>José Benítez.<br /><span>Thinking out loud.</span></h1>
          <p className="hero__description">
            Notes on technology, discipline, and being human.
            A place to work things out, one thought at a time.
          </p>
          <p className="hero__language">In English &amp; español.</p>
        </div>
      </section>

      <section className="latest shell" aria-labelledby="latest-heading">
        <div className="section-heading">
          <h2 id="latest-heading">Writing</h2>
          <Link className="text-link" href="/writing">
            View all
          </Link>
        </div>
        <div className="post-grid">
          {latestPosts.length ? latestPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          )) : <p className="journal-empty">A fresh page. The first notes will be here soon.</p>}
        </div>
      </section>

      <section className="lab-callout shell" aria-labelledby="lab-heading">
        <div>
          <p className="eyebrow">An ongoing experiment</p>
          <h2 id="lab-heading">The personal lab.</h2>
        </div>
        <div>
          <p>
            Notes on sleep, recovery, attention, environment, and metabolic
            signals — documented as personal experiments, never medical advice.
          </p>
          <Link className="text-link" href="/lab">
            Explore the lab
          </Link>
        </div>
      </section>
    </>
  );
}
