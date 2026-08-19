"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./Nav.module.css";

/**
 * The bar hides on the way down and returns on the way up.
 *
 * rAF-throttled passive listener, the same shape the deleted Nav used for its
 * scrollspy. Two guards worth keeping:
 *
 * - It never hides within the first 80px, so the top of the page always has its
 *   nav, and a short page can never hide it permanently.
 * - A small threshold before reacting, otherwise trackpad jitter flickers it.
 *
 * Under prefers-reduced-motion the bar simply stays put — a header that leaves
 * and returns is exactly the kind of unrequested movement that preference is
 * asking not to see, and hiding it without the transition would be worse.
 */
export default function NavShell({ children }: { children: ReactNode }) {
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    last.current = window.scrollY;

    function update() {
      const y = window.scrollY;
      const dy = y - last.current;
      if (Math.abs(dy) > 6) {
        setHidden(dy > 0 && y > 80);
        last.current = y;
      }
      ticking.current = false;
    }
    function onScroll() {
      if (!ticking.current) {
        requestAnimationFrame(update);
        ticking.current = true;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.bar} ${hidden ? styles.away : ""}`}>
      {children}
    </header>
  );
}
