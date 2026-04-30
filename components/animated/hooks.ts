"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Returns true only when the device should run heavy looping animations:
 *   - Not reduced-motion
 *   - Viewport >= 1024px (desktop)
 *
 * Mobile/tablet devices freeze on a stable frame instead of cycling. Saves
 * meaningful main-thread time on slow CPUs (typical mid-range Android).
 */
export function useShouldAnimate(): boolean {
  const reduced = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return !reduced && isDesktop;
}
