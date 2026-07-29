import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { buildCSP } from "@/lib/security";

/**
 * Per-request CSP nonce + security-header middleware.
 *
 * LOCATION NOTE: this file lives at `src/middleware.ts`, not at the
 * project root (`frontend/middleware.ts`), even though both the task brief
 * and the plan's folder tree listed the root path. Confirmed directly
 * against Next.js's docs (file-conventions/middleware + the src-folder
 * convention page): "Create a middleware.ts file in the project root, or
 * inside `src` if applicable, so that it is located at the same level as
 * `pages` or `app`" and "If you're using Middleware, ensure it is placed
 * inside the `src` folder." This project's `app` router lives at
 * `src/app`, so middleware must sit at `src/middleware.ts` to be
 * discovered at all — a root-level file would silently never run.
 *
 * Follows the Next.js-documented CSP nonce pattern: generate a fresh nonce,
 * clone the incoming request headers and stamp `x-nonce` onto them, build a
 * `NextResponse.next()` that carries those modified request headers forward
 * (so Server Components can read the nonce back out via `next/headers`'
 * `headers()`), then set the CSP as a *response* header on that same
 * response object.
 *
 * --- Runtime choice: default Edge runtime, NO middleware-level rate-limit
 * pre-check ---
 *
 * The task considered an optional coarse IP-only rate-limit pre-check on
 * `/api/*` here, sharing the same `talentLimiter`/`contactLimiter`
 * singletons the route handlers use, with a fallback to Node.js middleware
 * runtime if Edge's module-scope state felt unreliable, or dropping the
 * pre-check entirely otherwise. This file drops the pre-check entirely and
 * stays on the default Edge runtime, for two independent reasons:
 *
 * 1. Correctness: `RateLimiter.check()` (lib/rate-limit.ts) is a
 *    consume-on-call check, not a side-effect-free peek — every call
 *    increments the fixed window's hit counter. Calling it once here and
 *    again in the route handler for the *same* request would double-count
 *    every legitimate submission (2 hits per request instead of 1), silently
 *    halving the effective RATE_LIMIT_MAX and breaking the plan's own manual
 *    smoke test ("6 rapid submits -> 6th returns 429", which assumes each
 *    request consumes exactly one unit).
 * 2. Reliability: even ignoring (1), Edge middleware does not guarantee a
 *    single persistent process — `InMemoryRateLimiter`'s module-scope `Map`
 *    can be reset across isolate recycles/regions, so an Edge-side counter
 *    is not trustworthy on its own. Making it trustworthy would mean
 *    opting into Next 15's experimental `experimental.nodeMiddleware` flag
 *    in next.config.ts purely to back up a pre-check that is explicitly
 *    documented as non-authoritative — the route handlers' own check
 *    (which always runs under the Node.js runtime for App Router route
 *    handlers) is the real gate and is sufficient on its own.
 *
 * Net effect: middleware does only fast, side-effect-free nonce + CSP work
 * (exactly the workload Edge middleware is designed for); rate limiting
 * happens exactly once, authoritatively, inside each route handler.
 */
export function middleware(request: NextRequest) {
  // Fresh per-request nonce: base64-encoded random UUID via the Web Crypto
  // API + `Buffer` (both available in Next's Edge middleware runtime —
  // this is the exact pattern from Next.js's own CSP documentation).
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const csp = buildCSP(nonce);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  response.headers.set("Content-Security-Policy", csp);

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
