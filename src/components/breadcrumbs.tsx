import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { Crumb } from "@/lib/seo";

// Visible breadcrumb trail. The matching BreadcrumbList structured data is
// emitted by seo({ breadcrumbs }) in the route's head() — pass the same array
// to both so the markup and the schema can't drift apart.
//
// Sits below the fixed header, above the page hero. Home is prepended here
// exactly as it is in the schema.

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  if (!items.length) return null;

  return (
    // Top padding clears the absolutely-positioned header: utility bar (~33px)
    // plus the nav bar (64px mobile / 80px sm+), with breathing room on top.
    <nav
      aria-label="Breadcrumb"
      className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 pt-28 sm:pt-36"
    >
      <ol className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
        <li>
          <Link to="/" className="hover:text-gold transition-colors">
            Home
          </Link>
        </li>
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5 opacity-40" aria-hidden />
              {last ? (
                <span className="text-foreground" aria-current="page">
                  {c.name}
                </span>
              ) : (
                <Link to={c.path} className="hover:text-gold transition-colors">
                  {c.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
