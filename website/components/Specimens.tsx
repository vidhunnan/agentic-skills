"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SPECIMENS } from "./lib/skills";
import styles from "./Specimens.module.css";

/** How long each specimen holds before the next one takes over. */
const DWELL_MS = 6500;

export default function Specimens() {
  const [i, setI] = useState(0);
  /** Set on mount. Until then CSS shows specimen 0 only — see the stack note. */
  const [ready, setReady] = useState(false);
  /** The visitor pressed pause. Sticky: never overridden by hover or scroll. */
  const [stopped, setStopped] = useState(false);
  /** Transient reasons to hold: pointer, focus, hidden tab, scrolled away. */
  const [held, setHeld] = useState(false);
  const [reduced, setReduced] = useState(false);

  const rootRef = useRef<HTMLElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const hidden = useRef(false);
  const offscreen = useRef(false);

  const go = useCallback(
    (n: number) => setI((n + SPECIMENS.length) % SPECIMENS.length),
    [],
  );

  useEffect(() => setReady(true), []);

  // Reduced motion is a live setting, not a one-shot read: a visitor can turn
  // it on while the page is open and the rotation must stop when they do.
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Two conditions the pointer and the keyboard can't express: a backgrounded
  // tab (which would otherwise burn the whole set before anyone looks) and a
  // hero that has been scrolled past. Both are tracked as refs and folded into
  // one `held` flag, so neither can clear a hold the other still wants.
  useEffect(() => {
    const el = rootRef.current;
    const sync = () => setHeld(hidden.current || offscreen.current);

    const onVisibility = () => {
      hidden.current = document.hidden;
      sync();
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Same observer idiom as Reveal, but deliberately *not* unobserved: this
    // one has to keep toggling as the hero enters and leaves the viewport.
    let io: IntersectionObserver | undefined;
    if (el && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        ([e]) => {
          offscreen.current = !e.isIntersecting;
          sync();
        },
        { threshold: 0.25 },
      );
      io.observe(el);
    }

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      io?.disconnect();
    };
  }, []);

  const running = ready && !reduced && !stopped && !held;

  useEffect(() => {
    if (!running) return;
    const t = window.setInterval(() => go(i + 1), DWELL_MS);
    return () => window.clearInterval(t);
  }, [running, i, go]);

  // Roving tabindex: one stop for the whole dot row, arrows move within it.
  const onDotKeyDown = (e: React.KeyboardEvent) => {
    const tabs = dotsRef.current?.querySelectorAll<HTMLButtonElement>(
      "[role='tab']",
    );
    if (!tabs?.length) return;

    // Move relative to what is actually focused, not to the selected index.
    // Normally they are the same — the roving tabindex means only the
    // selected dot is a tab stop — but reading focus keeps the two from ever
    // drifting apart if focus is moved some other way.
    const from = Math.max(
      0,
      [...tabs].indexOf(document.activeElement as HTMLButtonElement),
    );
    const last = tabs.length - 1;

    let next: number;
    if (e.key === "ArrowRight") next = from === last ? 0 : from + 1;
    else if (e.key === "ArrowLeft") next = from === 0 ? last : from - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;

    e.preventDefault();
    // Selection follows focus, per the tabs pattern — the panel is already
    // rendered, so there is nothing to defer.
    setI(next);
    tabs[next]?.focus();
  };

  return (
    <div
      className={styles.wrap}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(hidden.current || offscreen.current)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(hidden.current || offscreen.current)}
    >
      <figure
        ref={rootRef}
        className={styles.stack}
        data-ready={ready ? "" : undefined}
      >
        {SPECIMENS.map((s, n) => (
          <div
            key={s.href}
            id={`specimen-${n}`}
            role="tabpanel"
            aria-labelledby={`specimen-tab-${n}`}
            aria-hidden={n === i ? undefined : true}
            className={`${styles.slide} ${n === i ? styles.isActive : ""}`}
            // Inactive slides keep their box (that is what stops the card
            // resizing) but must not be reachable by Tab or a screen reader.
            inert={n !== i}
          >
            <div className={styles.head}>
              <span className={styles.path}>{s.source}</span>
              <span className={styles.tag}>written by {s.by}</span>
            </div>
            {/* Raw Markdown reads badly aloud ("hash hash What we gave up",
                "asterisk paren none identified"), and the caption below
                carries the meaning. Visual specimen, described in text. */}
            <div className={styles.lines} aria-hidden="true">
              {s.lines.map((l, k) => (
                <span key={k} className={styles[l.kind]}>
                  {l.text}
                </span>
              ))}
            </div>
            <figcaption className={styles.caption}>
              {s.caption}{" "}
              <a href={s.href} target="_blank" rel="noreferrer">
                Read it →
              </a>
            </figcaption>
          </div>
        ))}
      </figure>

      {/* Controls render only once JS is up: without a working rotation they
          would be six buttons that do nothing. */}
      {ready ? (
        <div className={styles.controls}>
          <div
            ref={dotsRef}
            role="tablist"
            aria-label="Skill output specimens"
            className={styles.dots}
            onKeyDown={onDotKeyDown}
          >
            {SPECIMENS.map((s, n) => (
              <button
                key={s.href}
                id={`specimen-tab-${n}`}
                type="button"
                role="tab"
                aria-selected={n === i}
                aria-controls={`specimen-${n}`}
                tabIndex={n === i ? 0 : -1}
                className={`${styles.dot} ${n === i ? styles.dotOn : ""}`}
                onClick={() => setI(n)}
              >
                <span className={styles.dotMark} />
                <span className={styles.srOnly}>{`${s.by} — ${s.source}`}</span>
              </button>
            ))}
          </div>

          {/* Hover and focus pausing does not reach a visitor who never
              enters the widget, and this auto-updates for longer than five
              seconds. WCAG 2.2 SC 2.2.2 wants a real control. */}
          {reduced ? null : (
            <button
              type="button"
              className={styles.pause}
              aria-pressed={stopped}
              onClick={() => setStopped((v) => !v)}
            >
              {stopped ? "play" : "pause"}
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}
