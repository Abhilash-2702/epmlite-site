import { createFileRoute } from "@tanstack/react-router";
import { PlayCircle, Eye, MessageSquare, FlaskConical } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import {
  PageHero,
  Section,
  SectionHeader,
  CardGrid,
  CtaBand,
} from "@/components/page-sections";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/demo")({
  head: () =>
    seo({
      title: "Live demo — NashOS",
      description:
        "Touch the NashOS product with sample data. Click around the dashboard, ask the AI agent a question, run a what-if.",
      path: "/demo",
    }),
  component: DemoPage,
});

const HIGHLIGHTS = [
  {
    Icon: Eye,
    title: "Executive dashboard on $50M ARR sample",
    body:
      "Revenue, Gross Profit, EBITDA, Net Income with variance vs budget. Status badge on top. Drill into any KPI.",
  },
  {
    Icon: MessageSquare,
    title: "AI agent — 35+ tools",
    body:
      'Ask: "What\'s our runway?" "Why is COGS up?" "Hire 3 engineers and show the impact." Watch tool calls stream live.',
  },
  {
    Icon: FlaskConical,
    title: "What-if slider",
    body:
      "Drag the revenue / hiring sliders, see EBITDA + runway recompute in <1 second. Save the scenario to compare later.",
  },
  {
    Icon: PlayCircle,
    title: "Forecast comparison",
    body:
      "Run 5 algorithms side-by-side on the same series. See R² / RMSE / MAPE. Lock the one you trust.",
  },
];

function DemoPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Live demo · sample data"
        title="Touch the product."
        highlight="No signup."
        lede={
          <>
            A working slice of NashOS running on sample data from a $50M ARR SaaS. Click around
            the dashboard, ask the agent a question, and run a what-if. When you're ready, book
            a real walkthrough on your data.
          </>
        }
        primaryCta={{ label: "Open the demo app", href: "https://app.nashos.ai" }}
        secondaryCta={{ label: "Book a walkthrough", to: "/try" }}
      />

      <Section>
        <SectionHeader
          title="What you can try"
          caption="Read-only · sample numbers · no data is saved."
        />
        <CardGrid items={HIGHLIGHTS} cols={2} />
      </Section>

      <CtaBand
        title="Now run it on"
        highlight="your data."
        lede="Bring a trial balance. We'll have a working dashboard, drivers, and forecast in your environment in 15 minutes."
        primaryCta={{ label: "Try with your data", to: "/try" }}
        secondaryCta={{ label: "Send a note", to: "/contact" }}
      />
    </PageShell>
  );
}
