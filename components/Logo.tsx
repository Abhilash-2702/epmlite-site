import Link from "next/link";

type Size = "sm" | "md" | "lg";

const dims: Record<Size, { text: string; dot: string; gap: string }> = {
  sm: { text: "text-lg",  dot: "mx-1",   gap: "gap-1.5" },
  md: { text: "text-xl",  dot: "mx-1",   gap: "gap-2"   },
  lg: { text: "text-3xl", dot: "mx-1.5", gap: "gap-2.5" },
};

/**
 * NashOS wordmark — N mark image + "Nash · OS" text lockup.
 *
 * The N mark is a transparent PNG with its own teal/emerald gradient,
 * so it reads correctly on both light AND dark backgrounds without
 * needing per-tone variants.
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
  const dotClass = monochrome ? "text-slate-300/70" : "text-slate-400";

  const inner = (
    <span
      className={`inline-flex items-center font-display font-semibold tracking-tight ${d.text} ${wordClass} ${d.gap} ${className}`}
    >
      <img
        src="/brand/nashos-mark.png"
        alt=""
        aria-hidden="true"
        className="h-[1.6em] w-auto select-none"
        draggable={false}
      />
      <span className="inline-flex items-baseline">
        Nash
        <span className={`${dotClass} ${d.dot}`} aria-hidden="true">·</span>
        OS
      </span>
    </span>
  );

  if (href === null) return inner;
  return (
    <Link href={href} aria-label="NashOS — home" className="inline-flex">
      {inner}
    </Link>
  );
}
