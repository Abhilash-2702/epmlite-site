import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { POSTS } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical FP&A patterns: cutting close cycles, picking forecast algorithms, and what driver-based planning actually means.",
};

const CAT_LABEL: Record<string, string> = {
  process: "Process",
  forecasting: "Forecasting",
  concepts: "Concepts",
  playbooks: "Playbooks",
};

export default function BlogIndexPage() {
  const sorted = [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
  return (
    <>
      <section className="bg-white pt-10 pb-8 lg:pt-14 lg:pb-10 border-b border-surface-200">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">
            Blog
          </p>
          <h1 className="font-display font-bold text-4xl lg:text-5xl text-slate-900 tracking-tight text-balance">
            FP&amp;A patterns. No fluff.
          </h1>
          <p className="mt-5 text-lg text-slate-600 max-w-3xl">
            We write what we know — close cycles, forecasting, drivers, audit. If you&apos;ve
            wrestled with the same Excel model for the last 3 months, you&apos;re the audience.
          </p>
        </div>
      </section>

      <section className="bg-surface-50 py-10 lg:py-14">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 space-y-5">
          {sorted.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="block rounded-2xl bg-white border border-surface-200 p-7 lg:p-8 shadow-card hover:shadow-card-hover hover:border-brand-200 transition-all group"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-500 mb-3">
                <time>{p.date}</time>
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {p.readingTimeMin} min read
                </span>
                <span className="inline-flex items-center gap-1 text-brand-600 font-semibold uppercase tracking-wider">
                  <Tag className="w-3 h-3" />
                  {CAT_LABEL[p.category] ?? p.category}
                </span>
              </div>
              <h2 className="font-display font-bold text-2xl lg:text-3xl text-slate-900 tracking-tight group-hover:text-brand-600 transition-colors">
                {p.title}
              </h2>
              <p className="mt-3 text-slate-600 leading-relaxed">{p.description}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-brand-600 font-semibold text-sm group-hover:gap-2.5 transition-all">
                Read post
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
