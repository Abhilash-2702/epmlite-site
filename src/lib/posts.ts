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
  {
    slug: "agentic-ai-in-finance-explained",
    title: "Agentic AI in finance, explained",
    description:
      "What agentic AI in finance actually means — tool use, multi-step loops, permissions — plus the safety primitives and a realistic adoption path.",
    date: "2026-09-12",
    readingTimeMin: 9,
    category: "concepts",
    body: `"Agentic AI in finance" is on every vendor homepage this year, which is usually a sign that a term has stopped meaning anything. Underneath the fog there is a real, fairly precise distinction — and you can test for it in a live demo in minutes. Here is what "agentic" actually means, what it looks like inside a finance system, why finance needs a higher safety bar than other functions get away with, and how to adopt it without betting the ledger.

Start with the baseline: a chatbot. A chatbot takes your question, consults what it knows — training data, plus maybe some documents you attached — and produces text. That is the whole loop. It can explain a variance methodology, summarize a lease policy, even reason about numbers you paste in. What it cannot do is touch your systems. It answers; it does not act. Most "AI in finance" shipped to date is exactly this: a text box bolted onto software that was never designed for a model to operate.

An agent adds three things: tools, loops, and permissions. Tools first. An agent is a model connected to functions it is allowed to call — query this table, update that driver, run this forecast, export that report. Instead of only producing prose, the model produces a decision: call this tool with these arguments. The system executes the call and hands the result back for the model to read. That one change moves the model from narrator of your software to operator of it.

Loops second. Real finance work is rarely one step. "Why is gross margin down?" is a read, then a drill-down, then another read, then a comparison. An agentic system runs a loop: act, observe the result, decide the next action, repeat until the task is finished or blocked. The loop is what turns "answer my question" into "carry this task through to a result." It is also the thing to watch for in a demo — a chatbot making a single canned tool call is not an agent.

Permissions third, and this is the part finance should care about most. An agent acts inside a system of record, so the question "acting as whom, allowed to do what?" needs a hard answer. In a sound design, every tool call runs under a specific user's identity with that user's access rights, enforced by the server — not by the model's own restraint. An agent whose limits live only in its prompt has no limits.

Here is what those three properties look like against a real planning cube. Reads: fetch the trial balance, query fact tables, pull audit-log entries, list scenarios. Writes: update a headcount driver, write a member formula, create a scenario. Analysis: run forecast algorithms, compare error metrics on a holdout window, rank variance movers by financial impact instead of raw percentage. In NashOS — the worked example here, because it is the system we can describe precisely — the agent has 35+ tools covering roughly 99% of the manual actions in the app, in four categories: Read (12 tools), Plan (10), Forecast (8), Decide (7). The grids are still there, but they are the fallback, not the primary interface.

Chaining is where an agent earns its keep. Take the request "Hire 3 engineers and show the runway impact." The agent updates the HEADCOUNT_ENG driver, a member formula recomputes engineering salaries, the runway forecast reruns, and the result renders as a card — each step streaming in as it happens, with the user ratifying the final commit. One sentence replaces what would otherwise be a run of grid edits and a manual model rerun. Nothing in that chain is exotic; every step is a capability the software already had. The agent's contribution is sequencing them correctly without being walked through it.

Now the part that separates finance from every other department adopting agents: the cost of a wrong action. In marketing, a bad agent output is an awkward email. In finance, it is a wrong number flowing into a board pack, a covenant calculation, or an audit sample — often silently, because the downstream totals still foot. Language models are probabilistic; ledgers are not. So the bar is not "usually right." The bar is "provably controlled": wrong outputs must be catchable before they commit, and everything that commits must be reconstructable afterward.

Three primitives clear that bar, and you should refuse to run agents on financial data without all of them. Primitive one: draft-before-commit. The agent never mutates the database directly. Every write it proposes becomes a draft that a named human reviews and approves, and the backend re-validates the draft at commit time, so a stale or malformed draft cannot land either. In NashOS this is literally a card: the agent drafts, you read it, you click Post, the server checks it again, and only then does it commit. The model's fluency never becomes authority.

Primitive two: scoped permissions. Tool calls execute with the calling user's permissions, checked at the API layer, and the model never holds credentials. Your analyst's agent can do exactly what your analyst can do, nothing more. Primitive three: audit trails. Every mutation is logged with actor, timestamp, and before-and-after values, so "what did the agent change in March?" is a query, not an investigation. Add operational controls on top — watching the agent work step by step, interrupting it mid-task, a kill switch — and you have something an auditor can live with.

What are agents genuinely good at today? Mechanical work over structured data. Answering "what moved and why" straight from the cube. Ranking variance movers by impact so commentary starts from a ranked list instead of a blank page. Running the forecast comparisons no analyst has time for — NashOS ships 15 algorithms and scores them on holdout R², RMSE, MAE, and MAPE, and the useful part is not the count, it is that the agent runs the full comparison and you pin the winner. Chaining routine multi-step tasks like the hiring example. Drafting a first pass of almost anything.

What should stay human? Judgment and commitment. Materiality calls, accounting policy choices, and the final approval on any write. Anything that leaves the building — board packs, filings, guidance — gets human sign-off, full stop. Forecasting a business with no history is still a human modeling problem; no algorithm recovers signal that does not exist. And never let an agent be the final reviewer of its own work: the human review step is the control, so staffing it with the agent defeats the design.

The adoption path that works is deliberately boring. Phase 1 — read-only. Give the agent query access and nothing else. Let the team ask questions for a few weeks and check the answers against reports they already trust. This calibrates confidence with zero risk of mutation, and it surfaces where the agent misreads your data before a misreading can write anything. Phase 2 — drafted writes on low-stakes surfaces. Scenarios and drivers before actuals, every write through the draft queue with a named approver. Phase 3 — widen scope as the audit trail accumulates evidence. Notice what you are actually rolling out: not a model, a review workflow.

The takeaway is a three-question test you can run on any vendor, including us. One: can it act, or only answer — ask to watch it chain tool calls on live data, not slides. Two: what sits between the model's intention and your database — if the answer is not "a human approval plus server-side re-validation," keep walking. Three: can you reconstruct, six months later, exactly what changed, who approved it, and what the values were before. Agentic AI in finance is worth adopting precisely to the degree that the answers to those three questions are boring.`,
  },
  {
    slug: "how-to-improve-forecast-accuracy",
    title: "How to improve forecast accuracy in FP&A",
    description:
      "A six-step playbook to improve forecast accuracy: measure holdout MAPE, fix the data, decompose to drivers, pick algorithms empirically, reforecast on cadence.",
    date: "2026-09-10",
    readingTimeMin: 8,
    category: "forecasting",
    body: `Most attempts to improve forecast accuracy start in the wrong place: the model. A team swaps its linear trend for something more sophisticated, the fit on historical data looks better, and next quarter the miss is the same size as last quarter's. That's because accuracy isn't a model property — it's a process property. The model is step four of six. Here's the playbook, in the order that actually works.

Step 1 — Measure error properly before changing anything. You cannot improve what you measure wrong, and most teams measure wrong in a specific way: they judge a forecast by how well it fits the history it was trained on. Training fit is flattery — a model with enough parameters can trace last year's revenue line perfectly and still know nothing about next quarter. The honest test is a holdout: hide the last few months of actuals from the model, forecast them, and score the miss. Score it with MAPE — mean absolute percentage error — because it's comparable across lines of different sizes. The rule of thumb for reading it: under 5% is excellent, 5–15% is good, 15–30% is workable, above 30% means the forecast isn't useful. Whatever your holdout MAPE is today, write it down. That number is the baseline every following step gets measured against.

Step 2 — Fix the data before touching the model. No algorithm recovers from a series that encodes bookkeeping artifacts instead of business reality, and three cleanups pay for themselves almost immediately. Calendarization: if your months alternate between four and five weeks, or billing days drift, the model sees phantom seasonality and will faithfully forecast it — normalize to comparable periods first. One-offs: a single large deal, a legal settlement, an acquisition true-up — leave them in the series unlabeled and the model projects them forward as trend. Tag them, then decide deliberately whether each belongs in the history the model learns from. Channel mix: a total revenue line that blends two segments growing at different rates looks like noise from the top; split the series where the mix is shifting and each piece becomes forecastable. Time spent on data routinely beats time spent on models.

Step 3 — Decompose to drivers instead of forecasting the total. Net income is not a forecastable series. It's arithmetic sitting downstream of things that are. Statistical forecasting belongs on the lines with genuine external signal — demand, retention, pricing — while everything mechanical should be computed, not predicted: salaries follow headcount, commissions follow bookings, hosting follows usage. This is what driver-based planning is for. In NashOS, you mark an account as a driver and write a member formula — SALARIES_ENG = HEADCOUNT_ENG × −10000 — so changing the headcount assumption recomputes salaries, which rolls through OPEX, EBITDA, and Net Income. Every line you compute instead of forecast is a line that can't miss on its own; its error reduces to the error of its inputs. Decomposition shrinks the surface area where forecasting can go wrong, which is most of the battle.

Step 4 — Pick the algorithm empirically, then lock the winner. The argument about whether ARIMA beats Holt-Winters on your revenue line is not worth having in a conference room, because it has an empirical answer that differs by series. Run the candidates side-by-side on the same holdout window and read the scores. NashOS runs 15 forecast algorithms and compares them on R², RMSE, MAE, and MAPE against the holdout — but the method matters more than the tool: whatever you use, the winner is the lowest holdout MAPE, not the prettiest training fit and not the most sophisticated name. Then lock it, so the next cycle runs the winner by default instead of re-litigating the choice. Revisit when the business changes shape — a new product line, a pricing change, an acquisition — not every month.

Step 5 — Reforecast on cadence, not annually. A forecast is a perishable good. The annual budget set in November is asked to be right about a December thirteen months away, and every month that passes adds information the plan never absorbs. The teams with accurate forecasts aren't better at predicting December from the previous November; they re-predict it in March, June, and September, and each pass is shorter-range and better-informed. Shortening the horizon is the single highest-leverage way to improve forecast accuracy, and it costs nothing statistically — only operationally. That's the usual objection: if a reforecast costs two weeks of model rebuilding, quarterly is your ceiling. Which is exactly why steps 3 and 4 come first. In a driver-based cube with a locked algorithm, a reforecast is an update, not a rebuild — in NashOS the model-rework loop goes from 14 days -> 1 minute: change the assumption, the cube recomputes, and you rerun the locked algorithm. Cadence is only affordable when the mechanical cost is near zero.

Step 6 — Run an error post-mortem every cycle. When actuals land, score the last forecast against them line by line, then classify every material miss into one of four buckets. Data problem: a one-off leaked into the series or calendarization slipped — fix it at the source so it can't recur. Assumption problem: a driver was set optimistically — the sales-capacity number, the churn rate — so adjust the input, not the model. Model drift: the locked algorithm's holdout MAPE is creeping up as the business changes — re-run the side-by-side comparison and consider re-pinning. Genuine surprise: a top customer churned without warning — no process fixes this; note it and move on. The classification matters more than the score, because each bucket has a different fix. Teams that skip the post-mortem repeat their misses with growing confidence; teams that run it convert every miss into a process change.

The sequence is the point. Measurement comes first because everything after it needs a baseline. Data before models, because models amplify whatever the data encodes. Decomposition before algorithm selection, because the best algorithm on a composite series loses to a mediocre one on clean drivers. Cadence and post-mortems last, because they're the loop that compounds the other four. None of it requires a data science team — it requires holdout discipline and an honest MAPE number. Work the six steps in order and you give forecast accuracy a way to improve every cycle: not because the model got smarter, but because the process did.`,
  },
];
