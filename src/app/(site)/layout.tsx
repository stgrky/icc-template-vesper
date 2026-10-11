import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { defaultSiteSettings } from "@/lib/vesper-defaults";
import { safeFetch } from "@/sanity/client";
import { siteSettingsQuery } from "@/sanity/queries";
import type { SiteSettings } from "@/sanity/types";

/**
 * Chrome for the public site. The Studio route sits outside this group so it
 * never inherits the header, the footer, or the dark ground.
 *
 * No `<main>` padding for the header: the header is fixed and transparent
 * over the hero on purpose, and every page below sets its own top spacing.
 */
export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await safeFetch<SiteSettings>(
    siteSettingsQuery,
    {},
    defaultSiteSettings
  );

  return (
    <>
      <Header practiceName={settings.practiceName ?? defaultSiteSettings.practiceName} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
    </>
  );
}
