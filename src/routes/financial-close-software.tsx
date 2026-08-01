import { createFileRoute } from "@tanstack/react-router";
import { Clock, Sparkles, ShieldCheck, FileSpreadsheet } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import {
  PageHero,
  Section,
  SectionHeader,
  StatGrid,
  CardGrid,
  FaqList,
  CtaBand,
} from "@/components/page-sections";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/financial-close-software")({
  head: () =>
    seo({
      title: "Financial Close Software — Close in 4 Days, Not 12 — NashOS",
      description:
        "Faster financial close software. NashOS collapses an 11-day month-end close to 4 days using an agentic AI layer, 15 forecast algorithms, and a 9-dim cube.",
      path: "/financial-close-software",
    }),
  component: FinancialCloseSoftwarePage,
});

const STAT = [
  { num: "4 days", label: "Close cycle (vs 12 industry average)" },
  { num: "90 min", label: "Variance pack (vs 40 hours)" },
  { num: "35+", label: "AI agent tools covering 99% of manual actions" },
  { num: "15", label: "Forecast algorithms compared side-by-side" },
];

const PILLARS = [
  {
    Icon: Clock,
    title: "Continuous reconciliation, not month-end sprint",
    body:
      "Connectors run on schedule, not on a deadline. Trial balance lands in the cube on day 1 of close, not day 5. Reconciliation lives in queryable tables, not a Slack thread.",
  },
  {
    Icon: Sparkles,
    title: "Agent drafts variance commentary",
    body:
      "Top movers ranked by financial impact, not raw %. Paragraph-style commentary auto-drafted from the cube. CFO edits, doesn't write from scratch. The 40-hour board pack collapses to 90 minutes.",
  },
  {
    Icon: ShieldCheck,
    title: "Audit trail replaces version control",
    body:
      "Every change has a who, when, before-after JSON, and reason. There's no 'wait, who changed the COGS assumption?' — it's a query. Pre-IPO ready on day one.",
  },
  {
    Icon: FileSpreadsheet,
    title: "P&L · Balance Sheet · Cash Flow with full hierarchy",
    body:
      "Drill from rollups to leaves. Multi-currency, multi-entity. CSV / Excel / PDF export from any view. Variance vs budget on every line.",
  },
];

const COMPARISON = [
  { tool: "NashOS", close: "4 days", live: "Hours, not months", price: "$99 / mo", highlight: true },
  { tool: "Excel + BI stack", close: "11–14 days", live: "Already running", price: "$0 + soul" },
  { tool: "Anaplan", close: "5–7 days", live: "6–9 months", price: "$150k+ / yr" },
  { tool: "Workday Adaptive", close: "5–8 days", live: "3–6 months", price: "$50k+ / yr" },
  { tool: "Oracle EPM", close: "7–9 days", live: "9–12 months", price: "$200k+ / yr" },
  { tool: "Vena", close: "6–9 days", live: "3–5 months", price: "$25k+ / yr" },
];

const FAQ = [
  {
    question: "What is financial close software?",
    answer:
      "Financial close software automates the month-end and quarter-end close — pulling trial balance from your ERP, reconciling across entities, generating P&L / Balance Sheet / Cash Flow, and assembling the variance pack for the board. NashOS adds an agentic AI layer that drafts variance commentary, runs forecasts, and answers plain-English questions about the cube — cutting an 11-day close to 4.",
  },
  {
    question: "How can I close my books faster?",
    answer:
      "The 11-day close has three bottlenecks: (1) waiting for trial balance and reconciliation, (2) building the variance pack from scratch every period, (3) hand-writing commentary on the top movers. NashOS collapses each: continuous connectors land trial balance on day one, the agent ranks top movers by financial impact and drafts the commentary, and the audit trail replaces the 'who changed what' Slack thread. Result: 4-day close cycle, 90-minute variance pack.",
  },
  {
    question: "Is NashOS an alternative to Anaplan, Adaptive, or Oracle EPM?",
    answer:
      "Yes — NashOS is built for finance teams that want the planning + close + reporting capability of Anaplan or Workday Adaptive Planning without the $150k+ ACV and 6-month rollout. Implementation is days, not months. Pricing starts at $99/mo. Side-by-side comparisons available at /vs/anaplan, /vs/adaptive, and /vs/excel.",
  },
  {
    question: "Does it integrate with NetSuite or QuickBooks?",
    answer:
      "Today: REST APIs, SFTP, Excel, and CSV connectors are production-ready. Native NetSuite and QuickBooks connectors are on the near-term roadmap. Until those ship, NetSuite and QuickBooks customers connect via REST or scheduled CSV exports.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Hours, not months. Connect your trial balance (REST, SFTP, Excel, or CSV — or just paste it in), and the 9-dimension cube absorbs it. Most teams have a working Executive Summary the same day. A full driver-based plan with custom formulas is typically a 2-week onboarding with our team.",
  },
  {
    question: "Is the AI agent safe? Can it auto-write to my financial data?",
    answer:
      "No auto-writes. Every chat-driven mutation produces a draft that the user must Post to commit. The backend re-validates the draft on commit. Audit trail captures actor, timestamp, and full before/after JSON for every change. The LLM never writes to the database directly — every tool call is server-side authenticated.",
  },
];

function FinancialCloseSoftwarePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Close & consolidation"
        title="Close software, reimagined as a continuous system."
        lede={
          <>
            Multi-entity, multi-currency consolidation with audit trail by construction — not a
            monthly fire drill. NashOS collapses an 11-day month-end close to 4 days.
          </>
        }
        primaryCta={{ label: "Try with your data", to: "/try" }}
        secondaryCta={{ label: "See ROI", to: "/calculator" }}
      />

      <Section>
        <StatGrid items={STAT} cols={4} />
      </Section>

      <Section>
        <SectionHeader
          title="Where the speed comes from"
          caption="Most close-cycle pain isn't the journal entries. It's the 7 days of human reconciliation either side. NashOS collapses each layer."
        />
        <CardGrid items={PILLARS} cols={2} />
      </Section>

      <Section>
        <SectionHeader title="Versus the alternatives" />
        <div className="surface-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-[0.14em] text-muted-foreground">
                <th className="text-left font-semibold px-5 py-4">Tool</th>
                <th className="text-left font-semibold px-5 py-4">Typical close</th>
                <th className="text-left font-semibold px-5 py-4">Time-to-live</th>
                <th className="text-left font-semibold px-5 py-4">Starting price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {COMPARISON.map((row) => (
                <tr
                  key={row.tool}
                  className={row.highlight ? "bg-gold/5" : undefined}
                >
                  <td className="px-5 py-4 font-semibold">{row.tool}</td>
                  <td
                    className={`px-5 py-4 ${row.highlight ? "text-gold font-semibold" : "text-foreground/85"}`}
                  >
                    {row.close}
                  </td>
                  <td
                    className={`px-5 py-4 ${row.highlight ? "text-gold font-semibold" : "text-foreground/85"}`}
                  >
                    {row.live}
                  </td>
                  <td className="px-5 py-4 text-foreground/85">{row.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground italic">
          Approximate ranges from public reviews + sales data. Your mileage will vary.
        </p>
      </Section>

      <Section>
        <SectionHeader title="Common questions" />
        <div className="max-w-3xl">
          <FaqList items={FAQ} />
        </div>
      </Section>

      <CtaBand
        title="See it on your"
        highlight="real numbers."
        lede="15-minute walkthrough on your trial balance. No slides, no sales script."
        primaryCta={{ label: "Try with your data", to: "/try" }}
        secondaryCta={{ label: "Book a demo", to: "/demo" }}
      />
    </PageShell>
  );
}
