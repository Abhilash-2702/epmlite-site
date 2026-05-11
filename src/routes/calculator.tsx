import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/page-placeholder";

export const Route = createFileRoute("/calculator")({
  head: () => ({ meta: [{ title: "ROI calculator — NashOS" }] }),
  component: () => (
    <PagePlaceholder
      eyebrow="ROI calculator"
      title="What NashOS is worth to your team."
      lede="The interactive calculator is being rebuilt. In the meantime, talk to us and we'll model your specific stack."
    />
  ),
});
