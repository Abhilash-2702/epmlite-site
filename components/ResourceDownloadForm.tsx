"use client";

import { useState, FormEvent } from "react";
import { ArrowRight, Check, Download } from "lucide-react";

export default function ResourceDownloadForm() {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
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
          utm_source: "resource-download",
          utm_campaign: "fpa-starter-pack",
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
      <div className="rounded-xl bg-white/10 border border-white/20 p-5 text-white">
        <div className="flex items-center gap-3 mb-3">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-accent-emerald text-white">
            <Check className="w-5 h-5" />
          </span>
          <p className="font-display font-semibold text-base">
            Sent. Check your inbox.
          </p>
        </div>
        <p className="text-sm text-white/80 mb-4">
          The download link is on its way to <strong>{email}</strong>. While you wait, grab
          a quick look at the live product:
        </p>
        <a
          href="/demo"
          className="inline-flex items-center gap-1.5 rounded-lg bg-white hover:bg-brand-50 text-brand-700 text-sm font-semibold px-4 py-2.5 transition-colors"
        >
          Try the live demo
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div>
        <label htmlFor="resource-email" className="sr-only">
          Email
        </label>
        <input
          id="resource-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="w-full rounded-xl bg-white/10 border border-white/20 placeholder:text-white/50 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent"
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
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-brand-50 disabled:opacity-60 disabled:cursor-not-allowed text-brand-700 font-semibold px-5 py-3 transition-colors"
      >
        {status === "submitting" ? "Sending…" : "Send me the pack"}
        {status !== "submitting" && <Download className="w-4 h-4" />}
      </button>
      {error && <p className="text-sm text-rose-200">{error}</p>}
      <p className="text-xs text-white/60">
        We&apos;ll never share your email. Unsubscribe in one click.
      </p>
    </form>
  );
}
