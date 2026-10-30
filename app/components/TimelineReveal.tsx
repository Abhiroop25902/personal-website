"use client";

import { type ReactNode, useEffect, useRef } from "react";

export default function TimelineReveal({ children }: { children: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window)) return;

    const entries = section.querySelectorAll<HTMLElement>(
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
      if (!entry || !section.contains(entry)) return;

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

    section.addEventListener("focusin", revealFocused);
    section.addEventListener("animationend", clearAnimation);
    section.addEventListener("animationcancel", clearAnimation);

    for (const entry of entries) {
      observer.observe(entry);
    }

    return () => {
      active = false;
      observer.disconnect();
      section.removeEventListener("focusin", revealFocused);
      section.removeEventListener("animationend", clearAnimation);
      section.removeEventListener("animationcancel", clearAnimation);
      for (const entry of entries) entry.classList.remove("motion-enter");
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Project timeline"
      className="mt-10 sm:mt-12"
    >
      {children}
    </section>
  );
}
