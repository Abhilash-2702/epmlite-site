"use client";

import { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  Download,
  FileSpreadsheet,
} from "lucide-react";

type Report = "pl" | "bs" | "cf";

type Row = {
  account: string;
  current: number;
  budget: number;
  variance: number;
  children?: Row[];
  bold?: boolean;
};

const PL_DATA: Row[] = [
  {
    account: "Revenue",
    current: 4_200_000,
    budget: 3_750_000,
    variance: 12,
    bold: true,
    children: [
      { account: "Subscription",   current: 3_420_000, budget: 3_000_000, variance: 14 },
      { account: "Services",       current: 612_000,   budget: 570_000,   variance: 7 },
      { account: "Other",          current: 168_000,   budget: 180_000,   variance: -7 },
    ],
  },
  {
    account: "COGS",
    current: -1_344_000,
    budget: -1_237_500,
    variance: -9,
    bold: true,
    children: [
      { account: "Hosting & infra",     current: -504_000, budget: -450_000, variance: -12 },
      { account: "Support staff",        current: -462_000, budget: -450_000, variance: -3 },
      { account: "Customer success",     current: -378_000, budget: -337_500, variance: -12 },
    ],
  },
  { account: "Gross Profit",  current: 2_856_000, budget: 2_512_500, variance: 14, bold: true },
  {
    account: "OpEx",
    current: -1_966_000,
    budget: -1_864_500,
    variance: -5,
    bold: true,
    children: [
      { account: "Sales & Marketing", current: -890_000, budget: -770_000, variance: -16 },
      { account: "R&D",               current: -612_000, budget: -652_000, variance: 6 },
      { account: "G&A",               current: -464_000, budget: -442_500, variance: -5 },
    ],
  },
  { account: "EBITDA",       current: 890_000,    budget: 648_000,   variance: 37, bold: true },
];

const BS_DATA: Row[] = [
  {
    account: "Total Assets",
    current: 14_200_000,
    budget: 14_200_000,
    variance: 0,
    bold: true,
    children: [
      { account: "Cash & equivalents",  current: 8_500_000, budget: 8_200_000, variance: 4 },
      { account: "AR",                  current: 1_840_000, budget: 1_700_000, variance: 8 },
      { account: "PP&E (net)",          current: 2_960_000, budget: 3_100_000, variance: -5 },
      { account: "Goodwill + intangibles", current: 900_000, budget: 1_200_000, variance: -25 },
    ],
  },
  {
    account: "Total Liabilities",
    current: -3_700_000,
    budget: -3_900_000,
    variance: 5,
    bold: true,
    children: [
      { account: "AP",                current: -1_200_000, budget: -1_300_000, variance: 8 },
      { account: "Deferred revenue",  current: -2_100_000, budget: -2_200_000, variance: 5 },
      { account: "Accrued expenses",  current: -400_000,   budget: -400_000,   variance: 0 },
    ],
  },
  { account: "Equity", current: 10_500_000, budget: 10_300_000, variance: 2, bold: true },
];

const CF_DATA: Row[] = [
  { account: "Net income",                        current: 890_000,   budget: 648_000,    variance: 37, bold: true },
  {
    account: "+ D&A",                             current: 220_000,   budget: 230_000,    variance: -4,
  },
  {
    account: "+ Working capital change",          current: -180_000,  budget: -150_000,   variance: -20,
  },
  { account: "Cash from ops",                     current: 930_000,   budget: 728_000,    variance: 28, bold: true },
  { account: "Cash from investing",               current: -240_000,  budget: -300_000,   variance: 20 },
  { account: "Cash from financing",               current: -90_000,   budget: -90_000,    variance: 0 },
  { account: "Net change in cash",                current: 600_000,   budget: 338_000,    variance: 78, bold: true },
];

const REPORT_LABELS: Record<Report, { label: string; data: Row[] }> = {
  pl: { label: "P&L", data: PL_DATA },
  bs: { label: "Balance Sheet", data: BS_DATA },
  cf: { label: "Cash Flow", data: CF_DATA },
};

