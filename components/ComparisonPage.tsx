"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check, Info } from "lucide-react";
import { DEMO_MAILTO } from "@/lib/constants";

export type CompareRow = {
  label: string;
  epm: string;
  rival: string;
  winner: "epm" | "rival" | "draw";
};

export type CompareCard = {
  headline: string;
  body: string;
};

export type ComparisonProps = {
  rivalName: string;
  rivalShortName?: string;
  kicker: string;
  headline: string;
  subhead: string;
  rows: CompareRow[];
  diffCards: CompareCard[];
  whoIsItFor: { epm: string; rival: string };
  ctaPrompt: string;
};

export default function ComparisonPage(props: ComparisonProps) {
  const rivalShort = props.rivalShortName ?? props.rivalName;

  return (
    <>
      {/* Hero */}
      <section className="bg-white pt-10 pb-8 lg:pt-14 lg:pb-10 border-b border-surface-200">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">
            {props.kicker}
          </p>
          <h1 className="font-display font-bold text-4xl lg:text-5xl text-slate-900 tracking-tight text-balance">
            {props.headline}
          </h1>
          <p className="mt-5 text-lg text-slate-600 max-w-3xl leading-relaxed">
            {props.subhead}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold px-5 py-3 shadow-card"
            >
              Try the live demo
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={DEMO_MAILTO}
              className="inline-flex items-center gap-2 rounded-xl bg-white hover:bg-surface-50 text-slate-900 font-semibold px-5 py-3 border border-surface-200"
            >
              Book a 15-min walkthrough
            </a>
          </div>
        </div>
      </section>

      {/* Side-by-side table */}
      <section className="bg-surface-50 py-10 lg:py-14">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <h2 className="font-display font-bold text-2xl lg:text-3xl text-slate-900 mb-8">
            Side-by-side
          </h2>
          <div className="rounded-2xl border border-surface-200 overflow-hidden bg-white shadow-card">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-50 border-b border-surface-200">
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-4 py-3 w-1/3">
                    Capability
                  </th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-brand-600 px-4 py-3">
                    NashOS
                  </th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-4 py-3">
                    {rivalShort}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-200">
                {props.rows.map((r, i) => (
                  <motion.tr
                    key={r.label}
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.3, delay: i * 0.02 }}
                  >
                    <td className="px-4 py-3 text-slate-700 font-medium">{r.label}</td>
                    <td
                      className={`px-4 py-3 ${
                        r.winner === "epm"
                          ? "text-slate-900 font-semibold bg-brand-50/50"
                          : "text-slate-700"
                      }`}
                    >
                      <span className="inline-flex items-center gap-2">
                        {r.winner === "epm" && (
                          <Check className="w-4 h-4 text-accent-emerald shrink-0" />
                        )}
                        {r.epm}
                      </span>
                    </td>
                    <td
                      className={`px-4 py-3 ${
                        r.winner === "rival"
                          ? "text-slate-900 font-semibold bg-amber-50/50"
                          : "text-slate-600"
                      }`}
                    >
                      <span className="inline-flex items-center gap-2">
                        {r.winner === "rival" && (
                          <Check className="w-4 h-4 text-accent-amber shrink-0" />
                        )}
                        {r.epm === r.rival ? (
                          <span className="text-slate-500">{r.rival}</span>
                        ) : (
                          r.rival
                        )}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-slate-500 italic flex items-center gap-2">
            <Info className="w-3.5 h-3.5" />
            Comparison based on publicly available {rivalShort} pricing and product
            documentation as of 2026. Not affiliated with {rivalShort}.
          </p>
        </div>
      </section>

      {/* Differentiator cards */}
      <section className="bg-white py-10 lg:py-14 border-t border-surface-200">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <h2 className="font-display font-bold text-2xl lg:text-3xl text-slate-900 mb-8">
            Where NashOS is different
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {props.diffCards.map((c, i) => (
              <motion.div
                key={c.headline}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-2xl bg-surface-50 border border-surface-200 p-6 shadow-card"
              >
                <h3 className="font-display font-semibold text-slate-900 text-lg leading-snug">
                  {c.headline}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{c.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who is each for */}
      <section className="bg-surface-50 py-10 lg:py-14 border-t border-surface-200">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <h2 className="font-display font-bold text-2xl lg:text-3xl text-slate-900 mb-8">
            Who each one is actually for
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="rounded-2xl bg-white border border-brand-200 p-6 shadow-card">
              <p className="text-xs font-semibold text-brand-600 uppercase tracking-wider">
                Pick NashOS if
              </p>
              <p className="mt-2 text-base text-slate-700 leading-relaxed">{props.whoIsItFor.epm}</p>
            </div>
            <div className="rounded-2xl bg-white border border-surface-200 p-6 shadow-card">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Pick {rivalShort} if
              </p>
              <p className="mt-2 text-base text-slate-700 leading-relaxed">{props.whoIsItFor.rival}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="gradient-cta py-12 text-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-3xl lg:text-4xl tracking-tight">
            {props.ctaPrompt}
          </h2>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 rounded-xl bg-white hover:bg-brand-50 text-brand-700 font-semibold px-6 py-3.5 transition-colors"
            >
              Try the live demo
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={DEMO_MAILTO}
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-6 py-3.5 transition-colors"
            >
              Book a 15-min demo
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
