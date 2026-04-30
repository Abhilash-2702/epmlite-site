"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase, BarChart3, Rocket,
  ShieldCheck, Clock, Zap, FileEdit, Activity, GitBranch,
  TrendingDown, Users, FileText, PieChart, Coins,
} from "lucide-react";
import { usePersona } from "@/components/PersonaContext";

type Card = {
  Icon: typeof Briefcase;
  title: string;
  body: string;
};

const CFO_CARDS: Card[] = [
  {
    Icon: ShieldCheck,
    title: "Audit trail your auditor will love",
    body: "Every dim/fact/formula/user mutation captured with before/after JSON, actor, timestamp. Filterable by table, action, user, date. Pre-IPO compliance on day one.",
  },
  {
    Icon: Clock,
    title: "Board variance pack in 90 minutes",
    body: "The agent ranks top movers by financial impact, drafts paragraph commentary, and assembles the pack PDF. You edit, you don't write from scratch.",
  },
  {
    Icon: FileEdit,
    title: "Approval workflow on every chat write",
    body: "Nothing the LLM says auto-mutates the database. Drafts queue for an approver who reviews + posts. Audit trail captures both.",
  },
  {
    Icon: PieChart,
    title: "Weekly re-forecasts without weekly drama",
    body: "Capital is expensive. Boards want weekly answers. Drivers + 15 forecast algorithms make weekly re-plans cheap to run.",
  },
];

const FPA_CARDS: Card[] = [
  {
    Icon: Zap,
    title: "35+ AI tools cover ~99% of manual actions",
    body: "Read fact tables, draft entries, run forecasts, commit writes, export PDFs — all triggered by plain English. Stop tab-hopping between five tools.",
  },
  {
    Icon: GitBranch,
    title: "Driver-based plan recomputes itself",
    body: "Mark accounts as drivers (FTE, units, %, hours). Write member formulas. Hire 3 engineers? P&L reflows in 2 seconds.",
  },
  {
    Icon: Activity,
    title: "What-if scenarios in under a second",
    body: "Drag a slider. See revenue, EBITDA, runway, cash react. Save the scenario. Compare against budget. Throw it away if it doesn't pan out.",
  },
  {
    Icon: BarChart3,
    title: "15 forecast algorithms · pick the winner",
    body: "ARIMA, Holt-Winters, Random Forest, Gradient Boosting, Neural Net, Ridge, Lasso. R²/RMSE/MAE/MAPE on every run. Lock the winner with a click.",
  },
];

const FOUNDER_CARDS: Card[] = [
  {
    Icon: TrendingDown,
    title: "Runway scenarios in 60 seconds",
    body: "'What's our runway if revenue drops 30%?' is a question, not a project. Get the answer with the waterfall + assumptions in plain English.",
  },
  {
    Icon: Users,
    title: "Hire-3-engineers shows the impact instantly",
    body: "Type the change. See burn rise, runway shorten, cash plot updates. Board gets the answer before you finish the doc.",
  },
  {
    Icon: FileText,
    title: "Board pack drafted, not built",
    body: "Connect your trial balance once. The agent assembles a board-ready P&L, variance commentary, and runway forecast on demand.",
  },
  {
    Icon: Coins,
    title: "No model-builder team required",
    body: "You don't need an FP&A hire to run this. The agent writes the formulas. You ratify them. The plan recomputes when assumptions change.",
  },
];

const PERSONA_DATA = {
  cfo:     { kicker: "FOR CFOs",       title: "What CFOs care about",       cards: CFO_CARDS,     accent: "text-brand-600",    Icon: Briefcase },
  fpa:     { kicker: "FOR FP&A TEAMS", title: "What FP&A teams care about", cards: FPA_CARDS,     accent: "text-accent-emerald", Icon: BarChart3 },
  founder: { kicker: "FOR FOUNDERS",   title: "What founders care about",   cards: FOUNDER_CARDS, accent: "text-accent-violet",  Icon: Rocket    },
} as const;

export default function PersonaPanel() {
  const { persona } = usePersona();
  const data = PERSONA_DATA[persona];

  return (
    <section className="bg-white py-12 lg:py-16 border-b border-surface-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={persona}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className={`inline-flex items-center justify-center w-9 h-9 rounded-lg bg-brand-50 ${data.accent}`}>
                <data.Icon className="w-5 h-5" />
              </span>
              <p className={`text-sm font-semibold uppercase tracking-wider ${data.accent}`}>
                {data.kicker}
              </p>
            </div>
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-slate-900 tracking-tight text-balance max-w-3xl">
              {data.title}
            </h2>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {data.cards.map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="rounded-2xl bg-surface-50 border border-surface-200 p-6 hover:border-brand-200 hover:shadow-card transition-all"
                >
                  <span className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white ${data.accent} mb-4`}>
                    <c.Icon className="w-5 h-5" />
                  </span>
                  <h3 className="font-display font-semibold text-slate-900 text-base leading-snug">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{c.body}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/**
 * Small wrapper that only renders its children when the active persona is
 * one of the allowed list. Used to hide sections like DriverFormulaBand
 * for CFOs who don't write driver formulas.
 */
export function ShowFor({
  personas,
  children,
}: {
  personas: ("cfo" | "fpa" | "founder")[];
  children: React.ReactNode;
}) {
  const { persona } = usePersona();
  if (!personas.includes(persona)) return null;
  return <>{children}</>;
}
