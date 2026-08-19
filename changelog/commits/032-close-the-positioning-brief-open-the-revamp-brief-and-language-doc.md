# docs(design): close the positioning brief, open the revamp brief and language doc

- **Commit:** `acdd72b1d1b0de14bfe2430454716f23fd17734e` (`acdd72b`)
- **Author:** Vidhunnan Murugan
- **Date:** 2026-08-19

## Commit message

Phase 0 of the website revamp: the records that have to exist before anything is
built or explored.

`positioning.md` is closed rather than edited. Its body is untouched — the only
changes are the Status line and three appended revision notes. Two of its own terms
had to be lifted for the revamp to proceed (the brand constraint "no new visual
direction" and the non-goal "redesigning the site visually"), and lifting them is
recorded rather than done quietly.

It closes **unevaluated, not successful.** Its single success criterion was "someone
lands cold and can say what the library is for" — observable only by asking someone
who hasn't seen it, and nobody was asked. design/research/ is empty and Vercel Web
Analytics returns 404, so there is no behavioural data either. Saying so is more
useful than letting a closed brief imply it worked.

The new brief states the problem the revamp actually solves: the site's thesis covers
roughly eight of fourteen skills, the structure is six sections in one form and
doesn't survive 32 skills, three things on the page are duplicated or untrue, and one
is a defect (trust qualifiers are display:none below 720px). Time is still
*(not stated)* — the old brief didn't have one and inventing one now would be fiction.

The language doc carries **constraints only, no direction.** That is deliberate and
it is the correction a pressure test forced: "mono is the primary face" is a
direction, and writing it into a constraints table would make two of the three
explored directions strawmen — which design-explore forbids. Type, spacing, layout,
density and imagery are listed as explicitly unconstrained so the exploration owns
them.

Seven hard constraints, each falsifiable: records shown verbatim and never restyled,
every shown record carries its path, nothing types itself, redline keeps its meaning,
the palette is not re-derived, the page reads with JS off, and no claim the page
cannot source. Anything unfalsifiable was left out.

## Changes in detail

### `design/briefs/positioning.md` (modified)

- Closed rather than rewritten. Two mutations only: the header line becomes
  `Status: closed · Date: 2026-08-16 · Closed: 2026-08-19`, and a new `## Revisions`
  section is appended. Everything between is byte-identical.
- Revision 1 records the close and quotes both lifted terms back verbatim before
  lifting them — the brand constraint *"The Swiss whitepaper direction stands (ADR
  0017). No new visual direction."* and the non-goal *"Redesigning the site visually.
  ADR 0017 stands. This is a content and structure change."*
- Revision 2 states that its success criterion was **never tested**: it is observable
  only by asking someone who has not seen the page, `design/research/` is still empty,
  and Vercel Web Analytics returns `404 — not found`. The brief closes *unevaluated*,
  and the criterion moves forward into the revamp.
- Revision 3 records that its second open question was answered by judgement rather
  than by a test — *"context engineering"* is retired from the page as jargon while
  the plain noun *context* stays.

### `design/briefs/website-revamp.md` (new)

- The revamp's stated intent, written via `/design-brief` and drafted from a recorded
  brainstorm rather than a fresh interview, which the footer says.
- §The problem names four things, each with its own evidence: the memory thesis covers
  roughly **eight of fourteen** skills and explains neither `design-explore` nor
  `skill-scaffold` nor the two standing-instruction skills; the page is six sections
  in one form, ~2,400px of catalogue for fourteen rows and ~5,400px at thirty-two;
  three items are duplicated or untrue (hero specimens 1/6/3 are Proof receipts 1/2/3,
  every install command appears twice, and ADR 0016's data-driven claim is false for
  ~50 hardcoded strings); and one is a defect — trust qualifiers are `display: none`
  below 720px.
- §Constraints carries `Time | *(not stated)*` rather than an invented deadline. The
  palette **inherits entire**; type is greenfield; the brand posture is *adjacent to
  Claude Code*, explicitly not the Field Report deck and explicitly not the
  Swiss-minimal direction the site currently occupies.
- §What success looks like carries the closed brief's single criterion forward
  verbatim, and this time puts the test in the plan — show it to three people who have
  not seen it. Installs and traffic are declined as lagging proxies.
- §Anti-goals names the two ways a good-looking result would still be a failure. Two
  further risks — reading as a developer docs site, and being too cold to keep reading
  — were **deliberately not adopted** and are recorded as accepted trades carried as
  revisit conditions on the direction decision instead.

### `design/system/language-website.md` (new)

- The visual intent `/design-explore` generates against — the ADR 0022 gate — written
  via `/design-language`.
- Opens with a blockquote stating that it holds **constraints, not a direction**, and
  that the type strategy is deliberately absent because writing it in would make two of
  three directions strawmen.
- Seven hard constraints in a table, each with a load-bearing reason and each
  falsifiable: records shown verbatim and never restyled, a shown record carries its
  path, nothing types itself, redline keeps its meaning, the palette is not re-derived,
  the page reads with JS off, and no claim the page cannot source. Typeface strategy,
  type and spacing scales, layout structure, density, chrome weight and imagery are
  listed as **deliberately unconstrained**.
- References name what it pulls from (Claude Code itself; machine output with a human
  mark on it) and two anti-references: the Field Report talk deck and the Swiss-minimal
  site the page currently is.
- Vocabulary puts three things out of bounds — *"context engineering"*, *"memory"*
  (the site's old thesis, with the cost of dropping it stated), and absolute accuracy
  claims including *never invented*, on the grounds that an unverifiable absolute is
  self-inflicted on a page arguing against confident claims.
- §What would count as failure states that failure 2 is detectable **only by asking a
  person**, and that nothing in the document has been tested on a reader.

## Files changed

```
 design/briefs/positioning.md      |  23 ++++++-
 design/briefs/website-revamp.md   | 113 +++++++++++++++++++++++++++++++++++
 design/system/language-website.md | 122 ++++++++++++++++++++++++++++++++++++++
 3 files changed, 257 insertions(+), 1 deletion(-)
```

---

_Generated by `/changelog-tracker` from `git log -1` and `git show --stat`. Every
fact here comes from git: **faithful, not generative.**_
