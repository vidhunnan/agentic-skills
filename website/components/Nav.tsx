"use client";

import { useEffect, useRef, useState } from "react";
import { REPO_URL } from "./lib/skills";
import { OPEN_EVENT } from "./CommandPalette";
import styles from "./Nav.module.css";

const LINKS = [
  { id: "stack", label: "System" },
  { id: "design", label: "Design" },
  { id: "skills", label: "Skills" },
  { id: "proof", label: "Proof" },
  { id: "install", label: "Install" },
];

export default function Nav() {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  // Rendered after mount only — navigator.platform on the server would be a
  // hydration mismatch, and the shortcut hint is decorative anyway.
  const [modKey, setModKey] = useState<string | null>(null);
  const ticking = useRef(false);

  useEffect(() => {
    setModKey(/Mac|iPhone|iPad/.test(navigator.platform ?? "") ? "⌘" : "Ctrl");
  }, []);

  useEffect(() => {
    function update() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      setScrolled(scrollTop > 4);

      let current = "";
      for (const { id } of LINKS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 130) current = id;
      }
      setActive(current);
      ticking.current = false;
    }
    function onScroll() {
      if (!ticking.current) {
        requestAnimationFrame(update);
        ticking.current = true;
      }
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <div className={styles.progress} style={{ width: `${progress}%` }} />
      <nav className={`${styles.nav} ${scrolled ? styles.isScrolled : ""}`}>
        <div className={`wrap ${styles.inner}`}>
          <a href="#top" className={styles.logo}>
            agentic<span>-</span>skills
          </a>
          <div className={styles.links}>
            {LINKS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`${styles.anchor} ${active === id ? styles.isActive : ""}`}
              >
                {label}
              </a>
            ))}
          </div>
          <div className={styles.tail}>
            {/* Rendered only after mount. The palette is JS-only, so shipping
                this button in the static HTML would put a dead control on the
                page for anyone without it. */}
            {modKey ? (
              <button
                type="button"
                className={styles.search}
                onClick={() => window.dispatchEvent(new CustomEvent(OPEN_EVENT))}
                aria-label="Search skills, tiers and sections"
                aria-keyshortcuts="Meta+K Control+K"
              >
                <span aria-hidden="true">Search</span>
                <kbd className={styles.kbd} aria-hidden="true">
                  {modKey}K
                </kbd>
              </button>
            ) : null}
            <a
              className={styles.github}
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
