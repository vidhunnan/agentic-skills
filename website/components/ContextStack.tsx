import { CONTEXT_STACK } from "./lib/skills";
import Reveal from "./Reveal";
import styles from "./ContextStack.module.css";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function ContextStack() {
  return (
    <section id="stack" className={styles.section}>
      <div className="wrap">
        <p className="eyebrow">The context stack</p>
        <h2 className={styles.title}>Five tiers, one rule.</h2>
        <p className={styles.intro}>
          Every project doc is tiered by the question it answers — and each tier
          carries how far it can be trusted. Mix them and you&rsquo;ve handed an
          agent contradictory instructions. A human notices the contradiction;
          an agent just complies, confidently, in both directions.
        </p>

        <ol className={styles.list}>
          {CONTEXT_STACK.map((tier, i) => (
            <Reveal
              as="li"
              key={tier.folder}
              className={styles.row}
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <span className={styles.num}>{pad(i + 1)}</span>
              <span className={styles.folder}>{tier.folder}</span>
              <span className={styles.q}>{tier.question}</span>
              <span
                className={`${styles.trust} ${
                  tier.trust === "Truth" ? styles.isTruth : ""
                }`}
              >
                {tier.trust}
                {tier.qualifier ? (
                  <span className={styles.qual}> · {tier.qualifier}</span>
                ) : null}
              </span>
            </Reveal>
          ))}
        </ol>

        <p className={styles.rule}>
          <strong>The rule:</strong> never cite a concept or a PRD as proof a
          feature exists — check the changelog, or check the code.{" "}
          <span className={styles.mono}>changelog/</span> is what shipped;
          everything under <span className={styles.mono}>docs/</span> is what we{" "}
          <em>thought</em>.
        </p>
      </div>
    </section>
  );
}
