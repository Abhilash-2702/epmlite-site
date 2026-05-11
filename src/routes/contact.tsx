import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/page-placeholder";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — NashOS" }] }),
  component: () => (
    <PagePlaceholder
      eyebrow="Contact"
      title="Talk to us."
      lede="Email admin@nashos.ai for pilots, partnerships, security questions, or anything else. We respond within one business day."
    />
  ),
});
