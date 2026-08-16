# Explorations — What did we try?

**Question:** What did we try?
**Tense:** past
**Status:** history — includes everything killed
**Written by:** either
**Lifecycle:** **Append-only. A killed direction is never deleted** — that record is the point of the tier.

> ## ⚠ This folder is exempt from the concepts tier's lifecycle
>
> This directory sits inside [`docs/concepts/`](../README.md), whose declared status
> is *"hypothesis — future tense, **disposable**"* and whose README says *"Delete it
> or graduate it into a PRD."*
>
> **That does not apply here.** This folder is the **explorations tier of the design
> context stack**, declared by `skill:design-setup` in [`CLAUDE.md`](../../../CLAUDE.md),
> and it is **append-only**. The rejected landing-page directions below are the
> asset, not clutter.
>
> The two stacks are reconciled by this note and by a matching sentence in
> `skill:repo-setup`'s block. Without both, an agent reading the routing tables
> would conclude these files are simultaneously disposable and undeletable.
>
> Adopted rather than moved because the design stack is **additive-only**: it never
> moves, renames or deletes a file. See [ADR 0020](../../decisions/0020-design-gets-its-own-stack-not-a-shoehorn-into-docs.md).

## What's in here

| File | What it is | Tier |
|---|---|---|
| `index.html` | Landing-page direction — an early full draft | exploration |
| `index_1.html` | Landing-page direction — variant of the above | exploration |
| `agentic-skills-blueprint-draft.html` | The "Blueprint" direction: technical-drawing look, grid and corner-bracket frames, interactive schematic. **Killed** — see [ADR 0017](../../decisions/0017-the-website-design-direction-is-swiss-whitepaper.md) | exploration |
| `writing-for-machines-v8-present.html` | The talk deck the site's palette derives from | reference |
| `HANDOFF.md` | The talk's own handoff | *not an exploration* |
| `handoff-chat-to-code-2026-07-13.md` | The deck→repo handoff | *not an exploration* |

The two handoff files are **not** part of this tier. They predate the design stack and are left where they are — additive-only cuts both ways.

## What goes here

- One file or thread per exploration: the rounds of a direction, what each was testing, and the verdict.
- **Directions that were killed, with the reason.** This is the tier's whole purpose. Nothing else in a designer's toolchain stores it.
- Links to frames, versions and prototypes, recorded verbatim.

## What does NOT go here

- Why the winner won — that's [`design/decisions/`](../../../design/decisions/README.md). This tier holds *what we tried*; that one holds *why we chose*.
- What the problem was — that's `design/briefs/`.
- What shipped — that's `changelog/`, generated from git.

## Template

Copy `_TEMPLATE.md`. Run `/exploration-log` to append a round, or to ask whether something was already tried.
