import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/page-placeholder";

export const Route = createFileRoute("/vs/anaplan")({
  head: () => ({ meta: [{ title: "NashOS vs Anaplan" }] }),
  component: () => (
    <PagePlaceholder
      eyebrow="vs Anaplan"
      title="NashOS vs Anaplan."
      lede="Anaplan asks you to model in Hyperblocks. NashOS computes from your facts. Honest comparison + migration playbook coming."
    />
  ),
});
