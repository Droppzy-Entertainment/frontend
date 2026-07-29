import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

export type CardElevation = "sm" | "md" | "lg";

export interface CardProps {
  featured?: boolean;
  kicker?: string;
  title: string;
  body?: string;
  meta?: string;
  elevation?: CardElevation;
  icon?: LucideIcon;
  className?: string;
}

/**
 * Server Component. Composes the `.card`/`.card-featured`/`.card-kicker`/
 * `.card-title`/`.card-body`/`.card-meta`/`.elev-*` contracts from
 * globals.css. Every optional field is only rendered when provided.
 */
export function Card({
  featured = false,
  kicker,
  title,
  body,
  meta,
  elevation,
  icon: Icon,
  className,
}: CardProps) {
  return (
    <div
      className={cn(
        "card",
        featured && "card-featured",
        elevation && `elev-${elevation}`,
        className
      )}
    >
      {Icon && <Icon aria-hidden="true" size={28} className="text-accent" />}
      {kicker && <p className="card-kicker">{kicker}</p>}
      <h3 className="card-title">{title}</h3>
      {body && <p className="card-body">{body}</p>}
      {meta && <p className="card-meta">{meta}</p>}
    </div>
  );
}
