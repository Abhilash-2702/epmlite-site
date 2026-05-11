import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/page-placeholder";

export const Route = createFileRoute("/agentic-fpa-platform")({
  head: () => ({ meta: [{ title: "Agentic FP&A Platform — NashOS" }] }),
  component: () => (
    <PagePlaceholder
      eyebrow="Agentic FP&A"
      title="An agentic platform for finance teams."
      lede="One continuously computed system that plans, forecasts, and decides — with you in the loop, not chasing it."
    />
  ),
});
