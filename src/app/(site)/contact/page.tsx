import type { Metadata } from "next";

import { Reveal } from "@/components/motion/Reveal";
import { defaultContactPage, defaultSiteSettings } from "@/lib/vesper-defaults";
import { safeFetch } from "@/sanity/client";
import { contactPageQuery, siteSettingsQuery } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Contact",
  description: "Email or call Vesper Yoga. Questions about class are always welcome.",
  alternates: { canonical: "/contact" },
};

/**
 * Contact. Email and phone rather than a form, deliberately.
 *
 * A twelve-mat evening studio gets a handful of messages a week, and a form
 * adds a step, a spam surface and a thing that can silently fail. The contact
 * form is a paid add-on in the ICC catalogue; it belongs here only when a
 * client buys it.
 *
 * Access is its own section rather than a line in the footer. "Up one flight,
 * no lift" is the single most useful thing this page can tell some readers,
 * and burying it wastes their time.
 */
export default async function ContactPage() {
  // Sanity when connected, the demo persona when not. A null guard as well as
  // the fallback: safeFetch covers "no project", this covers "project exists
  // but the document was never created".
  const page =
    (await safeFetch<typeof defaultContactPage | null>(contactPageQuery, {}, defaultContactPage)) ??
    defaultContactPage;
  const s =
    (await safeFetch<typeof defaultSiteSettings | null>(siteSettingsQuery, {}, defaultSiteSettings)) ??
    defaultSiteSettings;

  return (
    <>
      <section className="px-6 pb-16 pt-36 md:pt-44">
        <div className="mx-auto w-full max-w-3xl">
          <Reveal>
            <p className="text-[12px] uppercase tracking-[0.3em] text-[var(--color-accent)]">
              {page.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-6 font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1.05] text-[var(--color-foreground)]">
              {page.heading}
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-7 text-[17px] leading-[1.8] text-[var(--color-muted)]">
              {page.intro}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-10 flex flex-col gap-4">
              <a
                href={`mailto:${s.email}`}
                className="font-serif text-[clamp(1.5rem,3.5vw,2.25rem)] font-light text-[var(--color-accent)] underline-offset-[6px] transition-colors hover:text-[var(--color-accent-strong)] hover:underline"
              >
                {s.email}
              </a>
              <a
                href={s.phoneHref}
                className="font-serif text-[clamp(1.5rem,3.5vw,2.25rem)] font-light text-[var(--color-foreground)] underline-offset-[6px] transition-colors hover:underline"
              >
                {s.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-[var(--color-subtle)] py-20 md:py-24">
        <div className="mx-auto grid w-full max-w-3xl gap-12 px-6 sm:grid-cols-2">
          <Reveal>
            <div>
              <h2 className="font-serif text-2xl font-light text-[var(--color-foreground)]">
                {page.studioHeading}
              </h2>
              <p className="mt-4 text-[15px] leading-[1.8] text-[var(--color-muted)]">
                {page.studioBody}
              </p>
              <p className="mt-4 text-[15px] text-[var(--color-foreground)]/80">{s.location}</p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div>
              <h2 className="font-serif text-2xl font-light text-[var(--color-foreground)]">
                {page.accessibilityHeading}
              </h2>
              <p className="mt-4 text-[15px] leading-[1.8] text-[var(--color-muted)]">
                {page.accessibilityBody}
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
