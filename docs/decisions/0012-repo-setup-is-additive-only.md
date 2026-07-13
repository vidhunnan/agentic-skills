# 0012. `repo-setup` is additive-only — never `mv`, `rm`, or overwrite

- **Status:** Accepted
- **Date:** 2026-07-13

## Context

`repo-setup` runs on repos that already exist and already have documentation — a `docs/adr/` folder, a root `CHANGELOG.md`, an `rfcs/` directory, a README in a folder it wants to claim. Reconciling those with the canonical stack often *would* be improved by moving a file or renaming a folder.

But the skill is reasoning about someone else's repo from a name lexicon and a forty-line content sniff. Its mapping is a good guess, not a certainty. A wrong guess that creates a folder is noise; a wrong guess that moves files is damage — and it is damage in a project the author cannot see.

## Decision

Every write is a file that did not exist. The skill **never moves, renames, deletes, or overwrites**, and it never writes a README or template into a folder that already has one. Where the right answer genuinely requires moving files, the skill says so and lets the human do it.

## Alternatives considered

- **Migrate to canon** — detect `docs/adr/`, rename it to `docs/decisions/`, move the files. It lost because a mis-mapped folder would be destructively "corrected," and because it makes an irreversible change on the strength of a heuristic.
- **Refuse to run on repos with existing structure** — safest of all, and rejected because it makes the skill useless on every repo you already have.

## Consequences

- The skill cannot damage a repo. The worst outcome of a wrong mapping is a folder you delete.
- It cannot fully fix an awkward layout either. A repo with `docs/changelog/` keeps generated truth inside `docs/`, contrary to [0009](./0009-the-changelog-lives-outside-docs.md) — the skill flags the tension and leaves it. That is a knowingly accepted limitation, not an oversight.
- Combined with [0010](./0010-a-declared-path-beats-an-existing-folder-beats-canon.md), it means the canon is advisory: the repo's actual paths always win.

## Evidence

- **Primary:** `skills/repo-setup/SKILL.md` §Two principles
  > **Additive only.** Never move, rename, delete, or overwrite. Every write is a file that did not exist. If the right answer requires moving files, say so and let the human do it.
- **Corroborating:** `docs/prds/repo-setup.md` §Non-goals (*"Not a migration tool"*) and §8 Success criteria (*"No run ever produces a `mv`, an `rm`, or an overwrite"*) · `git:32e425a` (2026-07-13) — shipping evidence: the run on this repo produced no renames and no deletes.
- **Rationale:** stated in the primary source

## Follow-up

*Append-only. Everything above this heading is frozen.*

*(none yet)*

---

_Append-only. If this turns out to be wrong, **do not edit it** — write a new decision that supersedes it and links back._

_**Exactly two things in this file may ever change:** the `**Status:**` line and additions under `## Follow-up`._
