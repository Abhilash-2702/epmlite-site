"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  FileSpreadsheet,
  GitBranch,
  Sparkles,
  FlaskConical,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    Icon: BarChart3,
    title: "Executive Dashboard",
    headline: "Real-time KPIs at a glance.",
    body:
      "Revenue, Gross Profit, EBITDA, Net Income, COGS, OPEX. Variance vs Budget on every card. Monthly trend chart, regional breakdown, P&L waterfall, cost structure pie.",
    tone: "text-brand-500 bg-brand-50",
  },
  {
    Icon: FileSpreadsheet,
    title: "P&L · BS · Cash Flow",
    headline: "Canonical reports with full hierarchy.",
    body:
      "Drill from rollups (TOTAL_PL, TOTAL_BS, TOTAL_CF) to leaves. Multi-currency. CSV / Excel / PDF export from any view.",
    tone: "text-brand-500 bg-brand-50",
  },
  {
    Icon: GitBranch,
    title: "Driver-Based Planning",
    headline: "Connect business drivers to financial outcomes.",
    body:
      "Mark any account as a driver. Build formulas like SALARIES_ENG = HEADCOUNT_ENG × −10000. Top-down assumptions flow into P&L automatically.",
    tone: "text-accent-violet bg-violet-50",
  },
  {
    Icon: Sparkles,
    title: "AI Chat",
    headline: "Plain-English finance.",
    body:
      "\"What's our runway?\" \"Hire 3 engineers.\" \"Update JPY rate to 150.\" 35+ tools cover ~99% of manual app actions. Every write previewed in a draft card before commit.",
    tone: "text-accent-emerald bg-emerald-50",
    highlight: true,
  },
  {
    Icon: FlaskConical,
    title: "What-If Scenarios",
    headline: "Test decisions before you make them.",
    body:
      "Percent / absolute / override adjustments at any account × period. Save scenarios, compare, delete when done. Variance results in <1 second.",
    tone: "text-accent-amber bg-amber-50",
  },
  {
    Icon: TrendingUp,
    title: "ML Forecasting",
    headline: "15 algorithms, one click.",
    body:
      "Linear / poly regression, ARIMA / SARIMA, Ridge / Lasso, Random Forest, Gradient Boosting, Neural Net, Holt-Winters. Compare side-by-side with R² / RMSE / MAPE.",
    tone: "text-accent-cyan bg-cyan-50",
  },
];

export default function FeatureGrid() {
  return (
    <section id="features" className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">
            Features
          </p>
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-slate-900 tracking-tight text-balance">
            Everything an FP&amp;A team actually needs.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Forget the 50-feature checklist. These are the six that move the needle.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={`relative rounded-2xl bg-white p-7 shadow-card hover:shadow-card-hover transition-all hover:-translate-y-0.5 ${
                f.highlight
                  ? "border-2 border-accent-emerald/30 ring-4 ring-accent-emerald/10"
                  : "border border-surface-200"
              }`}
            >
              {f.highlight && (
                <span className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-accent-emerald text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5">
                  <Sparkles className="w-3 h-3" />
                  AI
                </span>
              )}
              <span className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${f.tone}`}>
                <f.Icon className="w-5 h-5" />
              </span>
              <h3 className="mt-5 font-display font-semibold text-lg text-slate-900">
                {f.title}
              </h3>
              <p className="mt-1 font-display text-sm font-medium text-slate-700">
                {f.headline}
              </p>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
