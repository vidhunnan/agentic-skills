# 0005. The palette searches skills and copies one thing

- **Status:** Superseded by [0009](./0009-the-command-palette-is-retired.md)
- **Date:** 2026-08-16
- **Supersedes:** [0004](./0004-a-command-palette-with-actions-not-a-search-box.md)

## Context

[0004](./0004-a-command-palette-with-actions-not-a-search-box.md) shipped a
command palette indexing 35 items — eleven skills, twelve stack tiers, six page
sections and six Proof records — with three modifier-key actions per result:
`↵` navigate, `⌘↵` copy the install command, `⇧↵` open on GitHub.

It was reviewed within the hour and the verdict was that it did too much:

> *"this is too much, just search for skill and copy the command like. not
> actually navigation the whole website"*

That is the **why now**, and it is worth recording precisely, because 0004's own
reasoning contains the flaw. It argued that *"the site's actual job is getting an
install command into someone's clipboard"* — and then built navigation for tiers,
sections and records anyway. The stated premise and the built thing disagreed;
the premise was right.

Two costs 0004 itself recorded came due immediately rather than eventually: the
modifier-key actions are unreachable on touch, and the palette became a second
way to reach everything the nav already reached.

## Options considered

| Option | The bet | Why it lost |
|---|---|---|
| **Skills only, one action — chosen** | The palette has one job: find a skill and copy its command. Everything else was scope | — |
| Keep the full index, drop the modifiers | Preserves discovery of tiers and records; one action is simpler to learn | Rejected: the navigation itself was the objection, not the key bindings. A palette that jumps to `#stack` duplicates a nav link four pixels away |
| Keep 0004 as built | It works, it is tested, and the extra surface costs nothing to leave in | Rejected. Unused surface is not free — it has to be understood, kept accurate as the site changes, and it dilutes what the palette is *for* |

## Decision

The palette indexes **the eleven skills only**. `↵` copies the install command
and the palette stays open. There are no modifier actions, no result kinds, and
no keyboard-hint footer.

Search still matches each skill's description, surfaces and group note, so
*"figma"*, *"append-only"* and *"chat"* find the right skill even though none of
those words is in a skill's name.

## What we gave up

- **Discovery of the tiers and the records.** Searching `design/explorations/` or
  `reason not stated` no longer finds anything. Those are arguably the most
  interesting things in the repo, and they are now reachable only by reading the
  page — which is what the nav and the Proof section are for.
- **A reason to open the palette when you are not installing.** It is now a
  single-purpose tool, and single-purpose tools get opened less.
- **~20KB of JS is still spent**, on a page that otherwise needs none, for a
  narrower feature than the one that justified it.

## What would make us revisit

- If people ask for record contents — *"where's the ADR about typefaces"* — the
  answer is a Markdown index, not restoring tier navigation. That was already
  0004's revisit condition and it survives this supersession unchanged.
- If the palette turns out to be opened rarely enough that the JS is not worth
  it, the honest move is to remove it, not to add features until it justifies
  itself.

## Evidence

- **Primary:** this session, 2026-08-16 — the review quoted verbatim above.
- **Corroborating:** [0004](./0004-a-command-palette-with-actions-not-a-search-box.md),
  whose *What we gave up* section named both failure modes before they happened ·
  `website/components/lib/skills.ts` §`buildCommandIndex`, now eleven items.
- **Rationale:** stated at the time, by the owner.

## Follow-up

*Append-only. Everything above this heading is **frozen**.*

- **2026-08-19** — **Superseded by [0009](./0009-the-command-palette-is-retired.md).**
  The palette was removed from the page entirely rather than rebuilt in the new
  direction, which fired this decision's own revisit condition. The evidence this
  record asked for — what people actually searched — can no longer be collected.

- **2026-08-16** — Simplifying dropped `group.note` from the search keywords,
  which silently lost the query *"figma"* — the phrase *"a Figma file shows the
  winner"* lives in the Design work group note, not in any skill description.
  Caught by testing the index rather than by reading the diff; the note is back.
  Evidence: `website/components/lib/skills.ts` §`buildCommandIndex`.

---

_**Exactly two things in this file may ever change:** the `**Status:**` line and
additions under `## Follow-up`._
