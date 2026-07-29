import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/ui/Marquee";
import { About } from "@/components/About";
import { BehindTheScenes } from "@/components/BehindTheScenes";
import { Categories } from "@/components/Categories";
import { Videos } from "@/components/Videos";
import { Stats } from "@/components/Stats";
import { TalentForm } from "@/components/TalentForm";
import { SubscribeStrip } from "@/components/SubscribeStrip";
import { Contact } from "@/components/Contact";

// Ticker copy for the marquee band between Hero and About. Kept local to
// this Server Component (rather than lib/constants.ts) since it's purely
// decorative chrome, not shared/source-of-truth copy like lib/categories.ts.
const MARQUEE_ITEMS = ["Comedy", "Docuseries", "Late Night", "Music", "Shorts", "Live"];

/**
 * Server Component — composes every page section in order. Navbar/Footer
 * live in app/layout.tsx, not here, since they're persistent chrome shared
 * across the (currently single) route.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee items={MARQUEE_ITEMS} />
      <About />
      <BehindTheScenes />
      <Categories />
      <Videos />
      <Stats />
      <TalentForm />
      <SubscribeStrip />
      <Contact />
    </>
  );
}
