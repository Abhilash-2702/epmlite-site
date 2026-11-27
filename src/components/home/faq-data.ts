import type { Faq } from "@/lib/seo";

// The homepage FAQ: the one source for both the visible FAQ band
// (components/home/faq.tsx) and the FAQPage structured data emitted by
// routes/index.tsx's head() through seo({ faq: HOME_FAQ }). Edit the answers
// here only; the two can then never disagree.
//
// The wording is the owner's. In the 2026-11 redesign the em dashes were
// replaced with other punctuation and no word was changed; keep it free of
// em dashes.

export const HOME_FAQ: Faq[] = [
  {
    question: "What is agentic FP&A software?",
    answer:
      "Agentic FP&A software lets a finance user state an intent in plain English and have the system carry out the work: resolving the request against your dimensions, running the computation, drafting the change, and committing it only after review. It differs from a chatbot bolted onto a planning tool: the agent has tools that read the model and draft changes to it, and every change committed from its drafts is recorded with who made it and when.",
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
      "Most edits committed from a Nash draft card store the before value, the after value, the actor and the timestamp, and grid saves and bulk loads are recorded per save, with who, when and how many rows. Agent-drafted changes are staged as drafts (nothing is committed without explicit confirmation), and report lines expand from rollup to leaf, with a dashboard KPI tile drilling through to the fact rows behind it.",
  },
  {
    question: "Which systems does NashOS connect to?",
    answer:
      "REST API, SFTP, Excel and CSV connectors are self-serve today, with connection testing and run history, and every inbound load is validated before anything is written; REST API and SFTP sources can be pulled on a schedule you set (hourly, daily, weekly or a custom cron). The SAP S/4HANA, NetSuite (SuiteQL), QuickBooks Online and Stripe engines are built and covered by automated tests, and we set those up with you; NetSuite, QuickBooks Online and Stripe are inbound (pull) sources.",
  },
  {
    question: "What does NashOS cost?",
    answer:
      "The pricing page sets out three tiers (Pilot, Operate and Enterprise) and what each one includes. Figures are quoted per engagement against your entity count and data volume rather than listed as a fixed price. Pilots run on your own data before any commitment.",
  },
];
