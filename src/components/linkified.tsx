import { Fragment } from "react";
import { Link } from "@tanstack/react-router";

// The generated landing-page prose and FAQ answers reference sibling pages as
// bare paths ("the architecture is at /system"). Rendered as plain strings
// those are dead text: no navigation for the reader and no internal-link
// signal for a crawler. This turns each known path into a real <Link>.
//
// Longest paths first so /for/saas matches before /for, and the trailing
// guard stops /system matching inside /system-something.
const PATHS = [
  "/agentic-fpa-platform",
  "/financial-close-software",
  "/finance-automation-software",
  "/ai-forecasting-software",
  "/ai-agents-for-finance",
  "/continuous-finance",
  "/cfo-ai-tools",
  "/for/manufacturing",
  "/for/consulting",
  "/for/services",
  "/for/hardware",
  "/for-leaders",
  "/inside-nash",
  "/calculator",
  "/changelog",
  "/for/saas",
  "/products",
  "/partners",
  "/resources",
  "/roadmap",
  "/pricing",
  "/careers",
  "/contact",
  "/sitemap",
  "/system",
  "/demo",
  "/blog",
  "/try",
];

const SPLIT_RE = new RegExp("(" + PATHS.join("|") + ")(?![A-Za-z0-9/-])");

export function Linkified({ text }: { text: string }) {
  const parts = text.split(SPLIT_RE);
  return (
    <>
      {parts.map((part, i) =>
        PATHS.includes(part) ? (
          <Link key={i} to={part as string} className="text-gold hover:underline">
            {part}
          </Link>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
