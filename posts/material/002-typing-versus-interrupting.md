# Requiring structure at capture time is what stops capture happening

Type: trade · Captured: 2026-08-30 · Status: unused
Expires: —
Sources: `docs/concepts/working-in-public.md` § post-export; this session
Artifacts: *(none)*

## What happened

Two requirements landed in the same design and contradicted each other. Every
captured item must carry a type, because the type is what tells the drafting skill
how the post breaks into frames. And capture must be able to fire mid-work, the
moment something lands, because that is when the material is freshest.

A typing prompt in the middle of work is the interruption that gets a feature
switched off. Resolved by splitting them: mid-session capture writes the item
untyped and gets out of the way, and typing happens at the end of the session.

**Given up:** the type is assigned later, when the understanding is already
degraded, rather than at the moment it was sharpest.

## Why it's interesting to someone who wasn't here

The general shape is that a capture tool competes with the work it captures, and
loses every time. Any structure you demand in the moment is structure you will not
get. So the moment takes the write, and the structure comes after.

## What I'd have to check before posting it

- Untested. This is a design position from a brainstorm, not an observed result.
