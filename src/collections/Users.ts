import type { CollectionConfig } from "payload";

import { authenticated } from "@/lib/access";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    group: "System",
    useAsTitle: "email",
  },
  auth: true,
  access: {
    create: async ({ req }) => {
      if (req.user) return true;
      const users = await req.payload.count({
        collection: "users",
        overrideAccess: true,
      });
      return users.totalDocs === 0;
    },
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
  ],
};
