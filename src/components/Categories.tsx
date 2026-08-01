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
import { Card } from "@/components/ui/Card";
import { CATEGORIES, type Category } from "@/lib/categories";

/**
 * Maps each category's `value` to its Lucide icon. Kept local to this
 * component (rather than in lib/categories.ts) so the shared lib module
 * stays framework/UI-agnostic and only owns copy, per the plan.
 */
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

/**
 * Server Component. "What we create" section (`#create`) — renders the 10
 * canonical content categories from `lib/categories.ts` (the single source
 * of truth for this copy) as a responsive Card grid.
 */
export function Categories() {
  return (
    <Section id="create">
      <SectionHeading eyebrow="What we create" heading="Ten formats, one voice" />
      <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-5">
        {CATEGORIES.map((category) => (
          <Card
            key={category.value}
            title={category.label}
            body={category.description}
            icon={CATEGORY_ICONS[category.value]}
          />
        ))}
      </div>
    </Section>
  );
}
