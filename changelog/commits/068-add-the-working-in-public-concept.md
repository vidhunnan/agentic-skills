# docs: add the working-in-public concept — an outbound skill family

- **Commit:** `38ac8748892b4b4cb6a971c85df488c1799d7748` (`38ac874`)
- **Author:** Claude
- **Date:** 2026-08-30

## Commit message

The library's first **outbound** concept. Every skill in it so far is inbound —
it reads the work and writes the record. This proposes the other direction: the
record, aimed at a reader.

Written into `docs/concepts/` rather than a PRD because nothing is committed. The
concepts tier is the honest home for a family that has not been tried once.

## Changes in detail

### `docs/concepts/working-in-public.md` (new, 197 lines)
- Names the tension the family has to survive and does not resolve it cheaply: this library's
  identity is **faithful, never generative**, and a social post is generative by nature. The
  proposed resolution is that the post is **sourced from the record, not from vibes** — it
  reads `changelog/`, `docs/decisions/` and the explorations tier, and every factual claim
  traces to a line in a source.
- Proposes four skills split by question, following how the design cluster splits.
- Records the **disclosure gate** as the risk most likely to be skipped and most expensive
  once: this library gets installed in repos that are not this one, the "nothing internal"
  rule protects only this repo by convention, and a drafting skill's whole job is moving
  information outward.
- Puts `posts/` **downstream of** the context stack rather than as a tier in it, with a
  declared tense of *derived — it cites the record, never a source*, so a post can never be
  cited as evidence something shipped.
- States the two things that would kill it, rather than only the case for it: that a post
  drafted from the record may not beat one drafted from memory, and that the honesty rules
  face a pressure here no other skill faces — an audience.
