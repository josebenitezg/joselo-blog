import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { getPublishedPosts } from "@/lib/content";

export default async function HomePage() {
  const posts = await getPublishedPosts();
  const latestPosts = posts.slice(0, 3);

  return (
    <>
      <section className="hero shell">
        <div className="hero__copy">
          <p className="eyebrow">A personal publication by José Benítez</p>
          <h1>
            Unfinished thoughts,
            <br />
            <em>kept in public.</em>
          </h1>
        </div>
        <div className="hero__aside">
          <span className="hero__mark" aria-hidden="true">
            01
          </span>
          <p>
            Essays on discipline, technology, meaning, and the experiments in
            between. Written in English and Spanish.
          </p>
          <Link className="text-link" href="/about">
            About this place <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section className="latest shell" aria-labelledby="latest-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Recently published</p>
            <h2 id="latest-heading">Latest writing</h2>
          </div>
          <Link className="text-link" href="/writing">
            View all <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="post-grid">
          {latestPosts.map((post, index) => (
            <PostCard
              key={post.slug}
              post={post}
              index={index}
              showImage={index === 0}
            />
          ))}
        </div>
      </section>

      <section className="lab-callout shell" aria-labelledby="lab-heading">
        <div>
          <p className="eyebrow">Personal lab</p>
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
