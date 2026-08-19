# Design brief — The website revamp

Status: active · Date: 2026-08-19

## The problem

The site argues a thesis the library has outgrown, and it has grown a set of
structural problems that get worse with every skill added.

**The argument no longer matches the library.** The hero says *"An agent starts every
session with no memory of the last one."* That explains the record-keeping skills and
explains neither `design-explore` (which generates and remembers nothing), nor
`skill-scaffold` (which is meta-tooling), nor `branch-naming` and `model-strategy`
(standing instructions that would apply to an agent with perfect recall). The memory
premise covers roughly **eight of fourteen** skills. `docs/concepts/design-context-stack.md`
flagged this as an open question and left it unresolved.

**The structure does not survive its own success.** The page is six sections in one
form — eyebrow, heading, intro, vertical list — five of them consecutive. The skills
catalog is ~2,400px for fourteen rows and would be ~5,400px at the thirty-two on the
roadmap.

**Three things on the page are duplicated or untrue**, verifiably:
- Hero specimens 1, 6 and 3 *are* Proof receipts 1, 2 and 3 — the same artifacts
  described twice in different words.
- Every install command appears twice (catalog chip and Install section), and the
  `answers` question renders twice on ten of fourteen skill rows.
- ADR 0016 claims content is data-driven from one source. Around fifty user-facing
  strings — every headline and every intro paragraph — are hardcoded in components.

**And one is a defect:** below 720px the trust qualifiers are `display: none`. A
tier's trustworthiness is the entire point of the stack, and on a phone it is gone.

## Who feels it

- **Someone on their fifth session of the same project**, at the moment they are
  deciding whether this library is for them. The split that matters is *casual vs.
  sustained*, not designer vs. engineer — both hit this, and someone on session one
  does not.
- **The maintainer**, every time the library has to be explained in person because
  the page does not do it alone. Carried forward from the closed positioning brief,
  where it was true and remains true.

## Jobs to be done

- When someone hears this library might help, they want to tell within a few seconds
  whether it applies to their work, so they can stop reading or install something.
- When someone has watched an agent confidently do the wrong thing on a project it
  didn't understand, they want to know there is a way to fix it that isn't "write
  more documentation."
- When the maintainer shares the link, they want the page to carry the argument
  unaccompanied.

## Constraints

| Kind | Constraint |
|---|---|
| Technical | Static Next.js export under `/website` (ADR 0015), plain CSS Modules (ADR 0018). The **palette inherits entire** — 11 tokens, both modes, contrast-verified — and is not re-derived. Type is greenfield. |
| Brand | **Adjacent to Claude Code.** Same world, clearly not official. Explicitly not the Field Report talk deck, and explicitly not the Swiss-minimal portfolio direction the site currently occupies. |
| Time | *(not stated)* |

## What success looks like

- **Someone who has not seen the page can say what the library is for and whether it
  applies to them, without the maintainer explaining it.**

Carried forward verbatim from the closed positioning brief, which set this criterion
and never tested it. This time the test is in the plan: show it to three people who
have not seen it. It is deliberately not an install or traffic number — the job of
the page is comprehension, and installs are a lagging proxy.

## Non-goals

- **Rewriting the talk deck.** Unchanged from the closed brief. Separate artifact,
  separate audience.
- **Re-deriving the palette.** Both modes clear AA by computation. `--red` shipped at
  4.43:1 and `--mute` at 3.08:1 once, because they were picked by eye.
- **Changing what any skill does.** This is the site. The skills are not in scope.
- **Adding a design changelog or any new tier.** `changelog/` is generated from git
  and is the only tier entitled to say what shipped.

## Anti-goals

*What would count as failure even if it tested well:*

- **The records read as a design gimmick.** If the gaps and the redline look like a
  device invented for the layout rather than real artifacts from a real repo, the
  argument inverts — their entire value is that they are not decoration.
- **Beautiful, and still can't say what this is.** Someone lands, admires it, leaves,
  and could not describe the library to a colleague. This is the current failure and
  the criterion above exists to catch it.

Two risks were considered and **deliberately not adopted** as anti-goals: that the
site reads as a developer docs site, and that it is too cold to keep reading. Both
are accepted trades rather than oversights, and both are carried instead as revisit
conditions on the direction decision, so something still catches them.

## Open questions

- Does the command palette survive its own revisit condition? ADR 0005: *"if the
  palette is opened rarely enough that the JS is not worth it, the honest move is to
  remove it."* Unmeasured.
- Nav and footer were never discussed. Both need rethinking rather than relabelling.
- The design-language doc names Claude Code as its reference but no specific
  artifacts. Two or three named references would make it testable.
- Whether behavioural data is worth collecting at all. Vercel Web Analytics is not
  enabled — it returns `404 — not found` — so there is currently no data of any kind.

---

_Written via `/design-brief` on 2026-08-19, drafted from a recorded brainstorm rather
than a fresh interview. Sections marked `*(not stated)*` were not answered and were
deliberately not invented._
