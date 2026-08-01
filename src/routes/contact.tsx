import { createFileRoute } from "@tanstack/react-router";
import { Mail, Calendar } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { PageHero, Section, FaqList } from "@/components/page-sections";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    seo({
      title: "Contact — NashOS",
      description:
        "Send us a note, book a 15-min demo, or write directly to admin@nashos.ai.",
      path: "/contact",
    }),
  component: ContactPage,
});

const FAQ = [
  { question: "How quickly do you respond?", answer: "Within one business day. Usually faster." },
  {
    question: "Do you offer free trials?",
    answer:
      "Yes — 14 days, no credit card. Mention it in your note and we'll set you up.",
  },
  {
    question: "Can I see a live demo first?",
    answer:
      "Absolutely. 15 minutes on your data, no slides, no sales script.",
  },
];

function ContactPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Contact"
        title="Tell us what you're"
        highlight="trying to do."
        lede={
          <>
            Drop your email — we'll send a 15-minute walkthrough invite within one business day.
            Or skip the form and write directly to{" "}
            <a href="mailto:admin@nashos.ai" className="text-gold hover:underline">
              admin@nashos.ai
            </a>
            .
          </>
        }
      />

      <Section>
        <div className="grid lg:grid-cols-2 gap-6">
          <a
            href="mailto:admin@nashos.ai"
            className="surface-card p-7 flex items-start gap-4 hover:border-gold/40 transition-colors"
          >
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gold/10 text-gold shrink-0">
              <Mail className="w-6 h-6" />
            </span>
            <div>
              <h3 className="font-semibold text-lg">Email us directly</h3>
              <p className="mt-1 text-sm text-muted-foreground">admin@nashos.ai</p>
              <p className="mt-3 text-xs text-muted-foreground/80">
                Response in one business day.
              </p>
            </div>
          </a>
          <a
            href="mailto:admin@nashos.ai?subject=Demo%20request"
            className="surface-card p-7 flex items-start gap-4 hover:border-gold/40 transition-colors"
          >
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gold/10 text-gold shrink-0">
              <Calendar className="w-6 h-6" />
            </span>
            <div>
              <h3 className="font-semibold text-lg">Book a 15-min demo</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                We'll line up a walkthrough on your data.
              </p>
              <p className="mt-3 text-xs text-muted-foreground/80">
                Calendar link goes here once Calendly is set up.
              </p>
            </div>
          </a>
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold mb-6">Quick FAQ</h2>
          <FaqList items={FAQ} />
        </div>
      </Section>
    </PageShell>
  );
}
