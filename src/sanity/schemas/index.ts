import type { SchemaTypeDefinition } from "sanity";

import { aboutPage } from "./aboutPage";
import { author } from "./author";
import { blockContent } from "./blockContent";
import { category } from "./category";
import { classesPage } from "./classesPage";
import { contactPage } from "./contactPage";
import { homePage } from "./homePage";
import { post } from "./post";
import { siteSettings } from "./siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [
  blockContent,
  author,
  category,
  post,
  siteSettings,
  homePage,
  classesPage,
  aboutPage,
  contactPage,
];

/** One of each — Studio shows them as single documents, not lists. */
export const singletonTypes = new Set([
  "siteSettings",
  "homePage",
  "classesPage",
  "aboutPage",
  "contactPage",
]);
