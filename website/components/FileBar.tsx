import { REPO, REPO_URL } from "./lib/skills";
import styles from "./FileBar.module.css";

/**
 * Frames the whole page as a file. Server component — the old Nav carried a
 * scroll-progress bar, a scrollspy and a palette trigger; none survived the
 * rebuild, so this needs no JS at all.
 *
 * Labels must match the heading each one points at. The old nav called a
 * section "System" while the section called itself "The context stack".
 */
const LINKS = [
  { id: "written", label: "what gets written" },
  { id: "how", label: "how one skill works" },
  { id: "skills", label: "the skills" },
  { id: "install", label: "install" },
];

export default function FileBar() {
  return (
    <div className={styles.bar}>
      <div className={`wrap ${styles.inner}`}>
        <span className={styles.path}>
          <b>{REPO}</b> <span className="s">/</span> README.md
        </span>
        <nav className={styles.nav}>
          {LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`}>
              {l.label}
            </a>
          ))}
          <a href={REPO_URL} className={styles.src}>
            source&nbsp;↗
          </a>
        </nav>
      </div>
    </div>
  );
}
