import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { NashMonogram } from "@/components/nash-marks";
import { HashLink } from "./hash-link";

// Homepage hero, ported from the mock-up: the 44px grid, the faint Nash mark,
// the signal figure (nine lines merge into three, then one, which turns down
// into the left spine) with its travelling pulses and two labels, and the
// parallax that moves the grid and the mark on hover-capable devices.
//
// The figure is measured from the rendered hero, so it is built after mount
// (nothing reads window during render, and the server and the first client
// render are identical). The 236px space it needs from 1100px up is set in CSS
// (.hp-hero-figure-space), so the hero does not change height on hydration.

type SvgEl =
  | { t: "path"; d: string; stroke: string }
  | {
      t: "circle";
      cx: number;
      cy: number;
      r: number;
      fill: string;
      opacity?: string;
      stroke?: string;
      strokeWidth?: string;
    }
  | { t: "pulse"; dur: string; begin: string; path: string };

type Signal = {
  W: number;
  H: number;
  els: SvgEl[];
  labelA: { top: number; left: number };
  labelB: { top: number; right: number };
};

// Same geometry and constants as the mock-up's buildSignal().
function computeSignal(W: number, H: number, sx: number, right: number, reduce: boolean): Signal {
  const R = 28;
  const y2 = Math.round(H - 150) + 0.5;
  const gap = 62;
  const fan = 17;
  const xm = Math.round(sx + (right - sx) * 0.46); // three become one
  const xk = Math.round(sx + (right - sx) * 0.8); // nine become three
  const lead = Math.min(220, (xk - xm) * 0.5);
  const lead2 = Math.min(200, (W - xk) * 0.6);
  const ys = [y2 - gap, y2, y2 + gap];
  const bend = (x0: number, l: number, ya: number, yb: number) =>
    ` L ${x0 + l} ${ya} C ${x0 + l * 0.42} ${ya} ${x0 + l * 0.5} ${yb} ${x0} ${yb}`;
  const trunk = ` L ${sx + R} ${y2} Q ${sx} ${y2} ${sx} ${y2 + R} L ${sx} ${H}`;
  const els: SvgEl[] = [];
  const fine: { d: string; i: number }[] = [];
  const mid: string[] = [];
  ys.forEach((y, i) => {
    mid[i] = y === y2 ? ` L ${xm} ${y2}` : bend(xm, lead, y, y2);
    [-1, 0, 1].forEach((k) => {
      const yy = y + k * fan;
      const d = `M ${W} ${yy}` + (k === 0 ? ` L ${xk} ${y}` : bend(xk, lead2, yy, y));
      fine.push({ d, i });
      els.push({ t: "path", d, stroke: "rgba(181,212,248,.17)" });
    });
    els.push({ t: "path", d: `M ${xk} ${y}${mid[i]}`, stroke: "rgba(181,212,248,.36)" });
    els.push({ t: "circle", cx: xk, cy: y, r: 2.5, fill: "#B5D4F8", opacity: ".75" });
  });
  els.push({ t: "path", d: `M ${xm} ${y2}${trunk}`, stroke: "rgba(181,212,248,.62)" });
  els.push({
    t: "circle",
    cx: xm,
    cy: y2,
    r: 5,
    fill: "#0D1729",
    stroke: "#B5D4F8",
    strokeWidth: "1.5",
  });
  if (!reduce) {
    // [fine line, duration s, begin s]
    const pulses: [number, number, number][] = [
      [1, 8, 0.4],
      [3, 10, 1.9],
      [8, 9, 3.3],
      [4, 11, 5.2],
    ];
    pulses.forEach(([fi, dur, begin]) => {
      const s = fine[fi];
      els.push({ t: "pulse", dur: `${dur}s`, begin: `${begin}s`, path: s.d + mid[s.i] + trunk });
    });
  }
  return {
    W,
    H,
    els,
    labelA: { top: y2, left: sx + 76 },
    labelB: { top: y2, right: Math.round(W - xk + 34) },
  };
}

