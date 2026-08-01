"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
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
    formState: { errors, isSubmitting },
  } = useForm<TalentFormValues>({
    resolver: zodResolver(TalentFormSchema),
    defaultValues: {
      company_website: "",
      formRenderedAt: 0,
    },
  });

  const [status, setStatus] = useState<SubmitStatus>("idle");

  // Anti-bot timing check: capture the render (mount) timestamp so the API
  // route can reject submissions that arrive suspiciously fast (see
  // lib/security.ts's checkTiming, minMs=2000). Identical pattern to
  // Contact.tsx.
  useEffect(() => {
    setValue("formRenderedAt", Date.now());
  }, [setValue]);

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
        intro="Writers, editors, musicians, night owls — tell us what you make and when you make it."
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
          label="Reel or portfolio link"
          htmlFor="talent-portfolio-url"
          error={errors.portfolioUrl?.message}
        >
          <Input
            id="talent-portfolio-url"
            type="url"
            placeholder="https://"
            aria-invalid={errors.portfolioUrl ? "true" : undefined}
            aria-describedby={
              errors.portfolioUrl ? "talent-portfolio-url-error" : undefined
            }
            {...register("portfolioUrl")}
          />
        </Field>

        <Field label="Category" htmlFor="talent-category" error={errors.category?.message}>
          <Select
            id="talent-category"
            defaultValue=""
            aria-invalid={errors.category ? "true" : undefined}
            aria-describedby={errors.category ? "talent-category-error" : undefined}
            {...register("category")}
          >
            <option value="" disabled>
              Select a category
            </option>
            {TALENT_CATEGORY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="What do you make?" htmlFor="talent-message" error={errors.message?.message}>
          <Textarea
            id="talent-message"
            rows={4}
            aria-invalid={errors.message ? "true" : undefined}
            aria-describedby={errors.message ? "talent-message-error" : undefined}
            {...register("message")}
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
