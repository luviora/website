import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tailwind v4 via postcss.config.mjs (@tailwindcss/postcss) — estável no build Vercel.
  images: {
    formats: ["image/avif", "image/webp"],
    // inclui larguras para hero (~85vw mobile / ~48vw desktop)
    deviceSizes: [360, 420, 512, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [96, 128, 160, 180, 200, 256, 320, 384],
    qualities: [55, 60, 70, 75, 85],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Link",
            value: '</llms.txt>; rel="describedby"',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
