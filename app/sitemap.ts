import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: { path: string; priority: number; freq: "weekly" | "monthly" }[] = [
    { path: "",            priority: 1.0, freq: "weekly" },
    { path: "/demo",       priority: 0.9, freq: "weekly" },
    { path: "/products",   priority: 0.8, freq: "monthly" },
    { path: "/about",      priority: 0.7, freq: "monthly" },
    { path: "/contact",    priority: 0.7, freq: "monthly" },
    { path: "/partners",   priority: 0.6, freq: "monthly" },
    { path: "/careers",    priority: 0.5, freq: "monthly" },
    { path: "/vs/anaplan", priority: 0.7, freq: "monthly" },
    { path: "/vs/adaptive",priority: 0.7, freq: "monthly" },
    { path: "/vs/excel",   priority: 0.7, freq: "monthly" },
  ];
  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}
