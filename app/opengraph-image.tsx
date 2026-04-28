import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "EPM Lite — AI-native financial planning";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(135deg, #133de1 0%, #182f8f 55%, #131f57 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
          padding: "72px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative background shapes */}
        <div
          style={{
            position: "absolute",
            top: "-160px",
            right: "-160px",
            width: "520px",
            height: "520px",
            borderRadius: "999px",
            background: "rgba(46, 111, 255, 0.35)",
            filter: "blur(60px)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-200px",
            left: "-100px",
            width: "460px",
            height: "460px",
            borderRadius: "999px",
            background: "rgba(139, 92, 246, 0.25)",
            filter: "blur(70px)",
            display: "flex",
          }}
        />

        {/* Top: logo + wordmark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "#2e6fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
            }}
          >
            <svg width="44" height="44" viewBox="0 0 64 64">
              {/* E body */}
              <rect x="14" y="14" width="6" height="36" rx="1.5" fill="#ffffff" />
              <rect x="14" y="14" width="22" height="6" rx="1.5" fill="#ffffff" />
              <rect x="14" y="29" width="18" height="5" rx="1.5" fill="#ffffff" />
              <rect x="14" y="44" width="22" height="6" rx="1.5" fill="#ffffff" />
              {/* Arrow extension */}
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
          <div
            style={{
              fontSize: "32px",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              display: "flex",
            }}
          >
            EPM Lite
          </div>
        </div>

        {/* Center: tagline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            zIndex: 1,
            marginTop: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "18px",
              fontWeight: 600,
              color: "#bbd5ff",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "999px",
                background: "#10b981",
                display: "flex",
              }}
            />
            AI-native FP&amp;A
          </div>
          <div
            style={{
              fontSize: "84px",
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex" }}>Close the books in days.</div>
            <div style={{ display: "flex", color: "#8cbaff" }}>
              Forecast in minutes.
            </div>
          </div>
          <div
            style={{
              fontSize: "26px",
              fontWeight: 500,
              color: "#d9e8ff",
              marginTop: "28px",
              lineHeight: 1.3,
              maxWidth: "880px",
              display: "flex",
            }}
          >
            For finance teams who want plain-English answers, not 12-tab
            spreadsheets.
          </div>
        </div>

        {/* Bottom row: URL + chart accent */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: "22px",
              fontWeight: 600,
              color: "#bbd5ff",
              letterSpacing: "-0.01em",
              display: "flex",
            }}
          >
            epmlite.com
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
            }}
          >
            <div
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#bbd5ff",
                display: "flex",
              }}
            >
              35+ AI tools · 15 forecast algorithms · 9-dim cube
            </div>
            <svg width="120" height="40" viewBox="0 0 120 40">
              <path
                d="M2 32 L20 26 L38 28 L56 18 L74 14 L92 10 L116 4"
                stroke="#ffffff"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                opacity="0.9"
              />
              <circle cx="116" cy="4" r="4" fill="#10b981" />
            </svg>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
