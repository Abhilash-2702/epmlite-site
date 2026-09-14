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
  "AI agents for finance are software that carries a task end to end: read the numbers, change the plan, run the forecast, and draft the result for a human to approve. Not a summarizer — an operator. In NashOS the agent works through 43 tools covering the day-to-day work in the app, so nearly anything a person can do by clicking, the agent can do by chaining tool calls — under that person's permissions, with a draft and an audit entry every time.",
  "The tools divide into four categories that mirror how finance work actually flows. Read (12 tools) is the agent's eyes: query fact tables, pull trial balance, summarize reports, list scenarios. Plan (10) changes the model: update drivers, write member formulas, create scenarios, manage entities and dimensions. Forecast (8) runs the 15 algorithms, compares them on R², RMSE, MAE, and MAPE, and locks the winner. Decide (7) is the commit path: draft writes, ratify them, export reports, manage approvals.",
  "Multi-step chains are where agents separate from chat. 'Hire 3 engineers and show the runway impact' runs four tool calls: update HEADCOUNT_ENG, recompute SALARIES_ENG through the member formula, run the runway forecast, render the result. Each step streams live over SSE; the final commit waits for you to ratify it. One sentence in, a reviewable runway answer out — and every intermediate write held as a draft until a human posts it.",
  "An agent with write access has to be boring about safety, so every write surface is gated. Draft-before-commit: agent writes produce a draft card a human must Post, and the backend re-validates before anything lands. Server-side permissions: tool calls run with the calling user's RBAC; the LLM never holds credentials. A full audit trail logs actor, timestamp, and before/after JSON on every mutation. And runs are interruptible mid-task, with a platform kill switch behind that.",
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
      "Shortlist candidate algorithms from the 15 that ship, compare them on R², RMSE, MAE, and MAPE over a holdout window, and pin the winner so the next cycle defaults to it. The agent runs the comparison; you read the holdout column.",
  },
  {
    Icon: Zap,
    title: "The multi-step ask",
    body:
      "\"Hire 3 engineers and show me the runway impact\" is four tool calls: update the driver, recompute salaries, run the runway forecast, render the result. You watch each step stream in and ratify the commit at the end.",
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
      "Scheduled syncs keep the data current and the recurring asks — the monthly movers, the re-forecast, the pack export — stop being a calendar item. Judgment calls stay with the team; the assembly stops being a job.",
  },
  {
    Icon: Layers,
    meta: "Always",
    title: "Keep the brakes in reach",
    body:
      "Runs stream their tool calls live, so you can cancel mid-task the moment something looks off, and a platform-level kill switch sits behind that. Every mutation is in the audit trail with actor, timestamp, and before/after values.",
  },
];

const FAQ = [
  {
    question: "What are AI agents for finance?",
    answer:
      "AI agents for finance are LLM-driven software that completes finance tasks by calling tools — reading data, updating plans, running forecasts, and drafting changes — rather than just answering questions in chat. The distinguishing features are tool use, multi-step chaining, and operating inside a real permission system. In NashOS, the agent works through 43 tools covering the day-to-day work in the app, and every write it drafts requires human approval before it commits.",
  },
  {
    question: "What tasks can AI agents handle in a finance system today?",
    answer:
      "In production today: querying the 10-dimension cube and trial balance, updating drivers and member formulas, creating and comparing scenarios, running 15 forecast algorithms and pinning the best performer, ranking variance movers by financial impact, drafting writes for approval, and exporting reports to CSV, Excel, or PDF. Multi-step chains work too — 'Hire 3 engineers and show the runway impact' runs four tool calls end to end. Auto-written paragraph variance commentary is on the near-term roadmap.",
  },
  {
    question: "What stops an agent from corrupting the numbers?",
    answer:
      "Three layers. Draft-before-commit means every agent write produces a draft card a human must Post, and the backend re-validates the draft before committing. Server-side authentication means every tool call runs with the calling user's permissions — the LLM never holds credentials — and a full audit trail records actor, timestamp, and before/after JSON on every mutation, so any change can be traced and reviewed.",
  },
  {
    question: "How are agents different from copilots and chatbots?",
    answer:
      "A chatbot answers questions about your data; a copilot suggests edits for you to make; an agent does the work itself — it chains tool calls, writes drafts, and carries a task to a reviewable result. The practical test is whether the AI can safely change the plan, not just describe it. NashOS was built agent-first, with the permission system, draft queue, and audit trail designed for an agent to operate within — the full architecture argument is on our agentic FP&A platform page.",
  },
  {
    question: "Do humans stay in control?",
    answer:
      "Yes — by design, at every step. No agent write reaches the database without a human clicking Post on the draft, every tool call is limited to the calling user's own permissions, and every run streams live so you can interrupt it mid-task. There is also a platform-level kill switch that turns agents off entirely.",
  },
  {
    question: "Which models power the agents?",
    answer:
      "Claude Sonnet 4.6 by default, with Gemini 2.5-flash supported as a fallback; both are swappable via environment variable. The model choice matters less than the system around it — the tool layer, draft queue, and permission checks are what make an agent safe to run against financial data.",
  },
];

export const Route = createFileRoute("/ai-agents-for-finance")({
  head: () =>
    seo({
      title: "AI Agents for Finance — 43 Tools, Safe by Design — NashOS",
      description: "AI agents for finance that operate the system: 43 tools across Read, Plan, Forecast, and Decide — every write drafted, audited, and human-approved.",
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
        title={"AI agents for finance,"}
        highlight={"day to day."}
        lede={"AI agents for finance earn their keep by operating the system, not chatting about it. In NashOS the agent works through 43 tools — reading the cube, updating drivers, running forecasts, drafting writes — chained into multi-step tasks you watch stream live. Every change is drafted first, permission-checked server-side, and logged to the audit trail."}
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
          caption={"Write access without guardrails is a liability. Every agent write surface in NashOS is gated by the same primitives, whether the request came from chat or a chained task."}
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
