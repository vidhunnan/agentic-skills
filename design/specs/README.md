# Specs — What is it, exactly?

**Question:** What is it, exactly?
**Tense:** imperative
**Status:** spec — pinned to a source version
**Written by:** either
**Lifecycle:** Stale when the source moves. Always say **which version** it describes; a spec that doesn't name its source version is a spec nobody can trust.

The implementable description of a design: what an engineer needs that a picture doesn't carry.

A frame shows the happy path at one width. A spec carries the states nobody drew — empty, loading, error, permission-denied, offline, the long name that wraps, the zero case — plus the tokens actually used and the behaviour at every breakpoint.

## What goes here

- One file per screen, flow or component being built: `design/specs/<slug>.md`.
- Source link **and version**, layout and spacing, tokens used, every state, responsive behaviour, interaction and motion, edge cases, accessibility notes.
- **Open questions for engineering** — the things the design doesn't answer yet. This section is why a spec beats a screenshot.

## What does NOT go here

- Why the design is like this — that's `../decisions/`.
- Reusable definitions — a component's canonical anatomy is `../system/`. A spec *uses* the system; it does not redefine it.
- Rounds of iteration — that's the explorations tier.

## Template

Copy `_TEMPLATE.md`.
