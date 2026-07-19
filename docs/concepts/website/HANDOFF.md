# HANDOFF.md — "Writing for Machines" Talk

```
project:   Claude Community BLR talk — memory, context & agents
speaker:   Vidhunnan Murugan ("Vids") — Lead Product Designer, Keka HR
status:    Deck v2 built (structure + design locked) · real assets pending
deadline:  Deck to organizers by Friday evening / Saturday morning
handoff:   From prior chat → any new session. Everything below is
           separated into DECIDED (truth) and OPEN (hypothesis) —
           per the talk's own discipline.
```

---

## 1 · The event (facts)

- **What:** Claude/AI community event in Bangalore (referred to as "BLR5"). Theme: **memory, context & agents**.
- **Who runs it:** Arush and Ayush (co-organizers) with **Vikram** — official Anthropic Claude ambassador (London, one of three; currently on his second India leg).
- **Venue:** Viva / Roshni Tech Hub, Marathahalli side. Organizers said the venue *might* move due to interest — they'll inform.
- **Audience:** technical, developer-focused. Explicitly *not* a design crowd.
- **Slot:** ~10 minutes. Organizers' recommended shape: first ~2 min = what you built; the rest = how it works, the workflow, why it's impactful, and learnings.
- **Organizers' explicit briefs (from the July 8 call):**
  1. The event is about memory/context/agents, *not* design — design is fine as the use case, not the payload.
  2. Free to go deep/technical — this specific event wants it.
  3. **"What worked and what didn't, and why" is the gold.** They said this repeatedly.
  4. More than one tool/use case is fine **if it's one aligned story**.
  5. Send deck/materials in advance so they can brief Vikram.
- **Personal stake:** Vids has dropped out of past speaking slots last-minute and felt terrible about it; he's committed to this one.

---

## 2 · The talk (all DECIDED)

### Title
**"Writing for Machines: The Non-Coder's Context Stack"**

- "The Wrong Person to Give This Talk" was considered as a title → demoted to **slide 2** (the disarm beat).

### Thesis (one paragraph)
An LLM/agent (Claude Code etc.) is not a tool — it's **a teammate with amnesia**. Vids can't write code, so the only lever he had was communication: he onboards agents the way his engineers onboard humans — changelogs, PRDs, decision logs, handoff docs. The entire context stack is **markdown and text files, zero code**. The code is generated; the context is authored. That discipline — not coding ability — is what made him fast.

### The spine: Done vs. Explored
The single anchor idea. **Changelog = what's done/shipped (truth, past tense, auto-written per commit). PRDs/docs = what's being explored (hypothesis, future tense, hand-written, disposable).** Mixing them = handing a teammate contradictory instructions. A human pushes back; an agent agrees confidently in both directions (hallucination). This came from a live question by Ayush in the organizer call and got the strongest reaction — it's the beat to spend the most time on.

### The threads woven through
1. **Journey, not tool-tour** — the story crosses many tools; each tool is evidence, not the subject.
2. **Designer taught by engineers** — his engineers *actively taught him and pointed him in the right direction* (important nuance: not "he watched and copied"). Spoken echo on slide 12: *"They pointed me in the right direction → I pointed it at a machine."*
3. **Documentation methods vary by purpose** — each file type answers a different question a human teammate would ask.
4. **Context = .md, never code** — makes the title literal.

### The narrative arc (9 beats)
1. **Title** → 2. **Disarm** ("The wrong person to give this talk") → 3. **Who** (identity arc + motto) → 4. **Receipts ×3** (escalating: projects wall → GitHub graphs → Docker+npm punchline) → 5. **Tie-back thesis line** → 6. **The problem** (tool-hop map: "every arrow is a re-briefing") → 7. **Turn + reframe** (communication limit; teammate with amnesia) → 8. **The system** (attribution → docs/ tree → .md slide → doc-types table → done-vs-explored → handoff) → 9. **What broke → lesson → close**.

### Key copy (locked lines — quote exactly)
- Identity arc: **"Designer → Systems → Toolmaker. Building tools w/ AI."**
- Motto: **"If something bugs you, build a helper."** (both carried from the Keka deck)
- Receipts punchline: *"And recently — into places I have no business being."*
- Thesis: *"An npm package is documentation for a developer who'll never talk to you. A context file is documentation for an agent that'll never **remember** you. Same skill. Practice acquired in the wrong order."*
- Tool-hop: *"Six tools. Zero shared memory. **Every arrow is a re-briefing.**"*
- The turn: *"I wasn't hitting a ~~coding~~ limit. I was hitting a **communication** limit."*
- The reframe: *"An agent isn't a tool. It's a **teammate** with amnesia."*
- Attribution: *"My engineers taught me — pointed me in the right direction. I pointed it at a machine."*
- Stack caption: *"No code in it. All context."* / *"My whole context stack is markdown. There is no code in it."*
- Failure caption: *"I didn't fix it with a better prompt. I fixed it by writing down the one fact it never had: **[500] is base.**"*
- Lesson: *"Don't prompt louder. **Re-brief it.**"*
- Close: *"You spend your day making the code better. I spent mine making the **briefing** better. The agent got faster. The code got easier. None of it was a coding problem."*
- Colophon (slide 23): *"Drafted in markdown. Slides generated; briefing written by hand. This deck contains no code — which is rather the point."*

