import type { Metadata } from "next";
import RoiCalculator from "@/components/RoiCalculator";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DEMO_MAILTO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "ROI Calculator",
  description:
    "Quantify the time and money your finance team would save with NashOS. Drag four sliders, see the answer in dollars.",
};

export default function CalculatorPage() {
  return (
    <>
      <section className="bg-white pt-10 pb-8 lg:pt-14 lg:pb-10 border-b border-surface-200">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">
            ROI Calculator
          </p>
          <h1 className="font-display font-bold text-4xl lg:text-5xl text-slate-900 tracking-tight text-balance">
            How much is your close cycle costing you?
          </h1>
          <p className="mt-5 text-lg text-slate-600 max-w-3xl">
            Four sliders. One number in dollars. Adjust to your team — we&apos;ll show you what
            the close + variance pack ritual costs annually, and what NashOS would save.
          </p>
        </div>
      </section>

      <section className="bg-surface-50 py-10 lg:py-14">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <RoiCalculator />
        </div>
      </section>

      <section className="gradient-cta py-12 text-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-3xl lg:text-4xl tracking-tight">
            Want to see it on your real numbers?
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 rounded-xl bg-white hover:bg-brand-50 text-brand-700 font-semibold px-6 py-3.5"
            >
              Try the live demo
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={DEMO_MAILTO}
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-6 py-3.5"
            >
              Book a 15-min walkthrough
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
