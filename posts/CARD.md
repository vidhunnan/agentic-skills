# Card direction

**Status: PRE-FILLED, NOT CONFIRMED.** Derived from `design/system/palette.md` and
`design/system/language-website.md`, which is what `post-card` is meant to do when a
design system exists. The author has not confirmed it.

## Direction

Ink on paper. One hairline rule. Heavy whitespace. The frame holds one idea and
does not decorate it.

## Tokens

Taken from `design/system/palette.md` (light), unchanged.

| Role | Token | Value |
|---|---|---|
| Ground | `--paper` | `#f3f2ed` |
| Recessed | `--paper-2` | `#ecebe4` |
| Figure | `--ink` | `#16160f` |
| Secondary | `--ink-soft` | `#4e4e45` |
| Meta | `--mute` | `#6b6b60` |
| Structure, truth | `--blue` | `#2743c8` |
| Hypothesis, failure | `--red` | `#bf3018` |

**The accents carry meaning and are not decoration.** Cobalt means *this is
verified, rely on it*. Redline means *do not treat this as settled*. A card that
uses either for emphasis alone breaks the system.

## Frame sizes

| Platform | Size |
|---|---|
| Instagram, Threads | 1080×1350 |
| X | 1200×675 |
| LinkedIn | 1200×627, or 1080×1350 for document posts |

**Verify these before shipping the skill.** They drift, and a stale ratio looks
fine locally and crops wrong in the feed.

## Consistency

Treatment holds across every frame in a carousel. Frame 3 does not arrive in a
different visual language than frame 1.
