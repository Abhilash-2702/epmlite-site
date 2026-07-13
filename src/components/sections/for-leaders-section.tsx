import { Link } from "@tanstack/react-router";

const cards = [
  {
    role: "CFO",
    sub: "Control + Audit",
    headline: "Board-ready numbers, fully audited — zero rebuilds.",
    bullets: ["Full audit on every write", "Defensible forecasts", "Board-grade governance"],
    cta: "Explore Nash for CFO",
    mock: (
      <div className="rounded-xl border border-border bg-black/50 p-3 font-mono text-[11px] space-y-1">
        <div className="flex items-center justify-between text-muted-foreground text-[10px] uppercase tracking-wider mb-1">
          <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-gold pulse-dot" />audit_log · live</span>
          <span>tail -f</span>
        </div>
        {[
          ["11:42:18", "COMMIT", "forecast FY26 Q3 · admin"],
          ["12:01:09", "INSERT", "dim_account · OPEX_RND"],
          ["12:04:31", "INSERT", "scenario=WHATIF_Q3"],
          ["12:06:18", "UPDATE", "REV_SAAS · +$2.1M"],
          ["12:08:42", "COMMIT", "forecast FY27 · admin"],
        ].map(([t, op, msg]) => (
          <div key={t} className="flex gap-2 text-foreground/70">
            <span className="text-muted-foreground">{t}</span>
            <span className="text-gold">{op}</span>
            <span className="truncate">{msg}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    role: "FP&A",
    sub: "Continuous Planning",
    headline: "Planning as a continuous system — not a monthly cycle.",
    bullets: ["Scenarios update instantly", "No model rebuilds", "Driver-based multi-entity rollups"],
    cta: "Try with your data",
    badge: "Most teams",
    highlight: true,
    mock: (
      <div className="rounded-xl border border-gold/30 bg-card/60 p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[10px] font-mono text-gold uppercase tracking-wider font-bold">Scenario · Q3 hire pace</div>
          <div className="text-[10px] font-mono text-muted-foreground">recompute · live</div>
        </div>
        <div className="relative h-1.5 rounded-full bg-card mb-2">
          <div className="absolute inset-0 rounded-full" style={{ background: "var(--gradient-gold)" }} />
          <div className="absolute -top-1.5 left-[55%] w-4 h-4 rounded-full bg-foreground border-2 border-gold" />
        </div>
        <div className="flex justify-between text-[9px] font-mono text-muted-foreground mb-3">
          <span>0 hires</span><span>10 hires</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {[["Runway", "12.8mo"], ["Burn", "$15.6M"], ["EBITDA", "−$1.1M"]].map(([k, v]) => (
            <div key={k} className="rounded-md border border-border bg-card/40 p-1.5 text-center">
              <div className="text-[8px] uppercase tracking-wider text-muted-foreground">{k}</div>
              <div className="text-xs font-semibold text-gradient-gold mt-0.5">{v}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    role: "Founder",
    sub: "Real-time clarity",
    headline: "Know your runway instantly — no need to ask finance.",
    bullets: ["Real-time clarity", "Decisions in minutes", "Self-serve burn + runway"],
    cta: "Explore Nash for founders",
    mock: (
      <div className="rounded-xl border border-border bg-card/60 p-4">
        <div className="flex items-center justify-between mb-1">
          <div className="text-[10px] font-mono text-gold uppercase tracking-wider font-bold">Current runway</div>
          <span className="inline-flex items-center gap-1 text-[9px] font-mono text-muted-foreground uppercase">
            <span className="h-1 w-1 rounded-full bg-gold pulse-dot" />live
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-semibold text-gradient-gold">14.2</span>
          <span className="text-base font-semibold text-muted-foreground">months</span>
          <span className="ml-auto text-[10px] font-mono text-gold">+1.4 mo QoQ ↗</span>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-3">
          {[["Cash", "$211M"], ["Burn", "$14.8M/mo"]].map(([k, v]) => (
            <div key={k} className="text-[11px]">
              <span className="text-muted-foreground font-mono uppercase tracking-wider text-[9px]">{k}</span>
              <span className="ml-1 font-semibold">{v}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
] as const;

export function ForLeadersSection() {
  return (
    <section id="for-leaders" className="theme-light relative scroll-mt-24 border-t border-border/40">
      <div aria-hidden className="pointer-events-none absolute -top-20 left-[-10%] h-[600px] w-[600px] rounded-full" style={{ background: "var(--gradient-radial-gold)", opacity: 0.5 }} />
      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-10 py-12 sm:py-16">
        <div className="text-center">
          <span className="chip"><span className="chip-dot pulse-dot" />Built for finance leaders</span>
          <h2 className="mt-7 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.02]">
            Built for the way finance.
            <br />
            <span className="font-serif-accent text-gradient-gold">Actually works.</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Same system, three lenses — each tuned to what your role needs to ship today.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {cards.map((c) => (
            <div
              key={c.role}
              className="surface-card relative p-7 flex flex-col"
              style={"highlight" in c && c.highlight ? { boxShadow: "var(--shadow-gold)", borderColor: "rgba(43,97,162,0.5)" } : undefined}
            >
              {"badge" in c && c.badge && (
                <span className="absolute top-4 right-4 chip" style={{ padding: ".25rem .6rem" }}>{c.badge}</span>
              )}
              <div className="flex items-center gap-3 mb-4">
                <span className="w-11 h-11 rounded-xl flex items-center justify-center font-semibold" style={{ background: "var(--gradient-gold)", color: "var(--primary-foreground)" }}>
                  {c.role[0]}
                </span>
                <div>
                  <div className="text-xl font-semibold">{c.role}</div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">{c.sub}</div>
                </div>
              </div>
              <p className="font-semibold text-[17px] leading-snug">{c.headline}</p>
              <div className="mt-4">{c.mock}</div>
              <ul className="mt-5 space-y-1.5 text-sm text-muted-foreground flex-1">
                {c.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2"><span className="text-gold mt-0.5">✓</span>{b}</li>
                ))}
              </ul>
              <Link to="/try" className="mt-6 inline-flex items-center gap-2 text-gold hover:underline font-semibold text-sm">
                {c.cta} <span aria-hidden>→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
