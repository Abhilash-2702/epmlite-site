import { useEffect, useRef, useState } from "react";

const legacy = ["Planning", "Close", "Reporting", "Scenarios", "Data", "Governance", "Consolidation", "Allocations"];
const nash = ["Decision System", "Continuous Planning", "Data Foundation", "Audit & Control", "Agentic Execution"];

const before = ["Build", "Model", "Scenario", "Export", "Rework"];
const now = [
  { n: "1", t: "Ask", s: "~5s" },
  { n: "2", t: "System executes", s: "~30s" },
  { n: "3", t: "Draft → Commit", s: "~25s" },
];

const impact = [
  { k: "Close cycle", from: "11 days", to: "4 days", note: "Compressed from ~11 days to ~4 days." },
  { k: "Variance analysis", from: "40 hours", to: "90 min", note: "Variance pack in ~90 mins." },
  { k: "Forecasting", from: "Periodic", to: "Continuous", note: "Instant recompute across drivers." },
  { k: "Decisions", from: "Manual", to: "System", note: "Drafted, reviewed, fully auditable." },
];

const STEPS = [
  { n: "01", label: "Collapse", tag: "8 modules → 5 systems" },
  { n: "02", label: "Compression", tag: "14 days → 1 minute" },
  { n: "03", label: "Impact", tag: "Cycles → continuous" },
] as const;

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

