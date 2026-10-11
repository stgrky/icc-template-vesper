import Link from "next/link";

import { Reveal } from "@/components/motion/Reveal";
import { VesperHero } from "@/components/site/VesperHero";
import { WeeklySchedule } from "@/components/site/WeeklySchedule";
import { defaultHomePage } from "@/lib/vesper-defaults";
import { safeFetch } from "@/sanity/client";
import { homePageQuery } from "@/sanity/queries";

/**
 * Vesper's home page.
 *
 * Ordered by what actually stops someone booking a first class, which is not
 * price and not timing. It is not knowing what happens when they walk in.
 * So: what this is, what I teach, when, **then** the anxiety section, then
 * who I am, then cost. Price sits late on purpose — it is the easiest
 * objection and answering it first implies it is the main one.
 */
export default async function HomePage() {
  // Sanity when connected, the demo persona when not. A null guard as well as
  // the fallback: safeFetch covers "no project", this covers "project exists
  // but the document was never created".
  const page =
    (await safeFetch<typeof defaultHomePage | null>(homePageQuery, {}, defaultHomePage)) ??
    defaultHomePage;

  return (
    <>
      <VesperHero {...page.hero} />

      {/* Philosophy. Narrow measure, large type, nothing else on screen. */}
      <section className="border-t border-[var(--color-subtle)] py-24 md:py-32">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="max-w-3xl">
            <Reveal>
              <h2 className="font-serif text-[clamp(1.9rem,4vw,3rem)] font-light leading-[1.15] text-[var(--color-foreground)] [text-wrap:balance]">
                {page.intro.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-7 text-[17px] leading-[1.8] text-[var(--color-muted)]">
                {page.intro.body}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Class types. Intensity is shown so nobody has to guess how hard it is. */}
      <section className="border-t border-[var(--color-subtle)] py-20 md:py-28">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="max-w-2xl">
            <Reveal>
              <h2 className="font-serif text-4xl font-light leading-[1.1] text-[var(--color-foreground)] md:text-5xl">
                {page.classTypesHeading}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-5 text-[17px] leading-relaxed text-[var(--color-muted)]">
                {page.classTypesIntro}
              </p>
            </Reveal>
          </div>

          <ul className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {page.classTypes.map((c, i) => (
              <Reveal key={c.name} delay={0.07 * i} className="h-full">
                <li className="flex h-full flex-col border-t border-[var(--color-accent)]/40 pt-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-serif text-2xl font-light text-[var(--color-foreground)]">
                      {c.name}
                    </h3>
                    <span className="shrink-0 text-[12px] uppercase tracking-[0.16em] text-[var(--color-muted)]">
                      {c.duration}
                    </span>
                  </div>
                  <span
                    className="mt-3 flex gap-1"
                    aria-label={`Intensity ${c.intensity} of 3`}
                  >
                    {[1, 2, 3].map((n) => (
                      <span
                        key={n}
                        aria-hidden
                        className={`h-1 w-6 rounded-full ${
                          n <= c.intensity
                            ? "bg-[var(--color-accent)]"
                            : "bg-[var(--color-subtle)]"
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
        heading={page.scheduleHeading}
        intro={page.scheduleIntro}
        note={page.scheduleNote}
        schedule={page.schedule}
        classTypes={page.classTypes}
      />

      {/* The anxiety section. The real conversion blocker for a first class. */}
      <section
        id="first-time"
        className="scroll-mt-24 border-t border-[var(--color-subtle)] bg-[var(--color-surface)] py-20 md:py-28"
      >
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-20">
            <div>
              <Reveal>
                <h2 className="font-serif text-4xl font-light leading-[1.1] text-[var(--color-foreground)] md:text-5xl">
                  {page.firstTimeHeading}
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-5 text-[17px] leading-relaxed text-[var(--color-muted)]">
                  {page.firstTimeIntro}
                </p>
              </Reveal>
            </div>

            <dl className="flex flex-col">
              {page.firstTime.map((item, i) => (
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

      {/* Teacher. */}
      <section className="border-t border-[var(--color-subtle)] py-20 md:py-28">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="max-w-2xl">
            <Reveal>
              <h2 className="font-serif text-4xl font-light leading-[1.1] text-[var(--color-foreground)] md:text-5xl">
                {page.teacherHeading}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 text-[17px] leading-[1.8] text-[var(--color-muted)]">
                {page.teacherBody}
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <Link
                href={page.teacherCta.href}
                className="mt-8 inline-block border-b border-[var(--color-subtle)] pb-1 text-[13px] uppercase tracking-[0.16em] text-[var(--color-accent)] transition-colors hover:border-[var(--color-accent)]"
              >
                {page.teacherCta.label}
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* One voice, not a wall of five. */}
      <section className="border-t border-[var(--color-subtle)] py-24 md:py-32">
        <div className="mx-auto w-full max-w-4xl px-6 text-center">
          <Reveal>
            <blockquote className="font-serif text-[clamp(1.5rem,3.2vw,2.3rem)] font-light leading-[1.4] text-[var(--color-foreground)] [text-wrap:balance]">
              &ldquo;{page.testimonial.quote}&rdquo;
            </blockquote>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 text-[12px] uppercase tracking-[0.22em] text-[var(--color-muted)]">
              {page.testimonial.attribution}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Price, deliberately late. */}
      <section className="border-t border-[var(--color-subtle)] bg-[var(--color-surface)] py-20 md:py-28">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="max-w-2xl">
            <Reveal>
              <h2 className="font-serif text-4xl font-light leading-[1.1] text-[var(--color-foreground)] md:text-5xl">
                {page.pricingHeading}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-5 text-[17px] leading-relaxed text-[var(--color-muted)]">
                {page.pricingIntro}
              </p>
            </Reveal>
          </div>

          <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-[var(--color-subtle)] sm:grid-cols-2 lg:grid-cols-4">
            {page.pricing.map((tier, i) => (
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
              {page.pricingNote}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Close. */}
      <section className="relative isolate overflow-hidden border-t border-[var(--color-subtle)] py-28 md:py-36">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="vesper-flame absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60" />
        </div>
        <div className="mx-auto w-full max-w-3xl px-6 text-center">
          <Reveal>
            <h2 className="font-serif text-[clamp(2rem,5vw,3.4rem)] font-light leading-[1.1] text-[var(--color-foreground)] [text-wrap:balance]">
              {page.closing.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-6 max-w-lg text-[17px] leading-relaxed text-[var(--color-muted)]">
              {page.closing.body}
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <Link
              href={page.closing.cta.href}
              className="mt-10 inline-block rounded-full bg-[var(--color-accent)] px-8 py-4 text-[13px] uppercase tracking-[0.16em] text-[var(--color-background)] transition-colors hover:bg-[var(--color-accent-strong)]"
            >
              {page.closing.cta.label}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
