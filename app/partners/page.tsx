import type { Metadata } from "next";
import { ArrowRight, Handshake, Plug2, Users } from "lucide-react";
import { DEMO_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "Implementation consultants, platform partners, and integrators — let's build together.",
};

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

export default function PartnersPage() {
  return (
    <>
      <section className="bg-white pt-10 pb-8 lg:pt-14 lg:pb-10 border-b border-surface-200">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">
            Partners
          </p>
          <h1 className="font-display font-bold text-4xl lg:text-5xl text-slate-900 tracking-tight text-balance">
            Building integrations and partnerships.
          </h1>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            We&apos;re early — but already opening doors with implementation consultants and
            platform partners. If your customers ask you for FP&amp;A or AI-driven planning, we
            should talk.
          </p>
        </div>
      </section>

      <section className="bg-surface-50 py-10 lg:py-14">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <h2 className="font-display font-bold text-2xl lg:text-3xl text-slate-900 mb-8">
            Three tracks
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {tracks.map((t) => (
              <div
                key={t.title}
                className="rounded-2xl bg-white border border-surface-200 p-6 shadow-card"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-brand-50 text-brand-600 mb-4">
                  <t.Icon className="w-5 h-5" />
                </span>
                <h3 className="font-display font-semibold text-slate-900">{t.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-10 lg:py-14 border-t border-surface-200">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="font-display font-bold text-2xl lg:text-3xl text-slate-900 mb-3">
            Partner logos coming soon
          </h2>
          <p className="text-slate-600 mb-8">
            We&apos;re onboarding the first wave now. If you want to be on this strip, write to us.
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[3/2] rounded-lg border border-dashed border-surface-200 bg-surface-50 flex items-center justify-center text-xs text-slate-400 font-mono"
              >
                Your logo here
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-brand-50 border border-brand-100 p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex-1">
              <h3 className="font-display font-semibold text-xl text-slate-900">
                Become a partner
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Tell us about your practice, your customers, and what you&apos;d need from us.
              </p>
            </div>
            <a
              href={`mailto:${DEMO_EMAIL}?subject=Partnership%20inquiry`}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold px-5 py-3 shadow-card"
            >
              Write to us
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
