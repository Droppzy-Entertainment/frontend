import { z } from "zod";

/**
 * Shared Zod schemas — the single source of truth for form validation,
 * imported by both client forms (via @hookform/resolvers' zodResolver) and
 * the API route handlers. No duplicate validation logic anywhere else.
 */

export const httpsUrlSchema = z
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

export const TALENT_CATEGORY_VALUES = [
  "comedy",
  "docuseries",
  "late-night",
  "music",
  "shorts-live",
  "other",
] as const;

export const TalentCategoryEnum = z.enum(TALENT_CATEGORY_VALUES);

// Honeypot field: real users never see or fill this input. Any non-empty
// value indicates a bot. Empty string and "not present" both pass.
const honeypotSchema = z.string().max(0).optional().or(z.literal(""));

export const TalentFormSchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    email: z.string().trim().toLowerCase().email().max(254),
    portfolioUrl: httpsUrlSchema,
    category: TalentCategoryEnum,
    message: z.string().trim().min(10).max(2000),
    company_website: honeypotSchema,
    formRenderedAt: z.number().int().positive(),
  })
  .strict();

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
