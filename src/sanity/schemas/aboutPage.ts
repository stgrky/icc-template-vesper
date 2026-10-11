import { defineArrayMember, defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Small line above your name", type: "string", initialValue: "About" }),
    defineField({ name: "heading", title: "Your name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "credential",
      title: "Your qualification line",
      description: 'e.g. "RYT-500 · Teaching since 2018".',
      type: "string",
    }),
    defineField({
      name: "image",
      title: "A photo of you, or of the room (optional)",
      description:
        "Shown wide and short under your name. A photo of the space with you in it works better than a headshot — it keeps the subject the practice rather than the profile.",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Describe the photo",
          description: "For anyone using a screen reader, and shown if the image fails to load.",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "body",
      title: "Your story, one paragraph per box",
      description:
        'Press "Add item" for each new paragraph. The first one is set larger than the rest, so lead with the part you most want read.',
      type: "array",
      of: [defineArrayMember({ type: "text", rows: 6 })],
    }),
    defineField({ name: "trainingHeading", title: "Heading for your training list", type: "string", initialValue: "Training" }),
    defineField({
      name: "training",
      title: "Your training",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "training",
          fields: [
            defineField({ name: "label", title: "What it is", description: 'e.g. "RYT-500".', type: "string" }),
            defineField({ name: "detail", title: "Detail", description: 'e.g. "Yoga Alliance registered, completed 2022".', type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "detail" } },
        }),
      ],
    }),
    defineField({
      name: "closing",
      title: "The last thing on the page",
      type: "object",
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
  preview: { prepare: () => ({ title: "About page" }) },
});
