import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AlignRight, X } from "lucide-react";
import nashosLogo from "@/assets/lockup-h-white.svg";

const links = [
  { hash: "from-q-to-d", label: "From Q to D" },
  { hash: "system", label: "System" },
  { hash: "inside-nash", label: "Inside Nash" },
  { hash: "for-leaders", label: "For Leaders" },
] as const;

export function SiteHeader() {
  const { pathname } = useLocation();
  const onHome = pathname === "/";
  const [open, setOpen] = useState(false);

  // Lock scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    setOpen(false);
    if (!onHome) return; // let the browser handle "/#hash" cross-route nav
    e.preventDefault();
    const el = document.getElementById(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${hash}`);
    }
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-30">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 h-16 sm:h-20 flex items-center justify-between gap-3 sm:gap-8">
        <Link to="/" className="shrink-0 flex items-center" aria-label="NashOS — Agentic Finance">
          <img
            src={nashosLogo}
            alt="NashOS — Agentic Finance"
            className="h-7 sm:h-8 lg:h-10 w-auto object-contain select-none"
            draggable={false}
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.hash}
              href={onHome ? `#${l.hash}` : `/#${l.hash}`}
              onClick={(e) => handleHashClick(e, l.hash)}
              className="nav-link"
            >
              {l.label}
            </a>
          ))}
          <Link to="/pricing" className="nav-link" data-active={pathname === "/pricing"}>
            Pricing
          </Link>
        </nav>

        <div className="flex items-center gap-3 sm:gap-5">
          <Link to="/sign-in" className="nav-link hidden sm:inline">Sign in</Link>
          <Link
            to="/try"
            className="btn-outline-gold hidden sm:inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium whitespace-nowrap"
          >
            <span className="hidden md:inline">Try with your data</span>
            <span className="md:hidden">Try Nash</span>
            <span aria-hidden>→</span>
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex items-center justify-center h-10 w-10 text-gold hover:text-gold/80 transition-colors bg-transparent border-0 outline-none focus:outline-none focus-visible:ring-0"
          >
            {open ? <X className="h-5 w-5" /> : <AlignRight className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed inset-x-0 top-16 sm:top-20 z-40 origin-top transition-all duration-300 ease-out ${
          open ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"
        }`}
      >
        <div className="mx-4 sm:mx-6 rounded-2xl border border-border bg-background/95 backdrop-blur-xl shadow-2xl p-5">
          <nav className="flex flex-col">
            {links.map((l) => (
              <a
                key={l.hash}
                href={onHome ? `#${l.hash}` : `/#${l.hash}`}
                onClick={(e) => handleHashClick(e, l.hash)}
                className="nav-link py-3 text-base border-b border-border/60"
              >
                {l.label}
              </a>
            ))}
            <Link
              to="/pricing"
              onClick={() => setOpen(false)}
              className="nav-link py-3 text-base border-b border-border/60"
            >
              Pricing
            </Link>
            <Link
              to="/sign-in"
              onClick={() => setOpen(false)}
              className="nav-link py-3 text-base"
            >
              Sign in
            </Link>
            <Link
              to="/try"
              onClick={() => setOpen(false)}
              className="btn-outline-gold mt-3 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium"
            >
              <span>Try with your data</span>
              <span aria-hidden>→</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
