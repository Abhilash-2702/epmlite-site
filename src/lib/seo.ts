// Single source of truth for per-page SEO head tags.
//
// Every route calls `seo()` from its `head()` so that title, description,
// canonical, Open Graph, Twitter and (optionally) FAQPage / BreadcrumbList
// structured data are emitted consistently. Before this existed, routes set
// an ad-hoc `meta` array and no route emitted a canonical at all.
//
// Site-wide tags (Organization, WebSite, SoftwareApplication, GA4, Search
// Console) live in __root.tsx — not here — because they must appear once.

export const SITE_URL = "https://nashos.ai";
export const SITE_NAME = "NashOS";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

/** Absolute, canonical-safe URL for a route path. */
export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  const clean = path === "/" ? "/" : `/${path.replace(/^\/+|\/+$/g, "")}`;
  return `${SITE_URL}${clean}`;
}

export type Faq = { question: string; answer: string };
export type Crumb = { name: string; path: string };

type SeoInput = {
  /** Full <title>. Aim for <= 60 chars, primary keyword first, brand last. */
  title: string;
  /** Meta description. Aim for 120-160 chars. */
  description: string;
  /** Route path, e.g. "/system". Drives canonical + og:url. */
  path: string;
  /** Absolute image URL for OG/Twitter cards. */
  image?: string;
  type?: "website" | "article";
  /** Emits FAQPage structured data. Pass the same list the page renders. */
  faq?: Faq[];
  /** Emits BreadcrumbList. Home is prepended automatically. */
  breadcrumbs?: Crumb[];
  /** Keep the page out of the index (thin or duplicate pages). */
  noindex?: boolean;
};

export function seo({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  faq,
  breadcrumbs,
  noindex = false,
}: SeoInput) {
  const url = absoluteUrl(path);

  const meta: Array<Record<string, string>> = [
    { title },
    { name: "description", content: description },
    {
      name: "robots",
      content: noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large",
    },
    { property: "og:type", content: type },
    { property: "og:url", content: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: image },
    { property: "og:site_name", content: SITE_NAME },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
  ];

  // Canonical — absent from every route before this helper existed. Without it,
  // query-string and trailing-slash variants of a URL are separate documents.
  const links: Array<Record<string, string>> = [{ rel: "canonical", href: url }];

  const scripts: Array<{ type: string; children: string }> = [];

  if (faq?.length) {
    scripts.push({
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }),
    });
  }

  if (breadcrumbs?.length) {
    const trail: Crumb[] = [{ name: "Home", path: "/" }, ...breadcrumbs];
    scripts.push({
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: trail.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
          item: absoluteUrl(c.path),
        })),
      }),
    });
  }

  return { meta, links, scripts };
}
