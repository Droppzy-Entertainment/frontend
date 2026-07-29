// Twitter card reuses the exact same generator as the OpenGraph image.
// Next.js's build-time static analysis for the special `runtime` export
// requires a literal declaration in this file — re-exporting it from
// opengraph-image.tsx is silently ignored (falls back to the default
// runtime), so it's declared directly here even though the value must be
// kept in sync with opengraph-image.tsx by hand.
export { default, size, contentType, alt } from "./opengraph-image";

// Reads the real logo PNG from disk via node:fs — requires Node.js, not Edge.
export const runtime = "nodejs";
