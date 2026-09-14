import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, GitBranch, ShieldCheck, Zap, FileEdit, Activity, Gauge, Layers } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import {
  PageHero,
  Section,
  SectionHeader,
  CardGrid,
  FaqList,
  CtaBand,
} from "@/components/page-sections";
import { Linkified } from "@/components/linkified";
import { StickyCta } from "@/components/sticky-cta";
import { seo } from "@/lib/seo";

const CRUMBS = [{ name: "Finance automation", path: "/finance-automation-software" }];

// Answer-first explainer. Rendered as the first block on the page so the
// definition sits above the card sections, where answer engines look first.
const PROSE = [
  "Finance automation software runs the recurring work of a finance team — close, consolidation, variance analysis, reporting, planning — as software instead of late nights. The useful question is no longer whether to automate but at which layer. RPA bots and spreadsheet macros automate the screen: they replay clicks and cell references, and they break the day a layout changes. Agentic automation works at the data layer: an AI agent calls typed tools against a governed data model, drafts the result, and a human decides what posts.",
  "More of the close is automatable than most teams assume. Connector syncs from REST APIs, SFTP, Excel and CSV sources run on schedule, so trial balance lands without anyone exporting it by hand. Native NetSuite and QuickBooks connectors are on the near-term roadmap. Consolidation runs as computation — intercompany matching, non-controlling interests, dated ownership, period-average FX translation under IAS 21 — with a consolidation bridge and board pack as outputs. Variance movers are ranked by financial impact rather than eyeballed in a pivot. Reports export to CSV, Excel, or PDF from any view. Forecasting compares 15 algorithms on holdout windows using R², RMSE, MAE, and MAPE, and lets you pin the winner.",
  "The agentic difference shows up when something changes. An RPA bot that scripts your ERP's export screen fails the day the export moves; a macro embeds its logic in a workbook nobody dares reopen. A NashOS agent reads and writes through the same computation path as the rest of the system — 43 tools covering the day-to-day work, across Read, Plan, Forecast, and Decide categories — so there is no screen to break. Change a driver and member formulas recompute the downstream lines through OPEX, EBITDA, and net income. Nothing gets re-recorded or re-scripted.",
  "Automation that writes to financial data has to be safe by construction, not by policy. Every agent write in NashOS produces a draft card a human must Post, and the backend re-validates before commit — the model never auto-mutates the database. Tool calls run with the calling user's permissions, enforced at the API layer; the LLM never holds credentials. Every mutation lands in the audit trail with actor, timestamp, and before/after JSON. And the agent streams its work live, so you can interrupt mid-task or hit the kill switch.",
  "All of it runs on one data foundation — the 10-dimension cube described at /system — so automations compound instead of fragmenting into bots that each hold their own copy of the truth. That is how NashOS collapses an 11-day close cycle to 1 day and a 40-hour variance pack to 90 minutes. For the close specifically, see /financial-close-software; for the agent layer, /inside-nash; for the platform design, /agentic-fpa-platform. A pilot takes days, not months — and a walkthrough on your data happens within one business day.",
];

const SECTION_1 = [
  {
    Icon: Sparkles,
    meta: "Scheduled, not remembered",
    title: "Connector syncs",
    body:
      "Syncs from REST APIs and SFTP run on schedule — or start with a CSV/Excel upload. Trial balance lands in the cube without anyone exporting it by hand. Native NetSuite and QuickBooks connectors are on the near-term roadmap.",
  },
  {
    Icon: GitBranch,
    meta: "CSV · Excel · PDF",
    title: "Report exports",
    body:
      "Any view exports to CSV, Excel, or PDF.",
  },
  {
    Icon: ShieldCheck,
    meta: "40 hours → 90 minutes",
    title: "Variance movers",
    body:
      "Top movers ranked by financial impact, not raw percentage. The pack assembles from the cube instead of being rebuilt in slides each period. Auto-drafted paragraph commentary is on the near-term roadmap.",
  },
  {
    Icon: Zap,
    meta: "11 days → 1 day",
    title: "Close tasks",
    body:
      "Continuous reconciliation replaces the month-end sprint, and consolidation — intercompany matching, NCI, period-average FX under IAS 21 — runs as computation. 'Who changed the assumption' becomes an audit-trail query.",
  },
];

const SECTION_2 = [
  {
    Icon: FileEdit,
    meta: "43 typed tools",
    title: "Tools, not screen scripts",
    body:
      "RPA breaks when a layout, export format, or field name changes. NashOS agents call 43 typed tools against the data model, with permissions enforced at the API layer — so there is no screen to break.",
  },
  {
    Icon: Activity,
    meta: "Human-in-the-loop",
    title: "Drafts, not blind commits",
    body:
      "A macro posts whatever it computes. Every agent write here produces a draft card a human must Post, and the backend re-validates on commit. The model never auto-mutates the database.",
  },
  {
    Icon: Gauge,
    meta: "Server-side auth",
    title: "Your permissions, not a bot login",
    body:
      "RPA bots often run under a shared service account. NashOS tool calls run with the calling user's permissions, enforced server-side at the API layer — the LLM never holds credentials.",
  },
  {
    Icon: Layers,
    meta: "Every mutation logged",
    title: "Audit trail and kill switch",
    body:
      "Every change is logged with actor, timestamp, and before/after JSON. The agent streams its steps live over SSE, can be interrupted mid-task, and sits behind a kill switch and audit mode.",
  },
];

