/**
 * Per-persona content for the home page. Each section component imports
 * the relevant block from PERSONA_CONTENT[persona].
 *
 * Personas:
 *   cfo     — board, audit, IPO-readiness
 *   fpa     — close cycles, forecasts, drivers (the canonical FP&A operator)
 *   founder — runway, hiring, burn (non-finance founder running ops)
 */

import type { Persona } from "@/components/PersonaContext";

export type DashboardKpi = {
  label: string;
  value: string;
  delta: string;
  tone: "emerald" | "rose" | "slate";
  highlight?: boolean;
};

export type DashboardChart = {
  id: "line" | "bar" | "donut" | "area";
  title: string;
  caption: string;
  prompt: string;
};

export type PersonaContent = {
  // Hero
  heroH1Line1: string;
  heroH1Line2: string;
  heroSubhead: string;
  heroPrimaryCTA: { label: string; href: string };
  heroSecondaryCTA: { label: string; href: string };

  // Capability stats strip in hero
  stats: { stat: string; label: string }[];

  // Animated dashboard mockup (in hero, right side)
  dashboardKpis: DashboardKpi[]; // exactly 4
  dashboardCharts: DashboardChart[]; // exactly 4 — line/bar/donut/area in this order
  dashboardLabel: string; // window-chrome subtitle, e.g. "executive dashboard"

  // Pain section (4 cards)
  painKicker: string;
  painHeadline: string;
  painSub: string;
  painCards: { headline: string; body: string }[];
  painSummary: string;

  // How section (3 steps)
  howKicker: string;
  howHeadline: string;
  howSteps: { num: string; title: string; body: string }[];

  // FeatureGrid (6 cards) — same icon set, persona-tailored copy + ordering
  featuresKicker: string;
  featuresHeadline: string;
  featuresSub: string;
  features: {
    iconKey: "BarChart3" | "FileSpreadsheet" | "GitBranch" | "Sparkles" | "FlaskConical" | "TrendingUp" | "ShieldCheck" | "Coins" | "Users" | "TrendingDown" | "PieChart" | "FileEdit";
    title: string;
    headline: string;
    body: string;
    highlight?: boolean;
  }[];

  // ChatShowcase
  chatKicker: string;
  chatHeadline: string;
  chatSub: string;
  chatExchange: { user: string; toolLines: string[]; answerHeadline: string; answerBody: string };
  chatPrompts: string[];

  // FAQ (5 items)
  faq: { q: string; a: string }[];

  // Bottom CTA
  ctaHeadline: string;
  ctaSub: string;
};

