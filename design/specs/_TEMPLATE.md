# Spec — {screen / flow / component}

**Source:** {link} · **Version:** {file version, commit, or date — never omit}
**Status:** {draft | ready to build | built}

## Layout

{Structure, spacing, alignment. Reference tokens by name, not by value.}

## Tokens used

| Role | Token | Value |
|---|---|---|
| {…} | {…} | {…} |

{Only tokens that actually appear. If a value has no token, say so — that's a
finding for `../system/`, not a licence to hardcode.}

## States

| State | Behaviour |
|---|---|
| Default | {…} |
| Empty | {…} |
| Loading | {…} |
| Error | {…} |
| Disabled / read-only | {…} |
| Overflow — long strings | {…} |

{The states nobody draws are the ones that ship broken. Fill them all or write
`*(not specified)*` so the gap is visible.}

## Responsive

{Behaviour at each breakpoint, and what reflows.}

## Interaction & motion

{Trigger, what changes, duration, easing — and the reduced-motion fallback.}

## Accessibility

{Contrast, focus order, labels and roles, target sizes, keyboard path.}

## Open questions for engineering

- {What the design doesn't answer. **This section is why a spec beats a
  screenshot** — leave it empty only when it genuinely is.}

---

_Pinned to the source version above. When the source moves, this spec is stale
until re-pinned — say so rather than letting it quietly drift._
