import type { Metadata } from "next";
import { Sparkles, Wrench, Plus } from "lucide-react";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "Everything shipped at NashOS — by week. We're shipping in days, not months. Watch the pace.",
};

type Tag = "feature" | "improvement" | "fix";

type Entry = {
  date: string;
  version: string;
  title: string;
  items: { tag: Tag; text: string }[];
};

const ENTRIES: Entry[] = [
  {
    date: "2026-04-30",
    version: "v0.4 · conversion pass",
    title: "ROI calculator, blog, industries, exit-intent",
    items: [
      { tag: "feature", text: "ROI calculator at /calculator — drag-the-slider math on close-cycle savings." },
      { tag: "feature", text: "Use-case toggle in hero (CFO / FP&A / Founder) — copy adapts to the visitor." },
      { tag: "feature", text: "Blog at /blog with 3 starter posts on close cycles, forecasting, and driver-based planning." },
      { tag: "feature", text: "Industry pages: /for/saas, /for/consulting, /for/hardware, /for/services." },
      { tag: "feature", text: "Resources hub at /resources with the FP&A starter pack download (email-gated)." },
      { tag: "feature", text: "Exit-intent popup, newsletter signup, live chat stub, public roadmap at /roadmap." },
      { tag: "improvement", text: "Tightened section padding ~40% across the home and subpages — page reads faster." },
    ],
  },
  {
    date: "2026-04-29",
    version: "v0.3 · live demo + comparison surface",
    title: "/demo interactive console + 3 comparison pages",
    items: [
      { tag: "feature", text: "Interactive /demo — click around the dashboard, run preset agent prompts, drag the what-if slider, lock a forecast." },
      { tag: "feature", text: "Comparison pages: /vs/anaplan, /vs/adaptive, /vs/excel — side-by-side table + differentiator cards." },
      { tag: "feature", text: "Sticky CTA bar appears after scrolling past the hero." },
      { tag: "feature", text: "Hypothetical case-study band on the home — before/after numbers, honestly flagged." },
      { tag: "improvement", text: "Hero now leads with quantified copy: 'Close in 4 days, not 12. Forecast in minutes.'" },
      { tag: "improvement", text: "Switching-from band lists 9 incumbents (Anaplan, Adaptive, Oracle EPM, OneStream, SAP BPC, Microsoft BI, Vena, Cube, Excel)." },
    ],
  },
  {
    date: "2026-04-28",
    version: "v0.2 · multi-page + animations",
    title: "Multi-page rebuild + 5 animated product mockups",
    items: [
      { tag: "feature", text: "5 new pages: /about, /partners, /products, /careers, /contact." },
      { tag: "feature", text: "5 animated product mockups: dashboard, AI chat, what-if slider, forecast comparison, driver formula." },
      { tag: "feature", text: "Ribbon nav with active-route highlighting and mobile hamburger drawer." },
      { tag: "improvement", text: "Wordmark logo: Nash·OS with brand-blue interpunct + emerald accent square." },
      { tag: "improvement", text: "Sitemap, robots.txt, dynamic OG image at /opengraph-image." },
    ],
  },
  {
    date: "2026-04-27",
    version: "v0.1 · launch",
    title: "Marketing site goes live at nashos.ai",
    items: [
      { tag: "feature", text: "Initial scaffold: Next.js 14 + Tailwind + Framer Motion." },
      { tag: "feature", text: "Lead-capture API at /api/lead with rate limit + honeypot." },
      { tag: "feature", text: "Domain wired through GoDaddy DNS to Vercel + SSL provisioned." },
    ],
  },
];

const tagStyle: Record<Tag, { bg: string; fg: string; Icon: typeof Sparkles }> = {
  feature: { bg: "bg-emerald-50 border-emerald-200", fg: "text-accent-emerald", Icon: Plus },
  improvement: { bg: "bg-brand-50 border-brand-100", fg: "text-brand-600", Icon: Sparkles },
  fix: { bg: "bg-amber-50 border-amber-200", fg: "text-accent-amber", Icon: Wrench },
};

export default function ChangelogPage() {
  return (
    <>
      <section className="bg-white pt-10 pb-8 lg:pt-14 lg:pb-10 border-b border-surface-200">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">
            Changelog
          </p>
          <h1 className="font-display font-bold text-4xl lg:text-5xl text-slate-900 tracking-tight text-balance">
            Everything shipped, by week.
          </h1>
          <p className="mt-5 text-lg text-slate-600 max-w-3xl">
            We&apos;re shipping in days, not months. This page is the receipt.
          </p>
        </div>
      </section>

      <section className="bg-surface-50 py-10 lg:py-14">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <ol className="space-y-6">
            {ENTRIES.map((e) => (
              <li
                key={e.version}
                className="rounded-2xl bg-white border border-surface-200 shadow-card overflow-hidden"
              >
                <div className="px-6 py-4 border-b border-surface-200 bg-gradient-to-r from-brand-50 to-white flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <time className="text-xs font-mono text-slate-500 tabular-nums">{e.date}</time>
                  <span className="font-display font-semibold text-slate-900">
                    {e.version}
                  </span>
                  <span className="text-sm text-slate-600">— {e.title}</span>
                </div>
                <ul className="divide-y divide-surface-200">
                  {e.items.map((it, i) => {
                    const t = tagStyle[it.tag];
                    return (
                      <li
                        key={i}
                        className="px-6 py-3 flex items-start gap-3 text-sm"
                      >
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${t.fg} ${t.bg} border rounded-full px-2 py-0.5 shrink-0 mt-0.5`}
                        >
                          <t.Icon className="w-3 h-3" />
                          {it.tag}
                        </span>
                        <span className="text-slate-700 leading-relaxed">{it.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
