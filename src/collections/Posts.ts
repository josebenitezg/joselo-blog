import type { CollectionConfig } from "payload";

import { authenticated, authenticatedOrPublished } from "@/lib/access";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    defaultColumns: ["title", "language", "kind", "publishedAt", "_status"],
    group: "Content",
    livePreview: {
      url: ({ data }) => {
        const secret = process.env.PAYLOAD_PREVIEW_SECRET;
        if (!secret || typeof data.slug !== "string") return null;

        const params = new URLSearchParams({
          path: `/${data.slug}`,
          secret,
        });
        return `/api/preview?${params.toString()}`;
      },
    },
    useAsTitle: "title",
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    readVersions: authenticated,
    update: authenticated,
  },
  versions: {
    drafts: {
      autosave: {
        interval: 800,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      validate: (value: unknown) =>
        typeof value === "string" && slugPattern.test(value)
          ? true
          : "Use lowercase letters, numbers, and hyphens only.",
      admin: {
        description: "Public URL: /this-slug",
        position: "sidebar",
      },
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "publishedAt",
      type: "date",
      required: true,
      index: true,
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
        position: "sidebar",
      },
    },
    {
      name: "language",
      type: "select",
      required: true,
      defaultValue: "en",
      options: [
        { label: "English", value: "en" },
        { label: "Español", value: "es" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "kind",
      type: "select",
      required: true,
      defaultValue: "essay",
      options: [
        { label: "Essay", value: "essay" },
        { label: "Note", value: "note" },
        { label: "Experiment", value: "experiment" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "tags",
      type: "array",
      fields: [
        {
          name: "value",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "cover",
      type: "upload",
      relationTo: "media",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "readingMinutes",
      type: "number",
      min: 1,
      required: true,
      defaultValue: 1,
      admin: {
        description: "Calculated during import; editable for final copy.",
        position: "sidebar",
      },
    },
    {
      name: "content",
      type: "richText",
      required: true,
    },
    {
      name: "sourceHash",
      type: "text",
      admin: {
        hidden: true,
      },
    },
  ],
};
