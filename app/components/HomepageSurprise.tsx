"use client";

import { type ReactNode, useLayoutEffect, useRef } from "react";
import type { PhysicsPiece, Pose } from "./homepageSurprisePhysics";

type SavedPiece = { html: string; width: number; height: number; pose: Pose };

// Document-lifetime memory survives route eviction, but a browser refresh clears it.
let savedPieces: SavedPiece[] | null = null;

function foregroundColor(element: Element, utility: "text" | "decoration") {
  const pattern = new RegExp(`(?:^|\\s)${utility}-foreground(?:/(\\d+))?(?:\\s|$)`);
  for (let current: Element | null = element; current; current = current.parentElement) {
    const match = current.getAttribute("class")?.match(pattern);
    if (match) {
      return match[1]
        ? `color-mix(in oklab, var(--foreground) ${match[1]}%, transparent)`
        : "var(--foreground)";
    }
  }
  return "var(--foreground)";
}

function measurePieces(content: HTMLElement, root: HTMLElement): PhysicsPiece[] {
  const origin = root.getBoundingClientRect();
  const pieces: PhysicsPiece[] = [];
  const range = document.createRange();

  const add = (element: HTMLElement, rect: DOMRect) => {
    if (rect.width <= 0 || rect.height <= 0) return;
    element.className = "homepage-surprise-piece";
    element.style.width = `${rect.width}px`;
    element.style.height = `${rect.height}px`;
    pieces.push({
      element,
      width: rect.width,
      height: rect.height,
      pose: {
        x: rect.left - origin.left + rect.width / 2,
        y: rect.top - origin.top + rect.height / 2,
        angle: 0,
        vx: (Math.random() - 0.5) * 2,
        vy: 0,
        angularVelocity: (Math.random() - 0.5) * 0.035,
      },
    });
  };

  const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    const parent = node.parentElement;
    if (
      !parent ||
      parent.closest("script, style, noscript, svg, [hidden], .sr-only")
    ) continue;
    const style = getComputedStyle(parent);
    if (style.visibility !== "visible" || !parent.getClientRects().length) continue;
    const decoration = getComputedStyle(parent.closest("a") ?? parent);

    const addText = (start: number, end: number) => {
      range.setStart(node, start);
      range.setEnd(node, end);
      const rect = range.getBoundingClientRect();
      const element = document.createElement("span");
      element.textContent = node.data.slice(start, end);
      Object.assign(element.style, {
        font: style.font,
        fontFamily: style.fontFamily,
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        fontStyle: style.fontStyle,
        fontFeatureSettings: style.fontFeatureSettings,
        fontVariationSettings: style.fontVariationSettings,
        letterSpacing: style.letterSpacing,
        color: foregroundColor(parent, "text"),
        textTransform: style.textTransform,
        textDecoration: decoration.textDecoration,
        textDecorationColor: foregroundColor(parent, "decoration"),
        textUnderlineOffset: decoration.textUnderlineOffset,
        lineHeight: `${rect.height}px`,
      });
      add(element, rect);
    };

    for (const match of node.data.matchAll(/\S+/gu)) {
      const start = match.index;
      const end = start + match[0].length;
      range.setStart(node, start);
      range.setEnd(node, end);
      if (range.getClientRects().length <= 1) {
        addText(start, end);
        continue;
      }
      // A hyphenated word can occupy two lines; preserve each rendered fragment.
      let fragment = start;
      let offset = start;
      let top: number | undefined;
      for (const character of match[0]) {
        range.setStart(node, offset);
        range.setEnd(node, offset + character.length);
        const rect = range.getBoundingClientRect();
        if (top !== undefined && Math.abs(rect.top - top) > 1) {
          addText(fragment, offset);
          fragment = offset;
        }
        top = rect.top;
        offset += character.length;
      }
      addText(fragment, end);
    }
  }

  for (const icon of content.querySelectorAll<SVGSVGElement>("svg")) {
    if (getComputedStyle(icon).visibility !== "visible") continue;
    const rect = icon.getBoundingClientRect();
    const element = document.createElement("span");
    element.style.color = foregroundColor(icon, "text");
    const clone = icon.cloneNode(true) as SVGSVGElement;
    clone.setAttribute("width", String(rect.width));
    clone.setAttribute("height", String(rect.height));
    clone.style.display = "block";
    element.append(clone);
    add(element, rect);
  }
  return pieces;
}

