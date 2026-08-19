# Design language — The website

Status: active · Date: 2026-08-19

> **This doc states constraints, not a direction.** It exists so
> [`/design-explore`](../../skills/design-explore/SKILL.md) has a stated visual intent
> to generate against — the gate in
> [ADR 0022](../../docs/decisions/0022-generation-is-allowed-only-into-explorations.md).
> Every rule below must hold in *any* direction. **The type strategy is deliberately
> absent**: it is what the exploration decides, and writing it here would make two of
> the three directions strawmen.

## The surface

The landing page at `agentic-skills.vidhunnan.design` — a plugin marketplace for a
CLI tool, whose content is records: file paths, dated entries, numbered decisions,
trust labels, and gaps.

**Brand posture:** **adjacent.** Same world as Claude Code, clearly not official. It
should read as belonging in that ecosystem without impersonating it — a third-party
library that plugs in, not an Anthropic property. Concretely: it may share the warm
ground; it keeps its own signal colours.

## References

**Pulling from:**
- **Claude Code itself** — the thing this plugs into. A marketplace for a CLI tool
  looking like where it runs is a reason, not a preference.
- **Machine output with a human mark on it** — a diff, a code review, a marked-up
  printout. The pattern, not any one product: the base layer is produced, the
  annotation layer is where a person was.

**Explicitly not:**
- **The Field Report talk deck** (`docs/concepts/website/writing-for-machines-v8-present.html`)
  — masthead bands, folio numbers, FIG. plates, tilted TRUTH/HYPOTHESIS stamps. ADR
  0017 already declined a faithful port; this makes the divergence deliberate rather
  than incidental. It also moots design ADR 0003's revisit condition, which worried
  about the deck and the site diverging.
- **The Swiss-minimal portfolio site** — which is what this site currently is. Naming
  the status quo as the anti-reference is the point: it is one of the two directions
  this page would drift into without effort, and the other is the deck.

## The first two seconds

**plain · warm · working**

*Working* as in a working document — in use, not precious, not finished. It is the
word that defends the first failure condition below: a gimmick is finished; a working
document isn't.

## Hard constraints

Rules a direction can be caught breaking. Anything unfalsifiable was left out.

| Rule | Value | Why it's load-bearing |
|---|---|---|
| Records are shown verbatim | The site may **colour and position** a record. It may not restyle one. No badge, pill or icon may stand in for a mark such as `*(reason not stated)*` | The artifacts' entire value is that they are real. A styled excerpt is the first failure condition, arriving by the front door |
| A shown record carries its path | Every specimen names the file it came from, and links to it | A quotation with no source is the same as an invented one to anyone who cannot check it |
| Nothing types itself | No replay, no typewriter, no simulated terminal session | Fails all three of [design ADR 0006](../decisions/0006-the-hero-specimen-rotates-through-six-skills.md)'s tests, and it is what killed the earlier drafts' console demos |
| Redline keeps its meaning | `--red` means hypothesis, failure, the honest gap. **Never decorative, never emphasis** | It is a defined signal in [`palette.md`](./palette.md). Spending it on decoration destroys the one place the page can say "this is not settled" |
| The palette is not re-derived | Both modes stay as specified; any new value is computed against both grounds, never picked by eye | `--red` shipped at 4.43:1 and `--mute` at 3.08:1 exactly once, for exactly that reason |
| The page is readable with JS off | Content is visible in the static export; JS may enhance, never reveal | `.reveal { opacity: 0 }` once shipped in prerendered markup and blanked every stack tier and all eleven skill rows |
| No claim the page cannot source | Counts are derived from data, not written. No path is rendered that is not in a routing table | Commit `2efde6f` had to fix three false claims once already |

**Deliberately unconstrained:** typeface strategy, type scale, spacing scale, layout
structure, density, chrome weight, imagery. Those are direction, and the exploration
owns them.

## Vocabulary

**The noun this runs on:** **context.** The UI, the README and the copy all use it and
do not drift to synonyms.

**Out of bounds:**
- **"context engineering"** — the discipline label, as opposed to the plain noun. The
  closed positioning brief already suspected it loses the reader in the first
  sentence; the audience is now anyone building with Claude seriously, not engineers.
- **"memory"** — the site's old thesis. The library outgrew it, and keeping the word
  invites the narrower argument back through the copy. A real cost: it is the plainest
  available way to describe the problem, and Claude Code uses it as a feature name.
- **Absolute accuracy claims** — *guaranteed*, *always accurate*, *never wrong*, and
  on inspection *never invented* too. On a page arguing "don't trust confident
  claims," an unverifiable absolute is self-inflicted. Describe the mechanism instead:
  *"where nobody remembers why, they say so"* is checkable; *"never invented"* is not.

## Inheritance

- **Inherits, entire:** the colour system in [`palette.md`](./palette.md) — 11 tokens
  across two modes, every one contrast-verified against its own ground.
- **Inherits:** the motion rules in [`../specs/motion.md`](../specs/motion.md), which
  are amended by this work rather than replaced.
- **Greenfield:** everything typographic and spatial.

## What would count as failure

*Even if the result is genuinely beautiful:*

1. **The records read as a design gimmick** — the gaps and the redline look like a
   device invented for the layout rather than artifacts from a real repo. This
   inverts the argument, because their whole value is that they are not decoration.
2. **Beautiful, and still can't say what this is** — someone lands, admires it,
   leaves, and could not describe the library to a colleague.

Failure 2 is detectable **only by asking a person.** `design/research/` is empty and
there is no analytics, so nothing in this document has been tested on a reader.

## Open questions

- **Named references are missing.** "Claude Code" and "machine output with marks" are
  a territory, not specific artifacts. Two or three named things would make this
  testable rather than interpretable.
- Two risks were **declined** as failure conditions — that the site reads as a
  developer docs site, and that it is too cold to keep reading. Both are accepted
  trades, carried as revisit conditions on the direction decision instead.
- Whether *warm* survives contact with the chosen direction, given that *too cold*
  was not adopted as a failure.

---

_Written via `/design-language` on 2026-08-19, drafted from a recorded brainstorm
rather than a fresh interview. Sections not answered would read `*(not stated)*`;
none were left unanswered, but see Open questions for what is thin._
