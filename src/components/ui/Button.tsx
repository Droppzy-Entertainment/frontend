import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost";

export interface ButtonProps {
  variant?: ButtonVariant;
  icon?: boolean;
  block?: boolean;
  /**
   * Only meaningful when variant="secondary". Overrides the outline/text
   * color from var(--color-text) to var(--color-bg) so the button reads
   * correctly on top of a full-bleed accent-orange band (e.g. the
   * SubscribeStrip section), where the default white-on-transparent
   * secondary style would clash with the orange background.
   */
  onBand?: boolean;
  href?: string;
  leadingIcon?: LucideIcon;
  trailingIcon?: LucideIcon;
  isLoading?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  className?: string;
  children: ReactNode;
  disabled?: boolean;
  "aria-label"?: string;
}

/**
 * Small inline spinner shown when isLoading is true. Purely decorative
 * (the visible label is always retained per the accessibility bar), so it
 * is hidden from assistive tech.
 */
function Spinner() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z"
      />
    </svg>
  );
}

/**
 * Server Component (no hooks/state) — isLoading is just a boolean prop that
 * toggles disabled/aria-busy and a visual spinner, it doesn't require
 * client-side interactivity here.
 */
export function Button({
  variant = "primary",
  icon = false,
  block = false,
  onBand = false,
  href,
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
  isLoading = false,
  type = "button",
  className,
  children,
  disabled,
  ...rest
}: ButtonProps) {
  const classes = cn(
    "btn",
    `btn-${variant}`,
    icon && "btn-icon",
    block && "btn-block",
    variant === "secondary" &&
      onBand &&
      "border-[color:var(--color-bg)] text-[color:var(--color-bg)] hover:border-[color:var(--color-bg)]",
    isLoading && "opacity-60",
    className
  );

  const content = (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        LeadingIcon && <LeadingIcon aria-hidden="true" size={18} />
      )}
      {children}
      {!isLoading && TrailingIcon && <TrailingIcon aria-hidden="true" size={18} />}
    </>
  );

  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <Link
        href={href}
        className={classes}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        aria-busy={isLoading ? "true" : undefined}
        {...rest}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || isLoading}
      aria-busy={isLoading ? "true" : undefined}
      {...rest}
    >
      {content}
    </button>
  );
}
