# AI tells — the hygiene list

**Absorbed 2026-08-30 from [`blader/humanizer`](https://github.com/blader/humanizer)
v2.11.2 (MIT), which derives them from
[Wikipedia: Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing),
maintained by WikiProject AI Cleanup. A snapshot, reworded — not a sync.**

Nothing here updates itself. If the upstream list moves materially, this file is
re-absorbed deliberately and the date above changes. That is the trade taken when
this was absorbed instead of depended on; see `docs/decisions/`.

## What this is, and what it is not

Two different lists govern a draft, and conflating them is why voice rules get
ignored.

- **Banned moves** in `posts/VOICE.md` are **taste** — this library's editorial
  stance. A user can override any of them by saying so in their own voice file.
- **This file** is **hygiene** — the tells that mark prose as unedited model
  output. It is identical for every installer and **not overridable**, because
  none of it is a style preference. "Don't invent a source" is not a matter of
  register.

**Scope: prose written to persuade a stranger.** Post copy, captions, frame text.
**Not** `SKILL.md` files, `CLAUDE.md`, ADRs, changelog entries or PRDs — that prose
is written to instruct an agent and a reader evaluating a skill, where emphasis and
rhythm are load-bearing. Pointed at the docs, this list flags deliberate writing.

## Content

1. **Inflated importance** — an ordinary fact framed as a turning point. *stands as, is a testament to, marks a pivotal moment, underscores its significance, evolving landscape, indelible mark.* State the fact.
2. **Name-dropping** — publications and follower counts listed to prove someone matters. Keep a citation that says what was said and where; cut the rest.
3. **Shallow `-ing` tails** — a simple fact given depth it doesn't have. *…highlighting the, …reflecting the community's, …ensuring, …fostering.* End the sentence.
4. **Sales language** — *boasts, vibrant, nestled, in the heart of, breathtaking, renowned, must-visit, commitment to.* Describe the thing.
5. **Vague sources** — *experts argue, observers have cited, industry reports, some critics say.* Name the real source or cut the claim. Never invent one.
6. **Stock challenges / outlook sections** — *Despite its… faces several challenges, Future Outlook.* Cut, or replace with a specific fact from a source.

## Language

7. **Overused AI words** — *actually, additionally, crucial, delve, enhance, fostering, garner, highlight, interplay, intricate, key, landscape, pivotal, quietly, showcase, tapestry, testament, underscore, valuable, vibrant.* Tell by their density, not one appearance.
8. **Avoiding is / are / has** — *serves as, stands as, represents, boasts, features, offers.* Use the plain verb.
9. **"Not X but Y" and clipped negatives** — *it's not just X, it's Y*; *…, no guessing.* Write the clause.
10. **Forced triads** — three items because three sounds complete. Use the number of items there are.
11. **Synonym cycling and repeated openings** — renaming the same subject to avoid repetition, or four sentences opening on the same word. Fix the pattern, not the word.
12. **False "from X to Y" ranges** — where X and Y aren't ends of anything. List what's actually covered.
13. **Passive voice hiding the actor** — *the results are preserved.* Say who acts.

## Style

14. **Em and en dashes** — none in post copy unless the voice file's samples show them. Replace with a period, comma, colon, or parentheses. Check for spaced ` — ` and ` -- ` too.
15. **Bold used as decoration** — bold that marks no contrast. Remove it.
16. **Bold mini-heading lists** — every bullet opening `**Label:**`. Usually a paragraph.
17. **Title Case Headings** — sentence case.
18. **Emoji as bullets or heading prefixes** — cut.
19. **Curly quotes** — straight quotes, unless the target platform curls them itself.

## Chatbot residue

20. **Assistant text left in** — *I hope this helps, Certainly!, Let me know if, Want me to.*
21. **Knowledge-limit disclaimers and gap-filling guesses** — *as of my last update, while details are limited, likely grew up, it is believed that.* State what the source doesn't show, or cut the sentence. A guess never gets presented as a fact.
22. **Overly agreeable openers** — *Great question, You're absolutely right.*

## Filler and hedging

23. **Filler phrases** — *in order to* → *to*; *due to the fact that* → *because*; *has the ability to* → *can*; *it is important to note that* → cut.
24. **Stacked qualifiers** — *could potentially possibly be argued.* Keep a hedge only where a source supports it.
25. **Generic positive endings** — *exciting times ahead, a step in the right direction.* End on the last concrete fact.
26. **Hyphen pile-up** — *data-driven, cross-functional, end-to-end, real-time.* Hyphenate before a noun, not after it.
27. **False depth** — *at its core, the real question is, what really matters, fundamentally.* Make the point.
28. **Announcing the next point** — *let's dive in, here's what you need to know, quick note.* Also in casual register: *one thing that bit me.* State it.
29. **Heading echoed by the first line** — a one-line paragraph restating the heading. Cut the line.
30. **Writing about the previous version** — describe current behaviour. The old one belongs in `changelog/`.
31. **Forced punchlines and fragment rows** — one short sentence lands. Four in a row is a tic.
32. **Formulaic sayings** — *X is the language of Y, X becomes a trap, the architecture of.* Say the specific claim.
33. **Fake-candid openers** — *Honestly?, Look, Here's the thing, Real talk* as a staged pause.
34. **Answering objections nobody raised** — *I'm not saying, don't get me wrong, to be clear.* Cut the defense; keep any real claim inside it.
35. **Rejecting fake alternatives** — *a tempting approach would be…, but.* Usually a drafting artefact. State the constraint.

## What not to strip

Over-application flattens a voice into the same beige this list exists to prevent.
None of these is a tell on its own:

- **Polish.** Edited prose is edited, not generated.
- **One em dash. One curly quote. One *however*.** These count only stacked with other tells.
- **One short sentence for emphasis.** Flag a row of them, not one.
- **Deliberate repetition** built for rhythm.
- **Formal vocabulary** that isn't on the §7 list.
- **Real limits, corrections, and named objections.** Keep every one.
- **Real alternatives** a reader would actually weigh.
- **Unsourced claims.** Most writing is unsourced; that proves nothing by itself.

And keep, always, the things that carry a person: an oddly specific detail, an
unresolved feeling, a dated reference, a self-interrupting aside, uneven sentence
length. Those are the voice. **The tell is the pattern, never the word.**

## Order of application

Set in `post-generator` Step 4. This file first and unconditionally, then the
voice file's **Stripped** table, then its **Carries over** traits. A user override
in `VOICE.md` beats a banned move; it does not beat anything in this file.
