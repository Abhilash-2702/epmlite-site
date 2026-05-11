import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/page-placeholder";

export const Route = createFileRoute("/roadmap")({
  head: () => ({ meta: [{ title: "Roadmap — NashOS" }] }),
  component: () => (
    <PagePlaceholder
      eyebrow="Roadmap"
      title="What we're building, in order."
      lede="A public roadmap goes live with v1. Until then, ask us about a specific connector or scenario — chances are it's already in the queue."
    />
  ),
});
