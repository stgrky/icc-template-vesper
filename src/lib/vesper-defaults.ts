import type { SanityImageWithAlt } from "@/sanity/types";

/**
 * Vesper's demo persona.
 *
 * Renders whenever no Sanity project is connected, which is how the public
 * demo runs. On a provisioned client site this content is replaced wholesale;
 * `safeFetch` is deliberately allowed to throw rather than fall back here,
 * because another teacher's name and class times must never appear under a
 * real studio's domain.
 *
 * The persona is an evening restorative teacher rather than a vinyasa studio.
 * That is the whole reason this template exists: every other layout in the
 * rolodex is bright and daytime, and the one visual idea here is a room lit
 * by a single warm source. A 6am power-flow persona would fight it.
 */


/**
 * Demo photography, Unsplash. Licensed for commercial use with no attribution
 * required, which is what makes it safe on a public demo.
 *
 * A real client never ships these. Their own photos go into Sanity at
 * provisioning and the URLs below stop being read at all — `VesperImage`
 * prefers the Sanity asset whenever one exists.
 *
 * Every one was looked at before being chosen: a photo search for a dark yoga
 * studio returns plenty that is wrong for a therapist-adjacent brand.
 */
const demoPhoto = (id: string, w = 1800, h = 1200) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=70`;

export const defaultSiteSettings = {
  practiceName: "Vesper Yoga",
  teacherName: "Nora Vance",
  credential: "RYT-500",
  tagline: "Evening yoga in East Austin",
  location: "East Austin, TX",
  email: "hello@vesperyoga.example",
  phone: "(512) 555-0142",
  phoneHref: "tel:+15125550142",
  instagram: "https://instagram.com/example",
  palette: "nocturne" as const,
  fontPairing: "karla" as const,
  bookingUrl: "/contact",
};

export const defaultHomePage = {
  hero: {
    eyebrow: "Restorative · Yin · Candlelit slow flow",
    heading: "Come as you are, at the end of the day",
    body: "Small evening classes in East Austin for people who spend all day being useful to everyone else. No mirrors, no music you have to shout over, no one watching to see whether you can touch your toes.",
    primaryCta: { label: "See the schedule", href: "/classes" },
    secondaryCta: { label: "New here? Start here", href: "/classes#first-time" },
    image: undefined as SanityImageWithAlt | undefined,
    imageUrl: demoPhoto("photo-1655362693203-e1f03d5fe7ef", 2000, 1400),
    imageAlt: "A woman resting forward over her knees on a dark wooden floor, lit from one side",
  },

  intro: {
    heading: "A practice for the hours when you finally stop",
    body: "Most yoga is sold as something to achieve. This isn't that. These are slow, warm, deliberately unambitious classes built around the nervous system you actually have at seven in the evening, not the one you wish you had at six in the morning.",
  },

  classTypesHeading: "What I teach",
  classTypesIntro:
    "Three ways in. None of them require flexibility, equipment, or any previous experience.",
  classTypes: [
    {
      name: "Restorative",
      image: undefined as SanityImageWithAlt | undefined,
      imageUrl: demoPhoto("photo-1552206735-e18f41fe76de", 900, 675),
      imageAlt: "An eye pillow resting over closed eyes",
      duration: "75 minutes",
      intensity: 1,
      summary:
        "Four or five shapes in an hour and a quarter, each one held for long enough that your body stops bracing. Fully propped with bolsters and blankets. You will probably fall asleep. That's allowed.",
      forWhom: "Anyone exhausted, recovering, pregnant, or grieving.",
    },
    {
      name: "Yin",
      image: undefined as SanityImageWithAlt | undefined,
      imageUrl: demoPhoto("photo-1540205597869-814e97c94f25", 900, 675),
      imageAlt: "A long forward fold held over a folded blanket",
      duration: "75 minutes",
      intensity: 2,
      summary:
        "Floor-based, long holds, working into connective tissue rather than muscle. Quieter than it sounds and harder than it looks. We work at the edge of sensation, never past it.",
      forWhom: "Desk bodies, runners, and anyone who sits for a living.",
    },
    {
      name: "Candlelit slow flow",
      image: undefined as SanityImageWithAlt | undefined,
      imageUrl: demoPhoto("photo-1706922122814-12402375d89a", 900, 675),
      imageAlt: "A row of candles burning in a dark room",
      duration: "60 minutes",
      intensity: 3,
      summary:
        "Movement linked to breath, at about half the pace of a studio vinyasa. Warm enough to feel like exercise, slow enough to feel like rest. Lit by candles, so there is nothing to compare yourself to.",
      forWhom: "People who want to move but not be shouted at.",
    },
  ],

  /**
   * The weekly schedule is the centrepiece of this layout.
   *
   * A yoga site answers three questions — what is it, when can I come, what
   * does it cost — and the middle one is the only one every other template
   * handles badly, because a therapy site has no equivalent. Making it the
   * signature section is the layout's actual differentiator.
   */
  scheduleHeading: "This week",
  scheduleIntro:
    "Classes run Monday through Thursday evenings and Sunday at dusk. Twelve mats, booked in advance, because a full room changes the practice.",
  scheduleNote:
    "Doors open fifteen minutes early. If you're running late, come anyway — slipping in quietly during the first few minutes is completely fine.",
  schedule: [
    { day: "Monday", time: "6:30 pm", className: "Restorative", duration: "75 min", spaces: "12 mats" },
    { day: "Monday", time: "8:00 pm", className: "Yin", duration: "75 min", spaces: "12 mats" },
    { day: "Tuesday", time: "7:00 pm", className: "Candlelit slow flow", duration: "60 min", spaces: "12 mats" },
    { day: "Wednesday", time: "6:30 pm", className: "Restorative", duration: "75 min", spaces: "12 mats" },
    { day: "Thursday", time: "7:00 pm", className: "Candlelit slow flow", duration: "60 min", spaces: "12 mats" },
    { day: "Thursday", time: "8:15 pm", className: "Yin", duration: "75 min", spaces: "8 mats" },
    { day: "Sunday", time: "6:00 pm", className: "Restorative", duration: "75 min", spaces: "12 mats" },
  ],

  /**
   * The anxiety section. For a beginner the barrier is almost never price or
   * timing, it is not knowing what happens when they walk in. Every unanswered
   * practical question is a reason not to come.
   */
  firstTimeHeading: "If you've never done this before",
  firstTimeIntro:
    "Here is everything, so you can decide without having to ask.",
  firstTime: [
    {
      q: "What do I bring?",
      a: "Yourself. Mats, bolsters, blankets and blocks are all here. Wear whatever you can lie down comfortably in.",
    },
    {
      q: "Do I need to be flexible?",
      a: "No. Flexibility is a result of practice, not a requirement for it. Everything has a version that works for your body tonight.",
    },
    {
      q: "Will I be the only beginner?",
      a: "No. Roughly a third of any given class is in their first month, and nobody can tell who is who in candlelight anyway.",
    },
    {
      q: "What if I need to leave early?",
      a: "Then leave early. Roll up your mat and go. No one will mind and I won't take it personally.",
    },
    {
      q: "Is there chanting?",
      a: "No chanting, no Sanskrit you're expected to know, and no one will touch you without asking first.",
    },
  ],

  teacherHeading: "Who you'll be practicing with",
  teacherBody:
    "I came to yoga late and badly, in my thirties, after a decade of treating my body as something that carried my head to meetings. I teach the practice I needed then: unhurried, unglamorous, and genuinely kind about where you're starting from.",
  teacherCta: { label: "More about me", href: "/about" },

  testimonial: {
    quote:
      "I'd spent years assuming yoga wasn't for people like me. Three months in, Thursday night is the only hour of my week I protect completely.",
    attribution: "Dani R., practicing since spring",
  },

  pricingHeading: "What it costs",
  pricingIntro: "No membership, no contract, no auto-renewal to cancel.",
  pricing: [
    { label: "First class", price: "Free", note: "Genuinely. Come and see." },
    { label: "Drop in", price: "$22", note: "One class, whenever." },
    { label: "Five classes", price: "$95", note: "No expiry date." },
    { label: "Monthly", price: "$120", note: "Unlimited. Cancel any time." },
  ],
  pricingNote:
    "If money is the reason you're not coming, say so and we'll work it out. That offer is real and nobody has ever abused it.",

  closing: {
    image: undefined as SanityImageWithAlt | undefined,
    imageUrl: demoPhoto("photo-1744918712163-64993d95d6be", 2000, 1200),
    imageAlt: "Candles burning low in a dim room",
    heading: "The hardest part is the first time",
    body: "You don't need to be ready. You need to pick a night and put it in your calendar.",
    cta: { label: "See the schedule", href: "/classes" },
  },
};

export type VesperHomePage = typeof defaultHomePage;
export type VesperSiteSettings = typeof defaultSiteSettings;

export const defaultClassesPage = {
  eyebrow: "Classes",
  heading: "Four nights a week, and Sunday at dusk",
  intro:
    "Every class is capped at twelve mats. Book ahead if you can, but if you turn up and there's room, there's room.",
  bookingNote:
    "Booking is by email for now. Send me the night you want and I'll hold a mat — no app, no account, no password to forget.",
};

export const defaultAboutPage = {
  eyebrow: "About",
  heading: "Nora Vance",
  credential: "RYT-500 · Teaching since 2018",
  image: undefined as SanityImageWithAlt | undefined,
  imageUrl: demoPhoto("photo-1737638699849-f4eeb326e943", 1200, 1500),
  imageAlt: "Nora sitting on the floor of a warm, dimly lit room",
  body: [
    "I came to yoga late and badly, in my thirties, after a decade of treating my body as something that carried my head to meetings. My first class was humiliating. I spent most of it looking sideways to check what everyone else was doing, and I did not go back for a year.",
    "When I did go back, it was to a small evening restorative class in a room with the lights off, taught by someone who never once mentioned alignment. That hour did more for me than the previous decade of trying to be good at exercise. It is the class I now teach.",
    "I trained at 200 hours in 2018 and finished my 500 in 2022, with additional training in trauma-informed teaching and in working with pregnancy and postpartum. What that means in practice is that I will offer you options rather than corrections, I will ask before I touch you, and I will never tell you that you should be further along than you are.",
  ],
  trainingHeading: "Training",
  training: [
    { label: "RYT-500", detail: "Yoga Alliance registered, completed 2022" },
    { label: "Trauma-informed teaching", detail: "60-hour certification, 2023" },
    { label: "Prenatal and postpartum", detail: "85-hour certification, 2021" },
    { label: "Yin", detail: "50-hour immersion, 2020" },
  ],
  closing: {
    heading: "Come and see whether it suits you",
    body: "Your first class is free, and there is no expectation that you come back.",
    cta: { label: "See the schedule", href: "/classes" },
  },
};

export const defaultContactPage = {
  eyebrow: "Contact",
  heading: "Say hello",
  intro:
    "Questions about whether a class is right for you are welcome and never a bother. I answer everything myself, usually the same evening.",
  studioHeading: "The studio",
  studioBody:
    "A small room above a bakery in East Austin. Street parking is easy after six. Come up the side stairs; the door is the one with the lantern.",
  accessibilityHeading: "Access",
  accessibilityBody:
    "The studio is up one flight of stairs with no lift, which I know rules it out for some people. If stairs are a barrier and you would like to practice, email me — I teach a handful of home sessions and I would rather find a way than have you not ask.",
};

/**
 * Demo journal posts. Replaced entirely on a provisioned site; these exist so
 * the blog route is not an empty shell in the demo.
 */
export const demoPosts = [
  {
    slug: "what-restorative-actually-means",
    title: "What “restorative” actually means",
    excerpt:
      "It is not gentle yoga, and it is not a nap with extra steps. Here is what the word is doing and why the props matter.",
    publishedAt: "2026-09-18",
    readingTime: "4 min",
  },
  {
    slug: "you-do-not-need-to-be-flexible",
    title: "You do not need to be flexible",
    excerpt:
      "The single most common reason people give for not coming, and why it has the logic exactly backwards.",
    publishedAt: "2026-08-30",
    readingTime: "3 min",
  },
  {
    slug: "on-practicing-when-everything-is-loud",
    title: "On practicing when everything is loud",
    excerpt:
      "What to do with a practice when your life, your head, or the news will not quiet down enough for it.",
    publishedAt: "2026-08-02",
    readingTime: "6 min",
  },
];
