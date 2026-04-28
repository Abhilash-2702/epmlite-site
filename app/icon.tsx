import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/**
 * App icon — "EL" monogram on a brand-blue rounded square.
 * The site uses a wordmark for its primary brand; this monogram is the
 * compact form for favicons, app icons, social avatars.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#2e6fff",
          borderRadius: 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: 800,
          fontSize: 36,
          letterSpacing: "-0.06em",
          fontFamily: "sans-serif",
        }}
      >
        EL
      </div>
    ),
    { ...size }
  );
}
