import Link from "next/link";

import type { SiteSettings } from "@/sanity/types";

const NAV_LINKS = [
  { href: "/classes", label: "Classes" },
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

/**
 * The footer closes the room rather than opening a new one: no accent, no
 * call to action, no second navigation masquerading as a sitemap. The page
 * above it already ends on the ask, and repeating it here would undercut it.
 */
export function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-subtle)]">
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-serif text-2xl font-light tracking-[0.08em] text-[var(--color-foreground)]">
              {settings.practiceName}
            </p>
            {settings.tagline ? (
              <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-[var(--color-muted)]">
                {settings.tagline}
              </p>
            ) : null}
          </div>

          <nav className="flex flex-col gap-3">
            <p className="text-[12px] uppercase tracking-[0.2em] text-[var(--color-muted)]">
              Pages
            </p>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[15px] text-[var(--color-foreground)]/80 transition-colors hover:text-[var(--color-foreground)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <p className="text-[12px] uppercase tracking-[0.2em] text-[var(--color-muted)]">
              Get in touch
            </p>
            {settings.email ? (
              <a
                href={`mailto:${settings.email}`}
                className="text-[15px] text-[var(--color-foreground)]/80 transition-colors hover:text-[var(--color-foreground)]"
              >
                {settings.email}
              </a>
            ) : null}
            {settings.phone ? (
              <a
                href={settings.phoneHref ?? `tel:${settings.phone}`}
                className="text-[15px] text-[var(--color-foreground)]/80 transition-colors hover:text-[var(--color-foreground)]"
              >
                {settings.phone}
              </a>
            ) : null}
            {settings.location ? (
              <p className="text-[15px] text-[var(--color-muted)]">{settings.location}</p>
            ) : null}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-[var(--color-subtle)] pt-6 text-[13px] text-[var(--color-muted)] sm:flex-row sm:items-center sm:justify-between">
          <span>
            &copy; {year} {settings.practiceName}
          </span>
          <span>
            Site by{" "}
            <a
              href="https://ignitecreativeco.world"
              className="transition-colors hover:text-[var(--color-foreground)]"
            >
              Ignite Creative Co
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
