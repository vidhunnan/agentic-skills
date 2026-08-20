"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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

/**
 * Reused from the rotation this replaces, not re-picked: long enough to clear
 * the longest record at an unhurried pace, short enough that the card does not
 * read as static. Its own spec entry admits it was never tested on a reader,
 * and that is still true.
 */
const DWELL_MS = 6500;

export default function Specimen() {
  const [ready, setReady] = useState(false);
  const [i, setI] = useState(0);

  // Two kinds of not-advancing, deliberately separate.
  //   held    — transient: pointer over it, focus inside it, tab in the
  //             background, or the card scrolled out of view. These are the
  //             ONLY brakes: the explicit pause control was removed at the
  //             owner's request. A visitor who never touches the card and never
  //             hovers it gets content that auto-updates indefinitely, which is
  //             what WCAG 2.2 SC 2.2.2 asks for a mechanism against. Recorded
  //             here rather than argued: it was raised and decided.
  //   stopped — the reader pressed an arrow. Sticky, because the timer should
  //             not take a record away from the one person who asked for it.
  //             Scoped to the visit: leaving the section clears it.
  const [held, setHeld] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [offscreen, setOffscreen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reduced, setReduced] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => setReady(true), []);

  // Read the preference live, not once at mount, so turning it on with the page
  // already open stops the timer immediately.
  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(q.matches);
    sync();
    q.addEventListener("change", sync);
    return () => q.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const onVis = () => setHidden(document.visibilityState === "hidden");
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // One observer, two jobs: hold the timer while the card is off-screen, and
  // clear the sticky stop when the reader leaves the section — so coming back
  // starts it again.
  useEffect(() => {
    const el = root.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setOffscreen(!e.isIntersecting);
        if (!e.isIntersecting) setStopped(false);
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const wrap = useCallback(
    (n: number) => (n + SPECIMENS.length) % SPECIMENS.length,
    [],
  );

  const running =
    ready && !reduced && !stopped && !held && !offscreen && !hidden;

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setI((n) => wrap(n + 1)), DWELL_MS);
    return () => clearTimeout(t);
  }, [running, i, wrap]);

  const step = (delta: number) => {
    setStopped(true);
    setI((n) => wrap(n + delta));
  };

  return (
    <div
      ref={root}
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={() => setHeld(false)}
    >
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
              {ready && n === i && !reduced && !stopped && (
                <span
                  className={`${styles.progress} ${running ? styles.ticking : ""}`}
                  style={{ animationDuration: `${DWELL_MS}ms` }}
                  aria-hidden="true"
                  // Restarting the animation needs a new element, not a class
                  // toggle — the key does that.
                  key={`p-${i}-${running}`}
                />
              )}
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
              onClick={() => step(-1)}
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
              onClick={() => step(1)}
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
