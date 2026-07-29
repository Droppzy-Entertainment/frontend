/**
 * Security primitives — CSP builder, the static header list (kept in sync
 * with next.config.ts's `headers()`), and the anti-abuse helpers used by
 * the API routes. This file is the documented single source of truth for
 * header values; next.config.ts's STATIC_SECURITY_HEADERS array must match
 * the values exported here.
 */

export function buildCSP(nonce: string): string {
  const directives = [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    // 'unsafe-inline' is scoped to styles only: Framer Motion sets inline
    // `style` attributes for animation. Style injection isn't a
    // script-execution vector, so script-src stays fully locked down.
    "style-src 'self' 'unsafe-inline'",
    // img-src/frame-src YouTube allowances are pre-added for a documented
    // v2 real-embed swap; v1 makes zero real YouTube network calls.
    "img-src 'self' data: https://i.ytimg.com",
    "font-src 'self'",
    "connect-src 'self'",
    "frame-src https://www.youtube-nocookie.com",
    "frame-ancestors 'none'",
    "form-action 'self'",
    "upgrade-insecure-requests",
  ];
  return directives.join("; ");
}

// Kept identical to the `STATIC_SECURITY_HEADERS` array in next.config.ts.
export const STATIC_SECURITY_HEADERS: Array<[string, string]> = [
  ["Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload"],
  ["X-Frame-Options", "DENY"],
  ["X-Content-Type-Options", "nosniff"],
  ["Referrer-Policy", "strict-origin-when-cross-origin"],
  [
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(), usb=()",
  ],
  ["X-DNS-Prefetch-Control", "off"],
];

/** True if the honeypot field was filled in — i.e. the submission is a bot. */
export function checkHoneypot(value?: string): boolean {
  return Boolean(value && value.length > 0);
}

/**
 * True if the timing check PASSED (the form was open at least `minMs`
 * before submission). A submission faster than that is treated as
 * automated and silently accepted without sending mail.
 */
export function checkTiming(renderedAt: number, minMs = 2000): boolean {
  return Date.now() - renderedAt >= minMs;
}

/** Reads the first IP in X-Forwarded-For, falling back to a loopback address. */
export function getClientIp(req: Request): string {
  const header = req.headers.get("x-forwarded-for");
  if (!header) return "127.0.0.1";
  const [first] = header.split(",");
  const ip = first?.trim();
  return ip && ip.length > 0 ? ip : "127.0.0.1";
}

/**
 * Verifies the request's Origin (falling back to Referer) is present in
 * `allowedOrigins`. Returns false on any parse failure or if neither header
 * is present.
 */
export function verifyOrigin(req: Request, allowedOrigins: string[]): boolean {
  const originHeader = req.headers.get("origin") ?? req.headers.get("referer");
  if (!originHeader) return false;

  try {
    const origin = new URL(originHeader).origin;
    return allowedOrigins.includes(origin);
  } catch {
    return false;
  }
}
