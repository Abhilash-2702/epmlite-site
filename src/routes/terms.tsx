import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, LegalSection } from "@/components/legal-page";
import { seo, type Crumb } from "@/lib/seo";

const CRUMBS: Crumb[] = [{ name: "Terms of Service", path: "/terms" }];

export const Route = createFileRoute("/terms")({
  head: () =>
    seo({
      title: "Terms of Service | NashOS",
      description:
        "The terms that govern use of the NashOS website and platform, and how to obtain the current commercial agreement.",
      path: "/terms",
      // Remove once counsel has approved the text (see components/legal-page.tsx).
      noindex: true,
    }),
  component: TermsPage,
});

// Deliberately thin. Terms create binding obligations, so nothing here asserts
// a commitment that hasn't been drafted — the page exists so the footer link
// resolves and so there is a canonical place for the real text to land.
function TermsPage() {
  return (
    <LegalPage
      title="Terms of"
      highlight="Service."
      lede="The terms covering use of this website and the NashOS platform."
      crumbs={CRUMBS}
    >
      <LegalSection heading="Using this website">
        <p>
          This website describes the NashOS product. Content on it is provided for information
          and may change as the product changes; figures quoted in examples illustrate typical
          outcomes rather than guaranteed results.
        </p>
      </LegalSection>

      <LegalSection heading="Using the NashOS platform">
        <p>
          Access to a NashOS workspace is governed by the commercial agreement signed for that
          workspace, not by this page. To see the current agreement before committing, email{" "}
          <a href="mailto:admin@nashos.ai" className="text-gold hover:underline">
            admin@nashos.ai
          </a>{" "}
          and we will send it.
        </p>
        {/* TODO(counsel): subscription terms, acceptable use, uptime commitments,
            liability caps, termination, governing law and jurisdiction. */}
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions about these terms:{" "}
          <a href="mailto:admin@nashos.ai" className="text-gold hover:underline">
            admin@nashos.ai
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
