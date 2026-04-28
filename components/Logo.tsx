import Link from "next/link";

type Size = "sm" | "md" | "lg";

const dims: Record<Size, { box: number; text: string; gap: string }> = {
  sm: { box: 28, text: "text-lg", gap: "gap-2" },
  md: { box: 32, text: "text-xl", gap: "gap-2.5" },
  lg: { box: 44, text: "text-2xl", gap: "gap-3" },
};

/**
 * EPM Lite mark — "E-Arrow":
 * the "E" (for EPM) is the mark itself; its top stroke ascends into an
 * AI-spark arrow. Conveys finance + intelligence + growth in a single glyph.
 */
export default function Logo({
  size = "md",
  href = "/",
  monochrome = false,
  className = "",
}: {
  size?: Size;
  href?: string | null;
  monochrome?: boolean;
  className?: string;
}) {
  const d = dims[size];
  const bg = monochrome ? "#ffffff" : "#2e6fff";
  const fg = monochrome ? "#2e6fff" : "#ffffff";
  const dot = "#10b981";
  const wordmarkClass = monochrome ? "text-white" : "text-slate-900";

  const inner = (
    <span className={`inline-flex items-center ${d.gap} ${className}`}>
      <svg
        viewBox="0 0 64 64"
        width={d.box}
        height={d.box}
        aria-hidden="true"
        className="shrink-0"
      >
        <rect width="64" height="64" rx="14" fill={bg} />
        {/* E body */}
        <rect x="14" y="14" width="6" height="36" rx="1.5" fill={fg} />
        <rect x="14" y="14" width="22" height="6" rx="1.5" fill={fg} />
        <rect x="14" y="29" width="18" height="5" rx="1.5" fill={fg} />
        <rect x="14" y="44" width="22" height="6" rx="1.5" fill={fg} />
        {/* Top stroke continues as a rising chart arrow */}
        <path
          d="M36 17 L46 11 L52 14"
          stroke={fg}
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* AI spark at the tip */}
        <circle cx="52" cy="14" r="4" fill={dot} />
      </svg>
      <span
        className={`font-display font-bold tracking-tight ${d.text} ${wordmarkClass}`}
      >
        EPM Lite
      </span>
    </span>
  );

  if (href === null) return inner;
  return (
    <Link href={href} aria-label="EPM Lite — home" className="inline-flex">
      {inner}
    </Link>
  );
}
