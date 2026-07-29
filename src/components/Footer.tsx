import Image from "next/image";
import Link from "next/link";
import { Youtube } from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumnProps {
  heading: string;
  links: FooterLink[];
}

const CONTENT_LINKS: FooterLink[] = [
  { label: "What We Create", href: "#create" },
  { label: "Latest Videos", href: "#videos" },
];

const STUDIO_LINKS: FooterLink[] = [
  { label: "About", href: "#about" },
  { label: "Talent Form", href: "#talent" },
];

const CONTACT_LINKS: FooterLink[] = [{ label: "Get in touch", href: "#contact" }];

/**
 * One link column. Kept as a plain function (not exported) since it has no
 * reason to be reused outside this file.
 */
function FooterColumn({ heading, links }: FooterColumnProps) {
  return (
    <div className="flex min-w-[140px] flex-col gap-4">
      <p className="text-xs uppercase tracking-[0.1em] text-[color:var(--color-text-mute)]">
        {heading}
      </p>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-[color:var(--color-text-dim)] transition-colors hover:text-[color:var(--color-accent)]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Server Component — no hooks/state/browser APIs, so this stays fully
 * server-rendered. The old static template's footer layout was page-level
 * CSS rather than part of the shared component stylesheet, so the
 * flex/grid structure here is built with Tailwind utilities directly
 * instead of adding new globals.css classes.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[color:var(--color-divider)] bg-[color:var(--color-bg-2)] px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10">
        <div className="flex flex-wrap items-start justify-between gap-10">
          <div className="flex items-center gap-3">
            <Image
              // Real brand asset (copied from Downloads\droppzy\, not a
              // placeholder) — sized larger here than the navbar's lockup
              // per the footer's more prominent, standalone placement.
              src="/brand/droppzy-logo.png"
              alt="Droppzy Entertainment"
              width={145}
              height={40}
              className="h-10 w-auto"
            />
            <span className="nav-brand">Droppzy</span>
          </div>

          <div className="flex flex-wrap gap-12">
            <FooterColumn heading="Content" links={CONTENT_LINKS} />
            <FooterColumn heading="Studio" links={STUDIO_LINKS} />
            <FooterColumn heading="Contact" links={CONTACT_LINKS} />
          </div>
        </div>

        <hr className="hr" />

        <div className="flex flex-wrap items-center justify-between gap-6">
          <p className="text-sm text-[color:var(--color-text-mute)]">
            © {year} Droppzy Entertainment. All rights reserved.
          </p>

          <a
            // PLACEHOLDER: real Droppzy YouTube channel URL. This reads
            // NEXT_PUBLIC_YOUTUBE_CHANNEL_URL directly (literal
            // process.env access, per lib/env.ts's client/server-inlining
            // note) which itself is a placeholder value in .env.example
            // until the real channel exists.
            href={process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="btn btn-secondary btn-icon"
          >
            <Youtube aria-hidden="true" size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
