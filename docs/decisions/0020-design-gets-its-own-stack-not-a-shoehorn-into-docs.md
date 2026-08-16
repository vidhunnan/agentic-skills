# 0020. Design gets its own context stack, not a shoehorn into `docs/`

- **Status:** **Accepted**
- **Date:** 2026-08-16

## Context

The library's context stack has five tiers under `docs/` plus `changelog/`, and
`repo-setup` builds it. Extending the library into design work needed somewhere for
briefs, research, explorations, specs and design decisions to live.

Two facts shaped the choice. First, `repo-setup`'s alias lexicon already claims some
of the obvious names: `docs/design/` maps to Concepts *or* PRDs, `explorations/` and
`research/` map to Concepts, and `handoff/` belongs to `handoff-generator`. Reusing
those names would have put two skills in charge of one path — the contradiction
`repo-setup` Step 2e exists to detect.

Second, design turned out to need two distinctions the code stack does not make:

- **Evidence versus interpretation.** "7 of 9 users scrolled past the CTA" is an
  observation; "users ignore the CTA" is a claim about why. Collapsed into one
  folder, a finding hardens into folklore and gets cited as fact.
- **What was tried versus what won.** Code deletes the rejected approach and git
  keeps it anyway. Design deletes the rejected direction and it is simply gone —
  no diff, no blame line, no commit.

## Decision

Design gets its own tree, `design/`, with six tiers — briefs, research,
explorations, decisions, specs, system — and its own scaffolding skill,
`design-setup`, mirroring `repo-setup`'s detect-map-confirm and additive-only rules.
Design decisions live in `design/decisions/`, separate from the architectural log in
`docs/decisions/`, and the two are governed by separate skills with separate index
markers.

The changelog tier is **shared, not duplicated**: `design-setup` points at
`changelog/` and creates no design-specific equivalent.

## Alternatives considered

- **Add design tiers to the existing `docs/` stack** — `docs/briefs/`,
  `docs/explorations/`, and design decisions filed into `docs/decisions/` alongside
  architectural ones. Fewer trees, one routing table, one scaffolding skill. It
  lost on the name collisions above, and on audience: an engineer scanning
  `docs/decisions/` for why the build is configured a certain way should not have
  to page through rejected nav layouts, and vice versa.
- **One merged decisions tier, separate everything else.** A halfway option. It
  lost because the two tiers need different ADR shapes — design ADRs carry *what we
  gave up* and *what would make us revisit*, which architectural ones mostly don't —
  and a single tier with two templates is a tier with no template.
- **A hand-written design changelog.** Considered and rejected outright: it would be
  hypothesis wearing the costume of truth, which is precisely the failure the
  done-vs-explored rule exists to prevent. `changelog/` is generated from git and is
  the only tier entitled to say what shipped.
- **Seven tiers including a separate `design/critique/`.** Dropped — critique output
  is either a finding against a brief or a decision, and both already have homes.

## Consequences

- A project can adopt either stack independently. A design-only repo gets `design/`
  without `docs/`; a backend service gets `docs/` and never sees `design/`.
- Two scaffolding skills now write routing tables into the same CLAUDE.md. They use
  separate markers (`skill:repo-setup`, `skill:design-setup`) and each is forbidden
  from editing the other's block.
- **What this costs:** two stacks is more surface to learn and more ceremony to
  maintain, and eleven-ish folders across both is a lot for a small project. It also
  creates a genuine ambiguity we have not resolved — a repo that already keeps
  everything in `docs/design/` has a folder both stacks can claim, and the tie is
  broken only by whichever block declared it first.
- `design-setup` needs the same `minimal` preset `repo-setup` has, for the same
  reason, and it recommends it more often.

## Evidence

- **Primary:** `skills/design-setup/SKILL.md` §The canon — the tier table and the
  no-design-changelog rule this decision produced.
  > "There is no design changelog tier, deliberately. What shipped is `changelog/`,
  > generated from git. A hand-written parallel would be hypothesis wearing the
  > costume of truth."
- **Corroborating:** `skills/repo-setup/SKILL.md` §Step 2a — the alias lexicon that
  already claims `docs/design/`, `explorations/` and `research/` ·
  `docs/concepts/design-context-stack.md` §The seven tiers ·
  [0009](./0009-the-changelog-lives-outside-docs.md), which established that the
  folder layout *is* the done-vs-explored rule.
- **Rationale:** stated by the owner during planning on 2026-08-16.

## Follow-up

*Append-only. Everything above this heading is **frozen**. Entries below are dated
and additive — evidence that the world moved, not a revision of what was decided.*

*(none yet)*

---

_Append-only. If this turns out to be wrong, **do not edit it** — write a new
decision that supersedes it and links back._
