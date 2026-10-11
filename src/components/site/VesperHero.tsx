import Link from "next/link";

import { VesperImage } from "@/components/site/VesperImage";
import type { SanityImageWithAlt } from "@/sanity/types";

type Cta = { label: string; href: string };

type Props = {
  image?: SanityImageWithAlt;
  imageUrl?: string;
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
 * The photograph is optional and the flame is not. With no image the hero is
 * still a lit room rather than an empty box, which matters because the one
 * thing a new teacher rarely has is good photography of a dim studio. When
 * she does have one, it goes behind the light rather than instead of it.
 */
export function VesperHero({
  image,
  imageUrl,
  eyebrow,
  heading,
  body,
  primaryCta,
  secondaryCta,
}: Props) {
  return (
    <section className="relative isolate flex min-h-[92svh] items-end overflow-hidden">
      {/* Photograph first, then the light on top of it. The flame reads as the
          source lighting the room rather than as a graphic laid over a photo,
          which is the whole trick. */}
      <VesperImage
        image={image}
        url={imageUrl}
        treatment="band"
        priority
        className="-z-20"
      />

      {/* The light itself. aria-hidden: it is atmosphere, not content. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="vesper-flame absolute left-1/2 top-[38%] h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)]/40 via-transparent to-[var(--color-background)]" />
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
