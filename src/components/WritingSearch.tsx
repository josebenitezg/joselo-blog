"use client";

import { useDeferredValue, useMemo, useState } from "react";
import Link from "next/link";

export type SearchPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  displayDate: string;
  readingLabel: string;
  tags: string[];
  kind: string;
  language: "en" | "es";
};

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase();
}

export function WritingSearch({ posts }: { posts: SearchPost[] }) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const results = useMemo(() => {
    const needle = normalize(deferredQuery.trim());
    if (!needle) return posts;

    return posts.filter((post) =>
      normalize(
        [post.title, post.description, post.kind, ...post.tags].join(" "),
      ).includes(needle),
    );
  }, [deferredQuery, posts]);

  return (
    <div className="writing-search">
      <label className="search-field">
        <span className="sr-only">Search writing</span>
        <span aria-hidden="true">⌕</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by idea or topic"
          autoComplete="off"
        />
      </label>
      <p className="search-status" aria-live="polite">
        {results.length} {results.length === 1 ? "piece" : "pieces"}
      </p>
      {results.length > 0 ? (
        <ol className="writing-list">
          {results.map((post, index) => (
            <li key={post.slug}>
              <article className="writing-row" lang={post.language}>
                <span className="writing-row__number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="writing-row__meta">
                    <span>{post.kind}</span>
                    <time dateTime={post.date}>{post.displayDate}</time>
                  </p>
                  <h2>
                    <Link href={`/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="writing-row__description">{post.description}</p>
                  <div className="tag-list" aria-label="Topics">
                    {post.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
                <span className="writing-row__reading">{post.readingLabel}</span>
              </article>
            </li>
          ))}
        </ol>
      ) : (
        <div className="empty-state">
          <p>No notes match “{query}”.</p>
          <button type="button" onClick={() => setQuery("")}>
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}
