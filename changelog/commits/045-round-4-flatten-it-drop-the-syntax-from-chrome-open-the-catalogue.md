# feat(website): round 4 — flatten it, drop the syntax from chrome, open the catalogue

- **Commit:** `218c91d75fb3dc4ad2d4667c1a3fe1e280d5091a` (`218c91d`)
- **Author:** Vidhunnan Murugan
- **Date:** 2026-08-19

## Commit message

Six pieces of feedback on the built round 3, all craft.

Shadows out, everywhere. Eight box-shadow declarations and three tokens gone; the
border and the --paper/--paper-2 step were already doing the work, and least of all
in light mode. This reverses a call made the same day, four hours earlier — the
comment in globals.css says so, and says to strengthen a border rather than bring a
shadow back.

Markdown markers leave the chrome and stay in the records. `#` on the h1, `##` on
four h2s, `>` on three notes, `<!-- -->` on the eyebrow and the footer. What stays:
every marker inside the hero specimen, because that text is quoted from
design/decisions/0002 and "records are shown verbatim" is scoped to records. Design
ADR 0007's verbatim argument cites `##` and `*(reason not stated)*` — both are lines
in the specimen, not page chrome. Worth noting the convention was already
inconsistent: the footer's h3s never carried `###`.

The hero has a CTA. The ```sh fence read as a sketch of a terminal and gave the fold
nothing to press; now the command IS the button. CopyButton gained a variant rather
than a fork, and its aria-label is untouched because two specs select on it.

The specimen is a window. Three dots, the path as title bar. They are aria-hidden
and non-focusable: a close control that closes nothing is a lie to a keyboard user,
and this repo already established that rule — the deleted Nav rendered its palette
trigger only after mount so it would not ship a dead button.

The catalogue is fourteen rows, all closed, each opening to its description and its
command. <details>/<summary>, not a JS disclosure — keyboard accessible for free and
working with JS off, so no dead control ships. First pass boxed and ruled it into
columns and read as a spreadsheet; this is one hairline between entries, the
description visible and clamped to two lines when closed, released when open.

WHAT THE CATALOGUE GIVES UP: the lead card and the "start with this one" signal.
decisions-logger is merely first now. Install.tsx's own comment calls a flat menu of
equals "a paralysis machine" — this is one, mitigated only by ordering.

Install steps. Before mount, and therefore in the static export, every step is
stacked and there are no controls; after mount the controls appear and the steps go
one at a time, inactive ones inert but keeping their box so the panel never resizes.
That is the same pattern the deleted Specimens used. It means the stepper needs no
exception to "JS may enhance, never reveal" — the interaction is additive, and
nothing is hidden that cannot be reached.

Tests: 10/10. Selectors gained includeHidden and allTextContents, because collapsed
and non-current content legitimately leaves the accessibility tree — every assertion
is unchanged. ONE assertion did change, and it is flagged in the spec: repo-setup is
now allowed to appear twice, once in the catalogue and once as the named entry point
in the install sequence. The defect that test guards was fourteen commands printed
twice; that is still guarded, and a third exception would mean duplication is back.

Verified: typecheck, build, 10/10, no out-of-bounds vocabulary in the built HTML,
all fourteen rows and all nine matrix rows in the static export, and zero stepper
controls in the pre-mount markup.

## Corrections to the commit message

One sentence does not survive a check against git. Everything else in the message was
verified against the diff and holds — the eight `box-shadow` declarations, the three
tokens (in both colour-scheme blocks), the marker counts, and the footer's `h3`s.

**1. "This reverses a call made the same day, four hours earlier" — the same day, yes;
four hours, no.**

The shadow tokens were introduced by `467dc5b` (entry 042), committed
**2026-08-19 18:52:39 +0530**. This commit is **2026-08-19 19:09:42 +0530**. That is
**seventeen minutes**, not four hours. The `globals.css` comment the message cites as
its own source says only *"Round 3 added a shadow pair and a dark-mode inset
highlight; they were removed the same day"* — it never states an interval, so the
four-hour figure appears nowhere but in the message. The point the sentence was making
holds and is stronger at the true number: a surface decision was made and reversed
inside the same working session.

## Changes in detail

**18 files, 469 insertions against 329 deletions.** Round 3 built the direction
properly; this is the first round driven by looking at the built result rather than by
a brief, and every change in it is craft.

### `website/app/globals.css` (modified, +36/−?)

- **The surface treatment introduced one commit earlier is removed.** `--shadow`,
  `--shadow-lift` and `--inset` are deleted from **both** `:root` and the
  `prefers-color-scheme: dark` block — six declarations — and eight `box-shadow`
  declarations go with them across the component stylesheets. `--radius` stays.
- The replacement comment states the reversal and forbids the obvious undo: *"Depth
  was doing no work that the border and the `--paper`/`--paper-2` step were not
  already doing, and least of all in light mode. If a region stops reading as
  contained, strengthen its border to `--rule`. Do not reintroduce a shadow."*
- **The syntax layer is rescoped in writing**, not just in markup. Its comment now
  reads *"for RECORD CONTENT ONLY"* and draws the line the commit acts on: *"`## The
  skills` is not a record; it is a website heading wearing a costume, and the
  constraint above never applied to it — note that the footer's own h3s never carried
  `###` either."* The inconsistency the message flags is therefore recorded in the
  stylesheet, not only in the log.

