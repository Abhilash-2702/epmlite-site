import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Site-wide structured data ────────────────────────────────────────────
// These three emit once, on every page. Page-level schema (FAQPage,
// BreadcrumbList) is added per route via the `seo()` helper in lib/seo.ts.
//
// The @id values let page-level schema reference these instead of repeating
// them, which is what tells Google the entities are the same thing.

const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://nashos.ai/#organization",
  name: "NashOS",
  url: "https://nashos.ai",
  logo: "https://nashos.ai/og-image.png",
  email: "admin@nashos.ai",
  description:
    "NashOS is agentic finance — one continuously computed system for planning, forecasting, and decisions.",
  contactPoint: {
    "@type": "ContactPoint",
    email: "admin@nashos.ai",
    contactType: "sales",
    availableLanguage: "en",
  },
  // TODO(NAP): add `address` (PostalAddress) and `telephone` here once the
  // registered address and phone are confirmed. They must match the footer
  // and the Google Business Profile character for character.
};

const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://nashos.ai/#website",
  url: "https://nashos.ai",
  name: "NashOS",
  publisher: { "@id": "https://nashos.ai/#organization" },
};

const SOFTWARE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "NashOS",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Financial Planning & Analysis",
  operatingSystem: "Web",
  url: "https://nashos.ai",
  publisher: { "@id": "https://nashos.ai/#organization" },
  featureList: [
    "Driver-based continuous planning",
    "Multi-entity, multi-currency consolidation",
    "Agentic execution with draft-and-commit review",
    "Full audit trail on every write",
  ],
};

// ── Analytics + verification ─────────────────────────────────────────────
// Both are env-driven so the tags only render once a real value exists —
// an empty or placeholder ID is worse than no tag, because Search Console
// treats a failed verification as a signal and GA4 records junk sessions.
// Set these in Vercel → Project → Settings → Environment Variables.
// See docs/seo-setup.md for how to obtain each value.
const GA4_ID = import.meta.env.VITE_GA4_ID as string | undefined;
const GSC_TOKEN = import.meta.env.VITE_GSC_TOKEN as string | undefined;

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#194071" },
      ...(GSC_TOKEN ? [{ name: "google-site-verification", content: GSC_TOKEN }] : []),
      { title: "NashOS — Agentic Finance" },
      {
        name: "description",
        content:
          "NashOS runs your finance as one continuously computed system — multi-entity, multi-currency, audit-ready from day one.",
      },
      { name: "author", content: "NashOS" },
      { property: "og:title", content: "NashOS — Agentic Finance" },
      {
        property: "og:description",
        content: "A unified system for planning, forecasting, and decisions.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://nashos.ai" },
      { property: "og:image", content: "https://nashos.ai/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "NashOS — Agentic Finance" },
      {
        name: "twitter:description",
        content: "A unified system for planning, forecasting, and decisions.",
      },
      { name: "twitter:image", content: "https://nashos.ai/og-image.png" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
      { rel: "icon", href: "/favicon.ico", sizes: "48x48" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Roboto:wght@400;500;700&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(ORG_JSON_LD) },
      { type: "application/ld+json", children: JSON.stringify(WEBSITE_JSON_LD) },
      { type: "application/ld+json", children: JSON.stringify(SOFTWARE_JSON_LD) },
      ...(GA4_ID
        ? [
            { src: `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`, async: true },
            {
              children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA4_ID}');`,
            },
          ]
        : []),
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

// Inline critical CSS — applies during HTML parse, BEFORE the external CSS
// file loads. Without this, the browser shows white default body background
// for ~one paint, then jumps to dark when styles.css arrives. Setting the
// canonical bg + fg colors here ensures no white flash even on slow networks.
const CRITICAL_CSS = `
html, body { background-color: #0d1729; color: #edeae2; margin: 0; padding: 0; }
html { color-scheme: dark; }
`;

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{ __html: CRITICAL_CSS }} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
