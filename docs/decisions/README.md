# Decisions — Why did we choose that?

**Question:** Why did we choose that?
**Tense:** past
**Status:** truth (of intent)
**Written by:** human
**Lifecycle:** **Append-only.** Never edit a decision — supersede it with a new one that links back.

The meeting you missed. Each file records a choice that was actually made, the alternatives that lost, and what it cost. This is the tier that answers "why is it like this?" six months later, when everyone who knew has forgotten.

## What goes here

- Architectural choices: why Next.js and not Vite; why markdown and not a database.
- Process choices: why `prod-stable` is the default branch; why enforcement is CLAUDE.md-based and not hook-based.
- Any choice you'd otherwise have to re-litigate because nobody remembers the reasoning.

## What does NOT go here

- Options you're still weighing — that's `../concepts/` or `../prds/`.
- What a change *did* — that's `../../changelog/`.
- A decision you've changed your mind about. **Do not edit it.** Write a new decision that supersedes it and links back. The record of having been wrong is part of the record.

## Template

Copy `_TEMPLATE.md`. Number decisions sequentially: `0001-use-markdown-not-a-database.md`.
