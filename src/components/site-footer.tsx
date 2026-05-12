import { Link } from "@tanstack/react-router";
import nashosLogo from "@/assets/nashos-logo-cropped.png";
import nashMark from "@/assets/nash-mark.png";

// Footer hosts the long tail of routes that aren't in the top nav (top nav
// stays at 4: in-page hash sections + Pricing). Placeholder routes for the
// legacy Next.js paths are linked here so deep links don't 404 after cutover.
// Add new routes by extending COLUMNS — keeps the link grid in one place.

const productHashLinks = [
  { hash: "from-q-to-d", label: "From Q to D" },
  { hash: "system", label: "System" },
  { hash: "inside-nash", label: "Inside Nash" },
  { hash: "for-leaders", label: "For Leaders" },
];

const COLUMNS: { heading: string; links: { to: string; label: string }[] }[] = [
  {
    heading: "Product",
    links: [
      { to: "/products", label: "Products" },
      { to: "/pricing", label: "Pricing" },
      { to: "/demo", label: "Book a demo" },
      { to: "/calculator", label: "ROI calculator" },
      { to: "/roadmap", label: "Roadmap" },
      { to: "/changelog", label: "Changelog" },
    ],
  },
  {
    heading: "Compare",
    links: [
      { to: "/vs/anaplan", label: "vs Anaplan" },
      { to: "/vs/adaptive", label: "vs Adaptive" },
      { to: "/vs/excel", label: "vs Excel" },
      { to: "/financial-close-software", label: "Close software" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { to: "/agentic-fpa-platform", label: "Agentic FP&A platform" },
      { to: "/for/saas", label: "For SaaS" },
      { to: "/for/services", label: "For services" },
      { to: "/for/manufacturing", label: "For manufacturing" },
    ],
  },
  {
    heading: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/careers", label: "Careers" },
      { to: "/partners", label: "Partners" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { to: "/blog", label: "Blog" },
      { to: "/resources", label: "Resources" },
      { to: "/sign-in", label: "Sign in" },
      { to: "/try", label: "Try with your data" },
    ],
  },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-background">
      {/* subtle gold glow on the top border */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.82 0.14 78 / 0.6), transparent)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[80%] opacity-40"
        style={{ background: "var(--gradient-radial-gold)" }}
      />

      {/* Outline N watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-center overflow-hidden"
      >
        <img
          src={nashMark}
          alt=""
          className="w-[60%] max-w-[720px] min-w-[320px] translate-y-[18%] opacity-[0.06] select-none"
          style={{ filter: "grayscale(1) contrast(1.2) brightness(1.4)" }}
          draggable={false}
        />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 pt-16 pb-10">
        {/* CTA band */}
        <div className="surface-card p-6 sm:p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Run finance as <span className="text-gradient-gold">one system</span>.
            </h3>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-xl">
              See NashOS plan, forecast and decide on your own data — in minutes, not months.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <Link
              to="/try"
              className="btn-gold inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
            >
              Try with your data <span aria-hidden>→</span>
            </Link>
            <Link
              to="/pricing"
              className="btn-outline-gold inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
            >
              See pricing
            </Link>
          </div>
        </div>

        {/* Brand + link grid */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_3fr] lg:gap-16">
          {/* Brand column */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <Link to="/" className="inline-flex items-center" aria-label="NashOS — Agentic Finance">
              <img
                src={nashosLogo}
                alt="NashOS"
                className="h-8 w-auto object-contain select-none"
                draggable={false}
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Agentic Finance for planning, forecasting and decisions — multi-entity, multi-currency, audit-ready from day one.
            </p>
            <a
              href="mailto:admin@nashos.ai"
              className="mt-4 inline-flex items-center text-sm text-gold hover:underline"
            >
              admin@nashos.ai
            </a>
            <div className="mt-6">
              <h4 className="text-xs uppercase tracking-[0.14em] text-gold mb-3">On the home page</h4>
              <ul className="space-y-2 text-sm">
                {productHashLinks.map((l) => (
                  <li key={l.hash}>
                    <a href={`/#${l.hash}`} className="text-muted-foreground hover:text-foreground transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Link columns — long-tail routes */}
          <nav className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {COLUMNS.map((col) => (
              <div key={col.heading}>
                <h4 className="text-xs uppercase tracking-[0.14em] text-gold mb-4">
                  {col.heading}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to as string}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col items-center sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-muted-foreground text-center sm:text-left">
          <p>© {year} NashOS. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/contact" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link to="/contact" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link to="/contact" className="hover:text-foreground transition-colors">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
