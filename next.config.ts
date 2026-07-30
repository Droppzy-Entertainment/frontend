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
    // picsum.photos: TEMPORARY stock photography for the About and Videos
    // sections (real cast/thumbnail stills still needed — see the
    // PLACEHOLDER comments in About.tsx / Videos.tsx). Fetched server-side
    // by Next's image optimizer, so the browser only ever requests
    // same-origin `/_next/image` — the `img-src 'self'` CSP in
    // lib/security.ts does not need to change.
    // PLACEHOLDER: v2 documented addition — add `{ protocol: 'https', hostname: 'i.ytimg.com' }`
    // here once real YouTube thumbnail embeds replace the placeholder video cards.
    remotePatterns: [{ protocol: "https", hostname: "picsum.photos" }],
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
