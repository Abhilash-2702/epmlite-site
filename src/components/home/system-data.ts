// Copy, figures and timing for the System band, taken verbatim from the
// approved mock-up (Website/redesign-2026-11/index.html in the NashOS monorepo,
// the "System section" block of its script). Do not reword: the figures and the
// line "Real outcomes from teams running Nash." are owner-approved as written.

export const LEGACY = [
  "Planning",
  "Close",
  "Reporting",
  "Scenarios",
  "Data",
  "Governance",
  "Consolidation",
  "Allocations",
];

export const NASH = [
  "Decision System",
  "Continuous Planning",
  "Data Foundation",
  "Audit & Control",
  "Agentic Execution",
];

export const BEFORE = ["Build", "Model", "Scenario", "Export", "Rework"];

export const NOW = [
  { n: "1", t: "Ask", s: "~5s" },
  { n: "2", t: "System executes", s: "~30s" },
  { n: "3", t: "Draft → Commit", s: "~25s" },
];

export const BEFORE_STATS: [string, string][] = [
  ["Steps", "5"],
  ["Handoffs", "3+"],
  ["Tools", "4–6"],
];

export const NOW_STATS: [string, string][] = [
  ["Steps", "3"],
  ["Handoffs", "0"],
  ["Tools", "1"],
];

export const IMPACT = [
  { k: "Close cycle", from: "11 days", to: "1 day", note: "Compressed from ~11 days to ~1 day." },
  { k: "Variance analysis", from: "40 hours", to: "90 min", note: "Variance pack in ~90 mins." },
  {
    k: "Forecasting",
    from: "Periodic",
    to: "Continuous",
    note: "Instant recompute across drivers.",
  },
  { k: "Decisions", from: "Manual", to: "System", note: "Drafted, reviewed, recorded." },
];

export const SSTEPS = [
  { n: "01", label: "Collapse", tag: "8 modules → 5 systems" },
  { n: "02", label: "Compression", tag: "Driver change → recomputed" },
  { n: "03", label: "Impact", tag: "Cycles → continuous" },
];

/** One step's share of the auto-advance (the connector fills over this time). */
export const AUTO_MS = 7000;
