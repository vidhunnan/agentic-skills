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
| `VOICE.md` | How the posts sound. Not how this repo's docs sound. **Gitignored** |
| `CARD.md` | How the frames look. **Gitignored** |
| `*.example.md` | The committed templates. What the skill would actually ship |

## The rule that matters

Every factual claim traces to a source, and anything drafted from memory rather
than from the record is labelled `*(from conversation, not the record)*`. A draft
that cannot show its working is a draft that will state something confidently
wrong under your own name.

**Nothing here publishes.** These are drafts. You post them.

## Why two of these files are gitignored

`VOICE.md` and `CARD.md` are **personal profiles, not skill content.** A voice file
is one person's register, derived from their own writing; shipping it would hand
every installer someone else's defaults. So the skill writes them into your
project and ignores them by default, and offers to commit them if you want them
synced across machines or shared with a team.

What is committed is `VOICE.example.md` and `CARD.example.md` — the shape, with
the universal banned-moves list, and no one's evidence in them.

> Scaffolded by hand on 2026-08-30 as the graduation test for
> [`docs/concepts/working-in-public.md`](../docs/concepts/working-in-public.md).
> The skills that would normally write this folder do not exist yet.
