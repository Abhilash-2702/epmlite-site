"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FlaskConical } from "lucide-react";

const KPIS = [
  { label: "Revenue", base: 4.2, suffix: "M", prefix: "$", precision: 2 },
  { label: "EBITDA", base: 890, suffix: "k", prefix: "$", precision: 0 },
  { label: "Runway", base: 14, suffix: "mo", prefix: "", precision: 0 },
  { label: "Cash", base: 8.5, suffix: "M", prefix: "$", precision: 1 },
];

export default function LiveWhatIf() {
  const reduced = useReducedMotion();
  const [pct, setPct] = useState(reduced ? -30 : 0);

  useEffect(() => {
    if (reduced) return;
    let direction = -1;
    const id = setInterval(() => {
      setPct((p) => {
        const next = p + direction * 2;
        if (next <= -30) direction = 0; // hold
        if (next >= 0) direction = -1;
        if (p === -30 && direction === 0) {
          setTimeout(() => {
            direction = 1;
          }, 1500);
          return -30;
        }
        if (p === 0 && direction === 1) {
          direction = -1;
          return 0;
        }
        return Math.max(-30, Math.min(0, next));
      });
    }, 120);
    return () => clearInterval(id);
  }, [reduced]);

  // Scale base values by the % drop applied to revenue.
  const factor = 1 + pct / 100;
  const compute = (k: typeof KPIS[number]) => {
    if (k.label === "Revenue") return k.base * factor;
    if (k.label === "EBITDA") return k.base * (1 + pct / 50); // EBITDA hits harder
    if (k.label === "Runway") return Math.max(2, k.base * (1 + pct / 60));
    if (k.label === "Cash") return k.base * (1 + pct / 80);
    return k.base;
  };

  return (
    <div className="rounded-2xl bg-white border border-surface-200 shadow-card p-6">
      <div className="flex items-center gap-2 mb-5">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-amber-50 text-accent-amber">
          <FlaskConical className="w-4 h-4" />
        </span>
        <span className="font-display font-semibold text-slate-900">What-If: revenue shock</span>
        <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-accent-emerald bg-emerald-50 px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse" />
          Live
        </span>
      </div>

      {/* Slider */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
          <span className="font-mono">Revenue adjustment</span>
          <span className="font-mono font-semibold text-slate-900">{pct}%</span>
        </div>
        <div className="relative h-2 rounded-full bg-surface-100">
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-accent-rose via-accent-amber to-emerald-300"
            style={{ width: "100%", opacity: 0.5 }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-2 border-brand-500 shadow"
            style={{ left: `calc(${(pct + 30) / 30 * 100}% - 10px)` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1.5">
          <span>−30%</span>
          <span>−15%</span>
          <span>0%</span>
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {KPIS.map((k) => {
          const value = compute(k);
          const delta = ((value - k.base) / k.base) * 100;
          const tone =
            delta < -1 ? "text-accent-rose" : delta > 1 ? "text-accent-emerald" : "text-slate-500";
          return (
            <div key={k.label} className="rounded-xl bg-surface-50 border border-surface-200 p-3">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                {k.label}
              </div>
              <motion.div
                key={`${k.label}-${value.toFixed(2)}`}
                className="mt-1 font-display font-bold text-lg text-slate-900 tabular-nums"
                initial={{ scale: 0.95, opacity: 0.6 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.15 }}
              >
                {k.prefix}
                {value.toFixed(k.precision)}
                {k.suffix}
              </motion.div>
              <div className={`text-xs font-mono ${tone}`}>
                {delta > 0 ? "▲" : delta < 0 ? "▼" : "—"} {Math.abs(delta).toFixed(0)}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
