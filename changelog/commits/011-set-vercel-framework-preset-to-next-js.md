# fix(website): set Vercel framework preset to Next.js

- **Commit:** `6df57dbf8441cd576c142219fa392d34e7493f45` (`6df57db`)
- **Author:** Vidhunnan Murugan
- **Date:** 2026-07-19
- **PR:** #15

## Commit message

The Vercel build compiled fine but failed at the end with "No Output
Directory named 'public' found" — Vercel was treating the project as a
generic static build and looking for public/, while next.config.mjs uses
output: "export" (emitting to out/). Pin the framework preset to nextjs
so Vercel uses Next's output convention and picks up the static export.

## Changes in detail

### `website/vercel.json` (new)
- Adds a `vercel.json` at the website root setting `"framework": "nextjs"`. The Vercel deploy from `prod-stable` had compiled and generated all static pages, then failed at finalize because Vercel had detected the project as a generic static build and looked for a `public/` output directory — but `next.config.mjs` uses `output: "export"`, which emits to `out/`. Pinning the framework preset makes Vercel use Next's output convention and pick up the static export, resolving the "No Output Directory named 'public'" error.

## Files changed

```
 website/vercel.json | 4 ++++
 1 file changed, 4 insertions(+)
```