### Markdown markers leave the chrome — verified count

Every removal in the message is present in the diff, and there are no others:

| Marker | Where | Count |
|---|---|---|
| `# ` | the hero `h1` | 1 |
| `## ` | four `h2`s | 4 |
| `&gt; ` | three notes | 3 |
| `<!-- -->` | the hero eyebrow and the footer byline | 2 |

Nothing inside the hero specimen is touched.

### `website/components/CopyButton.{tsx,module.css}` (modified, +65)

- Gains a `variant` rather than a fork. `Hero.tsx` drops the ```` ```sh ```` fence,
  the tick rows and the bare `<code>` and passes `variant="primary"` instead — the
  command becomes the pressable thing.
- The `aria-label` is unchanged, which the message gives the reason for: two specs
  select on it.

### `website/components/Hero.{tsx,module.css}` (modified)

- The specimen card gains window chrome: three `<i/>` dots and the source path as a
  title bar, replacing the `md` chip and the `— {spec.by}` suffix.
- The dots ship with a comment stating the rule rather than the styling: *"a close
  button that closes nothing is a lie to a keyboard user, and this repo already has a
  rule against shipping controls that do nothing (the deleted Nav only rendered its
  palette trigger after mount, for that reason)."* They are `aria-hidden` and
  non-focusable.

### `website/components/Skills.{tsx,module.css}` (modified, −168 net on the CSS)

- Round 3's one-lead-card / two-beside / eleven-index arrangement collapses to
  **fourteen `<details>` rows**, `decisions-logger` first by an explicit `ORDERED`
  array. `Skills.module.css` loses 168 lines net — the largest single deletion in the
  commit.
- Its comment argues the scale case: *"One shape scales: at the thirty-two on the
  roadmap this is thirty-two rows, not eleven screens."* And the accessibility case
  for native disclosure over a JS toggle.
- **It also records what it costs**, unprompted and in the file: *"WHAT THIS GIVES
  UP: the lead card, and with it the 'start with this one' signal … Install.tsx's own
  comment calls a flat menu 'a paralysis machine'; this is one, mitigated only by
  ordering."* The message's claim that the trade-off is written down is accurate.

### `website/components/InstallSteps.tsx` (new, 91 lines), `Install.tsx` (modified, −34)

- The three-step sequence moves into a `"use client"` component. `ready` flips on
  mount; before that every step renders stacked with no controls, which is what lands
  in the static export.
- Its header cites the precedent by quotation: the deleted `Nav` rendered its palette
  trigger only after mount *"because 'shipping this button in the static HTML would
  put a dead control on the page for anyone without it'."* The conclusion it draws is
  the one the message states: *"That keeps 'JS may enhance, never reveal' intact
  rather than spending an exception on it."*
- Inactive steps keep their box so the panel does not resize — *"the way the deleted
  Specimens did."*
- `Install.tsx` shrinks to a wrapper. Its long comment is trimmed: the *"Fourteen
  equal options is a paralysis machine"* sentence is **removed from `Install.tsx`**
  in this commit — but the argument survives, because `Skills.tsx` now quotes it
  while applying it to itself.

### `website/tests/home.spec.ts` (+39/−4), `skills-catalog.spec.ts` (+10/−1)

- Selectors gain `includeHidden` and `allTextContents` so collapsed `<details>` and
  non-current steps are still readable by the suite.
- **One assertion changed**, and the message flags it rather than burying it:
  `repo-setup` may now appear twice page-wide — once in the catalogue, once as the
  named entry point in the install sequence. The guarded defect (fourteen commands
  printed twice) is unaffected.

## Files changed

```
 website/app/globals.css                  |  36 ++++++++++++++-----------
 website/components/CopyButton.module.css |  39 +++++++++++++++++++++++++++
 website/components/CopyButton.tsx        |  26 ++++++++++++++++--
 website/components/Footer.tsx            |   2 --
 website/components/Hero.module.css       |  48 ++++++++++++---------------------
 website/components/Hero.tsx              |  32 +++++++++++-----------
 website/components/Install.module.css    |  76 +++++++++++++++++++++++++++++++++++++++++-----------
 website/components/Install.tsx           |  37 +++-----------------------
 website/components/InstallSteps.tsx      |  91 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 website/components/Loop.module.css       |   1 -
 website/components/Loop.tsx              |   6 +----
 website/components/Matrix.module.css     |   1 -
 website/components/Matrix.tsx            |   6 +----
 website/components/Nav.module.css        |   1 -
 website/components/Skills.module.css     | 220 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++----------------------------------------------------------------------------------
 website/components/Skills.tsx            | 122 ++++++++++++++++++++++++++++++++----------------------------------------------------
 website/tests/home.spec.ts               |  43 ++++++++++++++++++++++++++----
 website/tests/skills-catalog.spec.ts     |  11 +++++++-
 18 files changed, 469 insertions(+), 329 deletions(-)
```

---

_Generated by `/changelog-tracker` from `git log -1` and `git show --stat`. Every
fact here comes from git: **faithful, not generative.**_
