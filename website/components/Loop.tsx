import { LOOP_STEPS } from "./lib/skills";
import Reveal from "./Reveal";
import styles from "./Loop.module.css";

/**
 * The mechanism, shown once and concretely. The site has never had this — it
 * showed outputs and descriptions, and never the loop that produces them.
 *
 * Counts here are the only hardcoded numbers on the page. They describe this
 * repo's own record, not the library, so they can't be derived from skills.ts.
 */
export default function Loop() {
  return (
    <section id="how" className={`wrap ${styles.sec}`}>
      <div className={styles.rule} aria-hidden="true" />
      <h2 className={styles.h2}>
        <span className="s">## </span>How one skill works
      </h2>
      <p className={styles.sub}>
        Take <b>decisions-logger</b>. You&rsquo;ve just decided something —
        &ldquo;plain CSS Modules, not Tailwind.&rdquo;
      </p>

      <ol className={styles.steps}>
        {LOOP_STEPS.map((s, i) => (
          <Reveal as="li" key={s.title} index={i} className={styles.step}>
            <span className={styles.n}>{i + 1}.</span>
            <span className={styles.t}>
              <b>{s.title}</b>
              <span className={styles.d}>{s.detail}</span>
            </span>
          </Reveal>
        ))}
      </ol>

      <p className={styles.body}>
        <b>Step 4 is the one nothing else does.</b> A skill that stopped at step
        3 would be forgotten by tomorrow — you&rsquo;d have one good document
        and no second one. The rule is what makes it happen again.
      </p>

      <p className={styles.note}>
        <span className="s">&gt; </span>Seven rules live in this repo&rsquo;s
        CLAUDE.md. They have produced <b>23 decisions</b>, <b>7 design
        decisions</b>, <b>32 documented commits</b> and <b>3 handoffs</b> — all
        of it readable in the repo.
      </p>
    </section>
  );
}
