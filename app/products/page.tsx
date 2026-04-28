import type { Metadata } from "next";
import Link from "next/link";
import {
  BarChart3,
  FileSpreadsheet,
  GitBranch,
  Sparkles,
  FlaskConical,
  TrendingUp,
  Bell,
  Plug,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { DEMO_MAILTO } from "@/lib/constants";
import VideoOrMockup from "@/components/animated/VideoOrMockup";
import LiveForecast from "@/components/animated/LiveForecast";

export const metadata: Metadata = {
  title: "Products & Platforms",
  description:
    "Nine product pillars — Reporting, Planning, AI, and Operations — backed by a 9-dimension cube.",
};

type Pillar = {
  Icon: typeof BarChart3;
  title: string;
  headline: string;
  body: string;
  tone: string;
};

const reporting: Pillar[] = [
  {
    Icon: BarChart3,
    title: "Executive Dashboard",
    headline: "Real-time KPIs at a glance.",
    body:
      "Revenue, Gross Profit, EBITDA, Net Income, COGS, OPEX. Variance vs Budget on every card. Monthly trend, regional breakdown, P&L waterfall, cost-structure pie. Status badge surfaces above-plan / below-plan instantly.",
    tone: "text-brand-500 bg-brand-50",
  },
  {
    Icon: FileSpreadsheet,
    title: "P&L · Balance Sheet · Cash Flow",
    headline: "Canonical reports with full hierarchy.",
    body:
      "Drill from rollups (TOTAL_PL, TOTAL_BS, TOTAL_CF) to leaves. Multi-currency. CSV / Excel / PDF export from any view. Backed by a 9-dimension cube (Entity × Account × Period × Scenario × Version × Currency × Year × Product × Department).",
    tone: "text-brand-500 bg-brand-50",
  },
];

const planning: Pillar[] = [
  {
    Icon: GitBranch,
    title: "Driver-Based Planning",
    headline: "Connect business drivers to financial outcomes.",
    body:
      "Mark any account as a driver (FTE, units, %, hours). Build formulas like SALARIES_ENG = HEADCOUNT_ENG × −10000. Top-down assumptions flow into P&L automatically.",
    tone: "text-accent-violet bg-violet-50",
  },
  {
    Icon: FlaskConical,
    title: "What-If Scenarios",
    headline: "Test decisions before you make them.",
    body:
      "Percent / absolute / override adjustments at any account × period. Save scenarios, compare, delete when done. Variance results in <1 second.",
    tone: "text-accent-amber bg-amber-50",
  },
];

const ai: Pillar[] = [
  {
    Icon: Sparkles,
    title: "AI Chat",
    headline: "Plain-English finance copilot.",
    body:
      "35+ tools cover ~99% of manual app actions. Ask: \"What's our runway?\" \"Hire 3 engineers and show the impact.\" \"Update JPY rate to 150.\" Every write produces a draft card. User clicks Post; backend re-validates; commit happens. Nothing the LLM says auto-mutates the database.",
    tone: "text-accent-emerald bg-emerald-50",
  },
  {
    Icon: TrendingUp,
    title: "ML Forecasting · 15 algorithms",
    headline: "Side-by-side comparison, one click.",
    body:
      "Linear / Poly Regression, ARIMA / SARIMA, Ridge / Lasso, Random Forest, Gradient Boosting, Neural Net, Holt-Winters, Exponential Smoothing, etc. R² / RMSE / MAE / MAPE per run. Compare 2–5 algos side-by-side and lock the winner.",
    tone: "text-accent-cyan bg-cyan-50",
  },
];

const operations: Pillar[] = [
  {
    Icon: Bell,
    title: "Alerts",
    headline: "Catch what humans miss.",
    body:
      "4 rule types — Variance vs Budget, YoY change, Statistical anomaly (z-score), Magnitude. Configurable info / warning / critical thresholds. Findings ranked by financial impact (5% on $10M beats 50% on $1k).",
    tone: "text-accent-amber bg-amber-50",
  },
  {
    Icon: Plug,
    title: "Connectors",
    headline: "Pull data from where it lives.",
    body:
      "Inbound + outbound. Real drivers: REST · SFTP · Excel · CSV. Stub-ready: Oracle · SAP · ODBC. Run history, connection testing, scheduled runs.",
    tone: "text-brand-500 bg-brand-50",
  },
  {
    Icon: ShieldCheck,
    title: "Audit + RBAC",
    headline: "Enterprise-grade trail.",
    body:
      "Every dim/fact/formula/user mutation captured with before/after JSON. Roles: super_admin · admin · planner · viewer. Short-lived JWTs, refresh rotation, account lockout, helmet/CORS hardened.",
    tone: "text-slate-700 bg-slate-100",
  },
];

export default function ProductsPage() {
  return (
    <>
      <section className="bg-white pt-12 pb-12 lg:pt-20 lg:pb-16 border-b border-surface-200">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">
            Products &amp; Platforms
          </p>
          <h1 className="font-display font-bold text-4xl lg:text-5xl text-slate-900 tracking-tight text-balance">
            Nine pillars. One cube. One AI copilot.
          </h1>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-3xl">
            Everything an FP&amp;A team needs in one product, organized around how finance actually
            works: see what happened, plan what&apos;s next, predict the unknowns, and run the
            machinery cleanly.
          </p>
        </div>
      </section>

      <PillarGroup title="Reporting" caption="See what happened — and where it diverges from plan." pillars={reporting} />

      <PillarGroup
        title="Planning"
        caption="Build a plan that recomputes itself when assumptions change."
        pillars={planning}
        alt
      />

      {/* AI section with embedded animated forecast */}
      <section className="bg-white py-16 lg:py-20 border-t border-surface-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <p className="text-sm font-semibold text-accent-emerald uppercase tracking-wider mb-3">
              Forecasting &amp; AI
            </p>
            <h2 className="font-display font-bold text-2xl lg:text-3xl text-slate-900 tracking-tight">
              The differentiator: plain-English plus 15 algorithms.
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {ai.map((p) => (
              <PillarCard key={p.title} p={p} />
            ))}
          </div>
          <VideoOrMockup videoSrc="/videos/forecast.mp4" ariaLabel="Forecast comparison live demo">
            <LiveForecast />
          </VideoOrMockup>
        </div>
      </section>

      <PillarGroup
        title="Operations"
        caption="The boring-but-critical machinery: alerting, connectors, audit, access."
        pillars={operations}
        alt
        threeCol
      />

      <section className="bg-brand-50 py-14 border-t border-surface-200">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-2xl lg:text-3xl text-slate-900">
            Ready to see it on your data?
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={DEMO_MAILTO}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold px-5 py-3 shadow-card"
            >
              Book a 15-min demo
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/#pricing"
              className="inline-flex items-center gap-2 rounded-xl bg-white hover:bg-surface-50 text-slate-900 font-semibold px-5 py-3 border border-surface-200"
            >
              See pricing →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function PillarGroup({
  title,
  caption,
  pillars,
  alt,
  threeCol,
}: {
  title: string;
  caption: string;
  pillars: Pillar[];
  alt?: boolean;
  threeCol?: boolean;
}) {
  return (
    <section
      className={`${alt ? "bg-surface-50" : "bg-white"} py-16 lg:py-20 border-t border-surface-200`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-2">
            {title}
          </p>
          <p className="text-lg text-slate-600">{caption}</p>
        </div>
        <div className={`grid gap-5 ${threeCol ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}>
          {pillars.map((p) => (
            <PillarCard key={p.title} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PillarCard({ p }: { p: Pillar }) {
  return (
    <div className="rounded-2xl bg-white border border-surface-200 p-6 lg:p-7 shadow-card">
      <span className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${p.tone}`}>
        <p.Icon className="w-5 h-5" />
      </span>
      <h3 className="mt-5 font-display font-semibold text-lg text-slate-900">{p.title}</h3>
      <p className="mt-1 font-display text-sm font-medium text-slate-700">{p.headline}</p>
      <p className="mt-3 text-sm text-slate-600 leading-relaxed">{p.body}</p>
    </div>
  );
}
