"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  FileSpreadsheet,
  GitBranch,
  Sparkles,
  FlaskConical,
  TrendingUp,
  ShieldCheck,
  Coins,
  Users,
  TrendingDown,
  PieChart,
  FileEdit,
} from "lucide-react";
import { usePersona } from "@/components/PersonaContext";
import { PERSONA_CONTENT } from "@/lib/persona-content";

const ICON_MAP = {
  BarChart3,
  FileSpreadsheet,
  GitBranch,
  Sparkles,
  FlaskConical,
  TrendingUp,
  ShieldCheck,
  Coins,
  Users,
  TrendingDown,
  PieChart,
  FileEdit,
};

const TONE_CYCLE = [
  "text-theme-accent bg-theme-accent-soft",
  "text-theme-accent bg-theme-accent-soft",
  "text-accent-violet bg-violet-50",
  "text-accent-emerald bg-emerald-50",
  "text-accent-amber bg-amber-50",
  "text-accent-cyan bg-cyan-50",
];

export default function FeatureGrid() {
  const { persona } = usePersona();
  const c = PERSONA_CONTENT[persona];

  return (
    <section id="features" className="bg-white py-12 lg:py-16">
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
                {c.featuresKicker}
              </p>
              <h2 className="font-display font-bold text-3xl lg:text-4xl text-slate-900 tracking-tight text-balance">
                {c.featuresHeadline}
              </h2>
              <p className="mt-4 text-lg text-slate-600">{c.featuresSub}</p>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {c.features.map((f, i) => {
                const Icon = ICON_MAP[f.iconKey];
                const tone = TONE_CYCLE[i % TONE_CYCLE.length];
                return (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className={`relative rounded-2xl bg-white p-7 shadow-card hover:shadow-card-hover transition-all hover:-translate-y-0.5 ${
                      f.highlight
                        ? "border-2 border-theme-accent/30 ring-4 ring-theme-accent/10"
                        : "border border-surface-200"
                    }`}
                  >
                    {f.highlight && (
                      <span className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-theme-accent text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5">
                        <Sparkles className="w-3 h-3" />
                        Key
                      </span>
                    )}
                    <span className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${tone}`}>
                      <Icon className="w-5 h-5" />
                    </span>
                    <h3 className="mt-5 font-display font-semibold text-lg text-slate-900">
                      {f.title}
                    </h3>
                    <p className="mt-1 font-display text-sm font-medium text-slate-700">
                      {f.headline}
                    </p>
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed">{f.body}</p>
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
