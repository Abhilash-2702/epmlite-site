import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, Calendar } from "lucide-react";
import { DEMO_EMAIL, DEMO_MAILTO } from "@/lib/constants";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Send us a note, book a 15-min demo, or write directly to admin@epmlite.com.",
};

const faq = [
  {
    q: "How quickly do you respond?",
    a: "Within one business day. Usually faster.",
  },
  {
    q: "Do you offer free trials?",
    a: "Yes — 14 days, no credit card. Mention it in your note and we'll set you up.",
  },
  {
    q: "Can I see a live demo first?",
    a: "Absolutely. 15 minutes on your data, no slides, no sales script.",
  },
];

export default function ContactPage() {
  return (
    <section className="bg-white py-10 lg:py-14">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">
            Contact
          </p>
          <h1 className="font-display font-bold text-4xl lg:text-5xl text-slate-900 tracking-tight text-balance">
            Tell us what you&apos;re trying to do.
          </h1>
          <p className="mt-6 text-lg text-slate-600">
            Drop your email — we&apos;ll send a 15-minute walkthrough invite within one business
            day. Or skip the form and write directly.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Form */}
          <div className="rounded-2xl bg-surface-50 border border-surface-200 p-7 lg:p-8">
            <h2 className="font-display font-semibold text-lg text-slate-900 mb-4">
              Drop your email
            </h2>
            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>
          </div>

          {/* Direct contact */}
          <div className="space-y-4">
            <a
              href={`mailto:${DEMO_EMAIL}`}
              className="flex items-start gap-4 rounded-2xl bg-white border border-surface-200 p-6 hover:shadow-card-hover transition-shadow"
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-brand-50 text-brand-600 shrink-0">
                <Mail className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-display font-semibold text-slate-900">Email us directly</h3>
                <p className="mt-1 text-sm text-slate-600">{DEMO_EMAIL}</p>
              </div>
            </a>

            <a
              href={DEMO_MAILTO}
              className="flex items-start gap-4 rounded-2xl bg-white border border-surface-200 p-6 hover:shadow-card-hover transition-shadow"
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-50 text-accent-emerald shrink-0">
                <Calendar className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-display font-semibold text-slate-900">
                  Book a 15-min demo
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Calendar link goes here once Calendly is set up. For now, this opens email.
                </p>
              </div>
            </a>

            <div className="rounded-2xl bg-white border border-surface-200 p-6">
              <h3 className="font-display font-semibold text-slate-900 mb-3">Quick FAQ</h3>
              <dl className="space-y-3">
                {faq.map((f) => (
                  <div key={f.q}>
                    <dt className="text-sm font-semibold text-slate-900">{f.q}</dt>
                    <dd className="text-sm text-slate-600 mt-0.5">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
