import { Link } from "@tanstack/react-router";
import {
  Brain,
  Activity,
  Sparkles,
  ShieldCheck,
  Database,
  Plug,
  Play,
} from "lucide-react";

const systems = [
  {
    icon: Brain,
    title: "Decision System",
    line: "Understands the business — P&L, Balance Sheet, Cash Flow as one model with variance, drivers, and drill-down to source of truth.",
  },
  {
    icon: Activity,
    title: "Continuous Planning",
    line: "Keeps it current — driver-based planning, scenarios, what-ifs and continuous recomputation across the model.",
  },
  {
    icon: Sparkles,
    title: "Agentic Execution",
    line: "Turns intent into action. Ask in plain English; the system plans, drafts, confirms and commits.",
  },
  {
    icon: ShieldCheck,
    title: "Audit & Control",
    line: "Every change trustworthy — before/after on every write, full history, traceability and role-based control.",
  },
  {
    icon: Database,
    title: "Data Foundation",
    line: "Holds it together — multi-entity, multi-currency, shared dimensions, consistent computation everywhere.",
  },
  {
    icon: Plug,
    title: "Integrations",
    line: "Connects Nash to your data — APIs, SFTP, CSV, Excel, validated on every run with full run history.",
  },
];

export function InsideNashSection() {
  return (
    <section id="inside-nash" className="relative scroll-mt-24 border-t border-border/40 overflow-hidden">
      {/* Soft radial gradient blooms behind the grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-1/4 h-[520px] w-[520px] rounded-full opacity-40"
        style={{ background: "var(--gradient-radial-gold)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-[10%] h-[460px] w-[460px] rounded-full opacity-30"
        style={{ background: "var(--gradient-radial-gold)" }}
      />

      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-12 py-24 sm:py-32">
        {/* Header: chip top-left, heading left-aligned, CTA top-right */}
        <div className="flex flex-col gap-8">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <span className="chip">
              <span className="chip-dot" />
              Inside Nash
            </span>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur px-4 py-2 text-xs font-medium text-foreground/85 hover:border-gold/40 hover:text-gold transition-colors"
            >
              <Play className="w-3 h-3 fill-current" />
              See how it works
            </button>
          </div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.02] max-w-4xl">
            Six systems.
            <br />
            <span className="font-serif-accent text-gradient-gold">One operating model.</span>
          </h2>
        </div>

        {/* Borderless grid with cross dividers */}
        <div className="relative mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {systems.map((s, i) => {
            const Icon = s.icon;
            const col = i % 3; // 0,1,2
            const row = Math.floor(i / 3); // 0,1
            const isLastRow = row === 1;
            const isLastCol = col === 2;
            return (
              <div
                key={s.title}
                className={`group relative px-6 lg:px-10 py-12 transition-colors ${
                  !isLastCol ? "lg:border-r" : ""
                } ${!isLastRow ? "lg:border-b" : ""} ${
                  col !== 1 && i < 2 ? "md:border-r" : ""
                } ${i < 4 ? "md:border-b" : ""} border-border/30`}
              >
                {/* Soft hover glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "radial-gradient(circle at 50% 30%, oklch(0.82 0.14 78 / 8%), transparent 70%)" }}
                />
                <div className="relative">
                  <Icon className="w-10 h-10 text-gold" strokeWidth={1.5} />
                  <h3 className="mt-7 text-xl font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-xs">
                    {s.line}
                  </p>
                </div>

                {/* Tiny gold dot at the cross intersection */}
                {col < 2 && row === 0 && (
                  <span
                    aria-hidden
                    className="hidden lg:block absolute -bottom-[3px] -right-[3px] z-10 w-1.5 h-1.5 rounded-full bg-gold"
                    style={{ boxShadow: "0 0 8px var(--gold)" }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Footer band */}
        <div className="mt-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-t border-border/30 pt-10">
          <p className="text-foreground/85 text-[15px] leading-relaxed lg:max-w-3xl">
            Together, these systems operate as one — multi-entity, continuously computed, fully auditable.{" "}
            <span className="font-semibold text-gradient-gold">No handoffs. No sync issues. No rebuilds.</span>
          </p>
          <Link
            to="/try"
            className="btn-gold inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold whitespace-nowrap"
          >
            Try with your data <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
