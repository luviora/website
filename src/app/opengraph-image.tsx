import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const alt = `${SITE_NAME} | ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background: "linear-gradient(165deg, #0b2224 0%, #102d30 48%, #153a38 100%)",
          color: "#F8F8F4",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 36,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "#B8F5D5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#102D30",
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            N
          </div>
          {SITE_NAME}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 920 }}>
          <div
            style={{
              fontSize: 58,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            {SITE_TAGLINE}
          </div>
          <div style={{ fontSize: 28, color: "#B8F5D5", fontWeight: 600 }}>
            Simule em minutos e tenha as melhores propostas.
          </div>
        </div>

        <div style={{ fontSize: 22, color: "rgba(248,248,244,0.72)" }}>
          nuviora-sec.vercel.app
        </div>
      </div>
    ),
    { ...size },
  );
}
