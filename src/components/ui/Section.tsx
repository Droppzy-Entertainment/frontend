"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

export type SectionTone = "default" | "band";

export interface SectionProps {
  id?: string;
  tone?: SectionTone;
  className?: string;
  children: ReactNode;
}

/**
 * React port of the old static site's `.reveal` / IntersectionObserver
 * scroll-reveal behavior via Framer Motion's `whileInView`.
 *
 * NOTE on `.section` / `.wrap`: these two class names are not (yet) defined
 * as component classes in globals.css — only the literal component
 * contracts ported 1:1 from the Nocturne source stylesheet live there, and
 * this task is scoped to not touch that file beyond the explicitly
 * requested `.stat-num`/`.stat-label` addition. The class names are still
 * applied below as semantic hooks (harmless no-ops today, free real estate
 * for a future design pass), but the actual layout — max-width, horizontal
 * gutters, vertical rhythm — is implemented with Tailwind utilities built
 * from the same design-token spacing scale that `tailwind.config.ts` maps
 * (`py-12`/`py-16` -> --space-12/--space-16, `px-4`/`px-6` ->
 * --space-4/--space-6), so sections are never left unstyled.
 */
export function Section({ id, tone = "default", className, children }: SectionProps) {
  const reduce = useReducedMotion();

  const motionProps = {
    initial: reduce ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  };

  if (tone === "band") {
    // Full-bleed accent band (Stats / SubscribeStrip pattern): the outer
    // section floods edge-to-edge with the accent background, so it
    // deliberately does NOT get the `wrap` (max-width) class — only the
    // inner content is constrained.
    return (
      <section id={id} className={cn("section w-full bg-section", className)}>
        <motion.div
          className="wrap mx-auto w-full max-w-[1200px] px-4 py-12 md:px-6 md:py-16"
          {...motionProps}
        >
          {children}
        </motion.div>
      </section>
    );
  }

  return (
    <section
      id={id}
      className={cn(
        "section wrap mx-auto w-full max-w-[1200px] px-4 py-12 md:px-6 md:py-16",
        className
      )}
    >
      <motion.div {...motionProps}>{children}</motion.div>
    </section>
  );
}
