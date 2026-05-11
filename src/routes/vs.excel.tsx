import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/page-placeholder";

export const Route = createFileRoute("/vs/excel")({
  head: () => ({ meta: [{ title: "NashOS vs Excel" }] }),
  component: () => (
    <PagePlaceholder
      eyebrow="vs Excel"
      title="NashOS vs Excel."
      lede="Excel is the universal back-office tool — and the universal back-office tax. NashOS picks up the structured work; you keep Excel for the rest."
    />
  ),
});
