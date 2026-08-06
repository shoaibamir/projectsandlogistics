import type { SchemaTypeDefinition } from "sanity";

import { seo } from "./objects/seo";
import { faqItem } from "./objects/faqItem";
import { socialLink } from "./objects/socialLink";

import { author } from "./documents/author";
import { category } from "./documents/category";
import { tag } from "./documents/tag";
import { article } from "./documents/article";
import { feedSource } from "./documents/feedSource";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [seo, faqItem, socialLink, author, category, tag, article, feedSource],
};
