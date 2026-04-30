import type { Metadata } from "next";
import ComparisonPage, { type CompareRow, type CompareCard } from "@/components/ComparisonPage";

export const metadata: Metadata = {
  title: "EPM Lite vs Workday Adaptive",
  description:
    "AI-native FP&A built for the LLM era. 35+ tools, 15 forecast algorithms, hours-not-months setup vs Workday Adaptive Planning.",
};

const rows: CompareRow[] = [
  { label: "Setup time",                epm: "Hours",                              rival: "3–6 months",                  winner: "epm" },
  { label: "Annual price (mid-market)", epm: "$1.2k–$6k",                           rival: "$150k+",                      winner: "epm" },
  { label: "AI architecture",            epm: "Native · 35+ tools",                  rival: "Bolt-on assistant",           winner: "epm" },
  { label: "Forecast algorithms",        epm: "15 · side-by-side compare",           rival: "2–3 traditional",             winner: "epm" },
  { label: "What-if scenarios",          epm: "Live slider · sub-second",            rival: "Yes",                         winner: "draw" },
  { label: "Excel-like grids",           epm: "Yes (chat-first, grid fallback)",     rival: "Yes (grid-first)",            winner: "draw" },
  { label: "Workday HRIS integration",   epm: "Roadmap",                              rival: "Native",                     winner: "rival" },
  { label: "Audit trail",                epm: "Before/after JSON",                   rival: "Yes",                         winner: "draw" },
  { label: "Multi-entity / currency",    epm: "9-dim cube",                          rival: "Yes",                         winner: "draw" },
  { label: "Plain-English query",        epm: "Native chat agent",                   rival: "Limited",                     winner: "epm" },
];

const diffCards: CompareCard[] = [
  {
    headline: "Built for the LLM era, not retrofitted",
    body: "Adaptive is a strong product, but its AI features are added on top of an architecture from before LLM tool-use was viable. EPM Lite was designed around an agent that can read AND write the cube safely.",
  },
  {
    headline: "Forecasting depth that doesn't require an ML team",
    body: "15 algorithms shipped, with R²/RMSE/MAPE comparisons baked in. Adaptive forecasts are fine for trend extrapolation — for AI-driven what-if, EPM Lite goes further.",
  },
  {
    headline: "No Workday lock-in required",
    body: "If you're not on Workday HCM, Adaptive's biggest integration advantage doesn't apply. EPM Lite stays integration-agnostic — REST/SFTP/Excel/CSV today, with NetSuite + QuickBooks on the roadmap.",
  },
  {
    headline: "Pricing that lets a 30-person company actually buy it",
    body: "Adaptive's mid-market pricing starts in six figures. EPM Lite is $99–$499/mo for the same core capabilities. The CFO who'd never get budget for Adaptive can buy this on a credit card.",
  },
];

export default function VsAdaptivePage() {
  return (
    <ComparisonPage
      rivalName="Workday Adaptive Planning"
      rivalShortName="Adaptive"
      kicker="EPM LITE VS ADAPTIVE"
      headline="AI-native planning, without the Workday tax."
      subhead="Workday Adaptive Planning is a great fit if you're already a Workday HCM customer. If you're not, you're paying an enterprise tax for a tool that wasn't designed around modern AI. EPM Lite is the alternative: AI-first, mid-market price, ready in hours."
      rows={rows}
      diffCards={diffCards}
      whoIsItFor={{
        epm: "You want a planning tool that's AI-native, not retrofitted. You're not on Workday HCM (or don't care about that integration). You want to be live this quarter, not next year.",
        rival: "You're a Workday HCM customer wanting tight HR + finance integration, you have an enterprise FP&A team, and your IT can manage a 3–6 month rollout.",
      }}
      ctaPrompt="Stop paying for an AI bolt-on."
    />
  );
}
