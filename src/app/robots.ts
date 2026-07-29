import type { MetadataRoute } from "next";

// PLACEHOLDER: falls back to localhost only if NEXT_PUBLIC_SITE_URL is
// unset (e.g. a local build before .env.local is configured) — production
// must set the real canonical site URL.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
