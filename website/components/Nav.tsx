"use client";

import { useEffect, useRef, useState } from "react";
import { REPO_URL } from "./lib/skills";
import styles from "./Nav.module.css";

const LINKS = [
  { id: "stack", label: "System" },
  { id: "design", label: "Design" },
  { id: "skills", label: "Skills" },
  { id: "install", label: "Install" },
];

export default function Nav() {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const ticking = useRef(false);

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
          <a
            className={styles.github}
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
        </div>
      </nav>
    </>
  );
}
