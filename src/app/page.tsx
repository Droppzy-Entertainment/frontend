import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/ui/Marquee";
import { About } from "@/components/About";
import { Categories } from "@/components/Categories";
import { Videos } from "@/components/Videos";
import { Stats } from "@/components/Stats";
import { TalentForm } from "@/components/TalentForm";
import { SubscribeStrip } from "@/components/SubscribeStrip";

const MARQUEE_ITEMS = ["Comedy", "Docuseries", "Late Night", "Music", "Shorts", "Live"];

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee items={MARQUEE_ITEMS} />
      <About />
      <Categories />
      <Videos />
      <Stats />
      <TalentForm />
      <SubscribeStrip />
    </>
  );
}
