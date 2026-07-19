# feat(website): add Swiss-whitepaper landing page

- **Commit:** `e4a1f2e508c778c6483812c36f4aeaf8fe39b4da` (`e4a1f2e`)
- **Author:** Vidhunnan Murugan
- **Date:** 2026-07-19

## Commit message

A Next.js static-export landing page for the six skills, at repo root
/website. Light "Field Report"-derived palette (paper, ink, cobalt,
redline) pared to a Swiss-minimal treatment: hairline system, Newsreader
display + Archivo body + IBM Plex Mono. Content is data-driven from a
single components/lib/skills.ts sourced from the README/SKILL.md so it
can't drift from the real skills. Sections: nav with scroll-progress,
hero, the five-tier context stack, the six skills in three groups,
"runs on its own skills" proof, and install. Build artifacts ignored
via .gitignore.

## Changes in detail

### `website/package.json`, `website/package-lock.json`, `website/next.config.mjs`, `website/tsconfig.json` (new)
- Scaffold an isolated Next.js app (App Router, TypeScript) at the repo root, separate from the build-free skills tree. `next.config.mjs` sets `output: "export"` so the site emits static HTML/CSS/JS with no server. A `postcss` override and current Next/React pins keep the dependency audit clean.

### `website/app/layout.tsx` (new)
- Root layout: self-hosts Archivo, Newsreader, and IBM Plex Mono via `next/font/google` (no runtime CDN call), exposes them as CSS variables, and sets page metadata/Open Graph.

### `website/app/globals.css` (new)
- The design tokens: the Field Report palette (paper, ink, cobalt `#2743C8`, redline `#D0361B`) plus the shared hairline-rule system, type-scale variables, `.wrap`/`.eyebrow` helpers, and the reduced-motion-aware `.reveal` scroll-in class.

### `website/app/page.tsx` (new)
- Composes the page from the section components: Nav, Hero, ContextStack, Skills, Proof, Install, Footer.

### `website/components/lib/skills.ts` (new)
- Single source of truth for site content — the six skills in three groups, their surfaces and install commands, plus the five-tier context stack — sourced from `README.md` and each `SKILL.md` so the site can't drift from the real skills.

### `website/components/Nav.tsx`, `Nav.module.css` (new)
- Sticky nav with a scroll-progress bar and scrollspy that highlights the current section; client component.

### `website/components/Hero.tsx`, `Hero.module.css` (new)
- Hero: Newsreader display headline, the "needs a briefing" subline, a copy-able marketplace command, and CTAs.

### `website/components/ContextStack.tsx`, `ContextStack.module.css` (new)
- The "Five tiers, one rule" section — a numbered, hairline-separated list of the five context tiers with a per-row trust label and the "check the changelog, not the PRD" rule.

### `website/components/Skills.tsx`, `Skills.module.css` (new)
- The six skills rendered as numbered rows in their three groups, each with a surface tag, description, and copy-able install command.

### `website/components/Proof.tsx`, `Proof.module.css` (new)
- The "This repo runs on its own skills" section, listing the artifacts each skill produced while building the repo.

### `website/components/Install.tsx`, `Install.module.css` (new)
- The install block: marketplace-add line, the six per-skill install lines, and the Claude.ai zip-and-upload note.

### `website/components/Footer.tsx`, `Footer.module.css` (new)
- Footer with license tag and GitHub/License/Docs links.

### `website/components/CopyButton.tsx`, `CopyButton.module.css` (new)
- Shared clipboard-copy button (client component) used across the hero, skills, and install blocks.

### `website/components/Reveal.tsx` (new)
- Client wrapper that adds the scroll-in reveal via IntersectionObserver, degrading to always-visible when unsupported or under reduced-motion.

### `.gitignore` (modified)
- Ignore the website's build artifacts and generated files: `website/node_modules/`, `website/.next/`, `website/out/`, `website/next-env.d.ts`, and `website/tsconfig.tsbuildinfo`.

## Files changed

```
 .gitignore                                 |    7 +
 website/app/globals.css                    |  136 ++++
 website/app/layout.tsx                     |   54 ++
 website/app/page.tsx                       |   23 +
 website/components/ContextStack.module.css |  114 +++
 website/components/ContextStack.tsx        |   57 ++
 website/components/CopyButton.module.css   |   22 +
 website/components/CopyButton.tsx          |   35 +
 website/components/Footer.module.css       |   30 +
 website/components/Footer.tsx              |   33 +
 website/components/Hero.module.css         |   93 +++
 website/components/Hero.tsx                |   44 ++
 website/components/Install.module.css      |   80 +++
 website/components/Install.tsx             |   45 ++
 website/components/Nav.module.css          |   88 +++
 website/components/Nav.tsx                 |   81 +++
 website/components/Proof.module.css        |   64 ++
 website/components/Proof.tsx               |   52 ++
 website/components/Reveal.tsx              |   51 ++
 website/components/Skills.module.css       |  135 ++++
 website/components/Skills.tsx              |   61 ++
 website/components/lib/skills.ts           |  136 ++++
 website/next.config.mjs                    |    8 +
 website/package-lock.json                  | 1036 ++++++++++++++++++++++++++++
 website/package.json                       |   26 +
 website/tsconfig.json                      |   41 ++
 26 files changed, 2552 insertions(+)
```
