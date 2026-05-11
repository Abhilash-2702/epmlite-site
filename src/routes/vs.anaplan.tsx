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

export const Route = createFileRoute("/vs/anaplan")({
  head: () => ({
    meta: [
      { title: "NashOS vs Anaplan" },
      {
        name: "description",
        content:
          "AI-native FP&A in hours, not 6-month Anaplan implementations. 35+ tools, 15 forecast algorithms, $99/mo.",
      },
    ],
  }),
  component: VsAnaplanPage,
});

const ROWS: ComparisonRow[] = [
  { label: "Setup time", nashos: "Hours", rival: "6–9 months", winner: "nashos" },
  { label: "Annual price (mid-market)", nashos: "$1.2k–$6k", rival: "$150k+", winner: "nashos" },
  { label: "AI architecture", nashos: "Native · 35+ tools", rival: "Bolt-on copilot", winner: "nashos" },
  { label: "Forecast algorithms", nashos: "15 (compare side-by-side)", rival: "Limited / single-model", winner: "nashos" },
  { label: "What-if scenarios", nashos: "Live slider · sub-second", rival: "Yes (slower modeling)", winner: "nashos" },
  { label: "Multi-entity / currency", nashos: "9-dim cube · built in", rival: "Yes", winner: "draw" },
  { label: "Audit trail", nashos: "Before/after JSON · per-mutation", rival: "Yes", winner: "draw" },
  { label: "Implementation team needed", nashos: "1 finance lead", rival: "Anaplan model builder team", winner: "nashos" },
  { label: "Plain-English query", nashos: "Native chat agent", rival: "Through partner add-ons", winner: "nashos" },
  { label: "Best fit", nashos: "Mid-market · SMB", rival: "Enterprise · Fortune 500", winner: "draw" },
];

const CARDS = [
  {
    title: "AI is the foundation, not a feature",
    body:
      "Anaplan's chat sits on top of a model-builder paradigm from 2010. NashOS was designed around LLM tool-use from day one — the chat is how you read AND write to the cube.",
  },
  {
    title: "Implementation tax = 0",
    body:
      "Anaplan needs trained model builders and 6+ months. NashOS is set up by your finance lead in an afternoon. The same week you sign, you have variance reporting.",
  },
  {
    title: "15 forecast algorithms shipped on day 1",
    body:
      "ARIMA, SARIMA, Random Forest, Gradient Boosting, Holt-Winters, Neural Net, Ridge, Lasso — compared side-by-side with R²/RMSE/MAPE. Anaplan offers a fraction of this.",
  },
  {
    title: "Mid-market price",
    body:
      "Starter at $99/mo. Pro at $499/mo. Enterprise on request. You can run a real plan without an Anaplan-tier budget.",
  },
];

function VsAnaplanPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="NashOS vs Anaplan"
        title="The Anaplan model —"
        highlight="without the 6-month implementation."
        lede="Anaplan is excellent for Fortune 500s with full BPM teams. For everyone else, the implementation tax is the killer. NashOS gives you AI-native planning, drivers, and forecasting at mid-market price — live in your environment in hours."
        primaryCta={{ label: "Try with your data", to: "/try" }}
        secondaryCta={{ label: "Book a walkthrough", to: "/demo" }}
      />

      <Section>
        <SectionHeader title="Side-by-side" />
        <ComparisonTable rivalName="Anaplan" rows={ROWS} />
      </Section>

      <Section>
        <SectionHeader title="What you get with NashOS that you don't with Anaplan" />
        <CardGrid items={CARDS} cols={2} />
      </Section>

      <Section>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="surface-card p-7">
            <p className="text-xs uppercase tracking-[0.2em] text-gold mb-3 font-semibold">
              NashOS is for you if
            </p>
            <p className="text-foreground/90 leading-relaxed">
              You're a $5M–$200M ARR company. You want planning that recomputes itself when
              assumptions change, with an AI agent that answers in plain English. You don't have
              a six-month runway for an Anaplan rollout.
            </p>
          </div>
          <div className="surface-card p-7">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3 font-semibold">
              Anaplan is for you if
            </p>
            <p className="text-foreground/90 leading-relaxed">
              You're a Fortune 500 with a 20+ person FP&amp;A team, a dedicated Anaplan model
              builder, and complex consolidation requirements that justify a 6-month
              implementation.
            </p>
          </div>
        </div>
      </Section>

      <CtaBand
        title="See it on your data in"
        highlight="15 minutes."
        primaryCta={{ label: "Try with your data", to: "/try" }}
        secondaryCta={{ label: "Book a demo", to: "/demo" }}
      />
    </PageShell>
  );
}
