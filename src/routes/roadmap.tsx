import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Zap, Compass, type LucideIcon } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { PageHero, Section, CtaBand } from "@/components/page-sections";

export const Route = createFileRoute("/roadmap")({
  head: () => ({
    meta: [
      { title: "Roadmap — NashOS" },
      {
        name: "description",
        content:
          "What's coming next at NashOS — Now, Next, and Later. Public, honest, no fake dates.",
      },
    ],
  }),
  component: RoadmapPage,
});

type Item = { title: string; body: string };

const NOW: Item[] = [
  {
    title: "AI variance commentary",
    body:
      "The agent auto-writes variance commentary on the top 3 movers, drafted as a board-ready paragraph. Click Post to commit.",
  },
  {
    title: "Approval workflow on chat writes",
    body:
      "Admin-gated review before chat writes commit. The draft sits in a queue; an approver reviews + posts.",
  },
  {
    title: "Designer (drag-drop dashboards)",
    body:
      "Build custom executive dashboards by dragging fields into a canvas. No model-builder team required.",
  },
  {
    title: "Mobile-responsive product pass",
    body:
      "The product app gets the same mobile polish the marketing site already has. Board-meeting ready on iPad.",
  },
];

const NEXT: Item[] = [
  {
    title: "NetSuite + QuickBooks connectors",
    body:
      "Native bidirectional sync. Pull trial balance and chart of accounts on schedule; push journal drafts back when ready.",
  },
  {
    title: "Multi-tenant SaaS hosting",
    body:
      "Self-serve account creation. Workspace isolation via row-level security. Available alongside the existing self-host option.",
  },
  {
    title: "SSO (SAML / OIDC)",
    body:
      "Required by every enterprise procurement workflow. Ships with the multi-tenant release.",
  },
  {
    title: "Substitution variables / row-level security",
    body:
      "Enterprise governance: hide JP entity numbers from the EU planner who shouldn't see them. Per-role, per-row.",
  },
];

const LATER: Item[] = [
  {
    title: "ML-based anomaly alerts",
    body:
      "Train per-account models on history; flag departures from expected ranges. Beyond simple z-score.",
  },
  {
    title: "Public dashboard share-links",
    body:
      "Generate a read-only link with a TTL + watermark. Send it to a board member who shouldn't have full access.",
  },
  {
    title: "Native mobile app",
    body:
      "iOS + Android. The agent in your pocket — same chat, same writes, same audit trail.",
  },
  {
    title: "Plugin system",
    body:
      "Customers + partners can ship their own tools into the agent's tool-call menu. Marketplace later.",
  },
];

const SECTIONS: {
  id: string;
  label: string;
  sub: string;
  Icon: LucideIcon;
  items: Item[];
}[] = [
  { id: "now", label: "Now", sub: "shipping next 4–8 weeks", Icon: Zap, items: NOW },
  { id: "next", label: "Next", sub: "Q3–Q4 2026", Icon: Sparkles, items: NEXT },
  { id: "later", label: "Later", sub: "directional · 2027", Icon: Compass, items: LATER },
];

function RoadmapPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Roadmap"
        title="What's coming."
        highlight="What we're honest about."
        lede={
          <>
            Three horizons: <strong>Now</strong> (shipping in weeks), <strong>Next</strong>{" "}
            (this year), and <strong>Later</strong> (directional). No fake dates. Order shifts
            based on what design partners ask for first.
          </>
        }
      />

      <Section>
        <div className="space-y-12">
          {SECTIONS.map((s) => (
            <div key={s.id} id={s.id}>
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-lg border-2 border-gold/30 bg-gold/10 text-gold">
                  <s.Icon className="w-5 h-5" />
                </span>
                <div>
                  <h2 className="text-2xl font-bold">{s.label}</h2>
                  <p className="text-xs text-muted-foreground font-mono">{s.sub}</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {s.items.map((it) => (
                  <div key={it.title} className="surface-card p-5">
                    <h3 className="font-semibold">{it.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {it.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Want to influence what"
        highlight="ships next?"
        lede="Design partners get a direct line to the roadmap. We'll build what you need in exchange for early feedback."
        primaryCta={{ label: "Become a design partner", to: "/try" }}
      />
    </PageShell>
  );
}
