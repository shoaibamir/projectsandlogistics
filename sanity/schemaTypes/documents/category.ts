import { defineField, defineType } from "sanity";
import { TagIcon } from "@sanity/icons";

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "parent",
      title: "Parent category",
      type: "reference",
      to: [{ type: "category" }],
      description: "Optional — leave empty for a top-level category.",
    }),
  ],
  preview: {
    select: { title: "title", parentTitle: "parent.title" },
    prepare({ title, parentTitle }) {
      return { title, subtitle: parentTitle ? `Under ${parentTitle}` : undefined };
    },
  },
});
