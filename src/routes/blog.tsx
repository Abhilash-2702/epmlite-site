import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/page-placeholder";

export const Route = createFileRoute("/blog")({
  head: () => ({ meta: [{ title: "Blog — NashOS" }] }),
  component: () => (
    <PagePlaceholder
      eyebrow="Blog"
      title="Notes from finance, AI and the work in between."
      lede="Long-form posts on agentic finance, FP&A operating patterns, and what we're learning building NashOS."
    />
  ),
});
