import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { DEMO_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "We're an early-stage product. Not actively hiring yet — but if you're an FP&A operator who codes, write us.",
};

const profiles = [
  {
    title: "FP&A operator who codes",
    body:
      "You've owned the close, the variance pack, the budget cycle. You know what an `IFERROR(VLOOKUP())` chain feels like at 11pm. You can also write SQL or TypeScript without breaking a sweat. Help us shape the product roadmap from the inside.",
  },
  {
    title: "Designer who's allergic to lorem",
    body:
      "You've designed dense data UIs (BI, EPM, finance tools, observability). You think tables are not boring. You can hold an argument about table density and number alignment. Help us make finance not feel like a chore.",
  },
  {
    title: "Founding engineer (full-stack)",
    body:
      "TypeScript / React / Postgres + an opinion about LLM agent architecture. Comfortable shipping the database schema, the React tree, and the prompt in the same week. Bonus: built a side-project nobody asked for.",
  },
];

export default function CareersPage() {
  return (
    <>
      <section className="bg-white pt-10 pb-8 lg:pt-14 lg:pb-10 border-b border-surface-200">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">
            Careers
          </p>
          <h1 className="font-display font-bold text-4xl lg:text-5xl text-slate-900 tracking-tight text-balance">
            We&apos;re not posting jobs yet.
          </h1>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            NashOS is early-stage. Headcount plans are honest: small, deliberate, and we&apos;d
            rather meet the right person before posting a JD than the other way around. If any of
            the profiles below sounds like you, drop a line.
          </p>
        </div>
      </section>

      <section className="bg-surface-50 py-10 lg:py-14">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="font-display font-bold text-2xl lg:text-3xl text-slate-900 mb-8">
            Profiles we&apos;d love to meet
          </h2>
          <div className="space-y-4">
            {profiles.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl bg-white border border-surface-200 p-6 shadow-card"
              >
                <h3 className="font-display font-semibold text-lg text-slate-900">{p.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 rounded-2xl bg-brand-50 border border-brand-100 p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex-1">
              <h3 className="font-display font-semibold text-xl text-slate-900">
                Send us a note
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                A paragraph about you and what you&apos;ve shipped is plenty. No CV ATS gymnastics.
              </p>
            </div>
            <a
              href={`mailto:${DEMO_EMAIL}?subject=Hello%20%E2%80%94%20NashOS%20careers`}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold px-5 py-3 shadow-card"
            >
              Write us
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
