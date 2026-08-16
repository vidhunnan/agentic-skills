import { RECEIPTS } from "./lib/skills";
import Reveal from "./Reveal";
import styles from "./Proof.module.css";

export default function Proof() {
  return (
    <section id="proof" className={styles.section}>
      <div className="wrap">
        <p className="eyebrow">Read before you install</p>
        <h2 className={styles.title}>This repo runs on its own skills.</h2>
        <p className={styles.intro}>
          Everything below was written by the skills above, while building this
          repo. Read the output before you trust it with yours — including the
          one record that says it doesn&rsquo;t know.
        </p>

        <ul className={styles.list}>
          {RECEIPTS.map((r) => (
            <Reveal
              as="li"
              key={r.path}
              className={`${styles.row} ${r.highlight ? styles.isHighlight : ""}`}
            >
              <span className={styles.path}>{r.path}</span>
              <span className={styles.desc}>
                {r.desc}
                <span className={styles.by}>— written by {r.by}</span>
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
