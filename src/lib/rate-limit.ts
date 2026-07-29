import { env } from "./env";

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
}

export interface RateLimiter {
  check(key: string): Promise<RateLimitResult>;
}

/**
 * Fixed-window in-memory rate limiter. Sufficient for a single-instance
 * deployment/demo; state is process-local and does NOT synchronize across
 * multiple serverless instances/regions.
 *
 * v2 swap point: replace with an Upstash/Redis-backed implementation of the
 * same `RateLimiter` interface (e.g. a sliding-window Redis script) — no
 * caller changes required, since callers only depend on `RateLimiter`.
 */
export class InMemoryRateLimiter implements RateLimiter {
  private readonly max: number;
  private readonly windowMs: number;
  private readonly hits = new Map<string, { count: number; resetAt: number }>();

  constructor(max: number, windowMs: number) {
    this.max = max;
    this.windowMs = windowMs;
  }

  async check(key: string): Promise<RateLimitResult> {
    const now = Date.now();
    const entry = this.hits.get(key);

    if (!entry || entry.resetAt <= now) {
      const resetAt = now + this.windowMs;
      this.hits.set(key, { count: 1, resetAt });
      return { success: true, remaining: this.max - 1, resetAt };
    }

    if (entry.count >= this.max) {
      return { success: false, remaining: 0, resetAt: entry.resetAt };
    }

    entry.count += 1;
    return { success: true, remaining: this.max - entry.count, resetAt: entry.resetAt };
  }
}

// Separate singleton instances per form so one form's traffic can't exhaust
// the other's quota.
export const talentLimiter: RateLimiter = new InMemoryRateLimiter(
  env.RATE_LIMIT_MAX,
  env.RATE_LIMIT_WINDOW_MS,
);
export const contactLimiter: RateLimiter = new InMemoryRateLimiter(
  env.RATE_LIMIT_MAX,
  env.RATE_LIMIT_WINDOW_MS,
);
