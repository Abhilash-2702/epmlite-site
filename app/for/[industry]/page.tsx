import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { DEMO_MAILTO } from "@/lib/constants";

type Industry = {
  slug: string;
  name: string;
  hookLine: string;
  headline: string;
  subhead: string;
  metricsToTrack: string[];
  fitPoints: string[];
  exampleScenario: string;
};

const INDUSTRIES: Industry[] = [
  {
    slug: "saas",
    name: "SaaS",
    hookLine: "FP&A for SaaS founders running on ARR.",
    headline: "Plan ARR cohorts, churn, and runway in the same view.",
    subhead:
      "Most SaaS finance stacks split between an FP&A tool, a BI tool, and a Stripe export. NashOS collapses them — driver-based ARR projections, cohort retention curves, and a runway calculator that updates when you toggle hiring.",
    metricsToTrack: [
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
    exampleScenario:
      "$15M ARR, 60% growth, 11-day close. Move to a 4-day close, run weekly re-forecasts, and surface board-ready variance commentary in 90 minutes per cycle.",
  },
  {
    slug: "consulting",
    name: "Consulting",
    hookLine: "FP&A for consulting firms running on utilization.",
    headline: "Project margin × utilization × bench, in one cube.",
    subhead:
      "Consulting finance is two problems: forecasting utilization (which is people math) and forecasting project margin (which is ratio math). Most stacks give you one or the other. NashOS gives you both, with the agent computing realization and recovery on every project on demand.",
    metricsToTrack: [
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
    exampleScenario:
      "60-person consultancy, 4 practices, mixed T&M and fixed-fee. Cut variance investigation from 2 days to 30 minutes; weekly re-forecast on utilization that ties to gross margin live.",
  },
  {
    slug: "hardware",
    name: "Hardware",
    hookLine: "FP&A for hardware companies tracking margin to the unit.",
    headline: "Unit economics, BOM, COGS — drilled all the way down.",
    subhead:
      "Hardware finance lives at the intersection of unit economics, supply chain, and capacity planning. NashOS holds all three in one cube: BOM × supplier prices × yield × volume, with what-if at every layer.",
    metricsToTrack: [
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
    exampleScenario:
      "Mid-stage hardware company, 14 SKUs, 3 contract manufacturers. Per-SKU gross margin auto-computed; supplier-price-shock scenarios run weekly during sourcing season.",
  },
  {
    slug: "services",
    name: "Services",
    hookLine: "FP&A for services firms with mixed revenue streams.",
    headline: "Recurring + project + bill-on-completion, in one plan.",
    subhead:
      "If your revenue is half MSA, half project, and a long tail of one-offs — your spreadsheet is held together with named ranges and a prayer. NashOS handles the heterogeneity in one cube with proper revenue-recognition logic.",
    metricsToTrack: [
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
    exampleScenario:
      "Marketing-services firm, 50% retainer / 40% project / 10% one-off. Close in 4 days, weekly cash-conversion forecast, and project-margin investigation in seconds.",
  },
];

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ industry: i.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { industry: string };
}): Metadata {
  const i = INDUSTRIES.find((x) => x.slug === params.industry);
  if (!i) return { title: "Not found" };
  return {
    title: `NashOS for ${i.name}`,
    description: i.hookLine,
  };
}

export default function IndustryPage({
  params,
}: {
  params: { industry: string };
}) {
  const i = INDUSTRIES.find((x) => x.slug === params.industry);
  if (!i) return notFound();

  return (
    <>
      <section className="bg-white pt-10 pb-8 lg:pt-14 lg:pb-10 border-b border-surface-200">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">
            NashOS for {i.name}
          </p>
          <h1 className="font-display font-bold text-4xl lg:text-5xl text-slate-900 tracking-tight text-balance leading-[1.05]">
            {i.headline}
          </h1>
          <p className="mt-5 text-lg text-slate-600 leading-relaxed max-w-3xl">{i.subhead}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold px-5 py-3 shadow-card"
            >
              Try the live demo
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={DEMO_MAILTO}
              className="inline-flex items-center gap-2 rounded-xl bg-white hover:bg-surface-50 text-slate-900 font-semibold px-5 py-3 border border-surface-200"
            >
              Book a 15-min walkthrough
            </a>
          </div>
        </div>
      </section>

      <section className="bg-surface-50 py-10 lg:py-14">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-white border border-surface-200 p-6 lg:p-7 shadow-card">
            <h2 className="font-display font-semibold text-slate-900 text-xl">
              Metrics you&apos;ll actually track
            </h2>
            <ul className="mt-4 space-y-3">
              {i.metricsToTrack.map((m) => (
                <li key={m} className="flex items-start gap-2 text-sm text-slate-700">
                  <Check className="w-4 h-4 text-accent-emerald shrink-0 mt-0.5" />
                  {m}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-white border border-surface-200 p-6 lg:p-7 shadow-card">
            <h2 className="font-display font-semibold text-slate-900 text-xl">
              Why NashOS fits
            </h2>
            <ul className="mt-4 space-y-3">
              {i.fitPoints.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                  <Check className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white py-10 lg:py-14 border-t border-surface-200">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-br from-brand-700 to-brand-900 text-white p-7 lg:p-8 shadow-elevated">
            <p className="text-xs font-semibold text-brand-200 uppercase tracking-wider mb-2">
              Example scenario
            </p>
            <p className="font-display font-semibold text-xl lg:text-2xl leading-snug">
              {i.exampleScenario}
            </p>
            <p className="mt-3 text-xs text-white/60 italic">
              Composite scenario based on the {i.name.toLowerCase()} buyers we&apos;ve talked
              to. Not a quoted customer.
            </p>
          </div>
        </div>
      </section>

      <section className="gradient-cta py-12 text-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-3xl lg:text-4xl tracking-tight">
            Want to see it on your {i.name.toLowerCase()} numbers?
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 rounded-xl bg-white hover:bg-brand-50 text-brand-700 font-semibold px-6 py-3.5"
            >
              Try the live demo
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={DEMO_MAILTO}
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-6 py-3.5"
            >
              Book a 15-min walkthrough
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