---

## 3 · Evidence & tools referenced in the talk

| Tool / asset | Role in the talk | Notes |
|---|---|---|
| **Reviz** (reviz.tools) | npm receipt + running example | Visual iteration canvas for vibe-coders; compares visual changes in code like a Figma canvas; recently published as an **npm package** |
| **YouTube transcript extractor** | Docker receipt + best on-theme anecdote | **Docker image**, recently released. Origin story: *Claude can't reach YouTube, so he built it a way in* — literally bridging a context gap for the agent |
| **Color Lab / Advanced Color Curve Lab** | The failure story (§07) | OKLCH palette generator w/ WCAG scoring. The bug: palette index kept inverting; an hour of re-prompting failed; fixed by writing down the missing fact — index runs 50→1000, **[500] is base**. A briefing gap, not a code bug |
| **Token processor** | One-line evidence it generalizes | Figma tokens JSON → CSS/React/Flutter |
| **docs/ folder tree** | The money slide (§05) | decisions/ · development-notes/ · session-notes/ · changelog · README — screenshot exists in the Keka deck (Cursor sidebar) |
| **GitHub graphs** (2024 sparse vs now dense) | Receipt 2 | *"Same person. Same zero coding ability. What changed was how I write to the machine."* |
| **Vercel projects wall** | Receipt 1 | The grid of shipped tools |
| **Keka deck** ("From Design Exploration to Deployment", Keka internal, July 16) | Asset source | Contains most reusable screenshots; its black/lime style was deliberately **not** carried into the new deck |

Tool-hop sequence for the map slide: **Claude Artifacts → ChatGPT → Claude → PRD → Lovable → Cursor → Claude Code/CLI.**

---

## 4 · The deck (current state)

**File:** `writing-for-machines-v2.html` — single self-contained HTML deck.
(A superseded v1 exists in the old black/lime style; ignore it.)

### Mechanics
- Fixed **1280×720 px canvas**, scaled to the window with one `transform: scale()` — nothing reflows; all values in px. *Keep this approach for any edits; viewport-unit typography was the source of v1's bugs.*
- Navigation: arrow keys / space / PageUp-Dn; Home/End; on-screen ‹ › buttons.
- **N** toggles speaker notes (bottom-left; each note says what the slide is *for*, not what it says).
- Cobalt progress bar top; folio "NN / 23" per slide.
- Fonts via Google Fonts: **Newsreader** (display serif), **Archivo** (Swiss structure), **IBM Plex Mono** (annotations/code).

### Design system — "The Field Report"
Editorial magazine feature × Swiss grid × markdown redlines. Chosen deliberately over the black/acid-lime "AI deck" default (and over cream/terracotta).

| Token | Value | Use |
|---|---|---|
| paper | `#F3F2ED` | base background (17 slides) |
| paper-2 | `#ECEBE4` | figure-plate fill |
| ink | `#16160F` | text |
| **cobalt** | `#2743C8` (`#9FAEFF` on dark) | structure, truth, § marks, arrows, chips, TRUTH stamp |
| **redline** | `#D0361B` | hypothesis, failure, strike-through, hop arrows, HYPOTHESIS stamp |
| dark | `#0F0F0B` | 6 statement slides |

Signature elements: masthead band on every slide ("WRITING FOR MACHINES · §06 / done vs. explored"), hairline rules, folio numbers, screenshots as numbered **figure plates** (FIG. 01…), mono `//` list markers, italic-mono margin annotations, tilted **TRUTH / HYPOTHESIS stamps** on slide 16, magazine **colophon** on 23.

**Everything is left-aligned** (explicit user request — including the dark statement slides, hop map, verdict, and figure-plate placeholders).

Dark slides (the "beat drops"): **02, 07, 10, 11, 18, 21.**

### Slide inventory (23)

