import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { submitLead } from "@/lib/lead";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/sign-in")({
  head: () =>
    seo({
      title: "Sign in to NashOS",
      description:
        "Self-serve sign-in isn't open yet. Request access and we'll set your workspace up — usually within one business day.",
      path: "/sign-in",
      // Access-request stub, not a page we want ranking for its own terms.
      noindex: true,
    }),
  component: SignIn,
});

// Sign-in is a stub: NashOS doesn't yet expose self-serve auth on the marketing
// site. Requests are emailed via /api/lead. It previously showed a success
// panel without sending anything, which lost every request.
function SignIn() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSending(true);

    const data = new FormData(e.currentTarget);
    const result = await submitLead({
      source: "sign-in",
      email: String(data.get("email") || ""),
      nash_hp: String(data.get("nash_hp") || ""),
    });

    setSending(false);
    if (result.ok) setSubmitted(true);
    else setError(result.error);
  }

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <SiteHeader />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0"
        style={{ background: "var(--gradient-radial-gold)", opacity: 0.5 }}
      />
      <section className="relative z-10 mx-auto flex min-h-screen max-w-md items-center px-6">
        <div className="surface-card w-full p-8">
          {!submitted ? (
            <>
              <h1 className="text-2xl font-semibold">Sign in to NashOS</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Self-serve sign-in isn't open yet. Drop your email and we'll set you up.
              </p>
              <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <Field
                  label="Work email"
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  required
                />
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
                <button
                  className="btn-gold w-full rounded-full px-6 py-3 text-sm font-semibold disabled:opacity-60"
                  type="submit"
                  disabled={sending}
                >
                  {sending ? "Sending…" : "Request access"}
                </button>
              </form>
              <p className="mt-6 text-center text-sm text-muted-foreground">
                New to Nash?{" "}
                <Link to="/try" className="text-gold hover:underline">
                  Try with your data
                </Link>
              </p>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-semibold">Got it.</h1>
              <p className="mt-3 text-sm text-muted-foreground">
                We'll be in touch shortly. In the meantime, you can{" "}
                <Link to="/try" className="text-gold hover:underline">
                  share your data
                </Link>{" "}
                to fast-track a pilot.
              </p>
            </>
          )}
        </div>
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
