# 0010. A declared path beats an existing folder beats canon

- **Status:** Accepted
- **Date:** 2026-07-13

## Context

`repo-setup` defines a canonical path for each tier of the context stack — including `docs/handoffs/` for handoff briefs. But `handoff-generator` already existed, already wrote to `handoff/`, and this repo already had a brief sitting in that folder.

Two skills in the same library therefore disagreed about where handoffs live. Run naively, `repo-setup` would have created a second, empty `docs/handoffs/` alongside the populated `handoff/` — leaving the project with two handoff folders and no way to tell which one was real.

The same problem generalises to every repo the skill will ever run on: an existing `docs/adr/`, a root `CHANGELOG.md`, an `rfcs/` folder.

## Decision

Resolve each tier's path in descending authority:

1. **A path declared in a CLAUDE.md protocol block** — the repo has already committed to it.
2. **An existing folder on disk** that maps to the tier — adopt its name, and its on-disk casing.
3. **The canonical path** — used only to fill a gap.

Canon fills gaps; it never renames anyone's repo.

## Alternatives considered

- **Impose the canon and migrate** — repoint `handoff-generator` to `docs/handoffs/`, `git mv` the existing brief, and bump the skill's version. It lost because it is a breaking change to a skill people have already installed, and because it makes the tool a migration tool (see [0012](./0012-repo-setup-is-additive-only.md)).
- **Create the canonical folder anyway and leave the existing one as a stray** — simpler and more predictable, and rejected because it produces exactly the duplicate-tier confusion the stack exists to prevent.

## Consequences

- The two skills can disagree about their *default* without either being wrong, and no duplicate folder is ever created. On this repo, `repo-setup` adopted `handoff/`.
- A repo's routing table reflects that repo's real paths rather than an ideal, which is what makes the CLAUDE.md block worth reading.
- The library now has two documented defaults for one tier (`docs/handoffs/` in `repo-setup`'s canon, `handoff/` in `handoff-generator`). That inconsistency is knowingly accepted as the price of never breaking an installed skill.

## Evidence

- **Primary:** `handoff/README.md` §Path note
  > The canonical location for this tier is `docs/handoffs/`, but this repo's `handoff-generator` skill writes to `handoff/` and had files here first — so `repo-setup` **adopted** the existing name rather than creating a duplicate. Existing paths beat canon.
- **Corroborating:** `docs/prds/repo-setup.md` §5 Path-resolution order · `skills/repo-setup/SKILL.md` Step 1 · `git:32e425a` (2026-07-13) — shipping evidence: no `docs/handoffs/` exists in this repo.
- **Rationale:** stated in the primary source

## Follow-up

*Append-only. Everything above this heading is frozen.*

- **2026-07-13** — Scope widened. `decisions-logger` reuses this resolution order to locate `docs/decisions/`, rather than defining its own. Evidence: `skills/decisions-logger/SKILL.md` Step 1.

---

_Append-only. If this turns out to be wrong, **do not edit it** — write a new decision that supersedes it and links back._

_**Exactly two things in this file may ever change:** the `**Status:**` line and additions under `## Follow-up`._
