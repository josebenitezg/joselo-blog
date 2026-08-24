import { defineConfig } from "tinacms";

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ??
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ??
  process.env.HEAD ??
  "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID ?? null,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Writing",
        path: "content/posts",
        format: "mdx",
        ui: {
          router: ({ document }) => `/${document._sys.filename}`,
        },
        defaultItem: () => ({
          draft: true,
          language: "en",
          kind: "essay",
        }),
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
            ui: { component: "textarea" },
          },
          {
            type: "datetime",
            name: "date",
            label: "Published at",
            required: true,
          },
          {
            type: "boolean",
            name: "draft",
            label: "Draft",
          },
          {
            type: "string",
            name: "language",
            label: "Language",
            options: [
              { label: "English", value: "en" },
              { label: "Español", value: "es" },
            ],
            required: true,
          },
          {
            type: "string",
            name: "kind",
            label: "Kind",
            options: [
              { label: "Essay", value: "essay" },
              { label: "Note", value: "note" },
              { label: "Experiment", value: "experiment" },
            ],
            required: true,
          },
          {
            type: "string",
            name: "tags",
            label: "Topics",
            list: true,
          },
          {
            type: "image",
            name: "image",
            label: "Cover image",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "page",
        label: "Pages",
        path: "content/pages",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "headline",
            label: "Headline",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
            ui: { component: "textarea" },
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
