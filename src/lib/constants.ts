export const SITE_NAME = "Droppzy Entertainment";

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Content", href: "#create" },
  { label: "Talent", href: "#talent" },
];

// NEXT_PUBLIC_YOUTUBE_CHANNEL_URL should be read directly via
// `process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_URL` inside Client Components
// (per the pattern documented in lib/env.ts), not re-exported from here.
