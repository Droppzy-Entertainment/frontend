import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export type SelectProps = ComponentPropsWithoutRef<"select">;

/**
 * Forwards all native <select> props (including React Hook Form's
 * register(...) spread: name/onChange/onBlur/ref) — server-safe, no
 * 'use client' needed just for forwardRef.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, children, ...rest },
  ref
) {
  return (
    <select ref={ref} className={cn("input", className)} {...rest}>
      {children}
    </select>
  );
});
