# 0015. Search returns to the site, as a filter over the catalogue

- **Status:** **Accepted**
- **Date:** 2026-08-19
- **Supersedes:** [0009](./0009-the-command-palette-is-retired.md)

## Context

[0009](./0009-the-command-palette-is-retired.md) retired the ⌘K command palette with
the nav it hung from, and was explicit that nothing took its place:

> *"The command palette is **gone**, with the nav that opened it. Nothing replaced it:
> the site has no search, and `⌘K` does nothing."*

Its first entry under *What we gave up* was *"**Search, entirely.** Fourteen skills are
found by scrolling."*

A Follow-up the same day converted the retirement into a deferral. Asked why the
palette was retired rather than rebuilt, the owner answered:

> *"for the new website direction, we would have not needed it. But maybe we can add it
> in later stages, because right now we can keep it simpler."*

The Follow-up drew the consequence itself: *"If it comes back it needs a new decision."*
This is that decision — though not for the thing the Follow-up was anticipating.

**None of 0009's own revisit conditions fired.** It set three. *"The catalogue passes
~30 rows"* — the catalogue is fourteen. *"Someone asks for record contents"* — the
condition 0004 set and 0005 carried forward unchanged; still unfired, and the answer
0009 named for it (a build-time Markdown index) was not built. The third, *"Analytics
ever exists"*, is not addressed anywhere in this round's evidence either way.

What happened instead is on the record in one sentence, and is worth quoting rather
than dressing up:

> *"It is back because the owner asked for it, and the ADR should say exactly that."*

## Options considered

| Option | The bet | Why it lost |
|---|---|---|
| Wait for 0009's own conditions to fire | The conditions are the honest bar. 0009 named the size at which *"the JS cost stops being disproportionate"*; building the machinery at fourteen rows spends it early and empties the bar of meaning | It did not lose on argument — it was overtaken. No source shows the conditions being weighed against the request; the request simply came first |
| Rebuild the palette itself — ⌘K, a dialog, modifier actions | 0004's premise, which 0005 endorsed and 0009 still endorsed on retiring it: *"the site's actual job is getting an install command into someone's clipboard"*, and a keyboard route is the shortest way there | **`*(reason not stated)*`** as a deliberation. On the record: only the ranker came back, the shell did not, and nothing in `git:10b64af` argues the case either way. The nearest thing to a reason predates it — 0009's Follow-up, *"right now we can keep it simpler"* |
| Search over record contents — a build-time Markdown index | The condition 0004 set, 0005 carried and 0009 restated: if people search for *"reason not stated"* rather than skill names, the index becomes worth its machinery | Nobody has asked. 0009's terms still hold: *"If it fires, the answer is a build-time Markdown index; a palette would be a way to reach it, not the reason to build it"* |
| **A filter box in the catalogue's section header — chosen** | The page's one long list gets a way to shorten itself, in place, with no second surface and no convention to learn | — |

## Decision

Search is back as a **filter over the catalogue**, and only that. An
`<input type="search">` sits in the `#skills` section header — *"the search is a
property of the section, not a control floating above the list"* — and typing hides
non-matching rows. **There is no ⌘K, no dialog and no actions.** Rows are hidden, never
unmounted, so the whole catalogue stays in the DOM and in the static export and a
JS-off reader still has all fourteen; the input itself renders only after mount, so no
dead control ships. Order never changes: the ranker sorts, but reordering fourteen rows
under a reader's cursor as they type was judged worse than leaving them put, so it is
used purely as the matcher.

**The ranker is the retired palette's**, restored from `fcea6dd^` rather than rewritten,
with two hard-won behaviours deliberately preserved. `group.note` stays in the search
keywords — dropping it once silently lost the query *"figma"*, whose only occurrence in
the entire dataset is the Design work group's note *"a Figma file shows the winner"*, a
regression recorded in [0005](./0005-the-palette-searches-skills-and-copies-one-thing.md)'s
Follow-up of 2026-08-16. And the **band order** stands: the keywords band scores 400 and
the subsequence band `300 - length`, which is what stops `changelog-tracker` (c-h-a…t, in
order) beating the eleven Chat skills on the query *"chat"*. The file says so where
someone might "simplify" it again: *"Reorder these and that regression returns."*

**One thing was changed on purpose.** Fuzzy matches are now a **fallback, not a peer** —
dropped entirely whenever anything matched properly. The reason is that a filter is not
a ranker, and it is stated in `searchSkills`'s docstring:

> *"The palette only ever sorted, so a stray subsequence hit sat harmlessly at the bottom
> of a list. A filter is binary — it is in or it is out — and the query "chat" is the case
> that proves it: changelog-tracker contains c-h-a-t in order, so it came back as a twelfth
> result alongside the eleven skills that actually run on Chat. Ranking hid that bug;
> filtering exposes it."*

Four queries are pinned by `website/tests/skills-search.spec.ts`: `design`, `figma`,
`chat`, and `code` — the last asserting all fourteen, because every skill runs on Code
and *"that is the truth, not a broken filter."*

### Why this supersedes 0009 rather than merely following it up

This was a real fork and the answer is not obvious, so the argument is recorded rather
than asserted.

**The case for a Follow-up** is that 0009's subject is the *palette*, its title is
*"retired, not rebuilt"*, and the palette is still retired. No ⌘K, no dialog, no actions,
no 35-item index. On its own subject 0009 is not merely intact — this decision
**reaffirms** it, and a supersession arrow risks telling a future reader the opposite.
0009's Follow-up also anticipated a *palette* return, and that is not what happened.

