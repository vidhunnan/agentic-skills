"use client";

import { useEffect, useState } from "react";
import CopyButton from "./CopyButton";
import Tags from "./Tags";
import { INSTALL_COPY, SKILLS_COPY } from "./lib/content";
import { MARKETPLACE_CMD, SKILL_GROUPS, type Skill } from "./lib/skills";
import styles from "./Install.module.css";

/**
 * Two parts, deliberately unequal.
 *
 * The marketplace line sits at the top and never moves — it is the one-time
 * step, and putting it in the cycle made people step past the only command
 * that is not optional.
 *
 * Below it, all fourteen skills, one at a time, prev/next WRAPPING so you can
 * circle back round rather than dead-ending at either edge.
 *
 * This prints all fourteen install commands, which the catalogue also prints.
 * That is deliberate and it is not the old defect: the catalogue is for reading
 * about a skill, this is for installing one, and the page-wide copy-button
 * count goes 17 → 30 as a result. The original defect was the same list
 * rendered twice with no difference between the two.
 *
 * Progressive enhancement, same as everywhere here: before mount every skill is
 * stacked and there are no controls, so the static export is complete and no
 * dead control ships to a reader without JS.
 */
const ALL: Skill[] = SKILL_GROUPS.flatMap((g) => g.skills);
const ENTRY = "repo-setup";
const CYCLE: Skill[] = [
  ...ALL.filter((s) => s.name === ENTRY),
  ...ALL.filter((s) => s.name !== ENTRY),
];

export default function InstallSteps() {
  const [ready, setReady] = useState(false);
  const [i, setI] = useState(0);

  useEffect(() => setReady(true), []);

  const wrap = (n: number) => (n + CYCLE.length) % CYCLE.length;

  return (
    <div className={styles.panel}>
      <div className={styles.once}>
        <p className={styles.comment}>{INSTALL_COPY.comments[0]}</p>
        <div className={styles.cmdRow}>
          <code className={styles.cmd}>{MARKETPLACE_CMD}</code>
          <CopyButton text={MARKETPLACE_CMD} label="copy" />
        </div>
      </div>

      <div className={`${styles.cycle} ${ready ? styles.stepped : ""}`}>
        <p className={styles.comment}>{INSTALL_COPY.comments[1]}</p>

        <div className={styles.slides}>
          {CYCLE.map((s, n) => {
            const off = ready && n !== i;
            const chat = s.surfaces.includes("Chat");
            return (
              <div
                key={s.name}
                className={`${styles.slide} ${ready && n === i ? styles.current : ""}`}
                aria-hidden={off ? true : undefined}
                inert={off ? true : undefined}
              >
                <div className={styles.slideTop}>
                  <span className={styles.nm}>{s.name}</span>
                  <Tags skill={s} />
                </div>
                <p className={styles.answers}>{s.answers}</p>
                <div className={styles.cmdRow}>
                  <code className={styles.cmd}>{s.install}</code>
                  <CopyButton text={s.install} label="copy" />
                  {chat && (
                    <a
                      className={styles.download}
                      href={`/skills/${s.name}.zip`}
                      download
                    >
                      .zip
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {ready && (
          <div className={styles.controls}>
            <button
              type="button"
              className={styles.nav}
              onClick={() => setI(wrap(i - 1))}
            >
              ← prev
            </button>
            <span className={styles.count} aria-live="polite">
              {i + 1} of {CYCLE.length}
            </span>
            <button
              type="button"
              className={styles.nav}
              onClick={() => setI(wrap(i + 1))}
            >
              next →
            </button>
          </div>
        )}
      </div>

      <p className={styles.hint}>{SKILLS_COPY.downloadHint}</p>
    </div>
  );
}
