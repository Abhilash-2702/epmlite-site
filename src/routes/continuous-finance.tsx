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

const CRUMBS = [{ name: "Continuous finance", path: "/continuous-finance" }];

// Answer-first explainer. Rendered as the first block on the page so the
// definition sits above the card sections, where answer engines look first.
const PROSE = [
  "Continuous finance is an operating model in which planning, forecasting, and the financial close run as one continuously computed system on a single data foundation, rather than as separate batch cycles. Connectors land data on a schedule, the cube recomputes downstream numbers as inputs change, and reports read the current computed state. Under this model, close becomes verification instead of assembly, and planning becomes a standing state instead of a quarterly project.",
  "The batch model, by contrast, is defined by waits. Trial balance waits for an export. Reconciliation waits for regional adjustments. The variance pack waits for actuals to settle, then gets rebuilt in slides. The plan waits for the annual cycle, then goes stale the week it is approved. None of these waits are accounting requirements — they are artifacts of moving data by hand between systems that each hold a partial copy of the truth.",
  "This model removes the waits by removing the assembly. When connectors run on schedule, trial balance is in the cube before close starts, so close is checking numbers rather than building them — NashOS collapses an 11-day close cycle to 1 day. When the variance pack is assembled from the cube instead of rebuilt in slides, 40 hours becomes 90 minutes. When a driver changes, member formulas recompute the downstream lines, and the modelling loop collapses: 14 days → 1 minute.",
  "NashOS is built as this model rather than adapted to it. Eight traditional EPM modules collapse into five systems on one 9-dimension cube — the architecture is laid out at /system. Connectors for REST APIs and SFTP sync on schedule; CSV and Excel uploads land in the same cube. AI agents operate the system through 35+ tools, every write goes through a draft a human must post, and every mutation is audit-trailed — multi-entity, multi-currency, and audit-ready by construction. More on the agent layer at /agentic-fpa-platform.",
];

const SECTION_1 = [
  {
    Icon: Sparkles,
    meta: "Deadline → Schedule",
    title: "Data arrival",
    body:
      "Batch: someone exports trial balance after the period ends, and reconciliation starts days later. Continuous: connectors sync on schedule, so the cube already holds current data when the period closes.",
  },
  {
    Icon: GitBranch,
    meta: "Assembly → Verification",
    title: "The close",
    body:
      "Batch: close is a build project — collect, reconcile, tie out, assemble. Continuous: the numbers are already computed, so close is a verification pass over a state that already exists. That is how 11 days becomes 1.",
  },
  {
    Icon: ShieldCheck,
    meta: "Project → Standing state",
    title: "Planning",
    body:
      "Batch: the plan is a quarterly project that goes stale on approval. Continuous: the plan is a computed state — change a driver and member formulas recompute the downstream lines, so re-planning is an edit, not a rebuild.",
  },
  {
    Icon: Zap,
    meta: "Rebuilt → Read",
    title: "Reporting",
    body:
      "Batch: every board pack is reassembled from scratch in slides. Continuous: reports read the cube, movers are ranked by financial impact, and the 40-hour variance pack takes 90 minutes. The full close story is at /financial-close-software.",
  },
];

const SECTION_2 = [
  {
    Icon: FileEdit,
    meta: "9-dimension cube",
    title: "One data foundation",
    body:
      "Planning, forecasting, and close read and write the same 9-dimension cube. There is no export step between them, so there is nothing to go stale between them. The five-system architecture is laid out at /system.",
  },
  {
    Icon: Activity,
    meta: "REST · SFTP · CSV · Excel",
    title: "Connectors on schedule",
    body:
      "Syncs from REST APIs and SFTP run on schedule, not on a close deadline. CSV and Excel uploads land in the same cube; the onboarding wizard auto-maps P&L and GL uploads into accounts. Native NetSuite and QuickBooks connectors are on the near-term roadmap.",
  },
  {
    Icon: Gauge,
    meta: "14 days → 1 minute",
    title: "Recompute, not rebuild",
    body:
      "Drivers and member formulas keep the model computed: change HEADCOUNT_ENG and salaries recompute through OPEX, EBITDA, and Net Income. Fifteen forecast algorithms run against holdout windows, and you can pin the winner.",
  },
  {
    Icon: Layers,
    meta: "35+ tools",
    title: "Agents with a paper trail",
    body:
      "AI agents operate the system — 35+ tools covering ~99% of manual app actions — but every write produces a draft a human must post, and every mutation logs actor, timestamp, and before/after JSON. How Nash works under the hood: /inside-nash.",
  },
];

