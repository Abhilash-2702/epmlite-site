"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const QUESTION = "What's our runway if revenue drops 30%?";
const TOOL_LINES = [
  "→ Ran what_if_preview on revenue −30% across all entities",
  "→ Pulled CF_OPS history + linear-regression forecast",
  "→ Subtracted CA_CASH baseline",
];
const ANSWER_HEAD = "Result: ~7 months at the current burn rate.";
const ANSWER_BODY =
  "Best case: 9 months (if marketing cuts 40%). Worst case: 4 months (if AR collection slips).";

const TYPING_MS = 50;
const PAUSE_MS = 600;
const HOLD_MS = 4500;

export default function LiveChat() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<"typing" | "tools" | "answer" | "actions" | "hold">(
    reduced ? "actions" : "typing"
  );
  const [typed, setTyped] = useState(reduced ? QUESTION : "");
  const [toolIdx, setToolIdx] = useState(reduced ? TOOL_LINES.length : 0);
  const [answerVisible, setAnswerVisible] = useState(reduced);
  const [actionsVisible, setActionsVisible] = useState(reduced);

  useEffect(() => {
    if (reduced) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let alive = true;

    const startCycle = () => {
      if (!alive) return;
      setTyped("");
      setToolIdx(0);
      setAnswerVisible(false);
      setActionsVisible(false);
      setPhase("typing");
      runTyping(0);
    };

    const runTyping = (i: number) => {
      if (!alive) return;
      if (i <= QUESTION.length) {
        setTyped(QUESTION.slice(0, i));
        timers.push(setTimeout(() => runTyping(i + 1), TYPING_MS));
      } else {
        timers.push(setTimeout(() => runTools(0), PAUSE_MS));
      }
    };

    const runTools = (i: number) => {
      if (!alive) return;
      setPhase("tools");
      if (i <= TOOL_LINES.length) {
        setToolIdx(i);
        timers.push(setTimeout(() => runTools(i + 1), 700));
      } else {
        timers.push(
          setTimeout(() => {
            setAnswerVisible(true);
            setPhase("answer");
            timers.push(
              setTimeout(() => {
                setActionsVisible(true);
                setPhase("actions");
                timers.push(
                  setTimeout(() => {
                    setPhase("hold");
                    timers.push(setTimeout(startCycle, 600));
                  }, HOLD_MS)
                );
              }, 800)
            );
          }, 400)
        );
      }
    };

    startCycle();
    return () => {
      alive = false;
      timers.forEach(clearTimeout);
    };
  }, [reduced]);

  return (
    <div className="rounded-2xl bg-white border border-surface-200 shadow-elevated p-5 lg:p-6">
      {/* Live badge */}
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-accent-emerald bg-emerald-50 px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse" />
          Live demo
        </span>
        <span className="text-xs text-slate-400 font-mono">epm-lite · ai chat</span>
      </div>

      {/* User typing bubble */}
      <div className="flex justify-end mb-4">
        <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-brand-500 text-white px-4 py-2.5 text-sm min-h-[40px] inline-flex items-center">
          {typed}
          {!reduced && phase === "typing" && (
            <motion.span
              className="ml-0.5 inline-block w-px h-4 bg-white"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
          )}
        </div>
      </div>

      {/* Agent response */}
      {(toolIdx > 0 || answerVisible) && (
        <div className="flex justify-start mb-4">
          <div className="max-w-[90%] rounded-2xl rounded-bl-sm bg-surface-50 border border-surface-200 px-4 py-3">
            <ul className="space-y-1 mb-3 text-xs font-mono text-slate-500">
              {TOOL_LINES.map((line, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{
                    opacity: i < toolIdx ? 1 : 0,
                    x: i < toolIdx ? 0 : -6,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {line}
                </motion.li>
              ))}
            </ul>
            {answerVisible && (
              <>
                <motion.p
                  className="font-display text-base text-slate-900 font-semibold"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {ANSWER_HEAD}
                </motion.p>
                <motion.p
                  className="font-display text-sm text-slate-600 mt-1"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                >
                  {ANSWER_BODY}
                </motion.p>
                {actionsVisible && (
                  <motion.div
                    className="mt-3 flex flex-wrap gap-2"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <button className="rounded-lg bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-semibold px-3 py-1.5 transition-colors">
                      Show waterfall card
                    </button>
                    <button className="rounded-lg bg-surface-100 hover:bg-surface-200 text-slate-700 text-xs font-semibold px-3 py-1.5 transition-colors">
                      Save as scenario
                    </button>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Input bar */}
      <div className="mt-5 flex items-center gap-2 rounded-xl border border-surface-200 bg-surface-50 px-3 py-2">
        <span className="text-slate-400 text-sm">Ask anything…</span>
        <span className="ml-auto inline-flex items-center justify-center w-7 h-7 rounded-lg bg-brand-500 text-white">
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </div>
  );
}
