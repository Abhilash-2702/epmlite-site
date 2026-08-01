# SEO, analytics & lead delivery

Operational state of the search, analytics and lead-capture layer for nashos.ai.

**Last verified: 1 August 2026.** Everything below was checked against the live site or the
relevant dashboard on that date — not inferred from the code.

| Area | State |
|---|---|
| Search Console | ✅ Verified, sitemap submitted, indexing requested |
| Google Analytics 4 | ✅ Live, receiving data |
| Lead delivery | ✅ Live from the verified domain |
| Address / phone (NAP) | ❌ Not supplied |
| Legal pages | ❌ Draft, held out of search |
| Testimonials | ❌ Not built (deliberately) |

---

## Environment variables

Set in **Vercel → epmlite-site → Settings → Environment Variables**. `VITE_*` values are inlined
at build time, so **a change to them requires a redeploy** — updating the variable alone does
nothing to the running site.

| Variable | Purpose | State |
|---|---|---|
| `VITE_GA4_ID` | GA4 measurement ID | ✅ `G-T4X0ZET299` |
| `RESEND_API_KEY` | Sending lead emails | ✅ set (Sensitive) |
| `LEAD_FROM_EMAIL` | `From:` on lead emails | ✅ `NashOS <hello@nashos.ai>` |
| `LEAD_TO_EMAIL` | Where leads land | ✅ `admin@nashos.ai` |
| `VITE_GSC_TOKEN` | Search Console meta tag | **Unused.** Verification happened via the GA4 tag instead. Kept in code as a fallback. |

Two stale variables, `NEXT_PUBLIC_GA_ID` and `NEXT_PUBLIC_CLARITY_ID`, survive from the Next.js
era. Vite only exposes `VITE_*`, so they are dead config and can be deleted.

---

## 1. Google Search Console — done

Property: **`https://nashos.ai/`** (URL-prefix).

Ownership was **auto-verified via the Google Analytics tag** — no DNS record and no meta tag were
needed, because GA4 was installed first under the same Google account.

> ⚠️ Verification therefore **depends on the GA4 tag staying on the site**. If GA4 is ever removed,
> add a second method under *Settings → Ownership verification* first, or the property lapses.

Done on 1 Aug 2026:
- `sitemap.xml` submitted and accepted (30 URLs)
- Indexing requested for `/system`, `/inside-nash`, `/for-leaders` — all three reported
  *"Discovered — currently not indexed"*, which is the normal pre-indexing state

An earlier Domain-property attempt (DNS verification via GoDaddy) was abandoned and deleted. If
subdomain-wide coverage is ever wanted — e.g. to include `app.nashos.ai` — add a Domain property
and verify it with the TXT record Google supplies.

**Reports take a day or two to populate.** *Performance* and *Indexing → Pages* both show
"Processing data" until then.

## 2. Google Analytics 4 — done

Property **`nashos.ai`** under account **NashOS**, measurement ID **`G-T4X0ZET299`**,
stream *"NashOS marketing site"*. Verified live: the tag renders in production HTML and Realtime
registered a session.

Configuration chosen at setup, all editable in Admin:

- Reporting time zone **India (GMT+5:30)**; currency **USD** (matches how the site prices)
- Industry **Finance**; business size 1–10
- Objectives: *Generate leads* + *Understand web traffic*
- Data sharing: **"Google products & services" and "Recommendations for your business" turned OFF**
  — they exist for Google's benefit. *Technical support* and *Modeling contributions* left on
  because they affect features you use.
- Google marketing emails declined
- ToS accepted for region **India**, plus the **GDPR Data Processing Terms** — relevant if any EU
  visitor reaches the site

Realtime works immediately; all other reports need ~24–48 hours.

## 3. Lead delivery (Resend)

`api/lead.ts` posts submissions from `/try` and `/sign-in` to Resend.

**The rule this endpoint exists to enforce: it never returns `ok: true` unless the mail was
actually delivered.** Before it existed, both forms called `e.preventDefault()` and nothing else —
every lead was discarded, and `/sign-in` showed a success message anyway.

Failure modes are deliberately visible:

| Condition | Response | Visitor sees |
|---|---|---|
| `RESEND_API_KEY` / `LEAD_FROM_EMAIL` unset | `503` | "Please email admin@nashos.ai" |
| Resend rejects the send | `502` | same |
| Delivered | `200` | confirmation panel |

The exact Resend rejection is written to `console.error`, so Vercel's runtime logs give the real
reason rather than a generic failure.

### Current state — verified ✅

`nashos.ai` is **Verified** in Resend (region **Tokyo, ap-northeast-1**, domain id
`1ab1510f-4d36-43e5-9b11-504ff590c3f7`). Verification took roughly 30 minutes after the DNS
records went in — AWS SES polls on its own schedule and there is no way to hurry it.

