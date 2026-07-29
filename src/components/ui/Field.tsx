import type { ReactNode } from "react";

export interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}

/**
 * Flat field wrapper: <div class="field"><label>{children}{hint}{error}</div>.
 * Matches the Nocturne `.field > label` contract 1:1 (no extra wrapper divs).
 */
export function Field({ label, htmlFor, error, hint, children }: FieldProps) {
  const hintId = hint ? `${htmlFor}-hint` : undefined;
  const errorId = error ? `${htmlFor}-error` : undefined;

  return (
    <div className="field">
      <label htmlFor={htmlFor}>{label}</label>
      {children}
      {hint && (
        <p id={hintId} className="mt-2 text-xs text-[color:var(--color-text-mute)]">
          {hint}
        </p>
      )}
      {error && (
        <p
          id={errorId}
          role="alert"
          /*
           * Pragmatic addition: Nocturne's design system is a mono-orange
           * scheme with no documented semantic error/danger color token, so
           * this uses a readable red that isn't part of the token set.
           */
          className="mt-2 text-xs font-medium text-[#FF6B6B]"
        >
          {error}
        </p>
      )}
    </div>
  );
}
