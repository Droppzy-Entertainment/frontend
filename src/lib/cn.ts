/**
 * Tiny hand-rolled classname joiner — filters falsy values and joins the
 * rest with a single space. Deliberately not `clsx`/`cva`: this covers the
 * variant-class-joining need of the ui/ primitives without adding a
 * dependency.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter((value): value is string => Boolean(value)).join(" ");
}
