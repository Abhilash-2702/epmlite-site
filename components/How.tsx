"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plug, LineChart, Sparkles, ChevronRight, ShieldCheck, MessageCircle, FilePlus, GitBranch } from "lucide-react";
import { usePersona, type Persona } from "@/components/PersonaContext";
import { PERSONA_CONTENT } from "@/lib/persona-content";

// Icon set per persona for the 3 steps
const STEP_ICONS: Record<Persona, [typeof Plug, typeof LineChart, typeof Sparkles]> = {
  cfo:     [ShieldCheck, GitBranch, Sparkles],   // Govern · Consolidate · Decide
  fpa:     [Plug, LineChart, Sparkles],          // Connect · Plan · Decide
  founder: [Plug, MessageCircle, FilePlus],      // Connect · Ask · Decide
};

const STEP_TONES = [
  "text-theme-accent bg-theme-accent-soft",
  "text-accent-violet bg-violet-50",
  "text-accent-emerald bg-emerald-50",
];

export default function How() {
  const { persona } = usePersona();
  const c = PERSONA_CONTENT[persona];
  const Icons = STEP_ICONS[persona];

  return (
    <section className="bg-surface-50 py-12 lg:py-16">
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
              <p className="text-sm font-semibold text-theme-accent uppercase tracking-wider mb-3">
                {c.howKicker}
              </p>
              <h2 className="font-display font-bold text-3xl lg:text-4xl text-slate-900 tracking-tight text-balance">
                {c.howHeadline}
              </h2>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-8 relative">
              {c.howSteps.map((s, i) => {
                const Icon = Icons[i] ?? Plug;
                return (
                  <motion.div
                    key={s.num}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="relative rounded-2xl bg-white border border-surface-200 p-7 shadow-card hover:shadow-card-hover transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <span className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${STEP_TONES[i]}`}>
                        <Icon className="w-6 h-6" />
                      </span>
                      <div>
                        <span className="text-xs font-mono font-semibold text-slate-400">{s.num}</span>
                        <h3 className="font-display font-semibold text-xl text-slate-900 mt-0.5">
                          {s.title}
                        </h3>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-slate-600 leading-relaxed">{s.body}</p>
                    {i < c.howSteps.length - 1 && (
                      <ChevronRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-surface-200" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
