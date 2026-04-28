import Link from "next/link";

type Size = "sm" | "md";

const dims: Record<Size, { box: number; text: string; gap: string }> = {
  sm: { box: 28, text: "text-lg", gap: "gap-2" },
  md: { box: 32, text: "text-xl", gap: "gap-2.5" },
};

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
  const fill = monochrome ? "#ffffff" : "#2e6fff";
  const dot = monochrome ? "#ffffff" : "#10b981";
  const stroke = monochrome ? "#2e6fff" : "#ffffff";
  const wordmarkClass = monochrome ? "text-white" : "text-slate-900";

  const inner = (
    <span className={`inline-flex items-center ${d.gap} ${className}`}>
      <svg
        viewBox="0 0 32 32"
        width={d.box}
        height={d.box}
        aria-hidden="true"
        className="shrink-0"
      >
        <rect width="32" height="32" rx="8" fill={fill} />
        <path
          d="M7 22 L13 16 L17 18 L25 9"
          stroke={stroke}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="25" cy="9" r="2.5" fill={dot} stroke={fill} strokeWidth="1" />
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
