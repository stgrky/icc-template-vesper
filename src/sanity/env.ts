// Project ID and dataset are PUBLIC values (the project ID appears in the
// deployed Studio URL, and `NEXT_PUBLIC_` vars reach the browser regardless),
// so hardcoding a fallback is safe in principle — the standalone Studio build
// does not read `.env.local` and needs something to boot with.
//
// Vesper ships with NO fallback project on purpose.
//
// This template was scaffolded from Grove, which hardcodes its own id. Left
// in place, a fresh Vesper checkout silently rendered Grove's live dataset:
// the demo opened on another practice's name and credentials. An unprovisioned
// template must fall back to its own persona in `vesper-defaults.ts`, never to
// whatever project the scaffold came from.
//
// When this template is provisioned for a real studio, set
// NEXT_PUBLIC_SANITY_PROJECT_ID in that deployment's environment.
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-09-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

export const isSanityConfigured = projectId.length > 0;
