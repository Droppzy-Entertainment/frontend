import type { NextConfig } from "next";

// Static, per-response-invariant security headers live here. The
// Content-Security-Policy header is intentionally NOT set here — it is set
// per-request in middleware.ts because it must embed a fresh per-request
// nonce (required for the strict `script-src 'self' 'nonce-{n}' 'strict-dynamic'`
// policy documented in SECURITY.md).
const STATIC_SECURITY_HEADERS = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(), usb=()",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "off",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    // Empty in v1 — no remote images are fetched (all imagery is either the
    // real local logo asset or CSS/SVG placeholders, see PlaceholderImage).
    // PLACEHOLDER: v2 documented addition — add `{ protocol: 'https', hostname: 'i.ytimg.com' }`
    // here once real YouTube thumbnail embeds replace the placeholder video cards.
    remotePatterns: [],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: STATIC_SECURITY_HEADERS,
      },
    ];
  },
};

export default nextConfig;
