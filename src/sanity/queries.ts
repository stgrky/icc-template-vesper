import { groq } from "next-sanity";

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  practiceName,
  tagline,
  palette,
  fontPairing,
  logo,
  favicon,
  email,
  phone,
  addressLine,
  socialLinks,
  footerText,
  stickyCta
}`;

export const allPostsQuery = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  excerpt,
  featuredImage,
  publishedAt,
  author->{
    _id,
    name,
    photo,
    isGuestContributor
  },
  categories[]->{
    _id,
    title,
    "slug": slug.current
  }
}`;

export const blogIndexQuery = groq`{
  "posts": *[_type == "post" && defined(slug.current)] | order(publishedAt desc)[$start...$end]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    featuredImage,
    publishedAt,
    author->{
      _id,
      name,
      photo,
      isGuestContributor
    },
    categories[]->{
      _id,
      title,
      "slug": slug.current
    }
  },
  "total": count(*[_type == "post" && defined(slug.current)])
}`;

export const recentPostsQuery = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...3]{
  _id,
  title,
  "slug": slug.current,
  featuredImage,
  publishedAt
}`;

export const similarPostsQuery = groq`*[
  _type == "post" &&
  defined(slug.current) &&
  slug.current != $slug &&
  count(categories[@._ref in $categoryIds]) > 0
] | order(publishedAt desc)[0...3]{
  _id,
  title,
  "slug": slug.current,
  featuredImage,
  publishedAt
}`;

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  featuredImage,
  publishedAt,
  updatedAt,
  body,
  author->{
    _id,
    name,
    photo,
    bio,
    credentials,
    isGuestContributor,
    isLicensedClinician
  },
  clinicalReviewer->{
    _id,
    name,
    credentials,
    isLicensedClinician
  },
  editor->{
    _id,
    name,
    credentials,
    isLicensedClinician
  },
  categories[]->{
    _id,
    title,
    "slug": slug.current
  }
}`;


/* ── Vesper page queries ──
 * Each returns the single published document for that page. `[0]` rather than
 * a list: these are singletons in Studio, and a GROQ array would make every
 * consumer index into it.
 */
export const homePageQuery = `*[_type == "homePage"][0]{
  hero{ eyebrow, heading, body, image, primaryCta{ label, href }, secondaryCta{ label, href } },
  intro{ heading, body },
  classTypesHeading, classTypesIntro,
  classTypes[]{ name, duration, intensity, image, summary, forWhom },
  scheduleHeading, scheduleIntro, scheduleNote,
  schedule[]{ day, time, className, duration, spaces },
  firstTimeHeading, firstTimeIntro, firstTime[]{ q, a },
  teacherHeading, teacherBody, teacherCta{ label, href },
  testimonial{ quote, attribution },
  pricingHeading, pricingIntro, pricing[]{ label, price, note }, pricingNote,
  closing{ heading, body, image, cta{ label, href } }
}`;

export const classesPageQuery = `*[_type == "classesPage"][0]{
  eyebrow, heading, intro, bookingNote
}`;

export const aboutPageQuery = `*[_type == "aboutPage"][0]{
  eyebrow, heading, credential, image, body,
  trainingHeading, training[]{ label, detail },
  closing{ heading, body, cta{ label, href } }
}`;

export const contactPageQuery = `*[_type == "contactPage"][0]{
  eyebrow, heading, intro,
  studioHeading, studioBody,
  accessibilityHeading, accessibilityBody
}`;
