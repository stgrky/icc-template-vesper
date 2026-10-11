import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Two jobs, one rule. As a demo, this site is a fictional practice — invented
  // therapist, invented specialties — and has no business in search results
  // where someone looking for care could find it. As a client build, the
  // *.vercel.app address is the preview she reviews before launch, and it stays
  // reachable afterwards, so keeping it unindexed leaves Google only her real
  // domain rather than a half-finished draft or a duplicate of the live site.
  // Matching on the host covers both and needs no switch at launch: a real
  // domain is never *.vercel.app.
  async headers() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "(?<host>.+)\\.vercel\\.app" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
