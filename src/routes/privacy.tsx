import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, LegalSection } from "@/components/legal-page";
import { seo, type Crumb } from "@/lib/seo";

const CRUMBS: Crumb[] = [{ name: "Privacy Policy", path: "/privacy" }];

export const Route = createFileRoute("/privacy")({
  head: () =>
    seo({
      title: "Privacy Policy | NashOS",
      description:
        "How NashOS collects, uses and stores information submitted through nashos.ai — form submissions, analytics, and how to reach us about your data.",
      path: "/privacy",
      // Remove once counsel has approved the text (see components/legal-page.tsx).
      noindex: true,
    }),
  component: PrivacyPage,
});

// What this page states about the website is accurate as built: the only data
// the marketing site collects is what a visitor types into a lead form (posted
// to /api/lead and emailed on) plus GA4 analytics when VITE_GA4_ID is set.
// Everything concerning the NashOS *product* — retention, sub-processors,
// transfers, DPAs — needs counsel and is marked below.
function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy"
      highlight="Policy."
      lede="What we collect through this website, why, and how to reach us about it."
      crumbs={CRUMBS}
    >
      <LegalSection heading="Who we are">
        <p>
          NashOS operates this website and the NashOS platform. For any question about this
          policy or about data we hold, write to{" "}
          <a href="mailto:admin@nashos.ai" className="text-gold hover:underline">
            admin@nashos.ai
          </a>
          .
        </p>
        {/* TODO(counsel): registered entity name, company number and registered
            address go here, and must match the footer NAP and Organization schema. */}
      </LegalSection>

      <LegalSection heading="What this website collects">
        <p>
          If you submit one of our forms — the pilot request on{" "}
          <code className="text-foreground">/try</code>, or the access request on{" "}
          <code className="text-foreground">/sign-in</code> — we receive the fields you complete
          (such as your name, work email, company and what you'd like modelled). Those
          submissions are delivered to us by email so we can reply.
        </p>
        <p>
          If website analytics are enabled, we use Google Analytics 4 to understand which pages
          are read and how visitors arrive. That data is aggregated and is not used to identify
          you personally.
        </p>
        <p>
          We do not sell personal information, and we do not share form submissions with third
          parties for their own marketing.
        </p>
      </LegalSection>

      <LegalSection heading="Data you put into the NashOS product">
        {/* TODO(counsel): this section is the one that matters commercially —
            customer financial data. Needs retention periods, sub-processor list,
            transfer mechanism, deletion process and DPA reference. */}
        <p>
          Financial data loaded into a NashOS workspace is handled under the agreement covering
          that workspace rather than under this website policy. Ask us for the current data
          processing terms before a pilot and we will send them.
        </p>
      </LegalSection>

      <LegalSection heading="Your rights">
        <p>
          You can ask us what we hold about you, ask us to correct it, or ask us to delete it.
          Email{" "}
          <a href="mailto:admin@nashos.ai" className="text-gold hover:underline">
            admin@nashos.ai
          </a>{" "}
          and we will respond.
        </p>
        {/* TODO(counsel): statutory response windows and supervisory-authority
            details depend on the registered jurisdiction. */}
      </LegalSection>
    </LegalPage>
  );
}
