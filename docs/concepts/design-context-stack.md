# Concept — A context stack for design work

Status: exploring · Date: 2026-08-16

> Hypothesis, not a plan. Nothing here is committed. Do not cite this document as
> evidence that anything exists or has been decided.
>
> Seven of the skills below have since been built — `design-setup`, `design-brief`,
> `design-language`, `design-explore`, `exploration-log`, `design-critique`,
> `design-decisions`. **Check the changelog, not this file, for what shipped.** The
> rest are still a hunch.
>
> The count moved from twenty to nineteen: `design-explore` absorbed
> `design-brainstorm` and `design-directions`, and `design-language` was added to
> the Frame-it group — a slot this document did not anticipate.

## The hunch

Every skill in this library so far is repo-shaped. It reads git, scaffolds `docs/`,
or enforces a git convention. That makes the library engineer-shaped by accident
rather than by argument — and it means the library has never been pointed at the
place where its own thesis bites hardest.

The hunch: **design is the strongest case for context engineering, not a side
quest.** The same five questions apply. The record is far worse. And unlike code,
there is no fallback.

Code has `git log`. Every decision leaves a commit, a diff, a blame line. The
record is *bad* — that is why `changelog-tracker` and `decisions-logger` exist —
but it is *there*, and it can be mined.

A Figma file is a snapshot of the winner. It does not record:

- what problem the work was solving, or what "good" was supposed to mean
- what else was tried — the twenty frames deleted the night before the review
- **why** the surviving direction won, and what was given up to get it
- which details are load-bearing decisions and which are leftovers nobody revisited
- what research, if any, the layout is standing on

That reasoning lives in Figma comment threads, Slack, and one person's memory. Six
months on, the designer who made it cannot reconstruct it either. So this is not
only an agent problem: it is why design rationale gets re-litigated every quarter,
why a new hire cannot tell a decision from an accident, and why writing a case
study feels like archaeology.

## Why it might matter

If the repo stack is right that *an agent needs a briefing*, then design is where
the briefing is most absent and most expensive to reconstruct. Three things get
better if this is right:

- **A design decision survives the person who made it.** Today it does not.
- **"Did we already try that?" becomes answerable.** Right now the honest answer is
  usually "probably, ask someone who was there."
- **The record pays for itself at the end.** Case studies, design reviews, and
  portfolio write-ups are agony precisely because the exploration was never
  written down. If the record exists, the narrative is nearly free — see
  `case-study-writer` below, which is the payoff argument for the whole territory.

## What we'd have to believe

- **That designers will write any of this down.** This is the shaky one. The repo
  skills work partly because git already captures the raw material and the skill
  only has to shape it. Here there is often no raw material at all — the skill has
  to *interview*, which costs the user time in the moment for a benefit that lands
  months later. Every skill below is interview-first for this reason, and every one
  of them is a bet that the interview is short enough to survive contact with a
  deadline.
- That the seven tiers are the right cuts, and not four or eleven.
- That a design record written in Markdown, next to the code, is a place designers
  will actually look — rather than a second home for docs that already fail to get
  written in Figma and Notion.
- That "never make the design decision" is a line the skills can hold while still
  being useful enough to reach for.

## The seven tiers

The repo stack has five. Design needs seven, because design collapses two
distinctions that code does not have to make:

- **evidence vs. interpretation** — "7 of 9 users scrolled past the CTA" is an
  observation; "users ignore the CTA" is a claim about why. Conflating them is how
  a research finding hardens into folklore.
- **what was tried vs. what won** — code deletes the alternative and git keeps it
  anyway. Design deletes the alternative and it is simply gone.

| Question | Tier | Tense | Status | Written by |
|---|---|---|---|---|
| What problem are we solving? | `design/briefs/` | imperative | proposal | human (an agent may draft) |
| What did we learn? | `design/research/` | past | evidence — observation kept separate from interpretation | human |
| What did we try? | `design/explorations/` | past | history — includes everything killed | either |
| Why did we choose this? | `design/decisions/` | past | truth — append-only | human |
| What is it, exactly? | `design/specs/` | imperative | spec — pinned to a source version | either |
| What's reusable? | `design/system/` | imperative | truth — the system of record | human |
| What actually shipped? | `changelog/` | past | TRUTH — generated from git | agent, from git |

