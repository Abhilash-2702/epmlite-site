import { Fragment, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { BEFORE, BEFORE_STATS, IMPACT, LEGACY, NASH, NOW, NOW_STATS } from "./system-data";

// The three bodies of the System canvas, ported from the mock-up's
// mountCollapse, mountCompression and mountImpact. The band (system.tsx)
// remounts the open body every time the mock-up would rebuild it with
// innerHTML (a step change, a click, the band scrolling back into view), so
// each body's entry animations replay and its timers and observers start from
// scratch.

/* ---------- 01 Collapse ---------- */

type Flow = { d: string; len: number };

type Figure = {
  /** Bumped on every redraw: remounts the svg's children so the draw-in replays. */
  gen: number;
  W: number;
  H: number;
  hl: number;
  hr: number;
  hx: number;
  hy: number;
  ins: Flow[];
  outs: Flow[];
};

/**
 * 8 legacy modules on the left, the "8 → 5" hub in the middle, the five Nash
 * systems on the right, and (from 1024px up) an svg behind them with a curve
 * from every box to the hub and a pulse travelling along each curve.
 *
 * The curves are measured from the laid-out boxes with offsetLeft/offsetTop
 * (which ignore the boxes' own entry transforms), redrawn by a ResizeObserver
 * on the figure, and skipped when the figure is still the same size, exactly
 * as in the mock-up. Measured after mount, so the server renders an empty svg.
 */
export function CollapseStep() {
  const boxRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLSpanElement>(null);
  const legacyRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const nashRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [fig, setFig] = useState<Figure | null>(null);

  useLayoutEffect(() => {
    const c = boxRef.current;
    const hubEl = hubRef.current;
    if (!c || !hubEl) return;
    const legacyEls = legacyRefs.current.filter((el): el is HTMLSpanElement => !!el);
    const nashEls = nashRefs.current.filter((el): el is HTMLDivElement => !!el);
    // Position of el inside the figure, summed up the offsetParent chain.
    const off = (el: HTMLElement) => {
      let x = 0;
      let y = 0;
      let n: HTMLElement | null = el;
      while (n && n !== c) {
        x += n.offsetLeft;
        y += n.offsetTop;
        n = n.offsetParent as HTMLElement | null;
      }
      return { x, y, w: el.offsetWidth, h: el.offsetHeight };
    };
    let lastW = "";
    let gen = 0;
    const draw = () => {
      if (!c.isConnected) return;
      if (window.innerWidth < 1024) {
        setFig(null);
        lastW = "";
        return;
      }
      const W = c.offsetWidth;
      const H = c.offsetHeight;
      if (`${W}x${H}` === lastW) return;
      lastW = `${W}x${H}`;
      const hb = off(hubEl);
      const hy = hb.y + hb.h / 2;
      const hl = hb.x;
      const hr = hb.x + hb.w;
      const hx = hb.x + hb.w / 2;
      const ins = legacyEls.map((el) => {
        const r = off(el);
        const x = r.x + r.w;
        const y = r.y + r.h / 2;
        const mx = (x + hl) / 2;
        return {
          d: `M ${x} ${y} C ${mx} ${y}, ${mx} ${hy}, ${hl} ${hy}`,
          len: Math.ceil(Math.abs(hl - x) + Math.abs(hy - y) + 40),
        };
      });
      const outs = nashEls.map((el) => {
        const r = off(el);
        const x = r.x;
        const y = r.y + r.h / 2;
        const mx = (x + hr) / 2;
        return {
          d: `M ${hr} ${hy} C ${mx} ${hy}, ${mx} ${y}, ${x} ${y}`,
          len: Math.ceil(Math.abs(x - hr) + Math.abs(hy - y) + 40),
        };
      });
      gen += 1;
      setFig({ gen, W, H, hl, hr, hx, hy, ins, outs });
    };
    draw();
    let ro: ResizeObserver | undefined;
    if ("ResizeObserver" in window) {
      ro = new ResizeObserver(draw);
      ro.observe(c);
    }
    return () => ro?.disconnect();
  }, []);

  return (
    <>
      <h3>8 disconnected modules collapse into 5 unified systems.</h3>
      <p className="hp-sub">No more handoffs between tools. One model, one source.</p>
      <div className="hp-collapse" ref={boxRef}>
        <svg aria-hidden="true" {...(fig ? { width: fig.W, height: fig.H } : {})}>
          {fig ? (
            <Fragment key={fig.gen}>
              <defs>
                <linearGradient
                  id="hp-flowIn"
                  gradientUnits="userSpaceOnUse"
                  x1="0"
                  y1="0"
                  x2={fig.hl}
                  y2="0"
                >
                  <stop offset="0%" stopColor="#999999" stopOpacity=".15" />
                  <stop offset="100%" stopColor="#B5D4F8" stopOpacity=".9" />
                </linearGradient>
                <linearGradient
                  id="hp-flowOut"
                  gradientUnits="userSpaceOnUse"
                  x1={fig.hr}
                  y1="0"
                  x2={fig.W}
                  y2="0"
                >
                  <stop offset="0%" stopColor="#B5D4F8" stopOpacity=".9" />
                  <stop offset="100%" stopColor="#999999" stopOpacity=".2" />
                </linearGradient>
                <radialGradient id="hp-hubGlow">
                  <stop offset="0%" stopColor="#B5D4F8" stopOpacity=".4" />
                  <stop offset="100%" stopColor="#B5D4F8" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx={fig.hx} cy={fig.hy} r="70" fill="url(#hp-hubGlow)" />
              {fig.ins.map((f, i) => (
                <Fragment key={`in-${i}`}>
                  <path
                    d={f.d}
                    fill="none"
                    stroke="url(#hp-flowIn)"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    className="hp-flow-path"
                    style={
                      { "--hp-len": `${f.len}`, animationDelay: `${i * 90}ms` } as CSSProperties
                    }
                  />
                  <circle
                    r="3"
                    fill="#B5D4F8"
                    className="hp-flow-pulse"
                    style={{ offsetPath: `path('${f.d}')`, animationDelay: `${600 + i * 200}ms` }}
                  />
                </Fragment>
              ))}
              {fig.outs.map((f, i) => (
                <Fragment key={`out-${i}`}>
                  <path
                    d={f.d}
                    fill="none"
                    stroke="url(#hp-flowOut)"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    className="hp-flow-path"
                    style={
                      {
                        "--hp-len": `${f.len}`,
                        animationDelay: `${500 + i * 100}ms`,
                      } as CSSProperties
                    }
                  />
                  <circle
                    r="3"
                    fill="#B5D4F8"
                    className="hp-flow-pulse"
                    style={{ offsetPath: `path('${f.d}')`, animationDelay: `${1100 + i * 180}ms` }}
                  />
                </Fragment>
              ))}
            </Fragment>
          ) : null}
        </svg>
        <div className="hp-collapse-grid">
          <div>
            <div className="hp-col-label">Legacy · disconnected</div>
            <div className="hp-legacy">
              {LEGACY.map((l, i) => (
                <span
                  key={l}
                  ref={(el) => {
                    legacyRefs.current[i] = el;
                  }}
                  className="hp-merge-out"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  {l}
                </span>
              ))}
            </div>
            <div className="hp-tags">
              <span>handoffs</span>
              <span>rebuilds</span>
              <span>sync issues</span>
            </div>
          </div>
          <div className="hp-hub-cell">
            <span className="hp-hub hp-node-pop" ref={hubRef} style={{ animationDelay: "400ms" }}>
              8 → 5
            </span>
          </div>
          <div>
            <div className="hp-col-label hp-on">Nash · one system</div>
            <div className="hp-nash-grid">
              {NASH.map((n, i) => (
                <div
                  key={n}
                  ref={(el) => {
                    nashRefs.current[i] = el;
                  }}
                  // "Agentic Execution" keeps the highlighted border, with no mark before its name.
                  className={`hp-merge-in${i === 4 ? " hp-star" : ""}`}
                  style={{ animationDelay: `${800 + i * 120}ms` }}
                >
                  {n}
                </div>
              ))}
            </div>
            <div className="hp-tags hp-good">
              <span>one source</span>
              <span>continuous</span>
              <span>auditable</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------- 02 Compression ---------- */

function Stats({ rows }: { rows: [string, string][] }) {
  return (
    <div className="hp-stats">
      {rows.map(([k, v]) => (
        <div key={k}>
          <div className="hp-k">{k}</div>
          <div className="hp-v">{v}</div>
        </div>
      ))}
    </div>
  );
}

/**
 * The compression bar shrinks from 100% to 0.7% (CSS transition, 2200ms),
 * starting 250ms after the step opens. Under reduced motion it opens at 0.7%.
 * The width is settled in a layout effect, before the first paint, so the
 * reduced-motion case never shows the full bar.
 */
export function CompressionStep() {
  const [fill, setFill] = useState(100);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFill(0.7);
      return;
    }
    const t = window.setTimeout(() => setFill(0.7), 250);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <>
      <h3>From workflows → intent-driven execution.</h3>
      <p className="hp-sub">
        Old way: build, model, scenario, export, rework. Nash way: ask, execute, commit.
      </p>
      <div className="hp-cbar">
        <div className="hp-cbar-top">
          <span>Driver change → recomputed model</span>
          <b>~10–14d → ~1 min</b>
        </div>
        <div className="hp-cbar-track">
          <b style={{ width: `${fill}%` }} />
        </div>
        <div className="hp-cbar-bot">
          <span>~10–14 days of rework</span>
          <b>~1 min recompute</b>
        </div>
      </div>
      <div className="hp-ba">
        <div className="hp-ba-card">
          <div className="hp-ba-head">
            Before · Workflows<span>~10–14d</span>
          </div>
          <div className="hp-flow">
            {BEFORE.map((b, i) => (
              <Fragment key={b}>
                <span className={`hp-c${i === BEFORE.length - 1 ? " hp-bad" : ""}`}>{b}</span>
                {i < BEFORE.length - 1 ? (
                  <span className="hp-ar" aria-hidden="true">
                    →
                  </span>
                ) : null}
              </Fragment>
            ))}
          </div>
          <Stats rows={BEFORE_STATS} />
        </div>
        <div className="hp-ba-card hp-now">
          <div className="hp-ba-head">
            Now · Nash<span>~1 min</span>
          </div>
          {NOW.map((n, i) => (
            <div
              key={n.n}
              className="hp-nowrow hp-row-in"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <span className="hp-n">{n.n}</span>
              <span className="hp-t">{n.t}</span>
              <span className="hp-s">{n.s}</span>
            </div>
          ))}
          <Stats rows={NOW_STATS} />
        </div>
      </div>
    </>
  );
}

/* ---------- 03 Impact ---------- */

export function ImpactStep() {
  return (
    <>
      <h3>Compressed cycles. Continuous decisions.</h3>
      <p className="hp-sub">Real outcomes from teams running Nash.</p>
      <div className="hp-impact">
        {IMPACT.map((m, i) => (
          <div
            key={m.k}
            className="hp-impact-card hp-row-in"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="hp-mini">{m.k}</div>
            <div className="hp-from">{m.from}</div>
            <div className="hp-to">
              <i aria-hidden="true">→</i>
              <b>{m.to}</b>
            </div>
            <p className="hp-note">{m.note}</p>
          </div>
        ))}
      </div>
    </>
  );
}
