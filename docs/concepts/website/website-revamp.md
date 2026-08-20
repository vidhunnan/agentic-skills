# Exploration — The website revamp

Status: active · Started: 2026-08-19

> Append-only. Rounds below are frozen; new rounds go at the bottom. **A killed
> direction is never deleted** — that record is the point of this file.

## Round 1 — Three structural directions, at a fifth of the content

**Date:** 2026-08-19
**Testing:** given a page whose content is records — paths, dated entries, numbered
decisions, trust labels and gaps — what **structural idea** should carry it? Not the
palette (inherited entire) and not the typeface, but what the page is shaped like.
**Links:** [`website-revamp/index.html`](./website-revamp/index.html) ·
[`website-revamp/directions.md`](./website-revamp/directions.md) · `git:3333f33`

### What changed

The first round of the revamp, and the first generation permitted under
[ADR 0022](../../decisions/0022-generation-is-allowed-only-into-explorations.md).
Generated against [`design/system/language-website.md`](../../../design/system/language-website.md),
written an hour earlier and deliberately carrying **constraints only, no direction**,
so the round was not pre-decided.

Three directions on three distinct axes, none of them colour:

- **A — Marked Output** *(type contrast)*. One face, three sizes. Hierarchy from case,
  weight and colour; the redline the only visual event.
- **B — Running Log** *(layout structure)*. Numbered, dated entries down a gutter
  instead of titled sections. Append-only drawn rather than described — one entry is a
  superseded direction, struck and still present.
- **C — Accession** *(density)*. A provenance rail on every object; the specimen's
  rail ends in `Rationale — provenance unknown`.

The shipped site was carried as an unlettered baseline column so the three read as
departures rather than as a fresh start.

### What we learned

**The comps were too thin to test what they were scoped to test.** They carried 3 of
14 skills, 1 of 6 specimens, 0 receipts, no nav and no footer — roughly a fifth of the
page, ~6.5KB against the real page's ~104KB.

That has a consequence the round has to own: **thin comps can only communicate
register.** Strip out density, rhythm and how a long page behaves, and the only
variable left is typographic voice. So the round tested *one* variable when it was
scoped to test three, and the feedback it produced was a register verdict —
*"the html feels more of POC"* and *"the content of the website feels empty."*

**B's and C's stated axes were therefore never genuinely exercised.** Layout structure
and density are both properties of a long, dense page. Neither direction got one.

What did come through, and is the round's real finding: **the markdown / skill-file
register is the one that pulled.** The page reading like the files it is about — the
same material as the `.md` records the library produces — was legible even at a fifth
of the content.

### Verdict

**A — Marked Output · Kept.** The owner's reason, recorded verbatim rather than
tidied:

> *"this direction feels more skill styles and markdown styles and which represent all
> the context or how all files stores also"*

Narrowed in the same breath to **terminal-rendered markdown** — what Claude Code
itself shows: monospace, box-drawing rules, markdown syntax present but recessive.

**B — Running Log · Killed.** Lost on register. **Its stated axis was never tested** —
see above — so this is a verdict on voice, not on whether a dated, numbered sequence
is the right structure. Its numbered gutter survives as a merge candidate and is
recorded in `directions.md` as one.

**C — Accession · Killed.** Same caveat, same reason. Its provenance rail survives as
a merge candidate, scoped to specimens rather than applied whole.

---

## Round 2 — The same register, at full content

**Date:** 2026-08-19
**Testing:** round 1 could only test register, because its comps carried a fifth of
the page. So: **does terminal-rendered markdown survive a full page?** Density,
rhythm, and a fourteen-row catalogue are exactly what a thin comp cannot show, and
they are where a monospace register is most likely to fail.
**Links:** [`website-revamp/r2-terminal-markdown.html`](./website-revamp/r2-terminal-markdown.html) · `git:5e1d1ca`

### What changed

