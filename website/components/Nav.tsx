import { NAV } from "./lib/content";
import { REPO_URL } from "./lib/skills";
import NavLinks from "./NavLinks";
import styles from "./Nav.module.css";

/**
 * Replaces FileBar, which was a 12.5px text strip. Round 3's brief called for
 * "a real nav with a mark and an install CTA".
 *
 * The old bar hid links by :nth-child() at two breakpoints, so reordering the
 * array silently changed which ones vanished on mobile. The whole list goes at
 * once now; the CTA never does.
 */
export default function Nav() {
  return (
    <header className={styles.bar}>
      <div className={`shell ${styles.inner}`}>
        <a className={styles.mark} href="#top">
          <span className={styles.glyph} aria-hidden="true">
            ▮
          </span>
          <span>{NAV.mark}</span>
          <span className={styles.dim}>
            <span className="s">/</span> {NAV.file}
          </span>
        </a>
        <nav className={styles.nav}>
          <NavLinks />
          <a href={REPO_URL}>{NAV.source}</a>
        </nav>
        <a className={styles.cta} href="#install">
          {NAV.cta}
        </a>
      </div>
    </header>
  );
}
