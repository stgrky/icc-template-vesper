// Project ID and dataset are PUBLIC values — the id appears in the deployed
// Studio URL, and `NEXT_PUBLIC_` vars reach the browser regardless — so the
// fallback is hardcoded on purpose. The standalone Studio build does not read
// `.env.local` and needs something to boot with.
//
// `qvkwwny3` is VESPER'S OWN project ("ICC — Vesper Demo", created
// 2026-10-10). It must never be another template's.
//
// This file arrived from the Grove scaffold still carrying Grove's id, which
// meant a fresh checkout rendered Grove's live dataset and the demo opened
// under another practice's name. RUNBOOK gate 1b exists for exactly this;
// check it on every template scaffolded from another.
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-09-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "qvkwwny3";

export const isSanityConfigured = projectId.length > 0;
