export interface Category {
  value:
    | "celebrity-interviews"
    | "music-videos"
    | "pranks"
    | "game-shows"
    | "street-interviews"
    | "challenges"
    | "comedy"
    | "podcasts"
    | "behind-the-scenes"
    | "travel";
  label: string;
  description: string;
}

/**
 * Single source of truth for the "What We Create" display categories
 * (rendered by components/Categories.tsx). Copy is verbatim approved brand
 * copy — do not paraphrase.
 *
 * NOTE: intentionally decoupled from TALENT_CATEGORY_OPTIONS below — this
 * list feeds the display-only "What We Create" cards, while the talent
 * form's dropdown is checked server-side against lib/validation.ts's
 * TalentCategoryEnum, which only recognizes the 5 legacy values. Expanding
 * this list does not change what the talent form accepts.
 */
export const CATEGORIES: Category[] = [
  {
    value: "celebrity-interviews",
    label: "Celebrity Interviews",
    description: "Unfiltered conversations with the names everyone's talking about.",
  },
  {
    value: "music-videos",
    label: "Music Videos",
    description: "Original sound and visuals from artists on the rise.",
  },
  {
    value: "pranks",
    label: "Pranks",
    description: "Real reactions, no scripts, zero mercy.",
  },
  {
    value: "game-shows",
    label: "Game Shows",
    description: "High-stakes fun where anyone can win big.",
  },
  {
    value: "street-interviews",
    label: "Street Interviews",
    description: "Real people, real opinions, straight from the street.",
  },
  {
    value: "challenges",
    label: "Challenges",
    description: "Push the limits and see who makes it out.",
  },
  {
    value: "comedy",
    label: "Comedy",
    description: "Sketches and bits made to be shared.",
  },
  {
    value: "podcasts",
    label: "Podcasts",
    description: "Long-form talks with the people behind the scenes.",
  },
  {
    value: "behind-the-scenes",
    label: "Behind-the-Scenes",
    description: "The moments the camera usually cuts.",
  },
  {
    value: "travel",
    label: "Travel",
    description: "Chasing stories across the map.",
  },
];

export interface TalentCategoryOption {
  value: "comedy" | "docuseries" | "late-night" | "music" | "shorts-live" | "other";
  label: string;
  description: string;
}

/**
 * The talent form's own category list — kept independent from CATEGORIES
 * above on purpose, since its values must match lib/validation.ts's
 * TalentCategoryEnum exactly (server-side validated, not sourced from this
 * file). Not the "What We Create" copy — do not merge the two.
 */
const TALENT_FORM_CATEGORIES: TalentCategoryOption[] = [
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

/** TALENT_FORM_CATEGORIES plus a catch-all "Other" option, for the talent form's select. */
export const TALENT_CATEGORY_OPTIONS: TalentCategoryOption[] = [
  ...TALENT_FORM_CATEGORIES,
  { value: "other", label: "Other", description: "" },
];
