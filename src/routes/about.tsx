import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/page-placeholder";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — NashOS" }] }),
  component: () => (
    <PagePlaceholder
      eyebrow="About"
      title="The story behind NashOS."
      lede="Built by an FP&A operator who spent too many quarters wrestling spreadsheets. NashOS is what finance feels like when computation lives inside the system, not the user."
    />
  ),
});
