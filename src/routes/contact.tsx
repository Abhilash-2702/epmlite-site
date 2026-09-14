import { createFileRoute } from "@tanstack/react-router";
import { Mail, Calendar } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { PageHero, Section, FaqList } from "@/components/page-sections";
import { seo } from "@/lib/seo";

// Visible trail + BreadcrumbList schema. Same array to both so they can't drift.
const CRUMBS = [{ name: "Contact", path: "/contact" }];
import { SocialLinks } from "@/components/social-links";

export const Route = createFileRoute("/contact")({
  head: () =>
    seo({
      title: "Contact — NashOS",
      description:
        "Send us a note, book a 15-min demo, or write directly to admin@nashos.ai.",
      breadcrumbs: CRUMBS,
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
    <PageShell crumbs={CRUMBS}>
      <PageHero
        tight
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
              {/* This line used to read "Calendar link goes here once Calendly
                  is set up." — a note to ourselves, published on a live page
                  (2026-09 audit). The card has always opened a pre-addressed
                  demo-request email, so it now says what actually happens.
                  Swap in the scheduler link when one exists. */}
              <p className="mt-3 text-xs text-muted-foreground/80">
                Tell us your timezone and we'll send times that suit.
              </p>
            </div>
          </a>
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold mb-3">Follow along</h2>
          <p className="text-sm text-muted-foreground">
            Product updates, FP&amp;A patterns, and what we ship each week.
          </p>
          <SocialLinks className="mt-5" />
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
