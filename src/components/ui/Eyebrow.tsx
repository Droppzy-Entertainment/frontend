import type { ReactNode } from "react";

export interface EyebrowProps {
  children: ReactNode;
}

/**
 * Server Component. Purely semantic markup — the signature orange rule +
 * tracked orange caps is drawn entirely by the `.eyebrow` / `.eyebrow::before`
 * rules in globals.css.
 */
export function Eyebrow({ children }: EyebrowProps) {
  return <span className="eyebrow">{children}</span>;
}
