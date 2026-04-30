"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Lazy-load the three "ambient" widgets (chat bubble, exit intent, sticky
// CTA bar). None of them are needed for first paint, none of them need
// SSR — so they should be:
//   1. Excluded from the SSR HTML (ssr: false)
//   2. Excluded from initial First Load JS (lazy chunk)
//   3. Mounted only after the page is idle (so they don't compete with
//      hero hydration and Framer Motion bootstrapping on slow mobile CPUs)
//
// The combined save vs the previous direct-import setup is ~12-18 kB on
// First Load JS for every route, plus a measurable improvement in
// time-to-interactive on slow networks.

const StickyCTA = dynamic(() => import("@/components/StickyCTA"), { ssr: false });
const ChatBubble = dynamic(() => import("@/components/ChatBubble"), { ssr: false });
const ExitIntent = dynamic(() => import("@/components/ExitIntent"), { ssr: false });

export default function DeferredWidgets() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Defer mount until browser is idle, so first paint + hero hydration
    // happen first. requestIdleCallback isn't supported in Safari, fall
    // back to a 1500ms setTimeout there.
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let idleId: number | undefined;
    let timeoutId: number | undefined;

    if (typeof w.requestIdleCallback === "function") {
      idleId = w.requestIdleCallback(() => setReady(true), { timeout: 2500 });
    } else {
      timeoutId = window.setTimeout(() => setReady(true), 1500);
    }

    return () => {
      if (idleId !== undefined && w.cancelIdleCallback) w.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  if (!ready) return null;
  return (
    <>
      <StickyCTA />
      <ChatBubble />
      <ExitIntent />
    </>
  );
}
