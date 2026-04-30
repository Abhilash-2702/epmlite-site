"use client";

import { useState, FormEvent, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { DEMO_MAILTO } from "@/lib/constants";

type Step = "email" | "profile" | "ok";

const ROLES = ["CFO / VP Finance", "FP&A manager / analyst", "Founder / CEO", "Other"];
const TEAM_SIZES = ["1 (just me)", "2–5", "6–15", "16+"];
const CURRENT_TOOLS = ["Excel only", "Excel + BI", "Anaplan / Adaptive", "Other EPM tool"];

function CTAForm() {
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [role, setRole] = useState<string>("");
  const [teamSize, setTeamSize] = useState<string>("");
  const [currentTool, setCurrentTool] = useState<string>("");
  const [step, setStep] = useState<Step>("email");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function postLead(extra: Record<string, unknown> = {}) {
    return fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        website,
        referrer: typeof document !== "undefined" ? document.referrer : "",
        utm_source: params.get("utm_source") ?? undefined,
        utm_medium: params.get("utm_medium") ?? undefined,
        utm_campaign: params.get("utm_campaign") ?? undefined,
        ...extra,
      }),
    });
  }

  async function onEmailSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await postLead({ stage: "step-1-email" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Something went wrong.");
        return;
      }
      setStep("profile");
    } catch {
      setError("Network error. Try again?");
    } finally {
      setSubmitting(false);
    }
  }

  async function onProfileSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await postLead({ stage: "step-2-profile", role, teamSize, currentTool });
    } catch {
      // Optimistic: user already gave us their email; don't block on this.
    } finally {
      setSubmitting(false);
      setStep("ok");
    }
  }

  if (step === "ok") {
    return (
      <div className="rounded-xl bg-white/10 border border-white/20 p-5 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Check className="w-5 h-5 text-accent-emerald shrink-0" />
          <p className="font-semibold">Thanks — we&apos;ll be in touch within 1 business day.</p>
        </div>
        <p className="text-sm text-white/80">
          We&apos;ll route this based on what you told us. While you wait — try the{" "}
          <a href="/demo" className="underline underline-offset-2 hover:no-underline font-semibold">
            live demo
          </a>{" "}
          on sample data.
        </p>
      </div>
    );
  }

  if (step === "profile") {
    return (
      <form onSubmit={onProfileSubmit} className="space-y-4">
        <p className="text-sm text-white/80">
          Got it — <strong>{email}</strong>. Three quick questions so we can route you to the right person.
        </p>
        <Choice label="Your role" value={role} onChange={setRole} options={ROLES} />
        <Choice label="Team size" value={teamSize} onChange={setTeamSize} options={TEAM_SIZES} />
        <Choice
          label="Current FP&A tool"
          value={currentTool}
          onChange={setCurrentTool}
          options={CURRENT_TOOLS}
        />
        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-brand-50 disabled:opacity-60 text-brand-700 font-semibold px-5 py-3 transition-colors"
          >
            {submitting ? "Sending…" : "Done"}
            {!submitting && <ArrowRight className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={() => setStep("ok")}
            className="text-sm text-white/70 hover:text-white underline underline-offset-2"
          >
            Skip — submit just the email
          </button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={onEmailSubmit} className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="flex-1 rounded-xl bg-white/10 border border-white/20 placeholder:text-white/50 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent"
        />
        {/* honeypot — hidden from humans, real spam-bot fill */}
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
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-brand-50 disabled:opacity-60 disabled:cursor-not-allowed text-brand-700 font-semibold px-5 py-3 transition-colors"
        >
          {submitting ? "Sending…" : "Get early access"}
          {!submitting && <ArrowRight className="w-4 h-4" />}
        </button>
      </div>
      {error && <p className="text-sm text-rose-200">{error}</p>}
      <p className="text-xs text-white/70">No credit card required. We&apos;ll never share your email.</p>
    </form>
  );
}

function Choice({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = value === o;
          return (
            <button
              key={o}
              type="button"
              onClick={() => onChange(o)}
              className={`rounded-full border text-sm px-3 py-1.5 transition-colors ${
                active
                  ? "bg-white text-brand-700 border-white"
                  : "bg-white/5 border-white/20 text-white hover:bg-white/15"
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function CTASection() {
  return (
    <section className="gradient-cta py-12 lg:py-16 text-white">
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
