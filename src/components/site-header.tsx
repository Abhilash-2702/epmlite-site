import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AlignRight, X, Mail, Phone } from "lucide-react";
import { NashLockup } from "@/components/nash-marks";
import { scrollToHash } from "@/lib/scroll-to-hash";

// Styled by src/styles/home.css (the homepage redesign's .hp-* classes). The
// header renders on every page, so those styles are self-contained under the
// .hp-site-header root.

// Nav used to be four "/#hash" jumps into homepage sections, which meant
// /system, /inside-nash and /for-leaders were 404s and none of that content
// could rank on its own. Those three are dedicated routes now; From Q to D
// has no standalone page yet so it stays a hash link.
const hashLinks = [{ hash: "from-q-to-d", label: "From Q to D" }] as const;

const pageLinks = [
  { to: "/system", label: "System" },
  { to: "/inside-nash", label: "Inside Nash" },
  { to: "/for-leaders", label: "For Leaders" },
  { to: "/pricing", label: "Pricing" },
] as const;

// Phone renders only once a real number exists: a placeholder in a tel: link
// is worse than no link, and the NAP must match the Organization schema and
// Google Business Profile exactly. Set to e.g. "+91 80 1234 5678".
const PHONE_DISPLAY: string | null = null;
const PHONE_E164 = "";

export function SiteHeader() {
  const { pathname } = useLocation();
  const onHome = pathname === "/";
  const [open, setOpen] = useState(false);
  // Fixed, so nav and the Try CTA stay in reach on long pages. It stays
  // transparent over the page top and paints a background once the page has
  // scrolled or the mobile menu is open.
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // The menu button only exists below 1024px; close the menu if the window
  // grows past that, so the scroll lock cannot outlive the menu.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    setOpen(false);
    if (!onHome) return; // let the browser handle "/#hash" cross-route nav
    if (scrollToHash(hash)) e.preventDefault();
  };

  return (
    <header className={`hp-site-header hp-navy${scrolled || open ? " hp-is-solid" : ""}`}>
      {/* Utility bar: direct contact above the fold on every page. */}
      <div className="hp-util">
        <div className="hp-wrap hp-util-in">
          <div>
            <a className="hp-util-mail" href="mailto:admin@nashos.ai">
              <Mail className="hp-ic" aria-hidden="true" />
              admin@nashos.ai
            </a>
            {PHONE_DISPLAY && (
              <a className="hp-util-mail hp-hide-s" href={`tel:${PHONE_E164}`}>
                <Phone className="hp-ic" aria-hidden="true" />
                {PHONE_DISPLAY}
              </a>
            )}
            <span className="hp-hide-s">Reply within one business day</span>
          </div>
          <div>
            <Link to="/demo">Book a demo</Link>
            <Link to="/contact" className="hp-hide-s">
              Contact
            </Link>
          </div>
        </div>
      </div>

      <div className="hp-wrap hp-nav-in">
        <Link to="/" className="hp-logo" aria-label="NashOS Agentic Finance">
          <NashLockup />
        </Link>

        <nav className="hp-nav" aria-label="Primary">
          {hashLinks.map((l) => (
            <a
              key={l.hash}
              href={onHome ? `#${l.hash}` : `/#${l.hash}`}
              onClick={(e) => handleHashClick(e, l.hash)}
            >
              {l.label}
            </a>
          ))}
          {pageLinks.map((l) => (
            <Link key={l.to} to={l.to} data-active={pathname === l.to}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hp-nav-actions">
          <Link to="/sign-in" className="hp-signin">
            Sign in
          </Link>
          <Link to="/try" className="hp-btn hp-btn-ghost hp-btn-sm">
            <span className="hp-long">Try with your data</span>
            <span className="hp-short">Try Nash</span>
            <span aria-hidden="true">→</span>
          </Link>
          <button
            type="button"
            className="hp-menu-btn"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobileMenu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X className="hp-ic" aria-hidden="true" />
            ) : (
              <AlignRight className="hp-ic" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="hp-mobile-menu" id="mobileMenu" hidden={!open}>
        <nav aria-label="Mobile">
          {hashLinks.map((l) => (
            <a
              key={l.hash}
              href={onHome ? `#${l.hash}` : `/#${l.hash}`}
              onClick={(e) => handleHashClick(e, l.hash)}
            >
              {l.label}
            </a>
          ))}
          {pageLinks.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link to="/sign-in" onClick={() => setOpen(false)}>
            Sign in
          </Link>
          <Link to="/try" onClick={() => setOpen(false)} className="hp-btn hp-btn-ghost">
            Try with your data <span aria-hidden="true">→</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
