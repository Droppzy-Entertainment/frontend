import { ImageResponse } from "next/og";
import { getLogoDataUri, LOGO_ASPECT_RATIO } from "@/lib/og-assets";

// Reads the real logo PNG from disk via node:fs — requires Node.js, not Edge.
export const runtime = "nodejs";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * Square favicon generated from the real (wide, ~3.62:1) logo lockup rather
 * than a pre-cropped square-mark file (judgment call #10 in the plan) — the
 * logo is scaled down to fit within the canvas with margin, never cropped.
 */
export default function Icon() {
  const logoDataUri = getLogoDataUri();
  const logoWidth = 24;
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
        {/* This <img> is Satori/ImageResponse input consumed to rasterize a
            static PNG asset — it never reaches a browser DOM, so it carries
            no accessibility contract of its own (favicon has no alt text). */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoDataUri} width={logoWidth} height={logoHeight} alt="" />
      </div>
    ),
    { width: size.width, height: size.height },
  );
}
