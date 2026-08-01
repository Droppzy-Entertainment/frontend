import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * Server Component. "Who we are" — the origin-story section.
 */
export function About() {
  return (
    <Section id="about">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="lg:pt-4">
          <Eyebrow>Who we are</Eyebrow>
          <h2 className="mt-4 font-heading text-[clamp(36px,4vw,56px)] uppercase leading-[0.92] tracking-[-0.04em] text-text">
            Built after dark
          </h2>
          <p className="mt-6 max-w-[54ch] text-lg leading-[1.75] text-text-dim">
            Droppzy Entertainment is your destination for exciting, original,
            and high-quality entertainment. We bring you the best in
            celebrity interviews, music videos, pranks, game shows, street
            interviews, challenges, comedy, podcasts, behind-the-scenes
            content, travel, and much more.
          </p>
          <p className="mt-6 max-w-[54ch] text-lg leading-[1.75] text-text-dim">
            Our mission is to entertain, inspire, and connect people through
            creative storytelling and unforgettable experiences. We also
            support emerging talent by giving creators, artists, and
            influencers a platform to showcase their work to a global
            audience.
          </p>
          <blockquote className="script mt-8 text-[clamp(22px,2.5vw,32px)] text-accent leading-snug">
            &ldquo;the stage the moment before the show starts&rdquo;
          </blockquote>
        </div>

        {/* Feature portrait photo card */}
        <div className="relative mx-auto w-full max-w-[500px]">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-divider shadow-[0_12px_48px_rgba(0,0,0,0.7)] transition-all duration-300 hover:scale-[1.02]">
            <Image
              src="/photos/johnwick.png"
              alt="Droppzy feature portrait"
              fill
              sizes="(max-width: 1024px) 90vw, 500px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-60" />
          </div>
        </div>
      </div>
    </Section>
  );
}
