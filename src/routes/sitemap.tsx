import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { PageHero, SectionHeader } from "@/components/page-sections";
import { seo } from "@/lib/seo";
import type { FileRouteTypes } from "@/routeTree.gen";

export const Route = createFileRoute("/sitemap")({
  head: () =>
    seo({
      title: "Site Map — NashOS",
      description:
        "Every page on nashos.ai in one place — product, comparisons, industry solutions, company, and the blog.",
      path: "/sitemap",
    }),
  component: SitemapPage,
});

// Human-readable mirror of public/sitemap.xml — keep the two in sync when a
// route is added or removed. Same rule as the XML file: noindexed routes
// (/sign-in, /privacy, /terms, /security) are deliberately absent.
//
// Static paths are checked against the generated route union at compile time;
// concrete /blog/<slug> and /for/<industry> paths can't be (the union only has
// the $param templates), so those stay covered by the sync rule above.
type SitePath = FileRouteTypes["to"] | `/blog/${string}` | `/for/${string}`;
type SitePage = { to: SitePath; title: string; blurb: string };

const GROUPS: { heading: string; caption: string; pages: SitePage[] }[] = [
  {
    heading: "Product",
    caption: "The system itself — what it does, what it costs, and how to see it running.",
    pages: [
      {
        to: "/",
        title: "Home",
        blurb:
          "Agentic FP&A software that runs planning, forecasting and close as one continuously computed system.",
      },
      {
        to: "/system",
        title: "The System",
        blurb: "How NashOS collapses eight EPM modules into five systems on one data foundation.",
      },
      {
        to: "/inside-nash",
        title: "Inside Nash",
        blurb: "The six systems behind agentic FP&A — and how they run as one model.",
      },
      {
        to: "/for-leaders",
        title: "For Leaders",
        blurb: "One system, three lenses: CFOs, FP&A teams, and founders.",
      },
      {
        to: "/products",
        title: "Products & Platforms",
        blurb: "Nine product pillars — Reporting, Planning, AI, and Operations — on a 9-dimension cube.",
      },
      {
        to: "/pricing",
        title: "Pricing",
        blurb: "Pilot in days. Scale with confidence.",
      },
      {
        to: "/demo",
        title: "Live demo",
        blurb: "Touch the product with sample data — dashboards, the AI agent, what-ifs.",
      },
      {
        to: "/try",
        title: "Try with your data",
        blurb: "Run a NashOS pilot on your own numbers, walkthrough within one business day.",
      },
      {
        to: "/calculator",
        title: "ROI calculator",
        blurb: "Four sliders. The answer in dollars.",
      },
      {
        to: "/roadmap",
        title: "Roadmap",
        blurb: "Now, Next, and Later. Public, honest, no fake dates.",
      },
      {
        to: "/changelog",
        title: "Changelog",
        blurb: "Everything shipped, by week.",
      },
    ],
  },
  {
    heading: "Compare",
    caption: "How NashOS stacks up against the tools it replaces.",
    pages: [
      {
        to: "/vs/anaplan",
        title: "NashOS vs Anaplan",
        blurb: "AI-native FP&A in hours, not 6-month implementations.",
      },
      {
        to: "/vs/adaptive",
        title: "NashOS vs Workday Adaptive",
        blurb: "Built for the LLM era — 35+ tools, 15 forecast algorithms.",
      },
      {
        to: "/vs/excel",
        title: "NashOS vs Excel",
        blurb: "When the spreadsheet stack stops scaling.",
      },
      {
        to: "/financial-close-software",
        title: "Financial close software",
        blurb: "Close in 1 day, not 12 — an agentic AI layer over the close.",
      },
    ],
  },
  {
    heading: "Solutions",
    caption: "The platform, and FP&A by industry.",
    pages: [
      {
        to: "/agentic-fpa-platform",
        title: "Agentic FP&A platform",
        blurb: "Built around AI agents — not retrofitted with a chatbot.",
      },
      {
        to: "/for/saas",
        title: "For SaaS",
        blurb: "ARR, retention cohorts, and runway in one cube.",
      },
      {
        to: "/for/services",
        title: "For services",
        blurb: "Mixed revenue streams — MSA, project, and the long tail.",
      },
      {
        to: "/for/consulting",
        title: "For consulting",
        blurb: "Utilization forecasting and project margin, both at once.",
      },
      {
        to: "/for/manufacturing",
        title: "For manufacturing",
        blurb: "BOM × supplier prices × yield × volume, with what-if at every layer.",
      },
      {
        to: "/for/hardware",
        title: "For hardware",
        blurb: "Per-SKU margin and supplier-shock scenarios, tracked to the unit.",
      },
    ],
  },
  {
    heading: "Company",
    caption: "Who's building this, and how to reach us.",
    pages: [
      {
        to: "/about",
        title: "Who we are",
        blurb: "Built by an FP&A operator who got tired of rebuilding the same spreadsheet.",
      },
      {
        to: "/careers",
        title: "Careers",
        blurb: "Not actively hiring yet — but FP&A operators who code should write us.",
      },
      {
        to: "/partners",
        title: "Partners",
        blurb: "Implementation consultants, platform partners, and integrators.",
      },
      {
        to: "/contact",
        title: "Contact",
        blurb: "Send a note, book a 15-min demo, or write to admin@nashos.ai.",
      },
    ],
  },
  {
    heading: "Resources",
    caption: "Practical FP&A patterns, free templates, and the blog.",
    pages: [
      {
        to: "/blog",
        title: "Blog",
        blurb: "Close cycles, forecast algorithms, driver-based planning — no fluff.",
      },
      {
        to: "/blog/cut-your-close-cycle-from-11-days-to-4",
        title: "Cut your close cycle from 11 days to 4",
        blurb: "What the median close breaks down into — and the three layers to collapse.",
      },
      {
        to: "/blog/picking-a-forecast-algorithm-without-a-data-science-team",
        title: "Picking a forecast algorithm without a data science team",
        blurb: "The 15 algorithms NashOS ships with, and how to read R² / RMSE / MAPE.",
      },
      {
        to: "/blog/what-driver-based-planning-actually-means",
        title: "What driver-based planning actually means",
        blurb: "A worked example: one driver, one formula, 3 days of rework collapsed to 30 seconds.",
      },
      {
        to: "/resources",
        title: "Resources",
        blurb: "Free FP&A starter pack — P&L, Cash Flow, Runway, Variance templates.",
      },
      {
        to: "/sitemap",
        title: "Site map",
        blurb: "This page — every route on the site, human-readable.",
      },
    ],
  },
];

