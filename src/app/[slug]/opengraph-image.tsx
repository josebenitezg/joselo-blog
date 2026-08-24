import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { getPublishedPostBySlug } from "@/lib/content";

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
          background: "#090a0a",
          color: "#f1efe9",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "72px 80px",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "#b9d7c5",
            display: "flex",
            fontSize: 25,
            justifyContent: "space-between",
          }}
        >
          <span>joselo.blog</span>
          <span>{post.kind}</span>
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "Georgia",
            fontSize: post.title.length > 58 ? 64 : 78,
            lineHeight: 1.02,
            maxWidth: 1000,
          }}
        >
          {post.title}
        </div>
        <div style={{ color: "#9a9992", display: "flex", fontSize: 24 }}>
          José Benítez · {post.date}
        </div>
      </div>
    ),
    size,
  );
}
