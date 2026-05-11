import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/page-placeholder";

export const Route = createFileRoute("/partners")({
  head: () => ({ meta: [{ title: "Partners — NashOS" }] }),
  component: () => (
    <PagePlaceholder
      eyebrow="Partners"
      title="Build with NashOS."
      lede="Implementation partners, ERP connectors, and SI relationships. Our partner program opens alongside v1."
    />
  ),
});
