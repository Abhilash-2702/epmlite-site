import { createFileRoute } from "@tanstack/react-router";
import { Handshake, Plug2, Users } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import {
  PageHero,
  Section,
  SectionHeader,
  CardGrid,
  CtaBand,
} from "@/components/page-sections";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Partners — NashOS" },
      {
        name: "description",
        content:
          "Implementation consultants, platform partners, and integrators — let's build together.",
      },
    ],
  }),
  component: PartnersPage,
});

const tracks = [
  {
    Icon: Handshake,
    title: "Implementation partners",
    body:
      "FP&A and finance-transformation consultants who help teams roll out NashOS. Revenue-share on referred deals, co-marketing, joint case studies.",
  },
  {
    Icon: Plug2,
    title: "Platform & data partners",
    body:
      "ERPs (NetSuite, Oracle, SAP, QuickBooks), data warehouses, and BI tools that need a thin EPM layer on top. Connector co-development welcome.",
  },
  {
    Icon: Users,
    title: "Resellers & MSPs",
    body:
      "Managed service providers in finance and accounting. White-label option available on the Enterprise tier; volume pricing on request.",
  },
];

function PartnersPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Partners"
        title="Building integrations"
        highlight="and partnerships."
        lede={
          <>
            We're early — but already opening doors with implementation consultants and platform
            partners. If your customers ask you for FP&amp;A or AI-driven planning, we should
            talk.
          </>
        }
      />

      <Section>
        <SectionHeader title="Three tracks" />
        <CardGrid items={tracks} cols={3} />
      </Section>

      <Section>
        <SectionHeader
          title="Partner logos coming soon"
          caption="We're onboarding the first wave now. If you want to be on this strip, write to us."
        />
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[3/2] rounded-lg border border-dashed border-border bg-card/30 flex items-center justify-center text-xs text-muted-foreground/60 font-mono"
            >
              Your logo
            </div>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Become a"
        highlight="partner."
        lede="Tell us about your practice, your customers, and what you'd need from us."
        primaryCta={{
          label: "Write to us",
          href: "mailto:admin@nashos.ai?subject=Partnership%20inquiry",
        }}
      />
    </PageShell>
  );
}
