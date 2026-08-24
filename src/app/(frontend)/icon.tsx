import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#b9d7c5",
          color: "#090a0a",
          display: "flex",
          fontFamily: "Georgia",
          fontSize: 42,
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        j.
      </div>
    ),
    size,
  );
}
