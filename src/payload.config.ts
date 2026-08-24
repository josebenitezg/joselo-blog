import path from "node:path";
import { fileURLToPath } from "node:url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { BlocksFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Equation } from "@/blocks/Equation";
import { Media } from "@/collections/Media";
import { Pages } from "@/collections/Pages";
import { Posts } from "@/collections/Posts";
import { Users } from "@/collections/Users";
import { getServerURL } from "@/lib/server-url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: [
        { name: "mobile", label: "Mobile", width: 390, height: 844 },
        { name: "desktop", label: "Desktop", width: 1440, height: 900 },
      ],
      collections: ["posts", "pages"],
    },
    meta: {
      titleSuffix: " — joselo.blog",
    },
    user: Users.slug,
  },
  collections: [Posts, Pages, Media, Users],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL ?? "",
    },
  }),
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      BlocksFeature({ blocks: [Equation] }),
    ],
  }),
  plugins: [
    vercelBlobStorage({
      alwaysInsertFields: true,
      clientUploads: true,
      collections: {
        media: true,
      },
      enabled: Boolean(blobToken),
      token: blobToken,
    }),
  ],
  secret: process.env.PAYLOAD_SECRET ?? "",
  serverURL: getServerURL(),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
