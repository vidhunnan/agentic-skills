# 0008. The site's type is Geist Mono alone

- **Status:** **Accepted**
- **Date:** 2026-08-19
- **Supersedes:** [0002](./0002-a-three-family-type-system-for-the-site.md)

## Context

[ADR 0007](./0007-the-site-is-terminal-rendered-markdown.md) chose terminal-rendered
markdown: monospace throughout, hierarchy from case, weight and colour rather than
from size. That made two of the three shipped families unusable — a serif display
face and a sans body face have no role on a page whose whole register is a terminal.
0007 named the cost in its own words: *"Hierarchy now comes from case, weight and
colour on one face."* It did not say **which** face.

The incumbent was [ADR 0002](./0002-a-three-family-type-system-for-the-site.md) —
Newsreader, Archivo and IBM Plex Mono — the ADR whose rationale reads
`*(reason not stated)*`. Its mono was already loaded, already paid for, and already
carrying every code fragment and label on the site.

The exploration artifacts that won the direction used **no webfont at all**. Both
`a-marked-output.html` (round 1) and `r2-terminal-markdown.html` (round 2) set
`--mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace`. So
the direction was seen, judged and approved wearing a system stack, and the type
decision was still open when the port to Next.js started.

The language doc left this open on purpose: *"Deliberately unconstrained: typeface
strategy, type scale, spacing scale, layout structure… Those are direction, and the
exploration owns them."*

## Options considered

| Option | The bet | Why it lost |
|---|---|---|
| IBM Plex Mono alone *(the incumbent, from [0002](./0002-a-three-family-type-system-for-the-site.md))* | It is already on the page. Dropping the other two families is the whole change; nothing else moves, and the mono the site has always used keeps setting the code | **`*(reason not stated)*`.** Nothing in the commit, the changelog entry, the exploration rounds, the brief or the language doc records why the incumbent was dropped. The one difference on record is mechanical: Geist Mono ships as a variable font, so its full weight range is a single file |
| A zero-webfont system stack — what both exploration artifacts shipped | No font request at all: the fastest possible page, and the most literal reading of *"what the reader's terminal looks like."* It is also the type the approved rounds were judged in | **`*(reason not stated)*`.** No source records this being weighed against a webfont |
| **Geist Mono alone — chosen** | One variable family carries the entire page. With hierarchy coming from weight, case and colour rather than size, a single face has to cover what three used to, and a variable one can | — |

## Decision

The site loads **one family: Geist Mono**, via `next/font/google` with no `weight`
array, because it is a variable font — the whole weight range in a single file.
Newsreader, Archivo and IBM Plex Mono are gone. **39 woff2 files and 608KB become 6
files and 68KB.** There is no italic anywhere on the site: Geist Mono has none, and
nothing in this design uses one. The three CSS variables `--serif`, `--sans` and
`--mono` collapse to one `--mono` whose fallback stack stays monospace, so a font
failure degrades to the right register rather than to a serif.

## What we gave up

- **Italic, entirely.** Geist Mono has no italic face, so emphasis-by-slant is off
  the table for good. Markdown's own `*…*` is rendered as recessive syntax rather
  than as a slant, which makes this consistent rather than merely absent — but it is
  a whole typographic axis the page can no longer use.
- **The zero-webfont page.** 68KB is small, and it is not nothing on a static export
  whose entire argument is restraint. Rounds 1 and 2 proved the direction reads
  correctly with no webfont at all; the site now depends on a font load it was
  demonstrated not to need.
- **A second unargued typeface decision in a row.** [0002](./0002-a-three-family-type-system-for-the-site.md)
  chose three families and never said why. This supersedes it and does not say why
  either — what Geist Mono *is* is recorded; why it beat the two named alternatives
  is not. The next person changing the type will find the same gap twice.
- **Latin only.** `subsets: ["latin"]`. Anything outside it falls through to the
  system stack mid-page, which the three-family system would also have done — but
  with one face there is nowhere else for it to go.

## What would make us revisit

- **Monospace body text proves unreadable at real reading lengths.** This is
  [0007](./0007-the-site-is-terminal-rendered-markdown.md)'s own revisit condition,
  and this ADR is where it gets paid: if long-form prose does not hold, a companion
  face has to take running text and the single-family system is what changes.
- **The page needs something Geist Mono cannot set** — an italic, a script outside
  the Latin subset, or a weight range the variable axis does not cover. With one
  family there is no fallback inside the system.
- **A cold reader calls it a developer docs site** — 0007's third condition. If the
  answer to it is typographic, this is the decision that has to move.

## Evidence

- **Primary:** `git:fcea6dd` (2026-08-19), the commit message's own §Type paragraph:
  > *"Type: Geist Mono alone, and it turned out to be a variable font, so the whole
  > weight range is one file. 39 woff2 files and 608KB become 6 files and 68KB.
  > Newsreader and Archivo are gone. Geist Mono has no italic; nothing in this design
  > uses one."*
- **Corroborating:** `website/app/layout.tsx`, whose in-file comment names this ADR —
  *"Chosen over IBM Plex Mono and a zero-webfont system stack — see design ADR 0008"* ·
  [`changelog/commits/037-rebuild-in-terminal-rendered-markdown.md`](../../changelog/commits/037-rebuild-in-terminal-rendered-markdown.md)
  §`layout.tsx` · `docs/concepts/website/website-revamp/a-marked-output.html` and
  `r2-terminal-markdown.html`, which supply the system-stack alternative ·
  [`../system/language-website.md`](../system/language-website.md) §Hard constraints,
  which left type deliberately unconstrained · [0007](./0007-the-site-is-terminal-rendered-markdown.md)
  §What we gave up.
- **Rationale:** **partly recorded.** What Geist Mono *is* — variable, one file, no
  italic — is stated in the commit. **Why it beat IBM Plex Mono or the system stack
  is `*(reason not stated)*`:** the code comment asserts a comparison that no source
  records having been made.

## Follow-up

*Append-only. Everything above is **frozen**. Entries below are dated and additive.*

*(none yet)*

---

_**Exactly two things in this file may ever change:** the `**Status:**` line and
additions under `## Follow-up`. If this turns out to be wrong, do not edit it —
supersede it with a new decision that links back._