const FAQ = [
  {
    question: "What is finance automation software?",
    answer:
      "Finance automation software runs recurring finance work — close, consolidation, variance analysis, reporting, and planning — as software rather than manual effort. Legacy approaches automate the screen with RPA bots and macros; agentic automation works at the data layer, where AI agents call typed tools against a governed data model. NashOS is the agentic kind: 43 tools cover the day-to-day work, and every write is drafted for human review.",
  },
  {
    question: "How is agentic automation different from RPA?",
    answer:
      "RPA records and replays UI interactions, so it breaks when a screen layout, export format, or field name changes — and the logic lives in scripts nobody wants to touch. An agentic system gives an AI model a set of typed, server-side tools: the agent plans the steps, calls the tools, and produces a reviewable draft. In NashOS the agent reads and writes through the same computation path as the rest of the system, with permissions enforced server-side, so there is no screen to break and no shared bot credential.",
  },
  {
    question: "Which finance processes should we automate first?",
    answer:
      "Start with connector syncs and report exports — scheduled, low-risk, immediate payback. Then variance: NashOS ranks top movers by financial impact, collapsing a 40-hour variance pack to 90 minutes. Then the close itself — continuous reconciliation plus a consolidation engine with intercompany matching, NCI, and period-average FX under IAS 21 takes the close cycle from 11 days to 1. Planning automation — driver-based recomputes and forecast comparison across 15 algorithms — compounds from there.",
  },
  {
    question: "Is it safe to automate writes to financial data?",
    answer:
      "Only with the right primitives, and they have to be structural rather than policy. In NashOS every agent write produces a draft a human must Post, and the backend re-validates on commit — the model never auto-mutates the database. Tool calls run with the calling user's permissions, the LLM never holds credentials, and every mutation is audit-logged with actor, timestamp, and before/after JSON. The agent streams its work live, can be interrupted mid-task, and sits behind a kill switch.",
  },
  {
    question: "How long does finance automation software take to implement?",
    answer:
      "A pilot takes days, not months. Upload a P&L or GL through the onboarding wizard and it auto-maps your accounts and lands you in a live workspace; scheduled REST and SFTP connectors come next. Ask at /try and we'll run a walkthrough on your own data within one business day.",
  },
];

export const Route = createFileRoute("/finance-automation-software")({
  head: () =>
    seo({
      title: "Finance Automation Software — Agentic, Not RPA — NashOS",
      description: "Finance automation software built on agents, not screen macros. NashOS drafts close and forecast work for human review. Pilot in days.",
      path: "/finance-automation-software",
      faq: FAQ,
      breadcrumbs: CRUMBS,
    }),
  component: Page,
});

function Page() {
  return (
    <PageShell crumbs={CRUMBS}>
      <PageHero
        tight
        eyebrow={"Finance automation"}
        title={"Finance automation software that won't break"}
        highlight={"when the layout changes."}
        lede={"Most finance automation software scripts the screen — and breaks the day a layout changes. NashOS automates at the data layer instead: AI agents with 43 typed tools draft close tasks and forecasts and rank variance movers by financial impact on one 10-dimension foundation, and a human posts every write."}
        primaryCta={{ label: "Try with your data", to: "/try" }}
        secondaryCta={{ label: "Book a walkthrough", to: "/demo" }}
      />

      <Section>
        <div className="max-w-3xl">
          <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight">
            {"What finance work is actually automatable"}
          </h2>
          <div className="mt-6 space-y-5 text-muted-foreground leading-relaxed">
            {PROSE.map((p) => (
              <p key={p.slice(0, 40)}>
                <Linkified text={p} />
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader
          title={"What to automate first"}
          caption={"Sequence by payback and risk: scheduled syncs and exports first, then variance, then the close itself. Everything below ships today — the one roadmap item is marked."}
        />
        <CardGrid items={SECTION_1} cols={4} />
      </Section>

      <Section>
        <SectionHeader
          title={"Agentic automation vs RPA"}
          caption={"RPA replays what someone clicked. An agent works out what you meant, does it with tools, and shows you a draft before anything posts."}
        />
        <CardGrid items={SECTION_2} cols={4} />
      </Section>

      <Section>
        <SectionHeader title="Common questions" />
        <div className="max-w-3xl">
          <FaqList items={FAQ} />
        </div>
      </Section>

      <CtaBand
        title={"Automate the work."}
        highlight={"Keep the judgment."}
        lede={"Watch the agent draft against your own trial balance — walkthrough on your data within one business day."}
        primaryCta={{ label: "Try with your data", to: "/try" }}
        secondaryCta={{ label: "Book a demo", to: "/demo" }}
      />

      <StickyCta label="Book a demo" to="/demo" />
    </PageShell>
  );
}
