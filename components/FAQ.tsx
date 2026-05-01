"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { usePersona } from "@/components/PersonaContext";
import { PERSONA_CONTENT } from "@/lib/persona-content";

export default function FAQ() {
  const { persona } = usePersona();
  const items = PERSONA_CONTENT[persona].faq;
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  // Reset open item to 0 when persona changes
  useEffect(() => {
    setOpenIdx(0);
  }, [persona]);

  return (
    <section id="faq" className="bg-white py-12 lg:py-16">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-semibold text-theme-accent uppercase tracking-wider mb-3">
            FAQ
          </p>
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-slate-900 tracking-tight text-balance">
            Frequently asked.
          </h2>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={persona}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3 }}
            className="mt-10 divide-y divide-surface-200 border-y border-surface-200"
          >
            {items.map((it, i) => {
              const isOpen = openIdx === i;
              return (
                <div key={it.q}>
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 py-5 text-left group"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display font-semibold text-slate-900 text-base lg:text-lg group-hover:text-theme-accent transition-colors">
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
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
