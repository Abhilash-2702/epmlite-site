import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Section, SectionHeader, FaqList } from "@/components/page-sections";
import type { Faq } from "@/lib/seo";

// Indexable copy for the homepage.
//
// The live homepage measured a 7.4% text-to-HTML ratio (4,611 text chars in
// 62,341 bytes) — well under the ~10% floor crawlers treat as "thin". The
// animated sections above carry the story visually but contribute very little
// crawlable prose. This block and the FAQ below are the fix, and the FAQ
// doubles as FAQPage structured data via index.tsx's head().
//
// Answers are written for how buyers actually search ("what is agentic FP&A",
// "NashOS vs Anaplan") rather than padded with keywords.

export const HOME_FAQ: Faq[] = [
  {
    question: "What is agentic FP&A software?",
    answer:
      "Agentic FP&A software lets a finance user state an intent in plain English and have the system carry out the work — resolving the request against your dimensions, running the computation, drafting the change, and committing it only after review. It differs from a chatbot bolted onto a planning tool: the agent has tools that read and write the model directly, and every action it takes is recorded in the audit trail.",
  },
  {
    question: "How is NashOS different from Anaplan or Adaptive Planning?",
    answer:
      "Those platforms are module-based: planning, consolidation and reporting are separate builds that hold their own copies of the model, so a structural change means a rebuild and a re-reconciliation. NashOS runs one model with one data foundation, so a driver change recomputes everything downstream. Implementation is measured in days rather than months.",
  },
  {
    question: "Does NashOS handle multi-entity and multi-currency consolidation?",
    answer:
      "Yes. Entities and currencies are dimensions of the same cube rather than a separate consolidation module. FX translation is applied consistently across reporting, planning and variance, so a consolidated P&L and an entity-level P&L cannot disagree.",
  },
  {
    question: "How long does implementation take?",
    answer:
      "Pilots run on your own data in days, not months. You connect a data source, map your chart of accounts and dimensions, load a period, and reconcile against your existing reports before anything else is built.",
  },
  {
    question: "Is my data auditable and is every AI-generated change reviewable?",
    answer:
      "Every write stores the before value, the after value, the actor, the timestamp and the originating request. Agent-drafted changes are staged as drafts — nothing is committed without explicit confirmation — and figures on a report drill through to the source rows that produced them.",
  },
  {
    question: "Which systems does NashOS connect to?",
    answer:
      "REST APIs, SFTP, Excel and CSV connectors are production-ready and validated on every run, with full run history. Native NetSuite and QuickBooks connectors are on the near-term roadmap; until those ship, those customers connect via REST or scheduled exports.",
  },
  {
    question: "What does NashOS cost?",
    answer:
      "The pricing page sets out three tiers — Pilot, Operate and Enterprise — and what each one includes. Figures are quoted per engagement against your entity count and data volume rather than listed as a fixed price. Pilots run on your own data before any commitment.",
  },
];

// Compact disclosure — the summary line carries the point, the detail stays in
// the DOM (native <details> keeps it crawlable) so tightening this block
// visually doesn't undo the text-to-HTML ratio fix described above.
function Detail({ summary, children }: { summary: string; children: ReactNode }) {
  return (
    <details className="detail-card group">
      <summary className="flex items-start gap-2 cursor-pointer list-none text-sm text-muted-foreground marker:hidden">
        <ChevronDown className="mt-[3px] h-3.5 w-3.5 shrink-0 text-gold transition-transform duration-200 group-open:rotate-180" />
        <span>{summary}</span>
      </summary>
      <div className="detail-body pl-[22px] pt-2 text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </details>
  );
}

