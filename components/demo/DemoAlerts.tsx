"use client";

import { useState } from "react";
import { Bell, AlertTriangle, CheckCircle2, TrendingUp, Sigma } from "lucide-react";

type Severity = "info" | "warning" | "critical";

type Rule = {
  id: string;
  Icon: typeof Bell;
  type: "Variance vs Budget" | "YoY change" | "Statistical anomaly" | "Magnitude";
  rule: string;
  triggers: { account: string; finding: string; severity: Severity; impact: string }[];
};

const RULES: Rule[] = [
  {
    id: "variance",
    Icon: AlertTriangle,
    type: "Variance vs Budget",
    rule: "Flag if any P&L line is >10% off plan",
    triggers: [
      { account: "S&M / Paid search", finding: "+18% over plan", severity: "warning", impact: "$120k YTD over plan" },
      { account: "R&D / Senior hire",  finding: "−12% under plan", severity: "info",    impact: "$40k YTD under plan" },
    ],
  },
  {
    id: "yoy",
    Icon: TrendingUp,
    type: "YoY change",
    rule: "Flag if YoY change exceeds historical 95% CI",
    triggers: [
      { account: "Hosting & infra", finding: "+34% YoY (+$140k)", severity: "warning", impact: "Outside 95% CI" },
    ],
  },
  {
    id: "anomaly",
    Icon: Sigma,
    type: "Statistical anomaly",
    rule: "Z-score > 2.0 vs trailing-12 baseline",
    triggers: [
      { account: "Customer success / OT", finding: "Z = 2.4", severity: "critical", impact: "$28k spike, single month" },
    ],
  },
  {
    id: "magnitude",
    Icon: Bell,
    type: "Magnitude",
    rule: "Flag any single account moving >$50k in a month",
    triggers: [],
  },
];

const SEVERITY_STYLE: Record<Severity, { bg: string; fg: string; label: string }> = {
  info:     { bg: "bg-brand-50 border-brand-100",      fg: "text-brand-600",       label: "Info" },
  warning:  { bg: "bg-amber-50 border-amber-200",      fg: "text-accent-amber",    label: "Warning" },
  critical: { bg: "bg-rose-50 border-rose-200",        fg: "text-accent-rose",     label: "Critical" },
};

export default function DemoAlerts() {
  const [acked, setAcked] = useState<Set<string>>(new Set());

  return (
    <div>
      <div className="mb-5">
        <h2 className="font-display font-semibold text-lg text-slate-900 flex items-center gap-2">
          <Bell className="w-5 h-5 text-accent-amber" />
          Alerts
        </h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Four rule types. Findings ranked by financial impact, not raw %. Acknowledge to dismiss.
        </p>
      </div>

      <div className="space-y-4">
        {RULES.map((rule) => (
          <div key={rule.id} className="rounded-xl bg-white border border-surface-200 overflow-hidden">
            <div className="px-5 py-3 border-b border-surface-200 bg-surface-50 flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white border border-surface-200 text-slate-600">
                <rule.Icon className="w-4 h-4" />
              </span>
              <div className="flex-1">
                <p className="font-display font-semibold text-slate-900 text-sm">{rule.type}</p>
                <p className="text-xs font-mono text-slate-500">{rule.rule}</p>
              </div>
              <span className="text-xs text-slate-500 font-mono">
                {rule.triggers.length} {rule.triggers.length === 1 ? "trigger" : "triggers"}
              </span>
            </div>
            {rule.triggers.length === 0 ? (
              <div className="px-5 py-4 text-sm text-slate-500 italic flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent-emerald" />
                No triggers this month.
              </div>
            ) : (
              <ul className="divide-y divide-surface-200">
                {rule.triggers.map((t, i) => {
                  const key = `${rule.id}-${i}`;
                  const isAcked = acked.has(key);
                  const sev = SEVERITY_STYLE[t.severity];
                  return (
                    <li
                      key={key}
                      className={`px-5 py-3 flex items-start gap-3 ${isAcked ? "opacity-50" : ""}`}
                    >
                      <span
                        className={`inline-flex items-center text-[10px] font-bold uppercase tracking-wider ${sev.fg} ${sev.bg} border rounded-full px-2 py-0.5 shrink-0 mt-0.5`}
                      >
                        {sev.label}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-900">{t.account}</p>
                        <p className="text-sm text-slate-700 mt-0.5">
                          {t.finding} · <span className="text-slate-500">{t.impact}</span>
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          const next = new Set(acked);
                          if (next.has(key)) next.delete(key);
                          else next.add(key);
                          setAcked(next);
                        }}
                        className="text-xs text-slate-500 hover:text-brand-600 font-semibold whitespace-nowrap"
                      >
                        {isAcked ? "Re-open" : "Ack"}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
