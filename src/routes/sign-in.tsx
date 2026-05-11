import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/sign-in")({
  head: () => ({ meta: [{ title: "Sign in — NashOS" }] }),
  component: SignIn,
});

// Sign-in is a stub: NashOS doesn't yet expose self-serve auth on the marketing
// site. The form swaps to a "We'll be in touch" panel on submit. Wire to the
// real Express backend when SSO / accounts ship.
function SignIn() {
  const [submitted, setSubmitted] = useState(false);

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
              <form
                className="mt-6 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
              >
                <Field label="Work email" type="email" placeholder="you@company.com" required />
                <button
                  className="btn-gold w-full rounded-full px-6 py-3 text-sm font-semibold"
                  type="submit"
                >
                  Request access
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
