import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useIsMobile } from "@/hooks/use-mobile";

type StepId = 0 | 1 | 2;

const STEPS = [
  { n: "01", label: "Ask", title: "Ask in plain English", desc: "Live answers on your real model — no stale exports, no ticket queue." },
  { n: "02", label: "Test", title: "Test the decision", desc: "Impact across P&L, Balance Sheet and Cash Flow — instantly." },
  { n: "03", label: "Commit", title: "Commit with audit", desc: "Draft → review → commit. Every change tracked, before/after stored, revertable." },
] as const;

type Answer = {
  tools: string[];
  headline: { label: string; value: number; prefix?: string; suffix?: string }[];
  summary: string;
  rows: { label: string; value: string; pct: number; tone?: "neg" | "pos" | "neutral" }[];
  source: string;
  caveat?: string;
};

const EXAMPLES: { q: string; a: string; answer: Answer }[] = [
  {
    q: "Hire 5 engineers in Q3",
    a: "Runway and EBITDA, instantly.",
    answer: {
      tools: ["query_headcount_plan", "simulate_hires", "recompute_pnl", "recompute_cashflow"],
      headline: [
        { label: "Runway", value: 12.8, suffix: " mo" },
        { label: "Q4 EBITDA", value: -1.1, prefix: "$", suffix: "M" },
      ],
      summary:
        "Adds ~$1.1M fully-loaded cost in Q4 (salary + benefits + equipment). Runway compresses by 1.4 months vs base; cash EoY lands at $42.6M. Within board-approved hiring envelope.",
      rows: [
        { label: "Payroll Δ (Q3→Q4)", value: "+$0.95M", pct: 72, tone: "neg" },
        { label: "Onboarding + equip", value: "+$0.15M", pct: 18, tone: "neg" },
        { label: "Runway Δ", value: "−1.4 mo", pct: 56, tone: "neg" },
        { label: "Capacity Δ (eng-mo)", value: "+12.5", pct: 62, tone: "pos" },
      ],
      source: "Headcount plan v7 · Aug actuals · 3 entities (US/EU/UK) · USD",
      caveat: "Assumes blended $190k loaded cost · ramp = 0.5 in month 1.",
    },
  },
  {
    q: "Why is EBITDA off?",
    a: "Ranked drivers, in seconds.",
    answer: {
      tools: ["variance_analysis", "rank_drivers", "trace_to_source"],
      headline: [
        { label: "EBITDA Δ vs plan", value: -2.4, prefix: "$", suffix: "M" },
        { label: "Margin Δ", value: -3.1, suffix: " pp" },
      ],
      summary:
        "August EBITDA missed plan by $2.4M (−18%). Three drivers explain 91% of the variance — all on the cost side; revenue landed in-line.",
      rows: [
        { label: "AWS overage (EU)", value: "−$1.10M", pct: 46, tone: "neg" },
        { label: "Sales commissions accrual", value: "−$0.72M", pct: 30, tone: "neg" },
        { label: "Contractor spend (US)", value: "−$0.36M", pct: 15, tone: "neg" },
        { label: "Other (FX, true-ups)", value: "−$0.22M", pct: 9, tone: "neg" },
      ],
      source: "GL Aug-close · 3 entities · linked to 1,284 source rows",
      caveat: "Drill-through available on every line · revertable.",
    },
  },
  {
    q: "Re-forecast on new pipeline",
    a: "Recomputed across entities.",
    answer: {
      tools: ["pull_crm_pipeline", "apply_win_rates", "recompute_forecast", "consolidate_fx"],
      headline: [
        { label: "FY ARR (new)", value: 38.4, prefix: "$", suffix: "M" },
        { label: "vs prior fcst", value: 2.6, prefix: "+$", suffix: "M" },
      ],
      summary:
        "New pipeline lifts FY ARR by $2.6M (+7.3%). Lift is concentrated in EU mid-market; US enterprise unchanged. Cash conversion improves by 0.4 months.",
      rows: [
        { label: "EU mid-market", value: "+$1.90M", pct: 73, tone: "pos" },
        { label: "US SMB", value: "+$0.55M", pct: 21, tone: "pos" },
        { label: "UK enterprise", value: "+$0.15M", pct: 6, tone: "pos" },
        { label: "Churn assumption", value: "unchanged", pct: 0, tone: "neutral" },
      ],
      source: "CRM snapshot · win-rate model v3 · FX rates locked Aug-31",
      caveat: "Stage-weighted · excludes deals <$25k ACV.",
    },
  },
];

