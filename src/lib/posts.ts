// Inline blog content. Each post is a self-contained record so we don't need
// MDX or a CMS. To add a post, append to POSTS — body uses double-newline for
// paragraph breaks; the route renders each block as a <p>.

export type PostCategory = "process" | "forecasting" | "concepts" | "playbooks";

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTimeMin: number;
  category: PostCategory;
  body: string;
};

export const CATEGORY_LABEL: Record<string, string> = {
  process: "Process",
  forecasting: "Forecasting",
  concepts: "Concepts",
  playbooks: "Playbooks",
};

export const POSTS: Post[] = [
  {
    slug: "cut-your-close-cycle-from-11-days-to-4",
    title: "Cut your close cycle from 11 days to 4",
    description:
      "What the median 11-day close actually breaks down into — and the three layers most teams can collapse without changing software.",
    date: "2026-04-30",
    readingTimeMin: 7,
    category: "process",
    body: `The median mid-market finance team takes 11 days to close the books. The benchmark teams do it in 4. The gap isn't software, it's the wait-states inside each phase.

Phase 1 — Reconciliation (days 1–5). Most of this week is waiting for trial balance to land from the ERP, then waiting for adjustments from regional teams. The fix is continuous: connectors run on schedule, not on a deadline. Trial balance should land in your cube on day 1, not day 5. If reconciliation lives in a Slack thread, you've already lost.

Phase 2 — Variance pack assembly (days 6–9). This is where the 40-hour ritual lives. Spreadsheet template, copy-paste the actuals, manually identify the top movers, hand-write commentary on each. Every pivot of the variance pack format is a 4-hour rewrite. The fix here has two parts: (1) rank movers by financial impact, not by raw %, and (2) draft commentary from the cube — the agent reads the sub-account drill-down and produces a paragraph in your house style.

Phase 3 — Review and sign-off (days 10–11). Senior controller and CFO review. Comments come back. Re-cycle. The fix is upstream: if phases 1 and 2 collapse from 9 days to 3, this phase happens with a fresher pack and tighter feedback loop. Sign-off goes from 2 days to half a day.

Net: 4-day close. 90-minute variance pack. Same team, same software stack — different operating model, different safety primitives.`,
  },
  {
    slug: "picking-a-forecast-algorithm-without-a-data-science-team",
    title: "Picking a forecast algorithm without a data science team",
    description:
      "A practical guide to the 15 algorithms NashOS ships with — when to use each, and how to read R² / RMSE / MAPE without a stats degree.",
    date: "2026-04-22",
    readingTimeMin: 9,
    category: "forecasting",
    body: `Most FP&A forecasting in the wild is a linear trend with seasonal adjustments eyeballed by hand. That's fine for a stable business at 30% growth. It's not fine for a SaaS company growing 80% with a new product line and three pricing changes.

The right algorithm depends on your series. A few rules of thumb:

If the series is short (less than 18 months) and noisy, stick with linear regression or moving averages. The fancier models will overfit. Holt-Winters is a good middle ground — it captures trend + seasonality without needing a lot of data.

If you have 24+ months of clean monthly data with clear seasonality, ARIMA or SARIMA tends to win. They're slow to fit but accurate when the signal is there. The shortcut: run 5 algorithms side-by-side and look at the MAPE on the holdout set. The one with the lowest MAPE on hold-out (not training) is the one to lock.

If you're forecasting a new product line with no history, no algorithm will save you. Use a driver-based plan instead — model the inputs (price, units, retention) and let the math compose the revenue line. This is what NashOS's "Drivers + Member Formulas" surface is for.

Reading the metrics: R² close to 1 means the model fits the historical data well. RMSE / MAE in the same units as your series (dollars) tell you how much the typical forecast misses by. MAPE is a percentage — under 5% is excellent, 5–15% is good, 15–30% is workable, above 30% means the model isn't useful. Always look at MAPE on a holdout window, not on training data.

The last move: lock the winner. NashOS lets you pin the best-performing algorithm so the next forecast cycle uses it by default. You can revisit annually.`,
  },
  {
    slug: "what-driver-based-planning-actually-means",
    title: "What driver-based planning actually means",
    description:
      "Beyond the buzzword: a worked example of why marking HEADCOUNT_ENG as a driver and writing one formula collapses 3 days of model-rework into 30 seconds.",
    date: "2026-04-15",
    readingTimeMin: 6,
    category: "concepts",
    body: `"Driver-based planning" is one of those phrases that gets tossed around in FP&A circles without a clear definition. Here's what it actually means in practice.

A driver is any non-monetary input that, when changed, recomputes a downstream financial line. Headcount is a driver. Units sold is a driver. Bill rate is a driver. They're the things you control or assume; everything else (salaries, revenue, COGS) is computed from them.

In NashOS, you mark an account as a driver by setting isDriver=true and giving it a unit of measure (FTE, units, %, hours). That's it. Now anywhere in the cube, you can write a member formula like:

  SALARIES_ENG = HEADCOUNT_ENG × −10000

(Negative because we store expenses as negative numbers — sign convention.) When you change HEADCOUNT_ENG from 12 to 15, the formula recomputes SALARIES_ENG, which rolls up into OPEX, which rolls into EBITDA, which rolls into Net Income. Three days of model-rework collapses to a single edit.

The pattern compounds. Stack drivers: HEADCOUNT_ENG × LOADED_COST × INFLATION_FACTOR. Add scenario-specific overrides: one formula for SALARIES_ENG under scenario=BUDGET, another under scenario=STRETCH. Mix in time-shifts: PRIOR(REV_ACTUAL) × 1.05 for a 5% growth plan.

The thing nobody tells you: driver-based planning isn't about modeling sophistication. It's about reducing the surface area where humans make mistakes. Every cell you compute is a cell nobody can mistype. Every scenario is a configuration change, not a copy-paste of a 200-row tab.`,
  },
];
