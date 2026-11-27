import { useEffect, useId, useState } from "react";
import {
  COUNT_MS,
  EXAMPLES,
  LOG_LINES,
  LOG_MS,
  ROW_STAGGER_MS,
  TOOL_STAGGER_MS,
  TYPE_MS,
  type Answer,
  type Headline,
} from "./from-q-to-d-data";

// The three right-hand panes of the From Q to D console, ported from the
// mock-up's mountAsk(), mountTest() and mountCommit(). The console remounts a
// pane on every one of its renders (it keys the pane), so each pane starts its
// own timers on mount and releases them on unmount, as the mock-up's
// clearLoop() does. `prm` (prefers-reduced-motion) is read by the console at
// that render, as the mock-up reads it when it mounts a pane.

/* ---------- Ask ---------- */

// Phases of the Ask pane, in the mock-up's order: the question types itself in
// (caret showing), the caret goes, 300 ms later Nash's typing dots, at 900 ms
// the tool calls replace them, and after the tool chips the answer follows.
const TYPING = 0;
const TYPED = 1;
const THINKING = 2;
const TOOLS = 3;
const ANSWER = 4;

export function AskPane({ q, prm }: { q: number; prm: boolean }) {
  const ex = EXAMPLES[q];
  const a = ex.answer;
  const [typed, setTyped] = useState(prm ? ex.q : "");
  const [phase, setPhase] = useState(prm ? ANSWER : TYPING);

  useEffect(() => {
    if (prm) return;
    const timers: number[] = [];
    let i = 0;
    const id = window.setInterval(() => {
      i++;
      setTyped(ex.q.slice(0, i));
      if (i >= ex.q.length) {
        window.clearInterval(id);
        setPhase(TYPED);
        timers.push(window.setTimeout(() => setPhase(THINKING), 300));
        timers.push(window.setTimeout(() => setPhase(TOOLS), 900));
        timers.push(
          window.setTimeout(() => setPhase(ANSWER), 900 + a.tools.length * TOOL_STAGGER_MS + 400),
        );
      }
    }, TYPE_MS);
    return () => {
      window.clearInterval(id);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [prm, ex, a]);

  return (
    <div className="hp-pane hp-step-in">
      <div className="hp-pane-head">
        <span>chat · nash · finance assistant</span>
        <span className="hp-r">live</span>
      </div>
      <div className="hp-chat">
        <div className="hp-bubble">
          <div className="hp-who">You</div>
          <div className="hp-say">
            <span>{typed}</span>
            {phase === TYPING ? <span className="hp-caret" /> : null}
          </div>
        </div>
        {phase === THINKING ? (
          <div className="hp-bubble">
            <div className="hp-who">Nash</div>
            <div className="hp-say">
              <span className="hp-typing-dot" />
              <span className="hp-typing-dot" />
              <span className="hp-typing-dot" />
            </div>
          </div>
        ) : null}
        {phase >= TOOLS ? (
          <div className="hp-bubble">
            <div className="hp-who">Nash</div>
            <div className="hp-say">
              <div className="hp-tools-label">Calling tools</div>
              <div className="hp-tools">
                {a.tools.map((t, i) => (
                  <span
                    key={t}
                    className="hp-tool hp-row-in"
                    style={{ animationDelay: `${prm ? 0 : i * TOOL_STAGGER_MS}ms` }}
                  >
                    {`${t}()`}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : null}
        {phase >= ANSWER ? <AnswerBubble a={a} prm={prm} /> : null}
      </div>
      <div className="hp-status">Connected to ledger · 3 entities · USD/EUR · audit on</div>
    </div>
  );
}

function AnswerBubble({ a, prm }: { a: Answer; prm: boolean }) {
  return (
    <div className="hp-bubble hp-answer">
      <div className="hp-who">Nash</div>
      <div className="hp-say">
        <div className="hp-kpis">
          {a.headline.map((h) => (
            <div className="hp-kpi" key={h.label}>
              <span className="hp-k">{h.label}</span>
              <CountUp h={h} prm={prm} />
            </div>
          ))}
        </div>
        <p className="hp-summary">{a.summary}</p>
        <div className="hp-rows">
          {a.rows.map((r, i) => (
            <div
              key={r.label}
              className="hp-row hp-row-in"
              style={{ animationDelay: `${prm ? 0 : i * ROW_STAGGER_MS}ms` }}
            >
              <span className="hp-lab">{r.label}</span>
              <span className="hp-trk">
                <b className={`hp-${r.tone}`} style={{ width: `${r.pct}%` }} />
              </span>
              <span className="hp-val">{r.value}</span>
            </div>
          ))}
        </div>
        <div className="hp-src">
          <div>
            <b>source ·</b> {a.source}
          </div>
          {a.caveat ? (
            <div>
              <b>note ·</b> {a.caveat}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

// The mock-up's countUp(): 700 ms, ease-out cubic, one decimal, written as
// prefix + number + suffix (so -1.1 with "$" and "M" reads "$-1.1M", as there).
function countText(h: Headline, p: number) {
  const n = +(h.value * (1 - Math.pow(1 - p, 3))).toFixed(1);
  return (h.prefix || "") + n + (h.suffix || "");
}

function CountUp({ h, prm }: { h: Headline; prm: boolean }) {
  const [text, setText] = useState(() =>
    prm ? (h.prefix || "") + h.value + (h.suffix || "") : countText(h, 0),
  );
  useEffect(() => {
    if (prm) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, ((t || performance.now()) - start) / COUNT_MS);
      setText(countText(h, p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    tick(start);
    return () => cancelAnimationFrame(raf);
  }, [h, prm]);
  return <span className="hp-v">{text}</span>;
}

/* ---------- Test ---------- */

// The what-if slider. Every move recomputes the three deltas and redraws them
// (they re-enter with their staggered row-in, as the mock-up's innerHTML
// redraw does), and tells the console to pause its auto-advance.
export function TestPane({ prm, onInput }: { prm: boolean; onInput: () => void }) {
  const inputId = useId();
  const [hires, setHires] = useState(5);
  const [draws, setDraws] = useState(0);
  const h = hires;
  const r = -(h * 0.28);
  const e = -(h * 0.22);
  const c = -(h * 1.12);
  const rows: [string, string, number, number][] = [
    ["Runway Δ", r.toFixed(1) + " mo", Math.min(100, (Math.abs(r) / 4) * 100), 0],
    ["EBITDA Q4 Δ", "$" + e.toFixed(1) + "M", Math.min(100, (Math.abs(e) / 3) * 100), 120],
    ["Cash EoP Δ", "$" + c.toFixed(1) + "M", Math.min(100, (Math.abs(c) / 12) * 100), 240],
  ];

  return (
    <div className="hp-pane hp-step-in">
      <div className="hp-pane-head">
        <span>what-if · Q3 hire</span>
        <span className="hp-r">live</span>
      </div>
      <div className="hp-inset">
        <div className="hp-slider-top">
          <label className="hp-mini" htmlFor={inputId}>
            Hires in Q3
          </label>
          <span className="hp-v">{"+" + h}</span>
        </div>
        <input
          type="range"
          id={inputId}
          min={1}
          max={10}
          value={hires}
          onChange={(ev) => {
            setHires(+ev.target.value);
            setDraws((n) => n + 1);
            onInput();
          }}
        />
        <div className="hp-ticks">
          <span>1</span>
          <span>5</span>
          <span>10</span>
        </div>
      </div>
      <div className="hp-deltas">
        {rows.map((d) => (
          <div
            key={`${draws}-${d[0]}`}
            className="hp-delta hp-row-in"
            style={{ animationDelay: `${prm ? 0 : d[3]}ms` }}
          >
            <div className="hp-top">
              <span className="hp-mini">{d[0]}</span>
              <span className="hp-v">{d[1]}</span>
            </div>
            <div className="hp-trk">
              <b style={{ width: `${d[2]}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="hp-pane-note">
        Recomputed across <b>3 entities</b> · {h * 12}k payroll/mo · base FY26
      </div>
    </div>
  );
}

/* ---------- Commit ---------- */

// The audit terminal: one log line every 450 ms, then a caret and the Commit
// button enables. Commit appends the confirmation line and flashes the
// terminal's border once.
export function CommitPane({ prm }: { prm: boolean }) {
  const [shown, setShown] = useState(prm ? LOG_LINES.length : 0);
  const [committed, setCommitted] = useState(false);

  useEffect(() => {
    if (prm) return;
    let n = 0;
    const id = window.setInterval(() => {
      n++;
      setShown(n);
      if (n >= LOG_LINES.length) window.clearInterval(id);
    }, LOG_MS);
    return () => window.clearInterval(id);
  }, [prm]);

  const ready = shown >= LOG_LINES.length;
  return (
    <div className="hp-pane hp-step-in">
      <div className="hp-pane-head">
        <span>terminal · audit</span>
        <span className="hp-r hp-dim">~/nash</span>
      </div>
      <div className={`hp-term${committed ? " hp-border-flash" : ""}`}>
        {LOG_LINES.slice(0, shown).map((l) => (
          <div key={l.t} className={`hp-row-in hp-${l.c}`}>
            {l.t}
          </div>
        ))}
        {ready && !committed ? <span className="hp-caret" /> : null}
        {committed ? (
          <div className="hp-row-in hp-gold" style={{ marginTop: 4 }}>
            ✓ committed · scenario saved beside base
          </div>
        ) : null}
      </div>
      <div className="hp-pane-actions">
        <button
          className="hp-btn hp-btn-primary"
          type="button"
          disabled={!ready || committed}
          onClick={() => setCommitted(true)}
        >
          {committed ? (
            <>
              Committed <span aria-hidden="true">✓</span>
            </>
          ) : (
            <>
              Commit scenario <span aria-hidden="true">→</span>
            </>
          )}
        </button>
        <button className="hp-btn hp-btn-ghost" type="button">
          Discard
        </button>
      </div>
    </div>
  );
}
