import { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Reusable section primitives for content pages — all in the gold-on-dark theme.
// Goal: every old Next.js page can be ported by passing data (titles, items,
// FAQ rows, comparison rows) into these components instead of writing markup.
// ─────────────────────────────────────────────────────────────────────────────

export function PageHero({
  eyebrow,
  title,
  highlight,
  lede,
  primaryCta,
  secondaryCta,
  tight = false,
}: {
  eyebrow: string;
  title: ReactNode;
  highlight?: string;
  lede?: ReactNode;
  primaryCta?: { label: string; to?: string; href?: string };
  secondaryCta?: { label: string; to?: string; href?: string };
  /** Set on pages that render <Breadcrumbs>, which already clears the header. */
  tight?: boolean;
}) {
  return (
    <section
      className={`relative mx-auto max-w-[1400px] px-6 lg:px-10 pb-16 ${tight ? "pt-8" : "pt-40"}`}
    >
      <div className="max-w-3xl">
        <span className="chip">
          <span className="chip-dot pulse-dot" />
          {eyebrow}
        </span>
        <h1 className="mt-8 text-4xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
          {title}
          {highlight && (
            <>
              <br />
              <span className="text-gradient-gold">{highlight}</span>
            </>
          )}
        </h1>
        {lede && (
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{lede}</p>
        )}
        {(primaryCta || secondaryCta) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {primaryCta && <Cta {...primaryCta} variant="primary" />}
            {secondaryCta && <Cta {...secondaryCta} variant="secondary" />}
          </div>
        )}
      </div>
    </section>
  );
}

export function Cta({
  label,
  to,
  href,
  variant = "primary",
}: {
  label: string;
  to?: string;
  href?: string;
  variant?: "primary" | "secondary";
}) {
  const cls =
    variant === "primary"
      ? "btn-gold inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
      : "btn-outline-gold inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium";
  if (href) {
    return (
      <a href={href} className={cls}>
        {label} <ArrowRight className="w-4 h-4" />
      </a>
    );
  }
  return (
    <Link to={to as string} className={cls}>
      {label} <ArrowRight className="w-4 h-4" />
    </Link>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  caption,
}: {
  eyebrow?: string;
  title: ReactNode;
  caption?: ReactNode;
}) {
  return (
    <div className="max-w-3xl mb-10">
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.2em] text-gold mb-3 font-semibold">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight">{title}</h2>
      {caption && <p className="mt-4 text-lg text-muted-foreground">{caption}</p>}
    </div>
  );
}

export function StatGrid({
  items,
  cols = 4,
}: {
  items: { num: string; label: string }[];
  cols?: 2 | 3 | 4;
}) {
  const gridCls =
    cols === 4
      ? "grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
      : cols === 3
        ? "grid sm:grid-cols-3 gap-5"
        : "grid sm:grid-cols-2 gap-5";
  return (
    <div className={gridCls}>
      {items.map((s) => (
        <div key={s.label} className="surface-card p-6">
          <div className="text-3xl font-semibold tabular-nums text-gradient-gold">
            {s.num}
          </div>
          <div className="mt-2 text-sm text-muted-foreground leading-snug">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}

export function CardGrid<T extends { title: string; body: string; Icon?: LucideIcon; meta?: string }>({
  items,
  cols = 3,
}: {
  items: T[];
  cols?: 2 | 3 | 4;
}) {
  const gridCls =
    cols === 4
      ? "grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
      : cols === 3
        ? "grid md:grid-cols-3 gap-5"
        : "grid md:grid-cols-2 gap-5";
  return (
    <div className={gridCls}>
      {items.map((c) => (
        <div key={c.title} className="surface-card p-6">
          {c.Icon && (
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gold/10 text-gold mb-4">
              <c.Icon className="w-5 h-5" />
            </span>
          )}
          <h3 className="font-semibold text-foreground">{c.title}</h3>
          {c.meta && <p className="text-xs font-mono text-muted-foreground mt-1">{c.meta}</p>}
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{c.body}</p>
        </div>
      ))}
    </div>
  );
}

export function FaqList({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <div className="space-y-4">
      {items.map((it) => (
        <details
          key={it.question}
          className="group surface-card p-5"
        >
          <summary className="cursor-pointer font-semibold list-none flex items-center justify-between gap-4">
            {it.question}
            <span className="text-gold group-open:rotate-180 transition-transform">▾</span>
          </summary>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            {it.answer}
          </p>
        </details>
      ))}
    </div>
  );
}

export function CtaBand({
  title,
  highlight,
  lede,
  primaryCta,
  secondaryCta,
}: {
  title: string;
  highlight?: string;
  lede?: ReactNode;
  primaryCta?: { label: string; to?: string; href?: string };
  secondaryCta?: { label: string; to?: string; href?: string };
}) {
  return (
    <section className="relative mx-auto max-w-[1400px] px-6 lg:px-10 py-16">
      <div className="surface-card p-10 lg:p-12 text-center">
        <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight">
          {title}{" "}
          {highlight && <span className="text-gradient-gold">{highlight}</span>}
        </h2>
        {lede && (
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {lede}
          </p>
        )}
        {(primaryCta || secondaryCta) && (
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {primaryCta && <Cta {...primaryCta} variant="primary" />}
            {secondaryCta && <Cta {...secondaryCta} variant="secondary" />}
          </div>
        )}
      </div>
    </section>
  );
}

export function Section({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`relative mx-auto max-w-[1400px] px-6 lg:px-10 py-14 ${className}`}>
      {children}
    </section>
  );
}

// Comparison table for /vs/* pages — winner-aware coloring on each row.
export type ComparisonRow = {
  label: string;
  nashos: string;
  rival: string;
  winner: "nashos" | "rival" | "draw";
};

export function ComparisonTable({
  rivalName,
  rows,
}: {
  rivalName: string;
  rows: ComparisonRow[];
}) {
  return (
    <div className="surface-card overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-xs uppercase tracking-[0.14em] text-muted-foreground">
            <th className="text-left font-semibold px-5 py-4">Capability</th>
            <th className="text-left font-semibold px-5 py-4 text-gold">NashOS</th>
            <th className="text-left font-semibold px-5 py-4">{rivalName}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60">
          {rows.map((r) => (
            <tr key={r.label}>
              <td className="px-5 py-4 font-medium">{r.label}</td>
              <td
                className={`px-5 py-4 ${
                  r.winner === "nashos" ? "text-gold font-semibold" : "text-foreground/85"
                }`}
              >
                {r.nashos}
              </td>
              <td
                className={`px-5 py-4 ${
                  r.winner === "rival" ? "text-gold font-semibold" : "text-foreground/85"
                }`}
              >
                {r.rival}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function CheckList({ items, accent = "gold" }: { items: string[]; accent?: "gold" | "emerald" }) {
  const dotCls = accent === "emerald" ? "bg-emerald-400" : "bg-gold";
  return (
    <ul className="space-y-3">
      {items.map((it) => (
        <li key={it} className="flex items-start gap-3 text-sm text-foreground/90">
          <span className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${dotCls}`} />
          {it}
        </li>
      ))}
    </ul>
  );
}
