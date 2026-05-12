import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/try")({
  head: () => ({ meta: [{ title: "Try with your data — NashOS" }] }),
  component: Try,
});

function Try() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <SiteHeader />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[700px] w-[700px] rounded-full"
        style={{ background: "var(--gradient-radial-gold)" }}
      />
      <section className="relative mx-auto max-w-3xl px-6 lg:px-10 pt-40 pb-24">
        <span className="chip"><span className="chip-dot pulse-dot" />Pilot intake</span>
        <h1 className="mt-8 text-5xl font-semibold tracking-tight leading-[1.05]">
          See NashOS run on <span className="text-gradient-gold">your numbers.</span>
        </h1>
        <p className="mt-6 text-muted-foreground">
          Tell us about your finance stack. We'll line up a pilot in days.
        </p>

        <form onSubmit={(e) => e.preventDefault()} className="surface-card mt-10 p-8 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Full name" placeholder="Jane Doe" />
            <Field label="Work email" type="email" placeholder="jane@company.com" />
            <Field label="Company" placeholder="Acme Inc." />
            <Field label="Entities" placeholder="e.g. 3" />
          </div>
          <label className="block">
            <span className="text-xs tracking-wider uppercase text-muted-foreground">What would you like Nash to model first?</span>
            <textarea
              rows={4}
              placeholder="Cash forecast, headcount plan, consolidation…"
              className="mt-2 w-full rounded-lg border border-border bg-background/60 px-4 py-3 text-sm text-foreground outline-none focus:border-gold/60 focus:ring-2 focus:ring-gold/30 transition"
            />
          </label>
          <div className="flex items-center justify-between gap-3 pt-2">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">← Back home</Link>
            <button className="btn-gold rounded-full px-7 py-3 text-sm font-semibold" type="submit">
              Request pilot →
            </button>
          </div>
        </form>
      </section>
      <SiteFooter />
    </main>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-xs tracking-wider uppercase text-muted-foreground">{label}</span>
      <input
        {...rest}
        className="mt-2 w-full rounded-lg border border-border bg-background/60 px-4 py-3 text-sm text-foreground outline-none focus:border-gold/60 focus:ring-2 focus:ring-gold/30 transition"
      />
    </label>
  );
}
