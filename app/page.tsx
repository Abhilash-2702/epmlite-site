import Hero from "@/components/Hero";
import PersonaPanel, { ShowFor } from "@/components/PersonaPanel";
import { PersonaProvider } from "@/components/PersonaContext";
import Pain from "@/components/Pain";
import How from "@/components/How";
import WhatIfBand from "@/components/WhatIfBand";
import FeatureGrid from "@/components/FeatureGrid";
import ChatShowcase from "@/components/ChatShowcase";
import DriverFormulaBand from "@/components/DriverFormulaBand";
import CaseStudyBand from "@/components/CaseStudyBand";
import Security from "@/components/Security";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <PersonaProvider>
      <Hero />
      <PersonaPanel />
      <Pain />
      <How />
      <WhatIfBand />
      <FeatureGrid />
      <ChatShowcase />
      {/* Driver formulas only for FP&A + Founder. CFOs don't write formulas — they ratify. */}
      <ShowFor personas={["fpa", "founder"]}>
        <DriverFormulaBand />
      </ShowFor>
      <CaseStudyBand />
      {/* Security details mostly matter to CFOs. FP&A + Founder see a summary in PersonaPanel already. */}
      <ShowFor personas={["cfo", "fpa"]}>
        <Security />
      </ShowFor>
      <Pricing />
      <FAQ />
      <CTASection />
    </PersonaProvider>
  );
}
