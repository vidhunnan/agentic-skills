import { FOOTER, NAV } from "./lib/content";
import { REPO_URL } from "./lib/skills";
import styles from "./Footer.module.css";

/**
 * Four columns. The old footer was one dim line; round 3's brief called for a
 * real one. The record column links the tiers the page argues for — a page that
 * says "read the records" should say where they are.
 */
export default function Footer() {
  return (
    <footer className={styles.foot}>
      <div className="shell">
        <div className={styles.grid}>
          <div>
            <a className={styles.mark} href="#top">
              <span className={styles.glyph} aria-hidden="true">
                ▮
              </span>
              <span>{NAV.mark}</span>
            </a>
            <p className={styles.blurb}>{FOOTER.blurb}</p>
          </div>

          {FOOTER.groups.map((g) => (
            <div key={g.title}>
              <h3 className={styles.title}>{g.title}</h3>
              <ul className={styles.list}>
                {g.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={
                        l.href.startsWith("#") ? l.href : `${REPO_URL}${l.href}`
                      }
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className={styles.title}>Elsewhere</h3>
            <ul className={styles.list}>
              {FOOTER.elsewhere.map((l) => (
                <li key={l.label}>
                  <a
                    href={
                      l.href.startsWith("http") ? l.href : `${REPO_URL}${l.href}`
                    }
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className={styles.bar}>
          <span className="s">&lt;!-- </span>
          {FOOTER.builtBy}{" "}
          <a href={FOOTER.authorHref} className={styles.author}>
            {FOOTER.author}
          </a>{" "}
          · {FOOTER.licence}
          <span className="s"> --&gt;</span>
        </p>
      </div>
    </footer>
  );
}
