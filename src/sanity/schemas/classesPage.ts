import { defineField, defineType } from "sanity";

/**
 * The classes page.
 *
 * Deliberately thin. The class types, the weekly schedule and the first-timer
 * questions all live on the Home page document and are reused here, so a
 * teacher changing a class time changes it in one place and not two. Only the
 * page's own wording belongs in this document.
 */
export const classesPage = defineType({
  name: "classesPage",
  title: "Classes page",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Small line above the headline", type: "string", initialValue: "Classes" }),
    defineField({ name: "heading", title: "Headline", type: "string", validation: (r) => r.required() }),
    defineField({ name: "intro", title: "A sentence or two underneath", type: "text", rows: 4 }),
    defineField({
      name: "bookingNote",
      title: "How people book",
      description:
        "Shown under the prices. Say plainly what someone should do to reserve a mat — your email address is added automatically after this text.",
      type: "text",
      rows: 4,
    }),
  ],
  preview: { prepare: () => ({ title: "Classes page" }) },
});
