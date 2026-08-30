# docs: graduate the concept into five PRDs

- **Commit:** `57e88c606baedf6efff0ec26e7dd6626172ec62f` (`57e88c6`)
- **Author:** Claude
- **Date:** 2026-08-30

## Commit message

The by-hand test passed, which was the stated gate. One PRD per skill, with
numbered requirements so later work can cite them.

## Changes in detail

### `docs/prds/post-{setup,export,angles,generator,card}.md` (new, 742 lines)
- Written **after** the test run rather than before it, which is what let three findings go
  in as specification instead of as speculation:
  - `post-generator`'s problem section names the **actual** overclaim produced in testing —
    five unbuilt skills described as shipped — rather than a hypothetical one. R3 to R6 exist
    to stop that specific failure.
  - `post-card` requires that a frame carry unverified status **visibly**, which came from the
    palette's semantic redline doing it by accident.
  - `post-setup` R4 and R5 exist because the author's samples and instructions contradicted
    each other: every trait cites its evidence count, and disagreements are recorded rather
    than silently resolved.
- `post-angles` records the doubt about its own existence in its **risk** section — that the
  typed backlog already does much of its surfacing, that the test run never reached it, and
  the specific condition under which it should be folded into `post-generator`. Testable at
  build time rather than an opinion in a chat log.

### `docs/concepts/working-in-public.md` (+10)
- Marks the concept **graduated**, stating that the PRDs win where they disagree, and keeps
  only the family-level argument no single PRD owns. Follows what `skill-library-expansion.md`
  already does rather than deleting the file.
