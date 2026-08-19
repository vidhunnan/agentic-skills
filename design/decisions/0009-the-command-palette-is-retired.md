# 0009. The command palette is retired, not rebuilt

- **Status:** **Accepted**
- **Date:** 2026-08-19
- **Supersedes:** [0005](./0005-the-palette-searches-skills-and-copies-one-thing.md)

## Context

[0004](./0004-a-command-palette-with-actions-not-a-search-box.md) built a ⌘K palette
over a 35-item index with three modifier actions per result. [0005](./0005-the-palette-searches-skills-and-copies-one-thing.md)
cut it back the same day to the skills only and one action, and set itself this
condition — quoted here because it is what this decision fires:

> *"If the palette turns out to be opened rarely enough that the JS is not worth it,
> the honest move is to remove it, not to add features until it justifies itself."*

It also carried forward, unchanged, 0004's condition for going the other way:

> *"If people search for record contents — phrases like 'reason not stated' rather
> than skill names — the Markdown index becomes worth its machinery."*

Neither could be evaluated. The revamp brief opened with the palette as an unresolved
question and said so plainly: *"Does the command palette survive its own revisit
condition? … **Unmeasured.**"* There is no behavioural data of any kind — the brief
records that Vercel Web Analytics returns `404 — not found`.

What actually reached the palette was structural. The rebuild replaced the nav with
`FileBar`, a server component with no JS, and `Nav` imported `OPEN_EVENT` from
`CommandPalette` — the only component-to-component value import in the tree — so the
two could not be separated in the commit that removed one.

## Options considered

| Option | The bet | Why it lost |
|---|---|---|
| Rebuild the palette in the new chrome | Getting an install command into a clipboard is still the page's job — 0004's premise, which 0005 endorsed — and search is still the shortest route to it | **`*(reason not stated)*`** — no deliberation is recorded. On the record: what replaced the nav needs no JavaScript at all, and every install command now sits on its own catalogue row with its own copy button, which is the route the palette existed to shorten |
| Keep it, and measure it before deciding — the test 0005's condition assumes | The condition names a measurement; removing the thing before taking it answers the question by destroying it | Foreclosed rather than argued: there is no analytics on the site, so *"opened rarely enough"* could not be tested before the rebuild deleted the nav that opened it |
| **Retire it — chosen** | The page is readable without JS, the catalogue carries the commands, and 90 lines of hand-rolled ranker for a 14-item index is machinery the page no longer has a use for | — |

## Decision

The command palette is **gone**, with the nav that opened it. Nothing replaced it:
the site has no search, and `⌘K` does nothing. `CommandPalette.tsx` and its
stylesheet (445 lines) went out of the tree, taking ~90 lines of hand-rolled search
ranker and ~20KB of JS with them. The install commands the palette existed to copy
are now on every catalogue row. The page's only remaining client JavaScript is the
scroll reveal and the copy buttons.

This fires 0005's revisit condition — but **not on that condition's terms.** The
condition asked for evidence that the palette was rarely opened. No such evidence was
gathered, then or since. It was removed because the structure it hung from was
removed, and that distinction is the whole reason this record exists.

## What we gave up

- **Search, entirely.** Fourteen skills are found by scrolling. The catalogue's own
  answer to length is a compact one-line index — `Skills.tsx` records that fourteen
  full rows was ~2,400px and would be ~5,400px at the thirty-two on the roadmap — and
  an index is not a search.
- **The evidence 0005 asked for, permanently.** The palette can no longer be
  measured, so whether it was used is now unknowable. A revisit condition that gets
  overtaken by a rebuild teaches nothing, and this one cost two ADRs to arrive at.
- **The keyboard route to the one thing the page is for.** 0004's premise — *"the
  site's actual job is getting an install command into someone's clipboard"* — is
  still endorsed and is now served only by scrolling to the right row.
- **A reason for the page to have any JS budget at all.** That is a gain in most
  readings; it is a loss in one — the next interactive feature starts from zero
  precedent rather than from an existing client boundary.

## What would make us revisit

- **The catalogue passes ~30 rows.** The roadmap is thirty-two skills. The compact
  index is the current answer to length; search is the next one, and at that size the
  JS cost stops being disproportionate.
- **Someone asks for record contents** — the condition 0004 set and 0005 carried
  forward unchanged, still unfired. If it fires, the answer is a build-time Markdown
  index; a palette would be a way to reach it, not the reason to build it.
- **Analytics ever exists.** Then 0005's actual question can be answered
  retrospectively against the old site, and if the answer is *"people did open it"*,
  this decision was taken without the evidence its predecessor asked for.

## Evidence

- **Primary:** `git:fcea6dd` (2026-08-19), the commit message:
  > *"Deleted: Nav, CommandPalette, ContextStack, Proof, Specimens, and ~90 lines of
  > hand-rolled search ranker for a 14-item index. Nav imported OPEN_EVENT from
  > CommandPalette — the only component-to-component value import in the tree — so
  > those two had to go in the same commit."*
- **Corroborating:** [0005](./0005-the-palette-searches-skills-and-copies-one-thing.md)
  §What would make us revisit, quoted above · [`../briefs/website-revamp.md`](../briefs/website-revamp.md)
  §Open questions — *"Unmeasured"*, and the `404 — not found` on analytics ·
  `website/components/FileBar.tsx`, whose comment records that *"the old Nav carried a
  scroll-progress bar, a scrollspy and a palette trigger; none survived the rebuild"* ·
  [`changelog/commits/037-rebuild-in-terminal-rendered-markdown.md`](../../changelog/commits/037-rebuild-in-terminal-rendered-markdown.md)
  §deleted files.
- **Rationale:** **the removal is recorded; the deliberation is not.** The commit
  states what was deleted and the coupling that forced two deletions into one commit.
  **Why the palette was retired rather than rebuilt is `*(reason not stated)*`.**

## Follow-up

*Append-only. Everything above is **frozen**. Entries below are dated and additive.*

- **2026-08-19** — **The rationale is no longer unstated.** Asked why the palette was
  retired rather than rebuilt, the owner answered on the same day this record was logged.
  Quoted as dictated:

  > *"for the new website direction, we would have not needed it. But maybe we can add it
  > in later stages, because right now we can keep it simpler."*

  So the reason is **fit, not failure**. Nothing about the palette was found wanting; the
  direction it was built for was replaced, and the replacement did not call for it. That is
  a materially different record from "it was cut because it was not used" — which is what a
  reader would reasonably have assumed from the frozen text above, and which no evidence
  ever supported.

  **It also converts the retirement into a deferral.** *"Maybe we can add it in later
  stages"* is an intent, not a plan, and is recorded here as one — but it means a future
  rebuild would not be reversing this decision so much as resuming something parked. If it
  comes back it needs a new decision, because the evidence [0005](./0005-the-palette-searches-skills-and-copies-one-thing.md)
  asked for still cannot be collected while there is nothing to measure.

---

_**Exactly two things in this file may ever change:** the `**Status:**` line and
additions under `## Follow-up`. If this turns out to be wrong, do not edit it —
supersede it with a new decision that links back._
