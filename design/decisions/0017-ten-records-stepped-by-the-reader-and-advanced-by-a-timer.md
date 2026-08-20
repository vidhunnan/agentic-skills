# 0017. The hero shows ten records, stepped by the reader and advanced by a timer

- **Status:** **Accepted**
- **Date:** 2026-08-20
- **Supersedes:** [0010](./0010-one-hero-specimen-not-six.md)

## Context

[0010](./0010-one-hero-specimen-not-six.md) retired the six-specimen rotation on
2026-08-19 and left the hero showing `SPECIMENS[0]` and nothing else. It deleted
`Specimens.tsx`, the dwell timer, the dots and the pause control, and it **returned the
motion exception** that [0006](./0006-the-hero-specimen-rotates-through-six-skills.md)
had bought: the site went back to one exception, the scroll reveal, and `globals.css`
said so in the file — *"One exception, and only one: the reveal, once per element."*

0010 also recorded, in its own words, what that cost: *"Five records, off the page"*, and
*"The one thing on the page that could show range without a click. Range is now a list of
fourteen names, which is a different claim: the catalogue says the skills exist, the
specimens showed what they produce."*

Four commits on the morning of **2026-08-20** reopened it, in this order:

- `git:fdc98f2` swapped `SPECIMENS[0]` from a record of an **absence** (ADR 0002's
  unrecorded rationale) to a record of a **decision** (ADR 0007's, reason attached) —
  *"a record of an ABSENCE is a strange thing to lead with when the argument is that these
  skills write decisions down."*
- `git:1c7f754` built **ten** records, stepped by `← prev` / `next →` with an *"N of 10"*
  count, and claimed no motion exception was needed.
- `git:5952626` added the timer, ~30 minutes later.
- `git:7699f59` re-pinned [`../specs/motion.md`](../specs/motion.md) to `git:5952626`,
  putting the exception count back to two and — importantly — **restating the grounds
  rather than inheriting them.**

`1c7f754` also exposed a correctness problem that had been sitting in the data file
unrendered. A test added the same morning found that **five of the six hand-written
specimens were not verbatim:**

> *"The worst stitched fragments from two non-adjacent rows of a Markdown table into what
> read as one continuous passage — words dropped from the middle, which the data file's own
> rule forbids. None had ever rendered, so nothing false reached a reader; they were waiting
> in the array for exactly this change to expose them."*

## Options considered

| Option | The bet | Why it lost |
|---|---|---|
| One specimen, static — the incumbent, [0010](./0010-one-hero-specimen-not-six.md) | Breadth belongs to the catalogue; the hero's job is to show **one** record properly, undivided | Lost on 0010's own recorded cost, taken the other way. `git:1c7f754` states the counter-case directly: *"THE CONTENT IS THE POINT. Ten records across seven skills"* — the range is the argument, and fourteen names is not the same claim as ten artifacts |
| Ten records, arrows only, **no timer** — what actually shipped in `git:1c7f754` | Honours the motion rule exactly as written. Nothing moves that the reader did not cause, so no exception is needed, no spec amendment is owed, and `1c7f754` says so in as many words: *"this moves only when a reader presses an arrow"* | Lost on **discovery**, about thirty minutes later. [`../specs/motion.md`](../specs/motion.md): *"a reader who never touches the arrows would otherwise never learn there are ten records rather than one."* It is 0006's finding again — *"a control the reader has no reason to press is not a control"* |
| Ten with the timer **and an explicit pause control** — 0006's shape | WCAG 2.2 SC 2.2.2 is satisfied, and the exception costs nothing in conformance. The retired implementation already had the button; keeping it was the cheap option | Removed **at the owner's request on 2026-08-20**, after the tradeoff was raised. **`*(reason not stated)*`** — every source shows the trade being *raised and decided*; none records why it was decided that way |
| **Ten, stepped by arrows and advanced on a 6500ms timer, no pause control — chosen** | The arrows make all ten reachable; the timer makes the reader aware there is anything to reach | — |

## Decision

The hero renders **ten records** across seven skills — two design decisions (one with its
reason, one that admits it never had one), an architectural ADR, the reject ledger, raw
git output with its provenance line, a changelog correcting its own author, a handoff
reconciled against the session before it, a killed exploration that declines to
over-claim why, a brief naming its own failure modes, and a design doc that legislates
words. Every record is in the DOM and in the static export; inactive ones are `inert` and
`aria-hidden` but keep their box, so the card holds the height of the tallest and the
caption and controls below never jump. The stack is one grid cell at **426px**, and all
ten were measured against that frame. The controls mount-gate, as everywhere else here.

**It advances on its own.** Dwell is `6500ms`, reused from the rotation 0010 killed
rather than re-picked. The change is a **hard cut** — no fade, no lift; the retired
version crossfaded 0.5s in and 0.22s out, so this moves strictly less. The only thing
that moves continuously is a 2px line filling across the card's bottom edge over the
dwell, which is what makes the advance legible rather than startling. Four brakes hold
it: the pointer is over it, focus is inside it, the tab is backgrounded, or the card is
scrolled out of view. A manual arrow press **stops it for good** — the timer should not
take a record away from the one person who asked for it — but leaving the section clears
that stop, so returning starts it again. Under `prefers-reduced-motion: reduce` it does
not run at all, read through a `change` listener rather than once at mount.

This **supersedes 0010's "one specimen"** and **re-grants the motion exception 0010
returned.** `motion.md` says two exceptions again, re-pinned to `git:5952626`.

### The exception is NOT granted under 0006's bar

0006 broke the absolute motion rule for the first time and wrote a **three-part bar**
into `motion.md` so the exception could not be reused casually: the moving thing *is* the
content, it can be stopped, and *"six records could not fit on the page any other way."*

Two of those three legs clear here. **The third is false.** The arrows added in
`git:1c7f754` reach all ten records with no motion at all — the fitting problem 0006's
third leg described does not exist on this page, because it was solved half an hour
before the timer was added. Anything claiming 0006's bar is cleared is claiming something
untrue.

So the grounds are **restated, not inherited**, and they are weaker. The timer is
justified on **discovery**: a reader who never touches the arrows would otherwise never
learn there are ten records rather than one. `motion.md` writes it down as the weaker
claim it is — *"That is a weaker claim than 0006's and is written here as one"* — and
gives the reason for restating rather than borrowing:

> *"An exception that outlives the thing it was granted for is how a motion system loses
> its rule."*

`1c7f754`'s own claim that this *"supersedes design ADR 0010's 'one specimen' — but not
ADR 0006's bar, which governs motion"* was true of `1c7f754` and stopped being true at
`5952626`. Both halves are now in scope.

### Every record is generated from its file, not transcribed

The five-of-six failure above is why. All ten entries are extracted from their source
files **by line range** and pasted in whole, and `website/components/lib/skills.ts` states
the rule where the next person would be tempted:

> *"ALL TEN ARE GENERATED, NOT TRANSCRIBED. Each entry is extracted from its file by line
> range and pasted in whole. … the lesson is the obvious one: do not retype a record by
> hand. Re-extract it."*

`website/tests/specimen.spec.ts` checks every entry against its source file, normalising
only whitespace and block-level blockquote markers, and **reports every drift at once**
rather than stopping at the first. The card is narrower than the sources' ~80-column
wraps, so the renderer reflows paragraphs — correct for Markdown, where a single newline
is not a line break — while `kind: "pre"` lines (diffstat columns, table pipes) are never
reflowed, because their whitespace is the thing being shown.

## What we gave up

- **WCAG 2.2 SC 2.2.2 (Pause, Stop, Hide). There is no pause control, and the page does
  not satisfy it.** Stated flatly because it is a flat fact, and because the spec now says
  it too: *"The specimen auto-updates again, so WCAG 2.2 SC 2.2.2 (Pause, Stop, Hide)
  applies again — and the page does not currently satisfy it."* The four brakes cover a
  visitor who hovers, focuses, backgrounds the tab, scrolls it away or presses an arrow.
  What they do not cover is the visitor who does none of those, and the retired spec's own
  reasoning already named that person: *"holding on hover and focus does not reach a
  visitor who never enters the widget."* That visitor gets content that auto-updates
  indefinitely. The gap was raised, decided against, and is recorded rather than hidden;
  reinstating the control is a one-button change.
- **The absolute motion rule, for the second time, on weaker grounds than the first.** 0006
  spent it against a three-part bar; 0010 got it back and `globals.css` said *"one
  exception, and only one"*; this spends it again with one leg of that bar false. 0006 set
  itself the condition *"If this ADR gets cited to justify a second exception … the rule
  failed and should go back to being absolute."* It was not cited — the grounds were
  rewritten instead — but the outcome that condition was watching for is the one that
  happened.
- **0010's argument, unanswered.** 0010 held that breadth belongs to the catalogue and the
  hero should show one record properly. Nothing here shows the catalogue failing at that
  job; the trade was simply taken the other way. And the unmeasurable question 0006 first
  named — one record read six times may land harder than six read once — has now been
  settled **three times in three directions with no measurement on any of them.**
- **One record, shortened for the frame.** All ten were measured against the fixed 426px
  cell and one overflowed by 71px; it was trimmed to its self-contained opening rather than
  shrinking the type for everyone. That is the right trade and it is still a record on the
  page in a form its source does not have.
- **The dwell, still untested.** `6500ms` is inherited, not re-picked, and `motion.md`'s
  own table says it *"was never tested on a reader."* 0010 listed that as a question dying
  with the feature; the feature is back and the question is still unanswered.
- **A JS-free hero.** 0010 removed the client boundary from the hero; this puts it back,
  plus an `IntersectionObserver`, a visibility listener and a media-query listener. Every
  record still ships in the static export and no control ships that does nothing, so a
  JS-off reader loses nothing — but the direction was won by exploration artifacts that
  contained no JavaScript at all, and the hero is no longer one of them.

## What would make us revisit

- **Anyone raises 2.2.2 against the page** — a reader, an audit, a contributor, a
  screenshot in an issue. The gap is recorded, not defended. One button reverses it, and
  this is the condition that should trigger pressing it.
- **The timer takes a record away from someone who was reading it.** The four brakes exist
  to make that impossible; a single credible report that it happened means they are not the
  whole of it, and the pause control was the answer all along.
- **This ADR gets cited to justify a third motion exception.** The bar is already one leg
  short. A third granted on grounds weaker than these means the rule is not a rule, and
  `motion.md` should say that plainly instead of continuing to count.
- **A specimen drifts from its source and the suite does not catch it.** *"A real file in
  this repo"* is the page's load-bearing claim; five of six hand-written entries had already
  failed it silently. If generation-by-line-range plus `specimen.spec.ts` is not enough,
  ten records are ten liabilities rather than ten proofs.
- **A cold reader still cannot say what the library is for.** The revamp brief's
  comprehension test was unrun when 0010 was written and is unrun now. If ten records do
  not move it, the hero is not the variable and something further down the page is.

## Evidence

- **Primary:** `git:1c7f754` (2026-08-20):
  > *"THE CONTENT IS THE POINT. Ten records across seven skills … EVERY ENTRY IS GENERATED
  > FROM ITS FILE BY LINE RANGE, not transcribed. That matters because the test added
  > earlier today found that FIVE of the six hand-written specimens were not verbatim."*

  `git:5952626` (2026-08-20):
  > *"NO PAUSE CONTROL, at the owner's request after the tradeoff was raised. The
  > consequence is on the record in the component and not argued further: a visitor who
  > never hovers, focuses or presses an arrow gets content that auto-updates indefinitely,
  > which is what WCAG 2.2 SC 2.2.2 asks for a mechanism against. The four brakes above are
  > now the whole of it."*

  `git:7699f59` (2026-08-20):
  > *"The grounds are restated rather than inherited, because they are not the ones ADR 0006
  > used. Its three-part bar was: the moving thing IS the content, it can be stopped, and six
  > records could not fit any other way. That third leg no longer holds — the arrows reach
  > all ten without motion. The timer is justified on discovery instead, and that is a weaker
  > claim, written here as one."*
  >
  > *"Still owed: a design ADR. This supersedes 0010's retirement and re-grants an exception
  > the spec had closed in writing."*
- **Corroborating:** [`../specs/motion.md`](../specs/motion.md) as re-pinned to
  `git:5952626` — §Layout (two exceptions, grounds restated), §Tokens (dwell, hard cut,
  progress line), §Accessibility (2.2.2 applies and is not satisfied) ·
  `website/components/Specimen.tsx` — the docstring naming 0010, and the `held` / `stopped`
  comment recording the 2.2.2 consequence in the code · `website/tests/specimen-autoplay.spec.ts`
  — *"There is no pause control; it was removed at the owner's request. These brakes are
  therefore the whole of it."* · `website/tests/specimen.spec.ts` · `website/components/lib/skills.ts`
  §SPECIMENS · `git:fdc98f2` — the `SPECIMENS[0]` swap · [0010](./0010-one-hero-specimen-not-six.md),
  superseded here · [0006](./0006-the-hero-specimen-rotates-through-six-skills.md) §What
  would make us revisit.
- **Rationale:** **mixed, and worth separating.** *Ten records* — stated at the time
  (`1c7f754`). *The timer* — stated, and stated **as weak**: the discovery argument is
  written down in `motion.md` as a weaker claim than 0006's, deliberately, so it cannot
  later be mistaken for the bar being cleared. *Removing the pause control* —
  **`*(reason not stated)*`.** Three independent sources record that it was raised and
  decided by the owner on 2026-08-20; none records the reason, and none is supplied here.

## Follow-up

*Append-only. Everything above is **frozen**. Entries below are dated and additive.*

*(none yet)*

---

_**Exactly two things in this file may ever change:** the `**Status:**` line and
additions under `## Follow-up`. If this turns out to be wrong, do not edit it —
supersede it with a new decision that links back._
