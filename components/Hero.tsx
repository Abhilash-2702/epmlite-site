"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { DEMO_MAILTO } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative gradient-hero overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-24 lg:pt-24 lg:pb-32 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* LEFT — copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-100 text-brand-700 px-3 py-1 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            AI-native FP&amp;A
          </div>
          <h1 className="font-display font-bold tracking-tight text-slate-900 text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-balance">
            Close the books in days.
            <br />
            <span className="text-brand-600">Forecast in minutes.</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
            AI-native FP&amp;A for finance leaders who are tired of Excel gymnastics. Drivers,
            forecasts, what-ifs, audit trail — all in one tool, all driven by plain-English chat.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href={DEMO_MAILTO}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold px-6 py-3.5 transition-colors shadow-card hover:shadow-card-hover"
            >
              Book a 15-min demo
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#features"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-surface-50 text-slate-900 font-semibold px-6 py-3.5 border border-surface-200 transition-colors"
            >
              See it in action ↓
            </a>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            Built by ex-FP&amp;A operators. Live in hours, not months.
          </p>
        </motion.div>

        {/* RIGHT — stylized dashboard mock */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative"
        >
          <div className="absolute -inset-6 bg-gradient-to-br from-brand-500/30 to-accent-violet/20 blur-3xl rounded-full" />
          <div className="relative rounded-2xl bg-white shadow-elevated border border-surface-200 p-5">
            {/* Mock window chrome */}
            <div className="flex items-center gap-1.5 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-300" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
              <span className="ml-3 text-xs text-slate-400 font-mono">epm-lite · executive dashboard</span>
            </div>

            {/* KPI tiles */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <KPI label="Revenue" value="$4.2M" delta="▲ 12%" tone="emerald" />
              <KPI label="Gross Profit" value="68%" delta="▲ 3 pts" tone="emerald" />
              <KPI label="EBITDA" value="$890k" delta="▼ 2%" tone="rose" />
              <KPI label="Runway" value="14 mo" delta="—" tone="slate" />
            </div>

            {/* Mock chart */}
            <div className="rounded-xl bg-surface-50 border border-surface-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-brand-500" />
                  Revenue · last 12 months
                </span>
                <span className="text-xs text-slate-400">vs Budget</span>
              </div>
              <Sparkline />
            </div>

            {/* Tiny chat hint */}
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-accent-emerald" />
              <span>&quot;What&apos;s our runway if revenue drops 30%?&quot;</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function KPI({
  label,
  value,
  delta,
  tone,
}: {
  label: string;
  value: string;
  delta: string;
  tone: "emerald" | "rose" | "slate";
}) {
  const toneClass =
    tone === "emerald"
      ? "text-accent-emerald"
      : tone === "rose"
      ? "text-accent-rose"
      : "text-slate-500";
  return (
    <div className="rounded-xl bg-white border border-surface-200 p-3">
      <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </div>
      <div className="mt-1 font-display font-bold text-xl text-slate-900">{value}</div>
      <div className={`text-xs font-mono ${toneClass}`}>{delta}</div>
    </div>
  );
}

function Sparkline() {
  // Two-series mock line chart, 12 months. Values are visual only.
  const actual = [40, 44, 41, 50, 56, 58, 62, 64, 68, 72, 76, 82];
  const budget = [42, 45, 48, 52, 55, 60, 64, 68, 70, 73, 75, 78];
  const W = 280;
  const H = 70;
  const path = (xs: number[]) =>
    xs
      .map((v, i) => {
        const x = (i / (xs.length - 1)) * W;
        const y = H - (v / 100) * H;
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-16" preserveAspectRatio="none">
      <defs>
        <linearGradient id="brandFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#2e6fff" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#2e6fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${path(actual)} L${W},${H} L0,${H} Z`} fill="url(#brandFill)" />
      <path d={path(budget)} fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
      <path d={path(actual)} fill="none" stroke="#2e6fff" strokeWidth="2" />
    </svg>
  );
}