One direction, not three — the fork closed in round 1, so this is not a comparison.
Built to the scope round 1 lacked: all 14 skills, all 9 matrix rows, six sections,
nav and footer. 19KB against round 1's ~6.5KB.

The direction was made concrete for the first time. **Markdown syntax is present but
recessive** — `##` before a heading, `**` around bold, the pipes in a table, the
fence ticks around a code block, all rendered in `--mute` rather than hidden.

Two sections were authored that exist nowhere else:

- **The worked loop** — `decisions-logger` from "you decided something" through
  reading the evidence, asking what it cannot find, writing the record, registering
  the rule, and offering again next session unasked. Step 4 named as the one nothing
  else does. The shipped site has never shown the mechanism working.
- **Install as a sequence** rather than a menu of fourteen equal commands.

### What we learned

**The register held.** The failure mode a monospace page is most exposed to — a long
catalogue turning into an undifferentiated wall — did not appear at fourteen rows,
because the compact index carries most of them at one line each and only three are
shown in full.

**Recessive syntax turned out to be the strongest reading of a constraint we already
had.** The language doc requires records to be *"shown verbatim, never restyled."*
Showing `##` and `*(reason not stated)*` dimmed rather than hidden **is** verbatim;
rendering them into styled components would not be. The direction and the constraint
turned out to be the same idea, which was not obvious when either was written.

**One craft variable is unresolved and is the main risk:** how dim *recessive* should
be. It is the line between *this is the file* and *this is a costume*, and it was set
by eye in a single pass.

### Verdict

**Kept** — approved for build on 2026-08-19.

Round 2's question was whether the register survives full page length; it was approved
at full content, which answers that question. **No reason beyond round 1's was
separately articulated, and none is invented here** — round 1's stated reason carries.

---

## What this round cost, and what it bought

Round 1 spent a generation cycle to learn something it could not have learned by
argument: that the register was the answer and the structure was not yet the question.
It also produced a reusable finding about the method — **an exploration built at a
fifth of the content tests register and nothing else**, and should be scoped to that
honestly rather than claiming three axes it cannot exercise.

Two directions were killed on a variable they were not built to be judged on. That is
recorded here rather than smoothed over, because in six months the artifacts will
still be on disk and the temptation will be to assume they lost on their merits.

---

## Round 3 — Chrome, scale, composition, surface

**Date:** 2026-08-19
**Testing:** rounds 1 and 2 settled the register and proved it survives full page
length. Neither tested whether the direction can carry **a real site** — chrome that
does a job, a headline that anchors, a composition with a hierarchy in it, and a
surface treatment. So: **is terminal-rendered markdown a look, or is it a site?**
**Links:** [`website-revamp/r3-composed.html`](./website-revamp/r3-composed.html) ·
`git:467dc5b`

### What changed

Four variables, all of them ones round 2 had not been built to exercise.

**Scale.** The headline goes to `clamp(36px, 6.2vw, 68px)` and takes the full column.
Round 2 had shipped an `h1` of **19px on a page where nothing else exceeded it**, so
nothing anchored — the direction was right and the craft was not.

**Chrome.** A real nav — a mark, an install CTA, active-section marking — replaces the
12.5px text strip. The footer goes from one dim commented line to four columns, one of
which links the record tiers the page argues for.

**Composition.** The catalogue becomes one lead card, two beside it and eleven as a
two-column index, on the argument that *"equal thirds is the docs-template shape; an
asymmetric grid says which skill to read first."*

**Surface.** Contained regions get 5px corners and a shadow pair while the page itself
stays flat.

**And a sticky 01–04 rail in a left column**, carrying the active-section marker.

### What we learned

**A display headline needs the width, not just the size.** Two intermediate attempts
failed the same way and are recorded rather than smoothed over: 66px boxed into half
the width wrapped to six lines, and 54px inside a sidebar column did it again. Size
without column width does not produce a headline; it produces a paragraph in large
type.

