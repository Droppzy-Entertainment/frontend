import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

/**
 * Server Component. Optional bonus strip (plan judgment call #2): a
 * horizontal scroll-snap row of six behind-the-scenes stills. Deliberately
 * lightweight — no heading, no client JS, no `Section` wrapper (which pulls
 * in Framer Motion) — just a plain container between About and Categories
 * that reinforces the brand story cheaply. Trivially deletable.
 *
 * None of these six use `diagonal` — the page's only diagonal-clip photo
 * lives in `About.tsx`, per the design system's tightened rule.
 */
export function BehindTheScenes() {
  return (
    <div className="wrap mx-auto w-full max-w-[1200px] px-4 py-8 md:px-6 md:py-12">
      <div
        className="flex gap-4 overflow-x-auto pb-2 [scroll-snap-type:x_mandatory]"
        aria-label="Behind the scenes photos"
      >
        {/* PLACEHOLDER: real behind-the-scenes still #1 (candid set/rehearsal shot) */}
        <PlaceholderImage
          label="Behind the scenes still one"
          aspect="1/1"
          diagonal={false}
          className="w-[140px] shrink-0 [scroll-snap-align:start]"
        />
        {/* PLACEHOLDER: real behind-the-scenes still #2 (candid set/rehearsal shot) */}
        <PlaceholderImage
          label="Behind the scenes still two"
          aspect="1/1"
          diagonal={false}
          className="w-[140px] shrink-0 [scroll-snap-align:start]"
        />
        {/* PLACEHOLDER: real behind-the-scenes still #3 (candid set/rehearsal shot) */}
        <PlaceholderImage
          label="Behind the scenes still three"
          aspect="1/1"
          diagonal={false}
          className="w-[140px] shrink-0 [scroll-snap-align:start]"
        />
        {/* PLACEHOLDER: real behind-the-scenes still #4 (candid set/rehearsal shot) */}
        <PlaceholderImage
          label="Behind the scenes still four"
          aspect="1/1"
          diagonal={false}
          className="w-[140px] shrink-0 [scroll-snap-align:start]"
        />
        {/* PLACEHOLDER: real behind-the-scenes still #5 (candid set/rehearsal shot) */}
        <PlaceholderImage
          label="Behind the scenes still five"
          aspect="1/1"
          diagonal={false}
          className="w-[140px] shrink-0 [scroll-snap-align:start]"
        />
        {/* PLACEHOLDER: real behind-the-scenes still #6 (candid set/rehearsal shot) */}
        <PlaceholderImage
          label="Behind the scenes still six"
          aspect="1/1"
          diagonal={false}
          className="w-[140px] shrink-0 [scroll-snap-align:start]"
        />
      </div>
    </div>
  );
}
