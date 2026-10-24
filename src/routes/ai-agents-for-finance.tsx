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

const CRUMBS = [{ name: "AI agents", path: "/ai-agents-for-finance" }];

// Answer-first explainer. Rendered as the first block on the page so the
// definition sits above the card sections, where answer engines look first.
const PROSE = [
  "AI agents for finance are software that carries a task end to end: read the numbers, change the plan, run the forecast, and draft the result for a human to approve. Not a summarizer — an operator. In NashOS the agent works through 45 tools covering the day-to-day work in the app — reading reports, moving drivers, running forecasts, drafting changes — chained into multi-step tasks under that person's permissions, with a draft for every change and a record of every figure saved.",
  "The tools divide into four categories that mirror how finance work actually flows. Read is the agent's eyes: query fact tables, pull a P&L or balance sheet, summarize reports, list scenarios. Plan changes the model: update drivers, write member formulas, create scenarios, manage entities and dimensions. Forecast runs the 15 algorithms, compares them on R², RMSE, MAE, and MAPE, and saves the winner's forecast into a forecast scenario. Decide is the commit path: draft writes, ratify them, export reports, manage approvals.",
  "Multi-step chains are where agents separate from chat. 'Hire 3 engineers and show the runway impact' runs as tool calls that stream live over SSE: Nash finds the headcount driver, then runs a what-if on it that recomputes salaries through the member formula and returns the statement and the runway before and after. One sentence in, a reviewable runway answer out, and saving it as a scenario is a draft card a human posts.",
  "An agent with write access has to be boring about safety, so every write Nash proposes from chat is gated. Draft-before-commit: each one is a draft card a human must Post, and the backend re-validates before anything lands. Server-side permissions: tool calls run with the calling user's RBAC; the LLM never holds a session token or a stored connector secret. The audit trail logs actor and timestamp on every edit committed from a draft card, most with before/after JSON, and grid saves and bulk loads per save. And runs stream live, step by step, with a per-agent kill switch and an audit mode above that. Data loads have their own controls. Close runs, which planners and administrators start to load a connector's data or an uploaded file, and connector runs are written by the load pipeline and governed by its load controls: a close-run load that moves a figure beyond the hold policy waits for an administrator to approve it, and setting up, scheduling or running a connector directly needs administrator rights.",
  "This page covers what the agents do day to day. The architectural case — why agent-first beats a chatbot bolted onto a legacy planning tool — is made at /agentic-fpa-platform, and /inside-nash goes under the hood on how Nash itself is built. For how agents fit into the close itself, see /financial-close-software. Pricing is quoted to your entity count and volume — /pricing is the single source there.",
];

const SECTION_1 = [
  {
    Icon: Sparkles,
    title: "The question that used to be a pivot table",
    body:
      "\"What moved in OPEX last month, and why?\" The agent queries the cube, drills into the sub-accounts, and ranks the movers by financial impact rather than by raw percentage. No export, no pivot, no waiting for someone to rebuild the tab.",
  },
  {
    Icon: GitBranch,
    title: "The change that used to be a model rebuild",
    body:
      "Move HEADCOUNT_ENG from 12 to 15 and the member formula recomputes salaries, which roll through OPEX, EBITDA, and net income. What was three days of re-pointing formulas is one edit the agent can make and hand back as a draft.",
  },
  {
    Icon: ShieldCheck,
    title: "The forecast that used to be one fitted line",
    body:
      "Shortlist candidate algorithms from the 15 that ship, compare them on R², RMSE, MAE, and MAPE over a holdout window, and save the winner's forecast into a forecast scenario. The agent runs the comparison; you read the holdout column.",
  },
  {
    Icon: Zap,
    title: "The multi-step ask",
    body:
      "\"Hire 3 engineers and show me the runway impact\" runs as a short chain: Nash finds the headcount driver and runs a what-if on it, which recomputes salaries and returns the statement and runway before and after. You watch each step stream in, and saving it as a scenario is a card you confirm.",
  },
];

const SECTION_2 = [
  {
    Icon: FileEdit,
    meta: "Week 1",
    title: "Start read-only",
    body:
      "Point the agent at the cube and ask it questions. Nothing it does in this mode can change a number, so the only thing being tested is whether the answers match what you already know. Most teams find their own data problems here first.",
  },
  {
    Icon: Activity,
    meta: "Week 2–3",
    title: "Let it draft, you post",
    body:
      "Turn on the write path and every change arrives as a draft card a human posts. Review each one. The point of this phase is calibration — you learn which asks the agent handles cleanly and which ones you would rather specify yourself.",
  },
  {
    Icon: Gauge,
    meta: "Ongoing",
    title: "Make the recurring work routine",
    body:
      "Scheduled syncs keep the data current, and a schedule set to run the full close also reconciles the books, ranks the variance movers against budget or prior year and rebuilds the statements each time new data lands. Judgment calls stay with the team; the assembly stops being a job.",
  },
  {
    Icon: Layers,
    meta: "Always",
    title: "Keep the brakes in reach",
    body:
      "Runs stream their tool calls live, step by step, so you see each one as it happens, and an administrator kill switch on every agent removes it from all future runs. Every edit committed from a draft card is in the audit trail with actor and timestamp, most with before/after values.",
  },
];

