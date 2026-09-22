import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#000000",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <svg width="32" height="48" viewBox="0 0 12 18">
          <path d="M0 0H12V18L6 13.14L0 18Z" fill="#ededed" />
        </svg>
      </div>
    ),
    size,
  );
}
