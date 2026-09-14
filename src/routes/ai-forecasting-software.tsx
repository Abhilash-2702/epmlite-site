import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, GitBranch, ShieldCheck, Zap, FileEdit, Activity, Gauge, Layers } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import {
  PageHero,
  Section,
  SectionHeader,
  CardGrid,
  FaqList,
  CtaBand,
} from "@/components/page-sections";
import { Linkified } from "@/components/linkified";
import { StickyCta } from "@/components/sticky-cta";
import { seo } from "@/lib/seo";

const CRUMBS = [{ name: "AI forecasting", path: "/ai-forecasting-software" }];

// Answer-first explainer. Rendered as the first block on the page so the
// definition sits above the card sections, where answer engines look first.
const PROSE = [
  "Honest AI forecasting is a bake-off, not an oracle. Fit multiple algorithms to each series, hold back the most recent periods, score every model on data it never saw, and ship the one that earned it. NashOS runs this as a workflow: 15 algorithms available, candidates compared side by side on holdout R², RMSE, MAE, and MAPE, with the best performer locked so the next cycle uses it by default. No single \"AI\" makes the forecast. The scoreboard does.",
  "The holdout window is the whole game. A model can trace your historical revenue perfectly and still know nothing about next quarter — that's overfitting, and training-fit metrics reward it. So judge models only on periods they never saw, and read MAPE as the headline: under 5% is excellent, 5–15% good, 15–30% workable, above 30% means the model isn't useful. Those bands are the honest answer to \"how accurate is it\" — accuracy is a property of your series, not of the software.",
  "The statistical-versus-ML debate mostly evaporates once you measure. Short, noisy series favor simple methods — linear regression, moving averages — because heavier models memorize noise and call it signal. Long, clean, seasonal series are where ARIMA and SARIMA tend to win. You don't have to pick a camp: shortlist the candidates, compare them side by side, and read the holdout column. That's also the difference from the single fitted curve legacy planning suites bolt on — the side-by-side comparison at /vs/anaplan covers it.",
  "Some series can't be forecast at all — a brand-new product line has no history, and no algorithm extrapolates from nothing. NashOS handles those with a driver-based hybrid: mark the inputs as drivers with a unit of measure (price, units, retention), write member formulas like SALARIES_ENG = HEADCOUNT_ENG × −10000, and let the math compose the line. When the new line accrues enough actuals, you can move it to the statistical bake-off like everything else.",
  "The agent runs the same workflow. Forecasting is one of four tool categories — 8 of the 35+ agent tools fit algorithms, compare metrics, lock winners, and run what-ifs — and every write lands as a draft a human must post, with the full audit trail behind it. Ask for a forecast in plain English; ratify the result. How the whole agent platform works is at /agentic-fpa-platform.",
];

const SECTION_1 = [
  {
    Icon: Sparkles,
    meta: "Step 1",
    title: "Fit",
    body:
      "15 algorithms are available to fit the series — from linear regression and moving averages through Holt-Winters to ARIMA and SARIMA. The most recent periods are held back as the test the models never see.",
  },
  {
    Icon: GitBranch,
    meta: "Step 2",
    title: "Compare",
    body:
      "Side-by-side R² / RMSE / MAE / MAPE, scored on the holdout window only. Training fit is ignored — it rewards overfitting. Lowest holdout MAPE is usually your winner.",
  },
  {
    Icon: ShieldCheck,
    meta: "Step 3",
    title: "Lock",
    body:
      "Pin the winner and the next forecast cycle uses it by default. No re-litigating the model choice every month, and no quietly swapped methodology behind the board deck.",
  },
  {
    Icon: Zap,
    meta: "Step 4",
    title: "Revisit",
    body:
      "The next forecast cycle uses the locked algorithm by default. Revisit the choice on a cadence — a series that changes character, from new pricing or a new channel, deserves a re-run of the bake-off.",
  },
];

const SECTION_2 = [
  {
    Icon: FileEdit,
    meta: "Under 18 months",
    title: "Short, noisy series",
    body:
      "Stick with linear regression or moving averages — fancier models overfit thin data. Holt-Winters is the middle ground: it captures trend plus seasonality without needing much history.",
  },
  {
    Icon: Activity,
    meta: "24+ months",
    title: "Long, seasonal series",
    body:
      "ARIMA and SARIMA tend to win on clean monthly data with clear seasonality. They're slower to fit but accurate when the signal is there. This is where the heavier models earn their keep.",
  },
  {
    Icon: Gauge,
    meta: "No history",
    title: "Brand-new lines",
    body:
      "No algorithm extrapolates from nothing. Model the inputs instead — price, units, retention — with drivers and member formulas, and let the math compose the revenue line. Graduate to statistical once actuals accrue.",
  },
  {
    Icon: Layers,
    meta: "Rule of thumb",
    title: "Reading the metrics",
    body:
      "MAPE under 5% is excellent, 5–15% good, 15–30% workable, above 30% not useful. R² near 1 means strong historical fit; RMSE and MAE state the typical miss in dollars. Always read all of them on holdout.",
  },
];

