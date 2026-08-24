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
Until those credentials exist, the generated `/admin` shell loads but cloud
login and editing are intentionally unavailable.

## Publishing model

- Posts are MDX files under `content/posts`.
- `draft: true` posts never appear in routes, search, RSS or sitemap.
- Site pages are MDX files under `content/pages`.
- Media lives under `public/images` so the publication stays portable.

## Deployment status

- GitHub: `josebenitezg/joselo-blog`, with this rebuild in draft PR #1.
- Vercel: existing separate project `joselo-blog`; previews deploy from the PR branch.
- Domain: `joselo.blog` is attached to the project, but Namecheap DNS remains
  unchanged until the new production deployment is approved.
- TinaCloud: code is ready; GitHub OAuth authorization and environment secrets
  are the remaining setup steps.

The current Vercel DNS recommendation for the Namecheap apex is two `A` records:
`216.198.79.1` and `64.29.17.1`. Re-check Vercel immediately before changing
DNS because platform recommendations can change.