const FPA: PersonaContent = {
  heroH1Line1: "Reports in days, not weeks.",
  heroH1Line2: "Forecasts in minutes.",
  heroSubhead:
    "For finance teams tired of Excel gymnastics. 35+ AI tools, 15 forecast algorithms, and a plain-English agent that drafts every change before it commits.",
  heroPrimaryCTA: { label: "Try the live demo", href: "/demo" },
  heroSecondaryCTA: { label: "Book a 15-min demo", href: "mailto:admin@epmlite.com?subject=EPM%20Lite%20demo" },
  stats: [
    { stat: "35+", label: "AI tools" },
    { stat: "15", label: "Forecast algorithms" },
    { stat: "4 days", label: "for monthly reports (vs 12)" },
  ],
  dashboardLabel: "executive dashboard",
  dashboardKpis: [
    { label: "Revenue",      value: "$4.2M",  delta: "▲ 12%",   tone: "emerald", highlight: true },
    { label: "Gross Profit", value: "68%",    delta: "▲ 3 pts", tone: "emerald" },
    { label: "EBITDA",       value: "$890k",  delta: "▼ 2%",    tone: "rose" },
    { label: "Runway",       value: "14 mo",  delta: "—",       tone: "slate" },
  ],
  dashboardCharts: [
    { id: "line",  title: "Revenue · last 12 months",     caption: "vs Budget",        prompt: "What's our runway if revenue drops 30%?" },
    { id: "bar",   title: "Cost structure · this month",  caption: "5 OpEx categories",prompt: "Why is S&M 18% over plan this month?" },
    { id: "donut", title: "Revenue mix · YTD",            caption: "$4.2M total",      prompt: "What's our subscription concentration risk?" },
    { id: "area",  title: "Revenue by product · 12 months", caption: "3 product lines",prompt: "How is Product B trending vs forecast?" },
  ],
  painKicker: "The problem",
  painHeadline: "Your team spends 60% of the month rebuilding the same spreadsheet.",
  painSub: "And the answer is usually obsolete by the time the board sees it.",
  painCards: [
    { headline: "Close takes 8–12 business days", body: "Manual consolidation across entities + currencies; reconciliation runs over the weekend." },
    { headline: "Forecast accuracy hovers at ±15%", body: "Static models; no quick what-if; decisions made on stale numbers." },
    { headline: "No audit trail on the plan", body: "Who changed the COGS assumption? Lost in Excel version history." },
    { headline: "Board variance analysis = 40 hours", body: "Copy-paste from three tools; one broken formula breaks the whole pack." },
  ],
  painSummary:
    "Capital is expensive — and CFOs are being asked weekly the questions they used to answer quarterly.",
  howKicker: "How it works",
  howHeadline: "Three steps. Hours, not months.",
  howSteps: [
    { num: "01", title: "Connect", body: "Pull from REST APIs, SFTP, Excel, CSV — or drop a file into Bulk Import. The 9-dimension cube absorbs whatever you have." },
    { num: "02", title: "Plan", body: "Build drivers (FTE, units, %, hours). Write member formulas. Run 15 forecasting algorithms side-by-side. What-if any change before you commit it." },
    { num: "03", title: "Decide", body: "Ask in plain English. The agent drafts the answer, runs the forecast, and shows the variance. Audit trail captures every change with who/when/before-after." },
  ],
  featuresKicker: "Features",
  featuresHeadline: "Everything an FP&A team actually needs.",
  featuresSub: "Forget the 50-feature checklist. These are the six that move the needle.",
  features: [
    { iconKey: "BarChart3",      title: "Executive Dashboard",     headline: "Real-time KPIs at a glance.", body: "Revenue, Gross Profit, EBITDA, Net Income, COGS, OPEX. Variance vs Budget on every card." },
    { iconKey: "FileSpreadsheet",title: "P&L · BS · Cash Flow",    headline: "Canonical reports with full hierarchy.", body: "Drill from rollups to leaves. Multi-currency. CSV / Excel / PDF export from any view." },
    { iconKey: "GitBranch",      title: "Driver-Based Planning",   headline: "Connect business drivers to financial outcomes.", body: "Build formulas like SALARIES_ENG = HEADCOUNT_ENG × −10000. Top-down assumptions flow into P&L." },
    { iconKey: "Sparkles",       title: "AI Chat",                 headline: "Plain-English finance.",      body: "35+ tools cover ~99% of manual app actions. Every write previewed in a draft card before commit.", highlight: true },
    { iconKey: "FlaskConical",   title: "What-If Scenarios",        headline: "Test decisions before you make them.", body: "Drag a slider. See revenue, EBITDA, runway react. Variance results in <1 second." },
    { iconKey: "TrendingUp",     title: "ML Forecasting",           headline: "15 algorithms, one click.",  body: "Linear, ARIMA, Holt-Winters, Random Forest, Gradient Boosting. Compare with R²/RMSE/MAPE." },
  ],
  chatKicker: "The differentiator",
  chatHeadline: "Ask in English. Get drafts, charts, and forecasts.",
  chatSub: "Your analyst team multiplied. Every answer cites its source.",
  chatExchange: {
    user: "What's our runway if revenue drops 30%?",
    toolLines: [
      "→ Ran what_if_preview on revenue −30% across all entities",
      "→ Pulled CF_OPS history + linear-regression forecast",
      "→ Subtracted CA_CASH baseline",
    ],
    answerHeadline: "Result: ~7 months at the current burn rate.",
    answerBody: "Best case: 9 months (if marketing cuts 40%). Worst case: 4 months (if AR collection slips).",
  },
  chatPrompts: [
    "What's December revenue for Singapore consulting?",
    "Hire 3 engineers and show the impact on runway",
    "Update JPY exchange rate to 150",
    "Download this dashboard as PDF",
  ],
  faq: [
    { q: "How long does setup take?", a: "Hours, not months. Connect REST/SFTP/Excel/CSV (or paste a trial balance), and the 9-dim cube absorbs it. Most teams have a usable Executive Summary the same day." },
    { q: "Can I self-host?", a: "Yes — Enterprise tier. Self-host on your VPC for compliance reasons. Postgres + Node + React, no external dependencies except the LLM provider." },
    { q: "Which AI provider does it use?", a: "Both Gemini 2.5-flash (default) and Claude Haiku 4.5 are supported, swappable via env var. Prompt caching keeps API costs around $0.40/user/month." },
    { q: "What about my data? Is it safe?", a: "Your data stays in your database. Multi-tenant cloud uses workspace row-level isolation; self-host puts the database entirely in your environment. The LLM never sees raw fact tables." },
    { q: "What's on the roadmap?", a: "Near-term: Designer (drag-drop dashboards), Approval workflow, AI variance commentary. Medium-term: Multi-tenant SaaS, SSO, NetSuite/QuickBooks. Long-term: ML anomaly alerts, native mobile." },
  ],
  ctaHeadline: "Stop fighting Excel.\nStart asking questions.",
  ctaSub: "Get a 15-minute walkthrough on your own data. No slides, no sales script — just the AI agent live with your numbers.",
};

