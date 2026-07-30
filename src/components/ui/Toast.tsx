"use client";

import { useEffect } from "react";
import { cn } from "@/lib/cn";

export type ToastVariant = "success" | "error";

export interface ToastProps {
  message: string;
  variant: ToastVariant;
  onDismiss: () => void;
  durationMs?: number;
}

/**
 * Fixed-position toast that self-dismisses after `durationMs`. Announced to
 * screen readers via role="status" regardless of scroll position, unlike an
 * inline status line that can scroll out of view before it's read.
 */
export function Toast({ message, variant, onDismiss, durationMs = 5000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, durationMs);
    return () => clearTimeout(timer);
  }, [onDismiss, durationMs]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "fixed bottom-6 right-6 z-[100] max-w-[360px] rounded-lg border px-5 py-4 text-sm font-medium shadow-[0_12px_32px_rgba(0,0,0,0.5)] backdrop-blur-md",
        "bg-[color-mix(in_srgb,var(--color-bg)_90%,transparent)]",
        variant === "success"
          ? "border-[color:var(--color-accent)] text-[color:var(--color-accent)]"
          : "border-[#FF6B6B] text-[#FF6B6B]"
      )}
    >
      {message}
    </div>
  );
}
