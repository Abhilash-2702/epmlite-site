import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/page-placeholder";

export const Route = createFileRoute("/changelog")({
  head: () => ({ meta: [{ title: "Changelog — NashOS" }] }),
  component: () => (
    <PagePlaceholder
      eyebrow="Changelog"
      title="What's new in NashOS."
      lede="Per-release notes, ship dates, and the reasoning behind decisions. Public changelog goes live alongside the v1 launch."
    />
  ),
});
