import CopyButton from "./CopyButton";
import { MARKETPLACE_CMD, SPECIMENS } from "./lib/skills";
import styles from "./Hero.module.css";

/**
 * SPECIMENS[0] is load-bearing: it is the ADR that says it doesn't know, and
 * it is what a JS-off reader sees. The rotation was retired (design ADR 0010),
 * so breadth moved to the catalogue and this shows one record properly.
 */
export default function Hero() {
  const spec = SPECIMENS[0];

  return (
    <section id="top" className={`wrap ${styles.hero}`}>
      <p className={styles.eyebrow}>
        <span className="s">&lt;!--</span> agent skills for claude code{" "}
        <span className="s">--&gt;</span>
      </p>

      <h1 className={styles.h1}>
        <span className="s"># </span>An agent needs context to do good work.
        <span className={styles.cont}>Most of it was never written down.</span>
      </h1>

      <p className={styles.lede}>
        What shipped, why you chose it, what you tried and killed — from git,
        your files and your answers. And where nobody remembers why,{" "}
        <span className={styles.gap}>they say so</span>.
      </p>

      <div className={styles.fence}>
        <div className={styles.tick}>```sh</div>
        <div className={styles.cmdRow}>
          <code className={styles.cmd}>{MARKETPLACE_CMD}</code>
          <CopyButton text={MARKETPLACE_CMD} />
        </div>
        <div className={styles.tick}>```</div>
      </div>

      <div className={styles.specimen}>
        <h2 className={styles.h2}>
          <span className="s">## </span>A record that admits it doesn&rsquo;t
          know
        </h2>
        <p className={styles.sub}>Not an example. A real file in this repo.</p>

        <div className={styles.fence}>
          <div className={styles.tick}>```md</div>
          <pre className={styles.pre}>
            {spec.lines.map((l, i) => (
              <span
                key={i}
                className={l.kind === "gap" ? styles.gap : undefined}
              >
                {l.text}
                {i < spec.lines.length - 1 ? "\n" : ""}
              </span>
            ))}
          </pre>
          <div className={styles.tick}>```</div>
        </div>

        <p className={styles.src}>
          <span className="s">— </span>
          {spec.source} <span className="s">·</span>{" "}
          <a href={spec.href}>[read the whole thing]</a>
        </p>
        <p className={styles.caption}>{spec.caption}</p>
      </div>
    </section>
  );
}
