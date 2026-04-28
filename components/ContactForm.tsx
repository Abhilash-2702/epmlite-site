"use client";

import { useState, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";

export default function ContactForm() {
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "ok" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          website,
          referrer: typeof document !== "undefined" ? document.referrer : "",
          utm_source: params.get("utm_source") ?? "contact-page",
          utm_medium: params.get("utm_medium") ?? undefined,
          utm_campaign: params.get("utm_campaign") ?? undefined,
          // message is metadata-only for now (route just logs it via the JSON body)
          notes: message,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Something went wrong.");
        setStatus("error");
        return;
      }
      setStatus("ok");
    } catch {
      setError("Network error. Try again?");
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-5 text-slate-900 flex items-start gap-3">
        <Check className="w-5 h-5 text-accent-emerald shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold">Got it.</p>
          <p className="text-sm text-slate-600 mt-0.5">
            We&apos;ll be in touch within one business day.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="w-full rounded-xl bg-white border border-surface-200 placeholder:text-slate-400 text-slate-900 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="message">
          What are you trying to do? <span className="text-slate-400">(optional)</span>
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          placeholder="We're closing the books in 11 days and the variance pack is killing us…"
          className="w-full rounded-xl bg-white border border-surface-200 placeholder:text-slate-400 text-slate-900 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 resize-none"
        />
      </div>
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
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 hover:bg-brand-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-5 py-3 shadow-card transition-colors"
      >
        {status === "submitting" ? "Sending…" : "Send"}
        {status !== "submitting" && <ArrowRight className="w-4 h-4" />}
      </button>
      {error && <p className="text-sm text-accent-rose">{error}</p>}
      <p className="text-xs text-slate-500">
        No credit card required. We&apos;ll never share your email.
      </p>
    </form>
  );
}
