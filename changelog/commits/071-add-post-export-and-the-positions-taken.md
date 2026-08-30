# docs: add post-export, and record the positions taken

- **Commit:** `b4eb4ab92f2a1c49e3f77c90afbd5fa28715ec6d` (`b4eb4ab`)
- **Author:** Claude
- **Date:** 2026-08-30

## Commit message

The fifth skill, and the one that turned out to matter most. It does not write
posts.

## Changes in detail

### `docs/concepts/working-in-public.md` (+96 / −15)
- Adds **`post-export`**: capture the material while the work is warm. The record holds what
  shipped and why it was chosen; it does not hold the third attempt that failed, or what a
  flow looked like before. Those are what a post is built from and they survive about a day.
- Records four positions as brainstorm outcomes and, explicitly, **not as ADRs**, so nothing
  downstream cites the concepts tier as a decision:
  - **No record is not a refusal.** Most projects worth posting about have no changelog. The
    family degrades to an interview and **labels itself** `*(from conversation, not the
    record)*`. Declining outright would make it unusable outside repos that already run this
    library.
  - **Nothing ever publishes**, on any surface, permanently. A bad post cannot be un-posted.
  - **Nudge to capture, never to post.** Capture is cheap and the material is perishable;
    nothing in the family suggests the user should be posting more.
  - **Graduation is gated on one real post**, not on the doc feeling finished.
- Adds two open questions the addition created: whether `post-export` is distinct enough from
  `handoff-generator`, and how much of a session it can actually see given that the
  interesting detail often exists only in the user's head.
