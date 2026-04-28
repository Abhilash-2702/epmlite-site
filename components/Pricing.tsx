"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { DEMO_MAILTO } from "@/lib/constants";

type Tier = {
  name: string;
  price: string;
  per?: string;
  tagline: string;
  ctaLabel: string;
  ctaHref: string;
  features: { label: string; included: boolean }[];
  highlight?: boolean;
};

const tiers: Tier[] = [
  {
    name: "Starter",
    price: "$99",
    per: "/ month",
    tagline: "For solo CFOs and small finance teams.",
    ctaLabel: "Start a 14-day trial",
    ctaHref: DEMO_MAILTO,
    features: [
      { label: "Up to 3 users", included: true },
      { label: "1 entity", included: true },
      { label: "Full reports (P&L · BS · CF)", included: true },
      { label: "Driver-based planning", included: true },
      { label: "AI Chat (all 35+ tools)", included: true },
      { label: "15 forecasting algorithms", included: true },
      { label: "Audit log + RBAC", included: true },
      { label: "Connectors (REST/SFTP)", included: false },
      { label: "Multi-entity rollups", included: false },
    ],
  },
  {
    name: "Pro",
    price: "$499",
    per: "/ month",
    tagline: "For finance teams running real consolidations.",
    ctaLabel: "Start a 14-day trial",
    ctaHref: DEMO_MAILTO,
    highlight: true,
    features: [
      { label: "Everything in Starter", included: true },
      { label: "Up to 15 users", included: true },
      { label: "Unlimited entities", included: true },
      { label: "Connectors: REST · SFTP · Excel · CSV", included: true },
      { label: "Alerts engine (4 rule types)", included: true },
      { label: "What-if scenario save / share", included: true },
      { label: "Bulk import", included: true },
      { label: "Email + Slack notifications", included: true },
    ],
  },
  {
    name: "Enterprise",
    price: "Talk to us",
    tagline: "For organizations with custom needs.",
    ctaLabel: "Contact sales",
    ctaHref: DEMO_MAILTO,
    features: [
      { label: "Everything in Pro", included: true },
      { label: "Self-host or single-tenant cloud", included: true },
      { label: "SSO (SAML / OIDC)", included: true },
      { label: "Custom connectors (Oracle, SAP, NetSuite)", included: true },
      { label: "Dedicated success engineer", included: true },
      { label: "SLA + custom contract terms", included: true },
      { label: "White-label option", included: true },
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-surface-50 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">
            Pricing
          </p>
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-slate-900 tracking-tight text-balance">
            Simple pricing. No &ldquo;request a quote&rdquo; gymnastics.
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`relative rounded-2xl bg-white p-7 transition-all ${
                t.highlight
                  ? "border-2 border-brand-500 shadow-elevated lg:scale-105"
                  : "border border-surface-200 shadow-card"
              }`}
            >
              {t.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center rounded-full bg-brand-500 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1">
                  Most popular
                </span>
              )}
              <h3 className="font-display font-semibold text-xl text-slate-900">{t.name}</h3>
              <p className="text-sm text-slate-500 mt-1">{t.tagline}</p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="font-display font-bold text-4xl text-slate-900 tracking-tight">
                  {t.price}
                </span>
                {t.per && <span className="text-sm text-slate-500">{t.per}</span>}
              </div>

              <a
                href={t.ctaHref}
                className={`mt-6 block w-full text-center rounded-xl font-semibold px-5 py-3 transition-colors ${
                  t.highlight
                    ? "bg-brand-500 hover:bg-brand-600 text-white shadow-card"
                    : "bg-surface-50 hover:bg-surface-100 text-slate-900 border border-surface-200"
                }`}
              >
                {t.ctaLabel}
              </a>

              <ul className="mt-7 space-y-2.5">
                {t.features.map((f) => (
                  <li key={f.label} className="flex items-start gap-2 text-sm">
                    {f.included ? (
                      <Check className="w-4 h-4 text-accent-emerald shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                    )}
                    <span
                      className={f.included ? "text-slate-700" : "text-slate-400 line-through"}
                    >
                      {f.label}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-slate-500 max-w-3xl mx-auto">
          All tiers include audit log, role-based access, draft-before-commit chat, daily backup,
          and a 14-day free trial. <span className="text-slate-700 font-medium">Annual billing saves 20%.</span>{" "}
          Non-profits and pre-seed startups get 50% off Starter — contact us.
        </p>
      </div>
    </section>
  );
}
