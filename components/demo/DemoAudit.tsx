"use client";

import { useState } from "react";
import { History, Filter, User, ChevronRight } from "lucide-react";

type Mutation = {
  id: string;
  ts: string; // human
  actor: string;
  action: "UPDATE" | "INSERT" | "DELETE";
  table: "fact" | "dim" | "formula" | "user" | "exch_rate";
  description: string;
  before?: string;
  after?: string;
};

const MUTATIONS: Mutation[] = [
  {
    id: "m1",
    ts: "2 minutes ago",
    actor: "alex@acme.com",
    action: "UPDATE",
    table: "exch_rate",
    description: "JPY rate FY26",
    before: '{ "USD/JPY": 145.20 }',
    after:  '{ "USD/JPY": 150.00 }',
  },
  {
    id: "m2",
    ts: "12 minutes ago",
    actor: "alex@acme.com",
    action: "INSERT",
    table: "fact",
    description: "Revenue FY26 May · Singapore consulting",
    after: '{ "amount": 50000000, "currency": "USD", "scenario": "Forecast_v3" }',
  },
  {
    id: "m3",
    ts: "1 hour ago",
    actor: "agent (chat) → alex@acme.com posted",
    action: "UPDATE",
    table: "formula",
    description: "SALARIES_ENG member formula",
    before: '"= HEADCOUNT_ENG × -8500"',
    after:  '"= HEADCOUNT_ENG × -10000"',
  },
  {
    id: "m4",
    ts: "3 hours ago",
    actor: "priya@acme.com",
    action: "INSERT",
    table: "dim",
    description: "Added entity 'JP-Tokyo'",
    after: '{ "code": "JP-TOK", "currency": "JPY", "parent": "APAC" }',
  },
  {
    id: "m5",
    ts: "yesterday",
    actor: "system",
    action: "INSERT",
    table: "fact",
    description: "Connector run · NetSuite trial balance · 142 rows",
  },
  {
    id: "m6",
    ts: "yesterday",
    actor: "alex@acme.com",
    action: "UPDATE",
    table: "user",
    description: "Granted 'planner' role to morgan@acme.com",
    before: '{ "role": "viewer" }',
    after:  '{ "role": "planner" }',
  },
];

const ACTION_STYLE: Record<Mutation["action"], string> = {
  UPDATE: "text-accent-amber bg-amber-50 border-amber-200",
  INSERT: "text-accent-emerald bg-emerald-50 border-emerald-200",
  DELETE: "text-accent-rose bg-rose-50 border-rose-200",
};

const TABLE_FILTERS = ["all", "fact", "dim", "formula", "user", "exch_rate"] as const;

export default function DemoAudit() {
  const [filter, setFilter] = useState<(typeof TABLE_FILTERS)[number]>("all");
  const [openId, setOpenId] = useState<string | null>("m3");

  const visible = filter === "all" ? MUTATIONS : MUTATIONS.filter((m) => m.table === filter);

  return (
    <div>
      <div className="mb-5">
        <h2 className="font-display font-semibold text-lg text-slate-900 flex items-center gap-2">
          <History className="w-5 h-5 text-slate-700" />
          Audit log
        </h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Every mutation logged with actor, timestamp, before/after JSON. Click any row to expand.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Filter className="w-4 h-4 text-slate-500 ml-1" />
        {TABLE_FILTERS.map((t) => {
          const active = t === filter;
          return (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`rounded-full text-xs font-mono px-3 py-1.5 border transition-colors ${
                active
                  ? "bg-brand-500 text-white border-brand-500"
                  : "bg-white text-slate-600 border-surface-200 hover:border-brand-200 hover:text-brand-600"
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>

      <div className="rounded-xl bg-white border border-surface-200 overflow-hidden divide-y divide-surface-200">
        {visible.map((m) => {
          const isOpen = openId === m.id;
          return (
            <div key={m.id}>
              <button
                onClick={() => setOpenId(isOpen ? null : m.id)}
                className="w-full flex items-start gap-3 px-5 py-3 text-left hover:bg-surface-50 transition-colors"
              >
                <ChevronRight
                  className={`w-4 h-4 text-slate-400 mt-1 shrink-0 transition-transform ${
                    isOpen ? "rotate-90" : ""
                  }`}
                />
                <span
                  className={`inline-flex items-center text-[10px] font-bold uppercase tracking-wider border rounded-md px-1.5 py-0.5 shrink-0 mt-0.5 ${ACTION_STYLE[m.action]}`}
                >
                  {m.action}
                </span>
                <span className="text-[10px] font-mono text-slate-400 bg-surface-50 border border-surface-200 rounded-md px-1.5 py-0.5 shrink-0 mt-0.5">
                  {m.table}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-900">{m.description}</p>
                  <p className="text-xs text-slate-500 font-mono mt-0.5 inline-flex items-center gap-1.5">
                    <User className="w-3 h-3" />
                    {m.actor} · {m.ts}
                  </p>
                </div>
              </button>
              {isOpen && (m.before || m.after) && (
                <div className="px-5 pb-4 grid sm:grid-cols-2 gap-3">
                  {m.before && (
                    <div className="rounded-lg bg-rose-50 border border-rose-100 p-3">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-accent-rose mb-1.5">
                        Before
                      </p>
                      <pre className="text-xs font-mono text-slate-700 whitespace-pre-wrap break-all">
                        {m.before}
                      </pre>
                    </div>
                  )}
                  {m.after && (
                    <div className="rounded-lg bg-emerald-50 border border-emerald-100 p-3">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-accent-emerald mb-1.5">
                        After
                      </p>
                      <pre className="text-xs font-mono text-slate-700 whitespace-pre-wrap break-all">
                        {m.after}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-slate-500 italic">
        In the real product: filterable by table, action, actor, date range. Indexed for {`< 1 sec`} query
        across millions of mutations.
      </p>
    </div>
  );
}
