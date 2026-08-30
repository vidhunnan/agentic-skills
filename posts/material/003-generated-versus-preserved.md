# Two ways to break a "no code" rule, and only one of them is defensible

Type: trade · Captured: 2026-08-30 · Status: unused
Expires: —
Sources: `docs/concepts/working-in-public.md` § the card, § snapshotting
Artifacts: *(none)*

## What happened

The library's front page says: all of it is Markdown, none of it is code. The new
family breaks that twice, and the two breaks looked identical until they were
written down side by side.

One **generates** an HTML card, because Instagram is visual-first and text-only
output would be half a skill there. One **preserves** a snapshot of a before-state,
because it is unrecoverable once overwritten.

The preserved one has the far stronger defence, and it is the same argument that
justifies keeping killed design directions: the artifact cannot be reconstructed
later, which is exactly why catching it is the job. The generated one is a
convenience.

## Why it's interesting to someone who wasn't here

Two exceptions to the same rule can have completely different strength, and
bundling them hides that. Write them as two and you can reverse one without
touching the other. Write them as one and the weak case rides in on the strong
one.

## What I'd have to check before posting it

- The "all Markdown, no code" line is quoted from this repo's README. Verify exact
  wording before quoting it publicly.
