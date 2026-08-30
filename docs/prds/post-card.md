# PRD — post-card

Status: Draft v0.1 · Owner: Vidhunnan Murugan · Repo: vidhunnan/agentic-skills

## 1. Problem

Instagram and Threads are visual-first. A family that only produces text is half a
skill on the platforms the user named first.

The default alternatives are both bad. Reaching for a design tool means leaving the
work, rebuilding the same layout every time, and producing frames that drift apart
across a carousel. Letting a model invent a look each post means a feed where
nothing looks like it came from the same person, which is most of what a card is
for.

There is a subtler failure. **A frame is where a claim stops being auditable.**
Prose can carry a hedge; twelve words in 86-point type cannot, and a card will
happily state as settled the thing the post's own `Not claimed` section refused.

## 2. Goals

- Render the visual plan into frames that read as one system, from a direction the
  user chose rather than one the model invented.
- Propose **treatments** — how each frame reads — without deciding them.
- Produce a single self-contained file per frame, editable by hand, with no build
  step and no dependency.
- Degrade honestly where no browser is available, rather than failing.

## Non-goals (v1)

- **Deciding composition.** Frame count, orientation and what each frame carries
  are fixed by `post-generator`, because they change the copy.
- **Writing copy.** It sets the words it is given.
- **Fabricating a chart.** If a frame calls for data, the data comes from a source
  or the frame gets another treatment.
- **Publishing or uploading.**
- **Generating imagery.** No illustration, no photography, no generated art in v1.
- **Being a design tool.** It renders a direction; it does not iterate on one.

## 3. Primary user

Someone with a finished plan file who wants frames in two minutes and does not
want to open a design tool.

## 4. Core workflow

1. Detect surface. Read the plan file's `Visual plan` and `Alt text`, and `posts/CARD.md`.
2. Validate the plan against the copy — frame count, dimensions, and that each
   frame has a beat.
3. Propose two or three treatments for the run, held consistent across frames.
4. Render one HTML file per frame.
5. Rasterise to PNG where a headless browser is available.
6. Report the paths, the alt text, and anything that needs a human eye.

Where no plan file exists the skill interviews for what it lacks. Not every card
starts life as a post.

## 5. Output template

`posts/cards/{slug}-{n}.html` — one self-contained file per frame: inline CSS,
exact pixel dimensions on `html, body`, no external requests, no fonts fetched at
render time.

```html
<!doctype html>
<meta charset="utf-8">
<title>Card — {slug}, frame {n}</title>
<style>
  :root { /* tokens copied from posts/CARD.md, values inline */ }
  html, body { width: {W}px; height: {H}px; }
  /* … */
</style>
{frame content}
```

`posts/cards/{slug}-{n}.png` alongside it where rasterisation succeeded.

### Treatments

| Treatment | When it fits |
|---|---|
| Type only | A reframe, a trade, a quotable line |
| Chart | A number that has a source |
| Screenshot | A before/after, a technique |
| Pull quote | Something said, attributed |
| Code | A technique that is literally code |

## 6. Functional requirements

| ID | Requirement | Surface |
|---|---|---|
| R1 | Each frame MUST be one self-contained file with no external requests at render time. | Claude Code |
| R2 | Dimensions MUST match the plan's stated platform, set explicitly rather than inferred from content. | Claude Code |
| R3 | The skill MUST refuse to render where the plan's frame count no longer matches its copy, and MUST report the mismatch rather than rendering either version. | Claude Code |
| R4 | Treatment MUST be held consistent across every frame in a run. | Claude Code |
| R5 | The skill MUST propose two or three treatments and MUST NOT choose for the user; where one is obviously right it MUST offer one and say why. | Claude Code, Claude.ai |
| R6 | The direction MUST come from `posts/CARD.md`, pre-filled from `design/system/` or a `design-language` output where one exists. The skill MUST NOT invent a look where a direction exists. | Claude Code |
| R7 | Where the direction assigns colours a semantic role, the skill MUST honour it and MUST NOT use those colours decoratively. | Claude Code |
| R8 | The skill MUST NOT fabricate data, a chart, a metric, or a screenshot. A frame needing data it does not have MUST get a different treatment. | Claude Code, Claude.ai |
| R9 | Where the post's `Not claimed` excludes a fact, no frame may state it. | Claude Code, Claude.ai |
| R10 | Where the post is unverified, unbuilt or inconclusive, the frame MUST carry that status visibly rather than presenting the claim as settled. | Claude Code, Claude.ai |
| R11 | Rasterisation MUST be attempted where a headless browser is available, and where none is the skill MUST say so plainly and instruct the user to open and screenshot. It MUST NOT fail. | Claude Code |
| R12 | The skill MUST NOT install a browser or any other dependency. | Claude Code |
| R13 | Alt text MUST be carried through from the plan and reported with the frames. Where the plan has none the skill MUST write it. | Claude Code, Claude.ai |
| R14 | Text MUST NOT overflow or clip at the stated dimensions. The skill MUST verify this on the rendered output where rasterisation succeeded. | Claude Code |
| R15 | On Claude.ai the skill MUST emit the HTML as a downloadable artifact and MUST state that it could not rasterise or verify the rendering. | Claude.ai |

## 7. Success criteria

- Frames render first time at the right dimensions with nothing clipped.
- A carousel reads as one sequence rather than five separate cards.
- The user restyles a frame by editing one file, without a build step.
- A card never asserts something the post itself declined to claim.
- On a machine with no browser, the skill still produces usable output.

## 8. Risks

- **A card that overclaims.** The highest-consequence failure, because a frame is
  screenshotted and travels without its caption. Mitigation: R9 and R10, and the
  by-hand test showed a design system with semantic colour roles can carry the
  status in the visual language itself.
- **Stale dimensions.** A wrong aspect ratio looks correct locally and crops wrong
  in the feed. Mitigation: dimensions live in `CARD.md` with an explicit
  verify-before-shipping note.
- **Overflow.** Long copy in a fixed frame silently clips. Mitigation: R14, and
  checking the raster rather than trusting the markup.
- **Widening the library past Markdown.** Real, and worth stating rather than
  discovering. The defence is a single static file with no build step and no
  dependency, which is closer to a document than to an application.
- **Rendering environment drift.** Fonts differ between machines, so the same file
  rasterises differently. Mitigation: system font stacks with real fallbacks, no
  fetched fonts, and no layout that depends on an exact metric.

## 9. Open questions for v2

- Should split-panorama composition be supported, given it only reads correctly on
  a profile grid and is trivial to get wrong by one pixel?
- Should a screenshot treatment be able to pull a snapshot from
  `material/assets/` automatically, rather than being handed a path?
- Is a preview contact sheet of all frames worth generating, or is opening the
  files enough?
- Should the skill ever propose a direction where `CARD.md` is absent, or always
  route to `/post-setup`?
