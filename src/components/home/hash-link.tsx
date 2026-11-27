import type { ReactNode } from "react";
import { scrollToHash } from "@/lib/scroll-to-hash";

/**
 * A link to another band on the homepage (href="#system" and so on). Scrolls
 * smoothly, as the mock-up's html { scroll-behavior: smooth } does, and jumps
 * under reduced motion. If the target is missing it behaves as a plain link.
 */
export function HashLink({
  hash,
  className,
  children,
}: {
  hash: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={`#${hash}`}
      className={className}
      onClick={(e) => {
        if (scrollToHash(hash)) e.preventDefault();
      }}
    >
      {children}
    </a>
  );
}
