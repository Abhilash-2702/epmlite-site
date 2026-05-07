import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "NashOS — AI-native financial planning";
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

        {/* Top: wordmark only — Mercury/Brex aesthetic */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            zIndex: 1,
            fontSize: "44px",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            color: "#ffffff",
          }}
        >
          <span style={{ display: "flex" }}>Nash</span>
          <span style={{ display: "flex", color: "#5694ff", margin: "0 8px" }}>·</span>
          <span style={{ display: "flex" }}>OS</span>
          <span
            style={{
              display: "flex",
              width: "16px",
              height: "16px",
              background: "#10b981",
              borderRadius: "3px",
              marginLeft: "12px",
              alignSelf: "center",
            }}
          />
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
            Agentic Finance
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
            <div style={{ display: "flex" }}>Reports in days, not weeks.</div>
            <div style={{ display: "flex", color: "#8cbaff" }}>
              Forecasts in minutes.
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
            nashos.ai
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