const FAQ = [
  {
    question: "What is AI forecasting software?",
    answer:
      "AI forecasting software fits statistical and machine-learning models to your historical financials and projects them forward. Done honestly, it fits several algorithms per series, scores each on a holdout window the models never saw, and ships the best performer. NashOS makes 15 algorithms available, compares candidates on holdout R² / RMSE / MAE / MAPE, and lets you lock the winner for the next cycle.",
  },
  {
    question: "How accurate is AI forecasting?",
    answer:
      "It depends on the series — anyone quoting one accuracy number for all forecasting is selling something. The honest yardstick is MAPE on a holdout window: under 5% is excellent, 5–15% good, 15–30% workable, and above 30% means the model isn't useful. Stable, seasonal series often land in the good band; volatile or brand-new series may not, and the right response there is driver-based planning, not a fancier curve.",
  },
  {
    question: "How much historical data do I need?",
    answer:
      "Rules of thumb: with under 18 months of noisy data, stick to simple methods like linear regression or moving averages — anything fancier overfits. With 24+ months of clean monthly data and clear seasonality, ARIMA or SARIMA tends to win. Either way, hold back recent periods and let holdout MAPE make the call, not the calendar.",
  },
  {
    question: "Can you forecast a brand-new product line with no history?",
    answer:
      "Not with a fitted curve — no algorithm can extrapolate from zero data points, and software that claims otherwise is guessing. NashOS handles new lines with a driver-based plan: mark the inputs as drivers (price, units, retention), write member formulas, and let the math compose the revenue line. Once the line accrues real history, you switch it to the statistical bake-off like any other series.",
  },
  {
    question: "How does NashOS pick the winning algorithm?",
    answer:
      "It doesn't guess — it measures. 15 algorithms are available; each candidate is scored on R² / RMSE / MAE / MAPE against a holdout window, and you compare candidates side by side — lowest holdout MAPE is usually the one to lock. You pin the winner, the next cycle uses it by default, and the agent can run the whole comparison — with every write gated by draft-before-commit.",
  },
  {
    question: "Do I need a data science team to run AI forecasting software?",
    answer:
      "No. The metrics that matter are readable in minutes: MAPE is the percentage miss, RMSE and MAE are the miss in dollars, and R² is historical fit. Our guide at /blog/picking-a-forecast-algorithm-without-a-data-science-team walks through the 15 algorithms and when each tends to win.",
  },
];

export const Route = createFileRoute("/ai-forecasting-software")({
  head: () =>
    seo({
      title: "AI Forecasting Software — 15 Algorithms Compared — NashOS",
      description: "AI forecasting software done honestly: NashOS fits 15 algorithms, scores them on holdout MAPE/R²/RMSE, and locks the winner. New lines get driver-based plans.",
      path: "/ai-forecasting-software",
      faq: FAQ,
      breadcrumbs: CRUMBS,
    }),
  component: Page,
});

function Page() {
  return (
    <PageShell crumbs={CRUMBS}>
      <PageHero
        tight
        eyebrow={"AI forecasting"}
        title={"AI forecasting software that shows its work."}
        highlight={"15 algorithms. One honest scoreboard."}
        lede={"Most AI forecasting software asks you to trust a black box. NashOS fits 15 algorithms to your series, scores them on holdout MAPE / R² / RMSE, and locks the winner — the forecast that ships is the one that earned it. For series with no history, a driver-based plan takes over."}
        primaryCta={{ label: "Try with your data", to: "/try" }}
        secondaryCta={{ label: "Book a walkthrough", to: "/demo" }}
      />

      <Section>
        <div className="max-w-3xl">
          <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight">
            {"How AI forecasting actually works — when done honestly"}
          </h2>
          <div className="mt-6 space-y-5 text-muted-foreground leading-relaxed">
            {PROSE.map((p) => (
              <p key={p.slice(0, 40)}>
                <Linkified text={p} />
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader
          title={"The workflow: fit, compare, lock, revisit"}
          caption={"Four steps, none of them magic. The winning model is chosen on evidence you can read — and it has to re-earn the job whenever you re-run the bake-off."}
        />
        <CardGrid items={SECTION_1} cols={4} />
      </Section>

      <Section>
        <SectionHeader
          title={"Match the method to the series"}
          caption={"There is no best algorithm — only the best algorithm for this series, this cycle. Start with the rules of thumb, then let the holdout decide."}
        />
        <CardGrid items={SECTION_2} cols={4} />
      </Section>

      <Section>
        <SectionHeader title="Common questions" />
        <div className="max-w-3xl">
          <FaqList items={FAQ} />
        </div>
      </Section>

      <CtaBand
        title={"Run the bake-off on"}
        highlight={"your own series."}
        lede={"A walkthrough on your data within one business day at /try — run the bake-off on your real numbers and read the holdout scoreboard yourself. Or size the payoff first at /calculator."}
        primaryCta={{ label: "Try with your data", to: "/try" }}
        secondaryCta={{ label: "Book a demo", to: "/demo" }}
      />

      <StickyCta label="Book a demo" to="/demo" />
    </PageShell>
  );
}
