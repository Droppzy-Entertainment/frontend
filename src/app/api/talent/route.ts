import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { TalentFormSchema } from "@/lib/validation";
import { checkHoneypot, checkTiming, getClientIp, verifyOrigin } from "@/lib/security";
import { talentLimiter } from "@/lib/rate-limit";
import { sendTalentSubmissionEmail } from "@/lib/mail";
import { env } from "@/lib/env";

// ~8MB — a coarse guard against oversized payloads, checked via the
// Content-Length header before the body is ever read. Sized for a base64
// -encoded CV upload (lib/validation.ts's MAX_CV_BYTES = 5MB; base64
// encoding adds ~37% overhead, so 5MB -> ~6.7MB, plus headroom for the
// rest of the JSON payload). The authoritative per-file size check still
// happens in TalentFormSchema's cvFileSchema — this is only a fast
// pre-parse reject for grossly oversized requests.
const MAX_BODY_BYTES = 8 * 1024 * 1024;

/**
 * Builds the Origin/Referer allow-list from server-only env vars. Uses the
 * validated `env` object (from lib/env.ts) rather than raw
 * `process.env.NEXT_PUBLIC_SITE_URL` string concatenation — this file is
 * server-only (route handlers never ship to the client bundle) and already
 * transitively depends on lib/env.ts via lib/mail.ts, so there's no
 * bundler-inlining reason to bypass the Zod-validated, already-parsed
 * `env.NEXT_PUBLIC_SITE_URL` / `env.ALLOWED_ORIGINS` values (unlike the
 * literal `process.env.NEXT_PUBLIC_X` pattern required in Client
 * Components — see lib/env.ts's docstring).
 */
function getAllowedOrigins(): string[] {
  const origins = new Set<string>();

  const addOrigin = (value: string) => {
    try {
      origins.add(new URL(value).origin);
    } catch {
      // Ignore malformed entries rather than failing the request.
    }
  };

  addOrigin(env.NEXT_PUBLIC_SITE_URL);
  if (env.ALLOWED_ORIGINS) {
    env.ALLOWED_ORIGINS.split(",")
      .map((origin) => origin.trim())
      .filter(Boolean)
      .forEach(addOrigin);
  }

  return Array.from(origins);
}

function methodNotAllowed(): NextResponse {
  return NextResponse.json(
    { error: "Method not allowed." },
    { status: 405, headers: { Allow: "POST" } },
  );
}

// Explicitly handle every other common method with a 405 + Allow header,
// rather than relying on the App Router's undocumented-here default
// behavior for methods with no matching export.
export async function GET() {
  return methodNotAllowed();
}
export async function PUT() {
  return methodNotAllowed();
}
export async function PATCH() {
  return methodNotAllowed();
}
export async function DELETE() {
  return methodNotAllowed();
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // 2. Origin/Referer check.
    if (!verifyOrigin(req, getAllowedOrigins())) {
      return NextResponse.json({ error: "Request origin not allowed." }, { status: 403 });
    }

    // 3. Body size guard — reject oversized payloads before reading them.
    const contentLength = req.headers.get("content-length");
    if (contentLength && Number(contentLength) > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Request body too large." }, { status: 413 });
    }

    // 4. Parse JSON.
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Malformed request body." }, { status: 400 });
    }

    // 5. Schema validation (TalentFormSchema is .strict() — unknown keys fail).
    const result = TalentFormSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed.", fields: result.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const data = result.data;
    const ip = getClientIp(req);

    // 6. Honeypot — real users never fill this field. A bot that does gets
    // the SAME success shape back, silently, with no email sent.
    if (checkHoneypot(data.company_website)) {
      console.warn(`[api/talent] honeypot triggered — ip=${ip}`);
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // 7. Timing — submissions faster than checkTiming's minMs are treated
    // as automated. Same silent-success treatment, no email sent.
    if (!checkTiming(data.formRenderedAt)) {
      console.warn(`[api/talent] timing check failed — ip=${ip}`);
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // 8. Rate limit (route-specific key suffix so /api/talent and
    // /api/contact each get their own quota per IP).
    const rateResult = await talentLimiter.check(`${ip}:talent`);
    if (!rateResult.success) {
      const retryAfterSeconds = Math.max(1, Math.ceil((rateResult.resetAt - Date.now()) / 1000));
      return NextResponse.json(
        { error: "Too many submissions. Please try again shortly." },
        { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } },
      );
    }

    // 9. lib/mail.ts's renderTalentEmailHtml already HTML-escapes every
    // field it interpolates into the email body via escapeHtml. The one
    // field that also reaches a header-adjacent position — the outbound
    // `subject` line (`New Talent Form Submission from ${data.name}
    // (${data.categories.join(", ")})`) — draws its category list from
    // strict Zod enum values here (TalentCategoryEnum), so each entry can
    // only ever be one of four fixed literal strings and needs no
    // redundant sanitization (unlike Contact's free-text `subject` field —
    // see api/contact/route.ts, which does add one).

    // 10. Send email.
    try {
      await sendTalentSubmissionEmail(data);
    } catch (error) {
      console.error("[api/talent] failed to send submission email:", error);
      return NextResponse.json(
        { error: "Failed to submit — please try again later." },
        { status: 502 },
      );
    }

    // 11. Success.
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    // 12. Catch-all — never leak a stack trace, file path, or dependency
    // version to the response body.
    console.error("[api/talent] unhandled error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
