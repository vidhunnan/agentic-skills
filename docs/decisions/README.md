# Decisions — Why did we choose that?

**Question:** Why did we choose that?
**Tense:** past
**Status:** truth (of intent)
**Written by:** human
**Lifecycle:** **Append-only.** Never rewrite a decision — supersede it, or append to its `## Follow-up`.

The meeting you missed. Each file records a choice that was actually made, the alternatives that lost, and what it cost. This is the tier that answers "why is it like this?" six months later, when everyone who knew has forgotten.

Run `/decisions-logger` to mine the project for decisions not yet logged.

## What "append-only" means, exactly

The **frozen** region of an ADR is its reasoning: Context, Decision, Alternatives, Consequences. That is the record of what was thought at the time, and it never changes.

**Exactly two mutations are ever permitted:**

1. **The `**Status:**` line** — repointed when the decision is superseded. This is a *navigational* pointer, not history: a superseded ADR still reading "Accepted" is lying to the next reader. Updating a pointer isn't rewriting the past; refusing to is hiding it.
2. **An append under `## Follow-up`** — dated, evidence-cited entries recording that the world moved. The decision text stays frozen; what you learned accumulates below it.

The authoritative forward link lives in the append-only Follow-up entry; the Status line is a derived cache of it. So nothing load-bearing depends on the one edit we allow.

## What goes here

- Architectural choices: why Next.js and not Vite; why markdown and not a database.
- Process choices: why `prod-stable` is the default branch; why enforcement is CLAUDE.md-based and not hook-based.
- Any choice you'd otherwise have to re-litigate because nobody remembers the reasoning.

## What does NOT go here

- Options you're still weighing — that's `../concepts/` or `../prds/`.
- What a change *did* — that's `../../changelog/`.
- A decision you've changed your mind about. **Do not rewrite it.** Write a new decision that supersedes it and links back. The record of having been wrong is part of the record.

## Template

Copy `_TEMPLATE.md`. Number decisions sequentially: `0001-use-markdown-not-a-database.md`. **`0000` is reserved** for `0000-not-logged.md`, the ledger of candidates the log deliberately does *not* contain — so a re-run doesn't propose them again forever.
