import type { ReactNode } from "react";

/**
 * The mock-up's scroll reveal: adds .hp-rise-in, a CSS scroll-driven animation
 * (animation-timeline: view()). Browsers without scroll timelines, and anyone
 * with reduced motion, simply see the content; nothing is hidden behind script.
 */
export function RiseIn({
  as: Tag = "div",
  className,
  children,
}: {
  as?: "div" | "article" | "section" | "li";
  className?: string;
  children: ReactNode;
}) {
  return <Tag className={`hp-rise-in${className ? ` ${className}` : ""}`}>{children}</Tag>;
}
