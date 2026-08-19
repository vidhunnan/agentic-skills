# feat(website): round 3 — chrome, scale, composition, and no more typed counts

- **Commit:** `467dc5b7bf9c6056dc52ccfd9c692e3ae1aaa1f2` (`467dc5b`)
- **Author:** Vidhunnan Murugan
- **Date:** 2026-08-19

## Commit message

Round 2 shipped the direction and missed the craft: "there is no nav, footer, or
modren layout styles", and an h1 of 19px on a page where nothing else exceeded it,
so nothing anchored. This is design ADR 0007's direction, built properly.

Scale. The headline goes to clamp(36px, 6.2vw, 68px) and takes the full column.
Two intermediate attempts are worth recording because they were both wrong in the
same way: 66px boxed into half the width wrapped to six lines, and 54px inside a
sidebar column did it again. A display headline needs the width, not just the size.

Chrome. Nav replaces FileBar with a mark, an install CTA and active-section
marking; the footer goes from one dim line to four columns. FileBar's :nth-child()
responsive hiding is gone — it silently changed which links vanished on mobile
whenever the array was reordered.

A sticky 01-04 rail was built and cut. It read as documentation furniture, which is
the association design/system/language-website.md names as an anti-reference, and
the 246px it occupied is what the headline needed. Two problems, one deletion.

Surface. Contained regions get 5px corners, a shadow pair and stronger internal
dividers; the page itself stays flat. Both shadow values are alpha of --ink, which
is what --rule already is, so no colour enters the palette. Dark mode carries depth
with a 1px top highlight instead — a shadow does nothing on #14140f.

The two hardcodings, both ended:

- Counts are read from the repo at build (components/lib/counts.ts). They had
  drifted three times: the site said seven rules and 32 commits, the round 3
  artifact said 7 design decisions and 37 commits, and both were stale inside the
  session that wrote them. The language doc's constraint is "no claim the page
  cannot source"; a typed count is exactly that.
- Prose moves to components/lib/content.ts. Repo ADR 0016 claimed content was
  data-driven from one source and ~50 strings were literals in components. This is
  the half that was missing, and it supersedes 0023's split — that needs its own
  ADR now that it is real, not just intended.

Two defects found while building, both fixed at the source:

- The callout kicker was --red in the artifact. Redline means hypothesis, failure,
  the unrecorded reason; spending it on a label destroys the one place the page can
  say "this is not settled". Now --mute.
- Reveal dropped any element scrolled past faster than the observer sampled: it
  never intersected, so it sat at opacity 0 until the reader scrolled back up.
  Entries delivered with the element already above the viewport now count.

The hero specimen quotes more of design/decisions/0002 — through "it is not this
record's job to supply the reasoning after the fact" plus the second honest gap.
Quoted at the source's own line wraps. SpecimenPart is new so the marker can be
redlined without painting the sentence that shares its line.

Verified: typecheck, build, 10/10 tests, no out-of-bounds vocabulary in the built
HTML, and every section's content present in the static export.

## Corrections to the commit message

Four sentences in the message above do not survive a check against the diff. The
message is in the git log permanently and cannot be edited, so the corrections are
recorded here instead. Everything else in it was verified and holds.

**1. "Both shadow values are alpha of `--ink`" — true in light mode, false in dark.**

In `:root`, `--shadow` and `--shadow-lift` are built from `rgba(22, 22, 15, …)`, which
is `#16160f`, which is `--ink`. The claim holds there. In the
`prefers-color-scheme: dark` block they are `rgba(0, 0, 0, 0.85)` and
`rgba(0, 0, 0, 0.95)` — **pure black, not alpha of anything in the palette**, while
dark `--ink` is `#edece4`. Only `--inset` (`rgba(237, 236, 228, 0.09)`) is alpha of
dark `--ink`.

**2. "Dark mode carries depth with a 1px top highlight *instead*" — imprecise.**

Dark mode gets the highlight **and** its own redefined, heavier shadow pair. The
"instead" implies the shadows are dropped in dark mode; the diff shows all three
tokens redefined there.

**3. "Only type/space/surface tokens were added" — tokens were also removed and changed.**

`--t-h1: 19px` is **deleted**. `--t-h2` **changes value**, from `15px` to
`clamp(22px, 2.8vw, 33px)`. Three are genuinely new (`--t-lede`, `--t-h3`,
`--t-display`), taking the type scale from five steps to seven. Separately, the
spacing scale gains `--sp-8: 116px` but **its comment still reads "seven steps"** with
eight now defined — the type-scale comment directly above it was updated and this one
was not.

The underlying claim it was making does hold, and is worth stating positively: **none
of the 11 palette colours changed value.** `--paper`, `--paper-2`, `--ink`,
`--ink-soft`, `--mute`, `--blue`, `--red`, `--rule`, `--rule-soft`, `--scrim` and
`--scrim-solid` are byte-identical in both modes; the diff does not touch a line of
either colour block.

