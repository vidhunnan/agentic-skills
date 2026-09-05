# Concept — The README as a generated document

Status: exploring · Date: 2026-09-05

> Hypothesis, not a plan. Nothing here is committed. Do not cite this document as
> evidence that anything exists or has been decided.

## The hunch

This library already holds one rule as absolute: a document that states facts about
the repo is **generated, never hand-edited**. `changelog/` says it. `VERSION-LOG.md`
says it. The rule stops at the front door.

`README.md` is the single highest-traffic document here and the only fact-bearing
one written entirely by hand — twenty table rows, twenty install lines, and the
word "Twenty" typed in two places, none of it checked against `skills/`. So: a
skill that holds the *factual* regions of a README to what the repo actually
contains, and leaves the argument prose alone.

The interesting part is not the generation. It is where the seam falls.

## Why it might matter

- **This exact failure has already happened here.** `CONTRIBUTING.md` listed six
  touchpoints for adding a skill when there were seven — caught by a human reading
  it, recorded in [`skill-library-expansion.md`](./skill-library-expansion.md), and
  since fixed by hand (it says eight now). Nothing mechanical caught it, and nothing
  mechanical would catch the next one. A README row is the same class of claim with
  a much wider audience.
- **Creation is covered; every later edit is not.** `skill-scaffold` writes the row
  and the install line *when a skill is born*. Nothing re-checks them after a
  rename, a removal, a status change, or a rewritten one-liner. `version-manager`
  gets closest — its registration check already asks "marketplace entry + `skills.ts`
  + README row?" — but it asks at a version bump, which is not when drift happens.
- **The website already solved its half.** `skills.ts` is typed, single-source, and
  `TOTAL_SKILLS` is derived from it — the file even argues for itself in a comment:
  *"Every count is derived from that data, never written."* The README hand-types
  the same count twice and `content.ts` a third time. Three hand-typed counts and
  one derived one, in one repo, is not a convention — it is an unfinished one.
- **It generalises past this repo, if the framing is right.** Every README makes
  checkable claims: this command exists, this file is here, this badge points at
  the live build, this TOC anchor resolves. Most of them rot.

## What "automatically" can honestly mean here

The word is doing a lot of work, and this repo has already ruled out the easy
reading. There is no per-event hook — that is a stated design position, not a gap.
So "automatic" has to be a ladder, and the skill would have to be honest about
which rung it is on:

| Rung | What it is | Truly automatic? |
|---|---|---|
| 1 | `check` mode — reports drift, writes nothing | No, you run it |
| 2 | `sync` mode — rewrites the managed regions | No, you run it |
| 3 | A CLAUDE.md protocol block: *"before committing a change under `skills/`, run `/readme-sync check`"* | Only as reliably as the agent re-reads CLAUDE.md |
| 4 | CI — a workflow running `check` on every PR and failing it | Yes, and it lives outside the skill |

Rung 3 is the mechanism this library already uses for ten skills, and it is the
honest ceiling for a Markdown-only skill. Rung 4 is the only one that deserves the
word, and it implies shipping a workflow file — which no skill here does yet.

## Two shapes it could take

| | **Whole-file generation** | **Managed regions** |
|---|---|---|
| Rule | README is build output; edit the sources | Only delimited blocks are owned |
| Marker | none — file header warns you off | `<!-- BEGIN readme:skills -->` … `<!-- END readme:skills -->` |
| Hero prose, positioning, voice | must move into a template or a data file | stays in the file, hand-written, untouched |
| Failure mode | someone edits the README anyway and loses it | a fact drifts *outside* a managed region and nothing notices |
| Precedent here | `changelog/`, `VERSION-LOG.md` | the `<!-- BEGIN skill:<name> -->` protocol blocks in CLAUDE.md |

Managed regions look right, and the marker format is already invented — the
protocol-block mechanism is idempotent, matches on literal markers, updates in
place, and never touches a neighbouring block. Pointing it at README instead of
CLAUDE.md is a smaller step than it sounds.

