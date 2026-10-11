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

/**
 * `bookingUrl` is a local-demo convenience with no matching schema field, so
 * it is dropped rather than written as an unknown field in Studio.
 */
const settingsForSanity: Record<string, unknown> = { ...defaultSiteSettings };
delete settingsForSanity.bookingUrl;

// Typed loosely on purpose. Each document has a different shape, and the
// union of five literal shapes is not assignable to the client's stub type;
// the schema is what validates these, not TypeScript.
const documents: IdentifiedSanityDocumentStub[] = [
  {
    _id: "siteSettings",
    _type: "siteSettings",
    ...settingsForSanity,
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


/**
 * Upload each demo photograph into the project and swap the plain URL for a
 * real Sanity asset.
 *
 * Done at seed time rather than left as hotlinks so the demo owns its images:
 * hotlinked photos break when the source moves, and a client replacing a
 * picture in Studio has to be replacing something that lives in Studio. The
 * `imageUrl` fields stay in the defaults purely for local dev before a project
 * is connected.
 */
async function uploadPhotos(doc: Record<string, unknown>): Promise<Record<string, unknown>> {
  const cache = new Map<string, { _type: "image"; asset: { _type: "reference"; _ref: string } }>();

  async function assetFor(url: string) {
    const hit = cache.get(url);
    if (hit) return hit;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Could not fetch ${url}: ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const asset = await client.assets.upload("image", buf, {
      filename: `${(url.match(/photo-[\w-]+/) ?? ["demo"])[0]}.jpg`,
    });
    const ref = {
      _type: "image" as const,
      asset: { _type: "reference" as const, _ref: asset._id },
    };
    cache.set(url, ref);
    console.log(`  uploaded ${asset._id}`);
    return ref;
  }

  async function walk(value: unknown): Promise<unknown> {
    if (Array.isArray(value)) return Promise.all(value.map(walk));
    if (value && typeof value === "object") {
      const src = value as Record<string, unknown>;
      const out: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(src)) out[k] = await walk(v);
      // `imageUrl` + `imageAlt` become a real `image` with its alt text.
      if (typeof src.imageUrl === "string") {
        const ref = await assetFor(src.imageUrl);
        out.image = { ...ref, alt: (src.imageAlt as string) ?? "" };
        delete out.imageUrl;
        delete out.imageAlt;
      }
      return out;
    }
    return value;
  }

  return (await walk(doc)) as Record<string, unknown>;
}

async function main() {
  console.log("Uploading demo photographs...");
  const withPhotos = [];
  for (const doc of documents) withPhotos.push(await uploadPhotos(doc));

  const tx = client.transaction();
  for (const doc of withPhotos) tx.createOrReplace(withKeys(doc) as IdentifiedSanityDocumentStub);
  await tx.commit();
  console.log(`Seeded ${documents.length} documents into ${projectId}/${dataset}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
