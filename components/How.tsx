"use client";

import { motion } from "framer-motion";
import { Plug, LineChart, Sparkles, ChevronRight } from "lucide-react";

const steps = [
  {
    n: "01",
    title: "Connect",
    body:
      "Pull from REST APIs, SFTP, Excel, CSV — or drop a file into Bulk Import. The 9-dimension cube absorbs whatever you have.",
    Icon: Plug,
    accent: "text-brand-500 bg-brand-50",
  },
  {
    n: "02",
    title: "Plan",
    body:
      "Build drivers (FTE, units, %, hours). Write member formulas. Run 15 forecasting algorithms side-by-side. What-if any change before you commit it.",
    Icon: LineChart,
    accent: "text-accent-violet bg-violet-50",
  },
  {
    n: "03",
    title: "Decide",
    body:
      "Ask in plain English. The agent drafts the answer, runs the forecast, and shows the variance. Audit trail captures every change with who/when/before-after.",
    Icon: Sparkles,
    accent: "text-accent-emerald bg-emerald-50",
  },
];

export default function How() {
  return (
    <section className="bg-surface-50 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">
            How it works
          </p>
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-slate-900 tracking-tight text-balance">
            Three steps. Hours, not months.
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-8 relative">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative rounded-2xl bg-white border border-surface-200 p-7 shadow-card hover:shadow-card-hover transition-shadow"
            >
              <div className="flex items-start gap-4">
                <span className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${s.accent}`}>
                  <s.Icon className="w-6 h-6" />
                </span>
                <div>
                  <span className="text-xs font-mono font-semibold text-slate-400">{s.n}</span>
                  <h3 className="font-display font-semibold text-xl text-slate-900 mt-0.5">
                    {s.title}
                  </h3>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-600 leading-relaxed">{s.body}</p>

              {/* Desktop chevron between cards */}
              {i < steps.length - 1 && (
                <ChevronRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-surface-200" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
