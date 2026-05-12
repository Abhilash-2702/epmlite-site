import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Tag, ArrowRight } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { PageHero, Section } from "@/components/page-sections";
import { POSTS, CATEGORY_LABEL } from "@/lib/posts";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — NashOS" },
      {
        name: "description",
        content:
          "Practical FP&A patterns: cutting close cycles, picking forecast algorithms, and what driver-based planning actually means.",
      },
    ],
  }),
  component: BlogIndexPage,
});

function BlogIndexPage() {
  const sorted = [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
  return (
    <PageShell>
      <PageHero
        eyebrow="Blog"
        title="FP&A patterns."
        highlight="No fluff."
        lede="We write what we know — close cycles, forecasting, drivers, audit. If you've wrestled with the same Excel model for the last 3 months, you're the audience."
      />

      <Section>
        <div className="space-y-5">
          {sorted.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="block surface-card p-7 lg:p-8 hover:border-gold/40 transition-colors group"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground mb-3">
                <time>{p.date}</time>
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {p.readingTimeMin} min read
                </span>
                <span className="inline-flex items-center gap-1 text-gold font-semibold uppercase tracking-wider">
                  <Tag className="w-3 h-3" />
                  {CATEGORY_LABEL[p.category] ?? p.category}
                </span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight group-hover:text-gold transition-colors">
                {p.title}
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">{p.description}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-gold font-semibold text-sm group-hover:gap-2.5 transition-all">
                Read post
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
