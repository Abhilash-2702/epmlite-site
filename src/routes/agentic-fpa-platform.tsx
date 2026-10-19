import { createFileRoute, Link } from "@tanstack/react-router";
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

// Visible trail + BreadcrumbList schema. Same array to both so they can't drift.
const CRUMBS = [{ name: "Agentic FP&A platform", path: "/agentic-fpa-platform" }];

export const Route = createFileRoute("/agentic-fpa-platform")({
  head: () =>
    seo({
      title: "AI for FP&A | Agentic FP&A Platform | Agentic AI for Finance - NashOS",
      description:
        "Discover AI for FP&A with NashOS. Automate planning, forecasting, scenarios and finance decisions with AI agents built for modern FP&A teams.",
      breadcrumbs: CRUMBS,
      path: "/agentic-fpa-platform",
    }),
  component: AgenticFpaPlatformPage,
});

const TOOL_CATEGORIES = [
  {
    Icon: Activity,
    title: "Read",
    body:
      "Query fact tables, pull a P&L, balance sheet or cash flow, summarize a report, pull audit-log entries, list scenarios.",
  },
  {
    Icon: GitBranch,
    title: "Plan",
    body:
      "Update drivers, write member formulas, create scenarios, manage entities and dimensions, set up and run connectors.",
  },
  {
    Icon: Sparkles,
    title: "Forecast",
    body:
      "Run 15 forecast algorithms, compare with R²/RMSE/MAE/MAPE, save the winner's forecast to a scenario, run what-if scenarios.",
  },
  {
    Icon: FileEdit,
    title: "Decide",
    body:
      "Draft commits, ratify writes, export PDFs, run alert checks, manage approvals, query the audit log.",
  },
];

const SAFETY = [
  {
    Icon: FileEdit,
    title: "Draft-before-commit",
    body:
      "Every write the agent proposes produces a card. User clicks Post. Backend re-validates. Then commit happens.",
  },
  {
    Icon: ShieldCheck,
    title: "Server-side auth on tools",
    body:
      "Tool calls run with the user's permissions. The LLM never gets a session token or a stored connector secret. RBAC enforced at the API layer.",
  },
  {
    Icon: Activity,
    title: "Audit trail",
    body:
      "Draft-card edits logged with actor and timestamp, most with before/after JSON, filterable in the audit log; grid saves, forecast saves and bulk loads logged per save.",
  },
  {
    Icon: Zap,
    title: "Streaming, step by step",
    body: "Watch the agent run its tools live via SSE, one step at a time, before any draft is posted.",
  },
];

const FAQ = [
  {
    question: "What is an agentic FP&A platform?",
    answer:
      "An agentic FP&A platform is built around AI agents for finance — software that can chain multiple tool calls, read and write financial data under the calling user's permissions, and carry a multi-step finance task through to a reviewable result — rather than a chatbot UI bolted onto a legacy planning tool. NashOS was built around agents from day one: 45 tools cover the day-to-day work, every write the agent proposes produces a draft for human review, and every figure saved is recorded with who saved it and when.",
  },
  {
    question: "How is this different from a chatbot in Anaplan or Adaptive?",
    answer:
      "The AI for FP&A in those tools arrived as a chatbot bolt-on after the fact — it answers questions, but the planning model underneath was never built for tool-using agents. NashOS reversed the design: every primitive (cube schema, RBAC, draft cards, audit trail) is designed for an agent to operate within safely. The agent can plan, forecast, draft writes and run scenarios — not just summarize what's already there — and a person commits each change.",
  },
  {
    question: "Is the agent safe? What stops it from messing up my financial data?",
    answer:
      "Three safeguards. (1) Draft-before-commit: every chat-driven write produces a draft card the user must Post. The LLM never auto-mutates the database. (2) Server-side authentication: every tool call runs with the calling user's permissions; the LLM never gets a session token or a stored connector secret. (3) Audit trail: every edit committed from a draft card is logged with actor and timestamp, most with before/after JSON; grid saves, forecast saves and bulk loads are logged per save, with who, when and how many rows.",
  },
  {
    question: "Which LLMs does NashOS use?",
    answer:
      "Nash runs on Anthropic's Claude models (see /security/subprocessors). Moving to another model provider would be a sub-processor change and would appear on that page.",
  },
  {
    question: "What can agentic AI in finance actually do inside a planning model?",
    answer:
      "Read fact tables, draft entries, run 15 forecast algorithms, commit writes through draft cards, export reports as CSV/Excel/PDF, manage scenarios and what-ifs, query the audit log, manage drivers and formulas, and answer plain-English questions about the cube. 45 tools cover the day-to-day work.",
  },
  {
    question: "Can the agent handle multi-step tasks?",
    answer:
      "Yes. Example: 'Hire 3 engineers and show the runway impact' — Nash finds the headcount driver, then runs a what-if on it that recomputes the salary line through its member formula and returns the statement before and after with the runway in months and days. The user sees each step stream in real time, and saving the result as a scenario is a what-if card the user confirms.",
  },
  {
    question: "What should a finance team look for in AI for FP&A?",
    answer:
      "Four things. Whether the AI can act — chain tool calls and produce a reviewable result — or only describe. Whether every write the AI makes is drafted for a person to approve, or committed automatically. Whose permissions it runs on: the calling user's, or a service account with broad access. And whether each change is logged — who made it and when. NashOS answers act, drafted, the user's, and logged: every figure saved is recorded with who saved it and when, and most edits committed from a Nash draft card also keep their value before and after.",
  },
];

