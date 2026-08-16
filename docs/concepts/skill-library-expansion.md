# Concept — Expanding the library past the repo

Status: exploring · Date: 2026-08-16

> Hypothesis, not a plan. Nothing here is committed. Do not cite this document as
> evidence that anything exists or has been decided. Four skills below have since
> been built — **check the changelog, not this file.**

## The hunch

Six skills, one thesis: *an agent starts every session with no memory, so these
skills author the briefing it needs.* Every one of them is repo-shaped. They
scaffold `docs/`, read git, or enforce a git convention.

Two things follow, and neither was chosen on purpose:

1. The library is **engineer-shaped**. Its audience is whoever already lives in a
   terminal.
2. Two of its own five tiers have **no skill that writes them**. `docs/concepts/`
   was empty until this file landed in it; `docs/prds/` is still written by hand.

The hunch is that the constraint is imaginary. **The five questions in the context
stack are not repo questions, they are work questions.** *What are we building /
what are we still deciding / why did we choose that / where did we leave off /
what shipped* are asked of a design system, a meeting, and a skill library exactly
as they are asked of a codebase. Expansion means pointing the same stack at new
material — not inventing a second philosophy.

## Why it might matter

- The thesis is either general or it is a git trick. This is the test.
- The two empty tiers are an embarrassment for a library whose whole argument is
  that the record must be complete.
- Design in particular is where the amnesia is worst and there is no `git log` to
  fall back on — see [`design-context-stack.md`](./design-context-stack.md), which
  makes that case at length.

## What we'd have to believe

- That the same five questions really do transfer, and that the design and
  knowledge-work stacks are the *same* idea rather than a family resemblance.
- That a library of thirty-odd skills is still legible. Six skills fit in a
  README table; thirty-two need grouping that carries its own weight, and the
  grouping below is a guess.
- That the spine survives the widening — that "context engineering" still means
  something once the library also covers meetings and brand documents.

## The four territories

| Territory | The gap it fills | Skills |
|---|---|---|
| **Finish the stack** | Nothing writes the concepts or PRD tiers; nothing checks whether the stack is still *true* | `context-writer`, `context-audit` |
| **Design practice** | Design leaves no `git log` at all | 20 — see the design concept doc |
| **Meta** | Adding a skill touches seven places by hand | `skill-scaffold`, `skill-audit` |
| **Past the repo** | Decisions get made in meetings and never reach a repo | `meeting-to-decisions`, `weekly-review` |

## The proposed grouping

Seven groups, tracing the lifecycle: think → record → verify → conventions → meta →
design.

| Group | Skills |
|---|---|
| Set up the repo | `repo-setup` |
| Think it through | `context-writer` |
| Keep the record | `changelog-tracker`, `decisions-logger`, `handoff-generator` |
| Keep it honest | `context-audit`, `skill-audit` |
| Working conventions | `branch-naming`, `model-strategy` |
| Build the skills themselves | `skill-scaffold` |
| Design work | 20 skills |

Six today; thirty-two at full build-out, twenty of them design.

## Why the unbuilt ones live here and not in `docs/prds/`

`docs/prds/README.md` defines a PRD as *"a proposal — a concept that graduated…
committed enough to write a spec for."* The skills listed above are not committed.

Writing a speculative PRD for each would manufacture precisely the artifact this
library warns against: a `docs/` document that a later reader — human or agent —
mistakes for evidence that something exists. Twenty-six PRDs for twenty-six
unbuilt skills would be the largest done-vs-explored violation in the repo, filed
by the repo that argues against it.

So they stay a concept until someone commits to building one. That is also why
this file is the concepts tier's first entry: the plan for filling the empty tier
is itself the thing that fills it.

## Known problems this expansion should close

Recorded so they are not lost between sessions. All three are live as of this
writing:

- **Merge-landed commits escape the changelog.** `changelog-tracker` skips merge
  commits by design, so a squashed or merged feature branch can ship undocumented
  — commit `f52b824` did. Fixing the missed entry does not fix the mechanism.
  `context-audit` reconciling `git log` against `changelog/commits/` is the
  proposed fix.
- **`repo-setup` and `handoff-generator` disagree on the handoff path** —
  `docs/handoffs/` vs `handoff/`. Safe in this repo because an existing folder
  wins, but a fresh repo scaffolded then handed off gets two folders.
- **`CONTRIBUTING.md` lists six touchpoints for adding a skill, not seven** — it
  omits `website/components/lib/skills.ts`, so adding a skill silently leaves the
  site stale.

## Open questions

- **Does the positioning have to change, and when?** The README hero, the landing
  page and the talk all argue the repo-only thesis. A Design group sitting
  underneath them reads as an afterthought until they are rewritten. That rewrite
  is a content decision, not a code change, and it is the lead open question here —
  deliberately deferred rather than half-done.
- **How does a public skill handle a missing connector?** `figma-to-spec` and
  `meeting-to-decisions` need MCP servers an installer may not have. Proposed:
  a three-tier ladder — connector → local export → pasted text — with the skill
  stating which tier it used. Untested.
- **Is thirty-two too many?** A library nobody can hold in their head is a
  directory, not a library. There may be a point where the right move is a second
  marketplace rather than a longer table.
- **Should `context-writer` be one skill or two?** It writes both concepts and
  PRDs, and the tiers disagree about authorship — concepts say *written by human*,
  PRDs say *an agent may draft*. One skill with an asymmetric rule, or two skills
  with one rule each, is unresolved.

## Graduate or kill

**Graduate** a territory into PRDs when a skill in it has been built and used, and
the next one is obviously needed rather than merely plausible.

**Kill** the "past the repo" territory if `meeting-to-decisions` cannot be built
without a connector that most installers lack — a skill that only works for its
author belongs in a personal `~/.claude/skills/`, not in a public marketplace.

_Unresolved after a while? Kill it. A stale concept an agent can read is worse
than no concept at all._
