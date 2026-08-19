"use client";

import { useEffect, useState } from "react";
import CopyButton from "./CopyButton";
import { INSTALL_COPY } from "./lib/content";
import { MARKETPLACE_CMD } from "./lib/skills";
import styles from "./Install.module.css";

/**
 * The install sequence, stepped.
 *
 * Progressive enhancement is the whole design here, and it follows a precedent
 * this repo already set and then deleted: the old Nav rendered its palette
 * trigger only after mount, because "shipping this button in the static HTML
 * would put a dead control on the page for anyone without it".
 *
 * So: before mount — and therefore in the static export, and therefore for a
 * reader with JS off — every step is stacked and visible, and there are no
 * controls. After mount, the controls appear and the steps become one at a time.
 * Nothing is hidden that cannot be reached, and no control ships that does not
 * work. That keeps "JS may enhance, never reveal" intact rather than spending an
 * exception on it.
 *
 * Inactive steps stay in the DOM and keep their box, the way the deleted
 * Specimens did, so the panel does not resize as you step through it.
 */
const STEPS = [
  { comment: INSTALL_COPY.comments[0], cmd: MARKETPLACE_CMD },
  { comment: INSTALL_COPY.comments[1], cmd: "/plugin install repo-setup" },
  { comment: INSTALL_COPY.comments[2], cmd: null },
];

export default function InstallSteps() {
  const [ready, setReady] = useState(false);
  const [i, setI] = useState(0);

  useEffect(() => setReady(true), []);

  const go = (n: number) => setI(Math.min(STEPS.length - 1, Math.max(0, n)));

  return (
    <div className={`${styles.panel} ${ready ? styles.stepped : ""}`}>
      <div className={styles.steps}>
        {STEPS.map((s, n) => {
          const active = !ready || n === i;
          return (
            <div
              key={s.comment}
              className={`${styles.step} ${ready && n === i ? styles.current : ""}`}
              aria-hidden={ready && n !== i ? true : undefined}
              inert={ready && n !== i ? true : undefined}
            >
              <p className={styles.comment}>{s.comment}</p>
              {s.cmd && (
                <div className={styles.cmdRow}>
                  <code className={styles.cmd}>{s.cmd}</code>
                  <CopyButton text={s.cmd} label="copy" />
                </div>
              )}
              {!active && null}
            </div>
          );
        })}
      </div>

      {ready && (
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.nav}
            onClick={() => go(i - 1)}
            disabled={i === 0}
          >
            ← prev
          </button>
          <span className={styles.count} aria-live="polite">
            step {i + 1} of {STEPS.length}
          </span>
          <button
            type="button"
            className={styles.nav}
            onClick={() => go(i + 1)}
            disabled={i === STEPS.length - 1}
          >
            next →
          </button>
        </div>
      )}
    </div>
  );
}
