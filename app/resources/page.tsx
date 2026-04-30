import type { Metadata } from "next";
import Link from "next/link";
import { FileSpreadsheet, BookOpen, ArrowRight } from "lucide-react";
import ResourceDownloadForm from "@/components/ResourceDownloadForm";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Free FP&A starter pack — P&L, Cash Flow, Runway, Variance pack templates. The model we wished existed when we were closing the books in Excel.",
};

const TEMPLATES = [
  {
    name: "P&L · monthly · 12-period",
    desc: "Revenue + COGS + OpEx structure with sub-totals, % of revenue columns, and budget vs actual side-by-side.",
  },
  {
    name: "Cash Flow · indirect method",
    desc: "Standard 3-statement cash flow tied to net income. Adjustments split out; ending cash auto-computed.",
  },
  {
    name: "Runway calculator",
    desc: "Burn rate (trailing 6mo) + cash on hand → months of runway. Stress-test with revenue/expense shocks.",
  },
  {
    name: "Variance pack template",
    desc: "Budget vs Actual table for the top 12 lines, with a one-paragraph commentary block per line.",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <section className="bg-white pt-10 pb-8 lg:pt-14 lg:pb-10 border-b border-surface-200">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">
            Resources
          </p>
          <h1 className="font-display font-bold text-4xl lg:text-5xl text-slate-900 tracking-tight text-balance">
            FP&amp;A starter pack — free.
          </h1>
          <p className="mt-5 text-lg text-slate-600 max-w-3xl">
            The model we wished existed when we were running close on Excel: P&amp;L, Cash Flow,
            Runway, and Variance pack templates — clean, formula-driven, ready to drop your
            trial balance into.
          </p>
        </div>
      </section>

      <section className="bg-surface-50 py-10 lg:py-14">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 grid lg:grid-cols-[1fr_1fr] gap-6 items-start">
          {/* Templates list */}
          <div className="rounded-2xl bg-white border border-surface-200 p-6 lg:p-7 shadow-card">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-50 text-accent-emerald">
                <FileSpreadsheet className="w-5 h-5" />
              </span>
              <div>
                <h2 className="font-display font-semibold text-slate-900">What&apos;s inside</h2>
                <p className="text-xs text-slate-500">4 templates · Excel + Google Sheets</p>
              </div>
            </div>
            <ul className="space-y-3 mt-5">
              {TEMPLATES.map((t) => (
                <li key={t.name} className="rounded-lg bg-surface-50 border border-surface-200 p-4">
                  <h3 className="font-display font-semibold text-slate-900 text-sm">
                    {t.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1">{t.desc}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Email-gated download */}
          <div className="rounded-2xl bg-gradient-to-br from-brand-700 to-brand-900 text-white p-6 lg:p-8 shadow-elevated">
            <h2 className="font-display font-bold text-2xl tracking-tight">
              Drop your email. Get the pack.
            </h2>
            <p className="mt-2 text-sm text-white/80">
              No drip. We&apos;ll send the download link, plus an occasional product update if
              anything ships you&apos;d care about. Unsubscribe in one click.
            </p>
            <div className="mt-6">
              <ResourceDownloadForm />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-10 lg:py-14 border-t border-surface-200">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="rounded-2xl bg-brand-50 border border-brand-100 p-7 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-white text-brand-600 shrink-0">
              <BookOpen className="w-6 h-6" />
            </span>
            <div className="flex-1">
              <h3 className="font-display font-semibold text-slate-900 text-lg">
                More on the blog
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Practical FP&amp;A patterns: cutting close cycles, picking forecast algorithms,
                and what driver-based planning actually means.
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold px-5 py-3 shadow-card"
            >
              Read the blog
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
