import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import {
  PageHero,
  Section,
  SectionHeader,
  CardGrid,
  ComparisonTable,
  FaqList,
  CtaBand,
  type ComparisonRow,
} from "@/components/page-sections";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/vs/anaplan")({
  head: () =>
    seo({
      title: "NashOS vs Anaplan \u2014 AI Forecasting Software Compared",
      description:
        "Anaplan alternatives compared. AI-native FP&A in hours, not 6-month Anaplan implementations. 35+ tools and 15 forecast algorithms.",
      faq: FAQ,
      path: "/vs/anaplan",
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

const FAQ = [
  {
    question: "Which Anaplan alternatives suit a mid-market finance team?",
    answer:
      "The deciding factor is rarely the feature grid \u2014 it is who has to operate the thing. Anaplan expects trained model builders and a rollout measured in months. Among Anaplan alternatives, look for one a finance lead can stand up without a dedicated modelling team, and one where the planning model is a single cube rather than separate builds for planning, reporting and consolidation.",
  },
  {
    question: "Is NashOS AI forecasting software or a planning tool with a chatbot?",
    answer:
      "AI forecasting software, in the sense that the agent runs the forecast rather than describing it. NashOS ships 15 algorithms \u2014 including regression, ARIMA/SARIMA, Holt-Winters, Ridge, Lasso, Random Forest and Gradient Boosting \u2014 and reports R\u00b2, RMSE, MAE and MAPE on every run. Anaplan's copilot sits on top of a model-builder paradigm; here the chat is how you read and write to the cube.",
  },
  {
    question: "How do we improve forecast accuracy without a data science team?",
    answer:
      "The honest version of how to improve forecast accuracy is to stop choosing an algorithm by intuition. NashOS lets you run two to five algorithms side by side, compare them on R\u00b2, RMSE, MAE and MAPE, and lock the one that fits your history best. Drivers do the rest: mark headcount, units, hours or a percentage as a driver, write the formula once, and dependent lines recompute from the assumption instead of being typed in again.",
  },
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
    title: "AI forecasting software, judged on what it writes",
    body:
      "ARIMA, SARIMA, Random Forest, Gradient Boosting, Holt-Winters, Neural Net, Ridge, Lasso — compared side-by-side with R²/RMSE/MAPE. If the question is how to improve forecast accuracy, comparing candidates on the same history beats picking one by reputation. Anaplan offers a fraction of this.",
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
        <SectionHeader
          title="Anaplan alternatives: what actually changes day to day"
          caption="Feature grids rarely decide these projects. Who operates the model, how fast a change recomputes, and what the agent is allowed to write \u2014 those do."
        />
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

      <Section>
        <SectionHeader eyebrow="FAQ" title="Common questions" />
        <div className="mt-8 max-w-3xl">
          <FaqList items={FAQ} />
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
