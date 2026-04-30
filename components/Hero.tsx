"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { DEMO_MAILTO } from "@/lib/constants";
import VideoOrMockup from "@/components/animated/VideoOrMockup";
import LiveDashboard from "@/components/animated/LiveDashboard";

const stats = [
  { stat: "35+", label: "AI tools" },
  { stat: "15", label: "Forecast algos" },
  { stat: "9-dim", label: "Cube" },
  { stat: "4 days", label: "vs 12-day close" },
];

const switchingFrom = ["Anaplan", "Adaptive", "Vena", "Cube", "Excel"];

export default function Hero() {
  return (
    <section className="relative gradient-hero overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-20 lg:pt-20 lg:pb-24 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* LEFT — copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-100 text-brand-700 px-3 py-1 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            AI-native FP&amp;A
          </div>
          <h1 className="font-display font-bold tracking-tight text-slate-900 text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-balance">
            Close in 4 days, not 12.
            <br />
            <span className="text-brand-600">Forecast in seconds, not weeks.</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
            AI-native FP&amp;A for finance teams who are tired of Excel gymnastics. 35+ AI tools,
            15 forecast algorithms, and a 9-dimension cube — all driven by plain-English chat.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
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
          <p className="mt-6 text-sm text-slate-500">
            Built by an FP&amp;A operator. Live at epmlite.com today.
          </p>
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
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 grid lg:grid-cols-[auto_1fr] gap-6 lg:gap-12 items-center">
          {/* B · Switching-from */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
            <span className="font-semibold text-slate-700">Built for teams switching from</span>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              {switchingFrom.map((name, i) => (
                <span key={name} className="inline-flex items-center gap-2">
                  <span className="font-mono text-slate-600">{name}</span>
                  {i < switchingFrom.length - 1 && (
                    <span className="text-surface-200">·</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* C · Capability stats */}
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-2 lg:justify-self-end">
            {stats.map((s) => (
              <li
                key={s.label}
                className="flex flex-col lg:items-end"
              >
                <span className="font-display font-bold text-xl lg:text-lg text-brand-600 tabular-nums leading-none">
                  {s.stat}
                </span>
                <span className="text-xs text-slate-500 mt-0.5">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