| # | §  | Slide | Bg | Asset slot |
|---|----|-------|----|-----------|
| 01 | §00 | Cover — "Writing for machines." + subline + margin anno "// a field report from the wrong side of the repo" | paper | — |
| 02 | §00 | Disarm — "The wrong person to give this talk." | dark | — |
| 03 | §00 | Who — name, **arc**, **motto** (cobalt-rule pull-quote); Keka·Decode in footer | paper | FIG. 01 headshot |
| 04 | §01 | Receipts 1 — projects wall | paper | FIG. 02 |
| 05 | §01 | Receipts 2 — GitHub 2024 vs now | paper | FIG. 03a/b |
| 06 | §01 | Receipts 3 — Docker + npm (punchline) | paper | FIG. 04a/b |
| 07 | §01 | Tie-back thesis statement | dark | — |
| 08 | §02 | Contract — 3 `//` rows (no "won't teach you to code" apology — removed by request) | paper | — |
| 09 | §03 | Tool-hop map — eyebrow "one project · six surfaces" (⚠ verify wording) | paper | — |
| 10 | §03 | The turn — coding struck in red / communication in cobalt | dark | — |
| 11 | §04 | The reframe — teammate with amnesia | dark | — |
| 12 | §04 | Attribution — taught me / pointed me → pointed it | paper | — |
| 13 | §05 | The stack — docs/ tree | paper | FIG. 05 |
| 14 | §05 | Context is .md — chips: `.md .txt README CHANGELOG` vs struck `.tsx .ts .py .css` | paper | — |
| 15 | §05 | Doc types table — file → question → human equivalent (5 rows) | paper | — |
| 16 | §06 | **Done vs Explored** — TRUTH/HYPOTHESIS stamped cards + verdict (ANCHOR — most airtime) | paper | — |
| 17 | §06 | Handoff — Agent 1 → `HANDOFF.md` → Agent 2 | paper | — |
| 18 | §07 | "What broke." | dark | — |
| 19 | §07 | The story — Color Lab failure screenshots | paper | FIG. 06a/b |
| 20 | §07 | Lesson — "Don't prompt louder. Re-brief it." | paper | — |
| 21 | §08 | The close | dark | — |
| 22 | §09 | Q&A — "Letters to the editor" | paper | — |
| 23 | §10 | Thanks + colophon | paper | — |

---

## 5 · Assets still needed (drop into the dashed FIG plates)

1. **FIG. 01** — headshot (portrait plate, slide 03)
2. **FIG. 02** — Vercel projects wall (from Keka deck)
3. **FIG. 03a/b** — GitHub contribution graphs, 2024 and current
4. **FIG. 04a** — Docker Hub page for the YouTube transcript extractor
5. **FIG. 04b** — npm page for reviz
6. **FIG. 05** — docs/ folder tree screenshot (Cursor sidebar, in Keka deck)
7. **FIG. 06a/b** — Color Lab failure screenshots ("The problem" + "Still 🥲", both in Keka deck)

When real images go in: replace each `.fig` placeholder's inner content with an `<img>` (keep the `FIG. NN` label); dark screenshots sit well on the paper plates.

---

## 6 · OPEN — hypotheses & unfinished business (do not treat as decided)

- **⚠ Slide 09 eyebrow:** currently "one project · six surfaces." "Eighteen months" was wrong (user corrected). Actual timeframe not yet supplied — confirm with Vids.
- **Q&A contact handles** on slide 22 (`github.com/vidhunnan · @vidhunnan`) — placeholders, verify.
- **Concrete engineer anecdote for slide 12** — requested twice, not yet provided. One real "my architect insisted on X" moment would significantly strengthen the beat.
- **Margin annotations on dark statement slides** — offered (whitespace pools right after left-alignment; e.g. `// everything after this is onboarding` on slide 11). Not yet approved.
- **Live repo demo vs slides-only** — raised, never decided. 30s of real changelog on screen would land hard with this crowd.
- **PDF export for organizers** — they need materials in advance; the HTML deck may need a PDF render.
- **Timing rehearsal** — 23 slides in 10 min ≈ 26s/slide; fine because 6 are single-line statements, but the anchor (16) and failure story (19) need protected time. Not yet rehearsed.
- **Performance notes already in speaker notes:** 2s silence on slide 02; read the motto aloud on 03; optional callback at 13 ("re-explaining bugged me, so I built a helper — the helper was markdown").

---

## 7 · Working with Vids (for the next session)

- **Brainstorm before building** — he explicitly asks for it; present options with trade-offs, let him pick, then execute. He often picks by combining options ("2 + 3 → bit of 1").
- Concise but structured: headings, tables, bullets. Real examples over abstractions. Professional with playful energy for community content.
- He corrects specifics fast (timeline, attribution nuance) — treat every factual claim in the deck as his to verify.
- Deck edits: preserve the fixed-canvas system; never reintroduce viewport-unit type or negative-margin layouts.
- He thinks in the talk's own vocabulary now — "done vs explored," "re-briefing," "receipts" — use it.

## 8 · Suggested next steps (in order)

1. Collect the 8 assets (§5) and swap them into the FIG plates.
2. Resolve the ⚠ items in §6 (timeline wording, handles, anecdote).
3. Rehearse once against a 10-min timer; trim if 16/19 feel squeezed (slide 20 is the designated first cut — 15+18/19 carry the same lesson).
4. Export/print to PDF and send to Arush & Ayush by Friday evening.
