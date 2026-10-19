import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { PageHero, Section, SectionHeader, FaqList, CtaBand } from "@/components/page-sections";
import { InsideNashSection } from "@/components/sections/inside-nash-section";
import { seo, type Crumb, type Faq } from "@/lib/seo";

// Dedicated page for the former /#inside-nash anchor. Reuses the animated
// InsideNashSection grid; the surrounding copy is unique to this URL.

const CRUMBS: Crumb[] = [{ name: "Inside Nash", path: "/inside-nash" }];

const FAQ: Faq[] = [
  {
    question: "Can the AI change my numbers without me knowing?",
    answer:
      "No. Agent-initiated changes are staged as draft cards, shown with Nash's summary of the change, and most cards show the before value and the after value before anything is written; the commit is an explicit action. Every committed write is attributed and timestamped. The security page sets out what the cards show.",
  },
  {
    question: "What stops the agent from inventing a figure?",
    answer:
      "The agent reads and writes through the same computation path as the rest of the system rather than generating numbers itself. Figures it reports are drawn from the model, so they match the reports you can open and expand from rollup to leaf.",
  },
  {
    question: "Who can commit changes?",
    answer:
      "Users whose role holds the write-data permission: planners and administrators by default, while analysts and viewers read and report. A dimension scope limits which entities, departments and products each user can write to. A change Nash proposes is written only when a user who holds the permission for it confirms it, and the audit trail records who confirmed it and when. Consolidation set-up cards and held close-run loads are confirmed by an administrator.",
  },
  {
    question: "Does it work across multiple entities and currencies?",
    answer:
      "Yes — both are dimensions of the same model, so FX translation and entity roll-ups are applied consistently to planning, reporting and variance alike.",
  },
];

export const Route = createFileRoute("/inside-nash")({
  head: () =>
    seo({
      title: "Agentic AI in Finance | AI agents for finance – NashOS",
      description:
        "Discover how NashOS uses agentic AI in finance for continuous planning, forecasting, financial insights, automation, audit controls and execution.",
      path: "/inside-nash",
      type: "article",
      faq: FAQ,
      breadcrumbs: CRUMBS,
      webPage: true,
    }),
  component: InsideNashPage,
});

function InsideNashPage() {
  return (
    <PageShell crumbs={CRUMBS}>
      <PageHero
        tight
        eyebrow="Inside Nash"
        title="Six systems."
        highlight="One operating model."
        lede="Nash is not a chatbot layered over a planning tool. It is six systems sharing one model, one set of dimensions and one audit trail."
        primaryCta={{ label: "Try with your data", to: "/try" }}
        secondaryCta={{ label: "See the architecture", to: "/system" }}
      />

      {/* The same borderless grid the homepage renders. */}
      <InsideNashSection />

      <Section>
        <SectionHeader
          eyebrow="How they fit"
          title={
            <>
              Six systems, <span className="text-gradient-gold">one write path.</span>
            </>
          }
        />
        <div className="grid lg:grid-cols-2 gap-10 mt-8 text-muted-foreground leading-relaxed">
          <div className="space-y-4">
            <p>
              The Decision System holds P&amp;L, Balance Sheet and Cash Flow as one model rather
              than three reports, so asking why a line moved returns an answer that traces to the
              transactions that moved it. Continuous Planning keeps that model current — change a
              headcount assumption and runway, burn and EBITDA update without a rebuild.
            </p>
            <p>
              Agentic Execution turns intent into action, but it works through the same write
              path a person does. There is no side channel and no unlogged edit: whatever the
              agent does is staged, shown, and only then committed.
            </p>
          </div>
          <div className="space-y-4">
            <p>
              Audit &amp; Control is what makes that safe to run. Most edits committed from a draft
              card store their before value, after value, actor and timestamp, grid saves and bulk loads
              are recorded per save, and nothing the agent proposes reaches the model until a user confirms it.
            </p>
            <p>
              Underneath, the Data Foundation is multi-entity and multi-currency by construction,
              so an entity view and a consolidated view are two reads of the same numbers rather
              than two builds. Integrations connect it to your sources — REST, SFTP, CSV and
              Excel — validated on every run, with full run history so a bad load is visible
              before it reaches a report.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="FAQ" title="About the agent" />
        <div className="mt-8 max-w-3xl">
          <FaqList items={FAQ} />
        </div>
      </Section>

      <CtaBand
        title="Watch the agent work"
        highlight="on your model."
        lede="Fifteen minutes, your data, no slides. You'll see a draft raised and committed end to end."
        primaryCta={{ label: "Try with your data", to: "/try" }}
        secondaryCta={{ label: "Book a 15-min demo", to: "/demo" }}
      />
    </PageShell>
  );
}
