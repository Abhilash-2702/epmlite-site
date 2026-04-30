import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { POSTS } from "@/lib/posts";

const INDUSTRIES = ["saas", "consulting", "hardware", "services"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: { path: string; priority: number; freq: "weekly" | "monthly" | "daily" }[] = [
    { path: "",            priority: 1.0, freq: "weekly" },
    { path: "/demo",       priority: 0.95, freq: "weekly" },
    { path: "/calculator", priority: 0.9, freq: "weekly" },
    { path: "/products",   priority: 0.85, freq: "monthly" },
    { path: "/resources",  priority: 0.85, freq: "weekly" },
    { path: "/blog",       priority: 0.85, freq: "weekly" },
    { path: "/changelog",  priority: 0.7, freq: "weekly" },
    { path: "/roadmap",    priority: 0.7, freq: "monthly" },
    { path: "/about",      priority: 0.7, freq: "monthly" },
    { path: "/contact",    priority: 0.7, freq: "monthly" },
    { path: "/partners",   priority: 0.6, freq: "monthly" },
    { path: "/careers",    priority: 0.5, freq: "monthly" },
    { path: "/vs/anaplan", priority: 0.7, freq: "monthly" },
    { path: "/vs/adaptive",priority: 0.7, freq: "monthly" },
    { path: "/vs/excel",   priority: 0.7, freq: "monthly" },
  ];
  const industryRoutes = INDUSTRIES.map((slug) => ({
    path: `/for/${slug}`,
    priority: 0.7,
    freq: "monthly" as const,
  }));
  const blogRoutes = POSTS.map((p) => ({
    path: `/blog/${p.slug}`,
    priority: 0.65,
    freq: "monthly" as const,
  }));

  return [...staticRoutes, ...industryRoutes, ...blogRoutes].map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}
