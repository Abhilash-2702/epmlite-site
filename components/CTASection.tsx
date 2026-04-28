"use client";

import { useState, FormEvent, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { DEMO_MAILTO } from "@/lib/constants";

function CTAForm() {
  const params = useSearchParams();
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
          referrer: typeof document !== "undefined" ? document.referrer : "",
          utm_source: params.get("utm_source") ?? undefined,
          utm_medium: params.get("utm_medium") ?? undefined,
          utm_campaign: params.get("utm_campaign") ?? undefined,
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
      <div className="rounded-xl bg-white/10 border border-white/20 p-5 text-white flex items-center gap-3">
        <Check className="w-5 h-5 text-accent-emerald shrink-0" />
        <p className="text-sm">
          Thanks — we&apos;ll be in touch within 1 business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="flex-1 rounded-xl bg-white/10 border border-white/20 placeholder:text-white/50 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent"
        />
        {/* honeypot — hidden from humans, bots fill it */}
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
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-brand-50 disabled:opacity-60 disabled:cursor-not-allowed text-brand-700 font-semibold px-5 py-3 transition-colors"
        >
          {status === "submitting" ? "Sending…" : "Get early access"}
          {status !== "submitting" && <ArrowRight className="w-4 h-4" />}
        </button>
      </div>
      {error && <p className="text-sm text-rose-200">{error}</p>}
      <p className="text-xs text-white/70">No credit card required. We&apos;ll never share your email.</p>
    </form>
  );
}

export default function CTASection() {
  return (
    <section className="gradient-cta py-20 lg:py-28 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-tight text-balance">
            Stop fighting Excel.
            <br />
            Start asking questions.
          </h2>
          <p className="mt-5 text-lg text-white/80 max-w-xl">
            Get a 15-minute walkthrough on your own data. No slides, no sales script — just the AI
            chat live with your numbers.
          </p>
          <div className="mt-8 max-w-lg">
            <Suspense fallback={null}>
              <CTAForm />
            </Suspense>
          </div>
        </div>

        <div className="lg:pl-8">
          <div className="rounded-2xl bg-white/10 border border-white/20 p-7 backdrop-blur">
            <p className="text-sm text-white/70 uppercase tracking-wider font-semibold">
              Or skip the form
            </p>
            <a
              href={DEMO_MAILTO}
              className="mt-3 inline-flex items-center gap-2 rounded-xl bg-white hover:bg-brand-50 text-brand-700 font-semibold px-6 py-3.5 transition-colors text-base"
            >
              Book a 15-min demo
              <ArrowRight className="w-4 h-4" />
            </a>
            <p className="mt-4 text-sm text-white/60">
              <a href={DEMO_MAILTO} className="underline-offset-2 hover:underline">
                or start a 14-day trial →
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
