import { LOOP_COPY } from "./lib/content";
import { COUNTS } from "./lib/counts";
import LoopSteps from "./LoopSteps";
import styles from "./Loop.module.css";

/**
 * The mechanism, shown once and concretely, as the page's single full-bleed
 * band. The site never had this — it showed outputs and descriptions, never the
 * loop that produces them.
 *
 * The counts come from COUNTS, which reads the repo at build time. They used to
 * be typed here and drifted three times in one day.
 */
export default function Loop() {
  return (
    <section id="how" className={`${styles.sec} band`}>
      <div className="shell">
        <div className={styles.head}>
          <h2>
            <span className="s">## </span>
            {LOOP_COPY.heading}
          </h2>
          <p className={styles.sub}>
            {LOOP_COPY.subLead}
            <b>{LOOP_COPY.subSkill}</b>
            {LOOP_COPY.subRest}
          </p>
        </div>

        <div className={styles.grid}>
          <LoopSteps />

          <aside>
            <div className={styles.callout}>
              <p className={styles.kicker}>{LOOP_COPY.calloutKicker}</p>
              <p className={styles.calloutBody}>
                <b>{LOOP_COPY.calloutLead}</b>
                {LOOP_COPY.calloutBody}
              </p>
            </div>
            <p className={styles.note}>
              <span className="s">&gt; </span>
              {COUNTS.rules} rules live in this repo&rsquo;s CLAUDE.md. They have
              produced <b>{COUNTS.decisions} decisions</b>,{" "}
              <b>{COUNTS.designDecisions} design decisions</b>,{" "}
              <b>{COUNTS.commits} documented commits</b> and{" "}
              <b>{COUNTS.handoffs} handoffs</b>
              {LOOP_COPY.noteTail}
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
