import { ImageResponse } from "next/og";
import { getLogoDataUri, LOGO_ASPECT_RATIO } from "@/lib/og-assets";

// Reads the real logo PNG from disk via node:fs — requires Node.js, not Edge.
export const runtime = "nodejs";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * Apple touch icon — same generation technique as icon.tsx, larger canvas.
 * See icon.tsx for the rationale (judgment call #10 in the plan).
 */
export default function AppleIcon() {
  const logoDataUri = getLogoDataUri();
  const logoWidth = 132;
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoDataUri} width={logoWidth} height={logoHeight} alt="" />
      </div>
    ),
    { width: size.width, height: size.height },
  );
}
