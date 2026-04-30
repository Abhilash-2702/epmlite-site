"use client";

import { useState } from "react";
import { FlaskConical, Save } from "lucide-react";

const KPIS = [
  { label: "Revenue", base: 4.2, suffix: "M", prefix: "$", precision: 2 },
  { label: "EBITDA", base: 890, suffix: "k", prefix: "$", precision: 0 },
  { label: "Runway", base: 14, suffix: " mo", prefix: "", precision: 0 },
  { label: "Cash", base: 8.5, suffix: "M", prefix: "$", precision: 1 },
];

function compute(label: string, base: number, pct: number): number {
  if (label === "Revenue") return base * (1 + pct / 100);
  if (label === "EBITDA") return base * (1 + pct / 50);
  if (label === "Runway") return Math.max(2, base * (1 + pct / 60));
  if (label === "Cash") return base * (1 + pct / 80);
  return base;
}

export default function DemoWhatIf() {
  const [pct, setPct] = useState(0);

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display font-semibold text-lg text-slate-900 flex items-center gap-2">
          <FlaskConical className="w-5 h-5 text-accent-amber" />
          What-if: revenue shock
        </h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Drag the slider. Watch the four KPIs recompute. In the real product, you can stack
          multiple shocks and save scenarios.
        </p>
      </div>

      {/* Slider */}
      <div className="rounded-xl bg-white border border-surface-200 p-5 mb-5">
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="rev-slider" className="text-sm font-medium text-slate-700">
            Revenue adjustment
          </label>
          <span className="font-display font-bold text-2xl text-slate-900 tabular-nums">
            {pct > 0 ? "+" : ""}
            {pct}%
          </span>
        </div>
        <input
          id="rev-slider"
          type="range"
          min={-50}
          max={20}
          step={1}
          value={pct}
          onChange={(e) => setPct(parseInt(e.target.value, 10))}
          className="w-full h-2 rounded-full appearance-none bg-gradient-to-r from-accent-rose via-accent-amber to-emerald-300 cursor-pointer accent-brand-500"
          style={{ accentColor: "#2e6fff" }}
        />
        <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-2">
          <span>−50%</span>
          <span>−25%</span>
          <span>0%</span>
          <span>+20%</span>
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {KPIS.map((k) => {
          const value = compute(k.label, k.base, pct);
          const delta = ((value - k.base) / k.base) * 100;
          const tone =
            delta < -1
              ? "text-accent-rose"
              : delta > 1
              ? "text-accent-emerald"
              : "text-slate-500";
          return (
            <div
              key={k.label}
              className="rounded-xl bg-white border border-surface-200 p-4"
            >
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                {k.label}
              </div>
              <div className="mt-1 font-display font-bold text-2xl text-slate-900 tabular-nums">
                {k.prefix}
                {value.toFixed(k.precision)}
                {k.suffix}
              </div>
              <div className={`text-xs font-mono ${tone}`}>
                {delta > 0 ? "▲" : delta < 0 ? "▼" : "—"} {Math.abs(delta).toFixed(0)}%
              </div>
            </div>
          );
        })}
      </div>

      {/* Save scenario */}
      <div className="mt-6 rounded-xl bg-brand-50 border border-brand-100 p-5 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="flex-1">
          <p className="font-display font-semibold text-slate-900 text-sm">
            Save this as a scenario?
          </p>
          <p className="text-xs text-slate-600 mt-0.5">
            In the real product, the scenario stacks with hiring/marketing/etc — you compare
            them all in one view.
          </p>
        </div>
        <button
          disabled
          className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-surface-200 text-slate-500 text-xs font-semibold px-3 py-2 cursor-not-allowed"
          title="Disabled in demo"
        >
          <Save className="w-3.5 h-3.5" />
          Save (demo)
        </button>
      </div>
    </div>
  );
}
