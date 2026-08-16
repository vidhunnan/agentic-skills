import type { ReactNode } from "react";
import { CONTEXT_STACK, type Tier } from "./lib/skills";
import Reveal from "./Reveal";
import styles from "./ContextStack.module.css";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

interface Props {
  /** anchor id — the Nav scrollspy keys off this */
  id?: string;
  eyebrow?: string;
  title?: string;
  intro?: ReactNode;
  tiers?: Tier[];
  rule?: ReactNode;
}

export default function ContextStack({
  id = "stack",
  eyebrow = "The context stack",
  title = "Five tiers, one rule.",
  tiers = CONTEXT_STACK,
  intro = (
    <>
      Every project doc is tiered by the question it answers — and each tier
      carries how far it can be trusted. Mix them and you&rsquo;ve handed an
      agent contradictory instructions. A human notices the contradiction; an
      agent just complies, confidently, in both directions.
    </>
  ),
  rule = (
    <>
      <strong>The rule:</strong> never cite a concept or a PRD as proof a feature
      exists — check the changelog, or check the code.{" "}
      <span className={styles.mono}>changelog/</span> is what shipped; everything
      under <span className={styles.mono}>docs/</span> is what we <em>thought</em>
      .
    </>
  ),
}: Props) {
  return (
    <section id={id} className={styles.section}>
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.intro}>{intro}</p>

        <ol className={styles.list}>
          {tiers.map((tier, i) => (
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

        <p className={styles.rule}>{rule}</p>
      </div>
    </section>
  );
}
