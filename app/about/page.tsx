import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles, History, GitBranch } from "lucide-react";
import { DEMO_MAILTO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Who We Are",
  description: "Built by an FP&A operator who got tired of rebuilding the same spreadsheet.",
};

const beliefs = [
  {
    Icon: Sparkles,
    title: "Plain English beats formulas",
    body:
      "Most CFO questions are sentences, not VLOOKUPs. The product should answer in the same language the question was asked.",
  },
  {
    Icon: History,
    title: "Audit trail beats version history",
    body:
      "Knowing who changed the COGS assumption — and what the value was before — is non-negotiable for finance. Excel can't do this. We do.",
  },
  {
    Icon: GitBranch,
    title: "Drivers beat spreadsheet rebuilds",
    body:
      "Hire 5 engineers shouldn't trigger a 3-day model rework. Drivers + member formulas mean the plan recomputes itself.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-white pt-10 pb-10 lg:pt-14 lg:pb-12 border-b border-surface-200">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">
            Who we are
          </p>
          <h1 className="font-display font-bold text-4xl lg:text-5xl text-slate-900 tracking-tight text-balance">
            Built by an FP&amp;A operator. For FP&amp;A operators.
          </h1>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            EPM Lite started because closing the books took us 11 days, the variance pack took 40
            hours, and every board meeting needed a fresh &ldquo;why is this off?&rdquo; investigation. The
            existing tools — Excel, Adaptive, Anaplan — each solved part of the problem and made
            another part worse. We wanted one tool with the full picture and an AI layer that
            answered questions in plain English. So we built it.

          </p>
        </div>
      </section>

      <section className="bg-surface-50 py-10 lg:py-14">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="font-display font-bold text-2xl lg:text-3xl text-slate-900 mb-8">
            What we believe
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {beliefs.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl bg-white border border-surface-200 p-6 shadow-card"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-brand-50 text-brand-600 mb-4">
                  <b.Icon className="w-5 h-5" />
                </span>
                <h3 className="font-display font-semibold text-slate-900">{b.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-10 lg:py-14 border-t border-surface-200">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="font-display font-bold text-2xl lg:text-3xl text-slate-900 mb-6">
            What we&apos;ve built so far
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-slate-700">
            <Stat n="9" label="Product pillars · Dashboard, P&L, BS, CF, Drivers, AI Chat, Forecasting, What-If, Alerts" />
            <Stat n="35+" label="AI tools that cover ~99% of manual app actions in plain English" />
            <Stat n="15" label="ML forecasting algorithms — compare side-by-side, pick the winner" />
            <Stat n="9-dim" label="Cube · Entity × Account × Period × Scenario × Version × Currency × Year × Product × Department" />
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold px-5 py-3 shadow-card"
            >
              See the full product
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={DEMO_MAILTO}
              className="inline-flex items-center gap-2 rounded-xl bg-white hover:bg-surface-50 text-slate-900 font-semibold px-5 py-3 border border-surface-200"
            >
              Book a 15-min demo
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="rounded-xl bg-surface-50 border border-surface-200 p-5">
      <div className="font-display font-bold text-3xl text-brand-600 tabular-nums">{n}</div>
      <div className="mt-1 text-sm text-slate-600 leading-snug">{label}</div>
    </div>
  );
}
