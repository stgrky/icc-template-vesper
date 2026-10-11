import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * The home page.
 *
 * Field descriptions are written for the teacher, not for a developer. She is
 * the one reading them at nine at night trying to change a class time, and
 * every term she has to look up is a reason to email instead.
 */
export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  groups: [
    { name: "top", title: "Top of the page", default: true },
    { name: "classes", title: "Classes & schedule" },
    { name: "trust", title: "First-timers & about" },
    { name: "money", title: "Prices" },
  ],
  fields: [
    defineField({
      name: "hero",
      title: "The first thing people see",
      type: "object",
      group: "top",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Small line above the headline",
          description: 'The kinds of class you teach, e.g. "Restorative · Yin · Candlelit slow flow".',
          type: "string",
        }),
        defineField({
          name: "heading",
          title: "Headline",
          description: "The big line. Short is better — two lines at most.",
          type: "string",
          validation: (r) => r.required(),
        }),
        defineField({
          name: "body",
          title: "A sentence or two underneath",
          type: "text",
          rows: 4,
        }),
        defineField({
          name: "primaryCta",
          title: "Main button",
          type: "object",
          fields: [
            defineField({ name: "label", title: "Button text", type: "string" }),
            defineField({
              name: "href",
              title: "Where it goes",
              description: 'A page on your site, like /classes, or a full web address.',
              type: "string",
            }),
          ],
        }),
        defineField({
          name: "secondaryCta",
          title: "Second link (optional)",
          type: "object",
          fields: [
            defineField({ name: "label", title: "Link text", type: "string" }),
            defineField({ name: "href", title: "Where it goes", type: "string" }),
          ],
        }),
      ],
    }),

    defineField({
      name: "intro",
      title: "What this practice is",
      type: "object",
      group: "top",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "body", title: "A short paragraph", type: "text", rows: 5 }),
      ],
    }),

    defineField({ name: "classTypesHeading", title: "Heading above your class types", type: "string", group: "classes" }),
    defineField({ name: "classTypesIntro", title: "A line under that heading", type: "text", rows: 3, group: "classes" }),
    defineField({
      name: "classTypes",
      title: "The kinds of class you teach",
      description:
        'One card each. These also feed the intensity marks on the schedule below, so the name here must match the name you pick on each class time.',
      type: "array",
      group: "classes",
      of: [
        defineArrayMember({
          type: "object",
          name: "classType",
          fields: [
            defineField({ name: "name", title: "Class name", type: "string", validation: (r) => r.required() }),
            defineField({ name: "duration", title: "How long", description: 'e.g. "75 minutes".', type: "string" }),
            defineField({
              name: "intensity",
              title: "How hard is it?",
              description: "1 is fully supported rest, 3 is the most active thing you teach. Shown as marks, never as a number.",
              type: "number",
              options: { list: [1, 2, 3], layout: "radio", direction: "horizontal" },
              initialValue: 1,
            }),
            defineField({ name: "summary", title: "What happens in it", type: "text", rows: 5 }),
            defineField({
              name: "forWhom",
              title: "Who it suits",
              description: 'One line, shown in italics. e.g. "Anyone exhausted, recovering, or grieving."',
              type: "string",
            }),
          ],
          preview: { select: { title: "name", subtitle: "duration" } },
        }),
      ],
    }),

    defineField({ name: "scheduleHeading", title: "Heading above the schedule", type: "string", group: "classes" }),
    defineField({ name: "scheduleIntro", title: "A line under that heading", type: "text", rows: 3, group: "classes" }),
    defineField({
      name: "schedule",
      title: "Your weekly class times",
      description:
        "One entry per class. They group themselves by day on the page, in the order you list the days here — so put Monday's classes before Tuesday's.",
      type: "array",
      group: "classes",
      of: [
        defineArrayMember({
          type: "object",
          name: "slot",
          fields: [
            defineField({
              name: "day",
              title: "Day",
              type: "string",
              options: {
                list: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              },
              validation: (r) => r.required(),
            }),
            defineField({ name: "time", title: "Start time", description: 'e.g. "6:30 pm".', type: "string", validation: (r) => r.required() }),
            defineField({
              name: "className",
              title: "Which class",
              description: "Type it exactly as you named it above, so the intensity marks match.",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({ name: "duration", title: "How long", description: 'e.g. "75 min".', type: "string" }),
            defineField({ name: "spaces", title: "How many spaces", description: 'e.g. "12 mats".', type: "string" }),
          ],
          preview: {
            select: { day: "day", time: "time", className: "className" },
            prepare: ({ day, time, className }) => ({ title: `${day ?? "?"} · ${time ?? "?"}`, subtitle: className }),
          },
        }),
      ],
    }),
    defineField({ name: "scheduleNote", title: "A note under the schedule", description: "Arriving late, doors opening, anything practical.", type: "text", rows: 3, group: "classes" }),

    defineField({ name: "firstTimeHeading", title: "Heading for the first-timer questions", type: "string", group: "trust" }),
    defineField({ name: "firstTimeIntro", title: "A line under that heading", type: "text", rows: 3, group: "trust" }),
    defineField({
      name: "firstTime",
      title: "Questions a first-timer has",
      description:
        "This is the section that gets people through the door. The thing stopping someone booking is almost never price — it is not knowing what happens when they walk in.",
      type: "array",
      group: "trust",
      of: [
        defineArrayMember({
          type: "object",
          name: "qa",
          fields: [
            defineField({ name: "q", title: "Question", type: "string" }),
            defineField({ name: "a", title: "Answer", type: "text", rows: 4 }),
          ],
          preview: { select: { title: "q" } },
        }),
      ],
    }),

    defineField({ name: "teacherHeading", title: "Heading for your short intro", type: "string", group: "trust" }),
    defineField({ name: "teacherBody", title: "A paragraph about you", description: "Short. The About page is where the long version lives.", type: "text", rows: 5, group: "trust" }),
    defineField({
      name: "teacherCta",
      title: "Link to your About page",
      type: "object",
      group: "trust",
      fields: [
        defineField({ name: "label", title: "Link text", type: "string" }),
        defineField({ name: "href", title: "Where it goes", type: "string" }),
      ],
    }),

    defineField({
      name: "testimonial",
      title: "One quote from a student",
      description: "One, not five. A single believable voice reads better than a wall of praise.",
      type: "object",
      group: "trust",
      fields: [
        defineField({ name: "quote", title: "What they said", type: "text", rows: 4 }),
        defineField({ name: "attribution", title: "Who said it", description: 'First name and an initial is plenty, e.g. "Dani R., practicing since spring".', type: "string" }),
      ],
    }),

    defineField({ name: "pricingHeading", title: "Heading above your prices", type: "string", group: "money" }),
    defineField({ name: "pricingIntro", title: "A line under that heading", type: "text", rows: 3, group: "money" }),
    defineField({
      name: "pricing",
      title: "What it costs",
      type: "array",
      group: "money",
      of: [
        defineArrayMember({
          type: "object",
          name: "tier",
          fields: [
            defineField({ name: "label", title: "What it is", description: 'e.g. "Drop in".', type: "string" }),
            defineField({ name: "price", title: "Price", description: 'Write it how you want it shown, e.g. "$22" or "Free".', type: "string" }),
            defineField({ name: "note", title: "A short line under the price", type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "price" } },
        }),
      ],
    }),
    defineField({ name: "pricingNote", title: "A note under the prices", type: "text", rows: 3, group: "money" }),

    defineField({
      name: "closing",
      title: "The last thing on the page",
      type: "object",
      group: "money",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "body", title: "A line underneath", type: "text", rows: 3 }),
        defineField({
          name: "cta",
          title: "Button",
          type: "object",
          fields: [
            defineField({ name: "label", title: "Button text", type: "string" }),
            defineField({ name: "href", title: "Where it goes", type: "string" }),
          ],
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Home page" }) },
});
