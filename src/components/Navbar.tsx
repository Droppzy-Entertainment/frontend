"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

/**
 * Sticky, blurred site nav. Flat links + a text nav-brand fall back to a
 * hamburger/drawer pattern below Tailwind's `sm` breakpoint (judgment call
 * #8 in the plan: the Nocturne source just hides links under 560px with
 * nothing in their place, which is a real usability gap for a site that
 * must be "fully responsive... keyboard-navigable").
 */
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  const closeDrawer = () => setIsOpen(false);

  // Close on Escape and return focus to the toggle button for sighted
  // keyboard users tracking focus location.
  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        toggleButtonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <nav
      className={cn(
        "nav",
        "sticky top-0 z-50",
        "bg-[color-mix(in_srgb,var(--color-bg)_88%,transparent)]",
        "backdrop-blur-md"
      )}
    >
      <a href="#top" className="mr-auto flex items-center gap-2">
        {/* Real asset (copied from Downloads\droppzy\, not a placeholder) */}
        <Image
          src="/brand/droppzy-logo.png"
          alt="Droppzy Entertainment"
          width={116}
          height={32}
          className="h-8 w-auto"
          priority
        />
        {/* Hidden below `sm`: logo alone (with its alt text) carries the
            brand on narrow screens — with the Subscribe button and hamburger
            both needing room, the "Droppzy" wordmark text was the first
            thing to cut to keep the row from overflowing on phones. */}
        <span className="nav-brand hidden sm:inline">Droppzy</span>
      </a>

      <div className="hidden items-center gap-6 sm:flex">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>

      {/* Hidden below `sm` — showing this alongside the hamburger toggle
          overflowed the nav row on phones (logo + wordmark + button +
          hamburger together exceed the available width). It reappears
          inside the mobile drawer below instead. */}
      <Button
        href={
          // PLACEHOLDER: set the real Droppzy YouTube channel URL via the
          // NEXT_PUBLIC_YOUTUBE_CHANNEL_URL env var in production.
          process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_URL
        }
        variant="primary"
        className="hidden sm:inline-flex"
      >
        Subscribe
      </Button>

      <button
        ref={toggleButtonRef}
        type="button"
        className="btn btn-ghost btn-icon sm:hidden"
        aria-expanded={isOpen}
        aria-controls="mobile-nav-drawer"
        aria-label="Toggle navigation menu"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? <X aria-hidden="true" size={24} /> : <Menu aria-hidden="true" size={24} />}
      </button>

      {/*
        Always present in the DOM (so aria-controls always resolves to a
        real element) — visibility toggles via the `hidden` utility class.
        Nested inside <nav> so it inherits the ".nav a" link styling and
        the sticky positioning context for `absolute` placement below.
      */}
      <div
        id="mobile-nav-drawer"
        className={cn(
          "sm:hidden",
          "absolute inset-x-0 top-full",
          "flex-col gap-1 border-b border-divider px-6 py-4",
          "bg-[color-mix(in_srgb,var(--color-bg)_96%,transparent)] backdrop-blur-md",
          isOpen ? "flex" : "hidden"
        )}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="w-full py-2"
            onClick={closeDrawer}
          >
            {link.label}
          </a>
        ))}

        {/* The Subscribe CTA is hidden from the flat nav row below `sm`
            (see above) — restored here so mobile users keep access to it.
            No onClick to close the drawer: ButtonProps doesn't expose one,
            and it's an external link (opens in a new tab per Button's own
            isExternal handling), so leaving the drawer open behind it is
            harmless. */}
        <Button
          href={process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_URL}
          variant="primary"
          block
          className="mt-2"
        >
          Subscribe
        </Button>
      </div>
    </nav>
  );
}
