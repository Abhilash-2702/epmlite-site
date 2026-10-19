import type { ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { PageHero, Section } from "@/components/page-sections";
import { seo, type Crumb } from "@/lib/seo";

const CRUMBS: Crumb[] = [
  { name: "Security", path: "/security" },
  { name: "Sub-processors", path: "/security/subprocessors" },
];

// Change this date, and public/sitemap.xml's <lastmod> for this URL, whenever
// a row below changes.
const LAST_UPDATED = "24 October 2026";

export const Route = createFileRoute("/security/subprocessors")({
  head: () =>
    seo({
      title: "Sub-processors | NashOS Security",
      description:
        `The third parties that process customer data for the NashOS application: what each one does, the data it receives, and which are opt-in. Updated ${LAST_UPDATED}.`,
      path: "/security/subprocessors",
      breadcrumbs: CRUMBS,
      webPage: true,
    }),
  component: SubprocessorsPage,
});

// RULES FOR THIS LIST
//
// - Source of truth: the vendor inventory and the per-vendor files under
//   docs/security/ in the product repository. A vendor appears here only once
//   it receives customer data in production, and is added on the day that starts.
// - State only what the vendor files record. Data locations are given on request.
// - Do not name customer-elected connectors (QuickBooks, Stripe, SAP and so on):
//   they are the customer's own data sources, not sub-processors, and the
//   connector story elsewhere on the site (llms.txt, /roadmap) must not be
//   contradicted.

type Row = {
  name: string;
  purpose: ReactNode;
  data: ReactNode;
  when: ReactNode;
  optIn?: boolean;
};

const ROWS: Row[] = [
  {
    name: "Railway",
    purpose:
      "Hosts the backend API and the database of each customer environment (a separate project per environment), and the onboarding wizard's backend and database.",
    data: "All customer data at rest, and each environment's configuration secrets.",
    when: "Always",
  },
  {
    name: "Vercel",
    purpose:
      "Hosts the web frontends (the application, the onboarding wizard and this website) and forwards the application's API traffic to the backend.",
    data: "Customer data in transit between the browser and the backend.",
    when: "Always",
  },
  {
    name: "Anthropic",
    purpose:
      "Provides the language model behind Nash, the in-app AI assistant, behind the summaries written for close runs, and behind the onboarding wizard's assistant and mapping suggestions.",
    data: (
      <>
        <p>
          From Nash: the user's messages and the conversation so far; the user's first and last
          name, username and role, and the Nash preferences they have saved; today's date and which
          years and months hold actual figures; and the results of the tools Nash calls, which carry
          the customer data it reads to answer (only what the asking user may see) and the draft
          cards it prepares, including the one-time password on a card that creates a user. Where
          conversation summaries are switched on for an environment, the older messages of a long
          saved conversation, with the summary so far, are sent to be summarised.
        </p>
        <p className="mt-2">
          From close runs, including scheduled ones that no user starts: when a run that carries the
          full close completes (every run a user starts, and a scheduled run set to run the full
          close), each step's result (row counts, totals, the largest variances and anomalies with
          their account names, any flagged figures with their account and entity, and the source's
          name); when any run is held, a scheduled sync included, the source's name, the hold
          policy, up to five flagged figures with their stored and loaded values, the statement
          totals before and after the load and the lines that moved most.
        </p>
        <p className="mt-2">
          From the onboarding wizard: the sheet name, header and up to four sample values of each
          column it cannot match; account codes, names, types and groups, and dimension member codes
          and names, while an upload is mapped; and, in wizard chat, each question with the
          workspace's name, industry, fiscal-year end and currency, its numbers of entities and
          accounts, its revenue, gross profit, EBITDA and net income for the latest year of actuals,
          and its most recent actuals month.
        </p>
      </>
    ),
    when: "Whenever Nash or a close run is used, and when the wizard maps an upload or its assistant is used",
  },
  {
    name: "Resend",
    purpose:
      "Delivers the email the application and the onboarding wizard send, for example task assignments, review and approval notices, and close-run updates.",
    data: "Recipients' email addresses and the content of each message.",
    when: "Always",
  },
  {
    name: "GitHub",
    purpose: "Runs the automated jobs that provision a new customer environment.",
    data: "When these jobs copy a customer's onboarding data into a new environment's database, that data, including user accounts, passes through a GitHub-hosted runner on the way, together with the provisioning request (customer name, subdomain and owner email address).",
    when: "When an environment is provisioned",
  },
  {
    name: "Tavily",
    purpose: "Web search for Nash.",
    data: "The search queries Nash writes, which can include parts of a user's question.",
    when: (
      <>
        Opt-in. On for app.nashos.ai, NashOS's own workspace; on a customer environment only where
        the customer has opted in.
      </>
    ),
    optIn: true,
  },
];