## What we'd have to believe

- **That a README splits cleanly into facts and argument.** This is the shaky one.
  Look at an actual row: the name, the link and the `/plugin install` line are
  derivable; the *"What it does"* sentence is written copy, tuned per skill, and is
  the best writing in the file. A generator that regenerates it would make the
  README worse. So the seam may not be "the table vs. the prose" but *"the cells
  vs. one cell"* — a generator that owns four columns and asks a human for the fifth.
- **That the truth sources are machine-readable enough.** `SKILL.md` frontmatter,
  `plugin.json` and `marketplace.json` give name, version, description and path.
  But frontmatter `description` is trigger-phrase copy for the matcher — long,
  keyword-stuffed, and deliberately not readable prose. There is no field today
  that holds the README sentence. Either the skill invents one (bad), carries it in
  a new field (a frontmatter change across twenty skills), or treats the existing
  README cell as the source and only checks that the *set of rows* is right.
- **That "Surfaces" and "Status" are derivable at all.** Surfaces is a judgement
  about whether a skill needs a filesystem. Status is editorial. Neither is in any
  file.

## The reframe worth testing first

Maybe the skill is not a generator. Maybe it is a **claim checker**.

A README asserts things. A checker reads the assertions and verifies each against
the repo, then reports — it does not rewrite. That version is general (it works on
a project with no `skills/` folder), it is honest about the prose (it never touches
it), and it degrades gracefully (an unverifiable claim is reported as
*unverifiable*, not silently left alone). The sync-and-generate version can then be
a second mode for the subset of claims that are safely mechanical: counts, install
lines, link targets, the row set.

Checkable claim classes, in rough order of how often they rot:

- **Counts** — "twenty skills", "three tiers"
- **Inventory** — one row per thing that exists, no rows for things that don't
- **Commands** — every fenced command still resolves to something real
- **Paths and links** — relative links resolve; anchors exist
- **Status words** — "Live", "coming soon", "experimental" against evidence
- **Versions and badges** — pinned numbers against the manifest

## Overlap to resolve before this becomes a PRD

The expansion concept already proposes `skill-audit` (Meta) and `context-audit`
(Finish the stack). A README checker is plausibly a *mode* of one of them rather
than a third skill. Three skills that each check a different file, sharing 80% of
their logic, is how a library becomes a directory. This has to be argued, not
assumed — and the argument may go the other way: `readme-sync` is the one aimed at
a *reader*, not at the next session, which is a different job.

## Open questions

- **Checker or generator?** If the answer is checker, most of this document is
  wrong about the mechanism and right about the problem.
- **Where does the README sentence live?** No file holds it today. Adding a
  frontmatter field is a twenty-file change and a contract change; leaving it in the
  README means the README is a source, not only an output.
- **Is it this repo's tool or a public skill?** The row-and-install-block shape is
  specific to a plugin marketplace. The claim-checking shape is general. Shipping
  the first as if it were the second is the trap.
- **Does it own `content.ts` and `CONTRIBUTING.md` too?** Both hand-type facts about
  the same twenty skills. If the answer is yes, "readme" is the wrong name.
- **What is the name?** `readme-sync` is the working title and assumes the generator
  answer. `claim-check` or `docs-drift` assume the checker answer.

## Graduate or kill

**Graduate** into a PRD when the checker-vs-generator question has an answer that
survives being run by hand — take one real change (rename a skill, or remove one)
and do the full README update manually, noting every place a machine could not have
known what to write. If that list is short, this is buildable.

**Kill** it if the manual run shows the only reliably derivable parts are the count
and the install block. Two facts do not need a skill; they need a line in
`skill-scaffold` and a check in `version-manager`.

_Unresolved after a while? Kill it. A stale concept an agent can read is worse
than no concept at all._