const FAQ = [
  {
    question: "What is continuous finance?",
    answer:
      "It is an operating model where planning, forecasting, and close run as one always-computed system on a shared data foundation, instead of as separate batch cycles. Data lands from connectors on a schedule, downstream numbers recompute automatically, and close becomes verification of an existing state rather than a period-end assembly project. It contrasts with the batch model, where each cycle starts by collecting and rebuilding the numbers by hand.",
  },
  {
    question: "What's the difference between a continuous close and a fast close?",
    answer:
      "A fast close compresses the batch model: the same assembly work, done in fewer days, usually with more people and tighter checklists. A continuous close changes what the work is: data is already in the cube when the period ends, so close is a verification pass rather than a build. That mechanism is how NashOS collapses an 11-day close cycle to 1 day — detail at /financial-close-software.",
  },
  {
    question: "What are the prerequisites for running finance continuously?",
    answer:
      "Three things: data that arrives on a schedule rather than on request (connectors, not exports); numbers that are computed rather than pasted (drivers and formulas, not hardcoded cells); and changes that are traceable (an audit trail, so an always-moving system stays reviewable). A single data foundation ties them together — if planning and close live in different tools, each sync point reintroduces a batch cycle. NashOS ships all three as defaults rather than integrations.",
  },
  {
    question: "Does this model mean there's no month-end at all?",
    answer:
      "No. Period boundaries still exist, and so do the judgment calls that belong to them — accruals, adjustments, review, and sign-off still happen at month-end. What changes is what month-end contains: verification of numbers that are already computed, rather than days of collecting and assembling them. NashOS's claim is a 1-day close, not a zero-day close.",
  },
  {
    question: "How does NashOS implement continuous finance?",
    answer:
      "NashOS runs planning, forecasting, and close as five systems on one 9-dimension cube — a consolidation of the eight modules a traditional EPM stack splits them into. Connectors for REST APIs and SFTP sync on schedule; drivers and member formulas keep downstream lines computed; and AI agents operate the system with draft-before-commit safety and a full audit trail on every mutation. The architecture is at /system, and the agent layer at /agentic-fpa-platform.",
  },
];

export const Route = createFileRoute("/continuous-finance")({
  head: () =>
    seo({
      title: "Continuous Finance — Always-On Planning & Close — NashOS",
      description: "Continuous finance runs planning, forecasting, and close as one always-computed system instead of batch cycles. See how NashOS is built as that model.",
      path: "/continuous-finance",
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
        eyebrow={"Operating model"}
        title={"Continuous finance, defined."}
        highlight={"Always computed, never assembled."}
        lede={"Continuous finance is the operating model where planning, forecasting, and close run as one always-computed system instead of batch cycles. Connectors land data on schedule, the cube recomputes, and close becomes verification instead of assembly. NashOS is built as this model — five systems on one data foundation."}
        primaryCta={{ label: "Try with your data", to: "/try" }}
        secondaryCta={{ label: "Book a walkthrough", to: "/demo" }}
      />

      <Section>
        <div className="max-w-3xl">
          <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight">
            {"What continuous finance means — and what it replaces"}
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
          title={"Batch vs. continuous"}
          caption={"Same ledger, same GAAP — different operating model. Every row below is the same work; what changes is when it happens and whether a human has to assemble it."}
        />
        <CardGrid items={SECTION_1} cols={4} />
      </Section>

      <Section>
        <SectionHeader
          title={"How NashOS runs finance continuously"}
          caption={"NashOS was not retrofitted for this model — it is the design premise. Eight traditional EPM modules collapse into five systems on one data foundation."}
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
        title={"Stop assembling."}
        highlight={"Start verifying."}
        lede={"Get a walkthrough on your own data within one business day, and a pilot in days — not months."}
        primaryCta={{ label: "Try with your data", to: "/try" }}
        secondaryCta={{ label: "Book a demo", to: "/demo" }}
      />

      <StickyCta label="Book a demo" to="/demo" />
    </PageShell>
  );
}
