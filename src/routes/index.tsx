import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/hero";
import { FromQtoDSection } from "@/components/sections/from-q-to-d-section";
import { SystemSection } from "@/components/sections/system-section";
import { InsideNashSection } from "@/components/sections/inside-nash-section";
import { ForLeadersSection } from "@/components/sections/for-leaders-section";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NashOS — Agentic Finance for planning, forecasting & decisions" },
      {
        name: "description",
        content:
          "NashOS runs your finance as one continuously computed system — multi-entity, multi-currency, audit-ready from day one.",
      },
      { property: "og:title", content: "NashOS — Agentic Finance" },
      {
        property: "og:description",
        content: "A unified system for planning, forecasting, and decisions.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <SiteHeader />
      <Hero />
      <FromQtoDSection />
      <SystemSection />
      <InsideNashSection />
      <ForLeadersSection />
      <SiteFooter />
    </main>
  );
}
