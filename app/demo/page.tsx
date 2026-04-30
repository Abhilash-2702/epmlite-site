import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { DEMO_MAILTO } from "@/lib/constants";
import DemoConsole from "@/components/demo/DemoConsole";

export const metadata: Metadata = {
  title: "Live demo",
  description:
    "Touch the EPM Lite product with sample data. No signup. Click around the dashboard, ask the AI agent a question, run a what-if.",
};

export default function DemoPage() {
  return (
    <>
      {/* Header band */}
      <section className="bg-white border-b border-surface-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 lg:py-12">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">
            Live demo · sample data
          </p>
          <h1 className="font-display font-bold text-3xl lg:text-5xl text-slate-900 tracking-tight text-balance">
            Touch the product. No signup.
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl leading-relaxed">
            This is a working slice of EPM Lite running on sample data from a $50M ARR SaaS.
            Click around the dashboard, ask the agent a question, and run a what-if. When
            you&apos;re ready, book a real walkthrough on your data.
          </p>
          <div className="mt-3 inline-flex items-center gap-2 text-sm text-slate-500">
            <Info className="w-4 h-4 text-accent-amber shrink-0" />
            Read-only · sample numbers · no data is saved
          </div>
        </div>
      </section>

      {/* Demo console */}
      <section className="bg-surface-50 py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <DemoConsole />
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-cta py-12 text-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-3xl lg:text-4xl tracking-tight">
            Now run it on your data.
          </h2>
          <p className="mt-4 text-lg text-white/80">
            Bring a trial balance. We&apos;ll have a working dashboard, drivers, and forecast
            in your environment in 15 minutes.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href={DEMO_MAILTO}
              className="inline-flex items-center gap-2 rounded-xl bg-white hover:bg-brand-50 text-brand-700 font-semibold px-6 py-3.5"
            >
              Book a 15-min walkthrough
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-6 py-3.5"
            >
              Send a note
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
