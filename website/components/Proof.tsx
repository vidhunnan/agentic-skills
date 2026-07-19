import Reveal from "./Reveal";
import styles from "./Proof.module.css";

const RECEIPTS = [
  {
    path: "docs/decisions/",
    desc: "ADRs explaining why this repo is shaped the way it is, each with the evidence it was drawn from.",
    by: "decisions-logger",
  },
  {
    path: "changelog/",
    desc: "Every substantive commit documented, with the diff and the reason.",
    by: "changelog-tracker",
  },
  {
    path: "docs/MODEL-STRATEGY.md",
    desc: "The model policy this repo actually follows.",
    by: "model-strategy",
  },
  {
    path: "handoff/",
    desc: "The briefs that carried this work between Claude.ai and Claude Code.",
    by: "handoff-generator",
  },
];

export default function Proof() {
  return (
    <section id="proof" className={styles.section}>
      <div className="wrap">
        <p className="eyebrow">Read before you install</p>
        <h2 className={styles.title}>This repo runs on its own skills.</h2>
        <p className={styles.intro}>
          Everything below was written by the skills above, while building this
          repo. Read the output before you trust it with yours.
        </p>

        <ul className={styles.list}>
          {RECEIPTS.map((r) => (
            <Reveal as="li" key={r.path} className={styles.row}>
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
