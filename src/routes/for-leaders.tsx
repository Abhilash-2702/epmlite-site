import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { PageHero, Section, SectionHeader, FaqList, CtaBand } from "@/components/page-sections";
import { ForLeadersSection } from "@/components/sections/for-leaders-section";
import { seo, type Crumb, type Faq } from "@/lib/seo";

// Dedicated page for the former /#for-leaders anchor. Reuses the animated
// three-card ForLeadersSection; the role write-ups below are unique to this URL.

const CRUMBS: Crumb[] = [{ name: "For Leaders", path: "/for-leaders" }];

const FAQ: Faq[] = [
  {
    question: "Do we need a separate licence per role?",
    answer:
      "No. The three views are the same system, with what each person sees governed by their access. The pricing page sets out the three tiers and what each includes.",
  },
  {
    question: "Can a founder see runway without touching the finance model?",
    answer:
      "Yes. Read access to computed figures such as cash, burn and runway is separate from the ability to draft or commit changes, so self-serve visibility does not create edit risk.",
  },
  {
    question: "How do we stop analysts committing changes they shouldn't?",
    answer:
      "Today: no change is written without a user explicitly confirming it, and the audit trail records who confirmed it. A dedicated approval queue — where an analyst's draft waits for a separate approver — is on the near-term roadmap.",
  },
  {
    question: "Will our auditors accept this?",
    answer:
      "Every write carries before value, after value, actor, timestamp and originating request, and reports drill through to source rows — which is the evidence chain an audit asks for. Confirm scope with your own auditor before relying on it for a specific standard.",
  },
];

export const Route = createFileRoute("/for-leaders")({
  head: () =>
    seo({
      title: "NashOS for CFOs, FP&A Teams and Founders",
      description:
        "One system, three lenses. Board-ready audited numbers for CFOs, continuous driver-based planning for FP&A, and self-serve runway and burn for founders.",
      path: "/for-leaders",
      type: "article",
      faq: FAQ,
      breadcrumbs: CRUMBS,
    }),
  component: ForLeadersPage,
});

function ForLeadersPage() {
  return (
    <PageShell crumbs={CRUMBS}>
      <PageHero
        tight
        eyebrow="Built for finance leaders"
        title="Built for the way finance."
        highlight="Actually works."
        lede="Same system, three lenses — each tuned to what your role needs to ship today. None of this is a separate product or a separate licence."
        primaryCta={{ label: "Try with your data", to: "/try" }}
        secondaryCta={{ label: "See pricing", to: "/pricing" }}
      />

      {/* The same animated three-card block the homepage renders. */}
      <ForLeadersSection />

      <Section>
        <SectionHeader
          eyebrow="Three seats"
          title={
            <>
              The same numbers, <span className="text-gradient-gold">three questions.</span>
            </>
          }
        />
        <div className="grid lg:grid-cols-3 gap-8 mt-8 text-muted-foreground leading-relaxed">
          <div>
            <h3 className="font-semibold text-lg text-foreground mb-3">CFO</h3>
            <p>
              The question a CFO gets asked in the board room is not “what is the number” but
              “where did it come from”. Every figure answers that without a follow-up email: the
              write that produced it, who made it, when, and what the value was before.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-foreground mb-3">FP&amp;A</h3>
            <p>
              Most FP&amp;A time is spent rebuilding rather than analysing. Because drivers,
              entities and currencies share one computation path, a change to hire pace or price
              recomputes runway, burn and EBITDA in place — so the scenario conversation happens
              in the meeting rather than the week after it.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-foreground mb-3">Founder</h3>
            <p>
              Runway is the number founders check most and wait for longest. Here it is computed
              from the same ledger finance uses, so a self-serve answer and the board deck cannot
              drift apart.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="FAQ" title="Role-specific questions" />
        <div className="mt-8 max-w-3xl">
          <FaqList items={FAQ} />
        </div>
      </Section>

      <CtaBand
        title="Which seat"
        highlight="are you in?"
        lede="Tell us your role and we'll run the walkthrough from that lens rather than a generic tour."
        primaryCta={{ label: "Try with your data", to: "/try" }}
        secondaryCta={{ label: "Book a 15-min demo", to: "/demo" }}
      />
    </PageShell>
  );
}
