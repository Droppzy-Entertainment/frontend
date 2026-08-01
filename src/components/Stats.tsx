import { Section } from "./ui/Section";

const TAGLINE = "THE NEXT GENERATION DROPS HERE";
const BACKGROUND_REPEAT_COUNT = 70;

/**
 * Server Component. Full-bleed accent band displaying the core tagline
 * statement. The same phrase tiles low-intensity across the background as a
 * texture, with the bold, full-size heading centered on top of it.
 */
export function Stats() {
  return (
    <Section tone="band" className="relative overflow-hidden py-2 md:py-1">
      {/* Low-intensity repeating background texture — decorative only. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex flex-wrap content-center justify-center gap-x-8 gap-y-3 opacity-[0.16]"
      >
        {Array.from({ length: BACKGROUND_REPEAT_COUNT }).map((_, index) => (
          <span
            key={index}
            className="font-heading whitespace-nowrap text-[length:clamp(13px,1.4vw,18px)] uppercase leading-none tracking-[-0.01em] text-[color:var(--color-bg)]"
          >
            {TAGLINE}
          </span>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <h2 className="font-heading text-[length:clamp(42px,5.5vw,82px)] uppercase leading-none tracking-[-0.04em] text-[color:var(--color-bg)]">
          {TAGLINE}
        </h2>
      </div>
    </Section>
  );
}