**A missing step in a type scale gets invented locally.** 14px and 13px had been typed
directly into five components, off-scale, **in the very round that introduced the
scale**. The scale went from five steps to seven.

**The page had two things left on it that a human typed by hand**, and both had already
gone wrong. The counts drifted three times in a single day (32 → 37 → 39 documented
commits), and around fifty user-facing strings were literals in components while an ADR
claimed content was data-driven from one source. Both were ended here — counts derived
from the repo at build, prose moved to one module.

**The most useful finding is the one that cost a build.** See the verdict.

### Verdict

**Kept**, and shipped as the built site — scale, chrome, composition and the derived
counts all carried into `467dc5b`.

**The sticky 01–04 rail · Killed.** Built, screenshotted, and cut before it shipped.
Two reasons, both stated at the time and both recorded in the code that replaced it:

1. **It read as documentation furniture** — which is *"the one association this page is
   trying not to trigger,"* and is named as an anti-reference in
   [`design/system/language-website.md`](../../../design/system/language-website.md).
2. **Its width was what the headline needed.** The commit message puts it at **246px**;
   the artifact comment says only *"the width it took is what the headline needed."*
   *(The 246px figure is stated in `git:467dc5b`'s message and nowhere else — the rail
   was never committed, so it cannot be measured from a diff.)*

*"Two problems, one deletion."* The nav absorbed the active-section marking, which was
the rail's only real job.

**The obituary is carried in three places on purpose** — `NavLinks.tsx`, the round 3
artifact at line 128, and `design/specs/motion.md`, which had promised the rail in a
`## Not yet built` section. The spec states the rule that made keeping the note
mandatory: *"a spec that quietly drops what it promised is how a reader stops trusting
it."*

**The surface treatment · Killed one round later.** The 5px corners survived; the
shadow pair and the dark-mode inset highlight did not. See round 4.

---

## Round 4 — Flatten it, and take the syntax out of the chrome

**Date:** 2026-08-19
**Testing:** the first round driven by **looking at the built round 3** rather than by
a brief. Six pieces of feedback, all craft. The question underneath them: which parts
of the direction are load-bearing, and which are costume?
**Links:** `git:218c91d` *(no exploration artifact — this round was built directly)*

### What changed

**The surface goes flat.** Eight `box-shadow` declarations and three tokens
(`--shadow`, `--shadow-lift`, `--inset`) deleted from both colour-scheme blocks. The
corner radius stays.

**Markdown markers leave the chrome and stay in the records.** `#` off the h1, `##` off
four h2s, `>` off three notes, `<!-- -->` off the eyebrow and the footer. Every marker
inside the hero specimen stays.

**The hero gets a CTA.** The ```` ```sh ```` fence read as a sketch of a terminal and
gave the fold nothing to press; the command becomes the button.

**The specimen becomes a window** — three dots, the path as title bar, both
`aria-hidden` and non-focusable.

**The catalogue becomes fourteen closed rows.** Round 3's one-lead-card / two-beside /
eleven-index arrangement read as congested — *"two shapes doing the same job, and the
cards were tall enough that three of them filled a screen."* `<details>`/`<summary>`,
not a JS disclosure.

**Install becomes a stepper** — stacked and control-free before mount, one step at a
time after.

### What we learned

**The syntax constraint had been over-applied, and the page was already inconsistent
about it.** Design ADR 0007's verbatim argument cites `##` and `*(reason not stated)*`
— **both are lines in the hero specimen, not page chrome.** The rule was always scoped
to records; the chrome had been wearing it decoratively. The tell was there the whole
time and nobody had noticed: **the footer's own h3s never carried `###`.**

The corrected rule now lives in `globals.css` rather than only in a commit message:
*"`## The skills` is not a record; it is a website heading wearing a costume."*

**Depth was doing no work.** The border and the `--paper`/`--paper-2` step were already
carrying containment, *"and least of all in light mode."* A surface decision was made
and reversed inside the same working session.

