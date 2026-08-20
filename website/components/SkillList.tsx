"use client";

import { useEffect, useMemo, useState } from "react";
import CopyButton from "./CopyButton";
import { SKILLS_COPY } from "./lib/content";
import { SKILL_GROUPS, searchSkills, type Skill } from "./lib/skills";
import Tags from "./Tags";
import styles from "./Skills.module.css";

/**
 * Fourteen rows, filterable.
 *
 * The filter HIDES rows rather than unmounting them: every row stays in the DOM
 * and in the static export, so nothing is destroyed by a query and a JS-off
 * reader has the whole catalogue. It also keeps the page honest about how many
 * skills exist.
 *
 * Order never changes. The ranker can sort, but reordering fourteen rows under
 * the reader's cursor as they type is worse than leaving them where they were;
 * it is used here purely as the matcher.
 *
 * The input renders only after mount — same rule as everywhere else on this
 * page: no control ships that does nothing without JS.
 */
const ALL: Skill[] = SKILL_GROUPS.flatMap((g) => g.skills);
const FIRST = "decisions-logger";
const ORDERED: Skill[] = [
  ...ALL.filter((s) => s.name === FIRST),
  ...ALL.filter((s) => s.name !== FIRST),
];

export default function SkillList() {
  const [ready, setReady] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => setReady(true), []);

  const matches = useMemo(() => new Set(searchSkills(q)), [q]);

  return (
    <>
      {/*
        Heading and search share one row — the search is a property of the
        section, not a control floating above the list. Per the Figma spec
        (node 2265:2179).
      */}
      <div className={styles.headRow}>
        <div className={styles.head}>
          <h2>{SKILLS_COPY.heading}</h2>
          <p className={styles.sub}>{SKILLS_COPY.sub}</p>
        </div>
        {ready && (
          <input
            type="search"
            className={styles.search}
            placeholder={SKILLS_COPY.filterPlaceholder}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Filter skills"
          />
        )}
      </div>

      <ul className={styles.list}>
        {ORDERED.map((s) => {
          const hit = matches.has(s.name);
          const chat = s.surfaces.includes("Chat");
          return (
            <li key={s.name} hidden={!hit}>
              <details className={styles.row}>
                <summary className={styles.summary}>
                  <span className={styles.text}>
                    <span className={styles.top}>
                      <span className={styles.nm}>{s.name}</span>
                      <Tags skill={s} />
                    </span>
                    <span className={styles.desc}>{s.desc}</span>
                  </span>
                  <span className={styles.plus} aria-hidden="true" />
                </summary>
                <div className={styles.body}>
                  <div className={styles.cmdRow}>
                    <code className={styles.cmd}>{s.install}</code>
                    <CopyButton text={s.install} label="copy" />
                    {chat && (
                      <a
                        className={styles.download}
                        href={`/skills/${s.name}.zip`}
                        download
                      >
                        download .zip
                      </a>
                    )}
                  </div>
                  {chat && (
                    <p className={styles.hint}>{SKILLS_COPY.downloadHint}</p>
                  )}
                </div>
              </details>
            </li>
          );
        })}
      </ul>
    </>
  );
}
