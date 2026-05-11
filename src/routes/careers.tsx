import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/page-placeholder";

export const Route = createFileRoute("/careers")({
  head: () => ({ meta: [{ title: "Careers — NashOS" }] }),
  component: () => (
    <PagePlaceholder
      eyebrow="Careers"
      title="Build the system finance has been waiting for."
      lede="We're a small founding team. Roles open as we close pilots — drop us a note if your background fits agentic finance."
    />
  ),
});
