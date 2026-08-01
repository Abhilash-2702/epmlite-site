import type { ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { PageHero, Section } from "@/components/page-sections";
import type { Crumb } from "@/lib/seo";

// Shared chrome for /privacy, /terms and /security.
//
// The footer used to point all three at /contact, which is a weak trust signal
// and a dead end for anyone checking before they hand over data. These routes
// give each its own URL and structure.
//
// The copy in them is interim. Until counsel signs it off, each page renders a
// visible draft notice and its route sets `noindex` — publishing draft legal
// text that a visitor might rely on is worse than saying it isn't ready. Once
// the real text lands: delete <DraftNotice>, and remove `noindex: true` from
// the route's seo() call.

export function DraftNotice() {
  return (
    <div className="surface-card border-destructive/40 bg-destructive/5 p-5 flex items-start gap-3">
      <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
      <p className="text-sm text-muted-foreground">
        <strong className="text-foreground">Draft — not yet in force.</strong> This page is being
        finalised with counsel. For anything you need in writing today, email{" "}
        <a href="mailto:admin@nashos.ai" className="text-gold hover:underline">
          admin@nashos.ai
        </a>{" "}
        and we'll respond directly.
      </p>
    </div>
  );
}

export function LegalPage({
  title,
  highlight,
  lede,
  crumbs,
  children,
}: {
  title: string;
  highlight?: string;
  lede: string;
  crumbs: Crumb[];
  children: ReactNode;
}) {
  return (
    <PageShell crumbs={crumbs}>
      <PageHero tight eyebrow="Legal" title={title} highlight={highlight} lede={lede} />
      <Section className="max-w-3xl mx-0">
        <DraftNotice />
        <div className="mt-10 space-y-8 text-muted-foreground leading-relaxed">{children}</div>
      </Section>
    </PageShell>
  );
}

export function LegalSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-foreground mb-3">{heading}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
