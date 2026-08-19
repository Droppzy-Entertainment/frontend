"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent, CSSProperties } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";
import { TalentFormSchema, type TalentFormValues } from "@/lib/validation";
import { TALENT_CATEGORY_OPTIONS } from "@/lib/categories";

type SubmitStatus = "idle" | "success" | "error";

/**
 * Honeypot field styling: visually and functionally invisible to sighted
 * and keyboard users, but present in the raw DOM/HTML that a naive
 * form-filling bot would parse and fill in. Kept as a module-level constant
 * so the object isn't recreated on every render.
 *
 * NOTE: this exact pattern (styling + markup shape) is duplicated
 * byte-for-byte in Contact.tsx on purpose — both forms must implement the
 * anti-bot honeypot/timing pattern identically.
 */
const HONEYPOT_STYLE: CSSProperties = {
  position: "absolute",
  left: "-9999px",
  top: 0,
  width: "1px",
  height: "1px",
  overflow: "hidden",
};

// Client-side mirror of lib/validation.ts's MAX_CV_BYTES — purely for fast
// UX feedback before reading the file. The server re-validates the real
// decoded size regardless; this doesn't replace that check.
const MAX_CV_BYTES = 5 * 1024 * 1024;

/** Reads a File as base64, stripping the leading `data:<mime>;base64,` prefix. */
function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.slice(result.indexOf(",") + 1));
    };
    reader.onerror = () => reject(reader.error ?? new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

/**
 * Talent submission form (#talent). Client Component: needs React Hook
 * Form state, a mount-time effect for the anti-bot timing field, and a
 * fetch-based submit handler.
 */
export function TalentForm() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TalentFormValues>({
    resolver: zodResolver(TalentFormSchema),
    defaultValues: {
      categories: [],
      documentTypes: [],
      otherTalents: "",
      company_website: "",
      formRenderedAt: 0,
    },
  });

  const [status, setStatus] = useState<SubmitStatus>("idle");

  const documentTypes = watch("documentTypes") ?? [];
  const wantsCv = documentTypes.includes("cv");
  const wantsPortfolio = documentTypes.includes("portfolio");

  // Anti-bot timing check: capture the render (mount) timestamp so the API
  // route can reject submissions that arrive suspiciously fast (see
  // lib/security.ts's checkTiming, minMs=2000). Identical pattern to
  // Contact.tsx.
  useEffect(() => {
    setValue("formRenderedAt", Date.now());
  }, [setValue]);

  // Clear whichever field belongs to a now-unchecked document type, so an
  // attached CV or typed portfolio URL doesn't linger in the payload after
  // the user toggles it off.
  useEffect(() => {
    if (!wantsCv) setValue("cvFile", undefined);
  }, [wantsCv, setValue]);

  useEffect(() => {
    if (!wantsPortfolio) setValue("portfolioUrl", undefined);
  }, [wantsPortfolio, setValue]);

  async function handleCvFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      setValue("cvFile", undefined, { shouldValidate: true });
      return;
    }
    if (file.type !== "application/pdf") {
      setError("cvFile", { message: "CV must be a PDF" });
      event.target.value = "";
      return;
    }
    if (file.size > MAX_CV_BYTES) {
      setError("cvFile", { message: "CV must be under 5MB" });
      event.target.value = "";
      return;
    }
    const content = await readFileAsBase64(file);
    setValue(
      "cvFile",
      { filename: file.name, contentType: file.type, content },
      { shouldValidate: true },
    );
  }

  async function onSubmit(data: TalentFormValues) {
    setStatus("idle");
    try {
      const response = await fetch("/api/talent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      setStatus("success");
      reset();
      // Re-arm the timing field after reset (which restores it to the 0
      // placeholder default) so a second submission in the same session
      // is timed from "now" rather than being permanently invalid.
      setValue("formRenderedAt", Date.now());
    } catch {
      // Never leak error detail (network failure, 4xx/5xx body, etc.) to
      // the UI — generic message only, per the security spec.
      setStatus("error");
    }
  }

  return (
    <Section id="talent">
      <SectionHeading
        eyebrow="Join the cast"
        heading="Talent form"
        intro="Writers, editors, musicians — tell us what you make and when you make it."
        align="center"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="mx-auto max-w-[52ch] space-y-6"
      >
        <Field label="Name" htmlFor="talent-name" error={errors.name?.message}>
          <Input
            id="talent-name"
            type="text"
            autoComplete="name"
            aria-invalid={errors.name ? "true" : undefined}
            aria-describedby={errors.name ? "talent-name-error" : undefined}
            {...register("name")}
          />
        </Field>

        <Field label="Email" htmlFor="talent-email" error={errors.email?.message}>
          <Input
            id="talent-email"
            type="email"
            autoComplete="email"
            aria-invalid={errors.email ? "true" : undefined}
            aria-describedby={errors.email ? "talent-email-error" : undefined}
            {...register("email")}
          />
        </Field>

        <Field
          label="WhatsApp number"
          htmlFor="talent-whatsapp-number"
          error={errors.whatsappNumber?.message}
        >
          <Input
            id="talent-whatsapp-number"
            type="tel"
            autoComplete="tel"
            placeholder="+94 7# ### ####"
            aria-invalid={errors.whatsappNumber ? "true" : undefined}
            aria-describedby={
              errors.whatsappNumber ? "talent-whatsapp-number-error" : undefined
            }
            {...register("whatsappNumber")}
          />
        </Field>

        <Field label="Category" htmlFor="talent-categories" error={errors.categories?.message}>
          <div
            id="talent-categories"
            role="group"
            aria-describedby={errors.categories ? "talent-categories-error" : undefined}
            className="seg flex-wrap"
          >
            {TALENT_CATEGORY_OPTIONS.map((option) => (
              <label key={option.value} className="seg-opt">
                <input type="checkbox" value={option.value} {...register("categories")} />
                {option.label}
              </label>
            ))}
          </div>
        </Field>

        <Field label="Documents" htmlFor="talent-documents" error={errors.documentTypes?.message}>
          <div
            id="talent-documents"
            role="group"
            aria-describedby={errors.documentTypes ? "talent-documents-error" : undefined}
            className="seg flex-wrap"
          >
            <label className="seg-opt">
              <input type="checkbox" value="cv" {...register("documentTypes")} />
              CV
            </label>
            <label className="seg-opt">
              <input type="checkbox" value="portfolio" {...register("documentTypes")} />
              Portfolio
            </label>
          </div>
        </Field>

        {wantsCv && (
          <Field
            label="Upload CV"
            htmlFor="talent-cv-file"
            error={errors.cvFile?.message}
            hint="PDF only, max 5MB."
          >
            <Input
              id="talent-cv-file"
              type="file"
              accept="application/pdf"
              aria-invalid={errors.cvFile ? "true" : undefined}
              aria-describedby={errors.cvFile ? "talent-cv-file-error" : undefined}
              onChange={handleCvFileChange}
            />
          </Field>
        )}

        {wantsPortfolio && (
          <Field
            label="Portfolio URL"
            htmlFor="talent-portfolio-url"
            error={errors.portfolioUrl?.message}
          >
            <Input
              id="talent-portfolio-url"
              type="url"
              placeholder="https://"
              autoComplete="url"
              aria-invalid={errors.portfolioUrl ? "true" : undefined}
              aria-describedby={
                errors.portfolioUrl ? "talent-portfolio-url-error" : undefined
              }
              {...register("portfolioUrl")}
            />
          </Field>
        )}

        <Field
          label="Other talents"
          htmlFor="talent-other-talents"
          error={errors.otherTalents?.message}
          hint="Optional — anything else you make that isn't listed above."
        >
          <Textarea
            id="talent-other-talents"
            rows={4}
            aria-invalid={errors.otherTalents ? "true" : undefined}
            aria-describedby={errors.otherTalents ? "talent-other-talents-error" : undefined}
            {...register("otherTalents")}
          />
        </Field>

        {/*
          Honeypot: real users never see or reach this field (aria-hidden,
          off-screen, tabIndex={-1}). Any bot that blindly fills every input
          on the page fills this one too, and lib/security.ts's
          checkHoneypot() rejects the submission server-side while still
          returning the same 200 success shape — no signal is given back to
          the bot. Identical shape to Contact.tsx.
        */}
        <div aria-hidden="true" style={HONEYPOT_STYLE}>
          <label htmlFor="talent-company-website">Company Website</label>
          <input
            id="talent-company-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("company_website")}
          />
        </div>

        {/* Timing anti-bot field: carries the mount timestamp captured
            above to the submit payload as a plain number. */}
        <input type="hidden" {...register("formRenderedAt", { valueAsNumber: true })} />

        <Button type="submit" variant="primary" isLoading={isSubmitting}>
          Submit
        </Button>
      </form>

      {status === "success" && (
        <Toast
          message="Thanks — we will be in touch."
          variant="success"
          onDismiss={() => setStatus("idle")}
        />
      )}
      {status === "error" && (
        <Toast
          message="Something went wrong. Please try again."
          variant="error"
          onDismiss={() => setStatus("idle")}
        />
      )}
    </Section>
  );
}
