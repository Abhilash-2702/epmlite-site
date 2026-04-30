"use client";

import { useState } from "react";
import { TrendingUp, ChevronDown, ChevronUp } from "lucide-react";

type KPI = {
  label: string;
  value: string;
  delta: string;
  tone: "emerald" | "rose" | "slate";
  drilldown: { label: string; value: string; delta: string }[];
};

const KPIS: KPI[] = [
  {
    label: "Revenue (YTD)",
    value: "$4.20M",
    delta: "▲ 12% vs Budget",
    tone: "emerald",
    drilldown: [
      { label: "Subscription", value: "$3.42M", delta: "▲ 14%" },
      { label: "Services", value: "$0.61M", delta: "▲ 7%" },
      { label: "Other", value: "$0.17M", delta: "▼ 4%" },
    ],
  },
  {
    label: "Gross Profit",
    value: "68%",
    delta: "▲ 3 pts vs Budget",
    tone: "emerald",
    drilldown: [
      { label: "Hosting & infra", value: "12% of rev", delta: "▼ 1 pt" },
      { label: "Support staff",    value: "11% of rev", delta: "flat" },
      { label: "Cust success",     value: "9% of rev",  delta: "▼ 2 pts" },
    ],
  },
  {
    label: "EBITDA",
    value: "$890k",
    delta: "▼ 2% vs Budget",
    tone: "rose",
    drilldown: [
      { label: "S&M overspend",     value: "+$120k",  delta: "vs plan" },
      { label: "R&D timing",         value: "−$40k",   delta: "vs plan" },
      { label: "G&A within plan",    value: "+$5k",    delta: "vs plan" },
    ],
  },
  {
    label: "Runway",
    value: "14 mo",
    delta: "Cash at $8.5M",
    tone: "slate",
    drilldown: [
      { label: "Cash on hand",       value: "$8.50M",  delta: "as of today" },
      { label: "Avg monthly burn",   value: "$610k",   delta: "trailing 6mo" },
      { label: "Burn after planned hires", value: "$680k", delta: "projected" },
    ],
  },
];

export default function DemoDashboard() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div>
      <div className="mb-5">
        <h2 className="font-display font-semibold text-lg text-slate-900">Executive dashboard</h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Click any tile to drill in. Try clicking <span className="font-semibold">EBITDA</span> —
          it&apos;s the one that&apos;s off.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {KPIS.map((k, i) => {
          const open = i === openIdx;
          const tone =
            k.tone === "emerald"
              ? "text-accent-emerald"
              : k.tone === "rose"
              ? "text-accent-rose"
              : "text-slate-500";
          return (
            <button
              key={k.label}
              onClick={() => setOpenIdx(open ? null : i)}
              className={`text-left rounded-xl bg-white border p-4 transition-all ${
                open
                  ? "border-brand-500 ring-2 ring-brand-500/20 shadow-card-hover"
                  : "border-surface-200 hover:border-brand-200 hover:shadow-card"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  {k.label}
                </div>
                {open ? (
                  <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                )}
              </div>
              <div className="mt-1 font-display font-bold text-2xl text-slate-900">
                {k.value}
              </div>
              <div className={`text-xs font-mono ${tone}`}>{k.delta}</div>
            </button>
          );
        })}
      </div>

      {/* Drilldown panel */}
      {openIdx !== null && (
        <div className="mt-5 rounded-xl bg-white border border-brand-200 shadow-card overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-surface-200 bg-brand-50/40">
            <h3 className="font-display font-semibold text-slate-900 text-sm">
              {KPIS[openIdx].label} · variance breakdown
            </h3>
            <span className="text-xs font-mono text-slate-500">Top movers · ranked by impact</span>
          </div>
          <ul className="divide-y divide-surface-200">
            {KPIS[openIdx].drilldown.map((row) => (
              <li
                key={row.label}
                className="px-5 py-3 grid grid-cols-3 gap-4 items-center text-sm"
              >
                <span className="text-slate-700 font-medium">{row.label}</span>
                <span className="font-display font-semibold text-slate-900 text-right tabular-nums">
                  {row.value}
                </span>
                <span className="text-xs font-mono text-slate-500 text-right">{row.delta}</span>
              </li>
            ))}
          </ul>
          <div className="px-5 py-3 bg-surface-50 border-t border-surface-200 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-mono">
              Ask the agent: <span className="text-slate-700">&quot;Why is {KPIS[openIdx].label} off?&quot;</span>
            </span>
            <span className="text-brand-600 font-semibold">
              In the real product, click ↑ chat tab for the answer.
            </span>
          </div>
        </div>
      )}

      <div className="mt-6 rounded-xl bg-white border border-surface-200 p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-brand-500" />
            Revenue · last 12 months vs Budget
          </span>
          <span className="text-xs text-slate-400 font-mono">▲ 12% YoY</span>
        </div>
        <Sparkline />
      </div>
    </div>
  );
}

function Sparkline() {
  const actual = [40, 44, 41, 50, 56, 58, 62, 64, 68, 72, 76, 82];
  const budget = [42, 45, 48, 52, 55, 60, 64, 68, 70, 73, 75, 78];
  const W = 600, H = 100;
  const path = (xs: number[]) =>
    xs
      .map((v, i) => {
        const x = (i / (xs.length - 1)) * W;
        const y = H - (v / 100) * H;
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-24" preserveAspectRatio="none">
      <defs>
        <linearGradient id="demoSpark" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#2e6fff" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#2e6fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${path(actual)} L${W},${H} L0,${H} Z`} fill="url(#demoSpark)" />
      <path d={path(budget)} fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" />
      <path d={path(actual)} fill="none" stroke="#2e6fff" strokeWidth="2" />
    </svg>
  );
}
