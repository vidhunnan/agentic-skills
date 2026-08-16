# Palette

**Status:** in use · **Since:** 2026-07-19 (light), 2026-08-16 (dark)
**Decision:** [0003](../decisions/0003-the-site-follows-the-system-colour-scheme.md) — dark · [ADR 0017](../../docs/decisions/0017-the-website-design-direction-is-swiss-whitepaper.md) — the direction

## What it is

Six colour tokens plus two hairlines and two scrims, defined in
`website/app/globals.css`. Derived from the talk deck's Field Report system, pared
down: a paper ground, ink as figure, and **two accents used sparingly** — cobalt for
structure and truth, redline for hypothesis and failure.

The system is ink-on-ground with one hairline rule and heavy whitespace. The
palette serves that; it is not the direction itself.

## Anatomy

Every value clears **WCAG AA (4.5:1)** against its own ground. Ratios are computed,
not estimated — see the verification note below.

### Light — ground `--paper` `#f3f2ed`

| Token | Value | Ratio | Role |
|---|---|---|---|
| `--paper` | `#f3f2ed` | — | the ground |
| `--paper-2` | `#ecebe4` | — | recessed blocks: code, install commands |
| `--ink` | `#16160f` | 16.21:1 | body and headings |
| `--ink-soft` | `#4e4e45` | 7.49:1 | intros, descriptions, secondary prose |
| `--mute` | `#6b6b60` | 4.81:1 | eyebrows, numbers, meta, nav default |
| `--blue` | `#2743c8` | 6.88:1 | structure, truth, links |
| `--red` | `#bf3018` | 5.13:1 | hypothesis, failure, the honest gap |

### Dark — ground `--paper` `#14140f`

Re-lit, **not inverted**. A mechanical swap puts cobalt at 1.90:1 and the redline at
2.90:1 — an inaccessible page. Both accents are lifted.

| Token | Value | Ratio | Role |
|---|---|---|---|
| `--paper` | `#14140f` | — | the ground |
| `--paper-2` | `#1c1c16` | — | recessed blocks |
| `--ink` | `#edece4` | 15.59:1 | body and headings |
| `--ink-soft` | `#b3b2a6` | 8.65:1 | secondary prose |
| `--mute` | `#85857a` | 4.96:1 | meta |
| `--blue` | `#8fa2ff` | 7.72:1 | structure, truth, links |
| `--red` | `#ff8a6d` | 8.01:1 | hypothesis, failure |

### Non-colour tokens

| Token | Role |
|---|---|
| `--rule` / `--rule-soft` | the one hairline system — borders, dividers. Alpha on ink, so they follow the ground |
| `--scrim` / `--scrim-solid` | the sticky nav's translucent background. **Derived tokens, not literals** — the nav previously hardcoded `--paper` as rgba twice and would desync from any palette change |

## When to use it

- `--ink` for anything a reader must read. `--ink-soft` for supporting prose.
- `--blue` for links, and for the **Truth** and **Evidence** trust levels — it means
  *this is verified, rely on it*.
- `--red` for **Proposal** and **Hypothesis** trust levels, and for the one Proof
  receipt whose rationale was never recorded. It means *do not treat this as
  settled*.

## When **not** to use it

- **Never use `--mute` for anything a reader needs.** It is the weakest token that
  clears AA and every current use is small text. If content matters, it is
  `--ink-soft` or darker.
- **Never add a colour without computing both ratios.** `--mute` shipped at 3.08:1
  and `--red` at 4.43:1 — both failing — because they were picked by eye. Two
  palettes means every new value is two checks.
- **Never use `--red` decoratively.** It carries a meaning in this system —
  hypothesis, failure, the unrecorded reason. Using it for emphasis destroys the
  signal.
- **Never hardcode a palette value in a component.** Use the token, or add a derived
  one (`--scrim` exists for exactly this reason).

## Verification

```
python3 - <<'PY'   # WCAG 2.x relative luminance
def lin(c):
    c/=255
    return c/12.92 if c<=0.03928 else ((c+0.055)/1.055)**2.4
def L(h):
    h=h.lstrip('#'); r,g,b=(int(h[i:i+2],16) for i in (0,2,4))
    return 0.2126*lin(r)+0.7152*lin(g)+0.0722*lin(b)
def ratio(a,b):
    la,lb=L(a),L(b); hi,lo=max(la,lb),min(la,lb)
    return (hi+0.05)/(lo+0.05)
PY
```

Run it against both grounds whenever a token changes. Body text ≥ 4.5:1; large text
and UI boundaries ≥ 3:1.
