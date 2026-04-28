import Link from "next/link";

type Size = "sm" | "md" | "lg";

const dims: Record<Size, { text: string; dot: string; square: string; gap: string }> = {
  sm: { text: "text-lg", dot: "mx-1",   square: "w-1.5 h-1.5 ml-1.5", gap: "gap-0" },
  md: { text: "text-xl", dot: "mx-1",   square: "w-2 h-2 ml-1.5",     gap: "gap-0" },
  lg: { text: "text-3xl", dot: "mx-1.5", square: "w-2.5 h-2.5 ml-2",  gap: "gap-0" },
};

/**
 * EPM Lite wordmark. Type-only — Mercury / Brex aesthetic.
 *   EPM · Lite ▪
 * Brand-blue (or brand-400 on dark bg) interpunct + trailing emerald square.
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
  const wordClass = monochrome ? "text-white" : "text-slate-900";
  const dotClass = monochrome ? "text-brand-400" : "text-brand-600";

  const inner = (
    <span
      className={`inline-flex items-baseline font-display font-bold tracking-tight ${d.text} ${wordClass} ${d.gap} ${className}`}
    >
      EPM
      <span className={`${dotClass} ${d.dot}`} aria-hidden="true">·</span>
      Lite
      <span
        className={`inline-block rounded-sm bg-accent-emerald ${d.square}`}
        style={{ alignSelf: "center" }}
        aria-hidden="true"
      />
    </span>
  );

  if (href === null) return inner;
  return (
    <Link href={href} aria-label="EPM Lite — home" className="inline-flex">
      {inner}
    </Link>
  );
}
