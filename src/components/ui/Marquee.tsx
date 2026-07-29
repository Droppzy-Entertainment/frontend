export interface MarqueeProps {
  items: string[];
}

/**
 * Server Component — pure CSS marquee. `.ticker-track`'s `@keyframes
 * ticker-scroll` (globals.css) animates `transform: translateX(0)` ->
 * `translateX(-50%)` on a loop. For that to read as a seamless, infinite
 * crawl (rather than snapping/jumping once the track scrolls past its own
 * content), the track's rendered content must be exactly two full copies
 * of `items` back to back — at -50% the second copy is sitting exactly
 * where the first copy started, so the loop-reset is invisible. The
 * duplication below is therefore required plumbing, not a bug or leftover
 * copy-paste.
 */
export function Marquee({ items }: MarqueeProps) {
  return (
    <div className="ticker">
      <div className="ticker-track">
        {items.map((item, index) => (
          <span key={`ticker-a-${index}`} className="ticker-item">
            {item}
          </span>
        ))}
        {items.map((item, index) => (
          <span key={`ticker-b-${index}`} className="ticker-item">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
