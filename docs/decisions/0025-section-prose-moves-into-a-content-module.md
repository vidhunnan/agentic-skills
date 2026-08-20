# 0025. Section prose moves out of components into a content module

- **Status:** **Accepted**
- **Date:** 2026-08-19
- **Supersedes:** [0023](./0023-site-content-is-split-by-kind-data-vs-prose.md)

## Context

[0023](./0023-site-content-is-split-by-kind-data-vs-prose.md) did not propose the split it
recorded; it wrote down the one the site already had. Repeated and countable content —
the skill catalogue, the install commands, the matrix rows, the specimens — lived as data
in `website/components/lib/skills.ts`, every count derived from it and none typed. Section
prose — headings, ledes, body paragraphs — stayed as string literals in the component that
rendered it. 0023 was honest that it could not say why: asked the same day it was logged,
the owner gave no reason for the existing split, and both halves of its Alternatives carry
`*(reason not stated)*`.

What was given instead was an instruction, recorded verbatim in 0023's own Follow-up on
2026-08-19:

> *"instead of hardcoding, can you maybe make it into proper tokens and things like that."*

That Follow-up recorded it as intent, not as a decision, and named the condition: *"When
the prose actually moves, that needs its own ADR superseding this one — and it should
state what the split cost."*

The counts half had harder evidence behind it. The five numbers the page states about this
repo were typed by hand, and they drifted three times in a single day: the site said seven
rules and 32 documented commits while the round 3 artifact said 7 design decisions and 37
commits, and both were stale inside the session that wrote them.
`design/system/language-website.md` states the constraint as a hard rule of the direction —
**"No claim the page cannot source"** — and a typed count is exactly that.

Round 3 (`467dc5b`, 2026-08-19) moved both.

## Decision

We ended the split. Every user-facing string moved into
`website/components/lib/content.ts` — `NAV`, `HERO`, `MATRIX_COPY`, `LOOP_COPY`,
`SKILLS_COPY`, `INSTALL_COPY` and `FOOTER`, all `as const` — and no section component was
left holding its own prose. The five counts moved into
`website/components/lib/counts.ts`, which reads the repo itself at build time: protocol
blocks from the `BEGIN skill:` markers in `CLAUDE.md`, ADRs from `docs/decisions/` and
`design/decisions/`, entries from `changelog/commits/`, briefs from `handoff/`.

The boundary is now three-way and is stated where it has to be obeyed, in `content.ts`'s
own header: prose here, structured or repeated content in `skills.ts`, counts derived in
`counts.ts` and **never written here**.

## Alternatives considered

- **Keep 0023's split and fix only the counts.** The narrower, better-evidenced change:
  the counts had a demonstrated failure behind them — three drifts in one day, against a
  written constraint in the language doc — while the prose had no defect anyone had
  recorded, and 0023 had just finished arguing that markup interleaved with copy is what
  keeps prose in its component. It lost to the owner's direct instruction, quoted above.
  **The reason behind that instruction is `*(reason not stated)*`**: the request names what
  to do, not why, and 0023 records that when the same question was put the same day, no
  reason for the existing split was given either.
- **Put the prose in Markdown or MDX files rather than a typed TypeScript module** — the
  most literal reading of "proper tokens", and the obvious form for a page whose entire
  subject is Markdown. **`*(reason not stated)*`** — no source records it being weighed.
  What is observable in the result, offered as fact rather than as the reason: the strings
  are not documents but fragments interleaved with markup, so there is no whole paragraph
  for a Markdown file to hold; and `as const` gives components typed keys, which
  `tsc --noEmit` — one of this repo's two quality gates — checks.

## Consequences

- **The cost 0023 knowingly re-accepted is recovered.** A wording pass is one file, not a
  hunt through six components. That was 0016's original goal and 0023's stated price for
  keeping prose local.
- **What the split bought is what this gives up: prose no longer sits beside the markup
  that renders it, so it is stored in fragments.** `HERO.ledeBefore` / `ledeGap` /
  `ledeAfter` exist because one clause is painted `--red`; `MATRIX_COPY` splits `noteRed`
  from `note` for the same reason; `LOOP_COPY` splits a single sentence into `subLead`,
  `subSkill` and `subRest`. A sentence is now three keys and can only be read whole in the
  browser. This is the precise objection 0023 recorded against moving prose — the move did
  not answer it, it paid it — and editing copy now means editing fragments and knowing
  which one carries the colour.
- **No count can be typed into a sentence any more — but prose can still carry a number,
  and does.** `SKILLS_COPY.sub` shipped in this very commit reading *"Fourteen, each a
  separate plugin"*, rendered raw by `SkillList.tsx`, while `skills.ts` has
  `TOTAL_SKILLS_WORD` for exactly that sentence; `MATRIX_COPY.sub` says *"Nine questions"*
  for a table whose rows are data. The module relocated the strings; it did not make the
  rule enforceable. As 0023 said of its own boundary: this is a convention, not a
  mechanism.
