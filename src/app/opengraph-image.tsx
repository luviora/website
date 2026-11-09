import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteCopy } from "@/content/site-copy";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const alt = `${SITE_NAME} | ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadPngDataUrl(relativePath: string) {
  const bytes = await readFile(join(process.cwd(), "public", relativePath));
  return `data:image/png;base64,${bytes.toString("base64")}`;
}

export default async function OpenGraphImage() {
  const [logoSrc, heroSrc] = await Promise.all([
    loadPngDataUrl("image/logo.png"),
    loadPngDataUrl("image/persons/person-1.png"),
  ]);

  const headline = siteCopy.hero.title.replace(/\.$/, "");
  const support = siteCopy.hero.titleAccent;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(155deg, #0b2224 0%, #102d30 42%, #163f3c 100%)",
          color: "#F8F8F4",
          fontFamily: "sans-serif",
        }}
      >
        {/* Atmosphere */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(circle at 78% 42%, rgba(184,245,213,0.18) 0%, transparent 42%)",
          }}
        />

        {/* Left copy column */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "58%",
            height: "100%",
            padding: "52px 36px 52px 56px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "#FFFFFF",
              borderRadius: 18,
              padding: "14px 22px",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoSrc}
              alt={SITE_NAME}
              height={52}
              style={{ height: 52, width: "auto" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 620 }}>
            <div
              style={{
                display: "flex",
                fontSize: 52,
                fontWeight: 800,
                lineHeight: 1.12,
                letterSpacing: "-0.03em",
              }}
            >
              {headline}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 28,
                fontWeight: 600,
                lineHeight: 1.35,
                color: "#B8F5D5",
                maxWidth: 560,
              }}
            >
              {support}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 22,
              color: "rgba(248,248,244,0.72)",
              letterSpacing: "0.02em",
            }}
          >
            nuviora-sec.vercel.app
          </div>
        </div>

        {/* Hero person */}
        <div
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            top: 24,
            width: "48%",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroSrc}
            alt=""
            width={560}
            height={620}
            style={{
              width: 560,
              height: 620,
              objectFit: "contain",
              objectPosition: "bottom center",
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
