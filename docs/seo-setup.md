# SEO & analytics setup

Everything below is already wired in code. Each item is dormant until you set
its environment variable — nothing renders a placeholder tag or a broken ID.

Set all of these in **Vercel → your project → Settings → Environment Variables**,
tick **Production** (and Preview if you want them there too), then **redeploy** —
Vite inlines `VITE_*` vars at build time, so an existing deployment will not pick
them up.

| Variable | Used for | Required for |
|---|---|---|
| `VITE_GSC_TOKEN` | Search Console verification meta tag | Search Console |
| `VITE_GA4_ID` | GA4 gtag.js snippet | Analytics |
| `RESEND_API_KEY` | Sending lead emails | `/try` + `/sign-in` forms |
| `LEAD_FROM_EMAIL` | The `From:` on lead emails | `/try` + `/sign-in` forms |
| `LEAD_TO_EMAIL` | Where leads land (defaults to `admin@nashos.ai`) | optional |

---

## 1. Google Search Console

Search Console is what tells you which queries you rank for, which pages Google
has indexed, and which are erroring. Without it you are guessing.

1. Go to <https://search.google.com/search-console> and sign in with the Google
   account that should own the property.
2. Click **Add property**. You get two choices:
   - **Domain** (`nashos.ai`) — covers every subdomain and both `http`/`https`.
     Requires a DNS TXT record. **Prefer this one.**
   - **URL prefix** (`https://nashos.ai`) — covers just that prefix, and lets you
     verify with the HTML meta tag this repo supports.
3. **If you chose Domain:** Google shows a TXT record. Add it in your DNS
   provider (wherever `nashos.ai`'s nameservers point — Vercel DNS if the domain
   is managed there: Vercel → Domains → `nashos.ai` → DNS Records → Add, type
   `TXT`, name `@`, value = the string Google gave you). Wait a few minutes,
   click **Verify**. You can skip step 4 — `VITE_GSC_TOKEN` is not needed.
4. **If you chose URL prefix:** pick the **HTML tag** method. Google shows:

   ```html
   <meta name="google-site-verification" content="AbC123..." />
   ```

   Copy **only the `content` value** (`AbC123...`, not the whole tag). Set it as
   `VITE_GSC_TOKEN` in Vercel, redeploy, then click **Verify**.

5. Once verified, go to **Sitemaps** in the left sidebar and submit:

   ```
   sitemap.xml
   ```

6. Use **URL Inspection** on `https://nashos.ai/system`, `/inside-nash` and
   `/for-leaders` and hit **Request indexing** for each — these are brand-new
   URLs (they returned 404 until this change) and this gets them crawled in days
   rather than weeks.

---

## 2. Google Analytics 4

1. Go to <https://analytics.google.com>.
2. **Admin** (gear, bottom-left) → **Create** → **Property**. Name it `NashOS`,
   set the timezone and currency.
3. When asked for a platform, choose **Web**. Enter `https://nashos.ai` as the
   website URL and give the stream a name.
4. The stream detail page shows a **Measurement ID** in the top right, shaped
   `G-XXXXXXXXXX`. Copy it.
5. Set it as `VITE_GA4_ID` in Vercel and redeploy.
6. Confirm it works: open `https://nashos.ai` in a normal browser tab, then in
   GA4 go to **Reports → Realtime**. You should appear within about 30 seconds.

Do not paste the ID into the code — `__root.tsx` reads it from the env var and
renders no analytics tags at all when it is unset, which is what you want in
local dev and preview builds.

### Optional but worth doing

In GA4 → **Admin → Events → Create event**, or via **Enhanced measurement**, mark
form submissions as conversions once traffic starts, so you can tell which pages
actually produce pilot requests rather than just visits.

---

## 3. Lead email delivery (Resend)

Until this is set, `/try` and `/sign-in` return **HTTP 503** and show the visitor
"Please email admin@nashos.ai". That is deliberate — the previous behaviour was
to show a success message and silently discard the lead, and a visible error is
strictly better than a lost customer.

1. Sign up at <https://resend.com>.
2. **Domains → Add Domain** → `nashos.ai`. Resend gives you DKIM/SPF records —
   add them in the same DNS panel as above. Wait for the domain to show
   **Verified**.
3. **API Keys → Create API Key**, scope it to *Sending access*. Copy the key
   (shown once).
4. In Vercel set:
   - `RESEND_API_KEY` = the key
   - `LEAD_FROM_EMAIL` = e.g. `NashOS <hello@nashos.ai>` — the domain **must** be
     the one you verified in step 2, or Resend rejects the send
   - `LEAD_TO_EMAIL` = `admin@nashos.ai` (or omit; that is the default)
5. Redeploy, then submit the form on `/try` and confirm the email arrives.

If you would rather not run a mail provider, swap the `fetch` call in
[`api/lead.ts`](../api/lead.ts) for any form backend (Formspree, Tally). Keep the
contract: **only return `{ ok: true }` when the lead was actually delivered.**

---

## 4. Still outstanding

These are flagged in code with `TODO` and need information only you have:

- **Physical address + phone.** Add to `src/components/site-footer.tsx` (the
  `<address>` block), `PHONE_DISPLAY`/`PHONE_E164` in
  `src/components/site-header.tsx`, and `ORG_JSON_LD` in `src/routes/__root.tsx`.
  All three must match each other and your Google Business Profile exactly.
- **Legal copy.** `/privacy`, `/terms` and `/security` render a visible draft
  notice and are set to `noindex`. Once counsel signs off, delete the
  `<DraftNotice>` from each route, remove `noindex: true` from its `seo()` call,
  and add the three URLs to `public/sitemap.xml`.
- **Testimonials.** Not built. Needs real named quotes with written consent —
  do not add `Review`/`AggregateRating` schema without them.

---

## Verifying a deploy

After any change to routes or `seo()`, check a page's head:

```bash
curl -s https://nashos.ai/system | grep -E 'canonical|<title>|description|ld\+json' | head
```

Then run the page through:

- <https://search.google.com/test/rich-results> — validates FAQPage and
  BreadcrumbList markup
- <https://validator.schema.org> — validates Organization / SoftwareApplication

Rules to keep the setup coherent:

- Every indexable route appears **exactly once** in `public/sitemap.xml`.
- A route with `noindex: true` must **not** appear in the sitemap.
- Every route's `seo({ path })` must match its real URL, or the canonical will
  point somewhere wrong — which is worse than having no canonical at all.
