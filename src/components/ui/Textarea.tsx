import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export type TextareaProps = ComponentPropsWithoutRef<"textarea">;

/**
 * Forwards all native <textarea> props (including React Hook Form's
 * register(...) spread: name/onChange/onBlur/ref) — server-safe, no
 * 'use client' needed just for forwardRef.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ className, ...rest }, ref) {
    return <textarea ref={ref} className={cn("input", className)} {...rest} />;
  }
);