`design/explorations/` is the tier with no equivalent anywhere in normal practice,
and it is the most valuable thing in this document: **a durable record of rejected
directions and why they lost.** No design tool stores it. It is the first thing
anyone wants a year later and the first thing that disappears.

The changelog tier is deliberately shared with the repo stack rather than
duplicated. What shipped is what shipped; a second, hand-written "design changelog"
would be hypothesis wearing the costume of truth — exactly the failure the
done-vs-explored rule exists to prevent.

## The nineteen skills

Grouped by phase of the work. Seven exist; the rest are still a hunch.

**Set it up**

| Skill | What it would produce |
|---|---|
| `design-setup` *(built)* | The `repo-setup` of design: survey, map onto the seven tiers, adopt existing names, write only the gaps, register a routing table in CLAUDE.md. Everything else needs this first. |

**Frame it — before any pixels**

| Skill | What it would produce |
|---|---|
| `design-brief` *(built)* | Problem, who feels it, jobs-to-be-done, constraints, success, and non-goals. The stated intent every later skill cites. |
| `design-language` *(built)* | The other half of the brief: the surface and its brand posture, the references and the anti-reference, constraints as falsifiable rules, the vocabulary. Not on the original list — the gap only became visible once `design-critique` needed something to review against. `brand-doc` stays separate: this is a per-surface visual direction, not brand identity. |
| `design-research-log` | Research inputs with provenance, enforcing the observation/interpretation split so later decisions cite evidence rather than folklore. |

**Diverge — brainstorm and explore**

| Skill | What it would produce |
|---|---|
| `design-explore` *(built)* | **Absorbed `design-brainstorm` and `design-directions`** — the split did not survive contact with the work. Three directions, each committed to a named structural axis, each with thesis, bet and risk, ending in a comparison matrix and artifacts you open rather than prose you read. The one skill in this territory permitted to generate, under the three conditions of [ADR 0022](../decisions/0022-generation-is-allowed-only-into-explorations.md). |
| `exploration-log` *(built)* | Round N: what changed, what it was testing, what we learned, what we kept, what we abandoned — pinned to frame/version links. Append-only. |
| `prototype-log` | A prototype is an experiment nobody writes up. The hypothesis, what was faked vs. real, who saw it, what happened, what changed as a result. |

**Converge — critique and decide**

| Skill | What it would produce |
|---|---|
| `design-critique` *(built)* | Review against **stated intent, not taste**: does it do the job the brief names, hierarchy and scan path, density, states and edge cases, system consistency, craft. Every finding cites the intent it violates. |
| `design-decisions` *(built)* | ADRs for design forks, with `decisions-logger`'s discipline plus *what was given up* and *what would make us revisit*. |

**Specify and systematize**

| Skill | What it would produce |
|---|---|
| `figma-to-spec` | Frame → implementable spec: layout, tokens actually used, every state, responsive behavior, interaction, edge cases, a11y notes, and open questions for engineering. |
| `design-system-docs` | A token or component documented with anatomy, states, variants, a11y requirements, **when *not* to use it**, and a link to the decision that produced it. |
| `design-tokens-audit` | Drift between the design source of truth and the code. Reports; never auto-fixes. |
| `motion-spec` | The least-documented layer in any system. Trigger, property, duration, easing, delay/stagger, what it communicates, reduced-motion fallback. |
| `content-guidelines` | Voice, tone by context, terminology and banned words, capitalization, number and date formats — as **checkable rules**, not adjectives, so a reviewer can test against them. |
| `brand-doc` | What the brand is arguing, the identity decisions and their reasoning, and the boundaries — what is *not* the brand. |

**Validate**

