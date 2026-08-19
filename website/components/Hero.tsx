import CopyButton from "./CopyButton";
import { HERO } from "./lib/content";
import { MARKETPLACE_CMD, SPECIMENS, TOTAL_SKILLS } from "./lib/skills";
import styles from "./Hero.module.css";

/**
 * The claim takes the full width; the support splits under it.
 *
 * Round 2 put the headline at 19px and nothing on the page anchored. Round 3
 * put it at display size but boxed it in half the width, which broke it a
 * second way — six lines, and it stopped reading as a headline at all.
 *
 * SPECIMENS[0] is load-bearing: it is the ADR that says it doesn't know, and it
 * is what a JS-off reader sees. The rotation was retired (design ADR 0010).
 */
export default function Hero() {
  const spec = SPECIMENS[0];

  return (
    <section id="top" className={`shell ${styles.hero}`}>
      <div className={styles.grid}>
        <div className={styles.say}>
          <p className={styles.eyebrow}>
            <span className="s">&lt;!--</span> {HERO.eyebrow}{" "}
            <span className="s">--&gt;</span>
          </p>
          <h1>
            <span className="s"># </span>
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

          <div className={`${styles.fence} ${styles.cmdFence}`}>
            <div className={styles.tick}>```sh</div>
            <div className={styles.cmdRow}>
              <code className={styles.cmd}>{MARKETPLACE_CMD}</code>
              <CopyButton text={MARKETPLACE_CMD} />
            </div>
            <div className={styles.tick}>```</div>
          </div>

          <p className={styles.meta}>
            {TOTAL_SKILLS} skills <span className="s">·</span> {HERO.metaTail}{" "}
            <span className="s">·</span> <a href="#skills">{HERO.metaLink}</a>
          </p>
        </div>

        <div>
          <div className={styles.card}>
            <div className={styles.cardBar}>
              <span className={styles.chip}>md</span>
              <span>{spec.source}</span>
              <span className={styles.by}>— {spec.by}</span>
            </div>
            <div className={styles.cardBody}>
              <pre className={styles.pre}>
                {spec.lines.map((l, i) => {
                  const nl = i < spec.lines.length - 1 ? "\n" : "";
                  if (l.parts) {
                    return (
                      <span key={i}>
                        {l.parts.map((part, j) => (
                          <span
                            key={j}
                            className={part.gap ? styles.gap : undefined}
                          >
                            {part.text}
                          </span>
                        ))}
                        {nl}
                      </span>
                    );
                  }
                  return (
                    <span
                      key={i}
                      className={l.kind === "gap" ? styles.gap : undefined}
                    >
                      {l.text}
                      {nl}
                    </span>
                  );
                })}
              </pre>
            </div>
            <div className={styles.cardFoot}>
              <span className="s">— </span>
              {HERO.specimenNote} <span className="s">·</span>{" "}
              <a href={spec.href}>{HERO.specimenLink}</a>
            </div>
          </div>
          <p className={styles.caption}>{spec.caption}</p>
        </div>
      </div>
    </section>
  );
}
