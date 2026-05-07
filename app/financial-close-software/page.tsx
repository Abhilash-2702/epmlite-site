import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Sparkles, ShieldCheck, FileSpreadsheet } from "lucide-react";
import { DEMO_MAILTO } from "@/lib/constants";
import { FaqSchema, BreadcrumbSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Financial Close Software — Close in 4 Days, Not 12",
  description:
    "Faster financial close software. NashOS collapses an 11-day month-end close to 4 days using an agentic AI layer, 15 forecast algorithms, and a 9-dim cube. Built for finance teams switching from Anaplan, Adaptive, Oracle EPM, OneStream, or Excel.",
  keywords: [
    "financial close software",
    "faster close",
    "month-end close software",
    "close management software",
    "close cycle reduction",
    "FP&A close software",
  ],
  alternates: { canonical: "/financial-close-software" },
};

const FAQ_ITEMS = [
  {
    question: "What is financial close software?",
    answer:
      "Financial close software automates the month-end and quarter-end close — pulling trial balance from your ERP, reconciling across entities, generating P&L / Balance Sheet / Cash Flow, and assembling the variance pack for the board. NashOS adds an agentic AI layer that drafts variance commentary, runs forecasts, and answers plain-English questions about the cube — cutting an 11-day close to 4.",
  },
  {
    question: "How can I close my books faster?",
    answer:
      "The 11-day close has three bottlenecks: (1) waiting for trial balance and reconciliation, (2) building the variance pack from scratch every period, (3) hand-writing commentary on the top movers. NashOS collapses each: continuous connectors land trial balance on day one, the agent ranks top movers by financial impact and drafts the commentary, and the audit trail replaces the 'who changed what' Slack thread. Result: 4-day close cycle, 90-minute variance pack.",
  },
  {
    question: "Is NashOS an alternative to Anaplan, Adaptive, or Oracle EPM?",
    answer:
      "Yes — NashOS is built for finance teams that want the planning + close + reporting capability of Anaplan or Workday Adaptive Planning without the $150k+ ACV and 6-month rollout. Implementation is days, not months. Pricing starts at $99/mo. Side-by-side comparisons available at /vs/anaplan, /vs/adaptive, and /vs/excel.",
  },
  {
    question: "Does it integrate with NetSuite or QuickBooks?",
    answer:
      "Today: REST APIs, SFTP, Excel, and CSV connectors are production-ready. Native NetSuite and QuickBooks connectors are on the near-term roadmap (see /roadmap). Until those ship, NetSuite and QuickBooks customers connect via REST or scheduled CSV exports.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Hours, not months. Connect your trial balance (REST, SFTP, Excel, or CSV — or just paste it in), and the 9-dimension cube absorbs it. Most teams have a working Executive Summary the same day. A full driver-based plan with custom formulas is typically a 2-week onboarding with our team.",
  },
  {
    question: "Is the AI agent safe? Can it auto-write to my financial data?",
    answer:
      "No auto-writes. Every chat-driven mutation produces a draft that the user must Post to commit. The backend re-validates the draft on commit. Audit trail captures actor, timestamp, and full before/after JSON for every change. The LLM never writes to the database directly — every tool call is server-side authenticated.",
  },
];

const STAT = [
  { num: "4 days", label: "Close cycle (vs 12 industry average)" },
  { num: "90 min", label: "Variance pack (vs 40 hours)" },
  { num: "35+", label: "AI agent tools covering 99% of manual actions" },
  { num: "15", label: "Forecast algorithms compared side-by-side" },
];

const PILLARS = [
  {
    Icon: Clock,
    title: "Continuous reconciliation, not month-end sprint",
    body:
      "Connectors run on schedule, not on a deadline. Trial balance lands in the cube on day 1 of close, not day 5. Reconciliation lives in queryable tables, not a Slack thread.",
  },
  {
    Icon: Sparkles,
    title: "Agent drafts variance commentary",
    body:
      "Top movers ranked by financial impact, not raw %. Paragraph-style commentary auto-drafted from the cube. CFO edits, doesn't write from scratch. The 40-hour board pack collapses to 90 minutes.",
  },
  {
    Icon: ShieldCheck,
    title: "Audit trail replaces version control",
    body:
      "Every change has a who, when, before-after JSON, and reason. There's no 'wait, who changed the COGS assumption?' — it's a query. Pre-IPO ready on day one.",
  },
  {
    Icon: FileSpreadsheet,
    title: "P&L · Balance Sheet · Cash Flow with full hierarchy",
    body:
      "Drill from rollups (TOTAL_PL, TOTAL_BS, TOTAL_CF) to leaves. Multi-currency, multi-entity. CSV / Excel / PDF export from any view. Variance vs budget on every line.",
  },
];

