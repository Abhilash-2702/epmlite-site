// Client helper for the lead forms. Wraps POST /api/lead so /try, /sign-in
// and any future form share one submission path and one error contract.
//
// Deliberately strict: anything other than a 200 with { ok: true } is treated
// as a failure and surfaced to the user. The previous forms reported success
// unconditionally and lost every lead.

export type LeadSource = "try" | "sign-in" | "contact";

export type LeadFields = {
  source: LeadSource;
  email: string;
  name?: string;
  company?: string;
  entities?: string;
  message?: string;
  nash_hp?: string;
};

export type LeadResult = { ok: true } | { ok: false; error: string };

const FALLBACK_ERROR =
  "Something went wrong sending that. Please email admin@nashos.ai and we'll pick it up.";

export async function submitLead(fields: LeadFields): Promise<LeadResult> {
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields),
    });

    let payload: { ok?: boolean; error?: string } = {};
    try {
      payload = await res.json();
    } catch {
      // Non-JSON response (proxy error page, HTML 500) — treat as failure.
    }

    if (res.ok && payload.ok) return { ok: true };
    return { ok: false, error: payload.error || FALLBACK_ERROR };
  } catch {
    return { ok: false, error: FALLBACK_ERROR };
  }
}
