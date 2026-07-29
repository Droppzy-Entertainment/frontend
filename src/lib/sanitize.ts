/**
 * Defense-in-depth string helpers applied just before building the email
 * payload in lib/mail.ts. Zod (lib/validation.ts) remains the validation
 * authority — these are pure, side-effect-free transforms only, never a
 * substitute for schema validation.
 */

const HTML_ESCAPE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export function escapeHtml(str: string): string {
  return str.replace(/[&<>"']/g, (char) => HTML_ESCAPE_MAP[char] ?? char);
}

export function collapseWhitespace(str: string): string {
  return str.replace(/\s+/g, " ").trim();
}

/**
 * Strips carriage-return and newline characters specifically (the header
 * injection vector for raw email headers such as Reply-To/Subject), plus
 * other ASCII control characters.
 */
export function stripControlChars(str: string): string {
  return str.replace(/[\r\n\x00-\x08\x0b\x0c\x0e-\x1f]/g, "");
}

export function truncate(str: string, max: number): string {
  if (str.length <= max) return str;
  return str.slice(0, max);
}
