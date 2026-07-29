import { Section } from "./ui/Section";
import { Button } from "./ui/Button";

/**
 * Server Component. Full-bleed accent band mirroring the Nocturne source's
 * `.subscribe` section: centered black-on-orange heading + one on-band
 * secondary Button.
 *
 * The base `h2` rule in globals.css only sets font-family/weight/size and
 * inherits `color: var(--color-text)` (white) from `body` — it has no
 * built-in "on accent band" variant — so the black-on-orange color and the
 * source's larger `clamp(36px,5vw,64px)` size are applied here as Tailwind
 * arbitrary-value utilities rather than editing globals.css.
 */
export function SubscribeStrip() {
  return (
    <Section tone="band">
      <div className="text-center">
        <h2 className="text-[color:var(--color-bg)] text-[length:clamp(36px,5vw,64px)]">
          Subscribe on YouTube
        </h2>
        <div className="mt-6 flex justify-center">
          <Button
            variant="secondary"
            onBand
            // PLACEHOLDER: real Droppzy Entertainment YouTube channel URL —
            // sourced from the validated NEXT_PUBLIC_YOUTUBE_CHANNEL_URL env var.
            href={process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_URL}
          >
            Watch on YouTube
          </Button>
        </div>
      </div>
    </Section>
  );
}
