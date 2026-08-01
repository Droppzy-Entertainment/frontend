import type { LucideIcon } from "lucide-react";
import {
  Mic2,
  Music4,
  PartyPopper,
  Gamepad2,
  Users,
  Flame,
  Drama,
  Podcast,
  Clapperboard,
  Plane,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CATEGORIES, type Category } from "@/lib/categories";

const CATEGORY_ICONS: Record<Category["value"], LucideIcon> = {
  "celebrity-interviews": Mic2,
  "music-videos": Music4,
  pranks: PartyPopper,
  "game-shows": Gamepad2,
  "street-interviews": Users,
  challenges: Flame,
  comedy: Drama,
  podcasts: Podcast,
  "behind-the-scenes": Clapperboard,
  travel: Plane,
};

export function Categories() {
  return (
    <Section id="create" className="overflow-hidden">
      <SectionHeading eyebrow="What we create" heading="ENTERTAINMENT WITHOUT LIMITS" />

      {/* Continuous Carousel Marquee Container */}
      <div className="relative mt-8 w-full overflow-hidden py-4">
        {/* Left & Right Gradient Mask Overlays for smooth edge fading */}
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-16 bg-gradient-to-r from-[color:var(--color-bg)] to-transparent" />
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-16 bg-gradient-to-l from-[color:var(--color-bg)] to-transparent" />

        <div className="ticker flex w-max gap-6 bg-transparent border-none py-2">
          <div className="ticker-track flex w-max gap-6 hover:[animation-play-state:paused]">
            {/* First Set of Category Cards */}
            {CATEGORIES.map((category) => {
              const Icon = CATEGORY_ICONS[category.value];
              return (
                <div
                  key={`cat-a-${category.value}`}
                  className="group relative flex h-[220px] w-[290px] shrink-0 flex-col justify-between rounded-xl border border-[color:var(--color-divider)] bg-[color:var(--color-surface)] p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--color-accent)] hover:shadow-[0_10px_30px_rgba(255,90,0,0.15)]"
                >
                  <div>
                    {Icon && (
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[color:var(--color-accent)]/10 text-[color:var(--color-accent)] transition-colors group-hover:bg-[color:var(--color-accent)] group-hover:text-black">
                        <Icon className="h-5 w-5" />
                      </div>
                    )}
                    <h3 className="mt-4 font-heading text-lg uppercase tracking-tight text-[color:var(--color-text)] transition-colors group-hover:text-[color:var(--color-accent)]">
                      {category.label}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[color:var(--color-text-dim)]">
                      {category.description}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Duplicated Second Set for Seamless Infinite Loop */}
            {CATEGORIES.map((category) => {
              const Icon = CATEGORY_ICONS[category.value];
              return (
                <div
                  key={`cat-b-${category.value}`}
                  className="group relative flex h-[220px] w-[290px] shrink-0 flex-col justify-between rounded-xl border border-[color:var(--color-divider)] bg-[color:var(--color-surface)] p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--color-accent)] hover:shadow-[0_10px_30px_rgba(255,90,0,0.15)]"
                >
                  <div>
                    {Icon && (
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[color:var(--color-accent)]/10 text-[color:var(--color-accent)] transition-colors group-hover:bg-[color:var(--color-accent)] group-hover:text-black">
                        <Icon className="h-5 w-5" />
                      </div>
                    )}
                    <h3 className="mt-4 font-heading text-lg uppercase tracking-tight text-[color:var(--color-text)] transition-colors group-hover:text-[color:var(--color-accent)]">
                      {category.label}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[color:var(--color-text-dim)]">
                      {category.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
