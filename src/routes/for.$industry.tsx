import { createFileRoute, useParams } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/page-placeholder";

export const Route = createFileRoute("/for/$industry")({
  head: () => ({ meta: [{ title: "Built for your team — NashOS" }] }),
  component: ForIndustry,
});

const KNOWN: Record<string, { title: string; lede: string }> = {
  saas: {
    title: "NashOS for SaaS finance teams.",
    lede: "ARR, NRR, CAC payback, deferred revenue and the variance explanations your board actually reads.",
  },
  services: {
    title: "NashOS for services-led businesses.",
    lede: "Project margin, utilization, billable mix and forward bookings — modeled per practice, rolled up in one click.",
  },
  manufacturing: {
    title: "NashOS for manufacturing finance.",
    lede: "BOM-aware costing, capacity planning, and contribution analysis you can trace down to the SKU."
  },
};

function ForIndustry() {
  const { industry } = useParams({ from: "/for/$industry" });
  const known = KNOWN[industry.toLowerCase()];
  const pretty = industry
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");

  return (
    <PagePlaceholder
      eyebrow="Built for you"
      title={known?.title ?? `NashOS for ${pretty}.`}
      lede={
        known?.lede ??
        `Vertical-specific content for ${pretty} is being rebuilt. Talk to us — we'll send the relevant case study by hand.`
      }
    />
  );
}
