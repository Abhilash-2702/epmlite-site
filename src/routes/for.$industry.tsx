import { createFileRoute, useParams } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { PageHero, Section, CtaBand } from "@/components/page-sections";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/for/$industry")({
  // Was one shared title across every industry. Each variant is a distinct
  // keyword page, so it needs its own title, description and canonical.
  head: ({ params }) => {
    const ind = INDUSTRIES[params.industry];
    if (!ind) {
      return seo({
        title: "Built for your team — NashOS",
        description: "NashOS adapts to how your industry plans, forecasts and closes.",
        path: `/for/${params.industry}`,
        noindex: true,
      });
    }
    // hookLine alone is ~40 chars — too thin for a meta description, so pad it
    // with the opening of the subhead and trim on a word boundary.
    const desc = `${ind.hookLine} ${ind.subhead}`
      .slice(0, 157)
      .replace(/\s+\S*$/, "")
      .replace(/[\s,—–-]+$/, "");
    return seo({
      title: `FP&A Software for ${ind.name} Teams | NashOS`,
      description: desc,
      path: `/for/${params.industry}`,
      type: "article",
      breadcrumbs: [
        { name: "Products", path: "/products" },
        { name: ind.name, path: `/for/${params.industry}` },
      ],
    });
  },
  component: ForIndustry,
});

type Industry = {
  name: string;
  hookLine: string;
  headline: string;
  subhead: string;
  metrics: string[];
  fitPoints: string[];
  scenario: string;
};

const INDUSTRIES: Record<string, Industry> = {
  saas: {
    name: "SaaS",
    hookLine: "FP&A for SaaS founders running on ARR.",
    headline: "Plan ARR cohorts, churn, and runway in the same view.",
    subhead:
      "Most SaaS finance stacks split between an FP&A tool, a BI tool, and a Stripe export. NashOS collapses them — driver-based ARR projections, cohort retention curves, and a runway calculator that updates when you toggle hiring.",
    metrics: [
      "MRR / ARR (committed, ramped, ending)",
      "Net + gross dollar retention by cohort",
      "Magic Number, CAC payback, LTV / CAC",
      "Burn multiple, runway under stress",
      "Rule of 40, ARR per FTE",
    ],
    fitPoints: [
      "Drivers: NEW_LOGOS, ACV, CHURN_RATE, EXPANSION_RATE — recompute the plan when any of these moves.",
      "AI agent: ask it to model 'extend runway by 6 months without slowing growth' — it stress-tests headcount + S&M + churn assumptions.",
      "Connectors pull from Stripe / HubSpot / Salesforce so the cube has live ARR, not last quarter's CSV.",
      "Audit-grade trail satisfies pre-IPO due diligence on day one.",
    ],
    scenario:
      "$15M ARR, 60% growth, 11-day close. Move to a 1-day close, run weekly re-forecasts, and surface board-ready variance commentary in 90 minutes per cycle.",
  },
  services: {
    name: "Services",
    hookLine: "FP&A for services firms with mixed revenue streams.",
    headline: "Recurring + project + bill-on-completion, in one plan.",
    subhead:
      "If your revenue is half MSA, half project, and a long tail of one-offs — your spreadsheet is held together with named ranges and a prayer. NashOS handles the heterogeneity in one cube with proper revenue-recognition logic.",
    metrics: [
      "Revenue mix: recurring vs project vs ad-hoc",
      "Backlog and bookings",
      "Project profitability (waterfall by phase)",
      "Capacity utilization (people + equipment)",
      "Cash conversion cycle",
    ],
    fitPoints: [
      "Multi-revenue-stream chart of accounts handled at the cube level — no parallel spreadsheets.",
      "Backlog visibility tied to forward revenue: convert a signed MSA into a future-period revenue projection automatically.",
      "What-if scenarios stack: capacity change × pricing change × backlog conversion all in one view.",
      "Audit-grade for SOC 2 customers — we already have the trail you need.",
    ],
    scenario:
      "Marketing-services firm, 50% retainer / 40% project / 10% one-off. Close in 1 day, weekly cash-conversion forecast, and project-margin investigation in seconds.",
  },
  consulting: {
    name: "Consulting",
    hookLine: "FP&A for consulting firms running on utilization.",
    headline: "Project margin × utilization × bench, in one cube.",
    subhead:
      "Consulting finance is two problems: forecasting utilization (which is people math) and forecasting project margin (which is ratio math). Most stacks give you one or the other. NashOS gives you both, with the agent computing realization and recovery on every project on demand.",
    metrics: [
      "Utilization % (target vs actual, by practice and by consultant)",
      "Realization rate (billable / standard) and recovery rate",
      "Project margin: gross by client, by practice, by partner",
      "Bench cost as % of revenue",
      "Pipeline coverage and book-to-bill",
    ],
    fitPoints: [
      "Drivers: BILLABLE_HOURS, BILL_RATE, CONSULTANT_COUNT, BENCH_DAYS — change the slider, see margin react.",
      "What-if: 'hire 4 senior consultants in Q3' shows utilization, gross margin, and cash impact across the year.",
      "Agent answers project-margin questions by name: 'why is the Acme engagement under-margin?' and pulls the breakdown.",
      "Multi-entity ready: collaborative billing across regions handled in the cube, not a workbook.",
    ],
    scenario:
      "60-person consultancy, 4 practices, mixed T&M and fixed-fee. Cut variance investigation from 2 days to 30 minutes; weekly re-forecast on utilization that ties to gross margin live.",
  },
  manufacturing: {
    name: "Manufacturing",
    hookLine: "FP&A for manufacturing tracking margin to the unit.",
    headline: "Unit economics, BOM, COGS — drilled all the way down.",
    subhead:
      "Manufacturing finance lives at the intersection of unit economics, supply chain, and capacity planning. NashOS holds all three in one cube: BOM × supplier prices × yield × volume, with what-if at every layer.",
    metrics: [
      "Gross margin per unit, per SKU, per channel",
      "BOM cost trends and supplier concentration",
      "Inventory turns, days of inventory on hand",
      "Manufacturing yield and scrap rates",
      "Working capital, days payable outstanding",
    ],
    fitPoints: [
      "Drivers per SKU: BOM_COST, SUPPLIER_PRICE_INDEX, YIELD_PCT, VOLUME — the plan is built on real unit economics.",
      "What-if a 5% supplier price hike across the top 3 components — see the gross margin impact in seconds.",
      "9-dim cube tracks Entity × Product × Period — perfect fit for SKU-level reporting.",
      "Connector to your ERP / MES pulls actual cost, yield, and volume; the cube handles the rest.",
    ],
    scenario:
      "Mid-stage manufacturer, 14 SKUs, 3 contract manufacturers. Per-SKU gross margin auto-computed; supplier-price-shock scenarios run weekly during sourcing season.",
  },
  hardware: {
    name: "Hardware",
    hookLine: "FP&A for hardware companies tracking margin to the unit.",
    headline: "Unit economics, BOM, COGS — drilled all the way down.",
    subhead:
      "Hardware finance lives at the intersection of unit economics, supply chain, and capacity planning. NashOS holds all three in one cube: BOM × supplier prices × yield × volume, with what-if at every layer.",
    metrics: [
      "Gross margin per unit, per SKU, per channel",
      "BOM cost trends and supplier concentration",
      "Inventory turns, days of inventory on hand",
      "Manufacturing yield and scrap rates",
      "Working capital, days payable outstanding",
    ],
    fitPoints: [
      "Drivers per SKU: BOM_COST, SUPPLIER_PRICE_INDEX, YIELD_PCT, VOLUME — the plan is built on real unit economics.",
      "What-if a 5% supplier price hike across the top 3 components — see the gross margin impact in seconds.",
      "9-dim cube tracks Entity × Product × Period — perfect fit for SKU-level reporting.",
      "Connector to your ERP / MES pulls actual cost, yield, and volume; the cube handles the rest.",
    ],
    scenario:
      "Mid-stage hardware company, 14 SKUs, 3 contract manufacturers. Per-SKU gross margin auto-computed; supplier-price-shock scenarios run weekly during sourcing season.",
  },
};

