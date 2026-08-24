# joselo.blog

A dark-mode-first personal publication built with Next.js, MDX and TinaCMS.

## Local development

```bash
npm install
npm run dev
```

- Public site: `http://localhost:3000`
- Tina editor: `http://localhost:3000/admin/index.html`

The public site reads directly from `content/`; it does not require TinaCloud.
`npm run build` generates a local Tina admin and then runs the Next.js production
build as a separate process. After TinaCloud is provisioned, add the values from
`.env.example` and set the Vercel build command to `npm run build:cloud`.

## Publishing model

- Posts are MDX files under `content/posts`.
- `draft: true` posts never appear in routes, search, RSS or sitemap.
- Site pages are MDX files under `content/pages`.
- Media lives under `public/images` so the publication stays portable.

No GitHub, Vercel or TinaCloud resource is created by this local repository.
