"use client";

import { motion } from "framer-motion";
import VideoOrMockup from "@/components/animated/VideoOrMockup";
import LiveWhatIf from "@/components/animated/LiveWhatIf";

export default function WhatIfBand() {
  return (
    <section className="bg-white py-20 lg:py-24 border-t border-surface-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-semibold text-accent-amber uppercase tracking-wider mb-3">
            What-If scenarios
          </p>
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-slate-900 tracking-tight text-balance">
            Move the slider. Watch the plan recompute.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Test a 30% revenue drop, a hiring freeze, or a product launch — at any account, any
            period. Variance results land in under a second. Save the scenario or throw it away.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-amber" />
              Percent · absolute · override adjustments
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-amber" />
              Compare scenarios side-by-side
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-amber" />
              Audit log captures every assumption you tried
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <VideoOrMockup
            videoSrc="/videos/what-if.mp4"
            ariaLabel="What-if scenario slider live demo"
          >
            <LiveWhatIf />
          </VideoOrMockup>
        </motion.div>
      </div>
    </section>
  );
}