**One shape scales; two shapes do not.** At the thirty-two skills on the roadmap, the
flat list is thirty-two rows — the round 3 arrangement is eleven screens.

### Verdict

**Kept.** All six changes shipped.

**The round 3 shadow pair · Killed**, seventeen minutes after it was committed. The
replacement comment forbids the obvious undo rather than leaving the door open: *"If a
region stops reading as contained, strengthen its border to `--rule`. Do not
reintroduce a shadow."*

**The lead card · Killed, with the cost written into the file.** The flat list gives up
the "start with this one" signal — `decisions-logger` is merely first now. `Skills.tsx`
records the trade against the library's own earlier words: *"Install.tsx's own comment
calls a flat menu of equals 'a paralysis machine' — this is one, mitigated only by
ordering."*

**Markdown markers in page chrome · Killed.** Retained inside records, permanently and
by rule.

**What would make us revisit the flat catalogue:** the roadmap's thirty-two skills
arriving without a grouping mechanism, or evidence that readers do not know which skill
to open first. Neither is currently observed. *(No revisit condition was stated at the
time; this one is written here as a reading of the recorded trade-off, not as something
the round declared.)*

---

## Round 5 — Truthful tags, real downloads, and two retirements reopened

**Date:** 2026-08-19 – 2026-08-20
**Testing:** rounds 3 and 4 were craft. This round asks a different question:
**what is the page still claiming that it cannot back, and what can it not yet do?**
Three of its changes add capability rather than adjust craft, and two of those reopen
decisions that were logged as closed.
**Links:** `git:10b64af` · `git:3ddee88` · then the Figma-driven refinements
`git:c36625c` `git:714e0ea` `git:edf8025` `git:b9dd1a3`, and the specimen work
`git:9373c37` `git:fdc98f2` `git:1c7f754` `git:b014643` `git:6997e28` `git:5952626`

### What changed

**The tags stop lying.** Every catalogue row had printed `Code · Chat` and struck the
second through when absent, putting the same two words on all fourteen rows. Now a row
shows only the surfaces it has — **11 Code + Chat, 3 Code-only**.

**Downloads, for the eleven Chat-capable skills only.** A prebuild step zips each skill
folder. A Code-only skill gets no zip, because one uploaded to Claude.ai *"would not do
what its description says, and offering it would be a claim the page cannot back."*

**The catalogue becomes filterable, and the installer cycles all fourteen.**

**Four Figma-driven refinements** — the filter moves into the section header, the tags
become pills, the open row's command becomes the pressable block, and only one row
opens at a time.

**And the hero becomes a stepped carousel of ten records**, each generated from its file
by line range, in a fixed 426px frame — then, finally, **advancing on a timer** with a
2px progress line.

### What we learned

**A struck-through tag is decoration pretending to be data.** The absence of a tag is
the information; printing both words on every row turned a column into ornament.

**The design file and the code had barely drifted.** Built against the Figma spec, most
of it *already matched* — the 1320px section, the 116px padding, the 33px heading, the
hairlines, the 34px rows, even the hint's 449px cap, which is the `68ch` measure already
in `globals.css`. The refinements were four deltas against a page that had converged on
the spec on its own.

**A design file is a mutable surface with no version history a reader can see.** One
node still drew the pre-pill tags because it predated the pill change by one commit. The
resolution — take the node's copy control, decline its tags, and **write down that the
file contains both** — is the reusable method: a code change built from a node has to
record what it refused, or the next reconciliation reintroduces the older shape.

**The page's load-bearing claim had never been checked.** A test that resolves the
source file from the specimen's own `href` found that **five of the six stored specimens
were not verbatim** — the worst *"stitched fragments from two non-adjacent rows of a
Markdown table into what read as one continuous passage."* None had ever rendered, so
nothing false reached a reader. They were sitting in the array from the round 2 rebuild
onward, waiting for the change that displayed them. **Every specimen is generated from
its file by line range now, not transcribed.**