function ForIndustry() {
  const { industry } = useParams({ from: "/for/$industry" });
  const known = INDUSTRIES[industry.toLowerCase()];
  const pretty = industry
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");

  if (!known) {
    return (
      <PageShell>
        <PageHero
          eyebrow={`NashOS for ${pretty}`}
          title={`We haven't built a vertical page for ${pretty}`}
          highlight="yet."
          lede={
            <>
              The 9-dim cube is industry-agnostic — it'll model {pretty.toLowerCase()} fine. Drop
              us a note at{" "}
              <a href="mailto:admin@nashos.ai" className="text-gold hover:underline">
                admin@nashos.ai
              </a>{" "}
              and we'll send the relevant case study by hand.
            </>
          }
          primaryCta={{ label: "Talk to us", to: "/try" }}
        />
      </PageShell>
    );
  }

  return (
    // Same trail the head() passes to seo({ breadcrumbs }) — Google requires the
    // markup to reflect something the page actually shows.
    <PageShell
      crumbs={[
        { name: "Products", path: "/products" },
        { name: known.name, path: `/for/${industry}` },
      ]}
    >
      <PageHero
        tight
        eyebrow={`NashOS for ${known.name}`}
        title={known.headline}
        lede={known.subhead}
        primaryCta={{ label: "Try with your data", to: "/try" }}
        secondaryCta={{ label: "Book a walkthrough", to: "/demo" }}
      />

      <Section>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="surface-card p-7">
            <h2 className="font-semibold text-xl">Metrics you'll actually track</h2>
            <ul className="mt-5 space-y-3">
              {known.metrics.map((m) => (
                <li key={m} className="flex items-start gap-2 text-sm text-foreground/85">
                  <Check className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                  {m}
                </li>
              ))}
            </ul>
          </div>
          <div className="surface-card p-7">
            <h2 className="font-semibold text-xl">Why NashOS fits</h2>
            <ul className="mt-5 space-y-3">
              {known.fitPoints.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-foreground/85">
                  <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <div className="surface-card p-8 lg:p-10">
          <p className="text-xs uppercase tracking-[0.2em] text-gold mb-2 font-semibold">
            Example scenario
          </p>
          <p className="text-xl lg:text-2xl font-semibold leading-snug">
            {known.scenario}
          </p>
          <p className="mt-3 text-xs text-muted-foreground italic">
            Composite based on the {known.name.toLowerCase()} buyers we've talked to. Not a
            quoted customer.
          </p>
        </div>
      </Section>

      <CtaBand
        title={`Want to see it on your`}
        highlight={`${known.name.toLowerCase()} numbers?`}
        primaryCta={{ label: "Try with your data", to: "/try" }}
        secondaryCta={{ label: "Book a walkthrough", to: "/demo" }}
      />
    </PageShell>
  );
}
