export interface Category {
  value: "comedy" | "docuseries" | "late-night" | "music" | "shorts-live";
  label: string;
  description: string;
}

/**
 * Single source of truth for the 5 "What We Create" categories. Copy is
 * verbatim brand copy from the approved plan — do not paraphrase.
 */
export const CATEGORIES: Category[] = [
  {
    value: "comedy",
    label: "Comedy",
    description: "Sketches, panel shows and bits that only work at 1am.",
  },
  {
    value: "docuseries",
    label: "Docuseries",
    description: "Long-form profiles of people who don't sleep either.",
  },
  {
    value: "late-night",
    label: "Late Night",
    description: "A weekly show shot after the rest of the internet clocks out.",
  },
  {
    value: "music",
    label: "Music",
    description: "Sessions, drops and the occasional 2am freestyle.",
  },
  {
    value: "shorts-live",
    label: "Shorts & Live",
    description: "Same voice, cut for the scroll and the stream.",
  },
];

export interface TalentCategoryOption {
  value: "comedy" | "docuseries" | "late-night" | "music" | "shorts-live" | "other";
  label: string;
  description: string;
}

/** CATEGORIES plus a catch-all "Other" option, for the talent form's select. */
export const TALENT_CATEGORY_OPTIONS: TalentCategoryOption[] = [
  ...CATEGORIES,
  { value: "other", label: "Other", description: "" },
];
