# posts: separate the shippable template from the personal profile

- **Commit:** `dd8ab79b6f302d5981762d6e9eac952e521f47fc` (`dd8ab79`)
- **Author:** Claude
- **Date:** 2026-08-30

## Commit message

A captured voice is one person's register. Shipping it would hand every
installer someone else's defaults, which is worse than shipping no voice file at
all.

## Changes in detail

### `posts/VOICE.example.md`, `posts/CARD.example.md` (new) · `posts/VOICE.md`, `posts/CARD.md` (untracked)
- Splits what ships from what is personal. The `*.example.md` files carry the shape, the
  prompts for what to look for when capturing a voice, and the **banned-moves list** — the one
  part that legitimately ships, because it is the library's editorial stance rather than
  anyone's register.
- `VOICE.md` and `CARD.md` hold the captured profile and are **gitignored**, with the reason
  written into `.gitignore` so a later reader does not "fix" the omission as an oversight.

### `.gitignore` (+6) · `docs/concepts/working-in-public.md` (+20)
- Sets the same default for every installer: most repos a skill lands in are public or
  shared, and a profile of how someone writes should not be published by accident. Committing
  is offered as a real choice — it survives a fresh clone and lets a team share one voice —
  rather than assumed either way.
- Records the rule in the concept: **the skill ships a template, never a voice.** Same
  relationship `model-strategy` has to `docs/MODEL-STRATEGY.md` — the skill writes the file,
  the file is not the skill.
