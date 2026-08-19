"use client";

import { useEffect, useState } from "react";
import { NAV } from "./lib/content";
import styles from "./Nav.module.css";

/**
 * The links, plus which section you are in.
 *
 * Client only for the marking — the links themselves are in the static export,
 * so a JS-off reader gets working navigation and simply no active state. JS
 * enhances, never reveals (design/specs/motion.md).
 *
 * A round 3 draft carried a sticky 01–04 rail doing this job in a left column.
 * It was cut: it read as documentation furniture, which is the one association
 * this page is trying not to trigger.
 */
export default function NavLinks() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const ids = NAV.links.map((l) => l.id);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length || !("IntersectionObserver" in window)) return;

    const seen = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) seen.add(e.target.id);
          else seen.delete(e.target.id);
        }
        setActive(ids.find((id) => seen.has(id)) ?? null);
      },
      { rootMargin: "-88px 0px -62% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <>
      {NAV.links.map((l) => (
        <a
          key={l.id}
          href={`#${l.id}`}
          className={active === l.id ? styles.on : undefined}
        >
          {l.label}
        </a>
      ))}
    </>
  );
}