function SitemapPage() {
  const total = GROUPS.reduce((n, g) => n + g.pages.length, 0);
  return (
    <PageShell>
      <PageHero
        eyebrow="Site map"
        title="Every page."
        highlight="One place."
        lede={
          <>
            All {total} pages on nashos.ai, grouped the way the site is built. Looking for the
            machine-readable version? It's at{" "}
            <a href="/sitemap.xml" className="text-gold hover:underline">
              /sitemap.xml
            </a>
            .
          </>
        }
      />

      {GROUPS.map((g) => (
        // Not <Section>: its baked-in py-14 wins the cascade over any smaller
        // py-* appended via className, and this listing wants tighter groups.
        <section key={g.heading} className="relative mx-auto max-w-[1400px] px-6 lg:px-10 py-8">
          <SectionHeader title={g.heading} caption={g.caption} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {g.pages.map((p) => (
              <Link
                key={p.to}
                // Widened on purpose: SitePath already validated the literals
                // above; Link's generics reject the /blog/* and /for/* template
                // types even though the concrete paths resolve at runtime.
                to={p.to as string}
                className="block surface-card p-5 hover:border-gold/40 transition-colors group"
              >
                <span className="text-xs font-mono text-muted-foreground">{p.to}</span>
                <h3 className="mt-1.5 font-semibold text-foreground group-hover:text-gold transition-colors">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.blurb}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </PageShell>
  );
}
