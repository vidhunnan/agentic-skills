# Changelog

A running record of substantive changes to `agentic-skills`. Format loosely follows [Keep a Changelog](https://keepachangelog.com/).

## Per-commit documentation

Every substantive commit is documented in a file under [`commits/`](./commits/), numbered chronologically. Merge commits and changelog-only commits are omitted.

| # | Commit | Date | Subject |
|---|--------|------|---------|
| [012](./commits/012-log-the-four-website-adrs.md) | `efcb70b` | 2026-07-19 | Log the four website ADRs (0015–0018) |
| [011](./commits/011-set-vercel-framework-preset-to-next-js.md) | `6df57db` | 2026-07-19 | Set the Vercel framework preset to Next.js |
| [010](./commits/010-add-seo-and-social-share-metadata.md) | `dfeb8cc` | 2026-07-19 | Add SEO + social share metadata and preview image to the website |
| [009](./commits/009-add-swiss-whitepaper-landing-page.md) | `e4a1f2e` | 2026-07-19 | Add a Swiss-whitepaper landing page under /website |
| [008](./commits/008-session-log-section.md) | `091f679` | 2026-07-13 | Add a near-verbatim Session Log section to handoff-generator |
| [007](./commits/007-comprehensive-project-handoff.md) | `826dad1` | 2026-07-13 | Rework handoff-generator into a comprehensive project handoff |
| [006](./commits/006-rewrite-the-readme-around-the-context-stack.md) | `4ab3c74` | 2026-07-13 | Rewrite the README around the context stack |
| [005](./commits/005-add-decisions-logger-skill.md) | `d6ee986` | 2026-07-13 | Add decisions-logger skill |
| [004](./commits/004-add-repo-setup-skill-and-scaffold-this-repos-context-stack.md) | `32e425a` | 2026-07-13 | Add repo-setup skill and scaffold this repo's context stack |
| [003](./commits/003-add-changelog-baseline-model-strategy-and-skill-protocol-registrations.md) | `0fc116e` | 2026-07-12 | Add changelog baseline, model strategy, and skill protocol registrations |
| [002](./commits/002-add-install-commands-for-all-skills-in-readme.md) | `75f7a7c` | 2026-07-12 | Add install commands for all skills in README |
| [001](./commits/001-add-three-git-workflow-skills-shared-claude-md-registration.md) | `506a5c6` | 2026-07-12 | Add three git-workflow skills + shared CLAUDE.md registration |

---

## 2026-07-19

### Added
- **SEO + social share metadata for the landing page** (`dfeb8cc`) — the site now unfurls with a title, description, and preview card when shared. `metadataBase` moves from the GitHub repo URL to the live site (`agentic-skills.vidhunnan.design`) so the Open Graph / Twitter image resolves absolute; adds the full Open Graph set (type, url, siteName, locale, `1200×630` image + alt), a `summary_large_image` Twitter card, `keywords`, a canonical link, and `robots` directives. Ships a `1200×630` `og.png` preview image in the site's own Field Report / Swiss-whitepaper style (serif hero line, cobalt hairlines, mono install command, crop-tick frame) and a favicon set wired through the App Router file convention (`favicon.ico` 16/32/48, `icon.png` 512, full-bleed `apple-icon.png` 180) — a cobalt "a" monogram with the redline crop-tick signature.
- **Landing page under `/website`** (`e4a1f2e`) — a Next.js static-export site for the six skills, built in the "Swiss whitepaper" direction: the talk deck's Field Report palette (paper, ink, drafting cobalt `#2743C8`, redline `#D0361B`) pared to a light, airy, minimal-ink treatment with one hairline-rule system and Newsreader / Archivo / IBM Plex Mono. Its content is data-driven from a single `components/lib/skills.ts` sourced from the README and each `SKILL.md`, so the site can't drift from the real skills. Sections: a sticky nav with scroll-progress and scrollspy, a hero with a copy-able marketplace command, the five-tier context stack, the six skills in their three groups, a "this repo runs on its own skills" proof list, and the install block. The app is isolated from the build-free skills tree (its own `package.json`), and its build artifacts are gitignored.

### Changed
- **Logged the four website ADRs** (`efcb70b`) — records the decisions behind the `/website` build in `docs/decisions/` as ADRs 0015–0018: the site is an isolated Next.js build (over a static HTML file), its content is data-driven from one `components/lib/skills.ts` sourced from the repo (over hardcoding), the design direction is "Swiss whitepaper" (over the Field Report and Blueprint concepts), and styling is plain CSS Modules (over Tailwind). Each traces to `git:e4a1f2e`, the approved plan, or the owner's own words this session. Rebuilds the decisions index (18 decisions stand, no supersessions) and adds four `below-bar` rows to the reject ledger.

### Fixed
- **Vercel framework preset** (`6df57db`) — the deploy compiled but failed at finalize with "No Output Directory named 'public' found": Vercel had detected the project as a generic static build while `next.config.mjs` uses `output: "export"` (emitting to `out/`). Adds `website/vercel.json` pinning the framework preset to `nextjs`, so Vercel uses Next's output convention and picks up the static export.

## 2026-07-13

### Added
- **`repo-setup` skill** (`32e425a`) — scaffolds a project's context stack: the tiered docs folders (concepts, PRDs, decisions, handoffs, changelog, optional phases) that let an agent with no memory be briefed on a project, each declaring the question it answers and how far it can be trusted. It surveys a repo before writing, adopts existing folder names rather than imposing canon, and is strictly additive — it never moves, renames, or overwrites.
- **This repo's own context stack** (`32e425a`) — `repo-setup` run on `agentic-skills`: adds `docs/concepts/` and `docs/decisions/`, a README plus `_TEMPLATE.md` for all five tiers (adopting the existing `handoff/`, `docs/prds/`, and `changelog/` under their current names), and the context-stack routing table in `CLAUDE.md`.
- **`decisions-logger` skill** (`d6ee986`) — mines a project for the decisions that were actually made and writes each as a numbered ADR with its evidence. Built around a **source firewall**: a candidate may be *born* in a weak source but never *justified* by one, so a rule stated without a reason (CLAUDE.md's protocol blocks) can be found but never rationalized. Where the "why" was never written down it asks, and where nobody remembers it records `(reason not stated)` — it never invents one.

### Changed
- **`handoff-generator` gains a near-verbatim Session Log** (`091f679`) — an eleventh section that preserves the session's conversation itself: a chronological, near-verbatim record of the key exchanges (asks, options explored, what was chosen and why, follow-ups) in the words used, so the receiver gets the reasoning journey and not only the conclusions. Built on both surfaces from the current session's own conversation, placed last so the actionable briefing stays on top. Faithful-not-generative — the meaningful beats not every message, never a fabricated turn, secrets redacted. PRD to v0.5; `handoff/_TEMPLATE.md` and the "not verbatim minutes" README line reconciled; plugin `0.4.0 → 0.5.0`.
- **`handoff-generator` reworked into a comprehensive project handoff** (`826dad1`) — the minimal five-section brief is replaced by a single ten-section project handoff (What this is · Snapshot · Progress & Timeline · Features/Components · Decisions Made · What this session changed · Open Questions · Files Referenced · Next Actions · Notes for the receiver). The section shape is identical on both surfaces; only the sourcing differs — on Claude Code it is verified against the repo (git for the timeline, `changelog/` for the session delta, `docs/decisions/` for decision cross-refs, git for exact repo state), degrading gracefully when a source is absent; on Claude.ai it is drawn from the conversation. Faithful-not-generative is kept and sharpened: never invent a timeline or changelog not backed by git, and never cite a PRD/concept as proof something shipped. PRD to v0.4; `handoff/_TEMPLATE.md` kept in sync; plugin `0.3.0 → 0.4.0`.
- **README rewritten around the context stack** (`4ab3c74`) — the install section is now three independently copyable blocks instead of one that ran all six installs at once, with each skill's `/plugin install` command beside its name in the table. The Skills tables are grouped by job (`repo-setup` builds the stack; `changelog-tracker` / `decisions-logger` / `handoff-generator` fill it; `branch-naming` / `model-strategy` hold the conventions), and the Status column reads `Live` rather than an identical "Implemented (PRD)" on every row. Adds "The context stack" (what each folder means and how far to trust it) and "This repo runs on its own skills" (where to find the 14 ADRs, the changelog, and the model strategy).
- **The decisions tier's append-only rule** (`d6ee986`) — made precise. The *reasoning* (Context/Decision/Alternatives/Consequences) is frozen; the `**Status:**` line is a navigational pointer and `## Follow-up` is append-only. A superseded ADR still reading "Accepted" lies to the next reader, so exactly two mutations are permitted, enforced by a byte-identical check on the frozen body. `docs/decisions/_TEMPLATE.md` gains `## Evidence` and `## Follow-up`.

## 2026-07-12

### Added
- **Three git-workflow skills** (`506a5c6`) — `changelog-tracker`, `model-strategy`, and `branch-naming`, each with a SKILL.md, plugin manifest, and PRD, plus a shared CLAUDE.md protocol-registration mechanism reused across the library (and retrofitted into `handoff-generator`).
- **Changelog baseline, model strategy, and protocol registrations** (`0fc116e`) — the repo dogfooding its own skills: `changelog/` (this index plus per-commit files), `docs/MODEL-STRATEGY.md` (Opus 4.8 as the default tier, Sonnet 5 for plumbing, plus a mandatory review rule for anything that writes into a user's own CLAUDE.md), and an "Active protocols" section in `CLAUDE.md` holding the live `changelog-tracker`, `branch-naming`, and `model-strategy` blocks.

### Changed
- **README install commands** (`75f7a7c`) — the Install section now lists `/plugin install` for all four skills, not just `handoff-generator`.
