import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/page-placeholder";

export const Route = createFileRoute("/financial-close-software")({
  head: () => ({ meta: [{ title: "Financial Close Software — NashOS" }] }),
  component: () => (
    <PagePlaceholder
      eyebrow="Close & consolidation"
      title="Close software, reimagined as a continuous system."
      lede="Multi-entity, multi-currency consolidation with audit trail by construction — not a monthly fire drill."
    />
  ),
});
