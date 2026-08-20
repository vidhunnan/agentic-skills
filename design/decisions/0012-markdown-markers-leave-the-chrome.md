# 0012. Markdown markers leave the page's chrome and stay in the records

- **Status:** **Accepted**
- **Date:** 2026-08-19

> **Narrows a clause of [0007](./0007-the-site-is-terminal-rendered-markdown.md);
> it does not replace it.** 0007's direction — terminal-rendered markdown — stands
> unchanged, as does everything else it decided. What moves is the **scope** of one
> phrase in its Decision: *"markdown syntax present but recessive"*. `**Supersedes:**`
> is therefore left off; whether the index records this as a partial supersession is
> the index's call, not this file's.

## Context

The round 2 rebuild (`git:fcea6dd`) built 0007's direction and put markdown markers on
the page's own chrome as well as inside the quoted record: `<!-- -->` around the hero
eyebrow and the footer bar, `#` on the h1, `##` on four h2s, `>` on three notes, all
painted with one class:

```css
.s { color: var(--mute); font-weight: 400; }
```

**0007 justified the markers with a constraint that does not cover them.** Its
argument was:

> *"It also satisfies the hard constraint 'records are shown verbatim, never
> restyled' in the strongest available way: showing `##` and `*(reason not stated)*`
> as recessive source **is** verbatim, where rendering them into styled components
> would not be."*

Both of the examples it cites are lines **inside the hero specimen** — text quoted
from [`design/decisions/0002`](./0002-a-three-family-type-system-for-the-site.md),
stored at the source file's own column wraps and diffed against the file by
`website/tests/specimen.spec.ts`. Neither is page chrome. And the constraint itself is
scoped in [`design/system/language-website.md`](../system/language-website.md)
§Hard constraints, whose subject is a record:

> | Records are shown verbatim | The site may **colour and position** a record. It may not restyle one. No badge, pill or icon may stand in for a mark such as `*(reason not stated)*` | The artifacts' entire value is that they are real. A styled excerpt is the first failure condition, arriving by the front door |

So `## The skills` was never covered by the rule that put it there. **The convention
was also already inconsistent in the shipped page:** at `467dc5b` the footer rendered
`<!-- -->` around its bottom bar while its four column headings — `<h3>` elements —
carried no `###` at all.

Round 4 (`git:218c91d`) was six pieces of craft feedback on the built round 3. This
was one of them.

## Options considered

| Option | The bet | Why it lost |
|---|---|---|
| Keep the markers on everything *(incumbent, `git:fcea6dd`)* | The whole page is one marked-up file, so the chrome should wear source too — the most literal reading of "the page and the artifact are the same material" | Stated at the time: the constraint that justified it is **scoped to records**, and 0007's own two examples are lines in the specimen, not chrome. A heading in markers was *"a website heading wearing a costume"* |
| Finish the convention instead — add `###` to the footer's four h3s and keep markers everywhere | The inconsistency is the defect, not the markers; cure it by completing the pattern rather than by retreating | **`*(reason not stated)*`** — not recorded as a weighed option. Recorded instead: the commit cites the footer gap as **evidence the convention was already incoherent**, not as a gap to fill |
| Hide the markers everywhere, records included — render the record into styled headings | One typographic system, no source leaking into the page at all | Foreclosed, not chosen against: it is the explicit failure condition in the hard-constraints table — *"No badge, pill or icon may stand in for a mark"* |
| **Markers only inside records — chosen** | The syntax is evidence, not decoration. Where it is quoting a file it is verbatim; where it is dressing a heading it is a costume | — |

## Decision

Every markdown marker was removed from the page's own chrome — `#` from the h1, `##`
from four h2s, `>` from three notes, `<!-- -->` from the eyebrow and the footer bar —
and **every marker inside the hero specimen stayed**, because that text is quoted from
a file in this repo and is asserted against it by a test. The `.s` class survives and
its scope is now written into the stylesheet next to it:

> *"The syntax layer, for **RECORD CONTENT ONLY**. […] The page's own headings do not
> carry them. `## The skills` is not a record; it is a website heading wearing a
> costume, and the constraint above never applied to it — note that the footer's own
> h3s never carried `###` either."*

The footer's inconsistency was cured by **subtraction**: with the bar's `<!-- -->`
gone, no chrome element carries a marker and the h3s are no longer the odd ones out.

