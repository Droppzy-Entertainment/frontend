import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/ui/Marquee";
import { About } from "@/components/About";
import { Categories } from "@/components/Categories";
import { Videos } from "@/components/Videos";
import { Stats } from "@/components/Stats";
import { TalentForm } from "@/components/TalentForm";
import { SubscribeStrip } from "@/components/SubscribeStrip";
import { CATEGORIES } from "@/lib/categories";

// Reuses the same "What We Create" categories shown in components/Categories.tsx
// (lib/categories.ts is the single source of truth) rather than its own list.
const MARQUEE_ITEMS = CATEGORIES.map((category) => category.label);

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee items={MARQUEE_ITEMS} />
      <About />
      <Categories />
      {/* Hidden for now until live video links are ready: <Videos /> */}
      <Stats />
      <TalentForm />
      <SubscribeStrip />
    </>
  );
}