export default function FinancialCloseSoftwarePage() {
  return (
    <>
      <BreadcrumbSchema
        trail={[
          { name: "Home", url: "/" },
          { name: "Financial Close Software", url: "/financial-close-software" },
        ]}
      />
      <FaqSchema items={FAQ_ITEMS} />

      <section className="bg-white pt-10 pb-8 lg:pt-14 lg:pb-10 border-b border-surface-200">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">
            Financial Close Software
          </p>
          <h1 className="font-display font-bold text-4xl lg:text-6xl text-slate-900 tracking-tight text-balance leading-[1.05]">
            Close the books in 4 days,
            <br />
            <span className="text-brand-600">not 12.</span>
          </h1>
          <p className="mt-5 text-lg text-slate-600 leading-relaxed max-w-3xl">
            NashOS is the agentic FP&amp;A platform built for finance teams tired of an 11-day
            close. Continuous connectors, an AI agent that drafts variance commentary, and a
            9-dimension cube replace the spreadsheet sprawl.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold px-6 py-3.5 shadow-card"
            >
              Try the live demo
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/calculator"
              className="inline-flex items-center gap-2 rounded-xl bg-white hover:bg-surface-50 text-slate-900 font-semibold px-6 py-3.5 border border-surface-200"
            >
              See your savings
            </Link>
            <a
              href={DEMO_MAILTO}
              className="inline-flex items-center gap-2 rounded-xl text-slate-700 hover:text-brand-600 font-semibold px-3 py-3.5"
            >
              Or book a 15-min walkthrough
            </a>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-surface-50 py-10 lg:py-14">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STAT.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl bg-white border border-surface-200 p-6 shadow-card"
              >
                <p className="font-display font-bold text-3xl text-brand-600 tabular-nums">
                  {s.num}
                </p>
                <p className="mt-2 text-sm text-slate-600 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why ours is faster */}
      <section className="bg-white py-10 lg:py-14 border-t border-surface-200">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-slate-900 tracking-tight text-balance max-w-3xl">
            Where the speed comes from
          </h2>
          <p className="mt-3 text-lg text-slate-600 max-w-3xl">
            Most close-cycle pain isn&apos;t the journal entries. It&apos;s the 7 days of human
            reconciliation either side. NashOS collapses each layer.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 gap-5">
            {PILLARS.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl bg-surface-50 border border-surface-200 p-6"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white text-brand-600 mb-4">
                  <p.Icon className="w-5 h-5" />
                </span>
                <h3 className="font-display font-semibold text-slate-900">{p.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison summary */}
      <section className="bg-surface-50 py-10 lg:py-14 border-t border-surface-200">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <h2 className="font-display font-bold text-3xl text-slate-900 mb-6">
            Versus the alternatives
          </h2>
          <div className="rounded-2xl bg-white border border-surface-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-50 border-b border-surface-200 text-xs uppercase tracking-wider text-slate-500">
                  <th className="text-left font-semibold px-5 py-3">Tool</th>
                  <th className="text-left font-semibold px-5 py-3">Typical close</th>
                  <th className="text-left font-semibold px-5 py-3">Time-to-live</th>
                  <th className="text-left font-semibold px-5 py-3">Starting price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-200">
                <tr className="bg-emerald-50/40">
                  <td className="px-5 py-3 font-semibold text-slate-900">NashOS</td>
                  <td className="px-5 py-3 text-accent-emerald font-semibold">4 days</td>
                  <td className="px-5 py-3 text-accent-emerald font-semibold">Hours, not months</td>
                  <td className="px-5 py-3">$99 / mo</td>
                </tr>
                <tr><td className="px-5 py-3">Excel + BI stack</td><td className="px-5 py-3">11–14 days</td><td className="px-5 py-3">Already running (sort of)</td><td className="px-5 py-3">$0 + soul</td></tr>
                <tr><td className="px-5 py-3">Anaplan</td><td className="px-5 py-3">5–7 days</td><td className="px-5 py-3">6–9 months</td><td className="px-5 py-3">$150k+ / yr</td></tr>
                <tr><td className="px-5 py-3">Workday Adaptive</td><td className="px-5 py-3">5–8 days</td><td className="px-5 py-3">3–6 months</td><td className="px-5 py-3">$50k+ / yr</td></tr>
                <tr><td className="px-5 py-3">Oracle EPM</td><td className="px-5 py-3">7–9 days</td><td className="px-5 py-3">9–12 months</td><td className="px-5 py-3">$200k+ / yr</td></tr>
                <tr><td className="px-5 py-3">Vena</td><td className="px-5 py-3">6–9 days</td><td className="px-5 py-3">3–5 months</td><td className="px-5 py-3">$25k+ / yr</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-slate-500 italic">
            Approximate ranges from public reviews + sales data. Your mileage will vary.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-10 lg:py-14 border-t border-surface-200">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h2 className="font-display font-bold text-3xl text-slate-900 mb-6">
            Common questions
          </h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((it) => (
              <details
                key={it.question}
                className="group rounded-2xl bg-surface-50 border border-surface-200 p-5"
              >
                <summary className="cursor-pointer font-display font-semibold text-slate-900 list-none flex items-center justify-between gap-4">
                  {it.question}
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{it.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="gradient-cta py-12 text-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-3xl lg:text-4xl tracking-tight">
            See it on your real numbers.
          </h2>
          <p className="mt-3 text-white/80">
            15-minute walkthrough on your trial balance. No slides, no sales script.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 rounded-xl bg-white hover:bg-brand-50 text-brand-700 font-semibold px-6 py-3.5"
            >
              Try the live demo
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={DEMO_MAILTO}
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-6 py-3.5"
            >
              Book a 15-min demo
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
