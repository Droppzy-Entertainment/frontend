import { z } from "zod";

/**
 * Server-side environment schema, validated once at module scope. Importing
 * this module anywhere fails fast (throws Zod's readable error) if a
 * required variable is missing or malformed, rather than surfacing a
 * confusing runtime error deep inside a request handler.
 *
 * IMPORTANT: Client Components that need a NEXT_PUBLIC_* value must read
 * `process.env.NEXT_PUBLIC_X` literally, inline, at the call site — NOT via
 * this `env` object — because Next's compiler only statically inlines
 * direct `process.env.NEXT_PUBLIC_*` member accesses into the client
 * bundle. Re-exporting through this module would not survive bundling for
 * client code (this module also pulls in server-only secrets, so it must
 * never be imported from a "use client" file regardless).
 */
const envSchema = z.object({
  RESEND_API_KEY: z.string().default("re_placeholder"),
  MAIL_FROM_ADDRESS: z.string().email().default("onboarding@resend.dev"),
  CONTACT_RECIPIENT_EMAIL: z.string().email().default("droppzyentertainment@gmail.com"),
  TALENT_RECIPIENT_EMAIL: z.string().email().default("droppzyentertainment@gmail.com"),
  ALLOWED_ORIGINS: z.string().optional(),
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(5),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(600000),
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_YOUTUBE_CHANNEL_URL: z.string().url().default("https://youtube.com"),
});

export const env = envSchema.parse(process.env);

export type Env = z.infer<typeof envSchema>;
