# 0016. Site content is data-driven from one source, sourced from the repo

- **Status:** Accepted
- **Date:** 2026-07-19

## Context

The three concept landing pages hardcoded the skill list — names, descriptions, surfaces, and `/plugin install` commands — directly in their markup. The authoritative version of that content lives in each `skills/<name>/SKILL.md` and is summarised in `README.md`. A site that restates it by hand drifts from the real skills the moment a description or install command changes, and nothing catches the divergence.

## Decision

We defined all site content once in `website/components/lib/skills.ts` — the six skills with their groups, surfaces, and install commands, plus the five context-stack tiers — populated from `README.md` and each `SKILL.md`, and consumed by every section component. There is a single content module; the components render it rather than embedding copy.

## Alternatives considered

- **Hardcode the content in each component's JSX** — the concept HTML's approach, and the path of least resistance. Rejected: it guarantees the site drifts from the real skills over time, with no single place to correct it.

## Consequences

- One place to update; the rendered site can't silently contradict the skills, and content changes are one edit rather than a hunt through markup.
- The data module is a hand-maintained *copy*, not a live read — a static export can't read `SKILL.md` at request time — so it still has to be kept in sync by hand. The single source shrinks the drift window; it does not close it.

## Evidence

- **Primary:** `git:e4a1f2e` (2026-07-19) — introduces `website/components/lib/skills.ts` as the single content source.
  > Content is data-driven from a single components/lib/skills.ts sourced from the README/SKILL.md so it can't drift from the real skills.
- **Rationale:** stated in the primary source (the commit body, quoted above) and the approved implementation plan.

## Follow-up

*Append-only. Everything above this heading is **frozen**. Entries below are dated and additive — evidence that the world moved, not a revision of what was decided.*

*(none yet)*

---

_Append-only. If this turns out to be wrong, **do not edit it** — write a new decision that supersedes it and links back. Being wrong on the record is more useful to the next reader than a clean file._

_**Exactly two things in this file may ever change:** the `**Status:**` line (to point at a superseding decision) and additions under `## Follow-up`._
