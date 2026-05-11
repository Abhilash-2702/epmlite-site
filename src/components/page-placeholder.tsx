import { Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

// Shared shell for routes that exist for SEO/link continuity but don't have
// real content yet. Renders header + a centered card + footer in the new
// gold-on-dark theme so deep links from the legacy site don't 404 and look
// cohesive with the new IA. Replace with real content as each page is built.
export function PagePlaceholder({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <SiteHeader />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[600px] w-[600px] rounded-full"
        style={{ background: "var(--gradient-radial-gold)", opacity: 0.4 }}
      />
      <section className="relative mx-auto max-w-3xl px-6 lg:px-10 pt-40 pb-32 text-center">
        <span className="chip">
          <span className="chip-dot pulse-dot" />
          {eyebrow}
        </span>
        <h1 className="mt-8 text-5xl font-semibold tracking-tight leading-[1.05]">
          {title}
        </h1>
        {lede && <p className="mt-6 text-lg text-muted-foreground">{lede}</p>}
        <p className="mt-10 text-sm text-muted-foreground">
          This page is being rebuilt.{" "}
          <Link to="/" className="text-gold hover:underline">
            Back home
          </Link>{" "}
          or{" "}
          <Link to="/try" className="text-gold hover:underline">
            talk to us
          </Link>
          .
        </p>
      </section>
      <SiteFooter />
    </main>
  );
}
