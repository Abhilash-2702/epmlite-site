// Copy and constants of the From Q to D console, copied from the approved
// mock-up (Website/redesign-2026-11/index.html in the NashOS monorepo): STEPS,
// EXAMPLES and LOG_LINES from its "From Q to D console" script block, CHIPS
// from the .ask-chip buttons in its markup. Edit the mock-up first, then copy.

export type LoopStepCopy = {
  n: string;
  label: string;
  title: string;
  desc: string;
  bullets: string[];
};

export const STEPS: LoopStepCopy[] = [
  {
    n: "01",
    label: "Ask",
    title: "Ask in plain English",
    desc: "Live answers on your real model. No stale exports, no ticket queue.",
    bullets: [
      "Type any question, multi-entity aware",
      "Live answer cites source actuals + forecast",
      "No exports, no stale snapshots",
    ],
  },
  {
    n: "02",
    label: "Test",
    title: "Test the decision",
    desc: "Impact across P&L, Balance Sheet and Cash Flow, instantly.",
    bullets: [
      "Drag the slider, model recomputes",
      "Δ across P&L, Balance Sheet, Cash",
      "Side-by-side vs base scenario",
    ],
  },
  {
    n: "03",
    label: "Commit",
    title: "Commit with audit",
    desc: "Draft → review → commit. Every committed draft is tied to the user and the time, and most keep their before/after values.",
    bullets: [
      "Draft → review → commit workflow",
      "Before/after kept on most drafts",
      "Tied to the user and the time",
    ],
  },
];

export type Headline = { label: string; value: number; prefix?: string; suffix?: string };

export type AnswerRow = {
  label: string;
  value: string;
  pct: number;
  tone: "neg" | "pos" | "neutral";
};

export type Answer = {
  tools: string[];
  headline: Headline[];
  summary: string;
  rows: AnswerRow[];
  source: string;
  caveat?: string;
};

export const EXAMPLES: { q: string; answer: Answer }[] = [
  {
    q: "Hire 5 engineers in Q3",
    answer: {
      tools: ["list_drivers", "what_if_preview"],
      headline: [
        { label: "Runway", value: 12.8, suffix: " mo" },
        { label: "EBITDA impact", value: -1.1, prefix: "$", suffix: "M" },
      ],
      summary:
        "Adds ~$1.1M of engineering salary over the first twelve months at the plan's formula rate. Runway compresses by 1.4 months vs base.",
      rows: [
        { label: "Payroll Δ (first 12 mo)", value: "+$1.10M", pct: 72, tone: "neg" },
        { label: "Runway Δ", value: "−1.4 mo", pct: 56, tone: "neg" },
        { label: "HEADCOUNT_ENG", value: "+5 FTE", pct: 62, tone: "neutral" },
      ],
      source: "HEADCOUNT_ENG driver · formula rate · cash at Aug actuals · USD",
      caveat: "Priced at the plan's formula rate · name a salary to price the hires at it.",
    },
  },
  {
    q: "Why is EBITDA off?",
    answer: {
      tools: ["get_variance", "get_fact_value"],
      headline: [
        { label: "EBITDA Δ vs plan", value: -2.4, prefix: "$", suffix: "M" },
        { label: "Margin Δ", value: -3.1, suffix: " pp" },
      ],
      summary:
        "August EBITDA missed plan by $2.4M (−18%). Three drivers explain 91% of the variance, all on the cost side; revenue landed in-line.",
      rows: [
        { label: "AWS overage (EU)", value: "−$1.10M", pct: 46, tone: "neg" },
        { label: "Sales commissions accrual", value: "−$0.72M", pct: 30, tone: "neg" },
        { label: "Contractor spend (US)", value: "−$0.36M", pct: 15, tone: "neg" },
        { label: "Other (FX, true-ups)", value: "−$0.22M", pct: 9, tone: "neg" },
      ],
      source: "GL Aug-close · 3 entities · linked to 1,284 source rows",
      caveat: "Drill-through available on every line.",
    },
  },
  {
    q: "Re-forecast on the latest actuals",
    answer: {
      tools: ["compare_predictions", "prepare_forecast_save"],
      headline: [
        { label: "FY revenue (new fcst)", value: 38.4, prefix: "$", suffix: "M" },
        { label: "vs prior fcst", value: 2.6, prefix: "+$", suffix: "M" },
      ],
      summary:
        "The holdout winner lifts the FY revenue forecast by $2.6M (+7.3%) over the prior forecast. The lift is concentrated in the EU entity; the draft card saves it into the forecast scenario once you post it.",
      rows: [
        { label: "EU entity", value: "+$1.90M", pct: 73, tone: "pos" },
        { label: "US entity", value: "+$0.55M", pct: 21, tone: "pos" },
        { label: "UK entity", value: "+$0.15M", pct: 6, tone: "pos" },
        { label: "Holdout winner", value: "Holt-Winters", pct: 0, tone: "neutral" },
      ],
      source: "ACTUAL history · holdout backtest · 3 entities · USD",
    },
  },
];

// The three example questions above the console (the mock-up's .ask-chip
// buttons), in EXAMPLES order.
export const CHIPS: { q: string; a: string }[] = [
  { q: '"Hire 5 engineers in Q3"', a: "Runway and EBITDA, instantly." },
  { q: '"Why is EBITDA off?"', a: "Ranked drivers, in seconds." },
  { q: '"Re-forecast on the latest actuals"', a: "Recomputed across entities." },
];

export const LOG_LINES: { t: string; c: "gold" | "dim" }[] = [
  { t: "audit_log: INSERT dim_scenario · WHATIF_MH2K7Q9", c: "gold" },
  { t: "↳ name=Q3 hire 5 · user=admin · time + adjustments stored", c: "dim" },
  { t: "↳ factCount=1,284 · base FORECAST FY26", c: "dim" },
  { t: "↳ auditId=8842", c: "dim" },
];

// Timings, as the mock-up writes them.
export const AUTO_MS = 7000; // auto-advance to the next step
export const PAUSE_MS = 6000; // pause after a click or a slider move
export const TYPE_MS = 28; // typewriter, per character
export const TOOL_STAGGER_MS = 220; // tool chips
export const ROW_STAGGER_MS = 90; // answer rows
export const COUNT_MS = 700; // headline count-up
export const LOG_MS = 450; // audit terminal, per line
