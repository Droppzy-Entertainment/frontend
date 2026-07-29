import type { Metadata } from "next";
import type { ReactNode } from "react";
import { headers } from "next/headers";
import { archivoBlack, inter, caveat } from "@/fonts";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

// PLACEHOLDER: falls back to localhost only if NEXT_PUBLIC_SITE_URL is
// unset (e.g. a local build before .env.local is configured) — production
// must set the real canonical site URL.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const SITE_NAME = "Droppzy Entertainment";

// Grammar-corrected hero subhead (see Hero.tsx — the source template had
// "not a upload folder", fixed to "not an upload folder"), reused verbatim
// as the site-wide meta description.
const SITE_DESCRIPTION =
  "Comedy, docuseries and late-night built for the feed that never sleeps. New drops every week — the crew that treats YouTube like a stage, not an upload folder.";

// Icons and OpenGraph/Twitter images are intentionally NOT set here — the
// file-convention generators (icon.tsx, apple-icon.tsx, opengraph-image.tsx,
// twitter-image.tsx) handle those automatically, so metadata stays the
// single source of truth for text fields only.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  // Read the per-request CSP nonce that middleware.ts forwarded via the
  // `x-nonce` request header (Next 15: `headers()` is async). Next's own
  // framework bootstrap scripts pick up nonce propagation automatically
  // once middleware sets the CSP correctly, and this app injects no custom
  // inline <script> of its own that would need the value directly — so it's
  // surfaced only as a `data-csp-nonce` attribute on <body> below, a
  // documented, zero-risk hook for any future inline script (or third-party
  // snippet requiring a nonce) to read via `document.body.dataset.cspNonce`
  // without needing server-only `next/headers` access (which Client
  // Components can't call). Deliberately NOT rendering a manual <head> here
  // to avoid any chance of conflicting with Next's own automatic metadata
  // head management.
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <html lang="en">
      <body
        className={`${archivoBlack.variable} ${inter.variable} ${caveat.variable} font-body`}
        data-csp-nonce={nonce}
      >
        <Navbar />
        <main id="top">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
