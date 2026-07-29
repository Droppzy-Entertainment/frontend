import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export type InputProps = ComponentPropsWithoutRef<"input">;

/**
 * Forwards all native <input> props (including React Hook Form's
 * register(...) spread: name/onChange/onBlur/ref) — server-safe, no
 * 'use client' needed just for forwardRef.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...rest },
  ref
) {
  return <input ref={ref} className={cn("input", className)} {...rest} />;
});
