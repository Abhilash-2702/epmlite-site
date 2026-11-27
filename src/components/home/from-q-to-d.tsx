import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Band, SectionHead } from "./band";
import { HashLink } from "./hash-link";
import { AUTO_MS, CHIPS, EXAMPLES, PAUSE_MS, STEPS } from "./from-q-to-d-data";
import { AskPane, CommitPane, TestPane } from "./from-q-to-d-panes";

// From Q to D band (light): the Ask / Test / Commit console, ported from the
// mock-up's .loop markup and its "From Q to D console" script block. Product
// screens stay navy on the light band (.hp-console-pane.hp-navy).

export function FromQtoDBand() {
  return (
    <Band id="from-q-to-d" tone="light">
      <SectionHead
        eyebrow="From Q to D"
        title={
          <>
            Finance is about decisions.
            <br />
            <span className="hp-em">Not reports.</span>
          </>
        }
        lede="Ask. Test. Commit. One continuous loop: every saved figure recorded, every assumption explicit."
      />
      <LoopConsole />
    </Band>
  );
}

type Step = 0 | 1 | 2;

// What the console shows. `gen` counts the mock-up's renderLoop() calls: each
// one re-renders the rail and remounts the pane (restarting the typewriter,
// the timers and the step-in animation), so both are keyed by it. `prm` is the
// reduced-motion preference as read at that call.
type View = { step: Step; q: number; gen: number; prm: boolean };

// The mock-up's `loop` object: the live state that its timers, its animation
// frame and its IntersectionObserver read and write between renders.
type Live = {
  step: Step;
  q: number;
  paused: boolean;
  visible: boolean;
  raf: number;
  pauseT: number;
  prm: boolean;
};

