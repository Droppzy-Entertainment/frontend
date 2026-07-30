import Image from "next/image";
import { Button } from "@/components/ui/Button";

/**
 * Hero — above-the-fold section. Server Component: zero client JS.
 *
 * Layout matches the design reference:
 * - Left: tagline, headline (Archivo Black), body text, two CTA buttons
 * - Right: 2×2 collage of tilted photo cards with float animation
 * - Background: large warm amber/reddish radial glow on the right half,
 *   matching the stage-spotlight look from the reference.
 */

export function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ background: "var(--color-bg)" }}>
      <style>{`
        /* Large warm stage-light glow — covers the full right half */
        .hero-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(
              ellipse 90% 100% at 78% 45%,
              rgba(160, 45, 10, 0.72) 0%,
              rgba(120, 30, 5, 0.45) 30%,
              transparent 65%
            );
        }

        /* Bottom-edge vignette darkens the section floor */
        .hero-vignette {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(ellipse at center, transparent 50%, rgba(5,5,5,0.75) 100%);
        }

        @keyframes hero-copy-in {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-copy-in {
          animation: hero-copy-in var(--duration-entrance) var(--ease-cinematic) both;
        }
        .hero-photo {
          animation: photo-float 7s ease-in-out infinite;
        }
        .hero-chip-dot {
          animation: chip-pulse 1.6s ease-in-out infinite;
        }
        @keyframes hero-badge-float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-6px); }
        }
        .hero-badge-float {
          animation: hero-badge-float 4s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-copy-in { animation: none; opacity: 1; transform: none; }
          .hero-photo, .hero-chip-dot, .hero-badge-float { animation: none; }
        }
      `}</style>

      {/* Stage-light amber glow */}
      <div aria-hidden="true" className="hero-glow" />
      {/* Edge vignette */}
      <div aria-hidden="true" className="hero-vignette" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1300px] grid-cols-1 items-center gap-8 px-4 py-16 md:px-8 md:py-24 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8">

        {/* ── Left: copy column ── */}
        <div>
          <p
            className="script hero-copy-in mb-5 text-[clamp(20px,2vw,30px)] text-text"
            style={{ animationDelay: "0s" }}
          >
            after dark, the show begins
          </p>

          <h1
            className="hero-copy-in font-heading text-[clamp(52px,6vw,96px)] uppercase leading-[0.9] tracking-[0.01em] text-text"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="block">Droppzy</span>
            <span className="block">Entertainment</span>
          </h1>

          <p
            className="hero-copy-in mt-8 max-w-[600px] text-[clamp(15px,1.2vw,18px)] leading-[1.75] text-text-dim"
            style={{ animationDelay: "0.2s" }}
          >
            Comedy, docuseries and late-night built for the feed that never
            sleeps. New drops every week — the crew that treats YouTube like
            a stage, not an upload folder.
          </p>

          <div
            className="hero-copy-in mt-9 flex flex-wrap gap-4"
            style={{ animationDelay: "0.3s" }}
          >
            <Button
              variant="primary"
              href={process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_URL}
              className="min-h-[58px] min-w-[250px] justify-center text-[13px] tracking-[0.12em]"
            >
              Subscribe on YouTube
            </Button>
            <Button
              variant="secondary"
              href="#create"
              className="min-h-[58px] min-w-[230px] justify-center text-[13px] tracking-[0.12em] transition-all duration-300 hover:border-white hover:bg-white hover:text-[color:var(--color-bg)]"
            >
              Explore Content
            </Button>
          </div>
        </div>

        {/* ── Right: 5-card photo collage ── */}
        <div className="relative mx-auto h-[540px] w-full max-w-[560px] lg:mx-0 lg:h-[620px] lg:max-w-none">

          {/* TOP-LEFT card */}
          <div
            className="hero-photo absolute left-[-2%] top-[0%] w-[48%] z-10"
            style={{ animationDelay: "0s" }}
          >
            <div className="-rotate-[6deg]">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_12px_56px_rgba(0,0,0,0.7)]">
                <Image
                  src="/photos/hero/hero-1.jpg"
                  alt="On stage speaking at ICBTHONS to a cheering crowd"
                  fill
                  sizes="(max-width: 768px) 45vw, 280px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* TOP-RIGHT card */}
          <div
            className="hero-photo absolute right-[-2%] top-[-3%] w-[50%] z-10"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="rotate-[5deg]">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_12px_56px_rgba(0,0,0,0.7)]">
                <Image
                  src="/photos/hero/hero-2.jpg"
                  alt="Jumping mid-dance move on stage in front of a cheering crowd"
                  fill
                  sizes="(max-width: 768px) 45vw, 290px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* CENTER card — fills the middle gap */}
          <div
            className="hero-photo absolute left-[24%] top-[28%] w-[44%] z-20"
            style={{ animationDelay: "0.7s" }}
          >
            <div className="rotate-[2deg]">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl shadow-[0_12px_48px_rgba(0,0,0,0.75)] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_16px_64px_rgba(0,0,0,0.8)]">
                <Image
                  src="/photos/hero/hero-3.jpg"
                  alt="Accepting the Best Actor trophy at the Global Film Awards"
                  fill
                  sizes="(max-width: 768px) 40vw, 260px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* BOTTOM-LEFT card */}
          <div
            className="hero-photo absolute bottom-[-5%] left-[2%] w-[44%] z-10"
            style={{ animationDelay: "1s" }}
          >
            <div className="rotate-[4deg]">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_12px_56px_rgba(0,0,0,0.7)]">
                <Image
                  src="/photos/hero/hero-4.jpg"
                  alt="Stand-up comedy set at Comedy Live"
                  fill
                  sizes="(max-width: 768px) 45vw, 260px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* BOTTOM-RIGHT card */}
          <div
            className="hero-photo absolute bottom-[-6%] right-[-2%] w-[46%] z-10"
            style={{ animationDelay: "1.3s" }}
          >
            <div className="-rotate-[4deg]">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_12px_56px_rgba(0,0,0,0.7)]">
                <Image
                  src="/photos/hero/hero-5.jpg"
                  alt="Singing into a microphone on stage with a live band"
                  fill
                  sizes="(max-width: 768px) 45vw, 280px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* LIVE NOW badge — top center between cards */}
          <span
            className="hero-badge-float absolute left-[38%] top-[4%] z-30 inline-flex items-center gap-2 rounded-full border border-divider bg-[rgba(10,10,10,0.85)] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-accent shadow-lg backdrop-blur-md"
            style={{ animationDelay: "0s" }}
          >
            <span aria-hidden="true" className="hero-chip-dot h-1.5 w-1.5 rounded-full bg-accent" />
            Live now
          </span>

          {/* 🔥 reaction badge — bottom right */}
          <span
            className="hero-badge-float absolute bottom-[14%] right-[-1%] z-30 inline-flex items-center gap-1 rounded-full border border-divider bg-[rgba(10,10,10,0.85)] px-4 py-2 text-xs text-text shadow-lg backdrop-blur-md"
            style={{ animationDelay: "1.5s" }}
          >
            🔥 2.4k reacting
          </span>
        </div>
      </div>
    </section>
  );
}