**4. "The callout kicker was `--red` in the artifact" — not verifiable from the record.**

`r3-composed.html` is **added by this commit already carrying `--mute`**: line 300
reads `/* --mute, not --red: redline means an honest gap, never a label. */`. If the
`--red` state existed it existed only in the working tree, and no commit captured it.
Nor was there a prior `.kicker` rule in the shipped site — `Loop.module.css` gains the
class here for the first time — so nothing regressed and nothing was repaired in any
tracked file. **Recorded as unverifiable, neither asserted nor denied.**

**A note on the shadow tokens.** `--shadow`, `--shadow-lift`, `--inset` and the
surface treatment they support are introduced by this commit and **removed again in
round 4**. A reader who goes looking for them in a later tree will not find them; that
is expected, and is not evidence this entry is describing the wrong commit. *(Forward
note, supplied by the author — not derived from git, which ends at `d7c630e` as this
entry is written.)*

## Changes in detail

**The largest website commit since the rebuild** — 25 files, 2,016 insertions against
549 deletions. Entry 037 built ADR 0007's direction; this builds it properly, and ends
the last two things on the page a human typed by hand.

### `website/components/lib/counts.ts` (new, 47 lines)

- **The page's five numbers, derived from the repo at build time.** Imports
  `readdirSync` and `readFileSync` from `node:fs`, sets
  `REPO_ROOT = join(process.cwd(), "..")`, and counts: `rules` from the
  `BEGIN skill:[a-z]` markers in `CLAUDE.md`, `decisions` from `docs/decisions/NNNN-*.md`
  **minus one** (`0000` is the reject ledger, excluded in-line), `designDecisions`,
  `commits` from `changelog/commits/NNN-*.md`, and `handoffs`.
- The regex for the protocol blocks requires a lowercase letter after the colon,
  with a comment explaining why: the literal `BEGIN skill:<name>` in CLAUDE.md's own
  documentation example has no real name after it and must not be counted.
- Every filesystem call is wrapped in `try`/`catch` returning `0`, so a missing folder
  degrades to zero rather than failing the build.
- The header states the safety argument: the Node APIs are fine because the module is
  imported only by server components and runs at build time under `output: "export"` —
  *"Importing it from a client component will fail the build, which is the correct
  failure."*
- It also records the drift that caused it: the counts *"were typed by hand until
  2026-08-19 and drifted three times in a single day."* Entry 037 had flagged exactly
  these as the only hardcoded numbers on the page.

### `website/components/lib/content.ts` (new, 123 lines)

- **Every user-facing string in one place** — `NAV`, `HERO`, `MATRIX_COPY`,
  `LOOP_COPY`, `SKILLS_COPY`, `INSTALL_COPY` and `FOOTER`, all `as const`.
- Verified against the tree rather than the message: `Hero.tsx`, `Matrix.tsx`,
  `Skills.tsx`, `Install.tsx`, `Nav.tsx`, `NavLinks.tsx` and `Footer.tsx` each import
  from it. No section component is left holding its own prose.
- The file draws the boundary it must not cross: *"Prose only. Structured, repeated
  content stays in `skills.ts`; counts are derived in `counts.ts` and never written
  here."* Individual entries carry their own constraints — `NAV.links` is annotated
  *"Labels must match the heading each one points at"*, and `HERO.ledeGap` is annotated
  *"Painted in --red: it names the honest gap, which is what the colour means."*
- **The ADR this calls for was not written.** The message says the move *"supersedes
  0023's split — that needs its own ADR now that it is real, not just intended."*
  Checked against the tree at `d7c630e`: `docs/decisions/` still ends at 0023, whose
  `**Status:**` is `Accepted` and whose index row still reads `0` follow-ups. Commit
  `42b8f13` (entry 040) had set this exact condition one commit earlier — *"When the
  prose actually moves, that needs its own ADR superseding this one."* The prose moved
  here; the record has not been written.

### `website/components/Nav.{tsx,module.css}`, `NavLinks.tsx` (new), `FileBar.{tsx,module.css}` (deleted)

- `page.tsx` swaps the `FileBar` import for `Nav` and changes nothing else.
- `Nav.tsx` is a server component: a mark with a `▮` glyph, the repo path, the three
  section links, a source link and an install CTA. Its comment states what the old bar
  was — *"a 12.5px text strip"* — and what round 3's brief asked for.
- **The `:nth-child()` claim checks out.** `467dc5b^:FileBar.module.css` hid
  `a:nth-child(1)` and `a:nth-child(2)` below 720px and `a:nth-child(3)` below 460px,
  under the comment *"Drop the wordiest anchors first."* Reordering the link array
  therefore changed which links vanished on mobile, silently. The new nav drops the
  list as a whole and never the CTA.