const FAQ = [
  {
    question: "What are AI agents for finance?",
    answer:
      "AI agents for finance are LLM-driven software that completes finance tasks by calling tools — reading data, updating plans, running forecasts, and drafting changes — rather than just answering questions in chat. The distinguishing features are tool use, multi-step chaining, and operating inside a real permission system. In NashOS, the agent works through 45 tools covering the day-to-day work in the app, and every write it drafts requires human approval before it commits.",
  },
  {
    question: "What tasks can AI agents handle in a finance system today?",
    answer:
      "In production today: querying the 10-dimension cube and trial balance, updating drivers and member formulas, creating and comparing scenarios, running 15 forecast algorithms and saving the best performer's forecast into a scenario, ranking variance movers by financial impact, drafting writes for approval, and exporting reports to CSV, Excel, or PDF. Multi-step chains work too — 'Hire 3 engineers and show the runway impact' runs end to end: Nash finds the headcount driver and runs a what-if that returns the statement and runway before and after. Auto-written paragraph variance commentary is on the near-term roadmap.",
  },
  {
    question: "What stops an agent from corrupting the numbers?",
    answer:
      "Three layers. Draft-before-commit means every write Nash proposes in chat produces a draft card a human must Post, and the backend re-validates the draft before committing. Server-side authentication means every tool call runs with the calling user's permissions — the LLM never holds a session token or a stored connector secret — and the audit trail records actor and timestamp on every edit committed from a draft card, most with before/after JSON, so the agent's changes can be traced and reviewed.",
  },
  {
    question: "How are agents different from copilots and chatbots?",
    answer:
      "A chatbot answers questions about your data; a copilot suggests edits for you to make; an agent does the work itself — it chains tool calls, writes drafts, and carries a task to a reviewable result. The practical test is whether the AI can safely change the plan, not just describe it. NashOS was built agent-first, with the permission system, draft cards, and audit trail designed for an agent to operate within — the full architecture argument is on our agentic FP&A platform page.",
  },
  {
    question: "Do humans stay in control?",
    answer:
      "Yes — by design, at every step. No write Nash proposes in chat reaches the database without a human clicking Post on the draft, every tool call is limited to the calling user's own permissions, and every run streams live, step by step. There is also an administrator kill switch on every agent that removes it from all future runs. Data loads are written by the load pipeline and governed by its load controls: a close-run load that moves figures beyond the hold policy waits for an administrator to approve it, and running a connector directly needs administrator rights.",
  },
  {
    question: "Which models power the agents?",
    answer:
      "Nash runs on Anthropic's Claude models (see /security/subprocessors). Moving to another model provider would be a sub-processor change and would appear on that page. The model choice matters less than the system around it — the tool layer, draft cards, and permission checks are what make an agent safe to run against financial data.",
  },
];

export const Route = createFileRoute("/ai-agents-for-finance")({
  head: () =>
    seo({
      title: "AI Agents for Finance | Automate Finance Tasks – NashOS",
      description: "AI agents for finance automate planning, forecasting, reporting and finance tasks with 45 tools, human approvals, permissions and audit-ready workflows.",
      path: "/ai-agents-for-finance",
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
        eyebrow={"Agents at work"}
        title="AI agents for finance"
        subtitle="Day to day — what they do, and why they're safe to run."
        lede={"AI agents for finance earn their keep by operating the system, not chatting about it. In NashOS the agent works through 45 tools — reading the cube, updating drivers, running forecasts, drafting writes — chained into multi-step tasks you watch stream live. Every change is drafted first and permission-checked server-side, and every figure saved is recorded with who saved it and when."}
        primaryCta={{ label: "Try with your data", to: "/try" }}
        secondaryCta={{ label: "Book a walkthrough", to: "/demo" }}
      />

      <Section>
        <div className="max-w-3xl">
          <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight">
            {"The workday of a finance agent"}
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
          title={"Four things that stop being manual"}
          caption={"Every tool maps to something a finance person does by hand today — together they cover the day-to-day work in the app. The agent picks the tools; you approve the writes."}
        />
        <CardGrid items={SECTION_1} cols={4} />
      </Section>

      <Section>
        <SectionHeader
          title={"How teams actually roll it out"}
          caption={"Write access without guardrails is a liability. Every write Nash proposes is gated by the same primitives, whether the request is a single question or a chained task."}
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
        title={"Put an agent on"}
        highlight={"your numbers."}
        lede={"Try it with your data — upload a P&L and you'll have a walkthrough on your own numbers within one business day. Or book a live demo and watch the agent chain tool calls in real time."}
        primaryCta={{ label: "Try with your data", to: "/try" }}
        secondaryCta={{ label: "Book a demo", to: "/demo" }}
      />

      <StickyCta label="Book a demo" to="/demo" />
    </PageShell>
  );
}
