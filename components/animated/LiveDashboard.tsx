"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, TrendingUp, MousePointer2 } from "lucide-react";

export default function LiveDashboard() {
  const reduced = useReducedMotion();
  const cycle = reduced ? 0 : 8; // seconds; 0 = no loop

  return (
    <div className="relative">
      <div className="absolute -inset-6 bg-gradient-to-br from-brand-500/30 to-accent-violet/20 blur-3xl rounded-full pointer-events-none" />
      <div className="relative rounded-2xl bg-white shadow-elevated border border-surface-200 p-5">
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 mb-4">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
          <span className="ml-3 text-xs text-slate-400 font-mono">
            epm-lite · executive dashboard
          </span>
          <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-accent-emerald bg-emerald-50 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse" />
            Live
          </span>
        </div>

        {/* KPI grid with staggered fade + cursor focus on Revenue */}
        <div className="relative grid grid-cols-2 gap-3 mb-4">
          <KPI label="Revenue" value="$4.2M" delta="▲ 12%" tone="emerald" highlight />
          <KPI label="Gross Profit" value="68%" delta="▲ 3 pts" tone="emerald" />
          <KPI label="EBITDA" value="$890k" delta="▼ 2%" tone="rose" />
          <KPI label="Runway" value="14 mo" delta="—" tone="slate" />

          {/* Animated cursor */}
          {!reduced && (
            <motion.div
              className="absolute pointer-events-none"
              initial={{ x: "85%", y: "120%", opacity: 0 }}
              animate={{
                x: ["85%", "20%", "20%", "85%", "85%"],
                y: ["120%", "20%", "20%", "120%", "120%"],
                opacity: [0, 1, 1, 0, 0],
              }}
              transition={{
                duration: cycle,
                times: [0, 0.25, 0.55, 0.7, 1],
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <MousePointer2 className="w-5 h-5 text-slate-700 drop-shadow" fill="white" />
            </motion.div>
          )}
        </div>

        {/* Chart card with animated line draw */}
        <div className="rounded-xl bg-surface-50 border border-surface-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-brand-500" />
              Revenue · last 12 months
            </span>
            <span className="text-xs text-slate-400">vs Budget</span>
          </div>
          <AnimatedSparkline reduced={!!reduced} cycle={cycle} />
        </div>

        {/* Chat prompt that appears after cursor click */}
        {!reduced ? (
          <motion.div
            className="mt-3 flex items-center gap-2 text-xs text-slate-500 font-mono"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: [0, 0, 1, 1, 0], y: [6, 6, 0, 0, 6] }}
            transition={{
              duration: cycle,
              times: [0, 0.55, 0.6, 0.85, 0.95],
              repeat: Infinity,
            }}
          >
            <Sparkles className="w-3.5 h-3.5 text-accent-emerald" />
            <span>&quot;What&apos;s our runway if revenue drops 30%?&quot;</span>
          </motion.div>
        ) : (
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-accent-emerald" />
            <span>&quot;What&apos;s our runway if revenue drops 30%?&quot;</span>
          </div>
        )}
      </div>
    </div>
  );
}

function KPI({
  label,
  value,
  delta,
  tone,
  highlight,
}: {
  label: string;
  value: string;
  delta: string;
  tone: "emerald" | "rose" | "slate";
  highlight?: boolean;
}) {
  const toneClass =
    tone === "emerald"
      ? "text-accent-emerald"
      : tone === "rose"
      ? "text-accent-rose"
      : "text-slate-500";
  return (
    <motion.div
      className={`relative rounded-xl bg-white border p-3 ${
        highlight ? "border-brand-200" : "border-surface-200"
      }`}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </div>
      <div className="mt-1 font-display font-bold text-xl text-slate-900">{value}</div>
      <div className={`text-xs font-mono ${toneClass}`}>{delta}</div>
      {highlight && (
        <motion.div
          className="absolute inset-0 rounded-xl ring-2 ring-brand-500 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
          transition={{ duration: 8, times: [0, 0.3, 0.4, 0.6, 0.65, 1], repeat: Infinity }}
        />
      )}
    </motion.div>
  );
}

function AnimatedSparkline({ reduced, cycle }: { reduced: boolean; cycle: number }) {
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
        <linearGradient id="brandFill2" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#2e6fff" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#2e6fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${path(actual)} L${W},${H} L0,${H} Z`} fill="url(#brandFill2)" />
      <path
        d={path(budget)}
        fill="none"
        stroke="#94a3b8"
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />
      {reduced ? (
        <path d={path(actual)} fill="none" stroke="#2e6fff" strokeWidth="2" />
      ) : (
        <motion.path
          d={path(actual)}
          fill="none"
          stroke="#2e6fff"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{ duration: cycle, times: [0, 0.4, 0.85, 1], repeat: Infinity }}
        />
      )}
    </svg>
  );
}
