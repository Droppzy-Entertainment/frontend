import { Archivo_Black, Inter, Caveat } from "next/font/google";

/**
 * Nocturne type system, self-hosted via next/font/google.
 * Each font exposes a CSS custom property (`variable`) that globals.css
 * references via --font-heading / --font-body / --font-script. These
 * exports must be applied on the root <html>/<body> element in
 * app/layout.tsx (a later phase) so the variables exist at render time.
 */

export const archivoBlack = Archivo_Black({
  weight: "400",
  variable: "--font-archivo-black",
  subsets: ["latin"],
  display: "swap",
});

export const inter = Inter({
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const caveat = Caveat({
  weight: ["600", "700"],
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});
