"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/classes", label: "Classes" },
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

type Props = {
  practiceName: string;
  bookingLabel?: string;
  bookingHref?: string;
};

/**
 * Vesper's header.
 *
 * Transparent over the hero, solid once you leave it. On a dark template an
 * always-solid bar draws a hard horizontal edge across the one image the page
 * is built around; letting the hero run to the top of the viewport is most of
 * why this layout reads differently from the others in the rolodex.
 *
 * The wordmark is set in the display face at a size that would be a heading
 * anywhere else. A studio this small *is* the teacher, so the name is treated
 * as the title of the page rather than as chrome.
 */
export function Header({
  practiceName,
  bookingLabel = "Book a class",
  bookingHref = "/classes",
}: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open
          ? "border-b border-[var(--color-subtle)] bg-[var(--color-background)]/95 backdrop-blur"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="font-serif text-2xl font-light tracking-[0.08em] text-[var(--color-foreground)]"
        >
          {practiceName}
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] uppercase tracking-[0.16em] text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={bookingHref}
            className="rounded-full border border-[var(--color-accent)] px-5 py-2 text-[13px] uppercase tracking-[0.16em] text-[var(--color-accent)] transition-colors hover:bg-[var(--color-accent)] hover:text-[var(--color-background)]"
          >
            {bookingLabel}
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center md:hidden"
        >
          <span className="relative block h-3 w-6">
            <span
              className={`absolute left-0 block h-px w-6 bg-[var(--color-foreground)] transition-transform duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-6 bg-[var(--color-foreground)] transition-transform duration-300 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      {open ? (
        <nav className="border-t border-[var(--color-subtle)] px-6 py-6 md:hidden">
          <ul className="flex flex-col gap-5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm uppercase tracking-[0.16em] text-[var(--color-foreground)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={bookingHref}
                onClick={() => setOpen(false)}
                className="inline-flex rounded-full border border-[var(--color-accent)] px-5 py-2 text-sm uppercase tracking-[0.16em] text-[var(--color-accent)]"
              >
                {bookingLabel}
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