```
LEAD_FROM_EMAIL = NashOS <hello@nashos.ai>
LEAD_TO_EMAIL   = admin@nashos.ai
```

Confirmed on 1 Aug by posting to the live endpoint and receiving `{"ok":true}` — which, given the
never-fake-success rule above, means the mail was genuinely accepted for delivery.

While the domain was still pending, the site ran on Resend's shared sender
(`onboarding@resend.dev` → `mabhi2702@gmail.com`), because an unverified domain may only send to
the account owner's own address. That stopgap is no longer in use, but it is the fallback if the
domain ever loses verification.

### DNS records

Added in GoDaddy, verified live via `dns.google`:

| Type | Name | Value | Priority |
|---|---|---|---|
| `TXT` | `resend._domainkey` | `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDcqBYFcf0q5W8eXrP5N46PbRVSXX6X4nTmTKjOF27qnZWdyT54eua6P/0/HSnJL8tXIV25ZD8yuTAYM2zqJdplhX9wwjELNljIjyHC8XMAL+Yff8D8FSsnrXrtgYpUMxBU4JmUddj4t79uZ+PVCBb6AXh6ipjwXv9yZWQBaVYX1wIDAQAB` | — |
| `MX` | `send` | `feedback-smtp.ap-northeast-1.amazonses.com` | `10` |
| `TXT` | `send` | `v=spf1 include:amazonses.com ~all` | — |

> ### ⛔ Never add Resend's fourth record
>
> Resend also lists `MX @ → inbound-smtp.ap-northeast-1.amazonaws.com`. That is for **receiving**
> mail and is not needed to send.
>
> **nashos.ai runs Google Workspace** (`MX @ → alt2.aspmx.l.google.com`). Adding Resend's root MX
> would redirect all mail for the domain to Amazon and break `admin@nashos.ai` — the address on the
> website, in Search Console, and on every legal page.

Two GoDaddy gotchas, both of which cost time on 1 Aug:

- **GoDaddy appends the domain automatically.** Enter `send`, not `send.nashos.ai`, or you create
  `send.nashos.ai.nashos.ai` and verification silently never passes.
- Resend's UI shows the DKIM key with a `[…]` in the middle. That is display truncation, not part
  of the value. Use the copy button, or the full string above.

---

## Verifying a deploy

```bash
curl -s https://nashos.ai/system | grep -oE '<title>[^<]*|rel="canonical" href="[^"]*|"@type":"[^"]*'
```

```bash
curl -s -X POST https://nashos.ai/api/lead -H "Content-Type: application/json" \
  -d '{"source":"try","name":"test","email":"you@example.com","message":"delivery check"}'
```

`{"ok":true}` means an email was genuinely sent. Anything else is a real failure — read the reason
in Vercel → Logs.

Structured data:
- <https://search.google.com/test/rich-results> — FAQPage and BreadcrumbList
- <https://validator.schema.org> — Organization / WebSite / SoftwareApplication

Rules that keep the layer coherent:

- Every indexable route appears **exactly once** in `public/sitemap.xml`
- A route with `noindex: true` must **not** appear in the sitemap
- `seo({ path })` must match the real URL, or the canonical points somewhere wrong — worse than
  having none
- Anything passed to `seo({ faq })` must also be rendered on the page. Schema that describes
  invisible content breaches Google's structured-data policy.

---

## Still outstanding

Each needs information only the business can supply.

1. **Postal address and phone.** Three prepared slots: the `<address>` block in
   `src/components/site-footer.tsx`, `PHONE_DISPLAY`/`PHONE_E164` in
   `src/components/site-header.tsx`, and `ORG_JSON_LD` in `src/routes/__root.tsx`. All three must
   match each other and the Google Business Profile exactly. Nothing renders until they are set.
2. **Legal copy.** `/privacy`, `/terms` and `/security` render a visible draft notice and are
   `noindex`. When counsel signs off: delete `<DraftNotice>`, remove `noindex: true` from each
   route's `seo()` call, and add the three URLs to `public/sitemap.xml`.
3. **Testimonials.** Not built. Needs real named quotes with written consent. Do not add
   `Review` or `AggregateRating` schema without them — fabricated review markup is both dishonest
   and a search penalty.
4. **Two contradictions already live on the site.** The homepage animation says the close cycle
   goes from 11 days to 1; `/financial-close-software` and `/for/saas` say 11 to 4. Separately,
   `/vs/anaplan` advertises `$99/mo` while `/pricing` quotes everything on request. Both predate
   the SEO work and were left untouched, but Google can now surface either version.
5. **`package-lock.json`** is untracked and not gitignored. `main` has never carried a lockfile,
   and `vercel.json` installs with `npm install --legacy-peer-deps`, so committing it would change
   production dependency resolution. Decide deliberately: commit it, or add it to `.gitignore`.
