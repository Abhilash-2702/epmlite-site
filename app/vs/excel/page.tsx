import type { Metadata } from "next";
import ComparisonPage, { type CompareRow, type CompareCard } from "@/components/ComparisonPage";

export const metadata: Metadata = {
  title: "NashOS vs Excel",
  description:
    "When the spreadsheet stack stops scaling. AI-native FP&A with full audit trail, 15 forecast algorithms, multi-entity consolidation — for $99/mo.",
};

const rows: CompareRow[] = [
  { label: "Setup time",                epm: "Hours",                                 rival: "0 (already there)",                winner: "rival" },
  { label: "Monthly price",              epm: "$99–$499",                              rival: "$0–$22 (Microsoft 365)",            winner: "rival" },
  { label: "AI agent",                   epm: "35+ tools · plain English read/write",  rival: "Copilot bolt-on (read-only on data)", winner: "epm" },
  { label: "Forecast algorithms",        epm: "15 · one-click compare",                rival: "Manual / add-in",                  winner: "epm" },
  { label: "Audit trail",                epm: "Before/after JSON · per cell",          rival: "OneDrive version history",         winner: "epm" },
  { label: "Multi-entity consolidation", epm: "Automated (9-dim cube)",                rival: "Manual cross-sheet rebuilds",      winner: "epm" },
  { label: "Variance investigation",     epm: "Seconds via chat",                       rival: "Hours of manual drill-down",       winner: "epm" },
  { label: "What-if scenarios",          epm: "Live slider · saves stack",              rival: "Copy sheet, change inputs, hope", winner: "epm" },
  { label: "Multi-user collaboration",   epm: "Concurrent · row-level RBAC",            rival: "Sequential edits, conflict files", winner: "epm" },
  { label: "Best fit",                   epm: "FP&A teams · multi-entity",              rival: "Solo bookkeeper · simple co",      winner: "draw" },
];

const diffCards: CompareCard[] = [
  {
    headline: "Excel doesn't break. Until it does.",
    body: "Three months of growth, one acquisition, or one new entity later — and the workbook starts crashing, the consolidation breaks, and one bad =SUM() ruins the variance pack. We've all lived this. NashOS is what you migrate to when the spreadsheet stops scaling.",
  },
  {
    headline: "Auditability that survives an audit",
    body: "OneDrive version history tells you when something changed. It does not tell you what specifically, who, why, or how it propagated downstream. NashOS captures every mutation with before/after JSON, actor, timestamp — filterable and queryable forever.",
  },
  {
    headline: "Copilot reads. NashOS writes (safely).",
    body: "Excel Copilot can summarize a range. The NashOS agent reads AND writes — \"hire 3 engineers and show the impact\" updates the plan, with a draft confirmation before commit. No silent edits. Full audit trail. Reversible.",
  },
  {
    headline: "Variance investigation in 30 seconds",
    body: "EBITDA off this month? Ask the chat. It pulls the top contributors ranked by financial impact, drills down, and gives you the answer with one click to drill further. The hours-of-VLOOKUPs ritual is over.",
  },
];

export default function VsExcelPage() {
  return (
    <ComparisonPage
      rivalName="Excel"
      kicker="NASHOS VS EXCEL"
      headline="When the spreadsheet stack stops scaling."
      subhead="70% of mid-market finance teams still run on Excel. It works — until headcount, entities, or board cadence breaks it. NashOS is the AI-native upgrade for teams that have outgrown the spreadsheet but can't justify Anaplan."
      rows={rows}
      diffCards={diffCards}
      whoIsItFor={{
        epm: "Your close has slipped past 8 days, your variance pack takes longer than the meeting it serves, and one broken formula has cost you a board cycle. You want auditability, not version history.",
        rival: "You're a solo bookkeeper or a sub-10-person company with one entity, no consolidation, no board pack, and no plans to grow into needing them. Stay in Excel — it's fine.",
      }}
      ctaPrompt="Stop fighting the spreadsheet."
    />
  );
}
