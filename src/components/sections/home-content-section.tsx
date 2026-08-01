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
          caption="One model, one set of dimensions, one computation path — and what that changes day to day."
        />

        <div className="grid lg:grid-cols-2 gap-10 mt-10 text-muted-foreground leading-relaxed">
          <div className="space-y-4">
            <p>
              Traditional enterprise performance management splits finance across eight or more
              modules — planning, close, reporting, scenarios, data, governance, consolidation and
              allocations. Each one holds its own copy of the truth, so every month begins with
              reconciliation and every change begins with a rebuild.
            </p>
            <p>
              NashOS collapses those eight modules into five systems that share one data
              foundation. A driver changes once and every dependent figure — forecast,
              consolidation, variance, runway — recomputes from the same source. There is no
              export step, no model rebuild, and no window where two reports disagree.
            </p>
            <h3 className="text-lg font-semibold text-foreground pt-2">Who it is for</h3>
            <ul className="space-y-2 pl-4">
              <li className="list-disc">
                <Link to="/for-leaders" className="text-gold hover:underline">
                  CFOs
                </Link>{" "}
                who need board-ready numbers with a full audit trail on every write.
              </li>
              <li className="list-disc">
                FP&amp;A teams running driver-based plans across multiple entities and currencies.
              </li>
              <li className="list-disc">
                Founders who want runway and burn on demand without asking finance.
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">How a request runs</h3>
            <p>
              Ask in plain English — “what happens to runway if we hire ten engineers in Q3?”
              NashOS parses the intent, resolves it against your dimensions, runs the computation
              across every affected entity, and returns a draft. Nothing is written until you
              confirm it. The{" "}
              <Link to="/inside-nash" className="text-gold hover:underline">
                six systems behind that
              </Link>{" "}
              are described in full on their own page.
            </p>
            <h3 className="text-lg font-semibold text-foreground pt-2">What makes it auditable</h3>
            <p>
              Every write records the before value, the after value, the actor, the timestamp and
              the request that produced it. Reports trace back to source rows, so a number on a
              board deck can be drilled to the transaction that created it. Agent-proposed changes
              are staged as drafts and are not written until a user confirms them.
            </p>
            <h3 className="text-lg font-semibold text-foreground pt-2">What it connects to</h3>
            <p>
              REST APIs, SFTP, Excel and CSV are production-ready today, validated on every run
              with full run history. Native ERP connectors are on the near-term roadmap; until
              they ship, NetSuite and QuickBooks customers connect via REST or scheduled exports.
            </p>
          </div>
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
