import { Section } from "./ui/Section";

/**
 * Server Component. Full-bleed accent band displaying the core tagline statement:
 * "THE NEXT GENERATION DROPS HERE"
 */
export function Stats() {
  return (
    <Section tone="band" className="py-12 md:py-16">
      <div className="flex flex-col items-center text-center">
        <h2 className="font-heading text-[length:clamp(28px,5vw,64px)] uppercase leading-none tracking-[-0.04em] text-[color:var(--color-bg)]">
          THE NEXT GENERATION DROPS HERE
        </h2>
      </div>
    </Section>
  );
}
