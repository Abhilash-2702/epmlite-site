import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import {
  PageHero,
  Section,
  SectionHeader,
  CardGrid,
  ComparisonTable,
  CtaBand,
  type ComparisonRow,
} from "@/components/page-sections";

export const Route = createFileRoute("/vs/adaptive")({
  head: () => ({
    meta: [
      { title: "NashOS vs Workday Adaptive Planning" },
      {
        name: "description",
        content:
          "AI-native FP&A built for the LLM era. 35+ tools, 15 forecast algorithms, hours-not-months setup vs Workday Adaptive Planning.",
      },
    ],
  }),
  component: VsAdaptivePage,
});

const ROWS: ComparisonRow[] = [
  { label: "Setup time", nashos: "Hours", rival: "3–6 months", winner: "nashos" },
  { label: "Annual price (mid-market)", nashos: "$1.2k–$6k", rival: "$150k+", winner: "nashos" },
  { label: "AI architecture", nashos: "Native · 35+ tools", rival: "Bolt-on assistant", winner: "nashos" },
  { label: "Forecast algorithms", nashos: "15 · side-by-side compare", rival: "2–3 traditional", winner: "nashos" },
  { label: "What-if scenarios", nashos: "Live slider · sub-second", rival: "Yes", winner: "draw" },
  { label: "Excel-like grids", nashos: "Yes (chat-first, grid fallback)", rival: "Yes (grid-first)", winner: "draw" },
  { label: "Workday HRIS integration", nashos: "Roadmap", rival: "Native", winner: "rival" },
  { label: "Audit trail", nashos: "Before/after JSON", rival: "Yes", winner: "draw" },
  { label: "Multi-entity / currency", nashos: "9-dim cube", rival: "Yes", winner: "draw" },
  { label: "Plain-English query", nashos: "Native chat agent", rival: "Limited", winner: "nashos" },
];

const CARDS = [
  {
    title: "Built for the LLM era, not retrofitted",
    body:
      "Adaptive is a strong product, but its AI features are added on top of an architecture from before LLM tool-use was viable. NashOS was designed around an agent that can read AND write the cube safely.",
  },
  {
    title: "Forecasting depth that doesn't require an ML team",
    body:
      "15 algorithms shipped, with R²/RMSE/MAPE comparisons baked in. Adaptive forecasts are fine for trend extrapolation — for AI-driven what-if, NashOS goes further.",
  },
  {
    title: "No Workday lock-in required",
    body:
      "If you're not on Workday HCM, Adaptive's biggest integration advantage doesn't apply. NashOS stays integration-agnostic — REST/SFTP/Excel/CSV today, with NetSuite + QuickBooks on the roadmap.",
  },
  {
    title: "Pricing that lets a 30-person company actually buy it",
    body:
      "Adaptive's mid-market pricing starts in six figures. NashOS is $99–$499/mo for the same core capabilities. The CFO who'd never get budget for Adaptive can buy this on a credit card.",
  },
];

function VsAdaptivePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="NashOS vs Adaptive"
        title="AI-native planning,"
        highlight="without the Workday tax."
        lede="Workday Adaptive Planning is a great fit if you're already a Workday HCM customer. If you're not, you're paying an enterprise tax for a tool that wasn't designed around modern AI. NashOS is the alternative: AI-first, mid-market price, ready in hours."
        primaryCta={{ label: "Try with your data", to: "/try" }}
        secondaryCta={{ label: "Book a walkthrough", to: "/demo" }}
      />

      <Section>
        <SectionHeader title="Side-by-side" />
        <ComparisonTable rivalName="Adaptive" rows={ROWS} />
      </Section>

      <Section>
        <SectionHeader title="What you get with NashOS that you don't with Adaptive" />
        <CardGrid items={CARDS} cols={2} />
      </Section>

      <Section>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="surface-card p-7">
            <p className="text-xs uppercase tracking-[0.2em] text-gold mb-3 font-semibold">
              NashOS is for you if
            </p>
            <p className="text-foreground/90 leading-relaxed">
              You want a planning tool that's AI-native, not retrofitted. You're not on Workday
              HCM (or don't care about that integration). You want to be live this quarter, not
              next year.
            </p>
          </div>
          <div className="surface-card p-7">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3 font-semibold">
              Adaptive is for you if
            </p>
            <p className="text-foreground/90 leading-relaxed">
              You're a Workday HCM customer wanting tight HR + finance integration, you have an
              enterprise FP&amp;A team, and your IT can manage a 3–6 month rollout.
            </p>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Stop paying for an"
        highlight="AI bolt-on."
        primaryCta={{ label: "Try with your data", to: "/try" }}
        secondaryCta={{ label: "Book a demo", to: "/demo" }}
      />
    </PageShell>
  );
}
