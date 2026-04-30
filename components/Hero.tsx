"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, PlayCircle, Briefcase, BarChart3, Rocket } from "lucide-react";
import Link from "next/link";
import { DEMO_MAILTO } from "@/lib/constants";
import VideoOrMockup from "@/components/animated/VideoOrMockup";
import LiveDashboard from "@/components/animated/LiveDashboard";

type Audience = "cfo" | "fpa" | "founder";

const AUDIENCES: { id: Audience; label: string; Icon: typeof Briefcase; subhead: string }[] = [
  {
    id: "cfo",
    label: "CFO",
    Icon: Briefcase,
    subhead:
      "Plain-English answers to the questions your board is asking weekly. Audit-grade trail on every change. Pre-IPO ready on day one.",
  },
  {
    id: "fpa",
    label: "FP&A",
    Icon: BarChart3,
    subhead:
      "For finance teams tired of Excel gymnastics. 35+ AI tools, 15 forecast algorithms, and a plain-English agent that drafts every change before it commits.",
  },
  {
    id: "founder",
    label: "Founder",
    Icon: Rocket,
    subhead:
      "Cut your close from days to hours. Run runway scenarios in real time. Built so a non-FP&A founder can self-serve — no model-builder team required.",
  },
];

const stats = [
  { stat: "35+", label: "AI tools" },
  { stat: "15", label: "Forecast algorithms" },
  { stat: "4 days", label: "vs 12-day close" },
];

const switchingFrom = [
  "Anaplan",
  "Adaptive",
  "Oracle EPM",
  "OneStream",
  "SAP BPC",
  "Microsoft BI",
  "Vena",
  "Cube",
  "Excel",
];

export default function Hero() {
  const [audience, setAudience] = useState<Audience>("fpa");
  const subhead = AUDIENCES.find((a) => a.id === audience)?.subhead ?? AUDIENCES[1].subhead;

  return (
    <section className="relative gradient-hero overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-10 pb-12 lg:pt-16 lg:pb-14 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* LEFT — copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          {/* Use-case toggle (C) */}
          <div className="inline-flex items-center gap-1 rounded-full bg-white/80 backdrop-blur border border-surface-200 p-1 mb-5">
            {AUDIENCES.map((a) => {
              const active = a.id === audience;
              return (
                <button
                  key={a.id}
                  onClick={() => setAudience(a.id)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    active
                      ? "bg-brand-500 text-white shadow-card"
                      : "text-slate-600 hover:text-brand-600"
                  }`}
                  aria-pressed={active}
                >
                  <a.Icon className="w-3.5 h-3.5" />
                  {a.label}
                </button>
              );
            })}
          </div>

          {/* Bigger AI-native FP&A treatment */}
          <div className="inline-flex items-center gap-2.5 rounded-full bg-brand-100 text-brand-700 px-5 py-2.5 text-base lg:text-lg font-bold tracking-tight mb-6">
            <Sparkles className="w-5 h-5" strokeWidth={2.5} />
            AI-native FP&amp;A
          </div>
          <h1 className="font-display font-bold tracking-tight text-slate-900 text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-balance">
            Close in 4 days, not 12.
            <br />
            <span className="text-brand-600">Forecast in minutes.</span>
          </h1>
          <motion.p
            key={audience}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl"
          >
            {subhead}
          </motion.p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <Link
              href="/demo"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold px-6 py-3.5 transition-colors shadow-card hover:shadow-card-hover"
            >
              Try the live demo
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={DEMO_MAILTO}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-surface-50 text-slate-900 font-semibold px-6 py-3.5 border border-surface-200 transition-colors"
            >
              Book a 15-min demo
            </a>
          </div>
          {/* Video walkthrough slot (I) — placeholder until founder records the voiceover */}
          <Link
            href="/demo"
            className="mt-4 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-brand-600 transition-colors"
          >
            <PlayCircle className="w-4 h-4" />
            Watch a 60-second walkthrough
          </Link>
        </motion.div>

        {/* RIGHT — animated dashboard */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <VideoOrMockup
            videoSrc="/videos/dashboard.mp4"
            ariaLabel="EPM Lite executive dashboard live demo"
          >
            <LiveDashboard />
          </VideoOrMockup>
        </motion.div>
      </div>

      {/* Switching-from + capability stats band */}
      <div className="border-t border-surface-200 bg-white/60 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 lg:py-6">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2 text-sm">
            <span className="font-semibold text-slate-700 shrink-0">
              Built for teams switching from
            </span>
            <span className="flex flex-wrap items-baseline gap-x-2 gap-y-1 font-mono text-slate-600">
              {switchingFrom.map((name, i) => (
                <span key={name} className="inline-flex items-baseline">
                  {name}
                  {i < switchingFrom.length - 1 && (
                    <span className="ml-2 text-surface-200">·</span>
                  )}
                </span>
              ))}
            </span>
          </div>

          <ul className="mt-4 lg:mt-5 grid grid-cols-3 gap-4 lg:gap-12 lg:flex lg:items-center lg:justify-start">
            {stats.map((s) => (
              <li key={s.label} className="flex items-baseline gap-2.5">
                <span className="font-display font-bold text-2xl lg:text-3xl text-brand-600 tabular-nums leading-none">
                  {s.stat}
                </span>
                <span className="text-xs lg:text-sm text-slate-500 leading-tight">
                  {s.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