const CFO: PersonaContent = {
  heroH1Line1: "Board-ready by Monday.",
  heroH1Line2: "Audit-grade, every change.",
  heroSubhead:
    "Plain-English answers to the questions your board is asking weekly. Pre-IPO due-diligence ready on day one. Every chat-driven write is drafted, reviewed, and audit-trailed.",
  heroPrimaryCTA: { label: "See it on your data", href: "/demo" },
  heroSecondaryCTA: { label: "Book a CFO walkthrough", href: "mailto:admin@epmlite.com?subject=EPM%20Lite%20CFO%20walkthrough" },
  stats: [
    { stat: "100%", label: "audit-trailed mutations" },
    { stat: "90 min", label: "for the variance pack (vs 40 hr)" },
    { stat: "Day 1", label: "pre-IPO ready" },
  ],
  dashboardLabel: "CFO board view",
  dashboardKpis: [
    { label: "EBITDA Margin",   value: "21%",     delta: "▲ 4 pts",  tone: "emerald", highlight: true },
    { label: "Vs Budget",        value: "+37%",    delta: "▲ favorable", tone: "emerald" },
    { label: "Days to Close",    value: "4 days",  delta: "▼ 8 days", tone: "emerald" },
    { label: "Audit Trail",      value: "100%",    delta: "—",        tone: "slate" },
  ],
  dashboardCharts: [
    { id: "line",  title: "EBITDA · last 12 months",          caption: "vs Budget",            prompt: "Generate the variance commentary on EBITDA" },
    { id: "bar",   title: "Top 5 movers · this month",         caption: "by financial impact",  prompt: "Which OpEx line drove the most variance?" },
    { id: "donut", title: "Audit log · this month",            caption: "by table",             prompt: "Show me all formula changes this quarter" },
    { id: "area",  title: "Forecast accuracy · 12 months",     caption: "3 algorithms compared",prompt: "Why did our re-forecast miss in March?" },
  ],
  painKicker: "The CFO's reality",
  painHeadline: "The board asks weekly questions you used to answer quarterly.",
  painSub: "And the auditor wants to know who changed the COGS assumption.",
  painCards: [
    { headline: "Variance pack prep = 40 hours", body: "Three FP&A analysts. Two days. One broken VLOOKUP and the whole pack restarts." },
    { headline: "No audit trail = no IPO", body: "Spreadsheet history isn't a control. Pre-IPO due diligence demands actor + timestamp + before/after for every mutation." },
    { headline: "Weekly re-forecasts = weekend work", body: "Capital costs went up. Boards want weekly answers. Your team can't deliver weekly without burning out." },
    { headline: "AI doing what without my approval?", body: "Auto-writes from a chatbot to live financials? Not without an approver in the loop and a draft queue." },
  ],
  painSummary:
    "The CFO who can answer 'why is EBITDA off?' in 90 minutes wins the next board meeting — and the next round.",
  howKicker: "How it works",
  howHeadline: "Three steps to a board-ready close.",
  howSteps: [
    { num: "01", title: "Govern", body: "RBAC at every layer (super_admin · admin · planner · viewer). Approval workflow on every chat-driven write. Audit trail with before/after JSON." },
    { num: "02", title: "Consolidate", body: "Continuous connectors land trial balance on day 1, not day 5. Multi-entity, multi-currency, automatic reconciliation in the cube." },
    { num: "03", title: "Decide", body: "The agent drafts variance commentary on the top 3 movers. You edit, you ratify, the audit trail captures the decision. Board pack in hours." },
  ],
  featuresKicker: "What CFOs need",
  featuresHeadline: "Audit-grade. Board-ready. Pre-IPO.",
  featuresSub: "The control surfaces that satisfy your auditor and your board.",
  features: [
    { iconKey: "ShieldCheck",    title: "Audit Log",             headline: "Every mutation, captured.", body: "Dim members, fact rows, formulas, users, exchange rates — all logged with before/after JSON, actor, timestamp. Filterable and queryable." },
    { iconKey: "FileEdit",       title: "Approval Workflow",     headline: "No silent writes from the AI.", body: "Every chat-driven write produces a draft. An approver reviews, posts, audit log captures both events. Auto-mutation off by default.", highlight: true },
    { iconKey: "FileSpreadsheet",title: "Board-Ready Reports",   headline: "P&L · BS · CF in 4 days, not 12.", body: "Drill from TOTAL_PL to leaves. Multi-currency, multi-entity. PDF export styled for board distribution." },
    { iconKey: "Sparkles",       title: "AI Variance Commentary",headline: "Drafts the 'why' on top movers.", body: "Top 3 line items by impact. Paragraph commentary auto-drafted. CFO edits, doesn't write from scratch." },
    { iconKey: "TrendingUp",     title: "Weekly Re-forecasting", headline: "Cheap to run, every week.",   body: "15 algorithms, driver-based plan, 9-dim cube. The Friday board ask comes back ratified by Monday." },
    { iconKey: "Coins",          title: "RBAC + SSO",            headline: "Enterprise governance, day one.", body: "Four roles · workspace isolation · short-lived JWTs + refresh rotation · SSO via SAML/OIDC on Enterprise tier." },
  ],
  chatKicker: "The control surface",
  chatHeadline: "Ask the question. Ratify the answer. Auditor sees the trail.",
  chatSub: "Every chat-driven mutation drafts → reviews → commits → audit-logs. The LLM never writes directly.",
  chatExchange: {
    user: "Generate the variance commentary on EBITDA for last month.",
    toolLines: [
      "→ Pulled EBITDA actual vs budget · 12-month trail",
      "→ Ranked top 3 movers by financial impact",
      "→ Drafted paragraph commentary · cited cube source for each line",
    ],
    answerHeadline: "Drafted: EBITDA was $890k vs $648k budget (+37%).",
    answerBody: "Top 3 drivers: revenue beat (+$240k, ARR cohort retention), R&D underspend ($-40k, delayed senior hire), and S&M overspend (-$120k, paid-search test). Ratify or edit?",
  },
  chatPrompts: [
    "Generate the variance commentary on EBITDA",
    "Pre-IPO readiness gap by control area",
    "Show the audit log for COGS this quarter",
    "Run the board-ready P&L for review",
  ],
  faq: [
    { q: "Is EPM Lite pre-IPO ready?", a: "Day one. Every dim/fact/formula/user/exchange-rate mutation is logged with before/after JSON, actor, timestamp. RBAC at the API layer. Draft-before-commit on every chat write. SOC 2 Type 1 in progress (timeline available under NDA)." },
    { q: "Can the AI auto-commit financial changes?", a: "No. Every write produces a draft card. The user (or an approver, on Enterprise) clicks Post. The backend re-validates the draft on commit. The LLM never gets database credentials." },
    { q: "How do you handle multi-entity consolidation?", a: "Native to the 9-dim cube — Entity is one of the dimensions. Inter-company eliminations are formulas, not workbook tabs. Multi-currency translation runs at the cube layer with FX rates pulled per period." },
    { q: "What's the Enterprise tier?", a: "Self-host or single-tenant cloud, SSO (SAML/OIDC), custom connectors (Oracle, SAP, NetSuite), dedicated success engineer, SLA, white-label. Pricing scales with ACV — talk to us." },
    { q: "Roadmap items I should know about?", a: "Near-term: AI variance commentary (live), approval workflow (live), Designer (drag-drop dashboards). Medium-term: SOC 2 Type 2, NetSuite + QuickBooks connectors, substitution variables for row-level security." },
  ],
  ctaHeadline: "The CFO who answers in 90 minutes\nwins the next board meeting.",
  ctaSub: "20-minute walkthrough on your real numbers. We'll plug in your trial balance and run the variance commentary live.",
};

