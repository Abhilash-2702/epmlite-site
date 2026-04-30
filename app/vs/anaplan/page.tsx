import type { Metadata } from "next";
import ComparisonPage, { type CompareRow, type CompareCard } from "@/components/ComparisonPage";

export const metadata: Metadata = {
  title: "EPM Lite vs Anaplan",
  description:
    "AI-native FP&A in hours, not 6-month Anaplan implementations. 35+ tools, 15 forecast algorithms, $99/mo.",
};

const rows: CompareRow[] = [
  { label: "Setup time",                epm: "Hours",                          rival: "6–9 months",                winner: "epm" },
  { label: "Annual price (mid-market)", epm: "$1.2k–$6k",                       rival: "$150k+",                    winner: "epm" },
  { label: "AI architecture",            epm: "Native · 35+ tools",              rival: "Bolt-on copilot",           winner: "epm" },
  { label: "Forecast algorithms",        epm: "15 (compare side-by-side)",       rival: "Limited / single-model",    winner: "epm" },
  { label: "What-if scenarios",          epm: "Live slider · sub-second",        rival: "Yes (slower modeling)",     winner: "epm" },
  { label: "Multi-entity / currency",    epm: "9-dim cube · built in",           rival: "9-dim cube · built in",     winner: "draw" },
  { label: "Audit trail",                epm: "Before/after JSON · per-mutation",rival: "Yes",                       winner: "draw" },
  { label: "Implementation team needed", epm: "1 finance lead",                  rival: "Anaplan model builder team",winner: "epm" },
  { label: "Plain-English query",        epm: "Native chat agent",               rival: "Through partner add-ons",   winner: "epm" },
  { label: "Best fit",                   epm: "Mid-market · SMB",                rival: "Enterprise · Fortune 500",  winner: "draw" },
];

const diffCards: CompareCard[] = [
  {
    headline: "AI is the foundation, not a feature",
    body: "Anaplan's chat sits on top of a model-builder paradigm from 2010. EPM Lite was designed around LLM tool-use from day one — the chat is how you read AND write to the cube.",
  },
  {
    headline: "Implementation tax = 0",
    body: "Anaplan needs trained model builders and 6+ months. EPM Lite is set up by your finance lead in an afternoon. The same week you sign, you have variance reporting.",
  },
  {
    headline: "15 forecast algorithms shipped on day 1",
    body: "ARIMA, SARIMA, Random Forest, Gradient Boosting, Holt-Winters, Neural Net, Ridge, Lasso, and more — compared side-by-side with R²/RMSE/MAPE. Anaplan offers a fraction of this.",
  },
  {
    headline: "Mid-market price",
    body: "Starter at $99/mo. Pro at $499/mo. Enterprise on request. You can run a real plan without an Anaplan-tier budget.",
  },
];

export default function VsAnaplanPage() {
  return (
    <ComparisonPage
      rivalName="Anaplan"
      kicker="EPM LITE VS ANAPLAN"
      headline="The Anaplan model — without the 6-month implementation."
      subhead="Anaplan is excellent for Fortune 500s with full BPM teams. For everyone else, the implementation tax is the killer. EPM Lite gives you AI-native planning, drivers, and forecasting at mid-market price — live in your environment in hours."
      rows={rows}
      diffCards={diffCards}
      whoIsItFor={{
        epm: "You're a $5M–$200M ARR company. You want planning that recomputes itself when assumptions change, with an AI agent that answers in plain English. You don't have a six-month runway for an Anaplan rollout.",
        rival: "You're a Fortune 500 with a 20+ person FP&A team, a dedicated Anaplan model builder, and complex consolidation requirements that justify a 6-month implementation.",
      }}
      ctaPrompt="See it on your data in 15 minutes."
    />
  );
}
