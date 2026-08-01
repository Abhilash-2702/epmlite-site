import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/hero";
import { FromQtoDSection } from "@/components/sections/from-q-to-d-section";
import { SystemSection } from "@/components/sections/system-section";
import { InsideNashSection } from "@/components/sections/inside-nash-section";
import { ForLeadersSection } from "@/components/sections/for-leaders-section";
import { HomeContentSection, HOME_FAQ } from "@/components/sections/home-content-section";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      title: "Agentic FP&A Software for Planning & Forecasting | NashOS",
      description:
        "NashOS is agentic FP&A software that runs planning, forecasting and close as one continuously computed system. Multi-entity, multi-currency, audit-ready.",
      path: "/",
      faq: HOME_FAQ,
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
      {/* Crawlable prose + FAQ — the animated sections above carry almost no text. */}
      <HomeContentSection />
      <SiteFooter />
    </main>
  );
}
