# 0009. The changelog lives outside `docs/`

- **Status:** Accepted
- **Date:** 2026-07-13

## Context

The context stack tiers project documentation by the question each folder answers. Five of the six tiers are hand-written: concepts, PRDs, decisions, handoffs, phases. One is not — the changelog is generated from git, one file per commit, and every fact in it comes from a hash or a diffstat.

Those two kinds of document have different trustworthiness, and an agent reading the repo has to be able to tell them apart. A PRD says what *should* be true; the changelog says what *is*. Conflate them and the agent will cite a proposal as evidence that a feature exists.

## Decision

`changelog/` sits at the repo root, **outside** `docs/`, while every hand-written tier lives under `docs/`. The folder layout *is* the done-vs-explored rule: `docs/` is hypothesis, `changelog/` is truth.

## Alternatives considered

- **`docs/changelog/`** — the tidier tree, and where the tier would land if you were only thinking about organisation. It lost because it buries generated truth inside hand-written hypothesis, erasing at the filesystem level the one distinction the whole stack exists to make.

## Consequences

- The trust boundary is visible in the path. A reader — human or agent — can tell what kind of document they are holding before opening it.
- The repo root carries one more top-level folder than it strictly needs, which is the cost of making the boundary legible.
- `repo-setup` will still **adopt** an existing `docs/changelog/` rather than move it (see [0012](./0012-repo-setup-is-additive-only.md)), but flags the tension out loud rather than silently accepting it.

## Evidence

- **Primary:** `changelog/README.md` §This is the tier you trust
  > That split is the reason this folder sits outside `docs/` instead of at `docs/changelog/`. `docs/` is hand-written hypothesis; this is generated truth. The folder layout *is* the rule.
  >
  > Mix them and you've handed a teammate contradictory instructions. A human pushes back. An agent just agrees — confidently, in both directions.
- **Corroborating:** `docs/prds/repo-setup.md` §5 · `skills/repo-setup/SKILL.md` §The canon · `git:32e425a` (2026-07-13) — shipping evidence.
- **Rationale:** stated in the primary source

## Follow-up

*Append-only. Everything above this heading is frozen.*

*(none yet)*

---

_Append-only. If this turns out to be wrong, **do not edit it** — write a new decision that supersedes it and links back._

_**Exactly two things in this file may ever change:** the `**Status:**` line and additions under `## Follow-up`._
