import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Meta title",
      type: "string",
      description: "Falls back to the article title if left empty.",
    }),
    defineField({
      name: "description",
      title: "Meta description",
      type: "text",
      rows: 3,
      description: "Falls back to the article summary if left empty.",
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "noIndex",
      title: "No index",
      type: "boolean",
      description: "Prevent search engines from indexing this page.",
      initialValue: false,
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      description: "Only set this if the canonical page lives at a different URL than this one.",
    }),
  ],
});
