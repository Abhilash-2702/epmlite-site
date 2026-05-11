import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/page-placeholder";

export const Route = createFileRoute("/resources")({
  head: () => ({ meta: [{ title: "Resources — NashOS" }] }),
  component: () => (
    <PagePlaceholder
      eyebrow="Resources"
      title="Templates, frameworks, and field notes."
      lede="Operating templates and how-tos for FP&A teams adopting agentic workflows. The library lands with v1."
    />
  ),
});