export default function HomepageSurprise({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current!;
    const content = contentRef.current!;
    const layer = layerRef.current!;
    const button = buttonRef.current!;
    const status = statusRef.current!;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let pending = false;
    let touchRevealed = false;
    let revealOnly = false;
    let pieces: PhysicsPiece[] = [];
    let physics: ReturnType<typeof import("./homepageSurprisePhysics").startPhysics> | undefined;

    const restoreContent = () => {
      content.inert = false;
      content.style.removeProperty("visibility");
      delete root.dataset.surpriseActive;
      layer.hidden = true;
      layer.replaceChildren();
    };

    const activate = async (resume = false) => {
      if (pending || physics || (!resume && reducedMotion.matches)) return;
      pending = true;
      button.disabled = true;
      button.setAttribute("aria-busy", "true");
      try {
        const [{ startPhysics }] = await Promise.all([
          import("./homepageSurprisePhysics"),
          document.fonts.ready,
          ...content.getAnimations({ subtree: true }).map((animation) =>
            animation.finished.catch(() => {}),
          ),
        ]);
        if (disposed || (!resume && reducedMotion.matches)) return;
        pieces = savedPieces
          ? savedPieces.map(({ html, width, height, pose }) => {
              const template = document.createElement("template");
              template.innerHTML = html;
              return { element: template.content.firstElementChild as HTMLElement, width, height, pose };
            })
          : measurePieces(content, root);
        if (!pieces.length) throw new Error("No homepage pieces found");
        layer.replaceChildren(...pieces.map(({ element }) => element));
        layer.hidden = false;
        physics = startPhysics(layer, pieces, () => ({
          width: root.clientWidth,
          height: root.clientHeight,
        }));
        savedPieces = pieces.map(({ element, width, height, pose }) => ({
          html: element.outerHTML, width, height, pose,
        }));
        content.inert = true;
        content.style.visibility = "hidden";
        root.dataset.surpriseActive = "true";
        button.hidden = true;
        status.textContent = "Surprise! The words and icons have fallen. Refresh the page to restore the homepage and its links.";
        if (!resume) root.focus({ preventScroll: true });
      } catch {
        physics?.destroy();
        physics = undefined;
        if (!disposed) {
          restoreContent();
          button.hidden = false;
          status.textContent = "The surprise couldn't load. You can try again.";
        }
      } finally {
        pending = false;
        if (!disposed) {
          button.disabled = false;
          button.removeAttribute("aria-busy");
        }
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      revealOnly = event.pointerType === "touch" && !touchRevealed;
      if (event.pointerType === "touch") {
        touchRevealed = true;
        button.dataset.revealed = "true";
      }
    };
    const onClick = (event: MouseEvent) => {
      if (event.detail !== 0 && revealOnly) {
        revealOnly = false;
        return;
      }
      void activate();
    };
    const onOutsidePointer = (event: PointerEvent) => {
      if (!button.contains(event.target as Node)) {
        touchRevealed = false;
        revealOnly = false;
        delete button.dataset.revealed;
      }
    };

    button.hidden = false;
    button.disabled = false;
    button.addEventListener("pointerdown", onPointerDown);
    button.addEventListener("click", onClick);
    document.addEventListener("pointerdown", onOutsidePointer);
    if (savedPieces) {
      content.inert = true;
      content.style.visibility = "hidden";
      button.hidden = true;
      void activate(true);
    }

    return () => {
      disposed = true;
      if (physics) {
        const poses = physics.snapshot();
        savedPieces = pieces.map(({ element, width, height }, index) => ({
          html: element.outerHTML, width, height, pose: poses[index],
        }));
        physics.destroy();
      }
      button.removeEventListener("pointerdown", onPointerDown);
      button.removeEventListener("click", onClick);
      document.removeEventListener("pointerdown", onOutsidePointer);
      delete button.dataset.revealed;
      button.hidden = true;
      restoreContent();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      tabIndex={-1}
      role="group"
      aria-label="Homepage"
      className="homepage-surprise-root relative flex flex-1 flex-col focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-foreground"
    >
      <div ref={contentRef} className="flex flex-1 flex-col">
        {children}
      </div>
      <div ref={layerRef} className="homepage-surprise-layer" aria-hidden="true" hidden />
      <button ref={buttonRef} type="button" className="homepage-surprise-trigger" hidden disabled>
        <span className="homepage-surprise-label">surprise</span>
      </button>
      <p ref={statusRef} role="status" className="sr-only tailwindsr-only" />
    </div>
  );
}
