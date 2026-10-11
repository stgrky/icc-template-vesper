import type { MetadataRoute } from "next";

/**
 * The demo is noindex; a provisioned client site is not.
 *
 * Every ICC demo was indexable until 2026-09-20, which put fictional
 * practitioners and invented class times into Google under ICC's name. The
 * gate is an explicit env var rather than a hostname check, so provisioning a
 * real site is a deliberate act (set ICC_ALLOW_INDEXING=true in Vercel) rather
 * than something that happens by accident the moment a domain is attached.
 */
const allowIndexing = process.env.ICC_ALLOW_INDEXING === "true";

export default function robots(): MetadataRoute.Robots {
  if (!allowIndexing) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/studio/"],
      },
    ],
  };
}
