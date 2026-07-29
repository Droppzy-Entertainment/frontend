import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Shared helper for the `next/og` `ImageResponse` file-convention routes
 * (icon.tsx / apple-icon.tsx / opengraph-image.tsx — twitter-image.tsx
 * re-exports opengraph-image.tsx's generator rather than calling this
 * again). `ImageResponse`'s Satori-based JSX cannot resolve `next/image`
 * or relative `/public` URLs, so the real logo PNG is read from disk with
 * Node's `fs` module and inlined as a base64 data URI instead. This is the
 * REAL brand asset (copied from `Downloads\droppzy\`, not a placeholder) —
 * only the generated-icon *technique* is a workaround, not the image data.
 *
 * Requires the Node.js runtime (each caller sets `export const runtime =
 * "nodejs"`) since `node:fs` is unavailable under the Edge runtime.
 */

let cachedLogoDataUri: string | null = null;

export function getLogoDataUri(): string {
  if (cachedLogoDataUri) return cachedLogoDataUri;

  const filePath = join(process.cwd(), "public", "brand", "droppzy-logo.png");
  const fileBuffer = readFileSync(filePath);
  cachedLogoDataUri = `data:image/png;base64,${fileBuffer.toString("base64")}`;
  return cachedLogoDataUri;
}

/**
 * The real lockup is a wide wordmark (~4762x1316px, confirmed at copy time),
 * not a square mark — roughly 3.62:1. Callers must scale it down to fit
 * their canvas by width (or height) and derive the other dimension from
 * this ratio, so the logo is never stretched or cropped.
 */
export const LOGO_ASPECT_RATIO = 4762 / 1316;
