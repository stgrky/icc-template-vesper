import { defineField, defineType } from "sanity";

/**
 * Contact. Your email, phone and location come from Site settings rather than
 * being retyped here, so they can never disagree with the footer.
 */
export const contactPage = defineType({
  name: "contactPage",
  title: "Contact page",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Small line above the headline", type: "string", initialValue: "Contact" }),
    defineField({ name: "heading", title: "Headline", type: "string", validation: (r) => r.required() }),
    defineField({ name: "intro", title: "A sentence or two underneath", type: "text", rows: 4 }),
    defineField({ name: "studioHeading", title: "Heading for the directions", type: "string", initialValue: "The studio" }),
    defineField({
      name: "studioBody",
      title: "How to find you",
      description: "Parking, which door, anything someone needs on the night.",
      type: "text",
      rows: 5,
    }),
    defineField({ name: "accessibilityHeading", title: "Heading for the access note", type: "string", initialValue: "Access" }),
    defineField({
      name: "accessibilityBody",
      title: "Getting in",
      description:
        "Stairs, lifts, step-free access. For some readers this is the single most useful thing on your site, so it gets its own section rather than a line in the footer. Say what is true, including when the answer is awkward.",
      type: "text",
      rows: 5,
    }),
  ],
  preview: { prepare: () => ({ title: "Contact page" }) },
});
