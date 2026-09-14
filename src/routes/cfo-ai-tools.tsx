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

const CRUMBS = [{ name: "CFO AI tools", path: "/cfo-ai-tools" }];

// Answer-first explainer. Rendered as the first block on the page so the
// definition sits above the card sections, where answer engines look first.
const PROSE = [
  "The right way to evaluate CFO AI tools is not by what they generate — it's by what they can prove. A wrong paragraph in a marketing draft costs an edit; a wrong number in a board deck costs credibility. So the evaluation lens for AI in finance is different from everywhere else in the company: audit trail, human approval on writes, a real permission model, and the ability to reconstruct exactly what happened.",
  "NashOS passes that inspection by construction. Every agent write produces a draft card a human must Post, and the backend re-validates before commit — the model never auto-mutates the database. Tool calls run with the calling user's permissions; the LLM never holds credentials, and RBAC is enforced at the API layer. Every mutation is logged with actor, timestamp, and before/after JSON. Above all of that sit a kill switch and an audit mode, and every agent run streams live and can be interrupted mid-task.",
  "What that buys the CFO personally is speed without asterisks. The close collapses from 11 days to 1 because trial balance lands on a schedule and reconciliation runs continuously instead of as a month-end sprint — the close story in full is at /financial-close-software. The variance pack drops from 40 hours to 90 minutes, with movers ranked by financial impact rather than raw percentages. The board pack and consolidation bridge come out of the same multi-entity, multi-currency system that ran the close — one set of numbers, no slide rebuild.",
  "The same holds mid-meeting. Ask the agent 'Hire 3 engineers and show the runway impact' and it chains the headcount update, recomputes salaries through the member formula, runs the runway forecast, and renders the result — you ratify the final commit. Underneath is a 9-dimension cube and 15 forecast algorithms compared on R², RMSE, MAE, and MAPE, so you can pin the winner instead of arguing about methods.",
  "Start where the payback is measurable. Put your close length and variance-pack hours into the ROI calculator at /calculator, read the leadership case at /for-leaders, and go deeper on the agent architecture at /inside-nash. Pricing is quoted to your entity count and volume — details at /pricing. A pilot takes days, not months, and a walkthrough on your own data happens within one business day.",
];

const SECTION_1 = [
  {
    Icon: Sparkles,
    meta: "Actor · timestamp · before/after",
    title: "Is there a full audit trail?",
    body:
      "Every NashOS mutation is logged with actor, timestamp, and before/after JSON. 'Who changed the COGS assumption?' is a query, not an investigation.",
  },
  {
    Icon: GitBranch,
    meta: "Draft-before-commit",
    title: "Does a human approve every write?",
    body:
      "Every agent write produces a draft card a human must Post. The backend re-validates on commit. The model never auto-mutates the database.",
  },
  {
    Icon: ShieldCheck,
    meta: "Server-side auth",
    title: "Whose permissions does the AI run on?",
    body:
      "Tool calls run with the calling user's permissions, enforced at the API layer by RBAC. The LLM never holds credentials.",
  },
  {
    Icon: Zap,
    meta: "Kill switch + audit mode",
    title: "Can you stop it — and prove what happened?",
    body:
      "Agent runs stream live and can be interrupted mid-task. A kill switch and audit mode sit above that, and the audit trail reconstructs every change after the fact.",
  },
];

const SECTION_2 = [
  {
    Icon: FileEdit,
    meta: "Consolidation built in",
    title: "Board-ready numbers from one system",
    body:
      "Multi-entity, multi-currency consolidation with intercompany matching, NCI, and period-average FX translation (IAS 21). The consolidation bridge and board pack come from the same cube that ran the close.",
  },
  {
    Icon: Activity,
    meta: "11 days → 1",
    title: "Close in 1 day, not 11",
    body:
      "Connectors for REST APIs and SFTP sync on schedule, so trial balance is already in the cube when close starts. Reconciliation runs continuously, not as a sprint.",
  },
  {
    Icon: Gauge,
    meta: "Ask mid-meeting",
    title: "Runway and burn on demand",
    body:
      "'Hire 3 engineers and show the runway impact' chains a headcount update, a salary recompute, and the runway forecast — and you ratify the commit. Answers come from the live cube, not last week's export.",
  },
  {
    Icon: Layers,
    meta: "40 hours → 90 min",
    title: "Variance movers ranked by impact",
    body:
      "Top movers ranked by financial impact, not raw percentages, assembled from the cube instead of rebuilt in slides each period. Auto-drafted paragraph commentary is on the near-term roadmap.",
  },
];