export function HomeContentSection() {
  return (
    <>
      <Section>
        <SectionHeader
          eyebrow="What NashOS is"
          title={
            <>
              Finance software that <span className="text-gradient-gold">computes continuously.</span>
            </>
          }
          caption="One model, one set of dimensions, one computation path."
        />

        {/* Lead — two tight statements, detail one click away. */}
        <div className="grid lg:grid-cols-2 gap-x-10 gap-y-6 mt-8">
          <div className="rise-in space-y-3">
            <p className="text-base leading-relaxed text-muted-foreground">
              Traditional EPM splits finance across eight or more modules, each holding its own
              copy of the truth — so every month starts with reconciliation and every change
              starts with a rebuild.
            </p>
            <Detail summary="Which eight modules, and why the copies drift">
              Planning, close, reporting, scenarios, data, governance, consolidation and
              allocations are each built and maintained separately. Because every module keeps its
              own copy of the model, a structural change in one is a rebuild and a
              re-reconciliation everywhere else.
            </Detail>
          </div>

          <div className="rise-in space-y-3" style={{ animationDelay: "80ms" }}>
            <p className="text-base leading-relaxed text-muted-foreground">
              NashOS collapses them into five systems on one data foundation. A driver changes once
              and every dependent figure — forecast, consolidation, variance, runway — recomputes
              from the same source.
            </p>
            <Detail summary="What that removes from the month">
              There is no export step, no model rebuild, and no window where two reports disagree.
              The same figure is used by planning, consolidation and variance because there is only
              one of it.
            </Detail>
          </div>
        </div>

        {/* Who it is for — one compact row instead of a bulleted block. */}
        <div className="rise-in mt-10" style={{ animationDelay: "160ms" }}>
          <h3 className="text-xs uppercase tracking-[0.18em] text-gold font-semibold mb-4">
            Who it is for
          </h3>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <p className="text-muted-foreground">
              <Link to="/for-leaders" className="text-foreground font-medium hover:text-gold">
                CFOs
              </Link>{" "}
              — board-ready numbers with a full audit trail on every write.
            </p>
            <p className="text-muted-foreground">
              <span className="text-foreground font-medium">FP&amp;A teams</span> — driver-based
              plans across multiple entities and currencies.
            </p>
            <p className="text-muted-foreground">
              <span className="text-foreground font-medium">Founders</span> — runway and burn on
              demand, without asking finance.
            </p>
          </div>
        </div>

        {/* Three deep-dives, collapsed by default. */}
        <div className="grid md:grid-cols-3 gap-4 mt-10">
          {[
            {
              h: "How a request runs",
              lead: "Ask in plain English. NashOS resolves the intent against your dimensions, computes across every affected entity, and returns a draft.",
              body: (
                <>
                  A request like “what happens to runway if we hire ten engineers in Q3?” is
                  parsed, resolved and computed in place — nothing is written until you confirm it.
                  The{" "}
                  <Link to="/inside-nash" className="text-gold hover:underline">
                    six systems behind that
                  </Link>{" "}
                  are described in full on their own page.
                </>
              ),
            },
            {
              h: "What makes it auditable",
              lead: "Every write records the before value, the after value, the actor, the timestamp and the request that produced it.",
              body: (
                <>
                  Reports trace back to source rows, so a number on a board deck can be drilled to
                  the transaction that created it. Agent-proposed changes are staged as drafts and
                  are not written until a user confirms them.
                </>
              ),
            },
            {
              h: "What it connects to",
              lead: "REST APIs, SFTP, Excel and CSV are production-ready today, validated on every run.",
              body: (
                <>
                  Every connector run keeps full history. Native ERP connectors are on the
                  near-term roadmap; until they ship, NetSuite and QuickBooks customers connect via
                  REST or scheduled exports.
                </>
              ),
            },
          ].map((c, i) => (
            <div
              key={c.h}
              className="rise-in surface-card p-5"
              style={{ animationDelay: `${240 + i * 80}ms` }}
            >
              <h3 className="text-base font-semibold text-foreground">{c.h}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.lead}</p>
              <div className="mt-3">
                <Detail summary="More detail">{c.body}</Detail>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="FAQ"
          title={
            <>
              Questions finance teams ask{" "}
              <span className="text-gradient-gold">before they buy.</span>
            </>
          }
        />
        <div className="mt-10 max-w-3xl">
          <FaqList items={HOME_FAQ} />
        </div>
      </Section>
    </>
  );
}
