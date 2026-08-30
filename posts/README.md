# Posts — What did we say publicly?

**Question:** What did we say publicly, and what material do we have to say it with?
**Tense:** past for posted, present for material
**Status:** derived
**Written by:** `post-export`, `post-angles`, `post-generator`, `post-card`
**Lifecycle:** Derived. It cites the record. **It is never a source.**

A post is downstream of the context stack, not a tier in it. It does not appear in
the routing table, and **nothing may cite a post as evidence that something
shipped.** Check `changelog/`, or check the code.

## Layout

| Path | What it holds |
|---|---|
| `material/` | The backlog. Typed items captured while the work was warm, with an index |
| `material/assets/` | Snapshots — the before-state, before it was overwritten |
| `{date}-{slug}.md` | A post: copy per platform, plus the visual plan |
| `cards/` | Rendered frames, one self-contained HTML file each |
| `VOICE.md` | How the posts sound. Not how this repo's docs sound |
| `CARD.md` | How the frames look |

## The rule that matters

Every factual claim traces to a source, and anything drafted from memory rather
than from the record is labelled `*(from conversation, not the record)*`. A draft
that cannot show its working is a draft that will state something confidently
wrong under your own name.

**Nothing here publishes.** These are drafts. You post them.

> Scaffolded by hand on 2026-08-30 as the graduation test for
> [`docs/concepts/working-in-public.md`](../docs/concepts/working-in-public.md).
> The skills that would normally write this folder do not exist yet.
