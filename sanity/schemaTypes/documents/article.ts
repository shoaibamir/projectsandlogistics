import { defineArrayMember, defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

export const article = defineType({
  name: "article",
  title: "Article",
  type: "document",
  icon: DocumentTextIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "attribution", title: "Attribution" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "contentType",
      title: "Content type",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "News", value: "news" },
          { title: "Blog", value: "blog" },
          { title: "Guide", value: "guide" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featuredImage",
      title: "Featured image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      description: "Shown as the thumbnail on index pages and the homepage. Falls back to a placeholder if empty.",
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      group: "content",
      description:
        "Direct answer / TL;DR — leads the article and is used for AI Overviews and search snippets.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "keyTakeaways",
      title: "Key takeaways",
      type: "array",
      of: [{ type: "string" }],
      group: "content",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                title: "Link",
                type: "object",
                fields: [{ name: "href", title: "URL", type: "url" }],
              },
            ],
          },
        }),
        defineArrayMember({ type: "image", options: { hotspot: true } }),
      ],
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [{ type: "faqItem" }],
      group: "content",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      group: "attribution",
    }),
    defineField({
      name: "reviewedBy",
      title: "Reviewed by",
      type: "reference",
      to: [{ type: "author" }],
      description: "Expert reviewer for fact-checking.",
      group: "attribution",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      group: "content",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
      group: "content",
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      group: "content",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isSyndicated",
      title: "Syndicated from another source",
      type: "boolean",
      group: "attribution",
      initialValue: false,
    }),
    defineField({
      name: "sourceName",
      title: "Source name",
      type: "string",
      group: "attribution",
      hidden: ({ parent }) => !parent?.isSyndicated,
    }),
    defineField({
      name: "sourceUrl",
      title: "Source URL",
      type: "url",
      group: "attribution",
      hidden: ({ parent }) => !parent?.isSyndicated,
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      contentType: "contentType",
      publishedAt: "publishedAt",
      media: "seo.ogImage",
    },
    prepare({ title, contentType, publishedAt, media }) {
      const date = publishedAt ? new Date(publishedAt).toLocaleDateString() : "No date";
      return {
        title,
        subtitle: `${contentType ? contentType.toUpperCase() : "UNSET"} · ${date}`,
        media,
      };
    },
  },
});
