# feat(website): add SEO + social share metadata and preview image

- **Commit:** `dfeb8cc8b1f4f2d51d53bb2d05ba182734d198a0` (`dfeb8cc`)
- **Author:** Claude
- **Date:** 2026-07-19

## Commit message

Complete the landing page's metadata so shared links unfurl with a
title, description, and preview card across every platform. Points
`metadataBase` at the live URL (agentic-skills.vidhunnan.design)
instead of the GitHub repo so Open Graph / Twitter image URLs resolve
absolute; adds the full Open Graph set, a summary_large_image Twitter
card, keywords, canonical, and robots directives; adds a 1200×630
Open Graph preview image and the favicon set.

## Changes in detail

### `website/app/layout.tsx` (modified)
- Repointed `metadataBase` from the GitHub repo URL to the live site (`https://agentic-skills.vidhunnan.design`) so every relative asset in the metadata (the OG/Twitter image) resolves to an absolute URL — the thing that actually makes share cards render.
- Added the full Open Graph object: `type`, `url`, `siteName`, `locale`, and a `1200×630` `image` with `alt` and `type`.
- Added a `summary_large_image` Twitter card (title, description, image + alt).
- Added `keywords`, `alternates.canonical` (`/`), a `robots` block (`index`/`follow` + `googleBot max-image-preview: large`), and `applicationName` / `creator` / `publisher`. Copy is factored into named constants so the title/description stay in one place.

### `website/public/og.png` (new)
- The `1200×630` social preview image, rendered in the site's own Field Report / Swiss-whitepaper style: the Newsreader serif hero line ("An agent starts every session with no memory of the last one."), the cobalt hairline system, the mono `/plugin marketplace add` command, the wordmark + URL, and the corner crop-tick frame.

### `website/app/favicon.ico`, `website/app/icon.png`, `website/app/apple-icon.png` (new)
- Favicons wired through the Next.js App Router file convention (auto-emitted into `<head>`). A cobalt rounded-square "a" monogram with the redline crop-tick signature: `favicon.ico` bundles 16/32/48, `icon.png` is 512, and `apple-icon.png` is a full-bleed 180 (iOS masks the corners itself).

## Files changed

```
 website/app/apple-icon.png | Bin 0 -> 2527 bytes
 website/app/favicon.ico    | Bin 0 -> 2566 bytes
 website/app/icon.png       | Bin 0 -> 12007 bytes
 website/app/layout.tsx     |  61 +++++++++++++++++++++++++++++++++++++++------
 website/public/og.png      | Bin 0 -> 62462 bytes
 5 files changed, 54 insertions(+), 7 deletions(-)
```
