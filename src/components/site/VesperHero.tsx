import Link from "next/link";

type Cta = { label: string; href: string };

type Props = {
  eyebrow?: string;
  heading: string;
  body?: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
};

/**
 * The hero — one room, one light.
 *
 * The whole template hangs off a single warm source on a near-black ground.
 * It is built from two stacked radial gradients rather than an image so it
 * costs nothing, never waits on a photo a client has not uploaded, and can
 * breathe.
 *
 * The breath is the only motion on the page: an 11-second cycle, scaling
 * about 4% and shifting opacity by roughly a tenth. That is slow enough that
 * you register it as the room being alive rather than as an animation, which
 * is the entire point — a wellness site that visibly animates reads as a tech
 * product. It is disabled outright under `prefers-reduced-motion`.
 *
 * Deliberately no image behind this. Every other template in the rolodex
 * opens on a photograph, and the one thing a new teacher never has is good
 * photography of an empty dim room.
 */
export function VesperHero({ eyebrow, heading, body, primaryCta, secondaryCta }: Props) {
  return (
    <section className="relative isolate flex min-h-[92svh] items-end overflow-hidden">
      {/* The light itself. aria-hidden: it is atmosphere, not content. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="vesper-flame absolute left-1/2 top-[38%] h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 rounded-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)]/70 via-transparent to-[var(--color-background)]" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 pb-20 pt-40 md:pb-28">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="text-[12px] uppercase tracking-[0.3em] text-[var(--color-accent)]">
              {eyebrow}
            </p>
          ) : null}

          <h1 className="mt-7 font-serif text-[clamp(2.75rem,7vw,5.25rem)] font-light leading-[1.02] tracking-[-0.01em] text-[var(--color-foreground)] [text-wrap:balance]">
            {heading}
          </h1>

          {body ? (
            <p className="mt-7 max-w-xl text-[17px] leading-[1.75] text-[var(--color-muted)]">
              {body}
            </p>
          ) : null}

          {primaryCta || secondaryCta ? (
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              {primaryCta ? (
                <Link
                  href={primaryCta.href}
                  className="rounded-full bg-[var(--color-accent)] px-7 py-3.5 text-[13px] uppercase tracking-[0.16em] text-[var(--color-background)] transition-colors hover:bg-[var(--color-accent-strong)]"
                >
                  {primaryCta.label}
                </Link>
              ) : null}
              {secondaryCta ? (
                <Link
                  href={secondaryCta.href}
                  className="border-b border-[var(--color-subtle)] pb-1 text-[13px] uppercase tracking-[0.16em] text-[var(--color-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-foreground)]"
                >
                  {secondaryCta.label}
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