- **The derived counts depend on a repo root the deploy does not have.** `counts.ts`
  resolves `REPO_ROOT = join(process.cwd(), "..")` and wraps every read in a `try`/`catch`
  returning `0`. [0024](./0024-skills-ship-as-committed-build-time-zips.md) records that
  Vercel's Root Directory is `website/`, so that path is not on disk at build time — the
  same absence that made the zip script die with ENOENT. The zip script threw; `counts.ts`
  swallows. Nothing in the record reconciles the two, and a page rendering *"0 decisions"*
  would be sourcing correctly and saying something false. *(Stated from the code; not
  verified against the deployed page.)*
- **Two modules, and the line between them is a judgement call rather than a rule.**
  `FOOTER.groups` holds repeated, structured link data in the prose module; `skills.ts`
  holds specimen lines that are prose. Nothing enforces the header's boundary, and the
  next section's content will be routed by whoever writes it.
- **0016's surviving consequence is narrowed, not closed.** `skills.ts` is still a
  hand-maintained copy of `SKILL.md` and `README.md`. The counts are the one part of the
  page that now genuinely reads the repo rather than mirroring it — for those five numbers
  the drift window is shut; for everything else it is still open.

## Evidence

- **Primary:** `website/components/lib/content.ts` §header — written at the move, in the
  file the move created.
  > Until 2026-08-19 these ~50 strings — every headline, every section intro — were
  > literals inside the components, while only repeated content (skills, matrix rows,
  > specimens) lived as data. […] This file is the half that was missing.
  >
  > Prose only. Structured, repeated content stays in `skills.ts`; counts are derived in
  > `counts.ts` and never written here.
- **Corroborating:** `website/components/lib/counts.ts` §header — *"typed by hand until
  2026-08-19 and drifted three times in a single day […] A typed count is a claim the page
  cannot source"* · `git:467dc5b` (2026-08-19) §"The two hardcodings, both ended", which
  names this ADR as owed: *"it supersedes 0023's split — that needs its own ADR now that
  it is real, not just intended"* · `design/system/language-website.md`, the constraint
  table row *"No claim the page cannot source"* ·
  `changelog/commits/042-round-3-chrome-scale-composition-and-no-more-typed-counts.md`
  §`lib/content.ts`, which verified the move against the tree file by file and recorded
  that the record had not yet been written ·
  [0023](./0023-site-content-is-split-by-kind-data-vs-prose.md) §Follow-up (2026-08-19),
  the instruction quoted verbatim.
- **Rationale:** the counts half is **stated in the primary sources** — `counts.ts`'s
  header and the language doc's constraint. **Why the prose moved is `*(reason not
  stated)*`.** The owner's instruction is on the record; the reasoning behind it is not,
  and 0023 records that no reason for the previous split was given when asked. It is not
  this record's job to supply one after the fact.

## Follow-up

*Append-only. Everything above this heading is **frozen**. Entries below are dated and
additive — evidence that the world moved, not a revision of what was decided.*

- **2026-08-20** — **The sentence above about the counts is now false, and the reason is
  worth more than the correction.** `git:04a408a`.

  This record said the counts were "the one part of the page that now genuinely reads the
  repo rather than mirroring it". They did read the repo — and that is exactly what broke.
  Vercel's Root Directory is `website/`, so the repo root is not on disk at build time.
  `counts.ts` caught every failure and returned `0`, and `decisions` is `files - 1` for
  the reject ledger, so the deployed page claimed **"-1 decisions"**. A false number,
  shipped silently, on a page whose stated constraint is "no claim the page cannot
  source" — a worse failure than the hardcoded counts this ADR replaced, because a stale
  number is at least a number that was once true.

  The counts are now derived where the repo exists and committed as
  `components/lib/counts.json`, which is the same shape as the skill zips in
  [0024](./0024-skills-ship-as-committed-build-time-zips.md) — and inherits the same
  staleness cost, mitigated the same way by `tests/counts.spec.ts`.

  **So the honest position is the reverse of what is written above:** the counts now
  mirror the repo like everything else, and the mirror is checked by a test rather than
  by the filesystem. Whether that is worth a further ADR is *(not decided)*; it is
  recorded here so the claim above is not read as current.

---

_Append-only. If this turns out to be wrong, **do not edit it** — write a new decision that
supersedes it and links back. Being wrong on the record is more useful to the next reader
than a clean file._

_**Exactly two things in this file may ever change:** the `**Status:**` line (to point at a
superseding decision) and additions under `## Follow-up`. The Status line is a convenience —
the authoritative forward link is the dated Follow-up entry. Everything else is frozen._
