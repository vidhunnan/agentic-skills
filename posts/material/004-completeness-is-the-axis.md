# Two documents about the same session, and the difference is completeness

Type: reframe · Captured: 2026-08-30 · Status: unused
Expires: —
Sources: `docs/concepts/working-in-public.md` § positions; `docs/prds/handoff-generator.md`
Artifacts: *(none)*

## What happened

A new skill that reads a work session and writes down what happened looked like a
duplicate of an existing skill that reads a work session and writes down what
happened. The overlap sat open as a risk for most of the brainstorm.

The distinction is not subject matter. It is completeness, and it is visible in
how each one fails. A handoff is state-oriented and complete: it briefs whoever
picks the work up, including the dull parts. An export is reader-oriented and
selective: only what someone who was not there would find interesting.

A handoff that omits boring-but-necessary context is broken. An export that
includes it is useless.

## Why it's interesting to someone who wasn't here

The useful move is testing two overlapping things by their failure modes rather
than their contents. Same inputs, same shape of output, opposite definitions of
wrong. That is two tools.

## What I'd have to check before posting it

- Both skills are described here. One exists and one does not, and the post must
  not imply otherwise.
