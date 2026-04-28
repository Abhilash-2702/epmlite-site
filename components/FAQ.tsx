"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const items = [
  {
    q: "How long does setup take?",
    a: "Hours, not months. Connect your data source (REST, SFTP, Excel, or CSV — or just paste your trial balance), and the 9-dimension cube absorbs it. Most teams have a usable Executive Summary the same day. A full driver-based plan with custom formulas is typically a 2-week onboarding.",
  },
  {
    q: "Can I self-host?",
    a: "Yes — Enterprise tier. Self-host on your own VPC for compliance reasons (financial services, healthcare, government). Includes a Postgres database, Node + React stack, no external dependencies except the LLM provider. Native install for air-gapped deployments is on the roadmap.",
  },
  {
    q: "Which AI provider does it use?",
    a: "Both Gemini 2.5-flash (default) and Claude Haiku 4.5 are supported, swappable via env var. Every tool call is server-side authenticated; the LLM never writes to the database directly. Prompt caching keeps API costs around $0.40/user/month at typical usage.",
  },
  {
    q: "What about my data? Is it safe?",
    a: "Your data stays in your database. Multi-tenant cloud uses workspace row-level isolation; self-host puts the database entirely in your environment. The AI provider sees only the messages and tool results you generate during chat — never raw fact tables. Audit log captures every change with before/after.",
  },
  {
    q: "What's on the roadmap?",
    a: "Near-term (1–3 months): Designer (drag-drop dashboards), Approval workflow (admin-gated chat writes), AI-generated variance commentary, Dark mode. Medium-term: Multi-tenant SaaS hosting, SSO, NetSuite + QuickBooks connectors. Long-term: ML-based anomaly alerts, public dashboard share-links, native mobile.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">
            FAQ
          </p>
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-slate-900 tracking-tight text-balance">
            Frequently asked.
          </h2>
        </motion.div>

        <div className="mt-10 divide-y divide-surface-200 border-y border-surface-200">
          {items.map((it, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={it.q}>
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left group"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-semibold text-slate-900 text-base lg:text-lg group-hover:text-brand-600 transition-colors">
                    {it.q}
                  </span>
                  <span
                    className={`shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-surface-50 border border-surface-200 transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    <Plus className="w-4 h-4 text-slate-600" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 pr-12 text-slate-600 text-sm lg:text-base leading-relaxed">
                        {it.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
