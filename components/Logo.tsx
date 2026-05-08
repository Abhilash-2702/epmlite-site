import Link from "next/link";

type Size = "sm" | "md" | "lg";

const dims: Record<Size, { text: string; gap: string }> = {
  sm: { text: "text-lg",  gap: "gap-2"   },
  md: { text: "text-xl",  gap: "gap-2"   },
  lg: { text: "text-3xl", gap: "gap-2.5" },
};

/**
 * NashOS logo — N mark image + cropped wordmark image lockup.
 *
 * monochrome=false → light backgrounds (Nav)   → dark-text wordmark
 * monochrome=true  → dark backgrounds (Footer) → white-text wordmark
 *
 * Image heights use em units so the className size hint scales both
 * mark and wordmark proportionally.
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
  const wordmarkSrc = monochrome
    ? "/brand/nashos-wordmark-dark.png"
    : "/brand/nashos-wordmark.png";

  const inner = (
    <span className={`inline-flex items-center ${d.text} ${d.gap} ${className}`}>
      <img
        src="/brand/nashos-mark.png"
        alt=""
        aria-hidden="true"
        className="h-[1.8em] w-auto select-none flex-shrink-0"
        draggable={false}
      />
      <img
        src={wordmarkSrc}
        alt="NashOS — Agentic Finance"
        className="h-[1.4em] w-auto select-none"
        draggable={false}
      />
    </span>
  );

  if (href === null) return inner;
  return (
    <Link href={href} aria-label="NashOS — home" className="inline-flex">
      {inner}
    </Link>
  );
}
