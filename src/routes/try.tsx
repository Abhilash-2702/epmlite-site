import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { submitLead } from "@/lib/lead";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/try")({
  head: () =>
    seo({
      title: "Try NashOS on Your Own Finance Data | Pilot Intake",
      description:
        "Run a NashOS pilot on your own numbers. Tell us about your finance stack and we'll line up a walkthrough on your data within one business day.",
      path: "/try",
    }),
  component: Try,
});

// This form is the destination of the primary CTA in the header on every page.
// It used to submit to nothing — `onSubmit={(e) => e.preventDefault()}` with no
// field names — so every pilot request was discarded. It now posts to /api/lead
// and shows a real error if delivery fails.
function Try() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSending(true);

    const data = new FormData(e.currentTarget);
    const result = await submitLead({
      source: "try",
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      company: String(data.get("company") || ""),
      entities: String(data.get("entities") || ""),
      message: String(data.get("message") || ""),
      nash_hp: String(data.get("nash_hp") || ""),
    });

    setSending(false);
    if (result.ok) setSent(true);
    else setError(result.error);
  }

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

        {sent ? (
          <div className="surface-card mt-10 p-8">
            <h2 className="text-2xl font-semibold">Got it — that's with us.</h2>
            <p className="mt-3 text-muted-foreground">
              We'll come back within one business day to line up a walkthrough on your data. If
              it's urgent, write straight to{" "}
              <a href="mailto:admin@nashos.ai" className="text-gold hover:underline">
                admin@nashos.ai
              </a>
              .
            </p>
            <Link
              to="/"
              className="mt-6 inline-block text-sm text-muted-foreground hover:text-foreground"
            >
              ← Back home
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="surface-card mt-10 p-8 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name" name="name" placeholder="Jane Doe" required />
              <Field
                label="Work email"
                name="email"
                type="email"
                placeholder="jane@company.com"
                required
              />
              <Field label="Company" name="company" placeholder="Acme Inc." />
              <Field label="Entities" name="entities" placeholder="e.g. 3" />
            </div>
            <label className="block">
              <span className="text-xs tracking-wider uppercase text-muted-foreground">What would you like Nash to model first?</span>
              <textarea
                name="message"
                rows={4}
                placeholder="Cash forecast, headcount plan, consolidation…"
                className="mt-2 w-full rounded-lg border border-border bg-background/60 px-4 py-3 text-sm text-foreground outline-none focus:border-gold/60 focus:ring-2 focus:ring-gold/30 transition"
              />
            </label>
            {/* Honeypot — hidden from users, filled by bots. */}
            <input
              type="text"
              name="nash_hp"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="hidden"
            />
            {error && (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}
            <div className="flex items-center justify-between gap-3 pt-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">← Back home</Link>
              <button
                className="btn-gold rounded-full px-7 py-3 text-sm font-semibold disabled:opacity-60"
                type="submit"
                disabled={sending}
              >
                {sending ? "Sending…" : "Request pilot →"}
              </button>
            </div>
          </form>
        )}
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
