"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Marks the document as reveal-capable exactly once, on first mount.
 *
 * The hidden state lives behind `.js-reveal` rather than in the base `.reveal`
 * rule, so the static HTML ships visible. Without this, JS-off visitors got a
 * blank page on a fully prerendered site.
 */
function useRevealCapable() {
  useEffect(() => {
    document.documentElement.classList.add("js-reveal");
  }, []);
}

export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  style,
  index = 0,
}: {
  children: ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
  /** Position within its list — drives the stagger via --reveal-i. */
  index?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useRevealCapable();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No IO, or the visitor asked for less motion: show immediately.
    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced || !("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          // `isIntersecting` alone loses rows that were scrolled *past* faster
          // than the observer samples — a hard flick of the wheel, an anchor
          // jump, or a programmatic scroll. Those never intersect, so they
          // would sit at opacity 0 until the reader happened to scroll back up.
          // Anything now above the viewport has been arrived at; show it.
          const scrolledPast = e.boundingClientRect.bottom < 0;
          if (e.isIntersecting || scrolledPast) {
            setInView(true);
            io.unobserve(e.target);
          }
        });
      },
      // Start the transition slightly before the row reaches the viewport, so
      // it reads as already-settling rather than popping in.
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Component = Tag as React.ElementType;
  return (
    <Component
      ref={ref}
      className={`reveal ${inView ? "is-in" : ""} ${className}`.trim()}
      style={
        index
          ? ({ ...style, "--reveal-i": index } as React.CSSProperties)
          : style
      }
    >
      {children}
    </Component>
  );
}