export default function DemoReports() {
  const [report, setReport] = useState<Report>("pl");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [exported, setExported] = useState<string | null>(null);

  function toggle(account: string) {
    const next = new Set(expanded);
    if (next.has(account)) next.delete(account);
    else next.add(account);
    setExpanded(next);
  }

  function fmt(n: number) {
    const abs = Math.abs(n);
    const formatted =
      abs >= 1_000_000 ? `$${(abs / 1_000_000).toFixed(2)}M` :
      abs >= 1_000     ? `$${(abs / 1_000).toFixed(0)}k`     :
      `$${abs}`;
    return n < 0 ? `(${formatted})` : formatted;
  }

  function exportReport() {
    setExported(`${REPORT_LABELS[report].label}_2026-04-30.pdf`);
    setTimeout(() => setExported(null), 3500);
  }

  const data = REPORT_LABELS[report].data;

  return (
    <div>
      <div className="mb-5 flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h2 className="font-display font-semibold text-lg text-slate-900 flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-brand-500" />
            {REPORT_LABELS[report].label}
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Click any bold row to drill in. Real product: 9-dim cube, drill all the way to the leaf.
          </p>
        </div>
        <button
          onClick={exportReport}
          className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-surface-200 hover:border-brand-200 hover:bg-brand-50 text-slate-700 hover:text-brand-700 text-xs font-semibold px-3 py-2 transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          Export PDF
        </button>
      </div>

      {/* Report switcher */}
      <div className="inline-flex rounded-lg bg-white border border-surface-200 p-1 mb-5">
        {(Object.keys(REPORT_LABELS) as Report[]).map((r) => {
          const active = r === report;
          return (
            <button
              key={r}
              onClick={() => {
                setReport(r);
                setExpanded(new Set());
              }}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                active ? "bg-brand-500 text-white" : "text-slate-600 hover:text-brand-600"
              }`}
            >
              {REPORT_LABELS[r].label}
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="rounded-xl bg-white border border-surface-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-50 border-b border-surface-200 text-xs uppercase tracking-wider text-slate-500">
              <th className="text-left font-semibold px-4 py-3">Account</th>
              <th className="text-right font-semibold px-4 py-3">Current</th>
              <th className="text-right font-semibold px-4 py-3">Budget</th>
              <th className="text-right font-semibold px-4 py-3">Variance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-200">
            {data.map((row) => (
              <RowRender
                key={row.account}
                row={row}
                expanded={expanded}
                toggle={toggle}
                fmt={fmt}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Export toast */}
      {exported && (
        <div className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-slate-700 flex items-center gap-2">
          <Download className="w-4 h-4 text-accent-emerald" />
          Exported <span className="font-mono text-slate-900">{exported}</span> · in the real product, the file lands in /exports/.
        </div>
      )}
    </div>
  );
}

function RowRender({
  row,
  expanded,
  toggle,
  fmt,
  depth = 0,
}: {
  row: Row;
  expanded: Set<string>;
  toggle: (a: string) => void;
  fmt: (n: number) => string;
  depth?: number;
}) {
  const isExpandable = !!row.children;
  const isOpen = expanded.has(row.account);
  const tone =
    row.variance > 1 ? "text-accent-emerald" :
    row.variance < -1 ? "text-accent-rose" :
    "text-slate-500";

  return (
    <>
      <tr
        className={`${row.bold ? "bg-surface-50/50 font-display font-semibold" : ""} ${
          isExpandable ? "cursor-pointer hover:bg-brand-50/40" : ""
        }`}
        onClick={() => isExpandable && toggle(row.account)}
      >
        <td className="px-4 py-2.5" style={{ paddingLeft: `${1 + depth * 1.5}rem` }}>
          <span className="inline-flex items-center gap-1.5 text-slate-900">
            {isExpandable ? (
              isOpen ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            ) : (
              <span className="w-3.5 h-3.5" />
            )}
            {row.account}
          </span>
        </td>
        <td className="px-4 py-2.5 text-right tabular-nums text-slate-900">{fmt(row.current)}</td>
        <td className="px-4 py-2.5 text-right tabular-nums text-slate-500">{fmt(row.budget)}</td>
        <td className={`px-4 py-2.5 text-right tabular-nums font-mono text-xs ${tone}`}>
          {row.variance > 0 ? "+" : ""}
          {row.variance.toFixed(0)}%
        </td>
      </tr>
      {isOpen &&
        row.children?.map((c) => (
          <RowRender
            key={c.account}
            row={c}
            expanded={expanded}
            toggle={toggle}
            fmt={fmt}
            depth={depth + 1}
          />
        ))}
    </>
  );
}
