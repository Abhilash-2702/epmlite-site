"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, BarChart3, Rocket, ArrowRight, Sparkles } from "lucide-react";
import { usePersona, type Persona, PERSONAS } from "@/components/PersonaContext";

const PERSONA_META: Record<Persona, {
  Icon: typeof Briefcase;
  label: string;
  caption: string;
  hook: string;
  themeName: string;
  swatchClass: string;
}> = {
  cfo: {
    Icon: Briefcase,
    label: "CFO",
    caption: "I lead finance.",
    hook: "Board, audit, IPO.",
    themeName: "Slate · Gold",
    swatchClass: "bg-gradient-to-br from-slate-700 to-slate-900",
  },
  fpa: {
    Icon: BarChart3,
    label: "FP&A",
    caption: "I do the work.",
    hook: "Close, forecast, drivers.",
    themeName: "Ocean",
    swatchClass: "bg-gradient-to-br from-brand-500 to-brand-800",
  },
  founder: {
    Icon: Rocket,
    label: "Founder",
    caption: "I run the company.",
    hook: "Runway, hiring, burn.",
    themeName: "Emerald · Violet",
    swatchClass: "bg-gradient-to-br from-emerald-500 to-violet-700",
  },
};

/**
 * WhoAmICard — appears prominently above the Hero when the visitor hasn't
 * picked a persona yet. Once a persona is chosen, this collapses to a
 * compact chip toggle that lives inside the Hero (rendered there).
 *
 * Personalises the entire site: theme palette, hero H1/subhead/CTAs, pain
 * cards, how steps, features, chat prompts, FAQ, CTA. All driven by the
 * persona key in localStorage.
 */
export default function WhoAmICard() {
  const { persona, setPersona, hasPicked } = usePersona();

  return (
    <AnimatePresence mode="wait">
      {!hasPicked && (
        <motion.section
          key="who-am-i"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, height: 0, marginBottom: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-white border-b border-surface-200 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 lg:py-10">
            <div className="flex items-start lg:items-center gap-3 lg:gap-4 mb-6">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-theme-accent text-white shrink-0">
                <Sparkles className="w-5 h-5" strokeWidth={2.5} />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-theme-accent mb-1">
                  Who are you here as?
                </p>
                <h2 className="font-display font-bold text-xl lg:text-2xl text-slate-900 tracking-tight">
                  Pick your view.
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4">
              {PERSONAS.map((p) => {
                const m = PERSONA_META[p];
                const active = p === persona;
                return (
                  <button
                    key={p}
                    onClick={() => setPersona(p)}
                    className={`group relative text-left rounded-2xl border-2 transition-all p-5 lg:p-6 hover:shadow-card-hover ${
                      active
                        ? "border-theme-accent bg-theme-accent-soft/40"
                        : "border-surface-200 bg-white hover:border-theme-accent/40"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <span
                        className={`inline-flex items-center justify-center w-12 h-12 rounded-xl text-white ${m.swatchClass}`}
                      >
                        <m.Icon className="w-6 h-6" strokeWidth={2.5} />
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                        Theme · {m.themeName}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-2xl text-slate-900 mb-1">
                      {m.label}
                    </h3>
                    <p className="text-sm text-slate-600 mb-1">{m.caption}</p>
                    <p className="text-xs font-mono text-slate-500">{m.hook}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-theme-accent group-hover:gap-2.5 transition-all">
                      Pick this view
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="mt-5 text-xs text-slate-500 text-center">
              You can switch any time — your pick saves locally so you don&apos;t see this card again.
            </p>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
