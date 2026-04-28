export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// In-memory rate limit. Resets on each cold start; fine for an MVP.
// For higher volume, swap to Vercel KV or Upstash Redis.
const recent = new Map<string, number[]>();

const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < 60_000);
  if (hits.length >= 5) {
    return Response.json({ error: "rate limited" }, { status: 429 });
  }
  hits.push(now);
  recent.set(ip, hits);

  const body = await req.json().catch(() => ({} as Record<string, unknown>));
  const { email, website, referrer, utm_source, utm_medium, utm_campaign } = body as {
    email?: string;
    website?: string;
    referrer?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
  };

  // Honeypot — bots fill the hidden "website" field. Silently accept and drop.
  if (website) return Response.json({ ok: true });

  if (!email || !EMAIL_RX.test(email)) {
    return Response.json({ error: "invalid email" }, { status: 400 });
  }

  const meta = {
    email,
    referrer,
    utm_source,
    utm_medium,
    utm_campaign,
    ts: new Date().toISOString(),
    ip,
    ua: req.headers.get("user-agent"),
  };

  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;

  if (key && to) {
    // NOTE: `from` requires a verified sender domain in Resend.
    // Until epmlite.com is verified, swap to "onboarding@resend.dev" or any verified address.
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "leads@epmlite.com",
        to,
        subject: `New EPM Lite lead — ${email}`,
        text: JSON.stringify(meta, null, 2),
      }),
    });
    if (!r.ok) {
      const detail = await r.text().catch(() => "");
      console.error("[lead] resend failed", r.status, detail);
      // Still return ok — don't punish the visitor for our config glitch.
    }
  } else {
    console.log("[lead]", meta);
  }

  return Response.json({ ok: true });
}
