import type { Metadata } from "next";
import { ArrowRight, Sparkles, Zap, Compass } from "lucide-react";
import { DEMO_MAILTO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Roadmap",
  description:
    "What's coming next at EPM Lite — Now, Next, and Later. Public, honest, no fake dates.",
};

type Item = { title: string; body: string };

const NOW: Item[] = [
  { title: "AI variance commentary", body: "The agent auto-writes variance commentary on the top 3 movers, drafted as a board-ready paragraph. Click Post to commit." },
  { title: "Approval workflow on chat writes", body: "Admin-gated review before chat writes commit. The draft sits in a queue; an approver reviews + posts." },
  { title: "Designer (drag-drop dashboards)", body: "Build custom executive dashboards by dragging fields into a canvas. No model-builder team required." },
  { title: "Mobile-responsive product pass", body: "The marketing site is mobile-perfect; the product app gets the same treatment for board-meeting use." },
];

const NEXT: Item[] = [
  { title: "NetSuite + QuickBooks connectors", body: "Native bidirectional sync. Pull trial balance and chart of accounts on schedule; push journal drafts back when ready." },
  { title: "Multi-tenant SaaS hosting", body: "Self-serve account creation. Workspace isolation via row-level security. Available alongside the existing self-host option." },
  { title: "SSO (SAML / OIDC)", body: "Required by every enterprise procurement workflow. Ships with the multi-tenant release." },
  { title: "Substitution variables / row-level security", body: "Enterprise governance: hide JP entity numbers from the EU planner who shouldn't see them. Per-role, per-row." },
];

const LATER: Item[] = [
  { title: "ML-based anomaly alerts", body: "Train per-account models on history; flag departures from expected ranges. Beyond simple z-score." },
  { title: "Public dashboard share-links", body: "Generate a read-only link with a TTL + watermark. Send it to a board member who shouldn't have full access." },
  { title: "Native mobile app", body: "iOS + Android. The agent in your pocket — same chat, same writes, same audit trail." },
  { title: "Plugin system", body: "Customers + partners can ship their own tools into the agent's tool-call menu. Marketplace later." },
];

const SECTIONS = [
  { id: "now",   label: "Now",   sub: "shipping next 4–8 weeks", Icon: Zap,      tone: "border-accent-emerald bg-emerald-50/40 text-accent-emerald", items: NOW },
  { id: "next",  label: "Next",  sub: "Q3–Q4 2026",             Icon: Sparkles, tone: "border-brand-500 bg-brand-50/40 text-brand-600",       items: NEXT },
  { id: "later", label: "Later", sub: "directional · 2027",     Icon: Compass,  tone: "border-accent-violet bg-violet-50/40 text-accent-violet", items: LATER },
];

export default function RoadmapPage() {
  return (
    <>
      <section className="bg-white pt-10 pb-8 lg:pt-14 lg:pb-10 border-b border-surface-200">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">
            Roadmap
          </p>
          <h1 className="font-display font-bold text-4xl lg:text-5xl text-slate-900 tracking-tight text-balance">
            What&apos;s coming. What we&apos;re honest about.
          </h1>
          <p className="mt-5 text-lg text-slate-600 max-w-3xl">
            Three horizons: <span className="font-semibold">Now</span> (shipping in weeks),{" "}
            <span className="font-semibold">Next</span> (this year), and{" "}
            <span className="font-semibold">Later</span> (directional). No fake dates. Order
            shifts based on what design partners ask for first.
          </p>
        </div>
      </section>

      <section className="bg-surface-50 py-10 lg:py-14">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 space-y-8">
          {SECTIONS.map((s) => (
            <div key={s.id} id={s.id}>
              <div className="flex items-center gap-3 mb-5">
                <span
                  className={`inline-flex items-center justify-center w-10 h-10 rounded-lg border-2 ${s.tone}`}
                >
                  <s.Icon className="w-5 h-5" />
                </span>
                <div>
                  <h2 className="font-display font-bold text-2xl text-slate-900">{s.label}</h2>
                  <p className="text-xs text-slate-500 font-mono">{s.sub}</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {s.items.map((it) => (
                  <div
                    key={it.title}
                    className="rounded-2xl bg-white border border-surface-200 p-5 shadow-card"
                  >
                    <h3 className="font-display font-semibold text-slate-900">{it.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">{it.body}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="gradient-cta py-12 text-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-3xl tracking-tight">
            Want to influence what ships next?
          </h2>
          <p className="mt-3 text-white/80">
            Design partners get a direct line to the roadmap. We&apos;ll build what you need
            in exchange for early feedback.
          </p>
          <a
            href={DEMO_MAILTO}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white hover:bg-brand-50 text-brand-700 font-semibold px-6 py-3.5"
          >
            Become a design partner
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </>
  );
}
