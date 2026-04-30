export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTimeMin: number;
  category: "process" | "forecasting" | "concepts" | "playbooks";
  body: string; // markdown-ish: paragraphs separated by blank lines, ## for h2, > for blockquote, - for bullets
};

export const POSTS: Post[] = [
  {
    slug: "cut-close-cycle-from-eleven-days-to-four",
    title: "How to cut your close cycle from 11 days to 4",
    description:
      "Most close-cycle pain isn't the journal entries. It's the 7 days of human reconciliation either side. Here's how AI-native FP&A collapses that.",
    date: "2026-04-30",
    readingTimeMin: 6,
    category: "process",
    body: `
The first time we measured our close cycle honestly — flagged-as-final to draft-board-pack-out-the-door — it was 11 business days. Two and a half weeks of every month. We'd shipped two acquisitions that year and the team was running on adrenaline + Diet Coke.

When we asked finance leaders at peer companies, the answer was usually the same: somewhere between 8 and 14 days, with one outlier we won't name doing it in 6. The pain is universal, and it's not where most people think.

## It's not the journal entries

If you actually time-track a close, the entries themselves take less than a day. The other 10 days are:

- Pulling data from 3+ systems and reconciling
- Chasing the AP team for invoices that should have been booked
- Asking sales why a deal closed in the wrong period
- Building the variance pack from scratch (because last quarter's broke)
- Writing commentary on the top 5 movers
- Three rounds of review with the CFO and one with the auditor

The journal entries are the part that's already automated. Everything around them isn't.

## What the 4-day close actually looks like

We targeted 4 days when we built EPM Lite, and the math is not magic. Three things compound:

- **Connectors pull continuously, not at month-end.** Trial balance lands in the cube on day 1, not day 5. Reconciliation lives in the cube, not in a Slack thread.
- **The agent writes the variance pack.** Top movers ranked by financial impact. Commentary auto-drafted from the cube + a prompt template. CFO edits, doesn't write from scratch.
- **Audit trail replaces version control.** Every change has a who, when, before-after, and reason. There's no "wait, who changed the COGS assumption?" — it's a query.

The remaining 4 days are: 1 day of close work, 1 day of CFO review, 2 days of board-pack polish.

## Where to start if you're at 11 days

You don't need to rebuild your stack to get to 4 days. Three things in order:

1. **Measure once, honestly.** From flagged-final to draft-pack-out, hour-by-hour, for one cycle. The data will surprise you.
2. **Move reconciliation up.** Pull every connector daily, not monthly. The day-of-month doesn't have to be a sprint.
3. **Stop building variance pack from scratch.** The structure is the same every month. Template it. Have something — agent, intern, junior analyst — auto-fill the numbers.

The remaining gap to 4 days is mostly tooling. That's where we come in.

> If your close is 8 days or longer, you're paying a hidden tax of about 60–80 hours per analyst per quarter. At a $140k fully-loaded FP&A salary, that's ~$23k per analyst per year. The [ROI calculator](/calculator) does this math live.

## The next step

Whatever your number is — 8, 11, or 14 — write it down. Then time-track one cycle. The biggest wins are in the parts you didn't realize were the bottleneck.

When you're ready to look at tooling: [book a demo](/contact) and we'll show you what 4 days looks like on your actual numbers.
`,
  },
  {
    slug: "why-your-forecast-is-wrong",
    title: "Why your forecast is wrong: a 5-minute audit",
    description:
      "If you're picking your forecast model on vibes, it's wrong. Here's a five-minute audit that surfaces the bias and a checklist for picking the right algorithm.",
    date: "2026-04-30",
    readingTimeMin: 5,
    category: "forecasting",
    body: `
Most FP&A forecasts are wrong in the same way: they extrapolate the current trend with a linear model, fit one number, and ship it. The CFO asks "are we sure?" and the analyst says "yes" because the alternative — "let me run 5 algorithms and compare RMSE" — sounds like a week of work.

It's a five-minute audit. Here's how.

## Step 1: pull the last 24 months of the line you're forecasting

Just one line. Revenue is the obvious one to start with. You want at least 24 monthly data points so seasonality can be detected; 36 is better.

## Step 2: hold out the last 6 months

Train your forecast on months 1–18. Compare its predictions against what actually happened in months 19–24. This is your **out-of-sample error** — the only number that matters.

## Step 3: try at least three algorithms

Do not pick one. Run:

- **Linear regression** — your current default, almost certainly
- **ARIMA or SARIMA** — handles seasonality and autocorrelation
- **Holt-Winters** — exponential smoothing with trend + seasonality
- (Bonus) **Random Forest or Gradient Boosting** — captures non-linearity if you have driver inputs

Compute R², RMSE, MAE, and MAPE for each on the holdout. Whichever algorithm wins on RMSE is your forecast.

## Step 4: read the residuals

Plot the errors over time. If your model is biased, the errors will trend up or down. If they're heteroskedastic (variance changes over time), your confidence interval is lying. The "best" algorithm by RMSE may still have a residual pattern you don't want.

## Step 5: pick the simplest model that wins

If ARIMA beats Random Forest by 0.4% MAPE, pick ARIMA. Simpler is more interpretable, more debuggable, and less likely to overfit. The forecasting paper everyone cites is [Hyndman & Athanasopoulos](https://otexts.com/fpp3/) — read chapter 5.

## What you'll find

If you've never done this, the most likely outcome is one of:

1. **Linear was wrong by 4–7% on the holdout, ARIMA by 1.5%.** You've been hosing the budget for months.
2. **All three algorithms agree to within 1%.** Your series is well-behaved; pick the simplest.
3. **They diverge by 10%+.** Your line has a structural break (acquisition, pricing change, COVID-equivalent shock). The model can't fix that — domain knowledge can.

In two of three cases, you have an actionable upgrade. The third tells you to stop trusting the model and call sales.

## The five-minute version

EPM Lite ships [15 algorithms](/products) you can compare side-by-side with one click. R²/RMSE/MAE/MAPE on every run. The audit takes about 90 seconds when you're not doing the math by hand.

> The point isn't to use the most algorithms. It's to never pick one without comparing. Linear-by-default is the silent killer of forecast accuracy.

[See the comparison live →](/demo)
`,
  },
  {
    slug: "what-driver-based-planning-actually-means",
    title: "What 'driver-based planning' actually means",
    description:
      "Driver-based planning isn't a fancier budget. It's the difference between rebuilding your plan when assumptions change and having the plan recompute itself.",
    date: "2026-04-30",
    readingTimeMin: 7,
    category: "concepts",
    body: `
"Driver-based planning" is one of those FP&A buzzwords that sounds like a software feature and is actually a worldview. It's also poorly explained, mostly because the people selling it have a financial interest in keeping it vague.

Here's the plain-English version.

## A traditional plan

You sit down once a year. You build a budget. The budget is a big spreadsheet with revenue assumptions, headcount assumptions, and expense assumptions. Each cell is a number you typed.

Three months later, the CEO says "we're hiring 5 more engineers in Q3." You sigh. You go to the headcount tab. You add 5 rows. You go to the salary tab. You add 5 rows. You go to the SaaS tab — because each engineer needs a Github seat. You add 5 rows. You go to the revenue tab — because those engineers are shipping a product that should ship Q4. You don't know how to model that. You guess.

This is *the rebuild*. A normal mid-cycle change takes 4–8 hours.

## A driver-based plan

You sit down once a year. You build a model. The model has **drivers** (HEADCOUNT_ENG, NEW_FEATURES_QUARTER, ACV_MID_MARKET) and **member formulas** that connect drivers to financial outcomes:

- \`SALARIES_ENG = HEADCOUNT_ENG × -10000\`
- \`GITHUB_SEATS = HEADCOUNT_ENG × -25\`
- \`REVENUE_NEW_PRODUCT = NEW_FEATURES_SHIPPED_Q4 × ACV_MID_MARKET × 12\`

Three months later, the CEO says "we're hiring 5 more engineers in Q3." You change one number — HEADCOUNT_ENG from 12 to 17 — and the entire plan recomputes. Salaries update. Github cost updates. The cascading effect on EBITDA shows up in 2 seconds.

This is the worldview difference. **Drivers + formulas = the plan recomputes itself.**

## Why most FP&A teams don't use this

Three reasons:

1. **Excel doesn't really support it.** You can do it with named ranges and INDIRECT() — but the model becomes fragile and impossible to audit.
2. **Anaplan supports it brilliantly.** And costs $150k/year and takes 6 months to implement, so 95% of mid-market companies can't get there.
3. **Setting up the drivers feels like a tax.** It's 2–3x the work of a static plan up front. The payoff comes when the third mid-cycle change request lands.

## When the math flips

Track this for one fiscal year:

- Time spent setting up the original budget
- Number of mid-cycle change requests (CEO, board, ops)
- Time spent rebuilding for each request

If you have **3 or more mid-cycle change requests per quarter**, driver-based planning pays for itself within the first cycle. Most growth-stage companies do.

## What to model first

Don't try to convert your entire plan to drivers in one go. Start with:

- **Headcount**, because it's both the biggest driver and the most-changed assumption
- **Variable cost per employee** (laptops, SaaS seats, recruiter fees, etc)
- **Revenue per [unit]** for whatever your unit is (deal, customer, transaction)

The other 80% of the plan can stay static. Driver-based 30% of your model gets you 80% of the benefit.

## The next step

Want to see what a driver formula actually looks like in practice? The [live demo](/demo) has a working example — type a formula, watch the headcount step up, watch salaries auto-recompute.

Or if you'd rather build it on your own data: [book a 15-minute walkthrough](/contact). We'll set up your first three drivers in real time.
`,
  },
];
