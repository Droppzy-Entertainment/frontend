"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type SectionTone = "default" | "band";

export interface SectionProps {
  id?: string;
  tone?: SectionTone;
  className?: string;
  children: ReactNode;
}

export function Section({ id, tone = "default", className, children }: SectionProps) {
  if (tone === "band") {
    return (
      <section id={id} className={cn("section w-full bg-section scroll-mt-24", className)}>
        <div className="wrap mx-auto w-full max-w-[1200px] px-4 py-12 md:px-6 md:py-16">
          {children}
        </div>
      </section>
    );
  }

  return (
    <section
      id={id}
      className={cn(
        "section wrap mx-auto w-full max-w-[1200px] px-4 py-12 md:px-6 md:py-16 scroll-mt-24",
        className
      )}
    >
      <div>{children}</div>
    </section>
  );
}
