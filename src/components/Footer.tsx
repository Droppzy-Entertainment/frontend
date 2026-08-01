import Image from "next/image";
import Link from "next/link";
import { Youtube, Instagram, MessageCircle } from "lucide-react";

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
  { label: "About Us", href: "#about" },
  { label: "Talent Form", href: "#talent" },
];

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

export function Footer() {
  const year = new Date().getFullYear();

  const youtubeUrl =
    process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_URL ||
    "https://www.youtube.com/@DroppzyEntertainment";
  const instagramUrl =
    "https://www.instagram.com/droppzyentertainment?utm_source=qr";
  const whatsappUrl =
    "https://whatsapp.com/channel/0029Vb8GCUUADTO971t9yn08";

  return (
    <footer className="border-t border-[color:var(--color-divider)] bg-[color:var(--color-bg-2)] px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10">
        <div className="flex flex-wrap items-start justify-between gap-10">
          <div className="flex items-center gap-3">
            <Image
              src="/brand/DROPPZY LOGO 2-white.png"
              alt="Droppzy Entertainment"
              width={200}
              height={56}
              className="h-12 w-auto"
            />
          </div>

          <div className="flex flex-wrap gap-12">
            <FooterColumn heading="Content" links={CONTENT_LINKS} />
            <FooterColumn heading="Studio" links={STUDIO_LINKS} />
          </div>
        </div>

        <hr className="hr" />

        <div className="flex flex-wrap items-center justify-between gap-6">
          <p className="text-sm text-[color:var(--color-text-mute)]">
            © {year} Droppzy Entertainment. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="btn btn-secondary btn-icon transition-transform hover:scale-110"
            >
              <Youtube aria-hidden="true" size={18} />
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="btn btn-secondary btn-icon transition-transform hover:scale-110"
            >
              <Instagram aria-hidden="true" size={18} />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Channel"
              className="btn btn-secondary btn-icon transition-transform hover:scale-110"
            >
              <MessageCircle aria-hidden="true" size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
