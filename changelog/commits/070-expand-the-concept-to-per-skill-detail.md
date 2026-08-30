# docs: expand the concept to per-skill detail

- **Commit:** `845a82c5c4b235c30733d04f1135cc4d892e23c3` (`845a82c`)
- **Author:** Claude
- **Date:** 2026-08-30

## Commit message

Trigger, reads, interviews for, writes, and — the part worth reading — what each
skill refuses to do.

## Changes in detail

### `docs/concepts/working-in-public.md` (+116)
- A section per skill. The **refusals** are the load-bearing half: they are what keeps a
  generative family inside a faithful library. The setup skill will not invent a voice; the
  angles skill can say *nothing here is worth a post yet*; the drafting skill will not call
  something shipped that the changelog does not carry; the card skill will not fabricate a
  chart.
- Adds a **platform reference table** — frame sizes and the composition each platform
  supports — with an explicit warning that these drift and that a stale aspect ratio **fails
  silently**: it looks correct locally and crops wrong in the feed.
- Carries recommendations into two open questions rather than leaving them hanging:
  refuse-and-report on plan drift, because silently rendering a mismatch is only caught after
  posting; and beat-plus-treatment-note rather than frame copy at plan time, because writing
  frame text early produces filler for frames that only needed an image.
