"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import Logo from "@/components/Logo";
import { DEMO_MAILTO } from "@/lib/constants";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Who We Are" },
  { href: "/partners", label: "Partners" },
  { href: "/products", label: "Products & Platforms" },
  { href: "/careers", label: "Careers" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (open) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur border-b border-surface-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <Logo />

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-1">
          {links.map((l) => {
            const active = isActive(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`relative inline-flex items-center px-3 py-5 text-sm font-medium transition-colors ${
                    active
                      ? "text-brand-600"
                      : "text-slate-700 hover:text-brand-600"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute left-3 right-3 bottom-3 h-0.5 rounded-full transition-all ${
                      active ? "bg-brand-600" : "bg-transparent group-hover:bg-brand-200"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden lg:inline-flex items-center text-sm font-medium text-slate-700 hover:text-brand-600 px-3 py-2 transition-colors"
          >
            Contact
          </Link>
          <a
            href={DEMO_MAILTO}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-4 py-2 transition-colors shadow-card"
          >
            Book a demo
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-slate-700 hover:bg-surface-100 transition-colors"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden border-t border-surface-200 bg-white">
          <ul className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-1">
            {links.map((l) => {
              const active = isActive(l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`block rounded-lg px-3 py-3 text-base font-medium transition-colors ${
                      active
                        ? "bg-brand-50 text-brand-700"
                        : "text-slate-700 hover:bg-surface-50"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href="/contact"
                className="block rounded-lg px-3 py-3 text-base font-medium text-slate-700 hover:bg-surface-50"
              >
                Contact
              </Link>
            </li>
            <li className="pt-2">
              <a
                href={DEMO_MAILTO}
                className="flex items-center justify-center gap-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold px-5 py-3 shadow-card"
              >
                Book a 15-min demo
                <ArrowRight className="w-4 h-4" />
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
