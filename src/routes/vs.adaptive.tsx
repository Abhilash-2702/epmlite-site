import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/page-placeholder";

export const Route = createFileRoute("/vs/adaptive")({
  head: () => ({ meta: [{ title: "NashOS vs Adaptive Planning" }] }),
  component: () => (
    <PagePlaceholder
      eyebrow="vs Adaptive Planning"
      title="NashOS vs Adaptive Planning."
      lede="Adaptive is a planning tool. NashOS is a continuously computed system — same job, fundamentally different shape. Side-by-side comparison lands soon."
    />
  ),
});
