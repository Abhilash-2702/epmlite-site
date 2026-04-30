"use client";

import { useEffect, useState, FormEvent } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { X, ArrowRight, Download, Check } from "lucide-react";

const STORAGE_KEY = "epm-exit-intent-shown-at";
const TTL_MS = 1000 * 60 * 60 * 24 * 14; // 14 days

const HIDDEN_PATHS = ["/contact", "/resources", "/demo"];

export default function ExitIntent() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "ok">("idle");

  useEffect(() => {
    if (HIDDEN_PATHS.some((p) => pathname.startsWith(p))) return;

    let lastShown = 0;
    try {
      lastShown = parseInt(localStorage.getItem(STORAGE_KEY) ?? "0", 10) || 0;
    } catch {}
    if (Date.now() - lastShown < TTL_MS) return;

    let armed = false;
    const arm = () => {
      armed = true;
    };
    // Arm only after some scroll so it doesn't fire on page-entry mouse twitch
    const onScroll = () => {
      if (window.scrollY > 400 && !armed) arm();
    };
    const onMouseLeave = (e: MouseEvent) => {
      if (!armed) return;
      if (e.clientY <= 0) {
        setOpen(true);
        try {
          localStorage.setItem(STORAGE_KEY, String(Date.now()));
        } catch {}
        document.removeEventListener("mouseleave", onMouseLeave);
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  // Lock scroll when open
  useEffect(() => {
    if (open) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          website,
          utm_source: "exit-intent",
          utm_campaign: "fpa-starter-pack",
        }),
      });
      setStatus("ok");
    } catch {
      setStatus("ok"); // optimistic
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-elevated overflow-hidden">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 inline-flex items-center justify-center w-8 h-8 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-surface-100 transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
        {/* Header band */}
        <div className="px-6 py-5 lg:px-8 lg:py-6 bg-gradient-to-br from-brand-700 to-brand-900 text-white">
          <p className="text-xs font-semibold text-brand-200 uppercase tracking-wider mb-1.5">
            Wait — before you go
          </p>
          <h2 className="font-display font-bold text-2xl lg:text-3xl tracking-tight">
            Grab the FP&amp;A starter pack.
          </h2>
          <p className="mt-1 text-sm text-white/80">
            P&amp;L · Cash Flow · Runway · Variance pack templates. Free, no drip.
          </p>
        </div>
        {/* Body */}
        <div className="p-6 lg:p-7">
          {status === "ok" ? (
            <div className="text-center py-2">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 text-accent-emerald mb-3">
                <Check className="w-6 h-6" />
              </span>
              <p className="font-display font-semibold text-slate-900">
                Sent. Check your inbox.
              </p>
              <p className="text-sm text-slate-600 mt-1">
                The download link is on its way to <strong>{email}</strong>.
              </p>
              <Link
                href="/demo"
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
              >
                See the live product
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full rounded-xl bg-white border border-surface-200 placeholder:text-slate-400 text-slate-900 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500"
                autoFocus
              />
              <input
                type="text"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] w-0 h-0 opacity-0"
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 hover:bg-brand-600 disabled:opacity-60 text-white font-semibold px-5 py-3 transition-colors shadow-card"
              >
                {status === "submitting" ? "Sending…" : "Send me the pack"}
                {status !== "submitting" && <Download className="w-4 h-4" />}
              </button>
              <p className="text-xs text-slate-500 text-center">
                Or just{" "}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="underline underline-offset-2 hover:text-slate-700"
                >
                  keep browsing
                </button>{" "}
                — we won&apos;t ask again for two weeks.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
