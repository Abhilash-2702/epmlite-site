"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, PlayCircle, Briefcase, BarChart3, Rocket, Wand2 } from "lucide-react";
import Link from "next/link";
import VideoOrMockup from "@/components/animated/VideoOrMockup";
import LiveDashboard from "@/components/animated/LiveDashboard";
import { usePersona, type Persona } from "@/components/PersonaContext";
import { PERSONA_CONTENT } from "@/lib/persona-content";

const ICONS: Record<Persona, typeof Briefcase> = {
  cfo: Briefcase,
  fpa: BarChart3,
  founder: Rocket,
};
const LABELS: Record<Persona, string> = {
  cfo: "CFO",
  fpa: "FP&A",
  founder: "Founder",
};

export default function Hero() {
  const { persona, setPersona, hasPicked } = usePersona();
  const c = PERSONA_CONTENT[persona];

  return (
    <section className="relative gradient-hero overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-10 pb-12 lg:pt-16 lg:pb-14 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          {/* Persona chip toggle — only shown AFTER the user has picked.
              On first visit, the big WhoAmICard above handles selection,
              so the chip would be redundant duplicate UI. */}
          {hasPicked && (
            <div className="inline-flex items-center gap-1 rounded-full bg-white/80 backdrop-blur border border-surface-200 p-1 mb-5">
              {(Object.keys(LABELS) as Persona[]).map((p) => {
                const active = p === persona;
                const Icon = ICONS[p];
                return (
                  <button
                    key={p}
                    onClick={() => setPersona(p)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                      active
                        ? "bg-theme-accent text-white shadow-card"
                        : "text-slate-600 hover:text-theme-accent"
                    }`}
                    aria-pressed={active}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {LABELS[p]}
                  </button>
                );
              })}
            </div>
          )}

          <div className="inline-flex items-center gap-2.5 rounded-full bg-theme-accent-soft text-theme-accent-deep px-5 py-2.5 text-base lg:text-lg font-bold tracking-tight mb-6">
            <Sparkles className="w-5 h-5" strokeWidth={2.5} />
            Agentic Finance
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={persona}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="font-display font-bold tracking-tight text-slate-900 text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-balance">
                {c.heroH1Line1}
                <br />
                <span style={{ color: "var(--theme-text-emphasis)" }}>{c.heroH1Line2}</span>
              </h1>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
                {c.heroSubhead}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <Link
              href={c.heroPrimaryCTA.href}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-theme-accent hover:bg-theme-accent-hover text-white font-semibold px-6 py-3.5 transition-colors shadow-card hover:shadow-card-hover"
            >
              {c.heroPrimaryCTA.label}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={c.heroSecondaryCTA.href}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-surface-50 text-slate-900 font-semibold px-6 py-3.5 border border-surface-200 transition-colors"
            >
              {c.heroSecondaryCTA.label}
            </a>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-theme-accent transition-colors"
            >
              <PlayCircle className="w-4 h-4" />
              Watch a 60-second walkthrough
            </Link>
            <a
              href="https://wizard.nashos.ai"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-theme-accent transition-colors"
            >
              <Wand2 className="w-4 h-4" />
              Try the setup demo
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <VideoOrMockup
            videoSrc="/videos/dashboard.mp4"
            ariaLabel="NashOS executive dashboard live demo"
          >
            <LiveDashboard />
          </VideoOrMockup>
        </motion.div>
      </div>

      <div className="border-t border-surface-200 bg-white/60 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 lg:py-6">
          <AnimatePresence mode="wait">
            <motion.ul
              key={persona}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-3 gap-4 lg:gap-12 lg:flex lg:items-center lg:justify-start"
            >
              {c.stats.map((s) => (
                <li key={s.label} className="flex items-baseline gap-2.5">
                  <span
                    className="font-display font-bold text-2xl lg:text-3xl tabular-nums leading-none"
                    style={{ color: "var(--theme-text-emphasis)" }}
                  >
                    {s.stat}
                  </span>
                  <span className="text-xs lg:text-sm text-slate-500 leading-tight">
                    {s.label}
                  </span>
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
