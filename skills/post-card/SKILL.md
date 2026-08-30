---
name: post-card
description: Renders a post's visual plan into frames — one self-contained HTML file each at the platform's real dimensions, rasterised to PNG where a headless browser exists — from a card direction you chose, pre-filled from your design system where one exists. Proposes two or three treatments rather than deciding the look. Use when the user says "make the cards", "render the carousel", "make an image for this post", or runs /post-card. Claude Code primary; on Claude.ai it produces the HTML as a downloadable artifact.
when_to_use: 'Also fires on: "generate the post frames", "make the slides for this post", "render the post image", "make a card for this". It renders a plan and sets copy it is given; it writes no copy and chooses no composition — frame count and orientation come from post-generator, because they change the words. It never fabricates a chart, a metric or a screenshot.'
argument-hint: "[<post-slug>]"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, AskUserQuestion
disable-model-invocation: false
---

# post-card

Renders the visual plan into frames that read as one system, from a direction the
user chose rather than one the model invented.

Instagram and Threads are visual-first, so a family that only produces text is half
a skill there. The default alternatives are both bad: opening a design tool means
leaving the work and rebuilding the same layout every time, and letting a model
invent a look each post produces a feed where nothing matches, which is most of
what a card was for.

There is a subtler failure, and it is the dangerous one. **A frame is where a claim
stops being auditable.** Prose can carry a hedge; twelve words in 86-point type
cannot. A card will happily state as settled the exact thing the post's own
`Not claimed` section refused, and unlike the caption it travels — screenshotted,
reposted, separated from everything that qualified it.

Three rules govern this skill:

- **A frame may never say what the post declined to claim**, and where the post is
  unverified, unbuilt or inconclusive the frame carries that status visibly.
- **It proposes treatments; it does not choose the look.** Same rule as
  `design-language`, one level down.
- **It renders a direction, it does not iterate on one.** This is not a design tool
  and should not pretend to be.

## Instructions

### Step 0 — Detect your surface

Using **Bash availability**:

- **Claude Code** — Bash works and there's a real filesystem. Full flow, including
  rasterising.
- **Claude.ai** — no filesystem and no browser. Emit each frame's HTML as a
  **downloadable artifact**, and **say plainly that you could not rasterise it and
  could not verify the rendering** — in particular that text may overflow, which
  you cannot see. Don't error.

### Step 1 — Read the plan and the direction

- The post file's `## Visual plan` and `## Alt text`.
- `posts/CARD.md` for the direction — resolved via a CLAUDE.md declared path, an
  existing file, then canon.
- The post's `## Not claimed`, because it constrains what a frame may say.

**Where no plan file exists**, interview for what you lack: how many frames, what
each carries, which platform. Not every card starts life as a post. **Where no
`CARD.md` exists**, recommend `/post-setup` rather than inventing a look — and if
the user declines, use one restrained default and say plainly that it was not
chosen by them.

### Step 2 — Validate the plan against the copy

**Refuse to render a stale plan.** If the plan says four frames and the copy has
since been cut to two, the beats no longer match the words, and rendering either
version silently produces a carousel that argues with its own caption.

Report the mismatch and stop. Do not guess which side is current — that is the
failure you only discover after posting, which is the one time it cannot be fixed.

### Step 3 — Propose treatments

The plan says *frame 2 carries the move*. It does not say whether frame 2 is a
screenshot, a chart, a pull quote, a code block, or type on a flat ground.

| Treatment | When it fits |
|---|---|
| Type only | A reframe, a trade, a quotable line |
| Chart | A number that has a source |
| Screenshot | A before/after, a technique |
| Pull quote | Something said, attributed |
| Code | A technique that is literally code |

Offer **two or three**, and where one is obviously right offer one and say why.

**Treatment is chosen once for the run and held across every frame.** A carousel is
a sequence, not a set: frame 3 arriving in a different visual language than frame 1
reads as a mistake even when each frame is fine alone.

Where a frame calls for a screenshot, check `posts/material/assets/` — a snapshot
`post-export` captured is exactly what a before/after frame needs.

### Step 4 — Honour the direction

- **Tokens come from `CARD.md`**, inlined into each file.
- **Where the direction gives a colour a semantic role, honour it and never use
  that colour decoratively.** If the palette says an accent means *do not treat this
  as settled*, then using it for emphasis breaks the system — and using it correctly
  is how a frame can carry its own status without a sentence of disclaimer.
- **System font stacks with real fallbacks. No fonts fetched at render time.** The
  same file must rasterise the same way on a machine that is not this one, and a
  layout that depends on an exact font metric will not.

### Step 5 — Write the frames

One self-contained file per frame: `posts/cards/{slug}-{n}.html`.

```html
<!doctype html>
<meta charset="utf-8">
<title>Card — {slug}, frame {n}</title>
<style>
  :root { /* tokens from posts/CARD.md, values inline */ }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: {W}px; height: {H}px; }
  /* … */
</style>
{frame content}
```

Non-negotiable:

- **No external requests at render time.** No CDN, no fetched fonts, no remote
  images. Embed a raster as a `data:` URI or reference a local path that will exist.
- **Dimensions set explicitly on `html, body`**, matching the plan's platform.
  Never inferred from content.
- **One file per frame**, editable by hand, no build step and no dependency.

### Step 6 — Rasterise, and degrade honestly

Where a headless browser is available, render to `posts/cards/{slug}-{n}.png` at
the frame's exact size.

**Never install a browser.** If none is present, say so plainly and tell the user
to open the HTML and screenshot it. This is a supported outcome, not a failure —
the HTML is the deliverable and the PNG is a convenience.

**Where rasterising succeeded, look at the output.** Verify nothing is clipped or
overflowing. Long copy in a fixed frame fails silently, and the markup will not
tell you — only the pixels will.

### Step 7 — Report

Every path written, the alt text carried through, and anything that needs a human
eye. Where the plan had no alt text, write it and say that you did.

### Step 8 — Edge cases

- **Copy too long for the frame** — do not shrink the type until it fits. Say it
  does not fit and offer the two honest options: cut the words, or split the beat
  across two frames, which is a plan change and belongs to `post-generator`.
- **A frame calls for data you do not have** — never fabricate a chart, a number, a
  trend line or a screenshot. Propose a different treatment for that frame.
- **The post's `Not claimed` excludes something a frame would state** — the frame
  does not state it. Report the conflict rather than quietly softening it.
- **The post is unbuilt, unverified or inconclusive** — the frame carries that
  status visibly. A card that overclaims is the highest-consequence failure here,
  because it travels without its caption.
- **No `CARD.md`** — route to `/post-setup` (Step 1).
- **The user wants a different look per frame** — say what it costs and do it if
  they insist. A carousel that changes visual language mid-sequence reads as an
  error rather than as variety.
- **Split panorama requested** — supported, with a warning: it reads correctly only
  on a profile grid, is wrong by one pixel very easily, and looks broken in a feed.
- **Rasterising fails** — report the error and fall back to open-and-screenshot.
  Never leave the user with neither a PNG nor an explanation.
- **The user asks you to upload or post the frames** — decline plainly. Nothing in
  this family publishes.
