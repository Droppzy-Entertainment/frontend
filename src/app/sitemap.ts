import type { MetadataRoute } from "next";

// PLACEHOLDER: falls back to localhost only if NEXT_PUBLIC_SITE_URL is
// unset (e.g. a local build before .env.local is configured) — production
// must set the real canonical site URL.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

// Single root-URL entry — in-page anchors (#about, #create, ...) aren't
// separately crawlable pages, so they aren't listed here.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