- `NavLinks.tsx` is the `"use client"` half, carrying only the active-section marking:
  an `IntersectionObserver` over the three `NAV.links` sections at
  `rootMargin: "-88px 0px -62% 0px"`, tracking a `Set` and picking the first id in
  document order. The links themselves are in the static export, so *"a JS-off reader
  gets working navigation and simply no active state. JS enhances, never reveals."*
- `NavLinks.tsx` is also where the **cut rail** is recorded: *"A round 3 draft carried
  a sticky 01–04 rail doing this job in a left column. It was cut: it read as
  documentation furniture, which is the one association this page is trying not to
  trigger."*

### `website/components/LoopSteps.tsx` (new, 53 lines), `Loop.{tsx,module.css}` (modified)

- The five steps move into a `"use client"` component that marks the active one as it
  passes the middle of the viewport (`rootMargin: "-45% 0px -45% 0px"`), bailing early
  on `prefers-reduced-motion: reduce` and when `IntersectionObserver` is absent. Step
  numbers become zero-padded (`01`–`05`).
- Its header makes the motion argument the spec later adopts: scroll-linked means
  **reader-caused**, so it *"needs no second exception to the motion spec's 'nothing
  moves that the reader did not cause'."* And the constraint it will not break:
  *"Nothing types itself here — that is a hard constraint in
  design/system/language-website.md, and it is what killed the two earlier drafts'
  replay terminals."* Every step is in the static export; JS only marks.
- `Loop.tsx` stops importing `Reveal`, becomes the page's single full-bleed band, and
  its previously hardcoded closing sentence — *"Seven rules … 23 decisions, 7 design
  decisions, 32 documented commits and 3 handoffs"* — now interpolates `COUNTS.rules`,
  `COUNTS.decisions`, `COUNTS.designDecisions`, `COUNTS.commits` and `COUNTS.handoffs`.
- `Loop.module.css` gains the `.kicker` rule at `color: var(--mute)`, with a comment
  citing `design/system/palette.md`: *"--red means hypothesis, failure, the unrecorded
  reason — never decorative, never emphasis."*

### `website/components/Reveal.tsx` (modified, +8/−1)

- One condition widened. `if (e.isIntersecting)` becomes
  `if (e.isIntersecting || scrolledPast)`, where
  `const scrolledPast = e.boundingClientRect.bottom < 0`.
- The comment names all three causes of the bug — *"a hard flick of the wheel, an
  anchor jump, or a programmatic scroll"* — and the failure mode: those elements never
  intersect, so they *"would sit at opacity 0 until the reader happened to scroll back
  up."* The rule it settles: *"Anything now above the viewport has been arrived at;
  show it."*
- Still used by `Matrix.tsx` and `Skills.tsx`; no longer by `Loop.tsx`.

### `website/app/globals.css` (modified, +60)

- **The palette is untouched** (see correction 3). What changes is everything else:
  the type scale goes five steps to seven with `--t-h1` removed and `--t-h2` re-scaled,
  spacing gains `--sp-8`, and layout gains `--shell: 1320px` and `--measure: 68ch`
  alongside the retained `--maxw: 78ch` — three width tokens where there was one.
- New surface tokens `--radius: 5px`, `--shadow`, `--shadow-lift` and `--inset`, under
  a comment stating the rule they are meant to satisfy: *"Contained regions only: the
  page never floats."*
- Bare `h1` and `h2` element rules arrive (display size, `line-height: 1.02`,
  `letter-spacing: -0.035em`, `max-width: 26ch`, `text-wrap: balance`), replacing the
  per-component `.h1`/`.h2` classes.
- Two new layout classes: `.shell` (the page frame) and `.band`, which achieves full
  bleed without leaving the flow via `box-shadow: 0 0 0 100vmax var(--paper-2)` plus
  `clip-path: inset(0 -100vmax)`. The comment says why not the obvious alternative:
  *"A 100vw margin would need the gutter recomputed at every breakpoint."*
- The type-scale comment records a diagnosis worth keeping: `--t-lede` exists because
  14px and 13px had been typed directly into five components, off-scale, **in the very
  round that introduced the scale** — *"A step that is missing gets invented locally."*

### `website/components/Hero.{tsx,module.css}` (modified)

- The headline takes `--t-display` and the full column. The in-file comment records
  both failed intermediates as one lesson: round 2's 19px anchored nothing, and round
  3's first display-size attempt *"boxed it in half the width, which broke it a second
  way — six lines, and it stopped reading as a headline at all."*
- **The specimen quote is verbatim.** Checked `SPECIMENS[0]` against
  `design/decisions/0002-a-three-family-type-system-for-the-site.md` lines 41–50: it
  matches character for character, **including the source's own line wraps**.