const FOUNDER: PersonaContent = {
  heroH1Line1: "Run finance like a 50-person team.",
  heroH1Line2: "Solo, with AI.",
  heroSubhead:
    "Get monthly reports in hours, not days. Stress-test runway, hiring, and burn live. Built so a non-finance founder can self-serve — no model-builder team, no FP&A hire required.",
  heroPrimaryCTA: { label: "Try the live demo", href: "/demo" },
  heroSecondaryCTA: { label: "Book a founder walkthrough", href: "mailto:admin@epmlite.com?subject=EPM%20Lite%20founder%20walkthrough" },
  stats: [
    { stat: "60 sec", label: "to a runway answer" },
    { stat: "0", label: "FP&A hires required" },
    { stat: "30 min", label: "to draft the board pack" },
  ],
  dashboardLabel: "founder console",
  dashboardKpis: [
    { label: "Runway",   value: "14 mo",     delta: "▲ 2 mo",  tone: "emerald", highlight: true },
    { label: "Cash",     value: "$8.5M",     delta: "—",       tone: "slate" },
    { label: "Burn",     value: "$480k/mo",  delta: "▼ 5%",    tone: "emerald" },
    { label: "MRR",      value: "$350k",     delta: "▲ 18%",   tone: "emerald" },
  ],
  dashboardCharts: [
    { id: "line",  title: "Cash trajectory · 12 months",         caption: "actual vs plan",     prompt: "What's runway if we hire 5 engineers in Q3?" },
    { id: "bar",   title: "Burn by category · this month",        caption: "where is it going?", prompt: "Where can we cut to extend runway 3 months?" },
    { id: "donut", title: "MRR by product · current",             caption: "$350k total",        prompt: "What's our customer concentration risk?" },
    { id: "area",  title: "ARR cohorts · last 12 months",         caption: "by signup quarter",  prompt: "How are our Q1 cohorts retaining vs Q2?" },
  ],
  painKicker: "The founder's reality",
  painHeadline: "You're the FP&A team. And the marketing team. And the hiring team.",
  painSub: "And every board meeting is its own three-day sprint.",
  painCards: [
    { headline: "Runway questions cost half a day", body: "Pull Stripe export → reconcile → rebuild the burn model → answer the board. Three hours minimum." },
    { headline: "Bookkeepers can't answer 'what if'", body: "Your bookkeeper closes the books. They don't model 'hire 5 engineers' or 'extend runway 6 months without slowing growth'." },
    { headline: "Board pack from scratch every month", body: "Same five charts. Same commentary structure. Yet you rebuild it from zero every time the board asks." },
    { headline: "AI tools that don't know your numbers", body: "ChatGPT can't answer 'what's my runway' because it doesn't see your cash, your burn, or your forward bookings." },
  ],
  painSummary:
    "Until you have the budget for an FP&A hire, EPM Lite is the FP&A hire.",
  howKicker: "How it works",
  howHeadline: "Three steps. No FP&A degree required.",
  howSteps: [
    { num: "01", title: "Connect", body: "Plug in Stripe + your bank + (optionally) QuickBooks. The cube auto-builds your P&L, cash position, and burn from real data — not screenshots." },
    { num: "02", title: "Ask", body: "Type questions in English. \"What's runway if we hire 5 engineers?\" \"What if we cut marketing 40%?\" The agent answers with the math, not vibes." },
    { num: "03", title: "Decide", body: "Save the scenario. Share with the board. Re-run when assumptions change. Every decision is captured with the rationale." },
  ],
  featuresKicker: "What founders need",
  featuresHeadline: "Finance answers, no FP&A team required.",
  featuresSub: "Built for the founder who's running ops, not modeling DCFs.",
  features: [
    { iconKey: "TrendingDown",   title: "Runway Calculator",      headline: "Live, on your real cash position.", body: "Burn rate (trailing 6mo) + cash on hand → months of runway. Stress-test with revenue or expense shocks instantly.", highlight: true },
    { iconKey: "Users",          title: "Hiring Impact Modeler", headline: "Type the change. See the effect.", body: "'Hire 3 engineers in Q3' → P&L recomputes, burn rises, runway shortens, board chart updates. 60 seconds." },
    { iconKey: "Sparkles",       title: "AI Agent",              headline: "Your finance team, in plain English.", body: "35+ tools that read, plan, forecast, and draft writes. Built for non-finance founders to self-serve." },
    { iconKey: "FileEdit",       title: "Board Pack Drafted",     headline: "Not built from scratch.",     body: "P&L, cash position, runway, top movers, narrative — all auto-assembled. You edit, ratify, send." },
    { iconKey: "FlaskConical",   title: "What-If Scenarios",      headline: "Drag the slider, see the impact.", body: "Revenue down 30%? Marketing cut 40%? Hire pause? See cash, EBITDA, and runway react in real time." },
    { iconKey: "PieChart",       title: "Cash Flow Visibility",  headline: "Where every dollar goes.",    body: "Sources + uses + ending cash on a single page. Updated daily from your connectors. No spreadsheet to maintain." },
  ],
  chatKicker: "The founder's copilot",
  chatHeadline: "The questions that used to cost you a day.",
  chatSub: "Now they take 60 seconds. The agent reads your cube, runs the math, drafts the answer.",
  chatExchange: {
    user: "Hire 5 engineers in Q3 — what's the runway impact?",
    toolLines: [
      "→ Updated HEADCOUNT_ENG +5 effective Q3 · scenario draft",
      "→ Recomputed SALARIES_ENG, SAAS_PER_EMPLOYEE, recruiter fees",
      "→ Re-ran cash-flow forecast · 24-month projection",
    ],
    answerHeadline: "Runway shortens 14 → 11 months.",
    answerBody: "Total burn rises $45k/mo from month 4. To stay at 14 months, either close $1.5M ARR by Q4 or delay 2 hires to Q1 2027. Save scenario as 'Q3-engineering-push'?",
  },
  chatPrompts: [
    "What's our runway if we miss Q3 by 20%?",
    "Hire 3 engineers — show the impact",
    "Cut marketing 40% — what's the new runway?",
    "Draft the board update for this month",
  ],
  faq: [
    { q: "Do I need a finance background?", a: "No. EPM Lite is designed for non-finance founders. The agent handles the formulas; you handle the assumptions. If you can describe a hiring plan in English, you can run a runway model." },
    { q: "Does it integrate with Stripe and QuickBooks?", a: "Stripe via REST today. QuickBooks via CSV today, native connector on the near-term roadmap (Q3 2026). Bank feeds via Plaid coming Q4." },
    { q: "When should I hire an FP&A person?", a: "When ARR crosses ~$5-10M and you're closing books > 8 days. Until then, EPM Lite + a part-time controller is enough. Honest answer: we'd rather you stay self-serve as long as possible." },
    { q: "Pricing for early-stage founders?", a: "Starter at $99/mo covers 3 users + 1 entity — enough for a pre-Series-A founder. Pre-seed and non-profit get 50% off Starter; just email us." },
    { q: "Is my financial data safe?", a: "Multi-tenant cloud uses workspace row-level isolation. Self-host puts the database entirely in your environment. The LLM never sees raw fact tables — only the messages and tool results from your chat." },
  ],
  ctaHeadline: "Until you can afford an FP&A hire,\nwe are the FP&A hire.",
  ctaSub: "15-minute walkthrough on your numbers. We'll plug in Stripe + your bank and run a runway scenario live.",
};

export const PERSONA_CONTENT: Record<Persona, PersonaContent> = {
  cfo: CFO,
  fpa: FPA,
  founder: FOUNDER,
};
