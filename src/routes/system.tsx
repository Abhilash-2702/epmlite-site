import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { PageHero, Section, SectionHeader, FaqList, CheckList, CtaBand } from "@/components/page-sections";
import { SystemSection } from "@/components/sections/system-section";
import { seo, type Crumb, type Faq } from "@/lib/seo";

// Dedicated page for what used to be the homepage anchor /#system. The
// animated SystemSection component is reused verbatim so the page and the
// homepage stay identical in look and behaviour; everything around it is
// unique copy that only exists here.

const CRUMBS: Crumb[] = [{ name: "System", path: "/system" }];

const FAQ: Faq[] = [
  {
    question: "What does “one data foundation” actually mean?",
    answer:
      "Entities, currencies, accounts, cost centres and every other dimension live in a single cube. Planning, reporting, consolidation and variance all read and write that one structure, so there is no synchronisation step and no possibility of two modules disagreeing about the same figure.",
  },
  {
    question: "Do I have to migrate everything at once?",
    answer:
      "No. Pilots start by loading one period from one source and reconciling it against the report you already trust. Nothing else moves until that reconciles.",
  },
  {
    question: "What happens when we change the chart of accounts?",
    answer:
      "Dimensions are file-driven, so a structural change is an edit rather than a rebuild. Dependent figures recompute from the same source; no scenario or report needs to be reconstructed.",
  },
  {
    question: "Can we see how a number was produced?",
    answer:
      "Yes. Any figure drills through to the source rows behind it, and every write carries its before value, after value, actor and timestamp.",
  },
];

export const Route = createFileRoute("/system")({
  head: () =>
    seo({
      title: "The NashOS System: 8 EPM Modules Collapsed Into 5",
      // Deliberately carries no close-cycle figure. The homepage animation says
      // 11 days → 1 while /financial-close-software and /for/saas say 11 → 4;
      // until those are reconciled, don't promote either number into a SERP
      // snippet where Google can show two different claims side by side.
      description:
        "How NashOS collapses eight EPM modules into five systems on one data foundation, so a driver change recomputes the forecast, consolidation and variance from the same source.",
      path: "/system",
      type: "article",
      faq: FAQ,
      breadcrumbs: CRUMBS,
    }),
  component: SystemPage,
});

function SystemPage() {
  return (
    <PageShell crumbs={CRUMBS}>
      <PageHero
        tight
        eyebrow="Architecture"
        title="From eight modules."
        highlight="To one system."
        lede="Most EPM tools sell you modules. NashOS gives you one system that operates as one — and the difference shows up in the close calendar, not the feature list."
        primaryCta={{ label: "Try with your data", to: "/try" }}
        secondaryCta={{ label: "See the six systems", to: "/inside-nash" }}
      />

      {/* The same animated stepper the homepage renders. */}
      <SystemSection />

      <Section>
        <SectionHeader
          eyebrow="Collapse"
          title={
            <>
              Eight modules, eight copies of{" "}
              <span className="text-gradient-gold">the truth.</span>
            </>
          }
          caption="Why a conventional EPM footprint makes every month begin with reconciliation."
        />
        <div className="grid lg:grid-cols-2 gap-10 mt-8">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              A conventional EPM footprint spans eight modules: Planning, Close, Reporting,
              Scenarios, Data, Governance, Consolidation and Allocations. Each is licensed
              separately, configured separately, and — the part nobody puts on the datasheet —
              holds its own copy of the model. That is why a change to your chart of accounts is
              a project rather than an edit.
            </p>
            <p>
              NashOS collapses that surface into five systems sharing one data foundation:
              Decision System, Continuous Planning, Data Foundation, Audit &amp; Control, and
              Agentic Execution. One model, one set of dimensions, one computation path.
            </p>
          </div>
          <div className="surface-card p-7">
            <h3 className="font-semibold text-lg mb-4">What you stop doing</h3>
            <CheckList
              items={[
                "Reconciling the planning model against the reporting model",
                "Rebuilding scenarios after a dimension change",
                "Exporting to Excel to settle a number two systems disagree on",
                "Waiting on a consolidation run to see an entity roll-up",
              ]}
            />
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Compression"
          title={
            <>
              Five steps become <span className="text-gradient-gold">three.</span>
            </>
          }
        />
        <div className="grid lg:grid-cols-2 gap-10 mt-8">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              The old loop is five steps long: build the model, model the change, run the
              scenario, export the result, then rework it when someone finds a discrepancy.
              Elapsed time is measured in days and most of it is not analysis.
            </p>
            <p>
              The NashOS loop is three. You ask, the system executes, and you review the draft
              and commit it. The model never leaves the system, so there is nothing to reconcile
              afterwards.
            </p>
          </div>
          <div className="surface-card p-7">
            <h3 className="font-semibold text-lg mb-4">The request, step by step</h3>
            <CheckList
              items={[
                "Ask — plain English, resolved against your real dimensions",
                "System executes — computation runs across every affected entity",
                "Draft → Commit — before/after shown, written only on confirmation",
              ]}
            />
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="FAQ" title="About the architecture" />
        <div className="mt-8 max-w-3xl">
          <FaqList items={FAQ} />
        </div>
      </Section>

      <CtaBand
        title="See it on your own close."
        highlight="Not a demo dataset."
        lede="Send one period of real data and we'll reconcile it against your existing report before we talk about anything else."
        primaryCta={{ label: "Try with your data", to: "/try" }}
        secondaryCta={{ label: "Book a 15-min demo", to: "/demo" }}
      />
    </PageShell>
  );
}
