"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { DEMO_MAILTO } from "@/lib/constants";
import VideoOrMockup from "@/components/animated/VideoOrMockup";
import LiveDashboard from "@/components/animated/LiveDashboard";

export default function Hero() {
  return (
    <section className="relative gradient-hero overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-24 lg:pt-20 lg:pb-32 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
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
            Close the books in days.
            <br />
            <span className="text-brand-600">Forecast in minutes.</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
            AI-native FP&amp;A for finance leaders who are tired of Excel gymnastics. Drivers,
            forecasts, what-ifs, audit trail — all in one tool, all driven by plain-English chat.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href={DEMO_MAILTO}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold px-6 py-3.5 transition-colors shadow-card hover:shadow-card-hover"
            >
              Book a 15-min demo
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#features"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-surface-50 text-slate-900 font-semibold px-6 py-3.5 border border-surface-200 transition-colors"
            >
              See it in action ↓
            </a>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            Built by ex-FP&amp;A operators. Live in hours, not months.
          </p>
        </motion.div>

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
    </section>
  );
}
