"use client";

import { useEffect, useState } from "react";
import { DEMO_MAILTO } from "@/lib/constants";

const links = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur border-b border-surface-200"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="font-display font-bold text-xl text-brand-600 tracking-tight">
          EPM Lite
        </a>
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-brand-600 transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={DEMO_MAILTO}
          className="inline-flex items-center rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-4 py-2 transition-colors shadow-card"
        >
          Book a demo
        </a>
      </nav>
    </header>
  );
}
