import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, LegalSection } from "@/components/legal-page";
import { seo, type Crumb } from "@/lib/seo";

const CRUMBS: Crumb[] = [{ name: "Security", path: "/security" }];

export const Route = createFileRoute("/security")({
  head: () =>
    seo({
      title: "Security at NashOS",
      description:
        "How access control and auditability work in NashOS, and how to reach us with a security question or disclosure.",
      path: "/security",
      // Remove once the posture below is confirmed (see components/legal-page.tsx).
      noindex: true,
    }),
  component: SecurityPage,
});

// Only product behaviour that is actually implemented is described here.
// Certifications, hosting detail, encryption specifics, pen-test cadence and
// SLAs are NOT claimed — an unsubstantiated security claim is the fastest way
// to lose an enterprise deal at diligence. Fill in from the real posture.
function SecurityPage() {
  return (
    <LegalPage
      title="Security"
      highlight="at NashOS."
      lede="How change control and auditability work in the product, and how to reach us."
      crumbs={CRUMBS}
    >
      <LegalSection heading="Audit trail">
        <p>
          Every write to a NashOS workspace records the value before the change, the value after,
          the account that made it, the timestamp, and the request that produced it. Reports
          drill through to the source rows behind each figure.
        </p>
      </LegalSection>

      <LegalSection heading="Change control">
        <p>
          Changes proposed by the agent are staged as drafts and are not written until a user
          confirms them. Every confirmation is attributed and timestamped.
        </p>
        <p>
          {/* Do not promote this to a shipped capability until the roadmap item
              "Approval workflow on chat writes" actually ships — see routes/roadmap.tsx. */}
          Separating the right to draft a change from the right to approve it, so a change waits
          in a queue for a second person, is on the near-term roadmap and is not available today.
        </p>
      </LegalSection>

      <LegalSection heading="Infrastructure and certifications">
        {/* TODO: fill in from the real posture — hosting region, encryption in
            transit and at rest, backup and recovery, access review cadence,
            penetration testing, and any certification actually held.
            Do not list a certification that is in progress as if it is held. */}
        <p>
          We're documenting our full infrastructure and compliance posture. If you need specifics
          for a security review, email{" "}
          <a href="mailto:admin@nashos.ai" className="text-gold hover:underline">
            admin@nashos.ai
          </a>{" "}
          and we'll answer your questionnaire directly.
        </p>
      </LegalSection>

      <LegalSection heading="Reporting a vulnerability">
        <p>
          If you believe you've found a security issue, email{" "}
          <a href="mailto:admin@nashos.ai" className="text-gold hover:underline">
            admin@nashos.ai
          </a>{" "}
          with enough detail to reproduce it. Please give us a reasonable window to respond
          before disclosing publicly.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
