"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TrendingUp, Trophy } from "lucide-react";

const ALGOS = [
  { name: "Linear", r2: 0.78 },
  { name: "ARIMA", r2: 0.91 },
  { name: "Holt-Winters", r2: 0.84 },
  { name: "Random Forest", r2: 0.86 },
  { name: "Gradient Boost", r2: 0.88 },
];

const STEP_MS = 700;
const HOLD_MS = 2500;

export default function LiveForecast() {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(reduced ? ALGOS.length : 0);
  const [showWinner, setShowWinner] = useState(reduced);

  useEffect(() => {
    if (reduced) return;
    let alive = true;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const tick = (i: number) => {
      if (!alive) return;
      if (i <= ALGOS.length) {
        setStep(i);
        timers.push(setTimeout(() => tick(i + 1), STEP_MS));
      } else {
        setShowWinner(true);
        timers.push(
          setTimeout(() => {
            setStep(0);
            setShowWinner(false);
            timers.push(setTimeout(() => tick(1), 400));
          }, HOLD_MS)
        );
      }
    };

    tick(1);
    return () => {
      alive = false;
      timers.forEach(clearTimeout);
    };
  }, [reduced]);

  const winnerIdx = ALGOS.reduce((best, a, i, arr) => (a.r2 > arr[best].r2 ? i : best), 0);

  return (
    <div className="rounded-2xl bg-white border border-surface-200 shadow-card p-6">
      <div className="flex items-center gap-2 mb-5">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-50 text-accent-cyan">
          <TrendingUp className="w-4 h-4" />
        </span>
        <span className="font-display font-semibold text-slate-900">Forecasting · 5 algorithms</span>
        <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-accent-emerald bg-emerald-50 px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse" />
          Running
        </span>
      </div>

      <div className="space-y-2.5">
        {ALGOS.map((a, i) => {
          const done = i < step;
          const running = i === step - 1 && step <= ALGOS.length && !showWinner;
          const isWinner = showWinner && i === winnerIdx;
          return (
            <div
              key={a.name}
              className={`flex items-center gap-3 rounded-lg border px-3 py-2 transition-colors ${
                isWinner
                  ? "bg-emerald-50 border-accent-emerald"
                  : done
                  ? "bg-surface-50 border-surface-200"
                  : "bg-white border-surface-200"
              }`}
            >
              <span className="text-xs font-mono text-slate-500 w-32 shrink-0">{a.name}</span>
              <div className="flex-1 h-1.5 rounded-full bg-surface-200 overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${
                    isWinner ? "bg-accent-emerald" : "bg-brand-500"
                  }`}
                  initial={false}
                  animate={{ width: done ? "100%" : running ? "60%" : "0%" }}
                  transition={{ duration: running ? 0.5 : 0.3 }}
                />
              </div>
              <span className="text-xs font-mono font-semibold text-slate-700 w-16 text-right tabular-nums">
                {done ? `R² ${a.r2.toFixed(2)}` : running ? "…" : ""}
              </span>
              {isWinner && (
                <motion.span
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-accent-emerald bg-white border border-accent-emerald rounded-full px-2 py-0.5"
                >
                  <Trophy className="w-3 h-3" />
                  Best
                </motion.span>
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-slate-500 font-mono">
        Compare side-by-side. Pick the winner. Lock the forecast.
      </p>
    </div>
  );
}
