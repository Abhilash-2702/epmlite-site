import { createFileRoute } from "@tanstack/react-router";
import {
  Sparkles,
  GitBranch,
  ShieldCheck,
  Zap,
  FileEdit,
  Activity,
} from "lucide-react";
import { PageShell } from "@/components/page-shell";
import {
  PageHero,
  Section,
  SectionHeader,
  CardGrid,
  FaqList,
  CtaBand,
} from "@/components/page-sections";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/agentic-fpa-platform")({
  head: () =>
    seo({
      title: "Agentic FP&A Platform — NashOS",
      description:
        "NashOS is the agentic FP&A platform built around AI agents — not retrofitted with a chatbot. 35+ tools, 15 forecast algorithms, draft-before-commit safety, full audit trail.",
      path: "/agentic-fpa-platform",
    }),
  component: AgenticFpaPlatformPage,
});

const TOOL_CATEGORIES = [
  {
    Icon: Activity,
    title: "Read",
    meta: "12 tools",
    body:
      "Query fact tables, fetch trial balance, summarize a report, pull audit-log entries, list scenarios.",
  },
  {
    Icon: GitBranch,
    title: "Plan",
    meta: "10 tools",
    body:
      "Update drivers, write member formulas, create scenarios, manage entities and dimensions, schedule connectors.",
  },
  {
    Icon: Sparkles,
    title: "Forecast",
    meta: "8 tools",
    body:
      "Run 15 forecast algorithms, compare with R²/RMSE/MAE/MAPE, lock the winner, run what-if scenarios.",
  },
  {
    Icon: FileEdit,
    title: "Decide",
    meta: "7 tools",
    body:
      "Draft commits, ratify writes, export PDFs, push notifications, manage approvals, query the audit log.",
  },
];

const SAFETY = [
  {
    Icon: FileEdit,
    title: "Draft-before-commit",
    body:
      "Every write produces a card. User clicks Post. Backend re-validates. Then commit happens.",
  },
  {
    Icon: ShieldCheck,
    title: "Server-side auth on tools",
    body:
      "Tool calls run with the user's permissions. LLM never gets credentials. RBAC enforced at the API layer.",
  },
  {
    Icon: Activity,
    title: "Full audit trail",
    body:
      "Every mutation logged: actor, timestamp, before/after JSON. Filterable. Forever.",
  },
  {
    Icon: Zap,
    title: "Streaming + interruptible",
    body: "Watch the agent run tools live via SSE. Cancel mid-task if it goes wrong.",
  },
];

const FAQ = [
  {
    question: "What is an agentic FP&A platform?",
    answer:
      "An agentic FP&A platform uses AI agents — software that can chain multiple tool calls, read and write financial data with permissions, and complete multi-step finance tasks autonomously — rather than just chatbot UIs bolted onto a legacy planning tool. NashOS was built around agents from day one: 35+ tools cover ~99% of manual app actions, every write produces a draft for human review, and every action is audit-trailed.",
  },
  {
    question: "How is this different from a chatbot in Anaplan or Adaptive?",
    answer:
      "Legacy planning tools added a chatbot bolt-on after the fact — the chatbot can answer questions but the planning model wasn't built for tool-using agents. NashOS reversed the design: every primitive (cube schema, RBAC, draft queue, audit trail) is designed for an agent to operate within safely. The agent can plan, forecast, draft writes, run scenarios, and commit changes — not just summarize what's already there.",
  },
  {
    question: "Is the agent safe? What stops it from messing up my financial data?",
    answer:
      "Three safeguards. (1) Draft-before-commit: every chat-driven write produces a draft card the user must Post. The LLM never auto-mutates the database. (2) Server-side authentication: every tool call runs with the calling user's permissions; the LLM never gets credentials. (3) Audit trail: every mutation logged with actor, timestamp, and before/after JSON. You can prove what happened.",
  },
  {
    question: "Which LLMs does NashOS use?",
    answer:
      "Claude Sonnet 4.6 by default; Gemini 2.5-flash supported as a fallback. Both are swappable via environment variable. Prompt caching keeps API costs low at typical usage.",
  },
  {
    question: "What can the agent actually do?",
    answer:
      "Read fact tables, draft entries, run 15 forecast algorithms, commit writes through the draft queue, export reports as CSV/Excel/PDF, manage scenarios and what-ifs, query the audit log, manage drivers and formulas, and answer plain-English questions about the cube. 35+ tools cover ~99% of manual app actions.",
  },
  {
    question: "Can the agent handle multi-step tasks?",
    answer:
      "Yes. Example: 'Hire 3 engineers and show the runway impact' chains four tool calls — update HEADCOUNT_ENG, recompute SALARIES_ENG via member formula, run runway forecast, render the waterfall card. The user sees each step stream in real time and ratifies the final commit.",
  },
];

function AgenticFpaPlatformPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Agentic finance"
        title={<>Built for AI agents.</>}
        highlight="Not retrofitted with a chatbot."
        lede={
          <>
            NashOS is the FP&amp;A platform designed around tool-using AI agents from day one.
            35+ agent tools cover ~99% of manual app actions. Every write is drafted, every
            action audit-trailed. The agentic alternative to Anaplan, Adaptive, and Excel.
          </>
        }
        primaryCta={{ label: "Try with your data", to: "/try" }}
        secondaryCta={{ label: "Book a walkthrough", to: "/demo" }}
      />

      <Section>
        <SectionHeader
          title="What an agentic platform actually means"
          caption='Most "AI in FP&A" today is a chatbot bolted onto a 2015 planning tool. NashOS inverted the design: the agent is the primary interface, traditional grids are the fallback. 35+ tools across four categories.'
        />
        <CardGrid items={TOOL_CATEGORIES} cols={4} />
      </Section>

      <Section>
        <SectionHeader
          title="Safety primitives"
          caption="An agent that can write to your financials needs to be safe by default. Every write surface is gated behind these four primitives."
        />
        <CardGrid items={SAFETY} cols={4} />
      </Section>

      <Section>
        <SectionHeader title="Common questions" />
        <div className="max-w-3xl">
          <FaqList items={FAQ} />
        </div>
      </Section>

      <CtaBand
        title="Watch the agent run"
        highlight="live."
        lede="Open the demo, ask the agent a question, watch it chain six tool calls in real time."
        primaryCta={{ label: "Try with your data", to: "/try" }}
        secondaryCta={{ label: "Book a demo", to: "/demo" }}
      />
    </PageShell>
  );
}
