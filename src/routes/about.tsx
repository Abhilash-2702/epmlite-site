import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, History, GitBranch } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import {
  PageHero,
  Section,
  SectionHeader,
  CardGrid,
  StatGrid,
  CtaBand,
} from "@/components/page-sections";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Who We Are — NashOS" },
      {
        name: "description",
        content:
          "Built by an FP&A operator who got tired of rebuilding the same spreadsheet.",
      },
    ],
  }),
  component: AboutPage,
});

const beliefs = [
  {
    Icon: Sparkles,
    title: "Plain English beats formulas",
    body:
      "Most CFO questions are sentences, not VLOOKUPs. The product should answer in the same language the question was asked.",
  },
  {
    Icon: History,
    title: "Audit trail beats version history",
    body:
      "Knowing who changed the COGS assumption — and what the value was before — is non-negotiable for finance. Excel can't do this. We do.",
  },
  {
    Icon: GitBranch,
    title: "Drivers beat spreadsheet rebuilds",
    body:
      "Hire 5 engineers shouldn't trigger a 3-day model rework. Drivers + member formulas mean the plan recomputes itself.",
  },
];

const stats = [
  {
    num: "9",
    label:
      "Product pillars · Dashboard, P&L, BS, CF, Drivers, AI Chat, Forecasting, What-If, Alerts",
  },
  { num: "35+", label: "AI tools that cover ~99% of manual app actions in plain English" },
  { num: "15", label: "ML forecasting algorithms — compare side-by-side, pick the winner" },
  {
    num: "9-dim",
    label:
      "Cube · Entity × Account × Period × Scenario × Version × Currency × Year × Product × Department",
  },
];

function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Who we are"
        title={<>The FP&amp;A platform we couldn't buy.</>}
        highlight="So we built it."
        lede={
          <>
            We'd spent enough Sundays reconciling the close, enough Mondays explaining why
            EBITDA was off, enough Tuesdays rebuilding the variance pack one broken VLOOKUP at
            a time. The tools we evaluated — Excel, Anaplan, Adaptive — each fixed one thing
            and broke two others. We wanted the close in days, the variance pack in minutes,
            and an AI agent that read AND wrote the cube safely. Nothing on the market did all
            three. So we built it.
          </>
        }
      />

      <Section>
        <SectionHeader title="What we believe" />
        <CardGrid items={beliefs} cols={3} />
      </Section>

      <Section>
        <SectionHeader title="What we've built so far" />
        <StatGrid items={stats} cols={2} />
      </Section>

      <CtaBand
        title="See the product"
        highlight="that runs your finance."
        primaryCta={{ label: "See products", to: "/products" }}
        secondaryCta={{ label: "Talk to us", to: "/try" }}
      />
    </PageShell>
  );
}
