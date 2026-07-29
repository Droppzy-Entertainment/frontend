import { Play } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { PLACEHOLDER_VIDEOS } from "@/lib/videos";

/**
 * Server Component. "Latest videos" grid — 3 cards today, but purely
 * data-driven: `PLACEHOLDER_VIDEOS` can grow to 6 (or any number) entries
 * later with zero changes needed here, since the grid and the `.map()`
 * below don't assume a fixed count.
 */
export function Videos() {
  return (
    <Section id="videos">
      <SectionHeading eyebrow="Latest videos" heading="Fresh off the feed" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {PLACEHOLDER_VIDEOS.map((video) => (
          <article key={video.id}>
            {/* Relative wrapper lets the Play-button overlay sit centered
                on top of the thumbnail; `.lighten` already sets
                `position: relative` on the figure itself, so this wrapper
                simply mirrors that same positioning context one level up
                without needing to add a `children` prop to
                `PlaceholderImage`. */}
            <div className="relative">
              {/* PLACEHOLDER: real YouTube thumbnail (via next/image) once
                  this section is wired to the YouTube Data API v3 — see
                  the swap-point note in lib/videos.ts. */}
              <PlaceholderImage
                label={`Video thumbnail for ${video.title}`}
                aspect="16/9"
                diagonal={false}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/80 backdrop-blur-sm">
                  <Play size={22} className="translate-x-[1px] fill-bg text-bg" />
                </span>
              </div>
            </div>

            <h3 className="card-title mt-4">{video.title}</h3>
            <p className="card-meta mt-1">
              {video.views} · {video.category}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