| Skill | What it would produce |
|---|---|
| `accessibility-review` | Contrast, target size, focus order, semantics, motion, error identification, text resize — each finding citing a specific WCAG success criterion. |
| `design-qa` | Built UI vs. design intent: spacing and type drift, missing states, responsive breakage, interaction gaps. |
| `microcopy-review` | Every string against `content-guidelines` and against the states copy forgets — empty, loading, error, permission-denied, offline, overflow, zero and plural. |
| `visual-audit` | Consistency across a whole artifact set. Catches the drift only visible in aggregate: five greys where there should be two. |

**The payoff**

| Skill | What it would produce |
|---|---|
| `case-study-writer` | Reads `design/` end to end and drafts the narrative — the problem, what was tried, what was rejected and why, what shipped, what it cost. **This is the argument for keeping the record at all**, and it is the skill that would sell the other eighteen. |

The three later sub-territories reuse existing tiers rather than adding more:
`content-guidelines` and `brand-doc` → `design/system/`; `motion-spec` →
`design/specs/`; `prototype-log` → `design/explorations/`.

## The line these skills do not cross

**None of them make a design decision, generate a visual, or replace judgment.**
They interview, record, structure, and check.

This is not modesty, it is the same rule `decisions-logger` was built around, and
it binds harder here. In code, an invented rationale can eventually be caught
against a diff. In design there is nothing to diff it against — a fabricated
reason for a layout choice is indistinguishable from a real one to every future
reader, forever. So `*(reason not stated)*` is a first-class outcome in this
territory, not a fallback.

**One exception, added later.**
[ADR 0022](../decisions/0022-generation-is-allowed-only-into-explorations.md)
permits generation into `design/explorations/` — and nowhere else — because that
tier is history rather than a claim to truth. It holds only while three conditions
do: a written visual intent exists first, the artifacts are candidates and never
the record, and the verdict belongs to `exploration-log` or `design-decisions`.
Everything in this paragraph still governs the four record tiers unchanged.

## Open questions

- **Will anyone maintain seven tiers?** The repo stack already risks being
  ceremony on a small project, and `repo-setup` needed a `minimal` preset to stay
  honest. Design needs the same escape hatch, and it may need it more often than
  not. If most real users end up on the minimal preset, the seven-tier model is
  wrong and the answer is three tiers.
- **Do the connector-dependent skills belong in a public library at all?**
  `figma-to-spec` and `design-tokens-audit` assume an MCP server an installer may
  not have. The proposed answer is the degradation ladder — connector → local
  export → pasted text/screenshot — but a skill that is excellent with a connector
  and mediocre without may be worse than no skill.
- **Is `design-critique` reviewable by a model at all?** *Still open, now with a
  shipped skill to test it against.* Reviewing against a written brief is
  checkable. Judging hierarchy and craft from a screenshot may not be, and the
  failure mode is confident, generic, useless feedback. The built skill hedges
  rather than resolves: it hard-gates on a written intent, requires every finding
  to quote the rule it violates, and drops any finding that cannot state how the
  thing *reads*. Whether the perceptual half earns its place is the thing to watch
  — if the constraint checks carry every useful finding, the skill should be scoped
  down to those.
- **Does the landing page survive this?** The site, the README and the talk all
  argue a repo-only thesis. A Design group beneath them reads as an afterthought
  until they are rewritten. That rewrite is a positioning decision, not a code
  change, and it has not been made.

## Graduate or kill

**Graduate** a skill into a PRD when: a real project has used the tier it writes
into for at least one cycle, and the absence of that skill was felt — someone
wrote the artifact by hand and resented it.

**Kill** the tier — or the whole model — when: after a full project cycle,
`design/explorations/` is empty. `design-explore` now writes into it, which weakens
the test — a tier filled by a generator is not evidence that anyone chose to record
a rejected direction. Read the *verdicts* in `exploration-log`, not the file count. That tier is the thesis. If the rejected
directions still are not getting written down when a skill exists to write them,
the problem was never tooling, and the remaining nineteen skills will not fix it.

_Unresolved after a while? Kill it. A stale concept an agent can read is worse
than no concept at all._