**Filtering is binary where ranking was forgiving.** The restored search ranker had let a
stray subsequence hit sit harmlessly at the bottom of a sorted list; as a filter it
returned twelve rows for `chat`, because `changelog-tracker` contains c-h-a-t in order.
*"Ranking hid that; filtering exposed it."*

**A guard scoped to words is blind to layout, by construction.** The specimen test
normalises whitespace on purpose — *"words and markers must match, where the lines break
must not"* — and two real defects (a reflowed `git show --stat` diffstat, a doubled
list-continuation indent) were found **by looking**, not by the suite, which passed
either way.

### Verdict

**Kept.** All of it shipped.

**Design ADR 0009's retirement of search · Reopened.** *"Neither of 0009's own revisit
conditions fired: the catalogue is fourteen rows, not the ~30 it named, and nobody asked
for record search."* **It is back because the owner asked for it.** The commit states
the obligation this creates — *"the ADR should say exactly that"* — and **that ADR was
not written at the time.** Through `git:7699f59` the design decision log still ends at
0011.

**Design ADR 0010's "one specimen" · Superseded in practice, unrecorded.** The hero now
carries ten. The scope of the supersession is argued correctly in the commit message —
0010 killed a **timer-driven** rotation, and stepping moves only on a reader's press —
but no ADR records it.

**The motion exception ADR 0010 closed · Re-granted, on weaker grounds, and the spec
says so.** The timer reinstates auto-advance. ADR 0006's three-part bar is **not**
reused, because one leg no longer holds: *"the arrows reach all ten without motion."*
The timer is justified on discovery instead — *"and that is a weaker claim, written here
as one."* The dwell is inherited (6500ms, byte-identical to the retired rotation) rather
than re-picked, and it *"was never tested on a reader"* then or now.

**The pause control · Killed, at the owner's request, with the consequence on the
record.** *(No reason was stated beyond the request itself.)* The component and the
motion spec both state plainly that **WCAG 2.2 SC 2.2.2 applies again and the page does
not satisfy it**, that this was *"raised and decided rather than missed"*, and that
reinstating the control *"is one button if the trade is ever revisited."* That is the
revisit condition.

**The catalogue's `14 skills` / `7 of 14` counter · Killed**, per the Figma spec. The
cost is named rather than shipped silently: it was the only feedback that the filter had
done anything, so *"a query matching nothing now shows an empty list under the heading
with nothing explaining why."* **Revisit if a miss reads as a broken page.**

**The reserved-caption fix · Kept, but its reason retired inside the same round.**
`git:b014643` reserved three caption lines to stop the arrows moving; `git:6997e28`
then top-aligned them, which made their position independent of caption length. The
reserved height stays; *"the reserved caption height is now about keeping the section
stable, not the arrows."* A constraint outliving its justification is recorded here
because that is how a rule becomes folklore.

---

## What rounds 3–5 cost, and what they bought

Rounds 1 and 2 settled a direction. Rounds 3 to 5 discovered that **the expensive
mistakes were never in the direction** — they were in what the page claimed.

The rail, the shadows, the lead card and the counter were all killed for stated reasons
inside a day, and none of them was a direction failure. The findings that outlast the
round are all about honesty of claim: counts a human typed had drifted three times in a
day; a syntax rule scoped to records had spread to chrome; a surface tag printed the
same two words on fourteen rows; and **five of six specimens quoting "a real file in this
repo" were not verbatim, in the one place the page cannot afford to be wrong.**

Three decisions were reopened or superseded in these rounds and, **as of `git:7699f59`,
none of them had an ADR**: search's return, the ten specimens, and the re-granted motion
exception. Each was asserted in a commit message and recorded in no decision log. That
is the standing debt these rounds ended on, and it is written here rather than left for
a reader to discover from a diff — the decisions tier is where its resolution belongs,
not this file.
