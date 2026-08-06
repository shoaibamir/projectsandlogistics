import { defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      description: "e.g. \"Senior editor\" or \"Customs compliance consultant\".",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "credentials",
      title: "Credentials",
      type: "array",
      of: [{ type: "string" }],
      description: "e.g. \"Licensed Customs Broker\", \"15 years in ocean freight\".",
    }),
    defineField({
      name: "sameAs",
      title: "Same as (schema.org)",
      type: "array",
      of: [{ type: "url" }],
      description: "Canonical profile URLs used in Person structured data (LinkedIn, personal site, etc).",
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [{ type: "socialLink" }],
      description: "Shown in the UI on author bylines.",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "image" },
  },
});
