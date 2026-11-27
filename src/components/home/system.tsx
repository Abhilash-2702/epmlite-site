import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Band, SectionHead } from "./band";
import { AUTO_MS, SSTEPS } from "./system-data";
import { CollapseStep, CompressionStep, ImpactStep } from "./system-steps";

// System band (navy, id="system": the hero's "Explore Nash" scrolls here),
// ported from the mock-up's .sys block and the "System section" of its script:
// a three-step stepper beside one canvas (Collapse, Compression, Impact).
//
// Behaviour kept from the mock-up:
// - auto-advance: the connector under the open step fills over AUTO_MS, then
//   the next step opens (step 3 has no connector and simply waits AUTO_MS);
// - clicking a step opens it and restarts the timer;
// - on hover-capable devices, the pointer over the band pauses the timer and
//   leaving restarts it from zero;
// - an IntersectionObserver (threshold 0.12) on the stepper and canvas: coming
//   into view rebuilds the open step and starts the timer; leaving stops it;
// - reduced motion: no auto-advance, and the Compression bar opens at 0.7%
//   (the CSS drops the animations).
//
// Every rebuild in the mock-up (renderSys) is a bump of view.run here, which
// remounts the canvas head and body (their step-in replays, the body's
// animations, timers and observers start over).

const BODIES = [CollapseStep, CompressionStep, ImpactStep];

function CheckMark() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="M3 8.5L6.5 12L13 4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SystemBand() {
  const [view, setView] = useState({ step: 0, run: 0 });
  const sysRef = useRef<HTMLDivElement>(null);
  const connRefs = useRef<(HTMLElement | null)[]>([]);
  // The mock-up's `sys` object: mutable timer state that must not re-render.
  const ctl = useRef({
    step: 0,
    paused: false,
    visible: false,
    raf: 0,
    startAuto: () => {},
  });

  // renderSys(): open `step` and rebuild it.
  const renderSys = useCallback((step: number) => {
    setView((v) => ({ step, run: v.run + 1 }));
  }, []);

  // Timer, visibility and hover wiring (the mock-up's startSysAuto, its
  // IntersectionObserver entry for #sys and its mouseenter/mouseleave on #system).
  useEffect(() => {
    const sys = ctl.current;
    const sysEl = sysRef.current;
    const bandEl = sysEl?.closest<HTMLElement>("section");
    if (!sysEl || !bandEl) return;
    const prm = window.matchMedia("(prefers-reduced-motion: reduce)");

    const startSysAuto = () => {
      cancelAnimationFrame(sys.raf);
      if (prm.matches || sys.paused || !sys.visible) return;
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, ((t || performance.now()) - start) / AUTO_MS);
        connRefs.current[sys.step]?.style.setProperty("--hp-f", String(p));
        if (p >= 1) {
          sys.step = (sys.step + 1) % 3;
          renderSys(sys.step);
        } else sys.raf = requestAnimationFrame(tick);
      };
      tick(start);
    };
    sys.startAuto = startSysAuto;

    const onEnter = () => {
      sys.paused = true;
      cancelAnimationFrame(sys.raf);
    };
    const onLeave = () => {
      sys.paused = false;
      startSysAuto();
    };
    const hover = window.matchMedia("(hover: hover)").matches;
    if (hover) {
      bandEl.addEventListener("mouseenter", onEnter);
      bandEl.addEventListener("mouseleave", onLeave);
    }

    let io: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            const w = sys.visible;
            sys.visible = e.isIntersecting;
            if (sys.visible && !w) renderSys(sys.step);
            else if (!sys.visible) cancelAnimationFrame(sys.raf);
          });
        },
        { threshold: 0.12 },
      );
      io.observe(sysEl);
    } else {
      sys.visible = true;
      startSysAuto();
    }

    return () => {
      io?.disconnect();
      if (hover) {
        bandEl.removeEventListener("mouseenter", onEnter);
        bandEl.removeEventListener("mouseleave", onLeave);
      }
      cancelAnimationFrame(sys.raf);
      sys.startAuto = () => {};
      sys.visible = false;
      sys.paused = false;
    };
  }, [renderSys]);

  // Each rebuild: paintStepper(0) (connectors before the open step full, the
  // rest empty), then start the timer. Before paint, so the connectors change
  // in the same frame as the step classes.
  useLayoutEffect(() => {
    const sys = ctl.current;
    sys.step = view.step;
    connRefs.current.forEach((c, i) => c?.style.setProperty("--hp-f", i < view.step ? "1" : "0"));
    sys.startAuto();
    return () => cancelAnimationFrame(sys.raf);
  }, [view]);

  const s = SSTEPS[view.step];
  const Body = BODIES[view.step];

  return (
    <Band id="system" tone="navy">
      <SectionHead
        eyebrow="Architecture"
        title={
          <>
            From modules.
            <br />
            <span className="hp-em">To a system.</span>
          </>
        }
        lede="Most EPM tools sell you modules. NashOS gives you one system that operates as one."
      />
      <div className="hp-sys" ref={sysRef}>
        <ul className="hp-stepper">
          {SSTEPS.map((st, i) => {
            const active = i === view.step;
            const done = i < view.step;
            return (
              <li key={st.n}>
                {i < 2 ? (
                  <span className="hp-conn" aria-hidden="true">
                    <b
                      ref={(el) => {
                        connRefs.current[i] = el;
                      }}
                    />
                  </span>
                ) : null}
                <button
                  className={`hp-step-btn${done ? " hp-done" : ""}`}
                  type="button"
                  data-i={i}
                  aria-current={active ? "step" : undefined}
                  onClick={() => renderSys(i)}
                >
                  <span className="hp-step-node">{done ? <CheckMark /> : st.n}</span>
                  <span className="hp-step-txt">
                    <span className="hp-step-lab">{st.label}</span>
                    <span className="hp-step-tag">{st.tag}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <div className="hp-canvas">
          <div className="hp-canvas-in">
            <div className="hp-canvas-head hp-step-in" key={`head-${view.run}`}>
              <span>{`${s.n} / ${s.label.toUpperCase()}`}</span>
              <i />
              <span>{s.tag}</span>
            </div>
            <div className="hp-canvas-body hp-step-in" key={`body-${view.run}`}>
              <Body />
            </div>
          </div>
        </div>
      </div>
    </Band>
  );
}
