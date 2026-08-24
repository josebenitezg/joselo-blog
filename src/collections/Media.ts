import path from "node:path";
import type { CollectionConfig } from "payload";

import { authenticated } from "@/lib/access";

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    group: "Content",
    useAsTitle: "alt",
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  upload: {
    adminThumbnail: "thumbnail",
    focalPoint: true,
    mimeTypes: ["image/*"],
    staticDir: path.resolve(process.cwd(), "public/media"),
    imageSizes: [
      {
        name: "thumbnail",
        width: 480,
        height: 320,
        position: "centre",
      },
      {
        name: "card",
        width: 1200,
        height: 800,
        position: "centre",
      },
    ],
  },
};