- `SpecimenPart` is genuinely new — an `interface { text: string; gap?: boolean }` plus
  an optional `parts?` on the line type — so `*(none identified)*` can be painted
  `--red` while the sentence sharing its physical line is not. `skills.ts` states the
  reason: *"Painting the whole line --red would spend the honest-gap signal on ordinary
  prose, which design/system/palette.md forbids."*
- Worth noting for anyone diffing the two specimens: **the "second honest gap" is a
  different gap than before.** The old one was `*(reason not stated)*` under
  `**Rationale:**`; the new one is `*(not stated)*` under
  `## What would make us revisit`.
- The old `<h2>` *"A record that admits it doesn't know"* and its sub-line are dropped;
  the specimen becomes a card with an `md` chip, a source bar naming the writing skill,
  and a foot.

### `website/components/Footer.{tsx,module.css}` (modified)

- One dim commented line becomes four columns: the mark plus a blurb, then
  `FOOTER.groups` — *The page* and *The record* — then *Elsewhere*, over a retained
  comment-wrapped byline bar.
- The record column links `changelog/`, `decisions/`, `design/decisions/` and
  `handoff/` on `prod-stable`. The comment gives the argument: *"a page that says 'read
  the records' should say where they are."*

### `website/components/Matrix.{tsx,module.css}`, `Skills.{tsx,module.css}`, `Install.{tsx,module.css}` (modified)

- `Matrix` becomes one bordered panel and names its own test as the guard on its
  mobile behaviour: *"The rows are `<li>` and every value stays visible at 390px. Both
  are asserted by tests/matrix-mobile.spec.ts"* — the suite added one commit earlier
  (entry 041).
- `Skills` goes to one lead card, two beside it, and eleven as a two-column index. The
  comment argues the asymmetry: *"Equal thirds is the docs-template shape; an
  asymmetric grid says which skill to read first."* `decisions-logger` leads *"because
  it is the one the page's own argument rests on — the hero specimen is its output."*
  The three featured still cover the three evidence sources rather than being the
  "best" three.
- `Install`'s comment restates what it replaced and why: *"fifteen near-identical rows,
  each already on its own catalogue row, and thirty copy buttons for fourteen commands.
  Fourteen equal options is a paralysis machine; the library has an obvious entry point
  and this says so."*

### `docs/concepts/website/website-revamp/r3-composed.html` (new, 741 lines)

- Round 3's exploration artifact, added to the append-only explorations tier. It
  carries the rail's obituary in a comment at line 128 — *"A sticky 01–04 rail was
  built here and cut"* — and the kicker already at `--mute` (see correction 4).

### `website/components/lib/skills.ts` (modified, +43/−12)

- Adds the `SpecimenPart` interface and the optional `parts?` field, and rewrites
  `SPECIMENS[0]` to the longer ADR 0002 quotation.

## Files changed

```
 docs/concepts/website/website-revamp/r3-composed.html | 741 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 website/app/globals.css                               |  60 +++++++++++-
 website/app/page.tsx                                  |   4 +-
 website/components/FileBar.module.css                 |  53 ----------
 website/components/FileBar.tsx                        |  39 --------
 website/components/Footer.module.css                  |  61 +++++++++++-
 website/components/Footer.tsx                         |  75 ++++++++++++--
 website/components/Hero.module.css                    | 144 +++++++++++++++++----------
 website/components/Hero.tsx                           | 139 ++++++++++++++++----------
 website/components/Install.module.css                 |  75 +++++++-------
 website/components/Install.tsx                        |  81 ++++++++-------
 website/components/Loop.module.css                    |  95 ++++++++++++------
 website/components/Loop.tsx                           |  81 +++++++--------
 website/components/LoopSteps.tsx                      |  53 ++++++++++
 website/components/Matrix.module.css                  | 110 +++++++++++----------
 website/components/Matrix.tsx                         |  91 +++++++++--------
 website/components/Nav.module.css                     |  78 +++++++++++++++
 website/components/Nav.tsx                            |  37 +++++++
 website/components/NavLinks.tsx                       |  56 +++++++++++
 website/components/Reveal.tsx                         |   8 +-
 website/components/Skills.module.css                  | 159 +++++++++++++++++++++---------
 website/components/Skills.tsx                         | 112 +++++++++++++--------
 website/components/lib/content.ts                     | 123 +++++++++++++++++++++++
 website/components/lib/counts.ts                      |  47 +++++++++
 website/components/lib/skills.ts                      |  43 ++++++--
 25 files changed, 2016 insertions(+), 549 deletions(-)
```

---

_Generated by `/changelog-tracker` from `git log -1` and `git show --stat`. Every
fact here comes from git: **faithful, not generative.**_
