import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HomeHero } from "@/components/home/hero";
import { FromQtoDBand } from "@/components/home/from-q-to-d";
import { SystemBand } from "@/components/home/system";
import { InsideNashBand } from "@/components/home/inside-nash";
import { ForLeadersBand } from "@/components/home/for-leaders";
import { WhatNashOSIsBand } from "@/components/home/what-nashos-is";
import { FaqBand } from "@/components/home/faq";
import { HOME_FAQ } from "@/components/home/faq-data";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      title: "Finance Automation Software | AI Forecasting & Finance Agents",
      description:
        "Discover finance automation software with AI forecasting and AI agents for finance. Automate planning, forecasting and decisions with NashOS.",
      path: "/",
      faq: HOME_FAQ,
    }),
  component: Index,
});

// The homepage redesign (2026-11): every class is .hp-*, styled by
// src/styles/home.css and scoped to the .hp-home wrapper. Navy and light bands
// alternate; the left spine runs from the hero through every band into the
// footer. See src/components/home/README.md.
function Index() {
  return (
    <div className="hp-home">
      <SiteHeader />
      <main>
        <HomeHero />
        <FromQtoDBand />
        <SystemBand />
        <InsideNashBand />
        <ForLeadersBand />
        <WhatNashOSIsBand />
        <FaqBand />
      </main>
      <SiteFooter />
    </div>
  );
}
