import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles, GitBranch, ShieldCheck, Zap, FileEdit, Activity } from "lucide-react";
import { DEMO_MAILTO } from "@/lib/constants";
import { FaqSchema, BreadcrumbSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Agentic Finance — AI Agents for Financial Planning",
  description:
    "NashOS is the agentic FP&A platform built around AI agents — not retrofitted with a chatbot. 35+ tools, 15 forecast algorithms, draft-before-commit safety, full audit trail. The agentic alternative to Anaplan, Adaptive, and Excel.",
  keywords: [
    "agentic FP&A platform",
    "agentic FP&A",
    "AI agent FP&A",
    "agentic AI finance",
    "AI financial planning platform",
    "AI FP&A software",
    "autonomous FP&A",
    "AI agent for CFO",
  ],
  alternates: { canonical: "/agentic-fpa-platform" },
};

const FAQ_ITEMS = [
  {
    question: "What is an agentic FP&A platform?",
    answer:
      "An agentic FP&A platform uses AI agents — software that can chain multiple tool calls, read and write financial data with permissions, and complete multi-step finance tasks autonomously — rather than just chatbot UIs bolted onto a legacy planning tool. NashOS was built around agents from day one: the agent has 35+ tools covering ~99% of manual app actions, every write produces a draft for human review, and every action is audit-trailed.",
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
      "Both Gemini 2.5-flash (default) and Claude Haiku 4.5 are supported, swappable via environment variable. Prompt caching keeps API costs around $0.40/user/month at typical usage. The LLM is configurable per workspace.",
  },
  {
    question: "What can the agent actually do?",
    answer:
      "Read fact tables, draft entries, run 15 forecast algorithms, commit writes through the draft queue, export reports as CSV/Excel/PDF, manage scenarios and what-ifs, query the audit log, manage drivers and formulas, and answer plain-English questions about the cube. 35+ tools cover ~99% of manual app actions. New tools ship continuously.",
  },
  {
    question: "Can the agent handle multi-step tasks?",
    answer:
      "Yes. Example: 'Hire 3 engineers and show the runway impact' chains four tool calls — update HEADCOUNT_ENG, recompute SALARIES_ENG via member formula, run runway forecast, render the waterfall card. The user sees each step stream in real time and ratifies the final commit.",
  },
];

const TOOL_CATEGORIES = [
  {
    Icon: Activity,
    title: "Read",
    body: "Query fact tables, fetch trial balance, summarize a report, pull audit-log entries, list scenarios.",
    tools: 12,
  },
  {
    Icon: GitBranch,
    title: "Plan",
    body: "Update drivers, write member formulas, create scenarios, manage entities and dimensions, schedule connectors.",
    tools: 10,
  },
  {
    Icon: Sparkles,
    title: "Forecast",
    body: "Run 15 forecast algorithms, compare with R²/RMSE/MAE/MAPE, lock the winner, run what-if scenarios.",
    tools: 8,
  },
  {
    Icon: FileEdit,
    title: "Decide",
    body: "Draft commits, ratify writes, export PDFs, push notifications, manage approvals, query the audit log.",
    tools: 7,
  },
];

const SAFETY = [
  { Icon: FileEdit, title: "Draft-before-commit", body: "Every write produces a card. User clicks Post. Backend re-validates. Then commit happens." },
  { Icon: ShieldCheck, title: "Server-side auth on tools", body: "Tool calls run with the user's permissions. LLM never gets credentials. RBAC enforced at the API layer." },
  { Icon: Activity, title: "Full audit trail", body: "Every mutation logged: actor, timestamp, before/after JSON. Filterable. Forever." },
  { Icon: Zap, title: "Streaming + interruptible", body: "Watch the agent run tools live via SSE. Cancel mid-task if it goes wrong." },
];

export default function AgenticFpaPlatformPage() {
  return (
    <>
      <BreadcrumbSchema
        trail={[
          { name: "Home", url: "/" },
          { name: "Agentic Finance", url: "/agentic-fpa-platform" },
        ]}
      />
      <FaqSchema items={FAQ_ITEMS} />

      <section className="bg-white pt-10 pb-8 lg:pt-14 lg:pb-10 border-b border-surface-200">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">
            Agentic Finance
          </p>
          <h1 className="font-display font-bold text-4xl lg:text-6xl text-slate-900 tracking-tight text-balance leading-[1.05]">
            Built for AI agents.
            <br />
            <span className="text-brand-600">Not retrofitted with a chatbot.</span>
          </h1>
          <p className="mt-5 text-lg text-slate-600 leading-relaxed max-w-3xl">
            NashOS is the FP&amp;A platform designed around tool-using AI agents from day one.
            35+ agent tools cover ~99% of manual app actions. Every write is drafted, every action
            audit-trailed. The agentic alternative to Anaplan, Adaptive, and Excel.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold px-6 py-3.5 shadow-card"
            >
              Try the live demo
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={DEMO_MAILTO}
              className="inline-flex items-center gap-2 rounded-xl bg-white hover:bg-surface-50 text-slate-900 font-semibold px-6 py-3.5 border border-surface-200"
            >
              Book a 15-min walkthrough
            </a>
          </div>
        </div>
      </section>

      <section className="bg-surface-50 py-10 lg:py-14">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-slate-900 tracking-tight text-balance max-w-3xl">
            What an agentic platform actually means
          </h2>
          <p className="mt-3 text-lg text-slate-600 max-w-3xl">
            Most &quot;AI in FP&amp;A&quot; today is a chatbot bolted onto a 2015 planning tool. NashOS
            inverted the design: the agent is the primary interface, traditional grids are the
            fallback. 35+ tools across four categories.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TOOL_CATEGORIES.map((c) => (
              <div
                key={c.title}
                className="rounded-2xl bg-white border border-surface-200 p-6"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-brand-50 text-brand-600 mb-4">
                  <c.Icon className="w-5 h-5" />
                </span>
                <h3 className="font-display font-semibold text-slate-900">{c.title}</h3>
                <p className="text-xs font-mono text-slate-500 mt-1">{c.tools} tools</p>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-10 lg:py-14 border-t border-surface-200">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <h2 className="font-display font-bold text-3xl text-slate-900 tracking-tight">
            Safety primitives
          </h2>
          <p className="mt-3 text-lg text-slate-600 max-w-3xl">
            An agent that can write to your financials needs to be safe by default. NashOS&apos;s
            entire write surface is gated behind these four primitives.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SAFETY.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl bg-surface-50 border border-surface-200 p-6"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white text-brand-600 mb-4">
                  <s.Icon className="w-5 h-5" />
                </span>
                <h3 className="font-display font-semibold text-slate-900 text-base leading-snug">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-50 py-10 lg:py-14 border-t border-surface-200">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h2 className="font-display font-bold text-3xl text-slate-900 mb-6">
            Common questions
          </h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((it) => (
              <details
                key={it.question}
                className="group rounded-2xl bg-white border border-surface-200 p-5"
              >
                <summary className="cursor-pointer font-display font-semibold text-slate-900 list-none flex items-center justify-between gap-4">
                  {it.question}
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{it.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="gradient-cta py-12 text-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-3xl lg:text-4xl tracking-tight">
            Watch the agent run live.
          </h2>
          <p className="mt-3 text-white/80">
            Open the demo, ask the agent a question, watch it chain six tool calls in real time.
          </p>
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
              Book a 15-min demo
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
