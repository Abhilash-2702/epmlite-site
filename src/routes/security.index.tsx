import type { ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { PageHero, Section } from "@/components/page-sections";
import { seo, type Crumb } from "@/lib/seo";

const CRUMBS: Crumb[] = [{ name: "Security", path: "/security" }];

// The date the controls below were last checked against production.
const SECURITY_CHECKED = "24 October 2026";

export const Route = createFileRoute("/security/")({
  head: () =>
    seo({
      title: "Security Controls and Vulnerability Disclosure | NashOS",
      description:
        "Security controls running in NashOS as deployed at app.nashos.ai: sign-in, sessions, access control, audit trail, AI safeguards, and how to report a vulnerability.",
      path: "/security",
      breadcrumbs: CRUMBS,
      webPage: true,
    }),
  component: SecurityPage,
});

// RULES FOR THIS PAGE (it is what a customer's security reviewer reads first):
//
// - Only controls that are LIVE on app.nashos.ai go here, each stated so a
//   reviewer can check it. Source of truth: the control-by-control status table in
//   the product repository's docs/security/ (rows shipped and verified on production).
// - A control that is built but switched off in production stays off
//   this page until it is live and verified there. Nothing planned, partial or
//   promised goes here either.
// - Name no certification, audit report or compliance framework.
// - The disclosure section must match /.well-known/security.txt on nashos.ai,
//   app.nashos.ai and wizard.nashos.ai (all three point their Policy field here).
//   Acknowledgement times, safe-harbour wording and any reward programme are owner
//   and counsel decisions: do not add them until they are made.
// - Audit-trail wording must match public/llms-full.txt §7 and every other page.

const SECTIONS = [
  { id: "isolation", label: "Isolation and hosting" },
  { id: "transport", label: "Transport and browser security" },
  { id: "sign-in", label: "Sign-in and sessions" },
  { id: "access", label: "Access control" },
  { id: "nash", label: "Nash, the AI assistant" },
  { id: "audit", label: "Audit trail" },
  { id: "logging", label: "Logging" },
  { id: "connectors", label: "Connectors" },
  { id: "deletion", label: "User deletion" },
  { id: "development", label: "How we build and ship" },
  { id: "on-request", label: "On request" },
  { id: "disclosure", label: "Reporting a vulnerability" },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

function Block({ id, children }: { id: SectionId; children: ReactNode }) {
  const label = SECTIONS.find((s) => s.id === id)?.label;
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="text-xl font-semibold text-foreground mb-3">{label}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function Facts({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-3">
      {items.map((it, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-2.5 h-1.5 w-1.5 rounded-full shrink-0 bg-gold" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function Code({ children }: { children: ReactNode }) {
  return <code className="text-foreground font-mono text-[0.9em]">{children}</code>;
}

function Mail({ to }: { to: string }) {
  return (
    <a href={`mailto:${to}`} className="text-gold hover:underline">
      {to}
    </a>
  );
}

function SubprocessorsLink({ children }: { children: ReactNode }) {
  return (
    <Link to="/security/subprocessors" className="text-gold hover:underline">
      {children}
    </Link>
  );
}

function SecurityPage() {
  return (
    <PageShell crumbs={CRUMBS}>
      <PageHero
        tight
        eyebrow="Security"
        title="Security"
        highlight="at NashOS."
        lede="The security controls running in the NashOS application today, each written so your security team can check it, and how to report a vulnerability to us."
      />

      <Section className="max-w-3xl mx-0">
        <div className="surface-card p-5 text-sm text-muted-foreground leading-relaxed">
          <strong className="text-foreground">What this page covers.</strong> The NashOS application
          as it runs at app.nashos.ai, last checked on {SECURITY_CHECKED}. It does not cover the
          onboarding wizard at wizard.nashos.ai. Customer environments are deployed from the same
          codebase on their own release schedule; ask us which release yours runs. Security
          questions:{" "}
          <Mail to="security@nashos.ai" />.
        </div>

        <nav aria-label="On this page" className="mt-8">
          <p className="text-xs uppercase tracking-[0.2em] text-gold mb-3 font-semibold">
            On this page
          </p>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-muted-foreground hover:text-foreground">
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <SubprocessorsLink>Sub-processors</SubprocessorsLink>
            </li>
          </ul>
        </nav>

        <div className="mt-10 space-y-10 text-muted-foreground leading-relaxed">
          <Block id="isolation">
            <Facts
              items={[
                <>
                  Today every customer runs on a dedicated environment: its own database, its own
                  backend service and its own web frontend.
                </>,
                <>
                  Data uploaded through the onboarding wizard is held in the wizard's own database:
                  the loaded figures in a schema for that customer, from which the customer's
                  environment is set up, and the parsed upload with the customer's onboarding
                  session. Both are deleted when the customer is off-boarded (see On request,
                  below).
                </>,
                <>
                  The backends and databases run on Railway, and the web frontends on Vercel. Every
                  third party that processes customer data is listed on our{" "}
                  <SubprocessorsLink>sub-processors page</SubprocessorsLink>.
                </>,
              ]}
            />
          </Block>

          <Block id="transport">
            <Facts
              items={[
                <>
                  app.nashos.ai is served over HTTPS only. A plain-HTTP request is redirected (308),
                  and responses carry <Code>Strict-Transport-Security</Code> with a two-year
                  max-age, <Code>includeSubDomains</Code> and <Code>preload</Code>.
                </>,
                <>The web frontend forwards API calls to the backend over HTTPS.</>,
                <>
                  The <Code>Content-Security-Policy</Code> allows scripts only from the
                  application's own origin, blocks plugins and stops other sites from framing the
                  application. It is sent with <Code>X-Frame-Options: DENY</Code>,{" "}
                  <Code>X-Content-Type-Options: nosniff</Code>,{" "}
                  <Code>Referrer-Policy: strict-origin-when-cross-origin</Code>,{" "}
                  <Code>Cross-Origin-Opener-Policy: same-origin</Code> and a{" "}
                  <Code>Permissions-Policy</Code> that turns off camera, microphone, geolocation,
                  payment and USB access.
                </>,
                <>
                  The API adds its own security headers and returns an <Code>X-Request-Id</Code>{" "}
                  that identifies the request in our logs.
                </>,
                <>
                  To check the headers yourself: <Code>curl -I https://app.nashos.ai/</Code>
                </>,
              ]}
            />
          </Block>

          <Block id="sign-in">
            <Facts
              items={[
                <>Sign-in is local: each user signs in with a username and password.</>,
                <>
                  Passwords are stored as bcrypt hashes. A new or changed password must be 12 to 200
                  characters long and may not contain the username or email address.
                </>,
                <>
                  A password a person chooses — when an account is created, when an administrator
                  resets it, or when a user changes their own — is checked against Have I Been
                  Pwned's list of breached passwords whenever the service responds, through its range
                  API, which receives only the first five characters of the password's SHA-1 hash.
                  Invited users receive a randomly generated one-time password.
                </>,
                <>
                  Five failed sign-ins within 15 minutes lock the account for 30 minutes. The lock
                  is kept in the database, and each attempt reserves its place before the password
                  is checked, so attempts sent at the same time count toward the same limit of five.
                </>,
                <>
                  Signing in with a username that does not exist costs the same password-hash
                  comparison as one that does, so response times do not reveal which accounts exist.
                </>,
                <>
                  An access token lasts 15 minutes. The session behind it ends after 30 minutes
                  without activity or 24 hours after sign-in, whichever comes first; with "Keep me
                  signed in" it lasts up to 7 days. The refresh token is held in an httpOnly cookie
                  and replaced on every use.
                </>,
                <>
                  The app warns before an idle sign-out and signs out every open tab together.
                  Changing your own password ends every other session of your account, and the
                  session you changed it in continues with new tokens. A super administrator
                  resetting a password, or an administrator changing a role or disabling or deleting
                  an account, ends every session that account has.
                </>,
              ]}
            />
          </Block>

          <Block id="access">
            <Facts
              items={[
                <>
                  Every API route requires a signed-in session except the two health checks, public
                  configuration, the sign-in steps (password, second factor and authenticator
                  enrolment), session refresh and the connector sign-in callback.
                </>,
                <>
                  Five roles are built in: viewer, analyst, planner, admin and super_admin. The
                  first four can be assigned in the app; super_admin cannot be granted through the
                  application or its API. Custom roles can be defined from the permission grid by a
                  super administrator: by default super_admin is the only role allowed to manage
                  roles, and the built-in admin role is not. Administrators can assign roles and add
                  groups on top.
                </>,
                <>
                  A dimension scope on entity, department or product limits which figures a user
                  sees in reports, dashboards, forecasts, what-ifs, the data API and Nash, and which
                  figures they can enter or change. The server checks the write scope on data entry,
                  the planning grid, bulk import, the Excel add-in, plan actions, allocations,
                  what-ifs, version restores, audit reverts, data clears and Nash draft cards;
                  connector loads and close runs run under their own integration and agent
                  permissions.
                </>,
                <>
                  Loads made by a close run or a connector run are written by the load pipeline and
                  governed by its load controls: close-run loads go through the hold policy and
                  administrator approval described below, and setting up, scheduling or running a
                  connector directly needs administrator rights. Starting a close run needs both
                  the run-agents and the write-data permissions, which planners and administrators
                  hold by default and analysts and viewers do not. A close run collects from the
                  connectors it names, or from the file it is started with, registering an inbound
                  connector for each sheet it loads.
                </>,
                <>
                  A close run, including one a schedule starts, lands its load in a holding version
                  and compares it with the figures already stored. Under the default hold policy, a
                  load is held when it would move a figure by 1 million or more and, in addition,
                  either leave that figure at three times or more (or a third or less) of its stored
                  value or recent average, or flip its sign; only a move of 1 million or more can
                  trigger a hold. A load that replaces a slice is held the same way when it would
                  clear a stored figure of 1 million or more. A held load waits until an
                  administrator approves it, and the stored figures do not change until then. The 1
                  million applies in the currency each figure is held in. Administrators can change
                  these thresholds or turn the hold off.
                </>,
                <>
                  Planning cycles carry tasks that move through submit, review and approval, and a
                  cycle can be locked; approving a task or locking a cycle freezes its scope.
                </>,
                <>
                  Administrators can run a user access review in the app. It snapshots every user's
                  role, groups, permissions and scopes, flags dormant and privileged accounts,
                  records a keep, change or revoke decision for each user, and exports the
                  signed-off review as CSV.
                </>,
                <>
                  Signed-in API traffic is rate-limited per user (3,000 requests per 15 minutes),
                  and oversized anonymous request bodies are refused before they are processed.
                </>,
              ]}
            />
          </Block>

          <Block id="nash">
            <Facts
              items={[
                <>
                  Nash works with the permissions of the user who asks. Its tools go through the
                  same server-side permission checks as the app and run on the server under that
                  user's session, and the model is never given a session token. Credentials are
                  not taken through Nash: the one-time password for a new or reset user is
                  generated by the server when the administrator confirms the card and shown
                  once; a connector's credentials are typed into the card's own form and posted
                  to the server, never to the model; and everything the model reads — tool
                  results, the conversation, the saved transcript and Nash's memory — is masked
                  for credential-shaped values: card fields, known token formats and URL
                  credentials. Nash asks for credentials only through a card.
                </>,
                <>
                  Nash does not change data by itself. Every change it proposes is shown as a draft
                  card, beside Nash's reply summarising what it proposes and, for a multi-step
                  request, its plan. Most cards that change stored figures or settings show the
                  value before and the value after, as the consolidation set-up card does for each
                  row; the forecast-save card shows the forecast it will write; a connector card
                  that runs connectors names them; the what-if save card shows the adjustments and
                  an estimate of how many rows the new scenario will hold, and the what-if delete
                  card the scenario and how many rows it removes; and the load-approval card shows
                  up to five flagged figures with their stored and loaded values and the statement
                  totals before and after. Nothing is written until the user confirms it, and the
                  server re-validates the confirmed change under that user's own permissions.
                </>,
                <>
                  What Nash sends to the language-model provider, and when web search is used, is
                  set out on the <SubprocessorsLink>sub-processors page</SubprocessorsLink>.
                </>,
              ]}
            />
          </Block>

          <Block id="audit">
            <Facts
              items={[
                <>
                  A figure changed from a Nash draft card is recorded in the audit log with the
                  table, the record, the action, the value before, the value after, the user and the
                  time. So are single-record edits to formulas, users, roles, exchange rates and the
                  members of the built-in dimensions. Some Nash cards are recorded differently: a
                  forecast saved from the forecast-save card is recorded like a grid save, below;
                  figures loaded by a connector run started from a connector card are recorded as a
                  connector run; saving or deleting a what-if scenario records the scenario and how
                  many rows it holds; and approving or rejecting a held load from the load-approval
                  card records one approval or rejection for the run, and the figures it commits are
                  recorded with the close run.
                </>,
                <>
                  Figures saved from the app's grids (Data Entry, Drivers, forms and the Plan
                  Actions grids), forecasts saved from Nash, and bulk loads are recorded per save in
                  a separate run log: who saved them, when, the operation, how many rows were
                  inserted or updated, and each row the save turned away on a scope, member or
                  currency check, with the reason (the first 100 per save, with a count of any
                  more). When the person saving adds a note, the audit log also records the save
                  with its row count and the note.
                </>,
                <>
                  In Plan Actions (the Driver Forecasting page in the app), two operations are also
                  recorded in the audit log, alongside the run log: a distribution across periods,
                  with its dimension, total, number of members, point of view and note, and a copy,
                  with its source and target, factor and number of source rows. A distribution
                  across any other dimension, a save from the two-dimensional grid, and a
                  machine-learning or driver forecast saved there all go through the grid save
                  above: they are recorded in the run log, and in the audit log when the person
                  saving adds a note.
                </>,
                <>
                  Connector loads and close runs are recorded as runs, and approving or rejecting a
                  held close-run load is recorded in the audit log.
                </>,
                <>
                  Dated ownership steps and period exchange rates are recorded with the new value,
                  the user and the time, whether they are made in the app or from Nash's
                  consolidation set-up card. Edits to the members of custom dimensions are recorded
                  the same way.
                </>,
                <>
                  Sign-ins, sign-outs, account lockouts, password changes and exports are recorded
                  as well. Secrets are removed from a record before it is written.
                </>,
                <>
                  The audit log is append-only. Database triggers refuse any update, deletion or
                  truncation of it unless a transaction explicitly switches on maintenance mode,
                  which the application's maintenance scripts use. The triggers are re-installed
                  each time the backend starts.
                </>,
                <>
                  No retention rule removes audit records. Administrators can filter the log in the
                  app and export it as CSV.
                </>,
              ]}
            />
          </Block>

          <Block id="logging">
            <Facts
              items={[
                <>
                  Every API request is logged as a structured JSON line that carries its request ID,
                  which is also returned in the <Code>X-Request-Id</Code> header. Passwords, tokens,
                  secrets and API keys are censored in these logs, and <Code>Authorization</Code>,{" "}
                  <Code>Cookie</Code> and <Code>Set-Cookie</Code> headers are never logged.
                </>,
              ]}
            />
          </Block>

          <Block id="connectors">
            <Facts
              items={[
                <>
                  Before a connector connects to a host named in its settings, the host name is
                  resolved and refused if it points at a loopback, private, link-local (including
                  cloud metadata) or otherwise reserved address. An on-premises system has to be
                  explicitly allow-listed for its environment.
                </>,
                <>
                  HTTP connectors do not follow redirects, and HTTP responses and SFTP files are
                  size-capped.
                </>,
                <>
                  Stored credentials are never sent to a changed endpoint: pointing a connector at a
                  new URL or host requires entering its credentials again.
                </>,
              ]}
            />
          </Block>

          <Block id="deletion">
            <Facts
              items={[
                <>
                  Deleting a user also deletes their Nash conversations and saved Nash memory, and
                  ends their sessions. Audit records they made are kept, attributed to their
                  username.
                </>,
              ]}
            />
          </Block>

          <Block id="development">
            <Facts
              items={[
                <>
                  The application's main branch is protected, for administrators too: changes merge
                  only through a pull request and only after a required check gate passes. The gate
                  runs secret scanning (gitleaks), static analysis (Semgrep) and a dependency audit
                  of every shipped app at the high-severity threshold.
                </>,
                <>Dependabot vulnerability alerts and security updates are switched on.</>,
              ]}
            />
          </Block>

          <Block id="on-request">
            <Facts
              items={[
                <>
                  Security reviews: send your questionnaire to <Mail to="security@nashos.ai" /> and
                  we will answer it directly.
                </>,
                <>
                  Data export: we can export your environment's data as JSON Lines files, with a
                  manifest of row counts, sizes and SHA-256 checksums. Sign-in secrets are left
                  out, and connector credentials are redacted.
                </>,
                <>
                  Deletion: at the end of your contract we can delete your environment, meaning its
                  database, backend service and frontend, and the onboarding data held for you in
                  the wizard's database.
                </>,
              ]}
            />
          </Block>

          <Block id="disclosure">
            <p>
              If you believe you have found a security vulnerability in NashOS, email{" "}
              <Mail to="security@nashos.ai" />. Include what you found, the steps to reproduce it
              and the affected URL or endpoint.
            </p>
            <Facts
              items={[
                <>Use only accounts you own or have permission to use.</>,
                <>Do not access, change or delete other people's data.</>,
                <>
                  Do not degrade the service: no denial-of-service testing, spam or social
                  engineering.
                </>,
                <>Give us reasonable time to fix the issue before you disclose it publicly.</>,
              ]}
            />
            <p>
              The same contact is published in machine-readable form at{" "}
              <a href="/.well-known/security.txt" className="text-gold hover:underline">
                nashos.ai/.well-known/security.txt
              </a>{" "}
              and at app.nashos.ai/.well-known/security.txt.
            </p>
          </Block>

          <section id="subprocessors" className="scroll-mt-28">
            <h2 className="text-xl font-semibold text-foreground mb-3">Sub-processors</h2>
            <p>
              The third parties that process customer data, what each one does and the data it
              receives are listed on our <SubprocessorsLink>sub-processors page</SubprocessorsLink>.
            </p>
          </section>

          <section className="surface-card p-5 text-sm">
            <p>
              Security questions and vulnerability reports: <Mail to="security@nashos.ai" />.
              Everything else: <Mail to="admin@nashos.ai" />.
            </p>
          </section>
        </div>
      </Section>
    </PageShell>
  );
}
