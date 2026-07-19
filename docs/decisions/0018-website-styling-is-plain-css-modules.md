# 0018. Website styling is plain CSS Modules, not Tailwind or a UI library

- **Status:** Accepted
- **Date:** 2026-07-19

## Context

The Next.js site needed a styling approach. The chosen design direction ([0017](./0017-the-website-design-direction-is-swiss-whitepaper.md)) is deliberately restrained — a single hairline-rule system, heavy whitespace, sparse accent colour — and the owner wanted to keep the dependency surface small.

## Decision

We styled the site with **plain CSS Modules** (one `*.module.css` per component) plus a single global `globals.css` holding the reset and the design tokens. No Tailwind, no component or UI library.

## Alternatives considered

- **Tailwind CSS** — the common default for a Next.js site. Rejected: it adds a build-time dependency and a utility-class idiom heavier than this small, restrained site needs.
- **A component / UI library** (a design-system package) — rejected: it would impose an external look and a larger dependency surface, at odds with the Swiss-minimal restraint and the small-footprint goal.

## Consequences

- Minimal dependencies, full control over the hairline and whitespace system, and nothing fighting the intended look.
- No utility-class ergonomics and no prebuilt components, so there is more hand-written CSS per component than a framework would require.

## Evidence

- **Primary:** `git:e4a1f2e` (2026-07-19) — the site ships with per-component CSS Modules and a global stylesheet, and `website/package.json` carries no CSS-framework or UI-library dependency.
- **Corroborating:** the approved implementation plan:
  > Plain CSS — a global `tokens.css` … plus per-component CSS Modules. No Tailwind, no UI library — keeps the Swiss restraint and the dependency surface tiny.
- **Rationale:** stated in the approved plan (quoted above); accepted by the owner on 2026-07-19.

## Follow-up

*Append-only. Everything above this heading is **frozen**. Entries below are dated and additive — evidence that the world moved, not a revision of what was decided.*

*(none yet)*

---

_Append-only. If this turns out to be wrong, **do not edit it** — write a new decision that supersedes it and links back. Being wrong on the record is more useful to the next reader than a clean file._

_**Exactly two things in this file may ever change:** the `**Status:**` line (to point at a superseding decision) and additions under `## Follow-up`._
