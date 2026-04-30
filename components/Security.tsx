"use client";

import { motion } from "framer-motion";
import { History, ShieldCheck, Key, FileEdit } from "lucide-react";

const cards = [
  {
    Icon: History,
    title: "Full audit log",
    headline: "Every change captured.",
    body:
      "Dim members, fact rows, formulas, users, exchange rates — every mutation logged with before/after JSON, actor, timestamp. Filterable.",
    tone: "text-slate-700 bg-slate-100",
  },
  {
    Icon: ShieldCheck,
    title: "Role-based access",
    headline: "Four roles, clean boundaries.",
    body:
      "super_admin · admin · planner · viewer. The agent respects the same permissions (e.g. user management is super_admin-gated).",
    tone: "text-brand-600 bg-brand-50",
  },
  {
    Icon: Key,
    title: "Hardened auth",
    headline: "Short-lived JWTs, refresh rotation, account lockout.",
    body:
      "15-min access tokens, 7-day refresh in httpOnly cookie. 5 fails / 15 min triggers a 30-min lockout. Helmet HSTS/CSP/CORP enabled.",
    tone: "text-accent-violet bg-violet-50",
  },
  {
    Icon: FileEdit,
    title: "Drafts before commits",
    headline: "No silent writes from the AI.",
    body:
      "Every agent write produces a confirmation card. The user clicks Post; the backend re-validates; commit happens. Nothing auto-mutates the database.",
    tone: "text-accent-emerald bg-emerald-50",
  },
];

export default function Security() {
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">
            Security
          </p>
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-slate-900 tracking-tight text-balance">
            Audit-grade control. Built in, not bolted on.
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-2xl bg-white border border-surface-200 p-6 shadow-card hover:shadow-card-hover transition-shadow"
            >
              <span className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${c.tone}`}>
                <c.Icon className="w-5 h-5" />
              </span>
              <h3 className="mt-4 font-display font-semibold text-slate-900">{c.title}</h3>
              <p className="mt-1 font-display text-sm font-medium text-slate-700">{c.headline}</p>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{c.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
