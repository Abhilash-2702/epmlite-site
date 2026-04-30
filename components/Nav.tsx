"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import Logo from "@/components/Logo";
import { DEMO_MAILTO } from "@/lib/constants";

type Item = { href: string; label: string; description?: string };

type NavEntry =
  | { type: "link"; href: string; label: string }
  | { type: "group"; label: string; items: Item[] };

const NAV: NavEntry[] = [
  { type: "link", href: "/", label: "Home" },
  {
    type: "group",
    label: "Product",
    items: [
      { href: "/products",   label: "Products & Platforms", description: "All 9 pillars in production today." },
      { href: "/demo",       label: "Live demo",            description: "Touch the product on sample data." },
      { href: "/calculator", label: "ROI calculator",       description: "Quantify your close-cycle savings." },
      { href: "/#pricing",   label: "Pricing",              description: "Starter $99 · Pro $499 · Enterprise." },
      { href: "/roadmap",    label: "Roadmap",              description: "What's shipping next." },
    ],
  },
  {
    type: "group",
    label: "Solutions",
    items: [
      { href: "/for/saas",       label: "For SaaS",       description: "ARR, cohorts, runway in one cube." },
      { href: "/for/consulting", label: "For consulting", description: "Utilization × project margin × bench." },
      { href: "/for/hardware",   label: "For hardware",   description: "BOM, yield, unit economics." },
      { href: "/for/services",   label: "For services",   description: "Recurring + project + ad-hoc revenue." },
    ],
  },
  {
    type: "group",
    label: "Resources",
    items: [
      { href: "/blog",        label: "Blog",              description: "FP&A patterns. No fluff." },
      { href: "/resources",   label: "FP&A starter pack", description: "Free Excel templates · email gate." },
      { href: "/vs/anaplan",  label: "vs Anaplan",        description: "AI-native, without the 6-month rollout." },
      { href: "/vs/adaptive", label: "vs Adaptive",       description: "Built for the LLM era, not retrofitted." },
      { href: "/vs/excel",    label: "vs Excel",          description: "When the spreadsheet stops scaling." },
    ],
  },
  {
    type: "group",
    label: "Company",
    items: [
      { href: "/about",    label: "Who We Are", description: "The team and the why." },
      { href: "/partners", label: "Partners",   description: "Implementation + platform partners." },
      { href: "/careers",  label: "Careers",    description: "Profiles we want to meet." },
      { href: "/contact",  label: "Contact",    description: "Drop us a note." },
    ],
  },
];

export default function Nav() {
  const pathname = usePathname();
  const [drawer, setDrawer] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  // Close mobile drawer on route change
  useEffect(() => {
    setDrawer(false);
    setOpenGroup(null);
    setOpenMobileGroup(null);
  }, [pathname]);

  // Lock body scroll when mobile drawer open
  useEffect(() => {
    if (drawer) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, [drawer]);

  // Click outside / Escape closes any open desktop dropdown
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target as Node)) setOpenGroup(null);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenGroup(null);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const isLinkActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const isGroupActive = (items: Item[]) =>
    items.some((i) => i.href !== "/" && pathname.startsWith(i.href.split("#")[0] || "/"));

  return (
    <header
      ref={navRef}
      className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur border-b border-surface-200"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        <Logo />

        {/* Desktop ribbon */}
        <ul className="hidden lg:flex items-center gap-0.5">
          {NAV.map((entry) => {
            if (entry.type === "link") {
              const active = isLinkActive(entry.href);
              return (
                <li key={entry.href}>
                  <Link
                    href={entry.href}
                    className={`relative inline-flex items-center px-3 py-5 text-sm font-medium transition-colors ${
                      active ? "text-brand-600" : "text-slate-700 hover:text-brand-600"
                    }`}
                  >
                    {entry.label}
                    {active && (
                      <span className="absolute left-3 right-3 bottom-3 h-0.5 rounded-full bg-brand-600" />
                    )}
                  </Link>
                </li>
              );
            }
            const isOpen = openGroup === entry.label;
            const isActive = isGroupActive(entry.items);
            return (
              <li key={entry.label} className="relative">
                <button
                  onClick={() => setOpenGroup(isOpen ? null : entry.label)}
                  className={`relative inline-flex items-center gap-1 px-3 py-5 text-sm font-medium transition-colors ${
                    isActive || isOpen ? "text-brand-600" : "text-slate-700 hover:text-brand-600"
                  }`}
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                >
                  {entry.label}
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                  {isActive && !isOpen && (
                    <span className="absolute left-3 right-7 bottom-3 h-0.5 rounded-full bg-brand-600" />
                  )}
                </button>
                {isOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-[420px] rounded-2xl bg-white border border-surface-200 shadow-elevated p-2 animate-in fade-in slide-in-from-top-1 duration-150">
                    <ul>
                      {entry.items.map((item) => {
                        const itemActive = pathname.startsWith(item.href.split("#")[0] || "/");
                        return (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              onClick={() => setOpenGroup(null)}
                              className={`block rounded-xl px-3 py-2.5 transition-colors ${
                                itemActive
                                  ? "bg-brand-50 text-brand-700"
                                  : "hover:bg-surface-50 text-slate-700"
                              }`}
                            >
                              <span className="block font-display font-semibold text-sm">
                                {item.label}
                              </span>
                              {item.description && (
                                <span className="block text-xs text-slate-500 mt-0.5 leading-snug">
                                  {item.description}
                                </span>
                              )}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={DEMO_MAILTO}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-4 py-2 transition-colors shadow-card"
          >
            Book a demo
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={() => setDrawer((o) => !o)}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-slate-700 hover:bg-surface-100 transition-colors"
            aria-label={drawer ? "Close menu" : "Open menu"}
            aria-expanded={drawer}
          >
            {drawer ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {drawer && (
        <div className="lg:hidden border-t border-surface-200 bg-white max-h-[calc(100vh-4rem)] overflow-y-auto">
          <ul className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-1">
            {NAV.map((entry) => {
              if (entry.type === "link") {
                const active = isLinkActive(entry.href);
                return (
                  <li key={entry.href}>
                    <Link
                      href={entry.href}
                      className={`block rounded-lg px-3 py-3 text-base font-medium transition-colors ${
                        active ? "bg-brand-50 text-brand-700" : "text-slate-700 hover:bg-surface-50"
                      }`}
                    >
                      {entry.label}
                    </Link>
                  </li>
                );
              }
              const isOpen = openMobileGroup === entry.label;
              const isActive = isGroupActive(entry.items);
              return (
                <li key={entry.label}>
                  <button
                    onClick={() => setOpenMobileGroup(isOpen ? null : entry.label)}
                    className={`w-full flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium transition-colors ${
                      isActive ? "text-brand-700 bg-brand-50/50" : "text-slate-700 hover:bg-surface-50"
                    }`}
                    aria-expanded={isOpen}
                  >
                    {entry.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <ul className="ml-2 pl-3 my-1 space-y-0.5 border-l-2 border-brand-100">
                      {entry.items.map((item) => {
                        const itemActive = pathname.startsWith(item.href.split("#")[0] || "/");
                        return (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                                itemActive
                                  ? "text-brand-700 font-semibold"
                                  : "text-slate-600 hover:text-brand-600 hover:bg-surface-50"
                              }`}
                            >
                              {item.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
            <li className="pt-3">
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
