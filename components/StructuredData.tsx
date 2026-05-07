import { SITE_URL } from "@/lib/constants";

/**
 * Sitewide JSON-LD structured data. Renders <script type="application/ld+json">
 * tags so Google can parse Organization + WebSite + SoftwareApplication
 * entities and surface rich results.
 *
 * One mounted instance per page (in layout.tsx). Page-specific schemas
 * (BlogPosting, FAQPage, etc) get their own components.
 */

const ORGANIZATION = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "NashOS",
  url: SITE_URL,
  logo: `${SITE_URL}/icon`,
  description:
    "Agentic finance platform for modern teams. Close in days, forecast in minutes, audit-grade trail on every change.",
  email: "admin@nashos.ai",
  sameAs: [],
};

const WEBSITE = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "NashOS",
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-US",
};

const SOFTWARE_APPLICATION = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#software`,
  name: "NashOS",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Financial Planning and Analysis (FP&A) software",
  operatingSystem: "Web · Self-hosted (Postgres + Node)",
  description:
    "Agentic finance platform with 35+ AI tools, 15 forecast algorithms, and a 9-dimension financial cube. Cuts close cycles from 12 days to 4. Built for finance teams switching from Anaplan, Adaptive, Oracle EPM, OneStream, SAP BPC, Microsoft BI, Vena, Cube, or Excel.",
  offers: [
    {
      "@type": "Offer",
      name: "Starter",
      price: "99",
      priceCurrency: "USD",
      priceSpecification: { "@type": "PriceSpecification", price: "99", priceCurrency: "USD", unitText: "MONTH" },
      url: `${SITE_URL}/#pricing`,
    },
    {
      "@type": "Offer",
      name: "Pro",
      price: "499",
      priceCurrency: "USD",
      priceSpecification: { "@type": "PriceSpecification", price: "499", priceCurrency: "USD", unitText: "MONTH" },
      url: `${SITE_URL}/#pricing`,
    },
    {
      "@type": "Offer",
      name: "Enterprise",
      url: `${SITE_URL}/contact`,
    },
  ],
  publisher: { "@id": `${SITE_URL}/#organization` },
  url: SITE_URL,
  featureList: [
    "Agentic AI chat with 35+ tools",
    "15 forecast algorithms (Linear · ARIMA · Holt-Winters · Random Forest · Gradient Boosting · etc)",
    "9-dimension cube (Entity × Account × Period × Scenario × Version × Currency × Year × Product × Department)",
    "Driver-based planning",
    "What-if scenario modelling",
    "Audit trail with before/after JSON on every mutation",
    "P&L · Balance Sheet · Cash Flow reports",
    "Connectors: REST · SFTP · Excel · CSV",
    "RBAC: super_admin · admin · planner · viewer",
    "Draft-before-commit on every chat write",
  ],
};

export function SiteStructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SOFTWARE_APPLICATION) }}
      />
    </>
  );
}

export function BlogPostingSchema({
  slug,
  title,
  description,
  date,
}: {
  slug: string;
  title: string;
  description: string;
  date: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SITE_URL}/blog/${slug}`,
    headline: title,
    description,
    datePublished: date,
    dateModified: date,
    url: `${SITE_URL}/blog/${slug}`,
    image: `${SITE_URL}/opengraph-image`,
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${slug}` },
    inLanguage: "en-US",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function FaqSchema({ items }: { items: { question: string; answer: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.answer,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbSchema({
  trail,
}: {
  trail: { name: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: t.url.startsWith("http") ? t.url : `${SITE_URL}${t.url}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
