import { defineField, defineType } from "sanity";
import { SyncIcon } from "@sanity/icons";

export const feedSource = defineType({
  name: "feedSource",
  title: "Feed source",
  type: "document",
  icon: SyncIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "feedUrl",
      title: "Feed URL",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "defaultCategory",
      title: "Default category",
      type: "reference",
      to: [{ type: "category" }],
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "lastFetchedAt",
      title: "Last fetched at",
      type: "datetime",
      readOnly: true,
      description: "Set automatically by the ingestion job.",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "feedUrl", active: "active" },
    prepare({ title, subtitle, active }) {
      return { title, subtitle: active === false ? `(inactive) ${subtitle}` : subtitle };
    },
  },
});