export function SystemSection() {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [replayKey, setReplayKey] = useState(0);
  const prm = usePrefersReducedMotion();

  // Auto-advance with progress bar
  useEffect(() => {
    if (prm || paused) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / AUTO_MS, 1);
      setProgress(p);
      if (p >= 1) {
        setStep((s) => ((s + 1) % 3) as 0 | 1 | 2);
        setReplayKey((k) => k + 1);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [step, paused, prm]);

  const select = (i: 0 | 1 | 2) => {
    setStep(i);
    setProgress(0);
    setReplayKey((k) => k + 1);
  };

  return (
    <section
      id="system"
      className="relative scroll-mt-24 border-t border-border/40"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div aria-hidden className="pointer-events-none absolute -top-40 left-[-10%] h-[600px] w-[600px] rounded-full opacity-30" style={{ background: "var(--gradient-radial-gold)" }} />
      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-10 py-12 sm:py-16">
        <div className="text-center">
          <span className="chip"><span className="chip-dot" />Architecture</span>
          <h2 className="mt-7 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.02]">
            From modules.
            <br />
            <span className="font-serif-accent text-gradient-gold">To a system.</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Most EPM tools sell you modules. NashOS gives you one system that operates as one.
          </p>
        </div>

        {/* Stepper (horizontal on mobile, vertical on lg+) + canvas */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[220px_1fr] items-start">
          {/* Horizontal stepper — mobile/tablet only */}
          <div className="relative lg:hidden">
            {/* Connector segments — between circles only, never crossing them */}
            {[0, 1].map((i) => {
              const fill = i < step ? 1 : i === step ? Math.max(0, Math.min(1, progress)) : 0;
              return (
                <div
                  key={i}
                  aria-hidden
                  className="absolute top-5 h-px bg-border overflow-hidden"
                  style={{
                    left: `calc(${((i + 0.5) / 3) * 100}% + 20px)`,
                    width: `calc(${(1 / 3) * 100}% - 40px)`,
                  }}
                >
                  <div
                    className="h-full bg-gradient-to-r from-gold to-gold/60 transition-[width] duration-200"
                    style={{ width: `${fill * 100}%` }}
                  />
                </div>
              );
            })}
            <ul className="grid grid-cols-3 gap-2">
              {STEPS.map((s, i) => {
                const active = step === i;
                const done = i < step;
                return (
                  <li key={s.n}>
                    <button
                      onClick={() => select(i as 0 | 1 | 2)}
                      aria-current={active ? "step" : undefined}
                      className="group relative flex flex-col items-center text-center w-full"
                    >
                      <span
                        className={`relative z-10 flex shrink-0 items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                          active
                            ? "border-gold/20 bg-card text-gold scale-110"
                            : done
                            ? "border-gold/60 bg-gold/10 text-gold"
                            : "border-border bg-card text-muted-foreground"
                        }`}
                        style={active ? { boxShadow: "var(--shadow-gold)" } : undefined}
                      >
                        {done ? (
                          <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 8.5L6.5 12L13 4.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        ) : (
                          <span className="font-mono text-[11px] font-bold">{s.n}</span>
                        )}
                      </span>
                      <div className={`mt-2 text-xs font-semibold transition-colors ${active ? "text-foreground" : done ? "text-foreground/70" : "text-muted-foreground"}`}>
                        {s.label}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Vertical stepper — lg+ only */}
          <div className="relative hidden lg:block lg:sticky lg:top-28">
            <ul className="space-y-8">
              {STEPS.map((s, i) => {
                const active = step === i;
                const done = i < step;
                const connectorFill = i < step ? 1 : i === step ? Math.max(0, Math.min(1, progress)) : 0;
                return (
                  <li key={s.n} className="relative">
                    {i < STEPS.length - 1 && (
                      <div aria-hidden className="absolute left-5 top-10 h-8 w-px -translate-x-1/2 overflow-hidden bg-border">
                        <div
                          className="w-full bg-gradient-to-b from-gold via-gold to-gold/60 transition-[height] duration-200"
                          style={{ height: `${connectorFill * 100}%` }}
                        />
                      </div>
                    )}
                    <button
                      onClick={() => select(i as 0 | 1 | 2)}
                      aria-current={active ? "step" : undefined}
                      className="group relative flex items-start gap-4 text-left w-full"
                    >
                      {/* Node */}
                      <span
                        className={`relative z-10 flex shrink-0 items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                          active
                            ? "border-gold/20 bg-card text-gold scale-110"
                            : done
                            ? "border-gold/60 bg-gold/10 text-gold"
                            : "border-border bg-card text-muted-foreground group-hover:border-gold/40"
                        }`}
                        style={active ? { boxShadow: "var(--shadow-gold)" } : undefined}
                      >
                        {done ? (
                          <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 8.5L6.5 12L13 4.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        ) : (
                          <span className="font-mono text-[11px] font-bold">{s.n}</span>
                        )}
                      </span>

                      <div className="flex-1 pt-1">
                        <div className={`text-sm font-semibold transition-colors ${active ? "text-foreground" : done ? "text-foreground/70" : "text-muted-foreground group-hover:text-foreground"}`}>
                          {s.label}
                        </div>
                        <div className={`mt-1 text-[10px] font-mono uppercase tracking-wider transition-colors ${active ? "text-gold" : "text-muted-foreground/60"}`}>
                          {s.tag}
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Single interactive canvas */}
          <div className="relative surface-card overflow-hidden">
            <div aria-hidden className="absolute inset-0 grid-bg opacity-50" />
            <div className="relative p-6 lg:p-10 min-h-[460px]">
              {/* Step header */}
              <div key={`H-${step}-${replayKey}`} className="step-in flex items-center gap-3">
                <span className="text-[11px] font-mono text-gold">{STEPS[step].n} / {STEPS[step].label.toUpperCase()}</span>
                <span className="h-px flex-1 bg-border" />
                <span className="text-[11px] font-mono text-gold">{STEPS[step].tag}</span>
              </div>

              {/* Step body */}
              <div key={`B-${step}-${replayKey}`} className="step-in mt-6">
                {step === 0 && <CollapseStep />}
                {step === 1 && <CompressionStep prm={prm} />}
                {step === 2 && <ImpactStep />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CollapseStep() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLSpanElement>(null);
  const legacyRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const nashRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [paths, setPaths] = useState<{ left: string[]; right: string[]; w: number; h: number; hub: { x: number; y: number } }>({
    left: [], right: [], w: 0, h: 0, hub: { x: 0, y: 0 },
  });

  useEffect(() => {
    const compute = () => {
      const c = containerRef.current;
      const h = hubRef.current;
      if (!c || !h) return;
      const cb = c.getBoundingClientRect();
      const hb = h.getBoundingClientRect();
      const hub = { x: hb.left + hb.width / 2 - cb.left, y: hb.top + hb.height / 2 - cb.top };
      const hubLeftX = hb.left - cb.left;
      const hubRightX = hb.right - cb.left;

      const left = legacyRefs.current.filter((el): el is HTMLSpanElement => !!el).map((el) => {
        const r = el.getBoundingClientRect();
        const x = r.right - cb.left;
        const y = r.top + r.height / 2 - cb.top;
        const midX = (x + hubLeftX) / 2;
        return `M ${x} ${y} C ${midX} ${y}, ${midX} ${hub.y}, ${hubLeftX} ${hub.y}`;
      });

      const right = nashRefs.current.filter((el): el is HTMLDivElement => !!el).map((el) => {
        const r = el.getBoundingClientRect();
        const x = r.left - cb.left;
        const y = r.top + r.height / 2 - cb.top;
        const midX = (x + hubRightX) / 2;
        return `M ${hubRightX} ${hub.y} C ${midX} ${hub.y}, ${midX} ${y}, ${x} ${y}`;
      });

      setPaths({ left, right, w: cb.width, h: cb.height, hub });
    };
    compute();
    const ro = new ResizeObserver(compute);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", compute);
    const t = setTimeout(compute, 60);
    return () => { ro.disconnect(); window.removeEventListener("resize", compute); clearTimeout(t); };
  }, []);

  return (
    <>
      <h3 className="text-2xl lg:text-3xl font-semibold">8 disconnected modules collapse into 5 unified systems.</h3>
      <p className="mt-2 text-muted-foreground">No more handoffs between tools. One model, one source.</p>

      <div ref={containerRef} className="relative mt-8">
        <svg
          aria-hidden
          className="hidden lg:block absolute inset-0 pointer-events-none z-0"
          width={paths.w}
          height={paths.h}
        >
          <defs>
            <linearGradient id="flowInGrad" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#999999" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#B5D4F8" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="flowOutGrad" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#B5D4F8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#999999" stopOpacity="0.2" />
            </linearGradient>
            <radialGradient id="hubGlow">
              <stop offset="0%" stopColor="#B5D4F8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#B5D4F8" stopOpacity="0" />
            </radialGradient>
          </defs>

          {paths.hub.x > 0 && <circle cx={paths.hub.x} cy={paths.hub.y} r="60" fill="url(#hubGlow)" />}

          {paths.left.map((d, i) => (
            <g key={`l${i}-${d}`}>
              <path d={d} fill="none" stroke="url(#flowInGrad)" strokeWidth="1.25" strokeLinecap="round" className="flow-path" style={{ animationDelay: `${i * 90}ms` }} />
              <circle r="3" fill="#B5D4F8" className="flow-pulse" style={{ offsetPath: `path("${d}")`, animationDelay: `${600 + i * 200}ms` } as React.CSSProperties} />
            </g>
          ))}

          {paths.right.map((d, i) => (
            <g key={`r${i}-${d}`}>
              <path d={d} fill="none" stroke="url(#flowOutGrad)" strokeWidth="1.25" strokeLinecap="round" className="flow-path" style={{ animationDelay: `${500 + i * 100}ms` }} />
              <circle r="3" fill="#B5D4F8" className="flow-pulse" style={{ offsetPath: `path("${d}")`, animationDelay: `${1100 + i * 180}ms` } as React.CSSProperties} />
            </g>
          ))}
        </svg>

        <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto_1fr] items-center">
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-muted-foreground mb-3">Legacy · disconnected</div>
            <div className="flex flex-wrap gap-2">
              {legacy.map((l, i) => (
                <span
                  key={l}
                  ref={(el) => { legacyRefs.current[i] = el; }}
                  className="merge-out px-3 py-1.5 rounded-full bg-card/60 border border-border text-muted-foreground text-xs line-through"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  {l}
                </span>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-[10px] font-mono uppercase tracking-wider text-muted-foreground/70">
              <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-rose-400/70" />handoffs</span>
              <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-rose-400/70" />rebuilds</span>
              <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-rose-400/70" />sync issues</span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center min-h-[220px]">
            <span
              ref={hubRef}
              className="node-pop relative px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider border border-gold/50 text-gold bg-card/90 backdrop-blur"
              style={{ boxShadow: "var(--shadow-gold)", animationDelay: "400ms" }}
            >
              8 → 5
              <span aria-hidden className="absolute inset-0 rounded-full ring-2 ring-gold/20 animate-ping" />
            </span>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-gold mb-3">Nash · one system</div>
            <div className="grid grid-cols-2 gap-2">
              {nash.map((n, i) => (
                <div
                  key={n}
                  ref={(el) => { nashRefs.current[i] = el; }}
                  className={`merge-in px-3 py-2.5 rounded-xl border text-sm font-semibold backdrop-blur-sm ${
                    i === 4 ? "col-span-2 border-gold/40 text-gold bg-card/90" : "border-border bg-card/80"
                  }`}
                  style={{ animationDelay: `${800 + i * 120}ms` }}
                >
                  {i === 4 && <span className="mr-1.5 text-gold">✦</span>}
                  {n}
                </div>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-[10px] font-mono uppercase tracking-wider text-emerald-500/80">
              <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500/80" />one source</span>
              <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500/80" />continuous</span>
              <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500/80" />auditable</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function CompressionStep({ prm }: { prm: boolean }) {
  const [w, setW] = useState(prm ? 0.7 : 100);
  useEffect(() => {
    if (prm) return;
    const id = setTimeout(() => setW(0.7), 250);
    return () => clearTimeout(id);
  }, [prm]);

  return (
    <>
      <h3 className="text-2xl lg:text-3xl font-semibold">From workflows → intent-driven execution.</h3>
      <p className="mt-2 text-muted-foreground">Old way: build, model, scenario, export, rework. Nash way: ask, execute, commit.</p>

      {/* Animated compression bar */}
      <div className="mt-7 rounded-2xl border border-border bg-card/40 p-5">
        <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider">
          <span className="text-muted-foreground">Time to decision</span>
          <span className="text-gold tabular-nums">~10–14d → ~1 min</span>
        </div>
        <div className="relative mt-3 h-2 rounded-full bg-card/60 border border-border overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-rose-400/60 via-amber-300 to-gold transition-[width] duration-[2200ms] ease-out"
            style={{ width: `${w}%` }}
          />
        </div>
        <div className="mt-1.5 flex justify-between text-[10px] font-mono text-muted-foreground">
          <span>~14 days</span>
          <span className="text-gold">~1 min</span>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card/40 p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground">Before · Workflows</span>
            <span className="text-[10px] font-mono text-rose-400/90">~10–14d</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {before.map((b, i) => (
              <span key={b} className="flex items-center gap-1.5">
                <span className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${i === before.length - 1 ? "border-rose-400/40 text-rose-300" : "border-border text-muted-foreground"} bg-card/60`}>{b}</span>
                {i < before.length - 1 && <span className="text-muted-foreground">→</span>}
              </span>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            {[["Steps", "5"], ["Handoffs", "3+"], ["Tools", "4–6"]].map(([k, v]) => (
              <div key={k} className="rounded-md border border-border bg-card/40 px-2 py-2">
                <div className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">{k}</div>
                <div className="text-base font-semibold">{v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gold/30 bg-gradient-to-br from-card/80 to-card/40 p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] uppercase tracking-wider font-bold text-gold">Now · Nash</span>
            <span className="text-[10px] font-mono text-gold">~1 min</span>
          </div>
          <div className="space-y-1.5">
            {now.map((n, i) => (
              <div
                key={n.n}
                className="row-in flex items-center gap-2.5 px-3 py-2.5 rounded-lg border border-border bg-card/60"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <span className="w-5 h-5 rounded-md bg-gradient-to-br from-[oklch(0.88_0.13_82)] to-[oklch(0.7_0.13_70)] text-[oklch(0.15_0.01_60)] flex items-center justify-center text-[10px] font-bold">{n.n}</span>
                <span className="text-sm font-semibold flex-1">{n.t}</span>
                <span className="text-[10px] font-mono text-gold/80">{n.s}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            {[["Steps", "3"], ["Handoffs", "0"], ["Tools", "1"]].map(([k, v]) => (
              <div key={k} className="rounded-md border border-gold/20 bg-card/40 px-2 py-2">
                <div className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">{k}</div>
                <div className="text-base font-semibold text-gradient-gold">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function ImpactStep() {
  return (
    <>
      <h3 className="text-2xl lg:text-3xl font-semibold">Compressed cycles. Continuous decisions.</h3>
      <p className="mt-2 text-muted-foreground">Real outcomes from teams running Nash.</p>

      {/* 2×2 at all desktop widths — the capped panel width can't fit 4-across
          without the 3xl stat values ("Continuous" ~155px) overflowing the border. */}
      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        {impact.map((i, idx) => (
          <div
            key={i.k}
            className="row-in rounded-2xl border border-border bg-card/40 p-5"
            style={{ animationDelay: `${idx * 80}ms` }}
          >
            <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">{i.k}</div>
            <div className="mt-3 text-sm text-muted-foreground line-through">{i.from}</div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-lg text-muted-foreground">→</span>
              <span className="text-2xl lg:text-3xl font-semibold text-gradient-gold leading-none">{i.to}</span>
            </div>
            <p className="mt-3 text-xs text-muted-foreground leading-relaxed">{i.note}</p>
          </div>
        ))}
      </div>
    </>
  );
}
