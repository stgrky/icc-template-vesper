/**
 * Push the demo persona into a freshly created Sanity project.
 *
 * Run once, right after provisioning, so the site and Studio look full on
 * first load instead of showing an empty shell:
 *
 *   node --env-file=.env.local --import tsx scripts/seed.ts
 *
 * Idempotent: every document uses a fixed `_id` and `createOrReplace`, so
 * running it twice overwrites rather than duplicating. That also means running
 * it against a REAL client's project would wipe their edits — it is a
 * provisioning step, not a repair tool.
 */
import { createClient, type IdentifiedSanityDocumentStub } from "@sanity/client";

import {
  defaultAboutPage,
  defaultClassesPage,
  defaultContactPage,
  defaultHomePage,
  defaultSiteSettings,
} from "../src/lib/vesper-defaults";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId) throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is not set");
if (!token) throw new Error("SANITY_WRITE_TOKEN is not set");

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-09-01",
  useCdn: false,
});

/** Strip the keys that only exist for the local demo and have no schema field. */
const { teacherName, credential, location, phoneHref, instagram, bookingUrl, ...restSettings } =
  defaultSiteSettings;

// Typed loosely on purpose. Each document has a different shape, and the
// union of five literal shapes is not assignable to the client's stub type;
// the schema is what validates these, not TypeScript.
const documents: IdentifiedSanityDocumentStub[] = [
  {
    _id: "siteSettings",
    _type: "siteSettings",
    ...restSettings,
    teacherName,
    credential,
    location,
    phoneHref,
    instagram,
  },
  { _id: "homePage", _type: "homePage", ...defaultHomePage },
  { _id: "classesPage", _type: "classesPage", ...defaultClassesPage },
  { _id: "aboutPage", _type: "aboutPage", ...defaultAboutPage },
  { _id: "contactPage", _type: "contactPage", ...defaultContactPage },
];

/**
 * Sanity rejects array items without a `_key`, and hand-written defaults have
 * none. Walk the tree and add them rather than littering the defaults file
 * with keys a human editing copy should never have to think about.
 */
function withKeys<T>(value: T, path = "k"): T {
  if (Array.isArray(value)) {
    return value.map((item, i) =>
      item && typeof item === "object"
        ? { _key: `${path}${i}`, ...(withKeys(item, `${path}${i}`) as object) }
        : item
    ) as unknown as T;
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([k, v]) => [
        k,
        withKeys(v, `${path}${k}`),
      ])
    ) as T;
  }
  return value;
}

async function main() {
  const tx = client.transaction();
  for (const doc of documents) tx.createOrReplace(withKeys(doc));
  await tx.commit();
  console.log(`Seeded ${documents.length} documents into ${projectId}/${dataset}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
