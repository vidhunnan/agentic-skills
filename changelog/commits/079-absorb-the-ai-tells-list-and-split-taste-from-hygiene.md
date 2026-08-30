# feat(post-generator): absorb the AI-tells list, split taste from hygiene

- **Commit:** `801cab47f51e1d58938e8d54d880343259a2793c` (`801cab4`)
- **Author:** Claude
- **Date:** 2026-08-30

## Commit message

Absorbed as a dated snapshot rather than depended on, so drift is visible
instead of silent. Two rule lists where there had been one, because they were
never the same kind of rule.

## Changes in detail

### `skills/post-generator/references/ai-tells.md` (new, +101)
- The 35 AI writing patterns from [`blader/humanizer`](https://github.com/blader/humanizer)
  v2.11.2 (MIT), which derives them from Wikipedia's *Signs of AI writing*. Reworded
  rather than copied, grouped as content / language / style / chatbot residue / filler.
- Carries the upstream's **false-positive guard** too, which is the half that matters
  most here: over-applying the list flattens a voice into the same beige it exists to
  prevent. One em dash is not a tell. One short sentence is not a tell. **The tell is
  the pattern, never the word.**
- Header dates the absorption and says it is a snapshot, not a sync. **The drift is
  the cost of absorbing**, and a dated header is what makes it visible rather than
  discovered later.
- Fences its own scope: prose written to persuade a stranger. Not `SKILL.md`, not
  `CLAUDE.md`, not ADRs — that prose is written to instruct an agent, and its em
  dashes and triads are deliberate. **Pointed at this repo's docs the list would flag
  the writing as generated.**

### `posts/VOICE.example.md` (+27 / −6)
- The single **Banned moves** section splits in two. It had been carrying two
  different kinds of rule under one heading, which is why the override rule was
  ambiguous.
- **Banned moves — taste.** The library's editorial stance, and **overridable**: say
  so in your own voice file and your version wins. Em dashes stay here, because the
  override is real — your own samples turn the rule off.
- **AI tells — hygiene.** Identical for every installer and **not overridable**,
  because none of it is a matter of register. `No invented metrics` moves here from
  the taste list: a number appearing only when a source contains it is not a style
  preference.

### `skills/post-generator/SKILL.md` (+8 / −2)
- Step 4's precedence order gains a rank at the top: AI tells unconditionally, then
  banned moves, then `Stripped`, then `Carries over`. A `VOICE.md` override beats a
  banned move and never beats an AI tell.
- Instructed to read the reference **every run**, including *What not to strip* —
  the same idiom `version-manager` uses for `references/profiles.md`.

### `skills/post-setup/SKILL.md` (+4 / −4)
- Wording only. Four references to "the banned-moves list" now say two lists, since
  the template it writes carries both.

### `skills/post-generator/.claude-plugin/plugin.json`
- `0.1.0` → **`0.2.0`**. A minor: the skill applies a rule set it did not apply
  before, which changes what it does rather than how it reads.

### `website/public/skills/`
- `post-generator.zip` and `post-setup.zip` rebuilt, manifest rehashed. The zip
  carries `references/ai-tells.md`, verified — the whole design depends on the
  reference shipping with the skill rather than sitting beside it in the repo.

## Not done

- **No dependency on `blader/humanizer`.** Absorption was chosen over listing it in
  `marketplace.json` as a third-party plugin. The trade: no upstream updates, in
  exchange for one file this library owns and can ship to Claude.ai, where there is
  no plugin system to depend on at all.
- **No `voice-check` skill.** An audit pass over prose `post-generator` did not
  write is a defensible separate skill — the relationship `design-critique` has to
  `design-brief` — and was deliberately deferred rather than built alongside.