export function HomeHero() {
  const heroRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLSpanElement>(null);
  const [signal, setSignal] = useState<Signal | null>(null);

  // Signal figure: built from measurements at 1100px and wider, rebuilt 120ms
  // after a resize, on window load, once the fonts are ready, and when the
  // reduced-motion preference changes (the pulses come and go with it).
  useEffect(() => {
    const hero = heroRef.current;
    const inner = innerRef.current;
    const anchor = anchorRef.current;
    if (!hero || !inner || !anchor) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let alive = true;
    const build = () => {
      if (!alive) return;
      if (window.innerWidth < 1100) {
        setSignal(null);
        return;
      }
      const hb = hero.getBoundingClientRect();
      const ab = anchor.getBoundingClientRect();
      const wb = inner.getBoundingClientRect();
      const sx = Math.round(ab.left - hb.left) + 0.5;
      setSignal(computeSignal(hb.width, hb.height, sx, wb.right - hb.left, reduce.matches));
    };
    build();
    let rt = 0;
    const onResize = () => {
      window.clearTimeout(rt);
      rt = window.setTimeout(build, 120);
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("load", build);
    reduce.addEventListener("change", build);
    document.fonts?.ready.then(build);
    return () => {
      alive = false;
      window.clearTimeout(rt);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", build);
      reduce.removeEventListener("change", build);
    };
  }, []);

  // Parallax: the grid follows the pointer and the mark moves against it.
  // Off for reduced motion and on devices without hover, as in the mock-up.
  useEffect(() => {
    const grid = gridRef.current;
    const mark = markRef.current;
    if (!grid || !mark) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(hover: hover)").matches
    )
      return;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 22;
      ty = (e.clientY / window.innerHeight - 0.5) * 16;
    };
    const tick = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      grid.style.transform = `translate3d(${cx.toFixed(2)}px,${cy.toFixed(2)}px,0)`;
      mark.style.transform = `translate3d(${(-cx * 0.7).toFixed(2)}px,${(-cy * 0.7).toFixed(2)}px,0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    tick();
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      grid.style.transform = "";
      mark.style.transform = "";
    };
  }, []);

  return (
    <section ref={heroRef} className={`hp-hero hp-navy${signal ? " hp-has-signal" : ""}`} id="hero">
      <div className="hp-hero-grid" ref={gridRef} aria-hidden="true" />
      <div className="hp-hero-mark" ref={markRef} aria-hidden="true">
        <NashMonogram />
      </div>
      <svg
        className="hp-hero-signal"
        aria-hidden="true"
        {...(signal
          ? { width: signal.W, height: signal.H, viewBox: `0 0 ${signal.W} ${signal.H}` }
          : {})}
      >
        {signal?.els.map((el, i) => {
          if (el.t === "path") {
            return <path key={i} d={el.d} fill="none" stroke={el.stroke} strokeWidth="1" />;
          }
          if (el.t === "circle") {
            return (
              <circle
                key={i}
                cx={el.cx}
                cy={el.cy}
                r={el.r}
                fill={el.fill}
                opacity={el.opacity}
                stroke={el.stroke}
                strokeWidth={el.strokeWidth}
              />
            );
          }
          return (
            <circle
              key={i}
              r="2.5"
              fill="#B5D4F8"
              style={{ filter: "drop-shadow(0 0 6px #B5D4F8)" }}
            >
              <animateMotion
                dur={el.dur}
                begin={el.begin}
                repeatCount="indefinite"
                path={el.path}
              />
            </circle>
          );
        })}
      </svg>
      <span
        className="hp-hero-label hp-a"
        style={signal ? { top: signal.labelA.top, left: signal.labelA.left } : undefined}
      >
        <i />
        Audit-ready
      </span>
      <span
        className="hp-hero-label hp-b"
        style={
          signal ? { top: signal.labelB.top, left: "auto", right: signal.labelB.right } : undefined
        }
      >
        Continuously Computed
        <i />
      </span>
      <div className="hp-wrap hp-hero-in" ref={innerRef}>
        <span className="hp-spine-anchor" ref={anchorRef} aria-hidden="true" />
        <h1>
          <span className="hp-ln">A unified system for</span>{" "}
          <span className="hp-ln">
            <span className="hp-em">planning, forecasting,</span>
          </span>{" "}
          <span className="hp-ln">
            and <span className="hp-em">decisions.</span>
          </span>
        </h1>
        <div className="hp-hero-row">
          <p className="hp-hero-sub">
            One continuously computed system for finance: multi-entity, multi-currency, audit-ready.
          </p>
          <div className="hp-hero-cta">
            <HashLink hash="system" className="hp-btn hp-btn-primary">
              Explore Nash <span aria-hidden="true">→</span>
            </HashLink>
            <Link to="/try" className="hp-btn hp-btn-ghost">
              Try with your data
            </Link>
          </div>
        </div>
        <div className="hp-hero-figure-space" aria-hidden="true" />
      </div>
    </section>
  );
}
