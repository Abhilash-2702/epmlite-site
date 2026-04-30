"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, Clock, DollarSign, Sparkles } from "lucide-react";

type Inputs = {
  teamSize: number;
  closeDays: number;
  variancePackHours: number;
  fpaSalaryK: number;
};

const DEFAULTS: Inputs = {
  teamSize: 4,
  closeDays: 11,
  variancePackHours: 40,
  fpaSalaryK: 140,
};

// EPM Lite target performance
const EPM_CLOSE_DAYS = 4;
const EPM_VARIANCE_PACK_HOURS = 1.5;

const WORKING_HOURS_PER_DAY = 8;
const CLOSES_PER_YEAR = 12;
const VARIANCE_PACKS_PER_YEAR = 12;

export default function RoiCalculator() {
  const [inp, setInp] = useState<Inputs>(DEFAULTS);

  const result = useMemo(() => {
    const hourlyRate = (inp.fpaSalaryK * 1000) / (52 * 40);
    const closeHoursToday = inp.teamSize * inp.closeDays * WORKING_HOURS_PER_DAY * CLOSES_PER_YEAR;
    const closeHoursWithEpm = inp.teamSize * EPM_CLOSE_DAYS * WORKING_HOURS_PER_DAY * CLOSES_PER_YEAR;
    const closeHoursSaved = closeHoursToday - closeHoursWithEpm;

    const varianceHoursToday = inp.variancePackHours * VARIANCE_PACKS_PER_YEAR;
    const varianceHoursWithEpm = EPM_VARIANCE_PACK_HOURS * VARIANCE_PACKS_PER_YEAR;
    const varianceHoursSaved = varianceHoursToday - varianceHoursWithEpm;

    const totalHoursSaved = closeHoursSaved + varianceHoursSaved;
    const dollarsSaved = totalHoursSaved * hourlyRate;

    const closeDaysSavedAnnual = (inp.closeDays - EPM_CLOSE_DAYS) * CLOSES_PER_YEAR;

    return {
      hourlyRate,
      closeHoursSaved,
      varianceHoursSaved,
      totalHoursSaved,
      dollarsSaved,
      closeDaysSavedAnnual,
    };
  }, [inp]);

  return (
    <div className="rounded-2xl bg-white border border-surface-200 shadow-elevated overflow-hidden">
      {/* Header */}
      <div className="px-6 lg:px-8 py-5 border-b border-surface-200 bg-gradient-to-r from-brand-50 to-white flex items-center gap-3">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-brand-500 text-white">
          <Calculator className="w-5 h-5" />
        </span>
        <div>
          <h2 className="font-display font-semibold text-slate-900">Close-cycle ROI</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Drag the sliders. Numbers update live.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_1fr] gap-0">
        {/* INPUTS */}
        <div className="p-6 lg:p-8 lg:border-r border-surface-200 space-y-6">
          <Slider
            label="FP&A team size"
            value={inp.teamSize}
            min={1}
            max={20}
            step={1}
            unit="people"
            onChange={(v) => setInp({ ...inp, teamSize: v })}
          />
          <Slider
            label="Current close cycle"
            value={inp.closeDays}
            min={5}
            max={20}
            step={1}
            unit="business days"
            onChange={(v) => setInp({ ...inp, closeDays: v })}
            highlight={inp.closeDays > 8}
          />
          <Slider
            label="Variance pack prep time"
            value={inp.variancePackHours}
            min={5}
            max={80}
            step={5}
            unit="hours / month"
            onChange={(v) => setInp({ ...inp, variancePackHours: v })}
            highlight={inp.variancePackHours > 20}
          />
          <Slider
            label="Average FP&A fully-loaded salary"
            value={inp.fpaSalaryK}
            min={80}
            max={300}
            step={10}
            unit="$k / year"
            onChange={(v) => setInp({ ...inp, fpaSalaryK: v })}
          />
        </div>

        {/* RESULTS */}
        <div className="p-6 lg:p-8 bg-gradient-to-br from-brand-700 to-brand-900 text-white flex flex-col justify-center">
          <p className="text-sm font-semibold text-brand-200 uppercase tracking-wider mb-2">
            With EPM Lite, your team would save
          </p>
          <motion.div
            key={Math.round(result.dollarsSaved)}
            initial={{ scale: 0.96, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="font-display font-bold text-5xl lg:text-6xl tracking-tight tabular-nums leading-none">
              ${formatThousands(Math.round(result.dollarsSaved))}
            </div>
            <div className="text-sm text-brand-200 mt-1">per year, fully-loaded cost</div>
          </motion.div>

          <ul className="mt-6 space-y-3">
            <ResultRow
              Icon={Clock}
              label="Hours saved per year"
              value={`${formatThousands(Math.round(result.totalHoursSaved))} hrs`}
            />
            <ResultRow
              Icon={Clock}
              label="Close days reclaimed"
              value={`${result.closeDaysSavedAnnual} days/yr`}
            />
            <ResultRow
              Icon={DollarSign}
              label="Effective hourly rate used"
              value={`$${result.hourlyRate.toFixed(0)}/hr`}
            />
          </ul>

          <div className="mt-6 pt-6 border-t border-white/10 text-xs text-brand-200 leading-relaxed">
            <Sparkles className="w-3.5 h-3.5 inline-block mr-1 -mt-0.5" />
            Math: 12 closes/yr · 8h working day. EPM Lite targets: 4-day close, 90-min variance pack.
            Real customers may see different numbers — book a demo for a tighter estimate.
          </div>
        </div>
      </div>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
  highlight,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (v: number) => void;
  highlight?: boolean;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <label className="text-sm font-medium text-slate-700">{label}</label>
        <span
          className={`font-display font-bold text-xl tabular-nums leading-none ${
            highlight ? "text-accent-rose" : "text-slate-900"
          }`}
        >
          {value}
          <span className="text-sm font-normal text-slate-500 ml-1.5">{unit}</span>
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        className="w-full h-2 rounded-full appearance-none bg-surface-100 cursor-pointer"
        style={{ accentColor: "#2e6fff" }}
      />
    </div>
  );
}

function ResultRow({
  Icon,
  label,
  value,
}: {
  Icon: typeof Clock;
  label: string;
  value: string;
}) {
  return (
    <li className="flex items-center justify-between gap-3 text-sm">
      <span className="inline-flex items-center gap-2 text-brand-200">
        <Icon className="w-4 h-4" />
        {label}
      </span>
      <span className="font-display font-semibold text-white tabular-nums">{value}</span>
    </li>
  );
}

function formatThousands(n: number): string {
  return n.toLocaleString("en-US");
}
