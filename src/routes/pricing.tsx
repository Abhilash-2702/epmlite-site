import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/pricing")({
  head: () =>
    seo({
      title: "Pricing — NashOS",
      description:
        "Pilot in days. Scale with confidence.",
      path: "/pricing",
    }),
  component: PricingPage,
});

const tiers = [
  {
    name: "Pilot",
    price: "On request",
    blurb: "Stand up NashOS on a single entity in days.",
    features: ["1 entity", "Connectors to your ERP", "Audit-ready ledger", "Onboarding squad"],
    cta: "Start a pilot",
    highlight: false,
  },
  {
    name: "Operate",
    price: "Custom",
    blurb: "Run finance as a continuously computed system.",
    features: ["Multi-entity & multi-currency", "Driver-based forecasts", "Scenario rooms", "Priority support"],
    cta: "Talk to us",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Bespoke",
    blurb: "Global rollout with controls, governance and lineage at scale.",
    features: ["Role-based access control", "Region pinning", "Dedicated environment", "Solution engineering"],
    cta: "Contact sales",
    highlight: false,
  },
];

function PricingPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <SiteHeader />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[600px] w-[600px] rounded-full"
        style={{ background: "var(--gradient-radial-gold)" }}
      />
      <section className="relative mx-auto max-w-[1400px] px-6 lg:px-10 pt-40 pb-24">
        <div className="max-w-3xl">
          <span className="chip"><span className="chip-dot pulse-dot" />Pricing</span>
          <h1 className="mt-8 text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
            Pilot in days. <span className="text-gradient-gold">Scale with confidence.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Plans are tailored to your entity count, data volume and rollout pace.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className="surface-card p-8 flex flex-col"
              style={t.highlight ? { boxShadow: "var(--shadow-gold)", borderColor: "rgba(43,97,162,0.5)" } : undefined}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">{t.name}</h3>
                {t.highlight && <span className="chip" style={{ padding: ".25rem .6rem" }}>Most teams</span>}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{t.blurb}</p>
              <div className="mt-6 text-3xl font-semibold text-gradient-gold">{t.price}</div>
              <ul className="mt-6 space-y-3 text-sm text-foreground/90 flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gold" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/try"
                className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold ${t.highlight ? "btn-gold" : "btn-outline-gold"}`}
              >
                {t.cta} <span aria-hidden>→</span>
              </Link>
            </div>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
