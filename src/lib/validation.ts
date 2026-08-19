import { z } from "zod";

/**
 * Shared Zod schemas — the single source of truth for form validation,
 * imported by both client forms (via @hookform/resolvers' zodResolver) and
 * the API route handlers. No duplicate validation logic anywhere else.
 */

export const whatsappNumberSchema = z
  .string()
  .trim()
  .min(9, "Enter a valid WhatsApp number")
  .max(13, "Enter a valid WhatsApp number")
  .regex(/^\+?[0-9\s-]+$/, "Enter a valid WhatsApp number");

export const TALENT_CATEGORY_VALUES = [
  "video-editor",
  "videographer",
  "content-creator",
  "social-media-seo",
] as const;

export const TalentCategoryEnum = z.enum(TALENT_CATEGORY_VALUES, {
  message: "Must select one",
});

export const DOCUMENT_TYPE_VALUES = ["cv", "portfolio"] as const;

export const DocumentTypeEnum = z.enum(DOCUMENT_TYPE_VALUES);

export const MAX_CV_BYTES = 5 * 1024 * 1024; // 5MB

/**
 * CV upload, carried as base64 inside the same JSON payload as the rest of
 * the form (not multipart) — keeps the API route's existing JSON parsing,
 * origin/honeypot/timing/rate-limit pipeline untouched. `content` is the
 * base64 payload only (no `data:...;base64,` prefix — stripped client-side
 * before it ever reaches this schema). The byte-length refine recomputes
 * the real size from the base64 string rather than trusting a client-sent
 * number, since MAX_BODY_BYTES in api/talent/route.ts is only a coarse
 * pre-parse guard, not a substitute for validating the actual file.
 */
export const cvFileSchema = z
  .object({
    filename: z.string().trim().min(1).max(200),
    contentType: z.string(),
    content: z.string().min(1),
  })
  .refine((file) => file.contentType === "application/pdf", {
    message: "CV must be a PDF",
  })
  .refine(
    (file) => {
      const byteLength = Math.floor((file.content.length * 3) / 4);
      return byteLength > 0 && byteLength <= MAX_CV_BYTES;
    },
    { message: "CV must be under 5MB" },
  );

export const portfolioUrlSchema = z
  .string()
  .trim()
  .max(500)
  .url()
  .refine((value) => {
    try {
      return new URL(value).protocol === "https:";
    } catch {
      return false;
    }
  }, "URL must use https://");

// Honeypot field: real users never see or fill this input. Any non-empty
// value indicates a bot. Empty string and "not present" both pass.
const honeypotSchema = z.string().max(0).optional().or(z.literal(""));

export const TalentFormSchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    email: z.string().trim().toLowerCase().email().max(254),
    whatsappNumber: whatsappNumberSchema,
    categories: z.array(TalentCategoryEnum).min(1, "Select at least one talent type"),
    documentTypes: z.array(DocumentTypeEnum).min(1, "Select CV or Portfolio"),
    cvFile: cvFileSchema.optional(),
    portfolioUrl: portfolioUrlSchema.optional(),
    otherTalents: z.string().trim().max(500).optional(),
    company_website: honeypotSchema,
    formRenderedAt: z.number().int().positive(),
  })
  .strict()
  .superRefine((data, ctx) => {
    if (data.documentTypes.includes("cv") && !data.cvFile) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["cvFile"], message: "Attach a PDF (max 5MB)" });
    }
    if (data.documentTypes.includes("portfolio") && !data.portfolioUrl) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["portfolioUrl"],
        message: "Enter your portfolio URL",
      });
    }
  });

export const ContactFormSchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    email: z.string().trim().toLowerCase().email().max(254),
    subject: z.string().trim().min(2).max(150),
    message: z.string().trim().min(10).max(2000),
    company_website: honeypotSchema,
    formRenderedAt: z.number().int().positive(),
  })
  .strict();

export type TalentFormValues = z.infer<typeof TalentFormSchema>;
export type ContactFormValues = z.infer<typeof ContactFormSchema>;