**The case for supersession, which won**, is that 0009 decided two things and only one
of them survives. It retired the palette *and* it decided that nothing would replace it:
*"the site has no search"*, and *"Search, entirely"* as its largest give-up. That half is
now false about the built page. The test for this tier is whether the frozen text still
describes the site, and it does not — a reader who opens 0009 today and believes it
leaves believing the catalogue is found by scrolling.

The deciding factor is where the record is actually read. Most readers meet these ADRs in
the index table, where the only signal is the `**Status:**` line. A Follow-up repairs the
file for whoever opens it and leaves the index row reading *Accepted* beside
*"Gave up: Search entirely."* The cost of superseding — implying the palette is back — is
repairable by this file saying plainly that it is not, which is what the Decision above
does. The cost of not superseding is a record that reads as current and is wrong.

So: **superseded in status, partial in substance.** 0009's holding on the palette stands
and is endorsed here. What is superseded is its second half.

## What we gave up

- **The ~30-row bar, as a bar.** 0009 named a size at which search stops being
  disproportionate and the machinery arrived at fourteen. The number is not wrong; it is
  now unenforceable. The precedent this sets is that a stated condition can be skipped by
  asking, and the next feature that wants skipping has this file to point at.
- **The evidence [0005](./0005-the-palette-searches-skills-and-copies-one-thing.md) asked
  for — again.** Search has now shipped, been deleted, and shipped again on this site
  without ever being measured once. 0009 recorded that loss as permanent for the palette;
  this restores the feature without restoring the ability to evaluate it.
- **Tolerance for a near miss.** Demoting fuzzy to a fallback is right for the `chat` case
  and it is a real loss in the general one: a mistyped query that also happens to match
  something exactly now drops every fuzzy hit, and a query matching nothing empties the
  list outright (`kubernetes` → zero visible rows). Ranking degraded gracefully; a binary
  filter does not.
- **The keyboard route to the install command, still.** 0009 listed it as a loss and this
  does not return it. The filter is a text input in the page flow, not a shortcut; nothing
  is reachable without first scrolling to the catalogue.
- **The catalogue's server rendering.** The list moved into `SkillList.tsx`, a client
  component, on a page whose direction was won by two exploration artifacts that contained
  no JavaScript at all. The rows still ship in the static export, so nothing is hidden from
  a JS-off reader — but the client boundary 0009 was pleased to remove from the chrome is
  back, one section lower.

## What would make us revisit

- **A query returns rows a reader would not call matches, or misses ones they would.**
  Four queries are pinned by the spec; the fifth is the one nobody thought to write, and
  that is where the next `figma` lives.
- **The catalogue passes ~30 rows.** 0009's condition survives, pointed at the next
  decision rather than this one: a filter that only ever *hides* leaves a thirty-row list
  with holes in it, and at that size reordering, grouping or a compact index becomes the
  question this filter deliberately declined to answer.
- **Someone asks for record contents.** Still unfired, and the answer is still a
  build-time Markdown index rather than a bigger filter.
- **The binary filter strands a real reader.** If emptying the catalogue on a typo is
  observed rather than theorised, the fuzzy demotion is the wrong shape and ranking should
  come back, with the `chat` case solved some other way.
- **Analytics ever exists.** Then a removal, a restoration and 0005's original question
  can all be answered at once, and this decision can be checked against the only evidence
  anybody ever asked for.

## Evidence

- **Primary:** `git:10b64af` (2026-08-19), the commit message:
  > *"Search is back, four months after design ADR 0009 retired it. Neither of 0009's own
  > revisit conditions fired: the catalogue is fourteen rows, not the ~30 it named, and
  > nobody asked for record search. It is back because the owner asked for it, and the ADR
  > should say exactly that."*

  **One correction, recorded so it is not inherited:** *"four months"* is wrong. 0009 is
  dated **2026-08-19** and this commit is dated **2026-08-19** — the same day. The gap was
  hours, not months, which makes the point about the unfired conditions sharper rather than
  softer.
- **Corroborating:** `website/components/lib/skills.ts` §Search — the restored ranker's
  header comment naming both preserved behaviours, and `searchSkills`'s docstring naming
  the one deliberate change, quoted above · `website/components/SkillList.tsx` — hidden not
  unmounted, order never changes, input mount-gated ·
  `website/tests/skills-search.spec.ts` — the four pinned queries ·
  [0005](./0005-the-palette-searches-skills-and-copies-one-thing.md) §Follow-up 2026-08-16,
  the `figma` regression · [0009](./0009-the-command-palette-is-retired.md) §Decision and
  §Follow-up 2026-08-19, both quoted above.
- **Rationale:** **the fact is stated; the reason is not.** That the owner asked for it is
  on the record explicitly and unusually plainly. **Why** the owner asked, and **why a
  filter rather than the palette**, are both **`*(reason not stated)*`** — no source weighs
  the two shapes against each other. The one ranker change that *does* carry a stated
  reason is quoted above verbatim rather than paraphrased.

## Follow-up

*Append-only. Everything above is **frozen**. Entries below are dated and additive.*

*(none yet)*

---

_**Exactly two things in this file may ever change:** the `**Status:**` line and
additions under `## Follow-up`. If this turns out to be wrong, do not edit it —
supersede it with a new decision that links back._
