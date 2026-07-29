import { Button } from "@/components/ui/Button";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

/**
 * Hero — above-the-fold section. Server Component: zero client JS.
 *
 * The old static template drove the photo collage with a JS `mousemove`
 * parallax handler. Per the plan (judgment call #7) that is intentionally
 * DROPPED here — only the CSS `photo-float` / `chip-pulse` keyframes
 * (already defined in globals.css) are kept, so this whole section can stay
 * server-rendered.
 *
 * Entrance animation choice: the brief offered two options for the
 * mount-triggered copy-block entrance — a Framer Motion stagger (which would
 * require "use client") or a small local CSS animation. This component uses
 * the latter: a scoped `<style>` block (NOT an edit to the shared
 * globals.css) defining one small keyframe plus staggered
 * `animation-delay`s, so the hero ships with no client-side JavaScript at
 * all. The block also reuses the design system's own `--duration-entrance`
 * / `--ease-cinematic` motion tokens and adds `prefers-reduced-motion`
 * handling for every animation this component uses (the shared stylesheet
 * has no universal reduced-motion override, so each animated component is
 * responsible for its own — matching the pattern used by Section.tsx's
 * `useReducedMotion()` and Marquee's documented reduced-motion behavior).
 */
export function Hero() {
  return (
    <section
      // NOTE: no id="top" here — app/layout.tsx's <main id="top"> (which
      // directly wraps this Hero as page.tsx's first child) already owns
      // that anchor target, so this section intentionally doesn't duplicate
      // the id (duplicate DOM ids are invalid HTML and ambiguous for
      // fragment-navigation/`getElementById`).
      className="relative overflow-hidden bg-[radial-gradient(900px_700px_at_72%_22%,color-mix(in_srgb,var(--color-accent)_16%,transparent),transparent_62%),var(--color-bg)]"
    >
      <style>{`
        @keyframes hero-copy-in {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-copy-in {
          animation: hero-copy-in var(--duration-entrance) var(--ease-cinematic) both;
        }
        .hero-photo {
          animation: photo-float 7s ease-in-out infinite;
        }
        .hero-chip-dot {
          animation: chip-pulse 1.6s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-copy-in {
            animation: none;
            opacity: 1;
            transform: none;
          }
          .hero-photo,
          .hero-chip-dot {
            animation: none;
          }
        }
      `}</style>

      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-12 px-4 py-16 md:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        {/* Copy column — 1.1fr on desktop; stacks BELOW the collage on mobile via order utilities */}
        <div className="order-2 lg:order-1">
          <p
            className="script hero-copy-in mb-4 text-[clamp(22px,2.4vw,30px)]"
            style={{ animationDelay: "0s" }}
          >
            after dark, the show begins
          </p>

          <h1
            // Mobile fix: the source design token clamp(72px,11vw,180px) is
            // a FLAT 72px for any viewport under 654px wide (11vw doesn't
            // exceed the 72px floor until then), which overflows a phone
            // screen for a single unbreakable word like "Entertainment".
            // Lowering the floor to 40px keeps the same 11vw/180px curve
            // (unchanged desktop appearance) while letting it scale down on
            // small screens; `break-words` is a safety net that guarantees
            // no horizontal page overflow regardless of exact font metrics.
            className="hero-copy-in break-words font-heading text-[clamp(40px,11vw,180px)] uppercase leading-[0.9] tracking-[-0.03em] text-text"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="block">Droppzy</span>
            <span className="block">Entertainment</span>
          </h1>

          <p
            className="hero-copy-in mt-6 max-w-[58ch] text-lg leading-relaxed text-text-dim"
            style={{ animationDelay: "0.2s" }}
          >
            Comedy, docuseries and late-night built for the feed that never
            sleeps. New drops every week — the crew that treats YouTube like
            a stage, not an upload folder.
          </p>

          <div
            className="hero-copy-in mt-8 flex flex-wrap gap-4"
            style={{ animationDelay: "0.3s" }}
          >
            {/* PLACEHOLDER: real Droppzy Entertainment YouTube channel URL — sourced from NEXT_PUBLIC_YOUTUBE_CHANNEL_URL (see .env.example) */}
            <Button variant="primary" href={process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_URL}>
              Subscribe on YouTube
            </Button>
            <Button variant="secondary" href="#create">
              Explore Content
            </Button>
          </div>
        </div>

        {/* Collage column — 0.9fr on desktop; stacks ABOVE the copy on mobile via order utilities */}
        <div className="relative order-1 mx-auto aspect-square w-full max-w-[420px] sm:max-w-[480px] lg:order-2 lg:mx-0">
          {/* PLACEHOLDER: real cast / behind-the-scenes stills for all 4 hero collage photos below */}
          <div
            className="hero-photo absolute left-[6%] top-[2%] w-[34%] -rotate-[7deg]"
            style={{ animationDelay: "0s" }}
          >
            <PlaceholderImage
              label="Hero collage photo 1 — cast still one"
              aspect="3/4"
              className="w-full"
            />
          </div>
          <div
            className="hero-photo absolute right-[4%] top-0 w-[40%] rotate-[5deg]"
            style={{ animationDelay: "0.4s" }}
          >
            <PlaceholderImage
              label="Hero collage photo 2 — cast still two"
              aspect="4/5"
              className="w-full"
            />
          </div>
          <div
            className="hero-photo absolute bottom-[6%] left-0 w-[30%] rotate-[4deg]"
            style={{ animationDelay: "0.8s" }}
          >
            <PlaceholderImage
              label="Hero collage photo 3 — cast still three"
              aspect="4/5"
              className="w-full"
            />
          </div>
          <div
            className="hero-photo absolute bottom-0 right-[8%] w-[36%] -rotate-[4deg]"
            style={{ animationDelay: "1.2s" }}
          >
            <PlaceholderImage
              label="Hero collage photo 4 — cast still four"
              aspect="3/4"
              className="w-full"
            />
          </div>

          <span className="absolute left-[30%] top-[4%] z-10 inline-flex items-center gap-2 rounded-full border border-divider bg-[color-mix(in_srgb,var(--color-bg)_78%,transparent)] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.05em] text-accent shadow-sm backdrop-blur">
            <span
              aria-hidden="true"
              className="hero-chip-dot h-1.5 w-1.5 rounded-full bg-accent"
            />
            Live now
          </span>

          {/* PLACEHOLDER: illustrative social-proof reaction count — swap for a real, live engagement metric */}
          <span className="absolute bottom-[28%] right-[-2%] z-10 inline-flex items-center rounded-full border border-divider bg-[color-mix(in_srgb,var(--color-bg)_78%,transparent)] px-4 py-2 text-xs text-text shadow-sm backdrop-blur">
            🔥 2.4k reacting
          </span>
        </div>
      </div>
    </section>
  );
}
