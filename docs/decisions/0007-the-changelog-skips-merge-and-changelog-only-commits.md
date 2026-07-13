# 0007. The changelog skips merge and changelog-only commits

- **Status:** Accepted
- **Date:** 2026-07-12

## Context

`changelog-tracker` documents every substantive commit into a per-commit file. Run naively, that has an obvious pathology: the commit that *adds* a changelog entry is itself a commit, so it too would get an entry, whose commit would get an entry, and so on. Merge commits pose a related problem — they carry no content of their own, only the union of what was already documented.

## Decision

Two commit classes are filtered out before anything is written, and the skill says why when it skips one:

- **Merge commits** — detected by `git log -1 --format=%P` returning two or more parents.
- **Changelog-only commits** — detected by `git show --stat` touching only paths under `changelog/`.

## Alternatives considered

- **Document every commit** — the literal reading of "document every commit." It lost because the log would chase its own tail: every changelog entry would generate a commit that generates a changelog entry, forever.
- **Skip by commit-message convention** (e.g. a `[skip changelog]` tag) — rejected implicitly in favour of detecting the condition from the diff itself, which cannot be forgotten.

## Consequences

- The log terminates, and reads as a record of substantive work rather than a record of itself.
- The filter is diff-shaped, not message-shaped, so it works whether or not anyone remembers a convention.
- A commit that touches `changelog/` *and* real code is not "changelog-only" and is documented — which is correct, and worth knowing before you bundle a changelog fix into a feature commit.

## Evidence

- **Primary:** `skills/changelog-tracker/SKILL.md` Step 2 — Filter (keep the log clean)
  > **Changelog-only commits** — `git show --stat --format='' <ref>` touches only paths under `changelog/`. This is how the log avoids chasing its own tail (the commit that adds a changelog entry never gets its own entry).
- **Corroborating:** `docs/prds/changelog-tracker.md` §9 Risks (*"Documenting its own commit — mitigated by the changelog-only-diff filter"*) · `changelog/README.md` · `git:506a5c6` (2026-07-12) — shipping evidence. Observed in practice: `git:67eba97` and `git:6d03718` are both changelog-only and both undocumented, as intended.
- **Rationale:** stated in the primary source

## Follow-up

*Append-only. Everything above this heading is frozen.*

*(none yet)*

---

_Append-only. If this turns out to be wrong, **do not edit it** — write a new decision that supersedes it and links back._

_**Exactly two things in this file may ever change:** the `**Status:**` line and additions under `## Follow-up`._
