# Design brief — Positioning the library after the design expansion

Status: closed · Date: 2026-08-16 · Closed: 2026-08-19

## The problem

The library grew from six skills to eleven, and five of the eleven are design
skills. Every piece of outward-facing material still argues the original,
narrower thesis:

- the README hero says *"An agent starts every session with no memory… These are
  the skills that write that briefing"* and illustrates it entirely with repo
  artifacts — changelog, decision log, handoff;
- the landing page leads with the same framing and, until this session, showed
  only the five-tier code stack;
- the talk deck — *Writing for Machines: The Non-Coder's Context Stack* — argues
  the repo-only version end to end.

So a designer arriving at the page sees an engineering tool that happens to have
a design section, and an engineer sees a tool that is drifting. The library and
its pitch no longer describe the same thing.

## Who feels it

- **A designer who lands on the site cold**, at the moment they are deciding
  whether this applies to them. Nothing above the fold says it does.
- **The maintainer**, every time the library has to be explained in person
  because the page does not do it alone.

## Jobs to be done

- When a designer hears the library might help with design rationale, they want
  to tell within a few seconds whether it is for them, so they can stop reading
  or install something.
- When the maintainer shares the link, they want the page to carry the argument
  unaccompanied, so the pitch does not depend on being in the room.

## Constraints

| Kind | Constraint |
|---|---|
| Technical | Content and structure only. The site is a static Next.js export with content driven from one `components/lib/skills.ts` (ADR 0016) — the reposition must come through that data source, not through hardcoded markup. |
| Brand | The Swiss whitepaper direction stands (ADR 0017). No new visual direction. |
| Time | *(not stated)* |

## What success looks like

- **Someone lands on the page cold and can say what the library is for and
  whether it applies to them — without the maintainer explaining it.**

That is the whole criterion. It is observable by asking someone who has not seen
it before, and it is deliberately not a traffic or install number: the job of the
page is comprehension, and installs are a lagging proxy that would take months to
read.

## Non-goals

- **Rewriting the talk deck.** It stays as-is. The deck is a separate artifact
  with its own audience and timing; repositioning covers the README, the site and
  the framing.
- **Redesigning the site visually.** ADR 0017 stands. This is a content and
  structure change.

## Anti-goals

*What would count as failure even if it tested well:*

- **Engineers bounce.** If the repo skills start reading as secondary and the
  original audience stops recognising the library as theirs, the reposition has
  failed even if design interest rises.
- **The pitch dilutes into "AI skills for everything."** The context-engineering
  spine is the asset. A library that covers more by arguing less is worse than
  the narrow one it replaced, and the failure would not be visible in any metric
  until the thesis is already gone.

## Open questions

- Does the talk deck eventually have to follow, or can the deck and the library
  argue different scopes indefinitely? Deferred, not resolved.
- Is "context engineering" still the right words for a designer audience, or is
  it engineering vocabulary that will lose the reader in the first sentence?
  Nobody has tested this.

## Revisions

- **2026-08-19** — **Closed.** The reposition this brief specified was delivered:
  design ADR 0001 gave the two stacks equal billing, the site gained a *Design work*
  group and a second stack section, and the README and `skills.ts` followed. It is
  closed because a wider revamp now supersedes its scope — two of its own terms no
  longer hold. Previously, **Constraints · Brand**: *"The Swiss whitepaper direction
  stands (ADR 0017). No new visual direction."* Previously, **Non-goals**:
  *"Redesigning the site visually. ADR 0017 stands. This is a content and structure
  change."* Both were lifted deliberately; see the revamp brief and the design ADR
  superseding 0017.
- **2026-08-19** — **Its success criterion was never tested.** *"Someone lands on the
  page cold and can say what the library is for"* is observable only by asking
  someone who has not seen it, and nobody was asked. `design/research/` is still
  empty and Vercel Web Analytics returns `404 — not found`, so there is no
  behavioural data either. This brief closes **unevaluated**, not successful. The
  revamp carries the same criterion forward and the test moves into its plan.
- **2026-08-19** — Its second open question was answered by the revamp rather than by
  a test: *"context engineering"* is retired from the page as jargon, while the plain
  noun *context* stays. Still untested on a reader; decided on judgement.

---

_Written via `/design-brief` on 2026-08-16. Sections marked `*(not stated)*` were
not answered and were deliberately not invented._
