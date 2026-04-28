import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/**
 * App icon (favicon at all standard sizes). Renders the E-Arrow mark.
 * Next.js automatically generates appropriate <link rel="icon"> tags.
 * For 16px display the OS / browser scales this down — the chunky strokes
 * survive the scale.
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
          position: "relative",
        }}
      >
        <svg width="64" height="64" viewBox="0 0 64 64">
          <rect x="14" y="14" width="6" height="36" rx="1.5" fill="#ffffff" />
          <rect x="14" y="14" width="22" height="6" rx="1.5" fill="#ffffff" />
          <rect x="14" y="29" width="18" height="5" rx="1.5" fill="#ffffff" />
          <rect x="14" y="44" width="22" height="6" rx="1.5" fill="#ffffff" />
          <path
            d="M36 17 L46 11 L52 14"
            stroke="#ffffff"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <circle cx="52" cy="14" r="4" fill="#10b981" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
