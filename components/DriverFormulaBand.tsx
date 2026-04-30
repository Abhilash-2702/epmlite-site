"use client";

import { motion } from "framer-motion";
import VideoOrMockup from "@/components/animated/VideoOrMockup";
import LiveDriverFormula from "@/components/animated/LiveDriverFormula";
import LiveForecast from "@/components/animated/LiveForecast";

export default function DriverFormulaBand() {
  return (
    <section className="bg-surface-50 py-12 lg:py-14 border-t border-surface-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-12"
        >
          <p className="text-sm font-semibold text-accent-violet uppercase tracking-wider mb-3">
            Drivers + Forecasting
          </p>
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-slate-900 tracking-tight text-balance">
            Write a formula once. Re-plan in seconds.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Connect your business drivers — headcount, units, hours, % — to financial outcomes.
            Then run 15 ML algorithms in one click and pick the winner by R² or MAPE.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <VideoOrMockup
              videoSrc="/videos/driver-formula.mp4"
              ariaLabel="Driver formula live demo"
            >
              <LiveDriverFormula />
            </VideoOrMockup>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <VideoOrMockup
              videoSrc="/videos/forecast.mp4"
              ariaLabel="Forecast comparison live demo"
            >
              <LiveForecast />
            </VideoOrMockup>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