const AUTO_MS = 7000;

function usePrefersReducedMotion() {
  const [prm, setPrm] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrm(mq.matches);
    const fn = () => setPrm(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return prm;
}

export function FromQtoDSection() {
  const [step, setStep] = useState<StepId>(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [question, setQuestion] = useState(EXAMPLES[0].q);
  const [replayKey, setReplayKey] = useState(0);
  const prm = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  // auto-advance with progress bar
  useEffect(() => {
    if (paused || prm) return;
    setProgress(0);
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / AUTO_MS);
      setProgress(p);
      if (p >= 1) {
        setStep((s) => {
          const ns = ((s + 1) % 3) as StepId;
          // On mobile, when we complete a full flow (2 → 0), cycle to next example.
          if (isMobile && s === 2) {
            setQuestion((q) => {
              const idx = EXAMPLES.findIndex((e) => e.q === q);
              return EXAMPLES[(idx + 1) % EXAMPLES.length].q;
            });
          }
          return ns;
        });
      } else raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [step, paused, prm, replayKey, isMobile]);

  // Briefly pause after an explicit user click so they can read the result, then resume.
  useEffect(() => {
    if (!paused || prm) return;
    const id = setTimeout(() => setPaused(false), 6000);
    return () => clearTimeout(id);
  }, [paused, prm, replayKey]);

  const goto = (s: StepId) => {
    setStep(s);
    setReplayKey((k) => k + 1);
    setProgress(0);
    setPaused(true);
  };
  const next = () => goto(((step + 1) % 3) as StepId);

  return (
    <section
      id="from-q-to-d"
      className="theme-light relative scroll-mt-24"
    >
      <div aria-hidden className="pointer-events-none absolute -top-40 right-[-10%] h-[700px] w-[700px] rounded-full" style={{ background: "var(--gradient-radial-gold)" }} />
      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-10 py-12 sm:py-16">
        <div className="text-center">
          <span className="chip"><span className="chip-dot pulse-dot" />From Q to D</span>
          <h2 className="mt-7 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.02]">
            Finance is about decisions.
            <br />
            <span className="font-serif-accent text-gradient-gold">Not reports.</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Ask. Test. Commit. One continuous loop — every figure traceable, every assumption explicit.
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-14 flex justify-center">
          <div className="surface-card inline-flex p-1.5 gap-1">
            {STEPS.map((s, i) => {
              const active = i === step;
              return (
                <button
                  key={s.n}
                  onClick={() => goto(i as StepId)}
                  className={`relative px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <span className="font-mono text-[11px] mr-2 text-gold/80">{s.n}</span>
                  {s.label}
                  {active && (
                    <span className="absolute left-2 right-2 -bottom-px h-px bg-gold/20 overflow-hidden rounded">
                      <span className="block h-full bg-gold" style={{ width: `${progress * 100}%` }} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Prompt bar — prominent, drives the demo */}
        <div className="mt-10 mx-auto max-w-3xl hidden sm:block">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="text-[10px] tracking-[0.3em] uppercase text-gold/90 font-medium flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold pulse-dot" />
              Try a real question
            </div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground hidden sm:block">
              Click to run ↓
            </div>
          </div>
          <div className="surface-card p-2.5 sm:p-3 flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
            {EXAMPLES.map((e) => {
              const active = e.q === question && step === 0;
              return (
                <button
                  key={e.q}
                  onClick={() => { setQuestion(e.q); goto(0); }}

                  className={`group flex-1 rounded-xl border px-4 py-3 text-sm text-left transition-all ${active ? "border-gold bg-gold/10 text-foreground shadow-[0_0_0_1px_var(--gold)]" : "border-border bg-background/40 text-foreground/80 hover:text-foreground hover:border-gold/50 hover:bg-gold/5"}`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`font-mono text-xs shrink-0 ${active ? "text-gold" : "text-gold/70 group-hover:text-gold"}`}>→</span>
                    <span className="truncate">"{e.q}"</span>
                  </div>
                  <div className={`mt-1 ml-6 text-[11px] truncate ${active ? "text-muted-foreground" : "text-muted-foreground/70"}`}>
                    {e.a}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Console */}
        <div className="relative mt-6 surface-card overflow-hidden">
          <div aria-hidden className="absolute inset-0 grid-bg opacity-60" />
          <div className="relative grid lg:grid-cols-[1fr_1.4fr] min-h-[480px]">
            {/* Left rail */}
            <div key={`L-${step}-${replayKey}`} className="step-in relative p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-border">
              <div className="flex items-center gap-2 text-gold text-[11px] tracking-[0.25em] font-mono">
                <span>{STEPS[step].n} / {STEPS[step].label.toUpperCase()}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-gold pulse-dot" />
              </div>
              <h3 className="mt-5 text-2xl lg:text-3xl font-semibold leading-tight">{STEPS[step].title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-md">{STEPS[step].desc}</p>

              <ul className="mt-7 space-y-2.5 text-sm">
                {step === 0 && [
                  "Type any question — multi-entity aware",
                  "Live answer cites source actuals + forecast",
                  "No exports, no stale snapshots",
                ].map((t) => <Bullet key={t}>{t}</Bullet>)}
                {step === 1 && [
                  "Drag the slider — model recomputes",
                  "Δ across P&L, Balance Sheet, Cash",
                  "Side-by-side vs base scenario",
                ].map((t) => <Bullet key={t}>{t}</Bullet>)}
                {step === 2 && [
                  "Draft → review → commit workflow",
                  "Before/after diff stored, revertable",
                  "Tied to user, time, and source rows",
                ].map((t) => <Bullet key={t}>{t}</Bullet>)}
              </ul>

              <div className="mt-9 flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5">
                  {STEPS.map((_, i) => (
                    <span key={i} className={`h-1 rounded-full transition-all ${i === step ? "w-8 bg-gold" : "w-3 bg-border"}`} />
                  ))}
                </div>
                <button
                  onClick={next}
                  className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/5 px-3.5 py-1.5 text-xs font-medium text-foreground hover:bg-gold/10 hover:border-gold transition-colors"
                >
                  {step === 2 ? <>Replay <span aria-hidden>↻</span></> : <>Next step <span aria-hidden>→</span></>}
                </button>
              </div>
            </div>

            {/* Right pane */}
            <div className="relative p-6 lg:p-8 bg-black/20">
              <div key={`R-${step}-${replayKey}`} className="step-in h-full">
                {step === 0 && <AskPane question={question} prm={prm} />}
                {step === 1 && <TestPane prm={prm} />}
                {step === 2 && <CommitPane prm={prm} />}
              </div>
            </div>
          </div>
        </div>



        {/* CTA */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-5 surface-card p-7">
          <div className="text-lg sm:text-xl font-semibold text-center sm:text-left">See it run on your numbers.</div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link to="/try" className="btn-gold inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold whitespace-nowrap">
              Try with your data <span aria-hidden>→</span>
            </Link>
            <a href="#system" className="btn-outline-gold inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold whitespace-nowrap">
              See the system
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-foreground/80">
      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
      <span>{children}</span>
    </li>
  );
}

/* ---------------- ASK ---------------- */

function useTypewriter(text: string, speed = 28, enabled = true) {
  const [out, setOut] = useState(enabled ? "" : text);
  useEffect(() => {
    if (!enabled) { setOut(text); return; }
    setOut("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, enabled]);
  return out;
}

function AskPane({ question, prm }: { question: string; prm: boolean }) {
  const typed = useTypewriter(question, 28, !prm);
  const done = typed === question;
  const answer = useMemo(
    () => EXAMPLES.find((e) => e.q === question)?.answer ?? EXAMPLES[0].answer,
    [question],
  );
  const [phase, setPhase] = useState<"typing" | "thinking" | "tools" | "answer">(prm ? "answer" : "typing");

  useEffect(() => {
    if (prm) { setPhase("answer"); return; }
    setPhase("typing");
  }, [question, prm]);

  useEffect(() => {
    if (prm || !done) return;
    const t1 = setTimeout(() => setPhase("thinking"), 300);
    const t2 = setTimeout(() => setPhase("tools"), 900);
    const t3 = setTimeout(() => setPhase("answer"), 900 + answer.tools.length * 220 + 400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [done, prm, answer.tools.length]);

  return (
    <div className="flex flex-col gap-3 h-full">
      <PaneHeader label="chat · nash · finance assistant" right={<span className="font-mono text-[11px] text-gold">live</span>} />
      <div className="flex-1 space-y-3 overflow-y-auto pr-1">
        <Bubble who="You">
          {typed}
          {!done && !prm && <span className="caret" />}
        </Bubble>

        {phase === "thinking" && (
          <Bubble who="Nash">
            <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
          </Bubble>
        )}

        {(phase === "tools" || phase === "answer") && (
          <Bubble who="Nash">
            <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1.5">
              Calling tools
            </div>
            <div className="flex flex-wrap gap-1.5">
              {answer.tools.map((t, i) => (
                <span
                  key={t}
                  className="row-in inline-flex items-center gap-1.5 rounded-md border border-gold/30 bg-gold/5 px-2 py-1 font-mono text-[10px] text-gold"
                  style={{ animationDelay: prm ? "0ms" : `${i * 220}ms` }}
                >
                  <span className="h-1 w-1 rounded-full bg-gold" />
                  {t}()
                </span>
              ))}
            </div>
          </Bubble>
        )}

        {phase === "answer" && (
          <Bubble who="Nash" gold>
            <div className="flex flex-wrap gap-x-5 gap-y-1.5">
              {answer.headline.map((h) => (
                <div key={h.label} className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{h.label}</span>
                  <span className="text-base">
                    <CountUp to={h.value} prefix={h.prefix} suffix={h.suffix} prm={prm} />
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm text-foreground/85 leading-relaxed">{answer.summary}</p>

            <div className="mt-3 space-y-1.5">
              {answer.rows.map((r, i) => (
                <div
                  key={r.label}
                  className="row-in flex items-center gap-3 text-xs"
                  style={{ animationDelay: prm ? "0ms" : `${i * 90}ms` }}
                >
                  <span className="w-40 shrink-0 text-muted-foreground">{r.label}</span>
                  <div className="flex-1 h-1 rounded-full bg-border overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        r.tone === "pos"
                          ? "bg-gradient-to-r from-[var(--gold-soft)] to-[var(--gold)]"
                          : r.tone === "neg"
                          ? "bg-gradient-to-r from-[var(--gold)]/60 to-[var(--gold)]"
                          : "bg-border"
                      }`}
                      style={{ width: `${r.pct}%` }}
                    />
                  </div>
                  <span className="w-24 text-right font-mono tabular-nums text-foreground/90">{r.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-3 text-[11px] text-muted-foreground border-t border-border pt-2">
              <div><span className="text-gold/80 font-mono">source ·</span> {answer.source}</div>
              {answer.caveat && <div className="mt-0.5"><span className="text-gold/80 font-mono">note ·</span> {answer.caveat}</div>}
            </div>
          </Bubble>
        )}
      </div>
      <div className="rounded-lg border border-border bg-black/30 px-3 py-2 flex items-center gap-2 text-xs text-muted-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-gold pulse-dot" />
        Connected to ledger · 3 entities · USD/EUR · audit on
      </div>
    </div>
  );
}

function CountUp({ to, prefix = "", suffix = "", prm = false }: { to: number; prefix?: string; suffix?: string; prm?: boolean }) {
  const [v, setV] = useState(prm ? to : 0);
  useEffect(() => {
    if (prm) { setV(to); return; }
    const start = performance.now();
    const dur = 700;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setV(+(to * (1 - Math.pow(1 - p, 3))).toFixed(1));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, prm]);
  return <span className="font-semibold text-gradient-gold">{prefix}{v}{suffix}</span>;
}

/* ---------------- TEST ---------------- */

function TestPane({ prm }: { prm: boolean }) {
  const [hires, setHires] = useState(5);
  const deltas = useMemo(() => {
    const r = -(hires * 0.28);          // months
    const e = -(hires * 0.22);          // $M
    const c = -(hires * 1.12);          // $M
    return {
      runway: r.toFixed(1),
      ebitda: e.toFixed(1),
      cash: c.toFixed(1),
      runwayPct: Math.min(100, Math.abs(r) / 4 * 100),
      ebitdaPct: Math.min(100, Math.abs(e) / 3 * 100),
      cashPct: Math.min(100, Math.abs(c) / 12 * 100),
    };
  }, [hires]);

  return (
    <div className="flex flex-col gap-4 h-full">
      <PaneHeader label="scenario · WHATIF_Q3_HIRE" right={<span className="font-mono text-[11px] text-gold">live</span>} />

      <div className="rounded-xl border border-border bg-card/40 p-4">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground uppercase tracking-wider">Hires in Q3</span>
          <span className="font-mono text-gradient-gold text-base">+{hires}</span>
        </div>
        <input
          type="range"
          min={1}
          max={10}
          value={hires}
          onChange={(e) => setHires(+e.target.value)}
          className="mt-3 w-full accent-[var(--gold)]"
        />
        <div className="flex justify-between text-[10px] font-mono text-muted-foreground mt-1.5">
          <span>1</span><span>5</span><span>10</span>
        </div>
      </div>

      <div className="space-y-2.5">
        <DeltaRow key={`r-${hires}`} label="Runway Δ" value={`${deltas.runway} mo`} pct={deltas.runwayPct} delay={0} prm={prm} />
        <DeltaRow key={`e-${hires}`} label="EBITDA Q4 Δ" value={`$${deltas.ebitda}M`} pct={deltas.ebitdaPct} delay={120} prm={prm} />
        <DeltaRow key={`c-${hires}`} label="Cash EoP Δ" value={`$${deltas.cash}M`} pct={deltas.cashPct} delay={240} prm={prm} />
      </div>

      <div className="mt-auto text-[11px] text-muted-foreground font-mono">
        Recomputed across <span className="text-gold">3 entities</span> · {hires * 12}k payroll/mo · base FY26
      </div>
    </div>
  );
}

function DeltaRow({ label, value, pct, delay, prm }: { label: string; value: string; pct: number; delay: number; prm: boolean }) {
  return (
    <div className="row-in rounded-xl border border-border bg-card/40 px-4 py-3" style={{ animationDelay: prm ? "0ms" : `${delay}ms` }}>
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</span>
        <span className="font-semibold text-gradient-gold tabular-nums">{value}</span>
      </div>
      <div className="mt-2 h-1 rounded-full bg-border overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[var(--gold-soft)] to-[var(--gold)] transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/* ---------------- COMMIT ---------------- */

const LOG_LINES = [
  { t: "audit_log: INSERT scenario=WHATIF_Q3_HIRE5", c: "gold" },
  { t: "↳ user=admin · before/after stored", c: "muted" },
  { t: "↳ diff: 1,284 cells · 3 entities", c: "muted" },
  { t: "↳ revertable · auditId=8842", c: "muted" },
] as const;

function CommitPane({ prm }: { prm: boolean }) {
  const [shown, setShown] = useState(prm ? LOG_LINES.length : 0);
  const [committed, setCommitted] = useState(false);
  const flashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prm) return;
    setShown(0);
    setCommitted(false);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setShown(i);
      if (i >= LOG_LINES.length) clearInterval(id);
    }, 450);
    return () => clearInterval(id);
  }, [prm]);

  const onCommit = () => {
    setCommitted(true);
    flashRef.current?.classList.remove("border-flash");
    void flashRef.current?.offsetWidth;
    flashRef.current?.classList.add("border-flash");
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <PaneHeader label="terminal · audit" right={<span className="font-mono text-[11px] text-muted-foreground">~/nash</span>} />

      <div ref={flashRef} className="flex-1 rounded-xl border border-border bg-black/60 p-4 font-mono text-[12px] leading-relaxed">
        {LOG_LINES.slice(0, shown).map((l, i) => (
          <div key={i} className={`row-in ${l.c === "gold" ? "text-gold" : "text-muted-foreground"}`}>
            {l.t}
          </div>
        ))}
        {committed && (
          <div className="row-in text-gold mt-1">✓ committed · scenario applied to base</div>
        )}
        {shown === LOG_LINES.length && !committed && <span className="caret" />}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onCommit}
          disabled={committed || shown < LOG_LINES.length}
          className="btn-gold inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {committed ? "Committed" : "Commit scenario"} <span aria-hidden>{committed ? "✓" : "→"}</span>
        </button>
        <button className="btn-outline-gold inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold">
          Revert
        </button>
      </div>
    </div>
  );
}

/* ---------------- shared ---------------- */

function PaneHeader({ label, right }: { label: string; right?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-gold pulse-dot" />
        {label}
      </div>
      {right}
    </div>
  );
}

function Bubble({ who, children, gold = false }: { who: string; children: React.ReactNode; gold?: boolean }) {
  return (
    <div className={`rounded-xl border px-3.5 py-2.5 ${gold ? "border-gold/40 bg-gold/5" : "border-border bg-card/60"}`}>
      <div className="text-[10px] font-mono uppercase tracking-wider text-gold/80">{who}</div>
      <div className="text-sm mt-0.5 text-foreground/90 min-h-[1.25rem]">{children}</div>
    </div>
  );
}
