"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { usePersona } from "@/components/PersonaContext";
import { PERSONA_CONTENT } from "@/lib/persona-content";

export default function Pain() {
  const { persona } = usePersona();
  const c = PERSONA_CONTENT[persona];

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={persona}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-accent-rose uppercase tracking-wider mb-3">
                {c.painKicker}
              </p>
              <h2 className="font-display font-bold text-3xl lg:text-4xl text-slate-900 tracking-tight text-balance">
                {c.painHeadline}
              </h2>
              <p className="mt-4 text-lg text-slate-600">{c.painSub}</p>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {c.painCards.map((p, i) => (
                <motion.div
                  key={p.headline}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="rounded-2xl bg-white border border-surface-200 p-6 shadow-card hover:shadow-card-hover transition-shadow"
                >
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-rose-100 text-accent-rose mb-4">
                    <X className="w-5 h-5" strokeWidth={2.5} />
                  </span>
                  <h3 className="font-display font-semibold text-slate-900 text-base leading-snug">
                    {p.headline}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{p.body}</p>
                </motion.div>
              ))}
            </div>

            <p className="mt-10 text-sm text-slate-500 italic max-w-3xl">{c.painSummary}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
