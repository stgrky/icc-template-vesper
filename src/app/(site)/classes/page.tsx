import type { Metadata } from "next";

import { Reveal } from "@/components/motion/Reveal";
import { WeeklySchedule } from "@/components/site/WeeklySchedule";
import {
  defaultClassesPage,
  defaultHomePage,
  defaultSiteSettings,
} from "@/lib/vesper-defaults";
import { safeFetch } from "@/sanity/client";
import { classesPageQuery, homePageQuery } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Classes",
  description:
    "Restorative, yin, and candlelit slow flow. Evening classes capped at twelve mats in East Austin.",
  alternates: { canonical: "/classes" },
};

/**
 * Classes. The schedule component is shared with the home page rather than
 * duplicated, so a teacher editing her times changes them in one place.
 */
export default async function ClassesPage() {
  // Sanity when connected, the demo persona when not. A null guard as well as
  // the fallback: safeFetch covers "no project", this covers "project exists
  // but the document was never created".
  const page =
    (await safeFetch<typeof defaultClassesPage | null>(classesPageQuery, {}, defaultClassesPage)) ??
    defaultClassesPage;
  // Class types, schedule and first-timer questions live on the home
  // document and are reused here, so a time changed once changes everywhere.
  const home =
    (await safeFetch<typeof defaultHomePage | null>(homePageQuery, {}, defaultHomePage)) ??
    defaultHomePage;

  return (
    <>
      <section className="px-6 pb-16 pt-36 md:pt-44">
        <div className="mx-auto w-full max-w-6xl">
          <Reveal>
            <p className="text-[12px] uppercase tracking-[0.3em] text-[var(--color-accent)]">
              {page.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-6 max-w-3xl font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1.05] text-[var(--color-foreground)] [text-wrap:balance]">
              {page.heading}
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-7 max-w-xl text-[17px] leading-[1.75] text-[var(--color-muted)]">
              {page.intro}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-[var(--color-subtle)] py-20 md:py-24">
        <div className="mx-auto w-full max-w-6xl px-6">
          <ul className="grid gap-10 md:grid-cols-3 md:gap-8">
            {home.classTypes.map((c, i) => (
              <Reveal key={c.name} delay={0.07 * i} className="h-full">
                <li className="flex h-full flex-col border-t border-[var(--color-accent)]/40 pt-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="font-serif text-2xl font-light text-[var(--color-foreground)]">
                      {c.name}
                    </h2>
                    <span className="shrink-0 text-[12px] uppercase tracking-[0.16em] text-[var(--color-muted)]">
                      {c.duration}
                    </span>
                  </div>
                  <span className="mt-3 flex gap-1" aria-label={`Intensity ${c.intensity} of 3`}>
                    {[1, 2, 3].map((n) => (
                      <span
                        key={n}
                        aria-hidden
                        className={`h-1 w-6 rounded-full ${
                          n <= c.intensity ? "bg-[var(--color-accent)]" : "bg-[var(--color-subtle)]"
                        }`}
                      />
                    ))}
                  </span>
                  <p className="mt-5 flex-1 text-[15px] leading-[1.75] text-[var(--color-muted)]">
                    {c.summary}
                  </p>
                  <p className="mt-5 text-[14px] italic leading-relaxed text-[var(--color-foreground)]/70">
                    {c.forWhom}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <WeeklySchedule
        heading={home.scheduleHeading}
        intro={home.scheduleIntro}
        note={home.scheduleNote}
        schedule={home.schedule}
        classTypes={home.classTypes}
      />

      {/* First-time questions live here too: this is the page someone lands on
          from the nav, and the anxiety does not wait for the home page. */}
      <section
        id="first-time"
        className="scroll-mt-24 border-t border-[var(--color-subtle)] bg-[var(--color-surface)] py-20 md:py-28"
      >
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-20">
            <div>
              <Reveal>
                <h2 className="font-serif text-4xl font-light leading-[1.1] text-[var(--color-foreground)] md:text-5xl">
                  {home.firstTimeHeading}
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-5 text-[17px] leading-relaxed text-[var(--color-muted)]">
                  {home.firstTimeIntro}
                </p>
              </Reveal>
            </div>
            <dl className="flex flex-col">
              {home.firstTime.map((item, i) => (
                <Reveal key={item.q} delay={0.05 * i}>
                  <div className="border-b border-[var(--color-subtle)] py-6 first:pt-0">
                    <dt className="font-serif text-xl font-light text-[var(--color-foreground)]">
                      {item.q}
                    </dt>
                    <dd className="mt-2.5 text-[15px] leading-[1.75] text-[var(--color-muted)]">
                      {item.a}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--color-subtle)] py-20 md:py-24">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="max-w-2xl">
            <Reveal>
              <h2 className="font-serif text-3xl font-light text-[var(--color-foreground)] md:text-4xl">
                {home.pricingHeading}
              </h2>
            </Reveal>
          </div>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-[var(--color-subtle)] sm:grid-cols-2 lg:grid-cols-4">
            {home.pricing.map((tier, i) => (
              <Reveal key={tier.label} delay={0.05 * i} className="h-full">
                <li className="flex h-full flex-col bg-[var(--color-background)] p-7">
                  <span className="text-[12px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
                    {tier.label}
                  </span>
                  <span className="mt-4 font-serif text-4xl font-light text-[var(--color-foreground)]">
                    {tier.price}
                  </span>
                  <span className="mt-2 text-[14px] leading-relaxed text-[var(--color-muted)]">
                    {tier.note}
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.12}>
            <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-[var(--color-muted)]">
              {page.bookingNote}{" "}
              <a
                href={`mailto:${defaultSiteSettings.email}`}
                className="text-[var(--color-accent)] underline-offset-4 hover:underline"
              >
                {defaultSiteSettings.email}
              </a>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
