import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { formatPostDate, getPublishedPostBySlug } from "@/lib/content";

export const alt = "joselo.blog essay";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type OpenGraphImageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PostOpenGraphImage({ params }: OpenGraphImageProps) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  return new ImageResponse(
    (
      <div
        style={{
          background: "#000000",
          color: "#ededed",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: 80,
          width: "100%",
        }}
      >
        <div style={{ alignItems: "center", display: "flex", justifyContent: "space-between" }}>
          <svg width="40" height="60" viewBox="0 0 12 18">
            <path d="M0 0H12V18L6 13.14L0 18Z" fill="#ededed" />
          </svg>
          <span style={{ color: "#a1a1a1", fontSize: 28 }}>joselo.blog</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: post.title.length > 58 ? 64 : 80,
              letterSpacing: -1.5,
              lineHeight: 1.1,
              maxWidth: 1000,
            }}
          >
            {post.title}
          </div>
          <div style={{ color: "#a1a1a1", display: "flex", fontSize: 28, marginTop: 24 }}>
            {`José Benítez · ${formatPostDate(post.date, post.language)}`}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
