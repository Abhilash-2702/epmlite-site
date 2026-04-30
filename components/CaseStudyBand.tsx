"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Quote, Building2 } from "lucide-react";
import { DEMO_MAILTO } from "@/lib/constants";
import { usePersona } from "@/components/PersonaContext";

type Profile = {
  kicker: string;
  headline: string;
  type: string;
  quote: string;
  beforeLabel: string;
  before: { label: string; value: string }[];
  afterLabel: string;
  after: { label: string; value: string }[];
};

const PROFILES: Record<"cfo" | "fpa" | "founder", Profile> = {
  cfo: {
    kicker: "Example · CFO",
    headline: "Board-ready on Monday. Without ruining anyone's weekend.",
    type: "PE-backed mid-market · pre-IPO planning",
    quote:
      "The board asks for a re-forecast on Friday. By Monday morning, finance has it — and a written rationale for every change. Audit trail satisfies our auditor.",
    beforeLabel: "Excel + BI stack",
    before: [
      { label: "Variance pack prep",         value: "40 hours" },
      { label: "Time to board-ready",         value: "5 business days" },
      { label: "Audit-trail coverage",        value: "Spreadsheet history" },
      { label: "Pre-IPO due-diligence ready", value: "12 months out" },
    ],
    afterLabel: "EPM Lite",
    after: [
      { label: "Variance pack prep",         value: "90 minutes" },
      { label: "Time to board-ready",         value: "2 business days" },
      { label: "Audit-trail coverage",        value: "Every mutation, before/after" },
      { label: "Pre-IPO due-diligence ready", value: "Day one" },
    ],
  },
  fpa: {
    kicker: "Example · FP&A",
    headline: "Close in 4 days. Variance pack in 90 minutes. Re-forecast weekly.",
    type: "$50M ARR SaaS · 180 people · 4 entities",
    quote:
      "What used to take a 3-person team a week now takes one analyst a day. We can finally answer 'why?' in plain English instead of building another VLOOKUP.",
    beforeLabel: "Excel + BI stack",
    before: [
      { label: "Close cycle",            value: "11 days" },
      { label: "Variance pack prep",     value: "40 hours" },
      { label: "Re-forecast frequency",  value: "Quarterly" },
      { label: "Tools in the stack",     value: "Excel + 3 BI tools" },
    ],
    afterLabel: "EPM Lite",
    after: [
      { label: "Close cycle",            value: "4 days" },
      { label: "Variance pack prep",     value: "90 minutes" },
      { label: "Re-forecast frequency",  value: "Weekly + on-demand" },
      { label: "Tools in the stack",     value: "EPM Lite" },
    ],
  },
  founder: {
    kicker: "Example · Founder",
    headline: "Run runway scenarios mid-meeting. Without an FP&A hire.",
    type: "Series A SaaS · 22 people · founder-CEO running finance",
    quote:
      "I don't have an FP&A hire yet, and I won't for two more rounds. EPM Lite means I can answer the runway question on a board call without saying 'let me get back to you.'",
    beforeLabel: "Excel + Notion + Stripe export",
    before: [
      { label: "Time to runway answer",    value: "3 hours of formula building" },
      { label: "Hiring scenario impact",   value: "Half a day rebuild" },
      { label: "Board pack prep",          value: "1.5 days every month" },
      { label: "Confidence on the number", value: "70%, brittle formulas" },
    ],
    afterLabel: "EPM Lite",
    after: [
      { label: "Time to runway answer",    value: "60 seconds in chat" },
      { label: "Hiring scenario impact",   value: "Auto-recomputed" },
      { label: "Board pack prep",          value: "30 minutes" },
      { label: "Confidence on the number", value: "100%, audited cube" },
    ],
  },
};

export default function CaseStudyBand() {
  const { persona } = usePersona();
  const p = PROFILES[persona];

  return (
    <section className="bg-white py-12 lg:py-14 border-t border-surface-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={persona}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-3xl mb-10">
              <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">
                {p.kicker}
              </p>
              <h2 className="font-display font-bold text-3xl lg:text-4xl text-slate-900 tracking-tight text-balance">
                {p.headline}
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Here&apos;s what the day-to-day shifts to.
                <span className="block text-sm text-slate-500 mt-2 italic">
                  Composite scenario. Not a real customer claim — we&apos;re a fresh launch and
                  actively seeking design partners.
                </span>
              </p>
            </div>

            <div className="grid lg:grid-cols-[1fr_2fr] gap-6 items-start">
              <div className="rounded-2xl bg-gradient-to-br from-brand-700 to-brand-900 text-white p-7 lg:p-8 shadow-elevated">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 text-white mb-4">
                  <Building2 className="w-5 h-5" />
                </span>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-200">
                  Profile
                </p>
                <p className="mt-1.5 font-display font-semibold text-lg leading-snug">
                  {p.type}
                </p>
                <div className="mt-6 pt-6 border-t border-white/10">
                  <Quote className="w-5 h-5 text-accent-emerald mb-2" />
                  <p className="font-display text-base leading-relaxed text-white/90">
                    {p.quote}
                  </p>
                  <p className="mt-3 text-xs text-white/60 italic">
                    Composite description, not a quoted customer.
                  </p>
                </div>
                <Link
                  href={DEMO_MAILTO}
                  className="mt-6 inline-flex items-center gap-1.5 rounded-xl bg-white hover:bg-brand-50 text-brand-700 font-semibold px-4 py-2.5 text-sm transition-colors"
                >
                  Run this on your data
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-rose-50 border border-rose-100 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-accent-rose bg-white border border-rose-200 px-2 py-0.5 rounded-full">
                      Before
                    </span>
                    <span className="text-sm font-semibold text-slate-700">{p.beforeLabel}</span>
                  </div>
                  <dl className="space-y-3">
                    {p.before.map((m) => (
                      <div key={m.label}>
                        <dt className="text-xs text-slate-500">{m.label}</dt>
                        <dd className="font-display font-semibold text-base text-slate-900 mt-0.5">
                          {m.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-accent-emerald bg-white border border-emerald-200 px-2 py-0.5 rounded-full">
                      After
                    </span>
                    <span className="text-sm font-semibold text-slate-700">{p.afterLabel}</span>
                  </div>
                  <dl className="space-y-3">
                    {p.after.map((m) => (
                      <div key={m.label}>
                        <dt className="text-xs text-slate-500">{m.label}</dt>
                        <dd className="font-display font-semibold text-base text-slate-900 mt-0.5">
                          {m.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
