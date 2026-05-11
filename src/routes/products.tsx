import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/page-placeholder";

export const Route = createFileRoute("/products")({
  head: () => ({ meta: [{ title: "Products — NashOS" }] }),
  component: () => (
    <PagePlaceholder
      eyebrow="Products"
      title="One agentic system, four jobs."
      lede="Planning. Forecasting. Close. Decisions. Each delivered as a continuously computed surface — not a separate app you have to reconcile."
    />
  ),
});
