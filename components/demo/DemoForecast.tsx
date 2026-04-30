"use client";

import { useState } from "react";
import { TrendingUp, Trophy, Lock } from "lucide-react";

const ALGOS = [
  { key: "linear",  name: "Linear regression",  r2: 0.78, mape: 4.2, note: "Steady trend, struggles in Q1." },
  { key: "arima",   name: "ARIMA",              r2: 0.91, mape: 2.6, note: "Best on this series. Captures seasonality." },
  { key: "hw",      name: "Holt-Winters",       r2: 0.84, mape: 3.4, note: "Good seasonality, slight under-prediction at month-end." },
  { key: "rf",      name: "Random Forest",      r2: 0.86, mape: 3.1, note: "Good but overfits to the Q1 launch spike." },
  { key: "gb",      name: "Gradient Boosting",  r2: 0.88, mape: 2.9, note: "Tied with ARIMA on RMSE; ARIMA is more interpretable." },
];

const WINNER_KEY = "arima";

export default function DemoForecast() {
  const [picked, setPicked] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display font-semibold text-lg text-slate-900 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-accent-cyan" />
          Forecast comparison · 5 algorithms
        </h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Each row ran on the same series. Pick the winner — we recommend ARIMA. In the real
          product, you can run all 15 algorithms.
        </p>
      </div>

      <div className="space-y-2.5">
        {ALGOS.map((a) => {
          const isPicked = picked === a.key;
          const isWinner = a.key === WINNER_KEY;
          return (
            <button
              key={a.key}
              onClick={() => !locked && setPicked(a.key)}
              disabled={locked}
              className={`w-full text-left rounded-lg border px-4 py-3 transition-all flex items-center gap-4 ${
                isPicked
                  ? "bg-brand-50 border-brand-500 ring-2 ring-brand-500/20"
                  : "bg-white border-surface-200 hover:border-brand-200"
              } ${locked && !isPicked ? "opacity-50" : ""}`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-display font-semibold text-slate-900">{a.name}</span>
                  {isWinner && !isPicked && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-accent-emerald bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5">
                      <Trophy className="w-3 h-3" />
                      Recommended
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{a.note}</p>
              </div>
              <div className="hidden sm:flex items-center gap-3 shrink-0">
                <span className="text-xs font-mono text-slate-500">
                  R² <span className="text-slate-900 font-semibold">{a.r2.toFixed(2)}</span>
                </span>
                <span className="text-xs font-mono text-slate-500">
                  MAPE <span className="text-slate-900 font-semibold">{a.mape.toFixed(1)}%</span>
                </span>
              </div>
              <div className="w-32 h-1.5 rounded-full bg-surface-200 overflow-hidden hidden lg:block">
                <div
                  className={`h-full rounded-full ${
                    isPicked ? "bg-brand-500" : isWinner ? "bg-accent-emerald" : "bg-slate-400"
                  }`}
                  style={{ width: `${a.r2 * 100}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Lock / unlock action */}
      <div className="mt-6 rounded-xl bg-brand-50 border border-brand-100 p-5 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="flex-1">
          {locked && picked ? (
            <p className="font-display font-semibold text-slate-900 text-sm">
              Locked: <span className="text-brand-700">
                {ALGOS.find((a) => a.key === picked)?.name}
              </span> is now the active forecast.
            </p>
          ) : picked ? (
            <p className="font-display font-semibold text-slate-900 text-sm">
              Lock <span className="text-brand-700">
                {ALGOS.find((a) => a.key === picked)?.name}
              </span> as the active forecast?
            </p>
          ) : (
            <p className="font-display font-semibold text-slate-900 text-sm">
              Pick an algorithm above to lock it as the active forecast.
            </p>
          )}
          <p className="text-xs text-slate-600 mt-0.5">
            Locking writes the chosen forecast into the plan. Audit log records actor + timestamp.
          </p>
        </div>
        {!locked ? (
          <button
            onClick={() => setLocked(true)}
            disabled={!picked}
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand-500 hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold px-4 py-2 transition-colors shadow-card"
          >
            <Lock className="w-3.5 h-3.5" />
            Lock forecast
          </button>
        ) : (
          <button
            onClick={() => {
              setLocked(false);
              setPicked(null);
            }}
            className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-surface-200 hover:bg-surface-50 text-slate-700 text-sm font-semibold px-4 py-2 transition-colors"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
