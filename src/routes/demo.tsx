import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/page-placeholder";

export const Route = createFileRoute("/demo")({
  head: () => ({ meta: [{ title: "Book a demo — NashOS" }] }),
  component: () => (
    <PagePlaceholder
      eyebrow="Live demo"
      title="See NashOS run on your own data."
      lede="A working pilot beats a slideshow. Click 'Try with your data' and we'll line up a 30-minute walkthrough."
    />
  ),
});
