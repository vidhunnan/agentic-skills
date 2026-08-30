# docs: typed material, snapshots, and an indexed backlog

- **Commit:** `11b604d22ec1f108820680a44a225798f0b9f836` (`11b604d`)
- **Author:** Claude
- **Date:** 2026-08-30

## Commit message

Knowing what kind of thing you captured is most of the value, because the type
predicts the composition.

## Changes in detail

### `docs/concepts/working-in-public.md` (+107 / −24)
- Adds a **type checklist** — reframe, failed attempt, trade, before/after, surprise,
  technique, number, mistake, constraint, dead end, `other`. It doubles as a **scan
  checklist**: asking "what was interesting?" reliably produces nothing, so the skill walks
  the work against these shapes instead. Typing is **required** because it is what feeds the
  drafting skill's composition decision.
- Adds **snapshotting**, the strongest argument in the family: git holds the before-state of
  *code* and nothing of the **rendered** before — the old flow, the failing output, the doc as
  it read last week. Only something running at that moment can catch it.
- Notes this is the family's **second widening past Markdown**, and that the two are different
  in kind: a card is **generated**, a snapshot is **preserved**. The preserved one has the
  stronger defence, and writing them as one would let the weak case ride in on the strong one.
- Stores material as an index over per-item files, mirroring `changelog/`, with status and an
  expiry so the backlog is queryable and does not rot silently. Adds retrieval, and four
  capture triggers — one of which must not interview at all.
- Settles the `handoff-generator` overlap on **completeness**, not subject: a handoff is
  state-oriented and complete, an export is reader-oriented and selective. A handoff that
  omits dull-but-necessary context is broken; an export that includes it is useless.
