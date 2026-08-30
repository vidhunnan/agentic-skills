# Voice — template

**This is the shape `post-setup` writes. It is not anyone's voice.**

The real file lives at `posts/VOICE.md`, is generated from your own interview and
your own samples, and is **gitignored by default** — a voice profile is personal,
and most repos it gets run in are public or shared. `post-setup` offers to commit
it if you'd rather have it synced across machines or shared with a team.

Only the two rule sections at the bottom — **Banned moves** (taste, overridable)
and **AI tells** (hygiene, not) — ship with the skill. Everything above them is
yours and starts empty.

---

## Read this first

{What genre are the samples? Announcement posts, build-logs, essays, replies?
Say it plainly, because a voice captured from one genre does not transfer to
another. If the samples are not the genre you want to write in, this file's job is
to separate the *person* in them from the *packaging*.}

**Evidence:** {how many samples, from where, dated}

## Carries over

Observed in the samples, and wanted. **Cite the evidence for each one** — how many
samples showed it — so a rule can be checked rather than taken on faith.

- {Trait} — {seen in N of M}
- {Trait} — {seen in N of M}

Things worth looking for, because they are durable and rarely articulated:

| Look for | Why it matters |
|---|---|
| How other people are referred to | Crediting habits are among the most consistent and most personal traits |
| Whether numbers appear, and whether they are real | Separates a voice that reports from one that impresses |
| Who the post is addressed to | Reader-facing and author-facing openings produce different posts |
| Where the argument sits | Thesis-first, or built up to |
| Paragraph length and rhythm | The most reliable tell, and the hardest to describe from memory |
| How a post closes | Invitation, statement, or call to action |

## Stripped

Observed in the samples, and explicitly **not** wanted. Your instruction beats the
evidence here, and the table records the disagreement rather than hiding it.

| Strip | Seen in | Instead |
|---|---|---|
| {move} | {N of M} | {what to do instead} |

## Register

{If you write in more than one register — an announcement voice and a working
voice, say — name them here and say which traits cross over. Mark any register you
have no sample of as uncaptured rather than inferring it.}

## Banned moves — taste

**Ships with the skill.** The library's editorial stance, identical for every
installer. Applied to every post before anything above. **Overridable:** if one of
these is genuinely how you write, say so in the sections above and your version
wins.

- No em dashes. (Overridden automatically if your own samples use them.)
- No "excited to announce", "thrilled to share", "so proud to".
- No emoji bullets, no emoji header prefixes.
- No rhetorical-question openers.
- No "here's what I learned:" listicle scaffolding.
- No manufactured struggle arc.
- None of: game-changer, unlock, leverage, dive deep, supercharge, seamless.

## AI tells — hygiene

**Ships with the skill, and is not overridable.** The 35 patterns that mark prose
as unedited model output — inflated importance, vague sources, "not X but Y",
forced triads, bold-label lists, chatbot residue, stacked hedges. None of them is
a matter of register, so no voice file overrides them. **"No invented metrics"
lives here, not above:** a number appears only if a source contains it, and that
is not a style preference.

The full list, and just as importantly the guard against over-applying it, is
`references/ai-tells.md`, shipped with `post-generator`. It also states the scope:
these apply to prose written to persuade a stranger, never to this repo's docs.

**Precedence:** AI tells first and unconditionally, then banned moves, then your
**Stripped** table, then your **Carries over** traits.
