"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GitBranch, Check } from "lucide-react";
import { useShouldAnimate } from "@/components/animated/hooks";

const FORMULA = "SALARIES_ENG = HEADCOUNT_ENG × -10000";
const TYPING_MS = 50;

export default function LiveDriverFormula() {
  const animate = useShouldAnimate();
  const frozen = !animate;
  const [typed, setTyped] = useState(frozen ? FORMULA : "");
  const [committed, setCommitted] = useState(frozen);
  const [hc, setHc] = useState(frozen ? 12 : 9);

  useEffect(() => {
    if (frozen) return;
    let alive = true;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const reset = () => {
      if (!alive) return;
      setTyped("");
      setCommitted(false);
      setHc(9);
      runTyping(0);
    };

    const runTyping = (i: number) => {
      if (!alive) return;
      if (i <= FORMULA.length) {
        setTyped(FORMULA.slice(0, i));
        timers.push(setTimeout(() => runTyping(i + 1), TYPING_MS));
      } else {
        timers.push(
          setTimeout(() => {
            setCommitted(true);
            // Step headcount up
            timers.push(setTimeout(() => setHc(10), 700));
            timers.push(setTimeout(() => setHc(11), 1300));
            timers.push(setTimeout(() => setHc(12), 1900));
            timers.push(setTimeout(reset, 5000));
          }, 500)
        );
      }
    };

    runTyping(0);
    return () => {
      alive = false;
      timers.forEach(clearTimeout);
    };
  }, [frozen]);

  const salaries = hc * -10000;

  return (
    <div className="rounded-2xl bg-white border border-surface-200 shadow-card p-6">
      <div className="flex items-center gap-2 mb-5">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-violet-50 text-accent-violet">
          <GitBranch className="w-4 h-4" />
        </span>
        <span className="font-display font-semibold text-slate-900">Driver formula</span>
        <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-accent-emerald bg-emerald-50 px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse" />
          Live
        </span>
      </div>

      {/* Formula input */}
      <div className="rounded-xl border border-surface-200 bg-surface-50 px-4 py-3 mb-4">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
          Formula
        </div>
        <div className="font-mono text-sm text-slate-900 min-h-[20px]">
          {typed}
          {!frozen && !committed && (
            <motion.span
              className="ml-0.5 inline-block w-px h-4 bg-slate-700 align-middle"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
          )}
        </div>
        {committed && (
          <motion.div
            className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-accent-emerald"
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Check className="w-3.5 h-3.5" />
            Validated · saved
          </motion.div>
        )}
      </div>

      {/* Driver inputs + computed output */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-white border border-surface-200 p-3">
          <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
            HEADCOUNT_ENG
          </div>
          <motion.div
            key={`hc-${hc}`}
            className="mt-1 font-display font-bold text-2xl text-slate-900 tabular-nums"
            initial={{ scale: 0.9, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {hc}
          </motion.div>
          <div className="text-xs font-mono text-slate-400">FTE</div>
        </div>
        <div className="rounded-xl bg-rose-50 border border-rose-100 p-3">
          <div className="text-[10px] font-semibold uppercase tracking-wide text-accent-rose">
            SALARIES_ENG
          </div>
          <motion.div
            key={`s-${salaries}`}
            className="mt-1 font-display font-bold text-2xl text-slate-900 tabular-nums"
            initial={{ scale: 0.9, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            ${(salaries / 1000).toFixed(0)}k
          </motion.div>
          <div className="text-xs font-mono text-slate-400">monthly · auto</div>
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-500 font-mono">
        Hire 3 engineers → P&amp;L recomputes top-down. No spreadsheet rebuild.
      </p>
    </div>
  );
}
