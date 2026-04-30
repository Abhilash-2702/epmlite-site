"use client";

import { useState, FormEvent } from "react";
import { ArrowRight, Check, Mail } from "lucide-react";

type Variant = "card" | "inline" | "footer";

export default function NewsletterSignup({ variant = "card" }: { variant?: Variant }) {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "ok" | "error">("idle");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          website,
          utm_source: "newsletter",
          utm_campaign: variant,
        }),
      });
      if (!res.ok) {
        setStatus("error");
        return;
      }
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }

  if (variant === "footer") {
    return (
      <form onSubmit={onSubmit} className="space-y-2">
        <p className="text-xs font-semibold text-white/80 uppercase tracking-wider">
          FP&amp;A weekly
        </p>
        <p className="text-sm text-slate-400">
          One email a week. Patterns, product, no fluff.
        </p>
        {status === "ok" ? (
          <div className="inline-flex items-center gap-2 text-sm text-accent-emerald">
            <Check className="w-4 h-4" />
            Thanks — check your inbox.
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="flex-1 rounded-lg bg-sidebar-hover border border-sidebar-border placeholder:text-slate-500 text-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-400 focus:border-brand-400"
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
              className="inline-flex items-center justify-center rounded-lg bg-brand-500 hover:bg-brand-600 disabled:opacity-60 text-white text-sm font-semibold px-3 py-2"
              aria-label="Subscribe"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </form>
    );
  }

  // card / inline
  const wrapClass =
    variant === "card"
      ? "rounded-2xl bg-white border border-surface-200 p-6 lg:p-7 shadow-card"
      : "rounded-2xl bg-brand-50 border border-brand-100 p-6";

  return (
    <div className={wrapClass}>
      <div className="flex items-start gap-4">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-brand-500 text-white shrink-0">
          <Mail className="w-5 h-5" />
        </span>
        <div className="flex-1">
          <h3 className="font-display font-semibold text-lg text-slate-900">
            Get the FP&amp;A weekly
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            One email per week. Practical patterns from the trenches + product updates.
            Unsubscribe in one click.
          </p>
          {status === "ok" ? (
            <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent-emerald">
              <Check className="w-4 h-4" />
              You&apos;re in. Check your inbox.
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-4 flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="flex-1 rounded-xl bg-white border border-surface-200 placeholder:text-slate-400 text-slate-900 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500"
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
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand-500 hover:bg-brand-600 disabled:opacity-60 text-white font-semibold px-5 py-2.5 transition-colors shadow-card"
              >
                {status === "submitting" ? "…" : "Subscribe"}
                {status !== "submitting" && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
