import { createFileRoute } from "@tanstack/react-router";
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
} from "lucide-react";
import { PageShell } from "@/components/page-shell";
import {
  PageHero,
  Section,
  SectionHeader,
  CardGrid,
  CtaBand,
} from "@/components/page-sections";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products & Platforms — NashOS" },
      {
        name: "description",
        content:
          "Nine product pillars — Reporting, Planning, AI, and Operations — backed by a 9-dimension cube.",
      },
    ],
  }),
  component: ProductsPage,
});

const reporting = [
  {
    Icon: BarChart3,
    title: "Executive Dashboard",
    body:
      "Revenue, Gross Profit, EBITDA, Net Income, COGS, OPEX. Variance vs Budget on every card. Monthly trend, regional breakdown, P&L waterfall, cost-structure pie. Status badge surfaces above-plan / below-plan instantly.",
  },
  {
    Icon: FileSpreadsheet,
    title: "P&L · Balance Sheet · Cash Flow",
    body:
      "Drill from rollups (TOTAL_PL, TOTAL_BS, TOTAL_CF) to leaves. Multi-currency. CSV / Excel / PDF export from any view. Backed by a 9-dimension cube.",
  },
];

const planning = [
  {
    Icon: GitBranch,
    title: "Driver-Based Planning",
    body:
      "Mark any account as a driver (FTE, units, %, hours). Build formulas like SALARIES_ENG = HEADCOUNT_ENG × −10000. Top-down assumptions flow into P&L automatically.",
  },
  {
    Icon: FlaskConical,
    title: "What-If Scenarios",
    body:
      "Percent / absolute / override adjustments at any account × period. Save scenarios, compare, delete when done. Variance results in <1 second.",
  },
];

const ai = [
  {
    Icon: Sparkles,
    title: "AI Agent",
    body:
      'Plain-English chat with 35+ tools that cover ~99% of manual app actions. Ask: "What\'s our runway?" "Hire 3 engineers and show the impact." "Update JPY rate to 150." Every write produces a draft card. Nothing the LLM says auto-mutates the database.',
  },
  {
    Icon: TrendingUp,
    title: "ML Forecasting · 15 algorithms",
    body:
      "Linear / Poly Regression, ARIMA / SARIMA, Ridge / Lasso, Random Forest, Gradient Boosting, Neural Net, Holt-Winters, Exponential Smoothing. R² / RMSE / MAE / MAPE per run. Compare 2–5 algos side-by-side and lock the winner.",
  },
];

const operations = [
  {
    Icon: Bell,
    title: "Alerts",
    body:
      "4 rule types — Variance vs Budget, YoY change, Statistical anomaly (z-score), Magnitude. Configurable info / warning / critical thresholds. Findings ranked by financial impact.",
  },
  {
    Icon: Plug,
    title: "Connectors",
    body:
      "Inbound + outbound. Real drivers: REST · SFTP · Excel · CSV. Stub-ready: Oracle · SAP · ODBC. Run history, connection testing, scheduled runs.",
  },
  {
    Icon: ShieldCheck,
    title: "Audit + RBAC",
    body:
      "Every mutation captured with before/after JSON. Roles: super_admin · admin · planner · viewer. Short-lived JWTs, refresh rotation, account lockout, helmet/CORS hardened.",
  },
];

function ProductsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Products & platforms"
        title="Nine pillars."
        highlight="One cube. One AI agent."
        lede={
          <>
            Everything an FP&amp;A team needs in one product, organized around how finance
            actually works: see what happened, plan what's next, predict the unknowns, and run
            the machinery cleanly.
          </>
        }
      />

      <Section>
        <SectionHeader
          eyebrow="Reporting"
          title="See what happened"
          caption="And where it diverges from plan."
        />
        <CardGrid items={reporting} cols={2} />
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Planning"
          title="Build a plan that recomputes itself"
          caption="When assumptions change, the plan reacts."
        />
        <CardGrid items={planning} cols={2} />
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Forecasting & AI"
          title="The differentiator"
          caption="Plain English plus 15 forecast algorithms in a single workspace."
        />
        <CardGrid items={ai} cols={2} />
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Operations"
          title="The boring-but-critical machinery"
          caption="Alerting, connectors, audit, access — the things that keep finance trustworthy."
        />
        <CardGrid items={operations} cols={3} />
      </Section>

      <CtaBand
        title="Ready to see it on"
        highlight="your data?"
        primaryCta={{ label: "Try with your data", to: "/try" }}
        secondaryCta={{ label: "See pricing", to: "/pricing" }}
      />
    </PageShell>
  );
}
