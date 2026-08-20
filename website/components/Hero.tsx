import CopyButton from "./CopyButton";
import { HERO } from "./lib/content";
import {
  MARKETPLACE_CMD,
  SPECIMENS,
  TOTAL_SKILLS,
  type Specimen,
} from "./lib/skills";
import styles from "./Hero.module.css";

/**
 * The claim takes the full width; the support splits under it.
 *
 * Round 2 put the headline at 19px and nothing on the page anchored. Round 3
 * put it at display size but boxed it in half the width, which broke it a
 * second way — six lines, and it stopped reading as a headline at all.
 *
 * SPECIMENS[0] is load-bearing: it is the ADR that says it doesn't know, and it
 * is what a JS-off reader sees. The rotation was retired (design ADR 0010).
 */

/**
 * Source lines → rendered blocks.
 *
 * The record is stored at the source file's own line wraps (~80 chars) so it can
 * be diffed against the file with grep. The card is narrower than that, so
 * printing those lines verbatim wraps them a SECOND time and leaves orphans —
 * "weighing" and "fact." alone on a line.
 *
 * In Markdown a single newline is not a line break: consecutive non-blank lines
 * are one paragraph. So joining them is the correct mapping of the format, not a
 * liberty taken with it — every word and every marker survives, and only the
 * arbitrary 80-column wrap is dropped. A blank line still separates blocks, and
 * a heading still stands alone.
 */
type Block = { text: string; gap?: boolean }[];

function blocks(lines: Specimen["lines"]): Block[] {
  const out: Block[] = [];
  let para: Block | null = null;

  const parts = (l: Specimen["lines"][number]): Block =>
    l.parts ?? [{ text: l.text, gap: l.kind === "gap" }];

  for (const line of lines) {
    if (line.kind === "blank") {
      para = null;
      out.push([{ text: "" }]);
      continue;
    }
    if (line.kind === "heading") {
      para = null;
      out.push(parts(line));
      continue;
    }
    // body or gap: continue the paragraph, joined by a space
    if (para) para.push({ text: " " }, ...parts(line));
    else {
      para = [...parts(line)];
      out.push(para);
    }
  }
  return out;
}

export default function Hero() {
  const spec = SPECIMENS[0];

  return (
    <section id="top" className={`shell ${styles.hero}`}>
      <div className={styles.grid}>
        <div className={styles.say}>
          <p className={styles.eyebrow}>{HERO.eyebrow}</p>
          <h1>
            {HERO.headline}
            <span className={styles.cont}>{HERO.headlineCont}</span>
          </h1>
        </div>

        <div>
          <p className={styles.lede}>
            {HERO.ledeBefore}
            <span className={styles.gap}>{HERO.ledeGap}</span>
            {HERO.ledeAfter}
          </p>

          <div className={styles.action}>
            <CopyButton text={MARKETPLACE_CMD} variant="primary" />
          </div>

          <p className={styles.meta}>
            {TOTAL_SKILLS} skills <span className="s">·</span> {HERO.metaTail}{" "}
            <span className="s">·</span> <a href="#skills">{HERO.metaLink}</a>
          </p>
        </div>

        <div>
          <div className={styles.card}>
            {/*
              Window chrome. The controls are decorative and must stay
              aria-hidden and non-focusable: a close button that closes nothing
              is a lie to a keyboard user, and this repo already has a rule
              against shipping controls that do nothing (the deleted Nav only
              rendered its palette trigger after mount, for that reason).
            */}
            <div className={styles.cardBar}>
              <span className={styles.dots} aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className={styles.title}>{spec.source}</span>
              <span className={styles.by}>{spec.by}</span>
            </div>
            <div className={styles.cardBody}>
              <pre className={styles.pre}>
                {blocks(spec.lines).map((block, i) => (
                  <span key={i}>
                    {block.map((part, j) => (
                      <span
                        key={j}
                        className={part.gap ? styles.gap : undefined}
                      >
                        {part.text}
                      </span>
                    ))}
                    {i < blocks(spec.lines).length - 1 ? "\n" : ""}
                  </span>
                ))}
              </pre>
            </div>
            <div className={styles.cardFoot}>
              <span className="s">— </span>
              {HERO.specimenNote} <span className="s">·</span>{" "}
              <a href={spec.href}>{HERO.specimenLink}</a>
            </div>
          </div>
          <p className={styles.caption}>{spec.caption}</p>
        </div>
      </div>
    </section>
  );
}
