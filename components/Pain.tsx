"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";

const pains = [
  {
    h: "Close takes 8–12 business days",
    b: "Manual consolidation across entities + currencies; reconciliation runs over the weekend.",
  },
  {
    h: "Forecast accuracy hovers at ±15%",
    b: "Static models; no quick what-if; decisions made on stale numbers.",
  },
  {
    h: "No audit trail on the plan",
    b: "Who changed the COGS assumption? Lost in Excel version history.",
  },
  {
    h: "Board variance analysis = 40 hours",
    b: "Copy-paste from three tools; one broken formula breaks the whole pack.",
  },
];

export default function Pain() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <p className="text-sm font-semibold text-accent-rose uppercase tracking-wider mb-3">
            The problem
          </p>
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-slate-900 tracking-tight text-balance">
            Your team spends 60% of the month rebuilding the same spreadsheet.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            And the answer is usually obsolete by the time the board sees it.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pains.map((p, i) => (
            <motion.div
              key={p.h}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-2xl bg-white border border-surface-200 p-6 shadow-card hover:shadow-card-hover transition-shadow"
            >
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-rose-100 text-accent-rose mb-4">
                <X className="w-5 h-5" strokeWidth={2.5} />
              </span>
              <h3 className="font-display font-semibold text-slate-900 text-base leading-snug">
                {p.h}
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{p.b}</p>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-sm text-slate-500 italic max-w-2xl">
          Capital is expensive. Forecasting cycles need to be shorter. CFOs are being asked weekly
          questions that used to be quarterly.
        </p>
      </div>
    </section>
  );
}
