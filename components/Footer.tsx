import Link from "next/link";
import { Mail } from "lucide-react";
import Logo from "@/components/Logo";
import NewsletterSignup from "@/components/NewsletterSignup";
import { DEMO_EMAIL } from "@/lib/constants";

// lucide-react v1 dropped brand icons; inline these to avoid extra deps.
function LinkedinIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}
function TwitterIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

type Col = {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
};

const cols: Col[] = [
  {
    title: "Product",
    links: [
      { label: "Products & Platforms", href: "/products" },
      { label: "Live demo", href: "/demo" },
      { label: "ROI calculator", href: "/calculator" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Roadmap", href: "/roadmap" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "For SaaS", href: "/for/saas" },
      { label: "For consulting", href: "/for/consulting" },
      { label: "For hardware", href: "/for/hardware" },
      { label: "For services", href: "/for/services" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "FP&A starter pack", href: "/resources" },
      { label: "vs Anaplan", href: "/vs/anaplan" },
      { label: "vs Adaptive", href: "/vs/adaptive" },
      { label: "vs Excel", href: "/vs/excel" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Who We Are", href: "/about" },
      { label: "Partners", href: "/partners" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-sidebar text-slate-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-7 gap-8">
          <div className="col-span-2 lg:col-span-3">
            <Logo monochrome href={null} />
            <p className="mt-3 text-sm text-slate-400 max-w-xs">
              AI-native financial planning. Forecast in minutes, not weeks.
            </p>
            <div className="mt-5 max-w-sm">
              <NewsletterSignup variant="footer" />
            </div>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={`mailto:${DEMO_EMAIL}`}
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-sidebar-hover hover:bg-sidebar-active text-slate-300 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-sidebar-hover hover:bg-sidebar-active text-slate-300 transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-sidebar-hover hover:bg-sidebar-active text-slate-300 transition-colors"
                aria-label="X / Twitter"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-display font-semibold text-sm text-white uppercase tracking-wider">
                {c.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-sidebar-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} NashOS. All rights reserved.</p>
          <p>Built for finance teams that move fast.</p>
        </div>
      </div>
    </footer>
  );
}
