# 0004. A command palette with actions, not a search box

- **Status:** Superseded by [0005](./0005-the-palette-searches-skills-and-copies-one-thing.md)
- **Date:** 2026-08-16
- **Supersedes:** —

## Context

The site had no search. With eleven skills across five groups, two stacks of
seven and five tiers, and a Proof section of six records, finding a specific
thing meant scrolling and reading — and the page is long.

The request was for *"a search bar like pop-up, Notion style"*.

Two constraints shaped the answer. The site is a **static export** with no server
and no runtime dependencies beyond React, so anything requiring a search service
or an index-building step was out of proportion. And the index is **~35 items** —
small enough that a scoring function is not merely adequate but preferable to a
fuzzy-search library, which would add a dependency to solve a problem that does
not exist at this size.

## Options considered

| Option | The bet | Why it lost |
|---|---|---|
| **Palette with actions — chosen** | The site's actual job is getting an install command into someone's clipboard. A result should be something you can *do*, not just somewhere you can go | — |
| Search and navigate only | Simpler to build and explain; no modifier keys to learn | Rejected: it leaves the install command — the thing most visitors came for — two further interactions away, and the palette would duplicate what the nav already does |
| Index the Markdown content too | Searching *"reason not stated"* or *"append-only"* would surface the actual records, making the repo's content discoverable from the site | Rejected for v1 as disproportionate: it needs a build-time index generated from Markdown, which is real new machinery on a site whose entire build is `next build`. Left as a revisit condition below |
| A visible search input in the nav | Discoverable with no convention to know | Rejected as a *primary* affordance — a persistent input in a 58px nav crowds it and the site is not search-first. Kept as a **trigger button** instead, which is the discoverability without the footprint |

## Decision

A modal command palette, opened by `⌘K` / `Ctrl+K`, by `/`, or by a labelled
**Search ⌘K** button in the nav. Results are drawn from one derived index over
the existing data — skills, both stacks' tiers, page sections, and the Proof
records — and each offers up to three actions:

- `↵` go to the relevant section
- `⌘↵` copy the skill's install command, without closing
- `⇧↵` open the underlying file on GitHub

No search dependency: a ranked scoring function, seven bands, ties broken on
label length.

## What we gave up

- **A convention people have to know.** `⌘K` is invisible to anyone who hasn't
  met it. The nav button mitigates this but does not remove it, and it costs a
  slot in a deliberately sparse nav.
- **Modifier keys are desktop-only.** On touch, tapping a result navigates and
  the copy and GitHub actions are unreachable. The footer hints are hidden below
  720px rather than lying about what is available. A mobile visitor gets a worse
  palette than a desktop one, and that is not fixed.
- **~20KB of JS**, on a page that otherwise needs none to read.
- **A second way to reach everything.** The nav and the palette now overlap, and
  they will drift if one gains a destination the other doesn't. The shared
  `SECTIONS` constant is the mitigation, not a guarantee.

## What would make us revisit

- If people search for **record contents** — phrases like *"reason not stated"*
  rather than skill names — the Markdown index becomes worth its machinery. That
  is the strongest argument for the option rejected above, and the palette's
  current design leaves room for it: a new `CommandKind` and more index entries,
  no interaction change.
- If the mobile experience matters more than it does today, the actions need a
  touch affordance — a per-row menu rather than modifier keys.

## Evidence

- **Primary:** this session, 2026-08-16 — the request, and the palette-with-actions
  option chosen over search-only and over full content indexing.
- **Corroborating:** `website/components/CommandPalette.tsx` ·
  `website/components/lib/skills.ts` §`buildCommandIndex` / `scoreItem` ·
  [ADR 0018](../../docs/decisions/0018-website-styling-is-plain-css-modules.md),
  whose restraint about dependencies this follows.
- **Rationale:** stated at the time.

## Follow-up

*Append-only. Everything above this heading is **frozen**.*

- **2026-08-16** — A ranking defect found by testing rather than by eye: fuzzy
  subsequence matching, ungated, ranked `changelog-tracker` above every
  Chat-capable skill for the query *"chat"* (`c-h-a…t` appears in order in
  "changelog-tracker", which is Code-only). Subsequence now ranks below keyword
  matches and is gated to short single-word queries. Evidence:
  `website/components/lib/skills.ts` §`scoreItem`.
- **2026-08-16** — **Superseded by [0005](./0005-the-palette-searches-skills-and-copies-one-thing.md)**,
  the same day, after review: *"this is too much, just search for skill and copy
  the command."* Two costs named in this ADR's own *What we gave up* came due
  immediately rather than eventually — the desktop-only modifier actions, and
  the palette becoming a second way to reach everything the nav already reached.
  Worth noting that this ADR's premise — *"the site's actual job is getting an
  install command into someone's clipboard"* — was correct, and the thing built
  did not follow from it. Evidence:
  `design/decisions/0005-the-palette-searches-skills-and-copies-one-thing.md`.

---

_**Exactly two things in this file may ever change:** the `**Status:**` line and
additions under `## Follow-up`._
