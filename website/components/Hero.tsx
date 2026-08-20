import CopyButton from "./CopyButton";
import Specimen from "./Specimen";
import { HERO } from "./lib/content";
import { MARKETPLACE_CMD, TOTAL_SKILLS } from "./lib/skills";
import styles from "./Hero.module.css";

/**
 * The claim takes the full width; the support splits under it.
 *
 * Round 2 put the headline at 19px and nothing on the page anchored. Round 3
 * put it at display size but boxed it in half the width, which broke it a
 * second way — six lines, and it stopped reading as a headline at all.
 *
 * The specimen set lives in Specimen.tsx — the reader steps through it.
 */

export default function Hero() {

  return (
    <section id="top" className={`shell ${styles.hero}`}>
      <div className={styles.grid}>
        <div className={styles.say}>
          <p className={styles.eyebrow}>{HERO.eyebrow}</p>
          <h1>
            {HERO.headline}
            <span className={styles.cont}>{HERO.headlineCont}</span>
          </h1>
        </div>

        <div>
          <p className={styles.lede}>
            {HERO.ledeBefore}
            <span className={styles.gap}>{HERO.ledeGap}</span>
            {HERO.ledeAfter}
          </p>

          <div className={styles.action}>
            <CopyButton text={MARKETPLACE_CMD} variant="primary" />
          </div>

          <p className={styles.meta}>
            {TOTAL_SKILLS} skills <span className="s">·</span> {HERO.metaTail}{" "}
            <span className="s">·</span> <a href="#skills">{HERO.metaLink}</a>
          </p>
        </div>

        <Specimen />
      </div>
    </section>
  );
}
