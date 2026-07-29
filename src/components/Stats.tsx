import { Section } from "./ui/Section";
import { StatCounter } from "./ui/StatCounter";

/**
 * Server Component. `Section` (tone="band") supplies the full-bleed accent
 * background; the actual count-up animation lives in the `StatCounter`
 * client leaf, so this wrapper itself needs no hooks/state/browser APIs.
 *
 * Ported 1:1 from the Nocturne source's `.stats .grid-4` (4 stats,
 * `repeat(4, auto)` collapsing to `repeat(2, 1fr)` under ~720px) — here
 * expressed as Tailwind utilities (`grid-cols-2 md:grid-cols-4`) since
 * `.stats`/`.grid-4` are not ported component classes in globals.css.
 *
 * The second stat ("3am / Average upload time") is intentionally static —
 * the source markup has no `data-count-to` on it, so it renders the same
 * `.stat-num`/`.stat-label` markup directly instead of going through
 * StatCounter, with no animation.
 */
export function Stats() {
  return (
    <Section tone="band">
      <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
        <div className="text-center">
          <StatCounter value={4.2} suffix="M" label="Subscribers" />
        </div>
        <div className="text-center">
          <p className="stat-num">3am</p>
          <p className="stat-label">Average upload time</p>
        </div>
        <div className="text-center">
          <StatCounter value={312} label="Episodes shipped" />
        </div>
        <div className="text-center">
          <StatCounter value={98} suffix="%" label="Watched past midnight" />
        </div>
      </div>
    </Section>
  );
}
