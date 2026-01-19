import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "SubTrackr - Track & Manage All Your Subscriptions";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #FAFAF8 0%, #F5F0EB 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 20% 80%, rgba(123, 45, 66, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(123, 45, 66, 0.08) 0%, transparent 50%)",
          }}
        />

        {/* Logo Icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 120,
            height: 120,
            borderRadius: 28,
            background: "linear-gradient(135deg, #7B2D42 0%, #5a2132 100%)",
            marginBottom: 40,
            boxShadow: "0 20px 40px rgba(123, 45, 66, 0.3)",
          }}
        >
          <svg
            width="60"
            height="60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
            <line x1="1" y1="10" x2="23" y2="10" />
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#1A1A1A",
            marginBottom: 20,
            letterSpacing: "-2px",
          }}
        >
          SubTrackr
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            color: "#6B6B6B",
            marginBottom: 50,
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          Stop wasting money on forgotten subscriptions
        </div>

        {/* Features */}
        <div
          style={{
            display: "flex",
            gap: 40,
          }}
        >
          {["Track Spending", "Get Reminders", "Cancel Easy"].map((feature) => (
            <div
              key={feature}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: "white",
                padding: "16px 28px",
                borderRadius: 50,
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "#7B2D42",
                }}
              />
              <span style={{ fontSize: 22, color: "#1A1A1A", fontWeight: 500 }}>
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
