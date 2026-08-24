import type { CollectionConfig } from "payload";

import { authenticated, authenticatedOrPublished } from "@/lib/access";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    defaultColumns: ["title", "slug", "_status"],
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
    maxPerDoc: 25,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "select",
      required: true,
      unique: true,
      index: true,
      options: [
        { label: "About", value: "about" },
        { label: "Personal lab", value: "lab" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "headline",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
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