function AgenticFpaPlatformPage() {
  return (
    <PageShell crumbs={CRUMBS}>
      <PageHero
        tight
        eyebrow="Agentic finance"
        title={"AI for FP&A"}
        subtitle="Built for AI agents. Not retrofitted with a chatbot."
        lede={
          <>
            AI for FP&amp;A, done as a platform rather than a plug-in: NashOS was designed around
            agents from day one. 45 agent tools cover the day-to-day work. Every write the agent
            proposes is drafted, and every figure saved is recorded with who saved it and when. The
            agentic alternative to Anaplan, Adaptive, and Excel.
          </>
        }
        primaryCta={{ label: "Try with your data", to: "/try" }}
        secondaryCta={{ label: "Book a walkthrough", to: "/demo" }}
      />

      <Section className="pt-4">
        <SectionHeader
          title="What AI for FP&A means in practice"
          caption="Two very different products share the label. One describes the numbers you already have. The other operates the system and hands you the result to approve."
        />
        <div className="max-w-3xl space-y-5 text-foreground/85 leading-relaxed">
          <p>
            AI for FP&amp;A splits into two products. The first is a chatbot attached to a
            planning tool: it can describe what is already in the model. The second is an{" "}
            <Link to="/ai-agents-for-finance" className="text-gold hover:underline">
              agent that operates the system
            </Link>{" "}
            — reads the cube, updates a driver, runs a forecast, drafts the change — and hands a
            person the result to approve. NashOS is the second kind, and the difference shows up
            in what happens after the answer.
          </p>
          <p>
            In practice the agent works through 45 typed tools in four groups: Read, Plan,
            Forecast and Decide. It can query fact tables and pull a P&amp;L or balance sheet, update
            drivers and write member formulas, fit{" "}
            <Link to="/ai-forecasting-software" className="text-gold hover:underline">
              15 forecast algorithms
            </Link>{" "}
            and compare them on R², RMSE, MAE and MAPE, then draft the commit and export the
            report. A request like "hire three engineers and show the runway impact" chains a driver
            lookup and a what-if preview in one pass — the member formula recomputes salaries and
            the result shows months of cash before and after — and the user watches each step stream
            in before posting any save.
          </p>
          <p>
            What makes that safe on live financials is the write path. No tool writes to the
            database directly: every write-capable tool produces a draft, the user posts it, and the
            backend re-validates before anything commits. Tool calls run on the server with the
            calling user's permissions, so the model never holds a session token or a stored
            connector secret, and each edit committed from a draft is logged with actor and
            timestamp, most with before-and-after values. That is the bar we think AI for FP&amp;A
            has to clear — not "the model was usually right", but "you can prove what happened".
          </p>
        </div>
      </Section>

      <Section>
        <SectionHeader
          title="How the agent layer is built"
          caption="Most AI for FP&A today is a chatbot bolted onto a planning tool built long before tool-using models existed. NashOS inverted the design: the agent is the primary interface, traditional grids are the fallback. 45 tools across four categories."
        />
        <CardGrid items={TOOL_CATEGORIES} cols={4} />
      </Section>

      <Section>
        <SectionHeader
          title="What makes agentic AI in finance safe to run"
          caption="An agent that can write to your financials needs to be safe by default. Every write the agent proposes is gated behind these four primitives."
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
