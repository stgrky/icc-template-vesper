import { urlFor } from "@/sanity/image";
import type { SanityImageWithAlt } from "@/sanity/types";

type Props = {
  /** A Sanity image on a provisioned site. */
  image?: SanityImageWithAlt;
  /** A plain URL, used by the demo before a project is connected. */
  url?: string;
  alt?: string;
  width?: number;
  height?: number;
  /** How hard to darken. "band" is for type sitting directly on the photo. */
  treatment?: "band" | "card";
  className?: string;
  priority?: boolean;
};

/**
 * Every photograph on Vesper goes through here.
 *
 * A dark template cannot just drop a client's photo onto the page. Studio
 * photography is usually bright, often daylit, and a white-walled room at
 * 60% of the viewport destroys the one idea this layout has. So the treatment
 * is part of the component rather than part of the picture: a scrim, reduced
 * saturation, and a gradient toward the page background at the edges.
 *
 * It means a teacher can upload whatever she has — a phone photo in a sunlit
 * room — and the page still reads as one evening. That robustness matters
 * more than any particular image we seed into the demo.
 *
 * `band` is for a photo with type over it; `card` is for a photo in a card,
 * where the type sits below and the picture only needs to stop glowing.
 */
export function VesperImage({
  image,
  url,
  alt,
  width = 1800,
  height = 1200,
  treatment = "band",
  className = "",
  priority = false,
}: Props) {
  const src = image?.asset
    ? urlFor(image)?.width(width).height(height).fit("crop").auto("format").url()
    : url;

  if (!src) return null;

  const resolvedAlt = image?.alt ?? alt ?? "";

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* Plain img, not next/image: these are decorative backgrounds behind
          text, already sized by the Sanity CDN, and next/image's wrapper
          fights `absolute inset-0` more than it earns here. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={resolvedAlt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        className={`h-full w-full object-cover ${
          treatment === "band"
            ? "opacity-[0.62] saturate-[0.65]"
            : "opacity-90 saturate-[0.8]"
        }`}
      />
      {treatment === "band" ? (
        <>
          {/* Vertical scrim: guarantees contrast for type regardless of what
              the photo does, and melts the edges into the page. */}
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)]/85 via-[var(--color-background)]/15 to-[var(--color-background)]" />
          {/* Left-weighted scrim, because every band on this site sets its
              type left. */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-background)]/95 from-[12%] via-[var(--color-background)]/40 to-transparent" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-transparent" />
      )}
    </div>
  );
}
