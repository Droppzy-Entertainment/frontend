import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

/**
 * Server Component. "Who we are" — the origin-story section. Holds the
 * page's ONE diagonal-clip photo (`.clip-diagonal`, via
 * `PlaceholderImage diagonal`) per the design system's tightened
 * "one hero/feature image per page" rule — no other section on the page
 * should apply `diagonal`.
 */
export function About() {
  return (
    <Section id="about">
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="lg:pt-8">
          <Eyebrow>Who we are</Eyebrow>
          <h2 className="mt-3 max-w-[12ch]">Built after dark</h2>
          <p className="text-muted mt-4 max-w-[54ch]">
            Droppzy started as a group chat with a camera and grew into a
            slate: writers, editors and a cast who all keep the same hours as
            the audience. We don&apos;t chase trends before midnight — we
            make the thing you put on at midnight.
          </p>
          <blockquote className="script text-accent m-0 mt-8 -ml-4 max-w-[22ch] text-2xl leading-snug md:text-3xl lg:-ml-10">
            &ldquo;the stage the moment before the show starts&rdquo;
          </blockquote>
        </div>

        {/* PLACEHOLDER: real cast portrait photo, moody stage lighting —
            replaces this generated gradient placeholder with next/image
            once real photography exists. */}
        <PlaceholderImage
          label="About feature photo — cast portrait, moody stage lighting"
          aspect="4/5"
          diagonal
        />
      </div>
    </Section>
  );
}
