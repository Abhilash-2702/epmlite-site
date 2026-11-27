// Smooth in-page scroll to a section by id, used for the homepage's hash links
// (header "From Q to D", hero "Explore Nash", and any band that links to
// another band). The mock-up does this with html { scroll-behavior: smooth };
// the site cannot, because that rule would also animate the router's scroll
// reset on every navigation. Reduced motion jumps instead of gliding.
//
// Returns false when the target is not on this page, so the caller can let the
// browser follow the link normally (for example "/#from-q-to-d" from /pricing).
export function scrollToHash(hash: string): boolean {
  const el = document.getElementById(hash);
  if (!el) return false;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  // Keep the router's history state; only the hash changes.
  history.replaceState(history.state, "", `#${hash}`);
  return true;
}
