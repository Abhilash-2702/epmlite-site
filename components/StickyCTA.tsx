"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowRight, X, Sparkles } from "lucide-react";
import { DEMO_MAILTO } from "@/lib/constants";

const STORAGE_KEY = "epm-sticky-cta-dismissed-at";
const DISMISS_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

const HIDDEN_PATHS = ["/contact", "/demo"];

export default function StickyCTA() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (HIDDEN_PATHS.some((p) => pathname.startsWith(p))) {
      setVisible(false);
      return;
    }

    let dismissedAt = 0;
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v) dismissedAt = parseInt(v, 10) || 0;
    } catch {}

    const now = Date.now();
    if (now - dismissedAt < DISMISS_TTL_MS) {
      setVisible(false);
      return;
    }

    let revealed = false;
    const onScroll = () => {
      if (revealed) return;
      if (window.scrollY > 600) {
        setVisible(true);
        revealed = true;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  function dismiss() {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {}
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 border-t border-brand-700/40 bg-gradient-to-r from-brand-700 to-brand-900 text-white shadow-elevated"
      role="region"
      aria-label="Promotional CTA"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3 sm:gap-4">
        <span className="hidden sm:inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 text-white shrink-0">
          <Sparkles className="w-4 h-4" />
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate">
            See NashOS live on your data.
          </p>
          <p className="hidden sm:block text-xs text-white/70">
            15-minute walkthrough. No slides, no sales script.
          </p>
        </div>
        <Link
          href="/demo"
          className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold px-4 py-2 transition-colors"
        >
          Live demo
        </Link>
        <a
          href={DEMO_MAILTO}
          className="inline-flex items-center gap-1.5 rounded-xl bg-white hover:bg-brand-50 text-brand-700 text-sm font-semibold px-4 py-2 transition-colors"
        >
          Book demo
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
        <button
          onClick={dismiss}
          className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
