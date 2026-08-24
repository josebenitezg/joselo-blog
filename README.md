# joselo.blog

A dark-mode-first personal publication powered by Next.js App Router and Payload CMS.
Payload/Postgres is the only runtime source of truth; the Markdown files under
`src/seed/fixtures` exist only for the one-way, idempotent content import.

## Local development

Requirements: Node 24, Docker Desktop, and npm.

```bash
cp .env.example .env.local
# Fill PAYLOAD_SECRET and PAYLOAD_PREVIEW_SECRET.
npm install
npm run db:up
npm run db:migrate
npm run seed
npm run dev
```

- Publication: `http://localhost:3000`
- Payload admin: `http://localhost:3000/admin`

The first admin can be created in `/admin`, or deterministically during the seed
when `PAYLOAD_ADMIN_EMAIL` and `PAYLOAD_ADMIN_PASSWORD` are present. Never put
real credentials in committed files.

## Content model

- `Posts`: short slug, metadata, cover relation, tags, and Lexical rich text.
- `Pages`: the curated About and Personal lab pages.
- `Media`: local files in development and Vercel Blob in production.
- `Users`: Payload-authenticated administrators.

Posts and pages include drafts, versions, autosave, scheduled publishing, and
authenticated live preview. Public queries enforce published status. The seed
uses Payload's Markdown-to-Lexical converter; display math is preserved as a
first-class Equation block and rendered with KaTeX.

## Production on Vercel

Provision these resources only after approval:

1. A Neon Postgres database linked to the existing Vercel project.
2. A Vercel Blob store for the `media` collection.
3. Production and Preview environment variables from `.env.example`.

Required production variables are `PAYLOAD_DATABASE_URL`, `PAYLOAD_SECRET`,
`PAYLOAD_PREVIEW_SECRET`, `BLOB_READ_WRITE_TOKEN`, and
`NEXT_PUBLIC_SITE_URL=https://joselo.blog` (Production scope). Payload uses
Vercel's deployment URL automatically in Preview, so admin and live-preview
iframes stay on the current deployment. Run committed Payload migrations against
Neon before serving a new schema. Blob client uploads are enabled so large media
does not cross the Vercel Function upload limit.

## Quality gates

```bash
npm run payload:generate
npm run check
```

`npm run check` runs lint, TypeScript, tests, and the Next production build.
Run `npm run seed` twice against a disposable local database to verify that a
second import makes no content changes or new versions.

`npm audit --omit=dev` currently reports the upstream esbuild development-server
advisory through Payload's `drizzle-kit` dependency. Payload 3.88.0 has no patched
dependency path for it yet; the affected server is not exposed by this app at
runtime. DOMPurify is pinned to its patched release through `overrides`.
