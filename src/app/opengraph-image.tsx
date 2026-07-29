import { ImageResponse } from "next/og";
import { getLogoDataUri, LOGO_ASPECT_RATIO } from "@/lib/og-assets";

// Reads the real logo PNG from disk via node:fs — requires Node.js, not Edge.
export const runtime = "nodejs";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Droppzy Entertainment";

/**
 * Shared OG/Twitter card generator: the real logo centered on the void
 * background (`--color-bg` / #050505) with a soft accent-orange radial
 * glow behind it, echoing the brand's stage-spotlight motif. `twitter-image.tsx`
 * re-exports this file's default export + metadata directly (Next supports
 * reusing one generator for both conventions).
 */
export default function Image() {
  const logoDataUri = getLogoDataUri();
  const logoWidth = 760;
  const logoHeight = Math.round(logoWidth / LOGO_ASPECT_RATIO);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#050505",
        }}
      >
        {/* Spotlight glow, painted first so the logo layers on top of it. */}
        <div
          style={{
            position: "absolute",
            display: "flex",
            width: 1000,
            height: 1000,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(241,90,41,0.35) 0%, rgba(241,90,41,0) 70%)",
            zIndex: 0,
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoDataUri}
          width={logoWidth}
          height={logoHeight}
          alt=""
          style={{ position: "relative", zIndex: 1 }}
        />
      </div>
    ),
    { width: size.width, height: size.height },
  );
}
