import { createFileRoute, Link } from "@tanstack/react-router";
import { FileSpreadsheet, BookOpen } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { PageHero, Section, CtaBand } from "@/components/page-sections";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/resources")({
  head: () =>
    seo({
      title: "Resources — NashOS",
      description:
        "Free FP&A starter pack — P&L, Cash Flow, Runway, Variance pack templates.",
      path: "/resources",
    }),
  component: ResourcesPage,
});

const TEMPLATES = [
  {
    name: "P&L · monthly · 12-period",
    desc: "Revenue + COGS + OpEx structure with sub-totals, % of revenue columns, and budget vs actual side-by-side.",
  },
  {
    name: "Cash Flow · indirect method",
    desc: "Standard 3-statement cash flow tied to net income. Adjustments split out; ending cash auto-computed.",
  },
  {
    name: "Runway calculator",
    desc: "Burn rate (trailing 6mo) + cash on hand → months of runway. Stress-test with revenue/expense shocks.",
  },
  {
    name: "Variance pack template",
    desc: "Budget vs Actual table for the top 12 lines, with a one-paragraph commentary block per line.",
  },
];

function ResourcesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Resources"
        title="FP&A starter pack —"
        highlight="free."
        lede="The model we wished existed when we were running close on Excel: P&L, Cash Flow, Runway, and Variance pack templates — clean, formula-driven, ready to drop your trial balance into."
      />

      <Section>
        <div className="grid lg:grid-cols-[1fr_1fr] gap-6 items-start">
          <div className="surface-card p-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-400/10 text-emerald-300">
                <FileSpreadsheet className="w-5 h-5" />
              </span>
              <div>
                <h2 className="font-semibold">What's inside</h2>
                <p className="text-xs text-muted-foreground">
                  4 templates · Excel + Google Sheets
                </p>
              </div>
            </div>
            <ul className="space-y-3 mt-5">
              {TEMPLATES.map((t) => (
                <li
                  key={t.name}
                  className="rounded-lg border border-border bg-card/40 p-4"
                >
                  <h3 className="font-semibold text-sm">{t.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                    {t.desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="surface-card p-8">
            <h2 className="text-2xl font-semibold tracking-tight">
              Drop your email. Get the pack.
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              No drip. We'll send the download link, plus an occasional product update if
              anything ships you'd care about. Unsubscribe in one click.
            </p>
            <p className="mt-6 text-sm text-muted-foreground">
              For now, email{" "}
              <a href="mailto:admin@nashos.ai?subject=Starter%20pack" className="text-gold hover:underline">
                admin@nashos.ai
              </a>{" "}
              with subject line "Starter pack" and we'll send it within one business day.
            </p>
            <a
              href="mailto:admin@nashos.ai?subject=Starter%20pack"
              className="mt-6 btn-gold inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold"
            >
              Request the pack
            </a>
          </div>
        </div>
      </Section>

      <Section>
        <div className="surface-card p-7 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gold/10 text-gold shrink-0">
            <BookOpen className="w-6 h-6" />
          </span>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">More on the blog</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Practical FP&amp;A patterns: cutting close cycles, picking forecast algorithms, and
              what driver-based planning actually means.
            </p>
          </div>
          <Link
            to="/blog"
            className="btn-outline-gold inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium"
          >
            Read the blog →
          </Link>
        </div>
      </Section>

      <CtaBand
        title="Want to see this on your"
        highlight="own data?"
        primaryCta={{ label: "Try with your data", to: "/try" }}
      />
    </PageShell>
  );
}
