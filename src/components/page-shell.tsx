import { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import type { Crumb } from "@/lib/seo";

// Standard outer chrome for every content page (gold-on-dark theme).
// Wraps SiteHeader + main + SiteFooter; adds the soft gold radial glow that
// sits behind every page hero.
//
// Pass `crumbs` to render a breadcrumb trail under the header. Give the same
// array to seo({ breadcrumbs }) in the route's head() so the visible trail and
// the BreadcrumbList schema stay in sync.
export function PageShell({ children, crumbs }: { children: ReactNode; crumbs?: Crumb[] }) {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <SiteHeader />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[600px] w-[600px] rounded-full"
        style={{ background: "var(--gradient-radial-gold)", opacity: 0.35 }}
      />
      {crumbs?.length ? <Breadcrumbs items={crumbs} /> : null}
      {children}
      <SiteFooter />
    </main>
  );
}
