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
    // Tell the browser to start downloading the hero videos from byte 1 of
    // the page load — in parallel with HTML/CSS — so they're ready to play
    // by the time the hero paints. Eliminates the brief poster-image flash.
    // Only applied on the home route (other routes don't need them).
    links: [
      { rel: "preload", as: "video", href: "/hero-cfo.mp4", type: "video/mp4" },
      { rel: "preload", as: "video", href: "/hero-boardroom.mp4", type: "video/mp4" },
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
