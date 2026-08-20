"use client";

import { useEffect, useState } from "react";
import { HERO } from "./lib/content";
import { SPECIMENS, type Specimen as Record_ } from "./lib/skills";
import styles from "./Hero.module.css";

/**
 * The specimens, stepped by the reader.
 *
 * THIS REOPENS DESIGN ADR 0010, which retired a specimen rotation and shows one
 * record. Worth being precise about what changed: 0010 killed a TIMER-driven
 * rotation — it moved on its own, and ADR 0006 had to argue it past a three-part
 * bar to exist at all. This moves only when the reader presses an arrow, so it
 * needs no motion exception; the page's rule is that nothing moves that the
 * reader did not cause. What it does supersede is 0010's "one specimen", and
 * that needs its own record.
 *
 * Every specimen is in the DOM and in the static export. Inactive ones are inert
 * and aria-hidden but keep their box, so the card holds the height of the tallest
 * and the caption and controls below it never jump as you step. That is the same
 * reasoning the retired Specimens.tsx used, and it was right.
 *
 * The controls render only after mount — no control ships that does nothing
 * without JS.
 */
type Block = { text: string; gap?: boolean }[];

/**
 * Source lines → rendered blocks.
 *
 * Records are stored at the source file's own ~80-column wraps so they can be
 * diffed against the file. The card is narrower, so printing those lines
 * verbatim wraps them a second time and leaves orphans. In Markdown a single
 * newline is not a line break — consecutive non-blank lines are one paragraph —
 * so joining them is the correct reading of the format. Every word and marker
 * survives; only the arbitrary column wrap goes.
 */
function blocks(lines: Record_["lines"]): Block[] {
  const out: Block[] = [];
  let para: Block | null = null;

  const parts = (l: Record_["lines"][number]): Block =>
    l.parts ?? [{ text: l.text, gap: l.kind === "gap" }];

  for (const line of lines) {
    if (line.kind === "blank") {
      para = null;
      out.push([{ text: "" }]);
      continue;
    }
    // A heading stands alone. So does a preformatted line — its whitespace is
    // structural (diffstat columns, table pipes), so reflowing it would destroy
    // the thing it is showing. Joining the diffstat rows turned five aligned
    // columns into one unreadable line.
    if (line.kind === "heading" || line.kind === "pre") {
      para = null;
      out.push(parts(line));
      continue;
    }
    if (para) {
      const p = parts(line);
      // A blockquote repeats "> " on every line. That marker belongs to the
      // block, not to the words — joining without stripping it puts a stray
      // ">" in the middle of the sentence.
      const cont = p.length
        ? [
            {
              ...p[0],
              // Two markers belong to the BLOCK, not the words, and both have to
              // go when lines are joined: the "> " a blockquote repeats on every
              // line, and the indent a list item uses to continue. Leaving the
              // indent in produced "The   closed positioning brief" — the join
              // space plus the source's two-space continuation.
              text: p[0].text.replace(/^>\s?/, "").replace(/^\s+/, ""),
            },
            ...p.slice(1),
          ]
        : p;
      para.push({ text: " " }, ...cont);
    } else {
      para = [...parts(line)];
      out.push(para);
    }
  }
  return out;
}

function Card({ spec }: { spec: Record_ }) {
  const bs = blocks(spec.lines);
  return (
    <div className={styles.card}>
      {/*
        Window chrome. The controls are decorative and must stay aria-hidden and
        non-focusable: a close button that closes nothing is a lie to a keyboard
        user, and this repo already has a rule against shipping controls that do
        nothing.
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
          {bs.map((block, i) => (
            <span key={i}>
              {block.map((part, j) => (
                <span key={j} className={part.gap ? styles.gap : undefined}>
                  {part.text}
                </span>
              ))}
              {i < bs.length - 1 ? "\n" : ""}
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
  );
}

export default function Specimen() {
  const [ready, setReady] = useState(false);
  const [i, setI] = useState(0);

  useEffect(() => setReady(true), []);

  const wrap = (n: number) => (n + SPECIMENS.length) % SPECIMENS.length;

  return (
    <div>
      <div className={`${styles.stack} ${ready ? styles.stepped : ""}`}>
        {SPECIMENS.map((spec, n) => {
          const off = ready && n !== i;
          return (
            <div
              key={spec.source}
              className={`${styles.slide} ${ready && n === i ? styles.current : ""}`}
              aria-hidden={off ? true : undefined}
              inert={off ? true : undefined}
            >
              <Card spec={spec} />
            </div>
          );
        })}
      </div>

      <div className={styles.below}>
        <p className={styles.caption}>{SPECIMENS[ready ? i : 0].caption}</p>
        {ready && (
          <div className={styles.controls}>
            <button
              type="button"
              className={styles.step}
              onClick={() => setI(wrap(i - 1))}
              aria-label="Previous record"
            >
              ←
            </button>
            <span className={styles.count} aria-live="polite">
              {i + 1} of {SPECIMENS.length}
            </span>
            <button
              type="button"
              className={styles.step}
              onClick={() => setI(wrap(i + 1))}
              aria-label="Next record"
            >
              →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
