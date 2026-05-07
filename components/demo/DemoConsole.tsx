"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Sparkles,
  FlaskConical,
  TrendingUp,
  FileSpreadsheet,
  GitBranch,
  Bell,
  History,
} from "lucide-react";
import DemoDashboard from "./DemoDashboard";
import DemoChat from "./DemoChat";
import DemoWhatIf from "./DemoWhatIf";
import DemoForecast from "./DemoForecast";
import DemoReports from "./DemoReports";
import DemoDrivers from "./DemoDrivers";
import DemoAlerts from "./DemoAlerts";
import DemoAudit from "./DemoAudit";

type Tab =
  | "dashboard"
  | "reports"
  | "chat"
  | "whatif"
  | "forecast"
  | "drivers"
  | "alerts"
  | "audit";

const TABS: { id: Tab; label: string; Icon: typeof LayoutDashboard; group: 1 | 2 }[] = [
  { id: "dashboard", label: "Dashboard",   Icon: LayoutDashboard, group: 1 },
  { id: "reports",   label: "Reports",     Icon: FileSpreadsheet, group: 1 },
  { id: "chat",      label: "AI Chat",     Icon: Sparkles,        group: 1 },
  { id: "whatif",    label: "What-If",     Icon: FlaskConical,    group: 1 },
  { id: "forecast",  label: "Forecasting", Icon: TrendingUp,      group: 2 },
  { id: "drivers",   label: "Drivers",     Icon: GitBranch,       group: 2 },
  { id: "alerts",    label: "Alerts",      Icon: Bell,            group: 2 },
  { id: "audit",     label: "Audit",       Icon: History,         group: 2 },
];

export default function DemoConsole() {
  const [tab, setTab] = useState<Tab>("dashboard");

  return (
    <div className="rounded-2xl bg-white border border-surface-200 shadow-elevated overflow-hidden">
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 px-5 py-3 border-b border-surface-200 bg-surface-50">
        <span className="w-2.5 h-2.5 rounded-full bg-rose-300" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
        <span className="ml-3 text-xs text-slate-400 font-mono">
          nashos · acme corp · sample data
        </span>
        <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-accent-emerald bg-emerald-50 px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse" />
          Live
        </span>
      </div>

      {/* Tab bar */}
      <div className="flex items-stretch border-b border-surface-200 bg-white overflow-x-auto">
        {TABS.map((t) => {
          const active = t.id === tab;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`relative inline-flex items-center gap-2 px-4 lg:px-5 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                active
                  ? "text-brand-600"
                  : "text-slate-600 hover:text-brand-600 hover:bg-surface-50"
              }`}
            >
              <t.Icon className="w-4 h-4" />
              {t.label}
              {active && (
                <span className="absolute left-3 right-3 bottom-0 h-0.5 bg-brand-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="p-5 lg:p-8 bg-surface-50 min-h-[560px]">
        {tab === "dashboard" && <DemoDashboard />}
        {tab === "reports"   && <DemoReports />}
        {tab === "chat"      && <DemoChat />}
        {tab === "whatif"    && <DemoWhatIf />}
        {tab === "forecast"  && <DemoForecast />}
        {tab === "drivers"   && <DemoDrivers />}
        {tab === "alerts"    && <DemoAlerts />}
        {tab === "audit"     && <DemoAudit />}
      </div>
    </div>
  );
}
