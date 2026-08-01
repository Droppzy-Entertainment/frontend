import { Eyebrow } from "./Eyebrow";
import { cn } from "@/lib/cn";

export type SectionHeadingAlign = "left" | "center";

export interface SectionHeadingProps {
  eyebrow: string;
  heading: string;
  intro?: string;
  align?: SectionHeadingAlign;
}

/**
 * Server Component. Standard section header block: eyebrow label, H2, and
 * an optional intro paragraph. Centering is a plain Tailwind utility
 * (`text-center`) rather than a new component class — `.eyebrow`'s own
 * `display: inline-flex` already centers correctly once its container is
 * text-aligned.
 */
export function SectionHeading({
  eyebrow,
  heading,
  intro,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-8 md:mb-12", align === "center" && "text-center")}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-3 uppercase tracking-[-0.04em] leading-[0.92]">{heading}</h2>
      {intro && (
        <p className={cn("text-muted mt-3 max-w-[640px]", align === "center" && "mx-auto")}>
          {intro}
        </p>
      )}
    </div>
  );
}
