"use client";

import { useState } from "react";
import { GitBranch, Check, Lock } from "lucide-react";

type Driver = {
  id: string;
  name: string;
  formula: string;
  unit: string;
  current: number;
  derivedAccount?: string;
  derivedFormula?: (current: number) => number;
  derivedUnit?: string;
  derivedFmt?: (n: number) => string;
};

const fmtUSD = (n: number) =>
  `$${Math.abs(n) >= 1000 ? (n / 1000).toFixed(1) + "k" : n.toFixed(0)}`;

const INITIAL: Driver[] = [
  {
    id: "headcount-eng",
    name: "HEADCOUNT_ENG",
    formula: "(input)",
    unit: "FTE",
    current: 12,
    derivedAccount: "SALARIES_ENG",
    derivedFormula: (n) => n * -10000,
    derivedUnit: "$ / month",
    derivedFmt: fmtUSD,
  },
  {
    id: "acv-mid",
    name: "ACV_MID_MARKET",
    formula: "(input)",
    unit: "$ / customer / yr",
    current: 24000,
    derivedAccount: "REVENUE_NEW_MID",
    derivedFormula: (n) => n * 8, // assume 8 new customers / month
    derivedUnit: "$ / month",
    derivedFmt: fmtUSD,
  },
  {
    id: "headcount-cs",
    name: "HEADCOUNT_CS",
    formula: "= HEADCOUNT_ENG × 0.4",
    unit: "FTE",
    current: 5,
    derivedAccount: "SALARIES_CS",
    derivedFormula: (n) => n * -7000,
    derivedUnit: "$ / month",
    derivedFmt: fmtUSD,
  },
];

export default function DemoDrivers() {
  const [drivers, setDrivers] = useState(INITIAL);

  function update(id: string, value: number) {
    setDrivers((prev) =>
      prev.map((d) => {
        if (d.id !== id) {
          // CS auto-derives from eng
          if (d.id === "headcount-cs" && id === "headcount-eng") {
            return { ...d, current: Math.round(value * 0.4) };
          }
          return d;
        }
        return { ...d, current: value };
      })
    );
  }

  return (
    <div>
      <div className="mb-5">
        <h2 className="font-display font-semibold text-lg text-slate-900 flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-accent-violet" />
          Driver-based plan
        </h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Change a driver. Watch the derived account recompute. The cube does this on every level.
        </p>
      </div>

      <div className="space-y-3">
        {drivers.map((d) => {
          const derived = d.derivedFormula ? d.derivedFormula(d.current) : null;
          return (
            <div
              key={d.id}
              className="rounded-xl bg-white border border-surface-200 p-5"
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                {/* Driver definition */}
                <div className="flex-1 min-w-[260px]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-sm text-slate-900 font-semibold">
                      {d.name}
                    </span>
                    <span className="font-mono text-xs text-slate-500">{d.formula}</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <input
                      type="number"
                      value={d.current}
                      onChange={(e) => update(d.id, parseFloat(e.target.value) || 0)}
                      className="font-display font-bold text-2xl text-slate-900 bg-transparent border-b-2 border-brand-500 focus:outline-none w-24 tabular-nums"
                      step={d.id === "acv-mid" ? 1000 : 1}
                    />
                    <span className="text-xs text-slate-500">{d.unit}</span>
                  </div>
                </div>
                {/* Derived account */}
                {derived !== null && d.derivedAccount && d.derivedFmt && (
                  <div className="rounded-lg bg-rose-50 border border-rose-100 px-4 py-3 min-w-[160px]">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-accent-rose">
                      {d.derivedAccount}
                    </p>
                    <p className="font-display font-bold text-xl text-slate-900 tabular-nums mt-0.5">
                      {derived < 0 && "-"}
                      {d.derivedFmt(Math.abs(derived))}
                    </p>
                    <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                      {d.derivedUnit} · auto
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 rounded-xl bg-brand-50 border border-brand-100 p-5">
        <div className="flex items-start gap-3">
          <Check className="w-5 h-5 text-accent-emerald mt-0.5 shrink-0" />
          <div className="flex-1">
            <p className="font-display font-semibold text-slate-900 text-sm">
              That&apos;s driver-based planning in 30 seconds.
            </p>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Real product: 100+ drivers, formulas across the cube,
              versioned + audit-trailed. Hire 3 engineers? P&amp;L recomputes
              top-down. No spreadsheet rebuild.
            </p>
          </div>
          <button
            disabled
            className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-surface-200 text-slate-500 text-xs font-semibold px-3 py-2 cursor-not-allowed"
            title="Disabled in demo"
          >
            <Lock className="w-3 h-3" />
            Save formulas
          </button>
        </div>
      </div>
    </div>
  );
}
