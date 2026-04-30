"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles, RotateCcw } from "lucide-react";

type Exchange = {
  question: string;
  toolLines: string[];
  answer: { headline: string; body?: string };
  actions?: string[];
};

const PRESETS: Exchange[] = [
  {
    question: "What's our runway if revenue drops 30%?",
    toolLines: [
      "→ Ran what_if_preview on revenue −30% across all entities",
      "→ Pulled CF_OPS history + linear-regression forecast",
      "→ Subtracted CA_CASH baseline",
    ],
    answer: {
      headline: "Result: ~7 months at the current burn rate.",
      body: "Best case: 9 months (if marketing cuts 40%). Worst case: 4 months (if AR collection slips).",
    },
    actions: ["Show waterfall card", "Save as scenario"],
  },
  {
    question: "Why is EBITDA off this month?",
    toolLines: [
      "→ Pulled variance vs budget for FY26 May",
      "→ Ranked top contributors by financial impact",
      "→ Cross-referenced with commitment ledger",
    ],
    answer: {
      headline: "EBITDA is $18k below plan, driven by S&M overspend.",
      body: "S&M is $120k over plan (paid-search + 2 unbudgeted contractor hires). Offset by R&D $40k under plan (delayed senior hire). Recommend: reset S&M monthly cap at $310k.",
    },
    actions: ["Open S&M drill-down", "Draft email to Head of Marketing"],
  },
  {
    question: "Hire 3 engineers and show the impact on runway.",
    toolLines: [
      "→ Resolved HEADCOUNT_ENG +3 starting next month",
      "→ Recomputed SALARIES_ENG via member formula × −10000",
      "→ Re-projected runway with new monthly burn",
    ],
    answer: {
      headline: "Runway drops from 14 mo → 11 mo. Burn rises $30k/mo.",
      body: "Total cash impact through 2027: $2.1M. Hiring all 3 in May costs $330k more YTD than staggering across Q3.",
    },
    actions: ["Stage as draft scenario", "Show staggered hire option"],
  },
  {
    question: "Forecast Q3 revenue with three algorithms — pick the best.",
    toolLines: [
      "→ Ran ARIMA, Holt-Winters, Random Forest on REVENUE_TOTAL",
      "→ Computed R²/RMSE/MAPE on holdout",
      "→ Compared against scenario assumptions",
    ],
    answer: {
      headline: "ARIMA wins (R² 0.91). Q3 forecast: $1.42M ± $80k.",
      body: "Holt-Winters: 0.84 (slight under-prediction at month-end). Random Forest: 0.86 (overfits to Q1 spike). Locking ARIMA into Forecast_v3.",
    },
    actions: ["Lock forecast", "Compare to Q3 budget"],
  },
  {
    question: "Update JPY exchange rate to 150 and re-translate Japan entity.",
    toolLines: [
      "→ Validated rate input (current: 145.2 → new: 150.0)",
      "→ Drafted UPDATE on EXCH_RATE.JPY for FY26",
      "→ Recomputed JP entity P&L in USD",
    ],
    answer: {
      headline: "Drafted. Click Post to commit.",
      body: "JP revenue (USD) drops $42k for FY26. JP EBITDA drops $9k. Audit trail will record actor + before/after on commit.",
    },
    actions: ["Post commit", "Cancel draft"],
  },
  {
    question: "Download this dashboard as a PDF for the board.",
    toolLines: [
      "→ Captured Executive Dashboard view",
      "→ Generated PDF with cover page + 6 KPI cards + chart",
      "→ Ready in /exports/",
    ],
    answer: {
      headline: "PDF ready: dashboard_2026-04-30.pdf (1.2 MB).",
      body: "Includes variance commentary auto-generated for the 3 KPIs that moved most.",
    },
    actions: ["Download", "Email to board list"],
  },
];

const TYPING_MS = 35;