const NOT_SUBPROCESSORS: { name: string; body: string }[] = [
  {
    name: "Google Workspace",
    body: "Our company email, including messages you send to us. The application sends it no customer data.",
  },
  {
    name: "Have I Been Pwned",
    body: "Checks a new password against known breaches. It receives only the first five characters of the password's SHA-1 hash, with no account details.",
  },
  {
    name: "Google Fonts",
    body: "The application's web frontend loads some of its fonts from Google Fonts, which receives the viewer's IP address and browser details but no customer data.",
  },
  {
    name: "The systems you connect",
    body: "Your ERP, accounting, payment or file-transfer systems are your own data sources, under your own agreements with their providers.",
  },
];

function Mail({ to }: { to: string }) {
  return (
    <a href={`mailto:${to}`} className="text-gold hover:underline">
      {to}
    </a>
  );
}

function SubprocessorsPage() {
  return (
    <PageShell crumbs={CRUMBS}>
      <PageHero
        tight
        eyebrow="Security"
        title="Sub-processors"
        lede="The third parties that process customer data for the NashOS application, what each one does, and the data it receives."
      />

      <Section>
        <p className="text-sm text-muted-foreground">
          Last updated: <span className="text-foreground">{LAST_UPDATED}</span>
        </p>

        {/* Table on wide screens; the same rows as cards on phones. */}
        <div className="mt-6 hidden md:block surface-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-[0.14em] text-muted-foreground">
                <th className="text-left font-semibold px-5 py-4 w-[14%]">Sub-processor</th>
                <th className="text-left font-semibold px-5 py-4 w-[28%]">
                  What it does for NashOS
                </th>
                <th className="text-left font-semibold px-5 py-4 w-[34%]">
                  Customer data it receives
                </th>
                <th className="text-left font-semibold px-5 py-4 w-[24%]">When</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 align-top">
              {ROWS.map((r) => (
                <tr key={r.name}>
                  <td className="px-5 py-4 font-semibold text-foreground">
                    {r.name}
                    {r.optIn && (
                      <>
                        {" "}
                        <OptInBadge />
                      </>
                    )}
                  </td>
                  <td className="px-5 py-4 text-foreground/85 leading-relaxed">{r.purpose}</td>
                  <td className="px-5 py-4 text-foreground/85 leading-relaxed">{r.data}</td>
                  <td className="px-5 py-4 text-foreground/85 leading-relaxed">{r.when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 grid gap-4 md:hidden">
          {ROWS.map((r) => (
            <div key={r.name} className="surface-card p-5 text-sm leading-relaxed">
              <h2 className="font-semibold text-foreground text-base">
                {r.name}
                {r.optIn && (
                  <>
                    {" "}
                    <OptInBadge />
                  </>
                )}
              </h2>
              <dl className="mt-3 space-y-3 text-foreground/85">
                <div>
                  <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    What it does
                  </dt>
                  <dd className="mt-1">{r.purpose}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    Customer data it receives
                  </dt>
                  <dd className="mt-1">{r.data}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    When
                  </dt>
                  <dd className="mt-1">{r.when}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>

        <div className="mt-12 max-w-3xl space-y-10 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Data locations</h2>
            <p>
              Where each sub-processor stores or processes data is available on request: email{" "}
              <Mail to="security@nashos.ai" />.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Services that are not sub-processors
            </h2>
            <ul className="space-y-3">
              {NOT_SUBPROCESSORS.map((n) => (
                <li key={n.name} className="flex items-start gap-3">
                  <span className="mt-2.5 h-1.5 w-1.5 rounded-full shrink-0 bg-gold" />
                  <span>
                    <strong className="text-foreground">{n.name}.</strong> {n.body}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">What this list covers</h2>
            <p>
              This list covers the NashOS application and the data customers put into it. It does
              not cover this marketing website; for that, see our{" "}
              <Link to="/privacy" className="text-gold hover:underline">
                privacy policy
              </Link>
              . How the application itself is secured is on our{" "}
              <Link to="/security" className="text-gold hover:underline">
                security page
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Changes to this list</h2>
            <p>
              We update this page when the list changes, and the date at the top shows the latest
              change. For questions about this list, or about being told of changes in advance,
              email <Mail to="security@nashos.ai" />.
            </p>
          </section>
        </div>
      </Section>
    </PageShell>
  );
}

function OptInBadge() {
  return (
    <span className="ml-2 inline-block align-middle rounded-full border border-gold/40 bg-gold/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-gold">
      Opt-in
    </span>
  );
}
