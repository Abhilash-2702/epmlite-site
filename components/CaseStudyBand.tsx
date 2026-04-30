"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Quote, Building2 } from "lucide-react";
import { DEMO_MAILTO } from "@/lib/constants";

/**
 * Hypothetical case study — framed honestly as an example workflow,
 * not a real customer claim. Replaces with real story when one exists.
 */
const profile = {
  type: "$50M ARR SaaS, 180 people, 4 entities",
  before: [
    { label: "Close cycle", value: "11 days" },
    { label: "Variance pack prep", value: "40 hours" },
    { label: "Re-forecast frequency", value: "Quarterly" },
    { label: "Tools in the stack", value: "Excel + 3 BI tools" },
  ],
  after: [
    { label: "Close cycle", value: "4 days" },
    { label: "Variance pack prep", value: "90 minutes" },
    { label: "Re-forecast frequency", value: "Weekly + on-demand" },
    { label: "Tools in the stack", value: "EPM Lite" },
  ],
};

export default function CaseStudyBand() {
  return (
    <section className="bg-white py-20 lg:py-24 border-t border-surface-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-10"
        >
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">
            Example workflow
          </p>
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-slate-900 tracking-tight text-balance">
            Close in 4 days. Variance pack in 90 minutes. Re-forecast weekly.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Here&apos;s what the day-to-day looks like for a finance team running on EPM Lite.
            <span className="block text-sm text-slate-500 mt-2 italic">
              Hypothetical scenario. Not a real customer claim — we&apos;re a fresh launch and
              actively seeking design partners.
            </span>
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_2fr] gap-6 items-start">
          {/* Profile card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl bg-gradient-to-br from-brand-700 to-brand-900 text-white p-7 lg:p-8 shadow-elevated"
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 text-white mb-4">
              <Building2 className="w-5 h-5" />
            </span>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-200">
              Profile
            </p>
            <p className="mt-1.5 font-display font-semibold text-lg leading-snug">
              {profile.type}
            </p>
            <div className="mt-6 pt-6 border-t border-white/10">
              <Quote className="w-5 h-5 text-accent-emerald mb-2" />
              <p className="font-display text-base leading-relaxed text-white/90">
                The board asks for a re-forecast on Friday. By Monday morning, finance has it
                — and a written rationale for every change.
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
          </motion.div>

          {/* Before / After */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid sm:grid-cols-2 gap-4"
          >
            <div className="rounded-2xl bg-rose-50 border border-rose-100 p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-accent-rose bg-white border border-rose-200 px-2 py-0.5 rounded-full">
                  Before
                </span>
                <span className="text-sm font-semibold text-slate-700">Excel + BI stack</span>
              </div>
              <dl className="space-y-3">
                {profile.before.map((m) => (
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
                <span className="text-sm font-semibold text-slate-700">EPM Lite</span>
              </div>
              <dl className="space-y-3">
                {profile.after.map((m) => (
                  <div key={m.label}>
                    <dt className="text-xs text-slate-500">{m.label}</dt>
                    <dd className="font-display font-semibold text-base text-slate-900 mt-0.5">
                      {m.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
