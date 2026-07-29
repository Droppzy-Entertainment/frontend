import type { LucideIcon } from "lucide-react";
import { Drama, Clapperboard, MoonStar, Music4, Radio } from "lucide-react";
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
  comedy: Drama,
  docuseries: Clapperboard,
  "late-night": MoonStar,
  music: Music4,
  "shorts-live": Radio,
};

/**
 * Server Component. "What we create" section (`#create`) — renders the 5
 * canonical content categories from `lib/categories.ts` (the single source
 * of truth for this copy) as a responsive Card grid.
 */
export function Categories() {
  return (
    <Section id="create">
      <SectionHeading eyebrow="What we create" heading="Five formats, one voice" />
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
