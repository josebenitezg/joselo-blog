import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
        <div style={{ color: "#b9d7c5", display: "flex", fontSize: 28 }}>
          joselo.blog
        </div>
        <div style={{ display: "flex", fontFamily: "Georgia", fontSize: 92 }}>
          Unfinished thoughts,
          <br />
          kept in public.
        </div>
        <div style={{ color: "#9a9992", display: "flex", fontSize: 24 }}>
          José Benítez · Notes on technology, discipline, and meaning
        </div>
      </div>
    ),
    size,
  );
}
