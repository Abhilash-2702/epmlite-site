import { Link, useLocation } from "@tanstack/react-router";
import { Linkedin } from "lucide-react";
import { NashLockup, NashMonogram } from "@/components/nash-marks";
import { XMark } from "@/components/social-links";
import { SOCIAL_PROFILES } from "@/lib/social";
import { ORG_ADDRESS_LINES } from "@/lib/org";

// Styled by src/styles/home.css (the homepage redesign's .hp-* classes). The
// footer renders on every page, so those styles are self-contained under the
// .hp-site-footer root.
//
// Footer hosts the long tail of routes that aren't in the top nav (top nav
// stays at 4: in-page hash sections + Pricing). Placeholder routes for the
// legacy Next.js paths are linked here so deep links don't 404 after cutover.
// Add new routes by extending COLUMNS: keeps the link grid in one place.

// Only From Q to D remains a homepage anchor. System, Inside Nash and For
// Leaders are dedicated routes now and appear in the Product column below.
const productHashLinks = [{ hash: "from-q-to-d", label: "From Q to D" }];

const COLUMNS: { heading: string; links: { to: string; label: string }[] }[] = [
  {
    heading: "Product",
    links: [
      { to: "/system", label: "System" },
      { to: "/inside-nash", label: "Inside Nash" },
      { to: "/for-leaders", label: "For Leaders" },
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
      { to: "/ai-agents-for-finance", label: "AI agents for finance" },
      { to: "/finance-automation-software", label: "Finance automation" },
      { to: "/ai-forecasting-software", label: "AI forecasting" },
      { to: "/cfo-ai-tools", label: "CFO AI tools" },
      { to: "/continuous-finance", label: "Continuous finance" },
    ],
  },
  {
    heading: "By industry",
    links: [
      { to: "/for/saas", label: "For SaaS" },
      { to: "/for/services", label: "For services" },
      { to: "/for/consulting", label: "For consulting" },
      { to: "/for/manufacturing", label: "For manufacturing" },
      { to: "/for/hardware", label: "For hardware" },
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
      { to: "/sitemap", label: "Site map" },
      { to: "/sign-in", label: "Sign in" },
      { to: "/try", label: "Try with your data" },
    ],
  },
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  // The curved end of the homepage's left spine. Inner pages have no spine
  // above the footer, so the curve would be a stray bracket there.
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  return (
    <footer className="hp-site-footer hp-navy">
      {/* Outline N watermark */}
      <div className="hp-watermark" aria-hidden="true">
        <NashMonogram />
      </div>

      <div className="hp-wrap">
        {onHome && <div className="hp-foot-spine" aria-hidden="true" />}

        {/* CTA band */}
        <div className="hp-closing">
          <div>
            <h3>
              Run finance as <span className="hp-em">one system</span>.
            </h3>
            <p>See NashOS plan, forecast and decide on your own data in minutes, not months.</p>
          </div>
          <div className="hp-closing-cta">
            <Link to="/try" className="hp-btn hp-btn-primary">
              Try with your data <span aria-hidden="true">→</span>
            </Link>
            <Link to="/pricing" className="hp-btn hp-btn-ghost">
              See pricing
            </Link>
          </div>
        </div>

        {/* Brand + link grid */}
        <div className="hp-foot-grid">
          <div className="hp-foot-brand">
            <Link to="/" className="hp-logo" aria-label="NashOS Agentic Finance">
              <NashLockup />
            </Link>
            <p>
              Agentic Finance for planning, forecasting and decisions: multi-entity, multi-currency,
              audit-ready from day one.
            </p>
            {/* NAP: Name, Address, Phone. The address is lib/org.ts, the same
                constant ORG_JSON_LD in routes/__root.tsx emits, so the two cannot
                drift. It is the registered office, so it is labelled as one.
                TODO(NAP): telephone still pending a real, answered number. */}
            <address>
              <a href="mailto:admin@nashos.ai">admin@nashos.ai</a>
              <span>
                <small>Registered office</small>
                <br />
                {ORG_ADDRESS_LINES[0]}
                <br />
                {ORG_ADDRESS_LINES[1]}
              </span>
            </address>
            {/* Official profiles from lib/social.ts, the same list the
                Organization sameAs emits and /contact renders. */}
            <ul className="hp-social">
              {SOCIAL_PROFILES.map((p) => (
                <li key={p.url}>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer me"
                    aria-label={`NashOS on ${p.name}`}
                    title={`NashOS on ${p.name}`}
                  >
                    {p.icon === "linkedin" ? (
                      <Linkedin className="hp-ic" aria-hidden="true" />
                    ) : (
                      <XMark />
                    )}
                  </a>
                </li>
              ))}
            </ul>
            <h4>On the home page</h4>
            <ul className="hp-links">
              {productHashLinks.map((l) => (
                <li key={l.hash}>
                  <a href={`/#${l.hash}`}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Link columns: long-tail routes */}
          <nav className="hp-foot-cols" aria-label="Footer">
            {COLUMNS.map((col) => (
              <div key={col.heading}>
                <h4>{col.heading}</h4>
                <ul className="hp-links">
                  {col.links.map((link) => (
                    <li key={link.to}>
                      <Link to={link.to as string}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="hp-foot-bottom">
          <p>© {year} NashOS. All rights reserved.</p>
          <div>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/security">Security</Link>
            <Link to="/security/subprocessors">Sub-processors</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
