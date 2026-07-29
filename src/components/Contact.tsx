"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { ContactFormSchema, type ContactFormValues } from "@/lib/validation";

type SubmitStatus = "idle" | "success" | "error";

/**
 * Honeypot field styling: visually and functionally invisible to sighted
 * and keyboard users, but present in the raw DOM/HTML that a naive
 * form-filling bot would parse and fill in. Kept as a module-level constant
 * so the object isn't recreated on every render.
 *
 * NOTE: this exact pattern (styling + markup shape) is duplicated
 * byte-for-byte from TalentForm.tsx on purpose — both forms must implement
 * the anti-bot honeypot/timing pattern identically.
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
 * Contact form (#contact). Client Component: needs React Hook Form state, a
 * mount-time effect for the anti-bot timing field, and a fetch-based submit
 * handler.
 */
export function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      company_website: "",
      formRenderedAt: 0,
    },
  });

  const [status, setStatus] = useState<SubmitStatus>("idle");

  // Anti-bot timing check: capture the render (mount) timestamp so the API
  // route can reject submissions that arrive suspiciously fast (see
  // lib/security.ts's checkTiming, minMs=2000). Identical pattern to
  // TalentForm.tsx.
  useEffect(() => {
    setValue("formRenderedAt", Date.now());
  }, [setValue]);

  async function onSubmit(data: ContactFormValues) {
    setStatus("idle");
    try {
      const response = await fetch("/api/contact", {
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
    <Section id="contact">
      <SectionHeading
        eyebrow="Get in touch"
        heading="Say something after hours"
        intro="Press, partnerships, or just want to talk shop after midnight — this goes straight to the team."
      />
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="max-w-[52ch] space-y-6">
        <Field label="Name" htmlFor="contact-name" error={errors.name?.message}>
          <Input
            id="contact-name"
            type="text"
            autoComplete="name"
            aria-invalid={errors.name ? "true" : undefined}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            {...register("name")}
          />
        </Field>

        <Field label="Email" htmlFor="contact-email" error={errors.email?.message}>
          <Input
            id="contact-email"
            type="email"
            autoComplete="email"
            aria-invalid={errors.email ? "true" : undefined}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            {...register("email")}
          />
        </Field>

        <Field label="Subject" htmlFor="contact-subject" error={errors.subject?.message}>
          <Input
            id="contact-subject"
            type="text"
            aria-invalid={errors.subject ? "true" : undefined}
            aria-describedby={errors.subject ? "contact-subject-error" : undefined}
            {...register("subject")}
          />
        </Field>

        <Field label="Message" htmlFor="contact-message" error={errors.message?.message}>
          <Textarea
            id="contact-message"
            rows={4}
            aria-invalid={errors.message ? "true" : undefined}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            {...register("message")}
          />
        </Field>

        {/*
          Honeypot: real users never see or reach this field (aria-hidden,
          off-screen, tabIndex={-1}). Any bot that blindly fills every input
          on the page fills this one too, and lib/security.ts's
          checkHoneypot() rejects the submission server-side while still
          returning the same 200 success shape — no signal is given back to
          the bot. Identical shape to TalentForm.tsx.
        */}
        <div aria-hidden="true" style={HONEYPOT_STYLE}>
          <label htmlFor="contact-company-website">Company Website</label>
          <input
            id="contact-company-website"
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
          Send message
        </Button>

        <div aria-live="polite" aria-atomic="true" className="text-sm">
          {status === "success" && (
            <p className="text-[color:var(--color-accent)]">Thanks — we will be in touch.</p>
          )}
          {status === "error" && (
            <p className="text-[#FF6B6B]">Something went wrong. Please try again.</p>
          )}
        </div>
      </form>
    </Section>
  );
}
