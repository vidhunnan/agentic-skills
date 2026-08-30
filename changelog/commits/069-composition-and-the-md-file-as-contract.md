# docs: composition, and the md file as the contract between two skills

- **Commit:** `b6d4488eac5ca33d2c461ebff39fe190703e14a8` (`b6d4488`)
- **Author:** Claude
- **Date:** 2026-08-30

## Commit message

How an argument is cut across frames changes what each frame says, so composition
cannot be left to the renderer. And if two skills are to be separate skills, the
file between them has to be a real contract.

## Changes in detail

### `docs/concepts/working-in-public.md` (+113 / −12)
- Makes **composition** a first-class decision in the drafting skill: text-only, single
  frame, carousel, split panorama, orientation — chosen jointly from the content and the
  platform. The worked case is a chart, which is one landscape image on LinkedIn and, on
  Instagram, either a portrait crop that loses the axis labels, a three-frame walkthrough,
  or a wide image split across grid tiles. Those are three different posts and the copy
  changes with them.
- Records the property that fell out rather than being designed: **the four-beat arc is also
  the frame structure.** Four beats is a four-slide carousel; a single-image post is the same
  arc compressed. That is the reason copy and visual cannot be decided independently.
- Names `posts/{date}-{slug}.md` as **the interface** between `post-generator` and
  `post-card`, which is what allows them to be two skills at all.
- Two sections in that file carry more weight than their size: **Sources** makes the draft
  auditable, and **Not claimed** makes the refusals visible instead of silent, so a fact the
  skill declined to state can be added back deliberately rather than appearing on its own.
- Adds the brainstorm axis per skill — story, then structure, then treatment — with the rule
  that no skill picks for the user.