**One residue, recorded rather than smoothed over.** `.s` is still applied to three
pieces of chrome punctuation that are not record content — the `·` separators in the
hero meta line and the specimen caption, the `/` in the nav path, and the `— ` before
the caption. Its own comment says RECORD CONTENT ONLY. The class is doing two jobs
under one name, and nothing enforces the boundary the comment draws.

## What we gave up

- **The most literal expression of 0007's central bet.** 0007 chose this direction
  because *"the page and the artifact are the same material"*. Visible source markers
  were the strongest available signal of that, and they now appear on exactly one
  element — the specimen card. Everything else argues the material with monospace, box
  drawing and colour alone.
- **Ground held against the developer-docs template.** 0007 recorded that risk in
  plain terms: *"Monospace, hairlines and restraint is the road to every tool's
  documentation site. The annotation layer is the only thing holding the page
  somewhere else, which makes it load-bearing rather than decorative."* This
  subtracts from that annotation layer. The risk was already carried as a revisit
  trigger on 0007 and is now closer.
- **A rule that needed no judgement.** "Markers everywhere" is checkable by looking.
  "Markers on records only" requires every new element to be classified first — is
  this a record or is it chrome? — and nothing but the stylesheet comment carries the
  answer. The `.s` residue above is what that costs on day one.
- **Hierarchy's one crutch.** 0007 already put hierarchy on case, weight and colour
  rather than size. The `##` gave h2s a second, non-typographic mark; without it the
  bet is being run without a hedge.

## What would make us revisit

- **Someone outside calls it a developer docs site.** 0007's own trigger, and this
  decision moved the page toward it. It remains untested — no comprehension test has
  been run and `design/research/` is still empty.
- **`.s` appears on new chrome.** That is the observable signal that the scope has
  quietly re-widened; the class is the enforcement point and nothing but review
  guards it.
- **A record's markers get rendered rather than shown.** The scoping in this decision
  is downstream of the hard constraint. If the constraint is ever relaxed for
  records, the reason for the split disappears and both halves need re-deciding
  together.
- **The specimen stops being the only quoted surface.** If records appear in more than
  one place on the page — several cards, an inline quotation in running prose — the
  "record vs chrome" line has to be drawn per element rather than per section, and a
  comment in `globals.css` will not be enough.

## Evidence

- **Primary:** `git:218c91d` (2026-08-19), the commit message:
  > *"Markdown markers leave the chrome and stay in the records. `#` on the h1, `##`
  > on four h2s, `>` on three notes, `<!-- -->` on the eyebrow and the footer. What
  > stays: every marker inside the hero specimen, because that text is quoted from
  > design/decisions/0002 and 'records are shown verbatim' is scoped to records.
  > Design ADR 0007's verbatim argument cites `##` and `*(reason not stated)*` — both
  > are lines in the specimen, not page chrome. Worth noting the convention was
  > already inconsistent: the footer's h3s never carried `###`."*
- **Corroborating:** `website/app/globals.css`, the comment above `.s`, which carries
  the same argument in the file it governs · [`../system/language-website.md`](../system/language-website.md)
  §Hard constraints, the *"Records are shown verbatim"* row, whose subject is a record ·
  [0007](./0007-the-site-is-terminal-rendered-markdown.md) §Decision, the sentence the
  scope moved under · `git:fcea6dd` — where the chrome markers were introduced ·
  `git:467dc5b:website/components/Footer.tsx`, where the four `<h3>` elements carry no
  `###` while the bar below them carries `<!-- -->` · `website/tests/specimen.spec.ts`,
  which asserts the specimen's markers against the source file.
- **Rationale:** **stated at the time**, in the commit message and in the stylesheet
  comment, both written in `git:218c91d`. The round 4 feedback that prompted it was
  verbal and is **not recorded verbatim anywhere**. Round 4 has no exploration-log
  round — `docs/concepts/website/website-revamp.md` ends at round 2 — and the
  changelog is generated from git, so any entry written for the commit restates this
  same message rather than adding a second source. The commit message is the only
  record, which is why it is quoted here at length rather than summarised.

## Follow-up

*Append-only. Everything above is **frozen**. Entries below are dated and additive.*

*(none yet)*

---

_**Exactly two things in this file may ever change:** the `**Status:**` line and
additions under `## Follow-up`. If this turns out to be wrong, do not edit it —
supersede it with a new decision that links back._
