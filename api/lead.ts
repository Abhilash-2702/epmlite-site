// Lead capture endpoint for the /try and /sign-in forms.
//
// Before this existed, both forms had `onSubmit={(e) => e.preventDefault()}`
// and nothing else — no fetch, no action, no input names. Every submission was
// silently discarded, and /sign-in showed the user a success message anyway.
//
// The rule this file exists to enforce: NEVER return a success status unless
// the lead was actually delivered. A visible error the user can act on (write
// to admin@nashos.ai) beats a green tick that lost their details.
//
// Env vars (Vercel → Project → Settings → Environment Variables):
//   RESEND_API_KEY   required — https://resend.com/api-keys
//   LEAD_FROM_EMAIL  required — a sender on a domain verified in Resend
//   LEAD_TO_EMAIL    optional — defaults to admin@nashos.ai
//
// The /api/ prefix is excluded from the SSR rewrite in vercel.json, so this
// deploys as its own function rather than being swallowed by the app handler.

type LeadSource = "try" | "sign-in" | "contact";

type LeadPayload = {
  source: LeadSource;
  name?: string;
  email: string;
  company?: string;
  entities?: string;
  message?: string;
  /** Honeypot — real users never fill a hidden field. Named to avoid autofill. */
  nash_hp?: string;
};

// Minimal structural types for the Vercel Node request/response. Declared here
// rather than pulling in @vercel/node, which isn't a dependency of this project.
type LeadRequest = {
  method?: string;
  body?: unknown;
};

type LeadResponse = {
  status: (code: number) => LeadResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
};

const FIELD_LABELS: Record<string, string> = {
  name: "Name",
  email: "Email",
  company: "Company",
  entities: "Entities",
  message: "Message",
};

function isEmail(value: unknown): value is string {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** Collapse newlines and cap length so untrusted input can't shape a mail header. */
function headerSafe(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim().slice(0, 120);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export default async function handler(req: LeadRequest, res: LeadResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  let body: LeadPayload;
  try {
    body = (typeof req.body === "string" ? JSON.parse(req.body) : req.body) as LeadPayload;
  } catch {
    return res.status(400).json({ ok: false, error: "Malformed request body" });
  }

  if (!body || typeof body !== "object") {
    return res.status(400).json({ ok: false, error: "Missing request body" });
  }

  // Honeypot: the response must look like success so bots don't learn they were
  // caught, but log it — a browser autofill that populates the trap field would
  // otherwise lose a real lead with no record, which is the exact failure this
  // endpoint exists to prevent. The field is named to miss autofill heuristics
  // (never "website"/"url"/"company-url", which password managers do fill).
  if (body.nash_hp) {
    console.warn("[lead] Honeypot triggered — submission dropped.", {
      source: body.source,
      email: body.email,
    });
    return res.status(200).json({ ok: true });
  }

  if (!isEmail(body.email)) {
    return res.status(400).json({ ok: false, error: "A valid work email is required." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_FROM_EMAIL;
  const to = process.env.LEAD_TO_EMAIL || "admin@nashos.ai";

  // Loud failure. If the mailer is not configured we must NOT tell the browser
  // everything is fine — that is exactly the bug this endpoint replaces.
  if (!apiKey || !from) {
    console.error(
      "[lead] Dropping submission: RESEND_API_KEY and/or LEAD_FROM_EMAIL are not set.",
      { source: body.source, email: body.email }
    );
    return res.status(503).json({
      ok: false,
      error: "Our form isn't accepting submissions right now. Please email admin@nashos.ai.",
    });
  }

  const rows = (["name", "email", "company", "entities", "message"] as const)
    .filter((k) => typeof body[k] === "string" && (body[k] as string).trim())
    .map((k) => `<tr><td><strong>${FIELD_LABELS[k]}</strong></td><td>${escapeHtml(String(body[k]).trim())}</td></tr>`)
    .join("");

  const source = body.source || "unknown";

  try {
    const resend = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: body.email,
        // Header-safe: strip CR/LF and cap length. These are attacker-controlled
        // and go into a mail header, so never interpolate them raw.
        subject: headerSafe(`NashOS lead — ${source}${body.company ? ` — ${body.company}` : ""}`),
        html: `<h2>New lead from the ${escapeHtml(source)} form</h2><table>${rows}</table>`,
      }),
    });

    if (!resend.ok) {
      const detail = await resend.text();
      console.error("[lead] Resend rejected the send:", resend.status, detail);
      return res.status(502).json({
        ok: false,
        error: "We couldn't send that just now. Please email admin@nashos.ai.",
      });
    }
  } catch (err) {
    console.error("[lead] Network error contacting Resend:", err);
    return res.status(502).json({
      ok: false,
      error: "We couldn't send that just now. Please email admin@nashos.ai.",
    });
  }

  return res.status(200).json({ ok: true });
}
