import type { Metadata } from "next";

import { Reveal } from "@/components/motion/Reveal";
import { demoPosts } from "@/lib/vesper-defaults";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Occasional writing on restorative practice, starting out, and what to do when your life is too loud to sit still in.",
  alternates: { canonical: "/journal" },
};

/**
 * Journal. "Blog" everywhere else in the rolodex; a yoga teacher writing four
 * times a year is keeping a journal, and the word sets the right expectation
 * about frequency.
 *
 * A list, not a card grid. Three posts in a grid look like a half-empty shelf;
 * three posts in a list look like a considered index.
 */
export default function JournalPage() {
  const posts = demoPosts;
  // Headlines are not links in the demo: these personas have no body copy, so
  // linking them would ship a page of 404s. A provisioned site reads real
  // posts from Sanity and restores the slug route.

  return (
    <>
      <section className="px-6 pb-14 pt-36 md:pt-44">
        <div className="mx-auto w-full max-w-3xl">
          <Reveal>
            <p className="text-[12px] uppercase tracking-[0.3em] text-[var(--color-accent)]">
              Journal
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-6 font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1.05] text-[var(--color-foreground)]">
              Occasional writing
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-24 md:pb-32">
        <div className="mx-auto w-full max-w-3xl">
          {posts.length === 0 ? (
            <p className="text-[17px] text-[var(--color-muted)]">
              Nothing here yet. Check back after the next full moon.
            </p>
          ) : (
            <ul>
              {posts.map((post, i) => (
                <Reveal key={post.slug} delay={0.05 * i}>
                  <li className="border-t border-[var(--color-subtle)] py-8">
                    <article>
                      <p className="text-[12px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
                        <time dateTime={post.publishedAt}>
                          {new Date(post.publishedAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </time>
                        {" · "}
                        {post.readingTime}
                      </p>
                      <h2 className="mt-3 font-serif text-[clamp(1.5rem,3vw,2rem)] font-light leading-[1.2] text-[var(--color-foreground)]">
                        {post.title}
                      </h2>
                      <p className="mt-3 text-[16px] leading-[1.75] text-[var(--color-muted)]">
                        {post.excerpt}
                      </p>
                    </article>
                  </li>
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
