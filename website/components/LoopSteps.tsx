"use client";

import { useEffect, useRef } from "react";
import { LOOP_STEPS } from "./lib/skills";
import styles from "./Loop.module.css";

/**
 * The five steps, with the active one marked as it passes the middle of the
 * viewport.
 *
 * Scroll-linked, therefore reader-caused: it tracks position and does nothing on
 * its own, so it needs no second exception to the motion spec's "nothing moves
 * that the reader did not cause". Nothing types itself here — that is a hard
 * constraint in design/system/language-website.md, and it is what killed the two
 * earlier drafts' replay terminals.
 *
 * Every step is in the static export. JS only marks.
 */
export default function LoopSteps() {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const steps = Array.from(root.querySelectorAll("li"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          e.target.classList.toggle(styles.on, e.isIntersecting);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    steps.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <ol className={styles.steps} ref={ref}>
      {LOOP_STEPS.map((s, i) => (
        <li key={s.title} className={styles.step}>
          <span className={styles.n}>{String(i + 1).padStart(2, "0")}</span>
          <span className={styles.t}>
            <b>{s.title}</b>
            <span className={styles.d}>{s.detail}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}
