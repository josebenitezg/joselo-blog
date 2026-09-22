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
        <svg width="40" height="60" viewBox="0 0 12 18">
          <path d="M0 0H12V18L6 13.14L0 18Z" fill="#ededed" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 88, letterSpacing: -2, lineHeight: 1.1 }}>
            José Benítez
          </div>
          <div style={{ color: "#a1a1a1", display: "flex", fontSize: 36, marginTop: 16 }}>
            Thinking out loud · joselo.blog
          </div>
        </div>
      </div>
    ),
    size,
  );
}
