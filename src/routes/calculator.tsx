import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { PageHero, Section, CtaBand } from "@/components/page-sections";

export const Route = createFileRoute("/calculator")({
  head: () => ({
    meta: [
      { title: "ROI Calculator — NashOS" },
      {
        name: "description",
        content:
          "Quantify the time and money your finance team would save with NashOS. Drag four sliders, see the answer in dollars.",
      },
    ],
  }),
  component: CalculatorPage,
});

function fmt(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}k`;
  return `$${n.toFixed(0)}`;
}

function CalculatorPage() {
  const [headcount, setHeadcount] = useState(5);
  const [closeDays, setCloseDays] = useState(11);
  const [variancePackHours, setVariancePackHours] = useState(40);
  const [salary, setSalary] = useState(120_000);

  const calc = useMemo(() => {
    const hourlyRate = salary / (52 * 40);
    const closeDaysSaved = Math.max(0, closeDays - 4);
    const closeHoursSavedPerCycle = closeDaysSaved * 8 * headcount;
    const closeAnnual = closeHoursSavedPerCycle * 12 * hourlyRate;

    const vpHoursSavedPerCycle = Math.max(0, variancePackHours - 1.5);
    const vpAnnual = vpHoursSavedPerCycle * 12 * hourlyRate;

    const totalAnnual = closeAnnual + vpAnnual;
    const nashosCost = 6_000; // ~$500/mo Pro tier
    const netSavings = totalAnnual - nashosCost;
    const paybackMonths = netSavings > 0 ? Math.max(1, Math.round((nashosCost / totalAnnual) * 12)) : 0;

    return { closeAnnual, vpAnnual, totalAnnual, nashosCost, netSavings, paybackMonths };
  }, [headcount, closeDays, variancePackHours, salary]);

  return (
    <PageShell>
      <PageHero
        eyebrow="ROI calculator"
        title="How much is your close cycle"
        highlight="costing you?"
        lede="Four sliders. One number in dollars. Adjust to your team — we'll show you what the close + variance pack ritual costs annually, and what NashOS would save."
      />

      <Section>
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-6">
          {/* Inputs */}
          <div className="surface-card p-7 space-y-6">
            <Slider
              label="Finance team size (FTEs)"
              value={headcount}
              min={1}
              max={30}
              step={1}
              suffix=" people"
              onChange={setHeadcount}
            />
            <Slider
              label="Current close cycle"
              value={closeDays}
              min={4}
              max={20}
              step={1}
              suffix=" days"
              onChange={setCloseDays}
            />
            <Slider
              label="Hours building monthly variance pack"
              value={variancePackHours}
              min={4}
              max={80}
              step={2}
              suffix=" hours"
              onChange={setVariancePackHours}
            />
            <Slider
              label="Average loaded salary"
              value={salary}
              min={60_000}
              max={250_000}
              step={5_000}
              suffix=""
              format={(v) => `$${(v / 1000).toFixed(0)}k`}
              onChange={setSalary}
            />
          </div>

          {/* Output */}
          <div className="surface-card p-7">
            <p className="text-xs uppercase tracking-[0.2em] text-gold mb-2 font-semibold">
              Your annual savings
            </p>
            <div className="text-5xl font-bold tabular-nums text-gradient-gold">
              {fmt(calc.netSavings)}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              after subtracting NashOS at ~{fmt(calc.nashosCost)}/yr (Pro tier).
            </p>

            <hr className="my-6 border-border/60" />

            <Row label="Close cycle savings" value={fmt(calc.closeAnnual)} />
            <Row label="Variance pack savings" value={fmt(calc.vpAnnual)} />
            <Row label="Total annual value" value={fmt(calc.totalAnnual)} />
            <Row label="NashOS cost" value={`−${fmt(calc.nashosCost)}`} />

            {calc.paybackMonths > 0 && (
              <p className="mt-6 text-sm text-muted-foreground">
                Payback in roughly{" "}
                <span className="font-semibold text-foreground">
                  {calc.paybackMonths} {calc.paybackMonths === 1 ? "month" : "months"}
                </span>
                .
              </p>
            )}

            <p className="mt-6 text-xs text-muted-foreground/80 italic">
              Estimate only. Real savings depend on entity count, data hygiene, and how much of
              the variance pack is automatable in your environment.
            </p>
          </div>
        </div>
      </Section>

      <CtaBand
        title="See it on your"
        highlight="real numbers."
        primaryCta={{ label: "Try with your data", to: "/try" }}
        secondaryCta={{ label: "Book a walkthrough", to: "/demo" }}
      />
    </PageShell>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  suffix,
  format,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix: string;
  format?: (v: number) => string;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between gap-3 mb-2">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-sm font-semibold text-gold tabular-nums">
          {format ? format(value) : `${value}${suffix}`}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#2b61a2]"
      />
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold tabular-nums">{value}</span>
    </div>
  );
}
