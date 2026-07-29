import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * PlaceholderImage renders an honest, CSS-only stand-in for real
 * photography — a warm dark gradient built from the design system's own
 * orange/titanium tones — reusing `.lighten`'s visual language. It is NOT
 * an attempt to impersonate a real photo.
 *
 * Every call site MUST:
 *   1. Pass a genuinely descriptive `label` (it becomes this figure's
 *      `aria-label`), e.g. "Hero collage photo 1 — cast still", never a
 *      generic "placeholder image" or "photo".
 *   2. Add its own `// PLACEHOLDER:` JSX comment at the call site naming
 *      exactly what real photography/asset belongs there.
 */
export type PlaceholderImageVariant = "gradient" | "icon";

export interface PlaceholderImageProps {
  label: string;
  aspect?: string;
  diagonal?: boolean;
  variant?: PlaceholderImageVariant;
  icon?: LucideIcon;
  className?: string;
}

export function PlaceholderImage({
  label,
  aspect = "4/5",
  diagonal = false,
  variant = "gradient",
  icon: Icon,
  className,
}: PlaceholderImageProps) {
  const figureStyle: CSSProperties = { aspectRatio: aspect };

  // Warm dark gradient: surface -> bg-2 -> titanium, with a faint accent
  // tint in the upper-left, echoing the same orange/titanium tonal
  // language as `.lighten`/`.surface-titanium` elsewhere in the system.
  const gradientStyle: CSSProperties = {
    background:
      "radial-gradient(circle at 28% 22%, color-mix(in srgb, var(--color-accent) 18%, transparent), transparent 55%), linear-gradient(155deg, var(--color-surface), var(--color-bg-2) 55%, var(--color-titanium) 100%)",
  };

  return (
    <figure
      role="img"
      aria-label={label}
      className={cn("lighten", diagonal && "clip-diagonal", className)}
      style={figureStyle}
    >
      <div className="flex h-full w-full items-center justify-center" style={gradientStyle}>
        {variant === "icon" && Icon && (
          <Icon aria-hidden="true" size={40} className="text-text-mute" />
        )}
      </div>
    </figure>
  );
}
