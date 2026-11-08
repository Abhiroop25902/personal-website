"use client";

import { type ReactNode, useEffect, useRef } from "react";

export default function TimelineReveal({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !("IntersectionObserver" in window)) return;

    const entries = container.querySelectorAll<HTMLElement>(
      ":scope > ol > .timeline-entry",
    );
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const seen = new WeakSet<Element>();
    let active = true;

    const observer = new IntersectionObserver(
      (changes) => {
        if (!active) return;

        for (const { target, isIntersecting } of changes) {
          if (!isIntersecting || seen.has(target)) continue;

          seen.add(target);
          observer.unobserve(target);
          if (!reducedMotion.matches && !target.matches(":focus-within")) {
            target.classList.add("motion-enter");
          }
        }
      },
      { threshold: 0 },
    );

    const revealFocused = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const entry = event.target.closest(".timeline-entry");
      if (!entry || !container.contains(entry)) return;

      seen.add(entry);
      observer.unobserve(entry);
      entry.classList.remove("motion-enter");
    };

    const clearAnimation = (event: AnimationEvent) => {
      if (
        event.animationName === "homepage-enter" &&
        event.target instanceof Element &&
        event.target.matches(".timeline-entry")
      ) {
        event.target.classList.remove("motion-enter");
      }
    };

    container.addEventListener("focusin", revealFocused);
    container.addEventListener("animationend", clearAnimation);
    container.addEventListener("animationcancel", clearAnimation);

    for (const entry of entries) {
      observer.observe(entry);
    }

    return () => {
      active = false;
      observer.disconnect();
      container.removeEventListener("focusin", revealFocused);
      container.removeEventListener("animationend", clearAnimation);
      container.removeEventListener("animationcancel", clearAnimation);
      for (const entry of entries) entry.classList.remove("motion-enter");
    };
  }, []);

  return <div ref={containerRef}>{children}</div>;
}
