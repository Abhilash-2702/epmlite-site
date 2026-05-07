"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  TrendingUp,
  BarChart3,
  PieChart as PieIcon,
  Layers,
  MousePointer2,
} from "lucide-react";
import { useShouldAnimate } from "@/components/animated/hooks";
import { usePersona } from "@/components/PersonaContext";
import { PERSONA_CONTENT } from "@/lib/persona-content";

const KPI_CYCLE = 8;       // seconds — cursor + KPI ring loop
const CHART_CYCLE_MS = 7000; // ms — chart variant cycle

const CHART_REGISTRY = {
  line:  { Icon: TrendingUp, Component: LineChart },
  bar:   { Icon: BarChart3,  Component: BarChartView },
  donut: { Icon: PieIcon,    Component: DonutChart },
  area:  { Icon: Layers,     Component: StackedAreaChart },
} as const;

export default function LiveDashboard() {
  const animate = useShouldAnimate(); // false on mobile → freeze on a stable frame
  const cycle = animate ? KPI_CYCLE : 0;
  const [idx, setIdx] = useState(0);
  const { persona } = usePersona();
  const c = PERSONA_CONTENT[persona];

  // Reset to chart 0 when persona changes — the cycler restarts cleanly
  useEffect(() => {
    setIdx(0);
  }, [persona]);

  useEffect(() => {
    // Only run the chart cycler on desktop with motion enabled. On mobile we
    // freeze on the line variant — saves repeat layout/paint cost on slow CPUs.
    if (!animate) return;
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % c.dashboardCharts.length);
    }, CHART_CYCLE_MS);
    return () => clearInterval(id);
  }, [animate, c.dashboardCharts.length]);

  const v = c.dashboardCharts[idx] ?? c.dashboardCharts[0];
  const ChartIcon = CHART_REGISTRY[v.id].Icon;
  const ChartComponent = CHART_REGISTRY[v.id].Component;

  return (
    <div className="relative">
      <div className="absolute -inset-6 bg-gradient-to-br from-brand-500/30 to-accent-violet/20 blur-3xl rounded-full pointer-events-none" />
      <div className="relative rounded-2xl bg-white shadow-elevated border border-surface-200 p-5">
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 mb-4">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
          <span className="ml-3 text-xs text-slate-400 font-mono">
            nashos · {c.dashboardLabel}
          </span>
          <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-accent-emerald bg-emerald-50 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse" />
            Live
          </span>
        </div>

        {/* KPI grid — driven by persona content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={persona + "-kpis"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3 }}
            className="relative grid grid-cols-2 gap-3 mb-4"
          >
            {c.dashboardKpis.map((k) => (
              <KPI
                key={k.label}
                label={k.label}
                value={k.value}
                delta={k.delta}
                tone={k.tone}
                highlight={k.highlight}
              />
            ))}

            {animate && (
            <motion.div
              className="absolute pointer-events-none"
              initial={{ x: "85%", y: "120%", opacity: 0 }}
              animate={{
                x: ["85%", "20%", "20%", "85%", "85%"],
                y: ["120%", "20%", "20%", "120%", "120%"],
                opacity: [0, 1, 1, 0, 0],
              }}
              transition={{
                duration: cycle,
                times: [0, 0.25, 0.55, 0.7, 1],
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <MousePointer2 className="w-5 h-5 text-slate-700 drop-shadow" fill="white" />
            </motion.div>
          )}
          </motion.div>
        </AnimatePresence>

        {/* Chart card — cycles between line/bar/donut/area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={persona + "-" + v.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.35 }}
            className="rounded-xl bg-surface-50 border border-surface-200 p-4 min-h-[120px]"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <ChartIcon className="w-3.5 h-3.5 text-theme-accent" />
                {v.title}
              </span>
              <span className="text-xs text-slate-400">{v.caption}</span>
            </div>
            <ChartComponent animate={animate} />
          </motion.div>
        </AnimatePresence>

        {/* Chat prompt that swaps with the chart variant */}
        <AnimatePresence mode="wait">
          <motion.div
            key={persona + "-" + v.id + "-prompt"}
            initial={{ opacity: 0, y: 2 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -2 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="mt-3 flex items-center gap-2 text-xs text-slate-500 font-mono"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent-emerald shrink-0" />
            <span className="truncate">&quot;{v.prompt}&quot;</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────
// KPI tile
// ────────────────────────────────────────────────────────────────────────

function KPI({
  label,
  value,
  delta,
  tone,
  highlight,
}: {
  label: string;
  value: string;
  delta: string;
  tone: "emerald" | "rose" | "slate";
  highlight?: boolean;
}) {
  const toneClass =
    tone === "emerald"
      ? "text-accent-emerald"
      : tone === "rose"
      ? "text-accent-rose"
      : "text-slate-500";
  return (
    <motion.div
      className={`relative rounded-xl bg-white border p-3 ${
        highlight ? "border-brand-200" : "border-surface-200"
      }`}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-1 font-display font-bold text-xl text-slate-900">{value}</div>
      <div className={`text-xs font-mono ${toneClass}`}>{delta}</div>
      {highlight && (
        <motion.div
          className="absolute inset-0 rounded-xl ring-2 ring-brand-500 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
          transition={{ duration: 8, times: [0, 0.3, 0.4, 0.6, 0.65, 1], repeat: Infinity }}
        />
      )}
    </motion.div>
  );
}

// ────────────────────────────────────────────────────────────────────────
// Chart variants
// ────────────────────────────────────────────────────────────────────────

const W = 280;
const H = 70;

function LineChart({ animate }: { animate: boolean }) {
  const actual = [40, 44, 41, 50, 56, 58, 62, 64, 68, 72, 76, 82];
  const budget = [42, 45, 48, 52, 55, 60, 64, 68, 70, 73, 75, 78];
  const path = (xs: number[]) =>
    xs
      .map((v, i) => {
        const x = (i / (xs.length - 1)) * W;
        const y = H - (v / 100) * H;
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-16" preserveAspectRatio="none">
      <defs>
        <linearGradient id="lineFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#2e6fff" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#2e6fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${path(actual)} L${W},${H} L0,${H} Z`} fill="url(#lineFill)" />
      <path d={path(budget)} fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
      {animate ? (
        <motion.path
          d={path(actual)}
          fill="none"
          stroke="#2e6fff"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
      ) : (
        <path d={path(actual)} fill="none" stroke="#2e6fff" strokeWidth="2" />
      )}
    </svg>
  );
}

function BarChartView({ animate }: { animate: boolean }) {
  // Cost-structure bars (% of OpEx)
  const bars = [
    { label: "COGS",  pct: 0.92, color: "#2e6fff" },
    { label: "S&M",   pct: 0.74, color: "#5694ff" },
    { label: "R&D",   pct: 0.58, color: "#8cbaff" },
    { label: "G&A",   pct: 0.36, color: "#bbd5ff" },
    { label: "Other", pct: 0.18, color: "#d9e8ff" },
  ];
  const slot = W / bars.length;
  const barW = slot * 0.62;
  const padX = (slot - barW) / 2;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-16" preserveAspectRatio="none">
      {bars.map((b, i) => {
        const x = i * slot + padX;
        const fullH = b.pct * (H - 6);
        return (
          <motion.rect
            key={b.label}
            x={x}
            width={barW}
            rx={3}
            fill={b.color}
            initial={animate ? { y: H, height: 0 } : false}
            animate={{ y: H - fullH, height: fullH }}
            transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
          />
        );
      })}
      {/* Baseline */}
      <line x1="0" y1={H - 0.5} x2={W} y2={H - 0.5} stroke="#cbd5e1" strokeWidth="0.5" />
    </svg>
  );
}

function DonutChart({ animate }: { animate: boolean }) {
  const r = 24;
  const cx = 50;
  const cy = H / 2;
  const c = 2 * Math.PI * r;
  // Subscription 75%, Services 20%, Other 5%
  const segments = [
    { pct: 0.75, color: "#2e6fff" },
    { pct: 0.20, color: "#10b981" },
    { pct: 0.05, color: "#8b5cf6" },
  ];
  let cumulative = 0;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-16" preserveAspectRatio="none">
      {/* Track */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e2e8f0" strokeWidth="9" />
      {segments.map((seg, i) => {
        const dash = seg.pct * c;
        const offset = -cumulative * c; // negative because we rotate
        cumulative += seg.pct;
        return (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={seg.color}
            strokeWidth="9"
            strokeDasharray={`${dash} ${c}`}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${cx} ${cy})`}
            initial={animate ? { strokeDashoffset: offset + c } : false}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
          />
        );
      })}
      {/* Center label */}
      <text
        x={cx}
        y={cy + 1}
        textAnchor="middle"
        fontFamily="DM Sans, sans-serif"
        fontSize="11"
        fontWeight="700"
        fill="#0f172a"
        dominantBaseline="middle"
      >
        $4.2M
      </text>
      {/* Legend */}
      <g fontFamily="DM Sans, sans-serif" fontSize="9" fill="#475569">
        <Legend x={100} y={14} color="#2e6fff" label="Subscription" value="75%" />
        <Legend x={100} y={32} color="#10b981" label="Services"     value="20%" />
        <Legend x={100} y={50} color="#8b5cf6" label="Other"        value="5%" />
      </g>
    </svg>
  );
}

function Legend({
  x, y, color, label, value,
}: {
  x: number; y: number; color: string; label: string; value: string;
}) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x="0" y="-7" width="9" height="9" rx="2" fill={color} />
      <text x="14" y="0" dominantBaseline="middle" fontWeight="600" fill="#0f172a">
        {label}
      </text>
      <text x="160" y="0" dominantBaseline="middle" textAnchor="end" fontWeight="700" fill="#0f172a">
        {value}
      </text>
    </g>
  );
}

function StackedAreaChart({ animate }: { animate: boolean }) {
  // Three product-line revenue series, stacked. Values are monthly (out of 100).
  const productA = [22, 24, 25, 28, 30, 32, 33, 36, 38, 40, 42, 44]; // base
  const productB = [10, 11, 13, 14, 16, 18, 19, 20, 22, 24, 26, 28]; // middle
  const productC = [4, 4, 5, 5, 6, 6, 7, 8, 9, 9, 10, 10];           // top

  const stacked = productA.map((a, i) => ({
    a,
    ab: a + productB[i],
    abc: a + productB[i] + productC[i],
  }));

  // Build path: top-line of segment going right, then bottom going back left.
  function area(top: number[], bottom: number[]) {
    const upper = top
      .map((v, i) => `${i === 0 ? "M" : "L"}${((i / (top.length - 1)) * W).toFixed(1)},${(H - (v / 100) * H).toFixed(1)}`)
      .join(" ");
    const lower = bottom
      .slice()
      .reverse()
      .map((v, i) => {
        const realI = bottom.length - 1 - i;
        return `L${((realI / (bottom.length - 1)) * W).toFixed(1)},${(H - (v / 100) * H).toFixed(1)}`;
      })
      .join(" ");
    return `${upper} ${lower} Z`;
  }

  const zeros = new Array(stacked.length).fill(0);
  const aPath   = area(stacked.map((s) => s.a),   zeros);
  const abPath  = area(stacked.map((s) => s.ab),  stacked.map((s) => s.a));
  const abcPath = area(stacked.map((s) => s.abc), stacked.map((s) => s.ab));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-16" preserveAspectRatio="none">
      <motion.path
        d={aPath}
        fill="#2e6fff"
        fillOpacity="0.85"
        initial={animate ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0, ease: "easeOut" }}
      />
      <motion.path
        d={abPath}
        fill="#5694ff"
        fillOpacity="0.7"
        initial={animate ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
      />
      <motion.path
        d={abcPath}
        fill="#10b981"
        fillOpacity="0.7"
        initial={animate ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      />
      {/* Top stroke for definition */}
      <path
        d={stacked
          .map((s, i) =>
            `${i === 0 ? "M" : "L"}${((i / (stacked.length - 1)) * W).toFixed(1)},${(H - (s.abc / 100) * H).toFixed(1)}`
          )
          .join(" ")}
        fill="none"
        stroke="#0f172a"
        strokeOpacity="0.15"
        strokeWidth="0.8"
      />
    </svg>
  );
}