export default function DemoChat() {
  const [active, setActive] = useState<Exchange | null>(null);
  const [typedQuestion, setTypedQuestion] = useState("");
  const [toolIdx, setToolIdx] = useState(0);
  const [answerVisible, setAnswerVisible] = useState(false);
  const [actionsVisible, setActionsVisible] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timersRef.current.forEach(clearTimeout), []);

  function reset() {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setActive(null);
    setTypedQuestion("");
    setToolIdx(0);
    setAnswerVisible(false);
    setActionsVisible(false);
  }

  function play(ex: Exchange) {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setActive(ex);
    setTypedQuestion("");
    setToolIdx(0);
    setAnswerVisible(false);
    setActionsVisible(false);

    const q = ex.question;
    const runTyping = (i: number) => {
      if (i <= q.length) {
        setTypedQuestion(q.slice(0, i));
        timersRef.current.push(setTimeout(() => runTyping(i + 1), TYPING_MS));
      } else {
        timersRef.current.push(setTimeout(() => runTools(0), 400));
      }
    };
    const runTools = (i: number) => {
      if (i <= ex.toolLines.length) {
        setToolIdx(i);
        timersRef.current.push(setTimeout(() => runTools(i + 1), 600));
      } else {
        timersRef.current.push(setTimeout(() => setAnswerVisible(true), 300));
        timersRef.current.push(setTimeout(() => setActionsVisible(true), 1100));
      }
    };
    runTyping(0);
  }

  return (
    <div className="grid lg:grid-cols-[1fr_2fr] gap-5 items-start">
      {/* Preset prompts */}
      <div className="rounded-xl bg-white border border-surface-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-semibold text-slate-900 text-sm">
            Try a real prompt
          </h3>
          {active && (
            <button
              onClick={reset}
              className="inline-flex items-center gap-1 text-xs font-mono text-slate-500 hover:text-brand-600 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              reset
            </button>
          )}
        </div>
        <ul className="space-y-2">
          {PRESETS.map((p) => (
            <li key={p.question}>
              <button
                onClick={() => play(p)}
                className={`w-full text-left rounded-lg border px-3 py-2.5 text-sm transition-colors ${
                  active?.question === p.question
                    ? "bg-brand-50 border-brand-500 text-brand-700"
                    : "bg-surface-50 border-surface-200 hover:bg-surface-100 hover:border-brand-200 text-slate-700"
                }`}
              >
                <span className="block font-mono text-xs">{p.question}</span>
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[11px] text-slate-500 leading-snug">
          In the real product, you type freely and the agent calls the right tools. Here we
          play canned answers so you can see the format.
        </p>
      </div>

      {/* Chat thread */}
      <div className="rounded-xl bg-white border border-surface-200 p-5 min-h-[480px] flex flex-col">
        {!active ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 text-accent-emerald mb-4">
              <Sparkles className="w-6 h-6" />
            </span>
            <h3 className="font-display font-semibold text-slate-900">Pick a prompt to start</h3>
            <p className="mt-1 text-sm text-slate-500 max-w-xs">
              Click one of the prompts on the left and watch the agent answer.
            </p>
          </div>
        ) : (
          <div className="flex-1">
            {/* User bubble */}
            <div className="flex justify-end mb-4">
              <div className="max-w-[88%] rounded-2xl rounded-br-sm bg-brand-500 text-white px-4 py-2.5 text-sm">
                {typedQuestion}
              </div>
            </div>

            {/* Agent response */}
            {(toolIdx > 0 || answerVisible) && (
              <div className="flex justify-start">
                <div className="max-w-[92%] rounded-2xl rounded-bl-sm bg-surface-50 border border-surface-200 px-4 py-3">
                  <ul className="space-y-1 mb-3 text-xs font-mono text-slate-500">
                    {active.toolLines.map((line, i) => (
                      <li
                        key={i}
                        style={{ opacity: i < toolIdx ? 1 : 0, transition: "opacity 0.2s" }}
                      >
                        {line}
                      </li>
                    ))}
                  </ul>
                  {answerVisible && (
                    <>
                      <p className="font-display text-base text-slate-900 font-semibold">
                        {active.answer.headline}
                      </p>
                      {active.answer.body && (
                        <p className="font-display text-sm text-slate-600 mt-1">
                          {active.answer.body}
                        </p>
                      )}
                      {actionsVisible && active.actions && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {active.actions.map((a, i) => (
                            <button
                              key={a}
                              className={`rounded-lg text-xs font-semibold px-3 py-1.5 transition-colors ${
                                i === 0
                                  ? "bg-brand-50 hover:bg-brand-100 text-brand-700"
                                  : "bg-surface-100 hover:bg-surface-200 text-slate-700"
                              }`}
                            >
                              {a}
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Input bar (decorative) */}
        <div className="mt-5 flex items-center gap-2 rounded-xl border border-surface-200 bg-surface-50 px-3 py-2">
          <span className="text-slate-400 text-sm">Ask anything…</span>
          <span className="ml-auto inline-flex items-center justify-center w-7 h-7 rounded-lg bg-brand-500 text-white">
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </div>
  );
}
