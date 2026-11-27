import { useEffect, type RefObject } from "react";

// The left spine of each band fills as the band scrolls past. Port of the
// mock-up's paintSpine(): one rAF-throttled scroll listener for every band,
// a 120ms-debounced resize, and a repaint on window load and once the fonts
// are ready. Each band's .hp-wrap gets --hp-p (0..1), which .hp-spine i reads.
const wraps = new Set<HTMLElement>();
let ticking = false;
let resizeTimer = 0;

function paint() {
  const vh = window.innerHeight;
  wraps.forEach((w) => {
    const r = w.getBoundingClientRect();
    const p = Math.max(0, Math.min(1, (vh * 0.55 - r.top) / r.height));
    w.style.setProperty("--hp-p", (Number.isNaN(p) ? 0 : p).toFixed(4));
  });
}

function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    ticking = false;
    paint();
  });
}

function onResize() {
  window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(paint, 120);
}

function start() {
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
  window.addEventListener("load", paint);
  document.fonts?.ready.then(() => {
    if (wraps.size) paint();
  });
}

function stop() {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onResize);
  window.removeEventListener("load", paint);
  window.clearTimeout(resizeTimer);
}

/** Registers a band's .hp-wrap element for the spine fill. */
export function useSpineProgress(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (wraps.size === 0) start();
    wraps.add(el);
    // First paint on the next frame, shared by every band mounting now.
    onScroll();
    return () => {
      wraps.delete(el);
      el.style.removeProperty("--hp-p");
      if (wraps.size === 0) stop();
    };
  }, [ref]);
}
