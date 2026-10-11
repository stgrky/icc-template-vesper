import type { Metadata } from "next";
import Link from "next/link";

import { Reveal } from "@/components/motion/Reveal";
import { VesperImage } from "@/components/site/VesperImage";
import { defaultAboutPage } from "@/lib/vesper-defaults";
import { safeFetch } from "@/sanity/client";
import { aboutPageQuery } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "About",
  description:
    "Nora Vance, RYT-500. Trauma-informed, prenatal and yin trained. Teaching evening restorative yoga in East Austin since 2018.",
  alternates: { canonical: "/about" },
};

/**
 * About. A single narrow column of prose rather than a grid of cards: this is
 * the one page on a teacher's site that is genuinely just writing, and
 * breaking it into tiles would make it read as marketing.
 */
export default async function AboutPage() {
  // Sanity when connected, the demo persona when not. A null guard as well as
  // the fallback: safeFetch covers "no project", this covers "project exists
  // but the document was never created".
  const page =
    (await safeFetch<typeof defaultAboutPage | null>(aboutPageQuery, {}, defaultAboutPage)) ??
    defaultAboutPage;

  return (
    <>
      <section className="px-6 pb-14 pt-36 md:pt-44">
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
            <p className="mt-4 text-[13px] uppercase tracking-[0.2em] text-[var(--color-muted)]">
              {page.credential}
            </p>
          </Reveal>
        </div>
      </section>

      {page.image || page.imageUrl ? (
        <section className="px-6 pb-16">
          {/* Wide and short rather than a portrait crop. A head-and-shoulders
              shot would make this a profile page; a room with a person in it
              keeps the subject the practice. */}
          <div className="mx-auto w-full max-w-5xl">
            <div className="relative aspect-[16/7] overflow-hidden rounded-sm">
              <VesperImage
                image={page.image}
                url={page.imageUrl}
                alt={page.imageAlt}
                treatment="card"
                width={1600}
                height={700}
              />
            </div>
          </div>
        </section>
      ) : null}

      <section className="px-6 pb-20 md:pb-28">
        <div className="mx-auto w-full max-w-3xl">
          {page.body.map((para, i) => (
            <Reveal key={i} delay={0.05 * i}>
              {/* First paragraph is set larger: it carries the voice, and the
                  rest of the page is read in that register. */}
              <p
                className={`${i === 0 ? "text-[19px] text-[var(--color-foreground)]/90" : "mt-7 text-[17px] text-[var(--color-muted)]"} leading-[1.8]`}
              >
                {para}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-[var(--color-subtle)] py-20 md:py-24">
        <div className="mx-auto w-full max-w-3xl px-6">
          <Reveal>
            <h2 className="font-serif text-3xl font-light text-[var(--color-foreground)]">
              {page.trainingHeading}
            </h2>
          </Reveal>
          <dl className="mt-8">
            {page.training.map((t, i) => (
              <Reveal key={t.label} delay={0.05 * i}>
                <div className="flex flex-col gap-1 border-b border-[var(--color-subtle)] py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                  <dt className="text-[16px] text-[var(--color-foreground)]">{t.label}</dt>
                  <dd className="text-[14px] text-[var(--color-muted)]">{t.detail}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <section className="relative isolate overflow-hidden border-t border-[var(--color-subtle)] py-24 md:py-32">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="vesper-flame absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50" />
        </div>
        <div className="mx-auto w-full max-w-2xl px-6 text-center">
          <Reveal>
            <h2 className="font-serif text-[clamp(1.9rem,4.5vw,3rem)] font-light leading-[1.1] text-[var(--color-foreground)] [text-wrap:balance]">
              {page.closing.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 text-[17px] leading-relaxed text-[var(--color-muted)]">
              {page.closing.body}
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <Link
              href={page.closing.cta.href}
              className="mt-9 inline-block rounded-full bg-[var(--color-accent)] px-8 py-4 text-[13px] uppercase tracking-[0.16em] text-[var(--color-background)] transition-colors hover:bg-[var(--color-accent-strong)]"
            >
              {page.closing.cta.label}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