function LoopConsole() {
  // The server cannot know the motion preference; it renders the mock-up's
  // starting state (Ask, first question, motion on) and the client moves on
  // from there in effects.
  const [view, setView] = useState<View>({ step: 0, q: 0, gen: 0, prm: false });
  const loopRef = useRef<HTMLDivElement>(null);
  const bars = useRef<(HTMLElement | null)[]>([]);
  const live = useRef<Live>({
    step: 0,
    q: 0,
    paused: false,
    visible: false,
    raf: 0,
    pauseT: 0,
    prm: false,
  });

  // renderLoop(): stop the progress bar, empty every tab's bar, then show the
  // current step and question. Its tail, startAuto(), runs in the effect below
  // once the new rail and pane are on screen.
  const renderLoop = useCallback(() => {
    const l = live.current;
    cancelAnimationFrame(l.raf);
    bars.current.forEach((b) => {
      if (b) b.style.width = "0";
    });
    const next = { step: l.step, q: l.q, prm: l.prm };
    setView((v) => ({ ...next, gen: v.gen + 1 }));
  }, []);

  // startAuto(): fill the current tab's bar over AUTO_MS, then advance a step.
  // On phones (where the question chips are hidden) finishing Commit also
  // moves on to the next question.
  const startAuto = useCallback(() => {
    const l = live.current;
    cancelAnimationFrame(l.raf);
    const bar = bars.current[l.step];
    if (l.prm || l.paused || !l.visible || !bar) return;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, ((t || performance.now()) - start) / AUTO_MS);
      bar.style.width = p * 100 + "%";
      if (p >= 1) {
        if (window.matchMedia("(max-width: 767px)").matches && l.step === 2) {
          l.q = (l.q + 1) % EXAMPLES.length;
        }
        l.step = ((l.step + 1) % 3) as Step;
        renderLoop();
      } else l.raf = requestAnimationFrame(tick);
    };
    tick(start);
  }, [renderLoop]);

  // The tail of every renderLoop(), the first render included.
  useEffect(() => {
    startAuto();
  }, [view.gen, startAuto]);

  // Reduced motion (followed live, read at each render and each start, as in
  // the mock-up) and the 0.12 IntersectionObserver: coming into view re-renders
  // the step and starts the bar; leaving it stops the bar where it is.
  useEffect(() => {
    const l = live.current;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionPref = () => {
      l.prm = mq.matches;
    };
    l.prm = mq.matches;
    mq.addEventListener?.("change", onMotionPref);
    // The mock-up's first renderLoop() already knew the preference.
    if (l.prm) renderLoop();

    let io: IntersectionObserver | undefined;
    const el = loopRef.current;
    if ("IntersectionObserver" in window && el) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            const was = l.visible;
            l.visible = e.isIntersecting;
            if (l.visible && !was) renderLoop();
            else if (!l.visible) cancelAnimationFrame(l.raf);
          });
        },
        { threshold: 0.12 },
      );
      io.observe(el);
    } else {
      l.visible = true;
      startAuto();
    }

    return () => {
      mq.removeEventListener?.("change", onMotionPref);
      io?.disconnect();
      cancelAnimationFrame(l.raf);
      window.clearTimeout(l.pauseT);
      l.visible = false;
      l.paused = false;
    };
  }, [renderLoop, startAuto]);

  // goto(): a click on a tab, a question or the rail's Next / Replay button.
  // Shows that step, pauses the auto-advance and resumes it 6000 ms later.
  const goto = useCallback(
    (s: Step) => {
      const l = live.current;
      l.step = s;
      l.paused = true;
      window.clearTimeout(l.pauseT);
      if (!l.prm) {
        l.pauseT = window.setTimeout(() => {
          l.paused = false;
          startAuto();
        }, PAUSE_MS);
      }
      renderLoop();
    },
    [renderLoop, startAuto],
  );

  // A move of the Test pane's slider: stop the bar where it is and resume the
  // auto-advance 6000 ms after the last move.
  const pauseForSlider = useCallback(() => {
    const l = live.current;
    l.paused = true;
    cancelAnimationFrame(l.raf);
    window.clearTimeout(l.pauseT);
    l.pauseT = window.setTimeout(() => {
      l.paused = false;
      startAuto();
    }, PAUSE_MS);
  }, [startAuto]);

  const s = STEPS[view.step];

  return (
    <div className="hp-loop" ref={loopRef}>
      <div className="hp-loop-tabs" role="tablist" aria-label="Ask, Test, Commit">
        {STEPS.map((t, i) => (
          <button
            key={t.n}
            className="hp-loop-tab"
            role="tab"
            type="button"
            aria-selected={i === view.step}
            onClick={() => goto(i as Step)}
          >
            <span className="hp-n">{t.n}</span>
            <span className="hp-l">{t.label}</span>
            <span className="hp-bar">
              <b
                ref={(el) => {
                  bars.current[i] = el;
                }}
              />
            </span>
          </button>
        ))}
      </div>
      <div className="hp-ask-bar">
        <div className="hp-ask-bar-head">
          <span className="hp-mini">Try a real question</span>
          <span className="hp-mini">Click to run ↓</span>
        </div>
        <div className="hp-ask-chips">
          {CHIPS.map((c, i) => (
            <button
              key={c.q}
              className="hp-ask-chip"
              type="button"
              aria-pressed={i === view.q && view.step === 0}
              onClick={() => {
                live.current.q = i;
                goto(0);
              }}
            >
              <span className="hp-arrow" aria-hidden="true">
                →
              </span>
              <span className="hp-q">{c.q}</span>
              <span className="hp-a">{c.a}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="hp-console">
        <div className="hp-console-rail hp-step-in" key={view.gen}>
          <div className="hp-rail-tag">
            <span>{`${s.n} / ${s.label.toUpperCase()}`}</span>
            <i />
          </div>
          <h3>{s.title}</h3>
          <p>{s.desc}</p>
          <ul className="hp-bullets">
            {s.bullets.map((b) => (
              <li key={b}>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="hp-rail-foot">
            <div className="hp-dots">
              {STEPS.map((d, i) => (
                <i key={d.n} className={i === view.step ? "hp-on" : undefined} />
              ))}
            </div>
            <button
              className="hp-btn hp-btn-ghost hp-btn-sm"
              type="button"
              onClick={() => goto(((live.current.step + 1) % 3) as Step)}
            >
              {view.step === 2 ? (
                <>
                  Replay <span aria-hidden="true">↻</span>
                </>
              ) : (
                <>
                  Next step <span aria-hidden="true">→</span>
                </>
              )}
            </button>
          </div>
        </div>
        <div className="hp-console-pane hp-navy">
          {view.step === 0 ? (
            <AskPane key={view.gen} q={view.q} prm={view.prm} />
          ) : view.step === 1 ? (
            <TestPane key={view.gen} prm={view.prm} onInput={pauseForSlider} />
          ) : (
            <CommitPane key={view.gen} prm={view.prm} />
          )}
        </div>
      </div>
      <div className="hp-cta-strip">
        <p>See it run on your numbers.</p>
        <div>
          <Link to="/try" className="hp-btn hp-btn-primary">
            Try with your data <span aria-hidden="true">→</span>
          </Link>
          <HashLink hash="system" className="hp-btn hp-btn-ghost">
            See the system
          </HashLink>
        </div>
      </div>
    </div>
  );
}
