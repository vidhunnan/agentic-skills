# 0023. Site content is split by kind: repeated and countable content is data, section prose is not

- **Status:** **Accepted**
- **Date:** 2026-08-19
- **Supersedes:** [0016](./0016-site-content-is-data-driven-from-one-source.md)

## Context

[ADR 0016](./0016-site-content-is-data-driven-from-one-source.md) claimed more than
the site ever did. Its Decision reads *"There is a single content module; the
components render it rather than embedding copy."* That was false as written by the
time the site shipped and got further from true with every section added: the revamp
brief counted *"around fifty user-facing strings — every headline and every intro
paragraph — hardcoded in components."*

The claim was not harmless, because it described a guarantee the code did not
provide. `website/components/lib/skills.ts` records the defect it produced:

> *"The site said "six skills" in six places long after there were eleven, because
> ADR 0016 made the skill **data** single-source and left the copy **about** it as
> string literals."*

So the real architecture had always been a split — data in the module, prose in the
components — and only half of it was written down. The rebuild in `fcea6dd` rewrote
almost every one of those strings, which made this the moment to state the boundary
rather than restate the guarantee.

## Decision

We split site content **by kind**, and say so. `website/components/lib/skills.ts`
holds everything repeated or counted: the skill catalogue and its groups, every
install command, the nine matrix rows, the hero specimens, the loop steps and the
repo URLs. **Every count is derived from that data, never written** — `TOTAL_SKILLS`,
`spellCount()` and `TOTAL_SKILLS_WORD` exist so that no sentence on the page, and no
line of metadata, states a number a human typed. Section prose — headings, ledes and
body paragraphs — lives in the component that renders it.

One exception is named where it lives rather than in a document. `Loop.tsx` carries
the only hardcoded numbers on the page, and states why: *"They describe this repo's
own record, not the library, so they can't be derived from skills.ts."*

## Alternatives considered

- **Extract every user-facing string into the content module** — what 0016 claims
  already happened, and the reading of it a maintainer would act on. **`*(reason not
  stated)*`** — no source records why the prose was left in the components. What is
  observable in the code, offered as fact rather than as the reason: the chosen
  direction renders markdown markers inline with the copy — `<span className="s">##
  </span>` before a heading, recessive `**` around bold — so a section's prose and its
  markup are interleaved rather than separable into strings.
- **Leave 0016 standing and treat the ~50 strings as drift** — a correct decision that
  implementation failed to honour, fixable by moving the strings rather than by
  writing a new ADR. **`*(reason not stated)*`.** On the record: the strings were not
  moved, they were rewritten in place, and the second `ContextStack` render took ~30
  lines of inline JSX copy with it when it was deleted.

## Consequences

- **A count on the page cannot silently go stale.** Adding a skill to `SKILL_GROUPS`
  updates every sentence that states how many there are, including the `<meta>`
  description. The rule that was implicit in 0016 is now the stated boundary and is
  enforced by the data's shape.
- **The boundary is a convention, not a mechanism.** Nothing stops the next section
  from writing *"fourteen skills"* as a literal. `next build` and `tsc --noEmit` — the
  repo's only two quality gates — catch neither that nor a prose string that
  contradicts the data.
- **Copy changes are still a hunt through components.** That is the cost 0016 set out
  to remove, knowingly re-accepted for prose. A wording pass touches six component
  files rather than one module.
- **`skills.ts` is still a hand-maintained copy of `SKILL.md` and `README.md`, not a
  live read.** 0016's own second consequence survives this supersession unchanged: a
  static export cannot read `SKILL.md` at request time, so the single source shrinks
  the drift window and does not close it.
- **The named exception drifts by design.** The counts in `Loop.tsx` describe this
  repo's record — decisions, design decisions, documented commits, handoffs — and grow
  every time the library documents itself. They are correct only as of the commit that
  last touched them, and nothing on the page will say when that stops being true.

## Evidence

- **Primary:** `git:fcea6dd` (2026-08-19) — `website/components/lib/skills.ts`, the
  comment above `TOTAL_SKILLS`.
  > Derived, never hardcoded. The site said "six skills" in six places long after
  > there were eleven, because ADR 0016 made the skill *data* single-source and left
  > the copy *about* it as string literals. Anything that states a count reads it from
  > here.
- **Corroborating:** `design/briefs/website-revamp.md` §Three things duplicated or
  untrue (2026-08-19) — *"ADR 0016 claims content is data-driven from one source.
  Around fifty user-facing strings — every headline and every intro paragraph — are
  hardcoded in components."* · `website/components/Loop.tsx`, the named exception ·
  `website/app/layout.tsx`, where the meta description derives its count from
  `TOTAL_SKILLS_WORD` · `changelog/commits/037-rebuild-in-terminal-rendered-markdown.md`
  §`lib/skills.ts` · [ADR 0016](./0016-site-content-is-data-driven-from-one-source.md).
- **Rationale:** the derived-count half is **stated in the primary source**, quoted
  above. **Why prose stays in the components is `*(reason not stated)*`** — no source
  records that half of the boundary being weighed, and it is not this record's job to
  supply a reason after the fact.

## Follow-up

*Append-only. Everything above this heading is **frozen**. Entries below are dated and
additive — evidence that the world moved, not a revision of what was decided.*

*(none yet)*

---

_Append-only. If this turns out to be wrong, **do not edit it** — write a new decision
that supersedes it and links back. Being wrong on the record is more useful to the next
reader than a clean file._

_**Exactly two things in this file may ever change:** the `**Status:**` line (to point
at a superseding decision) and additions under `## Follow-up`._
