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

export const Route = createFileRoute("/vs/excel")({
  head: () => ({
    meta: [
      { title: "NashOS vs Excel" },
      {
        name: "description",
        content:
          "When the spreadsheet stack stops scaling. AI-native FP&A with full audit trail, 15 forecast algorithms, multi-entity consolidation — for $99/mo.",
      },
    ],
  }),
  component: VsExcelPage,
});

const ROWS: ComparisonRow[] = [
  { label: "Setup time", nashos: "Hours", rival: "0 (already there)", winner: "rival" },
  { label: "Monthly price", nashos: "$99–$499", rival: "$0–$22 (M365)", winner: "rival" },
  { label: "AI agent", nashos: "35+ tools · plain-English read/write", rival: "Copilot bolt-on (read-only on data)", winner: "nashos" },
  { label: "Forecast algorithms", nashos: "15 · one-click compare", rival: "Manual / add-in", winner: "nashos" },
  { label: "Audit trail", nashos: "Before/after JSON · per cell", rival: "OneDrive version history", winner: "nashos" },
  { label: "Multi-entity consolidation", nashos: "Automated (9-dim cube)", rival: "Manual cross-sheet rebuilds", winner: "nashos" },
  { label: "Variance investigation", nashos: "Seconds via chat", rival: "Hours of manual drill-down", winner: "nashos" },
  { label: "What-if scenarios", nashos: "Live slider · saves stack", rival: "Copy sheet, change inputs, hope", winner: "nashos" },
  { label: "Multi-user collaboration", nashos: "Concurrent · row-level RBAC", rival: "Sequential edits, conflict files", winner: "nashos" },
  { label: "Best fit", nashos: "FP&A teams · multi-entity", rival: "Solo bookkeeper · simple co", winner: "draw" },
];

const CARDS = [
  {
    title: "Excel doesn't break. Until it does.",
    body:
      "Three months of growth, one acquisition, or one new entity later — and the workbook starts crashing, the consolidation breaks, and one bad =SUM() ruins the variance pack. We've all lived this. NashOS is what you migrate to when the spreadsheet stops scaling.",
  },
  {
    title: "Auditability that survives an audit",
    body:
      "OneDrive version history tells you when something changed. It does not tell you what specifically, who, why, or how it propagated downstream. NashOS captures every mutation with before/after JSON, actor, timestamp — filterable and queryable forever.",
  },
  {
    title: "Copilot reads. NashOS writes (safely).",
    body:
      'Excel Copilot can summarize a range. The NashOS agent reads AND writes — "hire 3 engineers and show the impact" updates the plan, with a draft confirmation before commit. No silent edits. Full audit trail. Reversible.',
  },
  {
    title: "Variance investigation in 30 seconds",
    body:
      "EBITDA off this month? Ask the chat. It pulls the top contributors ranked by financial impact, drills down, and gives you the answer with one click to drill further. The hours-of-VLOOKUPs ritual is over.",
  },
];

function VsExcelPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="NashOS vs Excel"
        title="When the spreadsheet stack"
        highlight="stops scaling."
        lede="70% of mid-market finance teams still run on Excel. It works — until headcount, entities, or board cadence breaks it. NashOS is the AI-native upgrade for teams that have outgrown the spreadsheet but can't justify Anaplan."
        primaryCta={{ label: "Try with your data", to: "/try" }}
        secondaryCta={{ label: "Book a walkthrough", to: "/demo" }}
      />

      <Section>
        <SectionHeader title="Side-by-side" />
        <ComparisonTable rivalName="Excel" rows={ROWS} />
      </Section>

      <Section>
        <SectionHeader title="What changes when you leave Excel" />
        <CardGrid items={CARDS} cols={2} />
      </Section>

      <Section>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="surface-card p-7">
            <p className="text-xs uppercase tracking-[0.2em] text-gold mb-3 font-semibold">
              NashOS is for you if
            </p>
            <p className="text-foreground/90 leading-relaxed">
              Your close has slipped past 8 days, your variance pack takes longer than the
              meeting it serves, and one broken formula has cost you a board cycle. You want
              auditability, not version history.
            </p>
          </div>
          <div className="surface-card p-7">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3 font-semibold">
              Stay in Excel if
            </p>
            <p className="text-foreground/90 leading-relaxed">
              You're a solo bookkeeper or a sub-10-person company with one entity, no
              consolidation, no board pack, and no plans to grow into needing them. Excel is
              fine.
            </p>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Stop fighting the"
        highlight="spreadsheet."
        primaryCta={{ label: "Try with your data", to: "/try" }}
        secondaryCta={{ label: "Book a demo", to: "/demo" }}
      />
    </PageShell>
  );
}
