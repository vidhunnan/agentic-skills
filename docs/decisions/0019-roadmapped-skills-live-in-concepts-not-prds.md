# 0019. Roadmapped skills live in `docs/concepts/`, not `docs/prds/`

- **Status:** **Accepted**
- **Date:** 2026-08-16

## Context

The library was planned out from six skills to a roadmap of thirty-two — twenty of
them a new design territory, the rest split across finishing the context stack,
meta skills, and knowledge work beyond the repo. Four were committed to and built
in the same session; twenty-two were not.

That left a filing question with no precedent in the repo. Every skill built so far
got a PRD in `docs/prds/` before it was written, and `CLAUDE.md` states the rule:
*"Write `docs/prds/<name>.md` for anything non-trivial."* Read literally, twenty-two
roadmapped skills meant twenty-two PRDs.

At the same time `docs/prds/README.md` defines the tier as *"a proposal — a concept
that graduated… committed enough to write a spec for"* and warns, in the same file,
*"Never cite a PRD as proof a feature exists."* And `docs/concepts/` was empty —
the tier had a README and a template and nothing had ever been filed in it.

## Decision

We file skills we have not committed to building as **concepts**, not PRDs. A PRD
is written when a skill is about to be built. The expansion roadmap and the design
territory were written as two concept docs —
`docs/concepts/skill-library-expansion.md` and
`docs/concepts/design-context-stack.md` — and only the four skills actually built
in that session got PRDs.

## Alternatives considered

- **A PRD per roadmapped skill.** The literal reading of the CLAUDE.md rule, and
  the option that produces the most apparent thoroughness. It loses on the tier's
  own definition: twenty-two specs for unbuilt skills would be twenty-two `docs/`
  documents that a later reader — human or agent — could mistake for evidence that
  something exists. That is the largest done-vs-explored violation the repo could
  commit, and it would be committed by the repo that argues against it.
- **A single flat roadmap in the README.** Cheap, and visible where people look. It
  loses because the README is read as a description of what the library *is*; a
  roadmap there reads as a feature list, and there is nowhere in it to record the
  reasoning, the shaky assumptions, or a kill condition.
- **No written roadmap at all — just build the next skill when it's obvious.** What
  the repo did before. It loses on the library's own thesis: the plan for the next
  twenty-two skills existed in one head, which is the exact failure mode every
  skill here was built to prevent.

## Consequences

- The concepts tier is no longer empty, and its first two entries are load-bearing.
  The plan for filling the tier is the thing that filled it.
- The PRD tier stays honest: every file in it corresponds to a skill that exists or
  is being written this session. `docs/prds/` remains a reliable answer to "what did
  we commit to?"
- **The cost:** roadmapped skills are specified more thinly than they would be with
  a PRD each. A one-paragraph entry in a concept doc will not be enough to build
  from — whoever builds `design-critique` will have to write its PRD first, from
  scratch, and some of the thinking done during planning will have been lost by
  then. We accepted that in exchange for not polluting the proposal tier.
- Concept docs go stale in a way PRDs do not, because they describe work that may
  never happen. Both new concept docs carry an explicit graduate-or-kill condition
  and a note pointing readers at the changelog for what actually shipped.

## Evidence

- **Primary:** `docs/prds/README.md` — the tier definition the decision turns on.
  > "A proposal — a concept that graduated. It's committed enough to write a spec
  > for, but it is **not evidence that anything exists**."
- **Corroborating:** `docs/concepts/README.md` — *"Sketches of features that may
  never be built"* · `docs/concepts/skill-library-expansion.md` and
  `docs/concepts/design-context-stack.md`, the two documents this decision produced.
- **Rationale:** stated in the primary source, and restated by the owner during
  planning on 2026-08-16.

## Follow-up

*Append-only. Everything above this heading is **frozen**. Entries below are dated
and additive — evidence that the world moved, not a revision of what was decided.*

*(none yet)*

---

_Append-only. If this turns out to be wrong, **do not edit it** — write a new
decision that supersedes it and links back._