const FAQ = [
  {
    question: "What AI tools should a CFO look at?",
    answer:
      "Look past categories and evaluate controls: whether writes require human approval, whether the tool runs under your permission model, and whether an audit trail can prove every change. Bolt-on chatbots summarize what already happened; agentic platforms like NashOS operate the planning, forecasting, and close system itself under those controls. Whatever you shortlist, ask the vendor to show the audit trail before the demo dashboard.",
  },
  {
    question: "How do you trust CFO AI tools with financial data?",
    answer:
      "Trust comes from controls you can inspect, not vendor assurances. In NashOS, every agent write produces a draft a human must Post and the backend re-validates on commit; tool calls run with the calling user's permissions, so the LLM never holds credentials; and every mutation is logged with actor, timestamp, and before/after JSON. If a tool can't show you that trail, it can't prove its own numbers.",
  },
  {
    question: "Will AI replace finance teams?",
    answer:
      "No. AI removes the assembly work — the 40-hour variance pack drops to 90 minutes, the 11-day close to 1 — but judgment, approvals, and accountability stay human. NashOS enforces that by design: the agent drafts, a person posts, and the audit trail records who decided what. The realistic outcome is a smaller share of the month spent building reports and a larger share spent deciding.",
  },
  {
    question: "Where should a CFO start with AI?",
    answer:
      "Start with a bottleneck you can measure — close length and variance-pack hours are the usual two. Put your current numbers into the ROI calculator at /calculator to size the payback, then run a pilot on your own data: days, not months. The leadership-level case is at /for-leaders.",
  },
  {
    question: "What does implementation look like?",
    answer:
      "A walkthrough on your own data happens within one business day, and a pilot runs in days, not months. The onboarding wizard uploads a P&L or GL, auto-maps accounts, and lands you in a live workspace; REST and SFTP connectors then sync on schedule. Pricing is quoted to your entity count and volume — see /pricing.",
  },
];

export const Route = createFileRoute("/cfo-ai-tools")({
  head: () =>
    seo({
      title: "CFO AI Tools — What to Trust, What to Verify | NashOS",
      description: "CFO AI tools evaluated on what matters: audit trail, human approval on writes, permissions, provable numbers. How NashOS cuts an 11-day close to 1 day.",
      path: "/cfo-ai-tools",
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
        eyebrow={"The CFO's lens"}
        title={"CFO AI tools that can"}
        highlight={"prove every number."}
        lede={"CFO AI tools should be judged on what they can prove, not what they can generate. The four questions that matter: is there an audit trail, does a human approve every write, whose permissions does the AI run on, and can you reconstruct what happened. NashOS was built to answer yes to all four — and to close the books in 1 day instead of 11."}
        primaryCta={{ label: "Try with your data", to: "/try" }}
        secondaryCta={{ label: "Book a walkthrough", to: "/demo" }}
      />

      <Section>
        <div className="max-w-3xl">
          <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight">
            {"How a CFO should evaluate AI in the finance stack"}
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
          title={"The CFO's AI evaluation checklist"}
          caption={"Four questions to put to any AI vendor before the tool touches your ledger. If any answer is vague, it isn't ready for finance."}
        />
        <CardGrid items={SECTION_1} cols={4} />
      </Section>

      <Section>
        <SectionHeader
          title={"What AI changes for the CFO"}
          caption={"Not a chatbot that summarizes reports — a system that moves the numbers you're accountable for."}
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
        title={"See your numbers"}
        highlight={"prove themselves."}
        lede={"A 15-minute walkthrough on your own trial balance within one business day — watch a draft, an approval, and an audit-trail entry happen live."}
        primaryCta={{ label: "Try with your data", to: "/try" }}
        secondaryCta={{ label: "Book a demo", to: "/demo" }}
      />

      <StickyCta label="Book a demo" to="/demo" />
    </PageShell>
  );
}
