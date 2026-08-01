import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Wrench, Plus, type LucideIcon } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { PageHero, Section } from "@/components/page-sections";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/changelog")({
  head: () =>
    seo({
      title: "Changelog — NashOS",
      description:
        "Everything shipped at NashOS — by week. We're shipping in days, not months.",
      path: "/changelog",
    }),
  component: ChangelogPage,
});

type Tag = "feature" | "improvement" | "fix";
type Entry = {
  date: string;
  version: string;
  title: string;
  items: { tag: Tag; text: string }[];
};

const ENTRIES: Entry[] = [
  {
    date: "2026-05-06",
    version: "v0.7 · production",
    title: "Live at app.nashos.ai",
    items: [
      { tag: "feature", text: "Production deployment to app.nashos.ai (Vercel + Railway + Postgres-aOrl)." },
      { tag: "feature", text: "Same-origin Vercel rewrite proxies /api/* to Railway — strict-SameSite cookies stay strict." },
      { tag: "improvement", text: "Auto-deploy on every git push origin master — Vercel ~30s, Railway ~2min, zero downtime." },
    ],
  },
  {
    date: "2026-05-05",
    version: "v0.6 · Nash agent overhaul",
    title: "Manus-style split-pane chat workspace",
    items: [
      { tag: "feature", text: "65/35 split-pane on /ai/chat — chat left, live workspace right." },
      { tag: "feature", text: "Live PlanView (auto-synthesized from tool trace) and ToolStream (terminal-styled feed)." },
      { tag: "feature", text: "All 17 artifact cards (drafts, charts, predictions, variance, etc.) reused in workspace pane." },
      { tag: "improvement", text: "Parallel side_channel SSE — workspace populates as the agent works, not at the end." },
    ],
  },
  {
    date: "2026-05-03",
    version: "v0.5 · numeric truth",
    title: "Deterministic summaries kill the $1B/mo hallucination",
    items: [
      { tag: "fix", text: "Customer-demo bug: bot computed '$1B/month growth' on top of correct $126M chart numbers (off by 1,200×)." },
      { tag: "feature", text: "Every numeric tool now returns a pre-computed summary string the LLM must quote verbatim." },
      { tag: "feature", text: "LLM regression suite: 25 tests (18 direct + 7 end-to-end), runs in 50s, hits real Claude API." },
    ],
  },
  {
    date: "2026-04-30",
    version: "v0.4 · conversion pass",
    title: "ROI calculator, blog, industries, exit-intent",
    items: [
      { tag: "feature", text: "ROI calculator at /calculator — drag-the-slider math on close-cycle savings." },
      { tag: "feature", text: "Use-case toggle in hero (CFO / FP&A / Founder) — copy adapts to the visitor." },
      { tag: "feature", text: "Blog at /blog with starter posts on close cycles, forecasting, and driver-based planning." },
      { tag: "feature", text: "Industry pages: /for/saas, /for/services, /for/manufacturing." },
      { tag: "feature", text: "Resources hub at /resources with the FP&A starter pack download." },
    ],
  },
  {
    date: "2026-04-29",
    version: "v0.3 · live demo + comparison surface",
    title: "/demo interactive console + 3 comparison pages",
    items: [
      { tag: "feature", text: "Interactive /demo — click around the dashboard, run preset agent prompts." },
      { tag: "feature", text: "Comparison pages: /vs/anaplan, /vs/adaptive, /vs/excel." },
      { tag: "improvement", text: "Hero now leads with quantified copy: 'Close in 4 days, not 12.'" },
    ],
  },
  {
    date: "2026-04-28",
    version: "v0.2 · multi-page + animations",
    title: "Multi-page rebuild + 5 animated product mockups",
    items: [
      { tag: "feature", text: "5 new pages: /about, /partners, /products, /careers, /contact." },
      { tag: "feature", text: "5 animated product mockups: dashboard, AI chat, what-if slider, forecast comparison, driver formula." },
    ],
  },
  {
    date: "2026-04-27",
    version: "v0.1 · launch",
    title: "Marketing site goes live at nashos.ai",
    items: [
      { tag: "feature", text: "Initial scaffold + lead-capture API + custom domain." },
    ],
  },
];

const TAG_STYLE: Record<Tag, { Icon: LucideIcon; cls: string }> = {
  feature: { Icon: Plus, cls: "text-emerald-300 border-emerald-400/30 bg-emerald-400/10" },
  improvement: { Icon: Sparkles, cls: "text-gold border-gold/30 bg-gold/10" },
  fix: { Icon: Wrench, cls: "text-amber-300 border-amber-400/30 bg-amber-400/10" },
};

function ChangelogPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Changelog"
        title="Everything shipped,"
        highlight="by week."
        lede="We're shipping in days, not months. This page is the receipt."
      />

      <Section>
        <ol className="space-y-6">
          {ENTRIES.map((e) => (
            <li key={e.version} className="surface-card overflow-hidden">
              <div className="px-6 py-4 border-b border-border bg-gold/5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <time className="text-xs font-mono text-muted-foreground tabular-nums">
                  {e.date}
                </time>
                <span className="font-semibold">{e.version}</span>
                <span className="text-sm text-muted-foreground">— {e.title}</span>
              </div>
              <ul className="divide-y divide-border/60">
                {e.items.map((it, i) => {
                  const t = TAG_STYLE[it.tag];
                  return (
                    <li key={i} className="px-6 py-3 flex items-start gap-3 text-sm">
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider border rounded-full px-2 py-0.5 shrink-0 mt-0.5 ${t.cls}`}
                      >
                        <t.Icon className="w-3 h-3" />
                        {it.tag}
                      </span>
                      <span className="text-foreground/85 leading-relaxed">{it.text}</span>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ol>
      </Section>
    </PageShell>
  );
}
