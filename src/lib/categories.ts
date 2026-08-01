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
 * TalentCategoryEnum, which only recognizes its own 3 values. Expanding
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
  value: "story-draft" | "illustration-design" | "other";
  label: string;
  description: string;
}

/**
 * The talent form's own category list — kept independent from CATEGORIES
 * above on purpose, since its values must match lib/validation.ts's
 * TalentCategoryEnum exactly (server-side validated, not sourced from this
 * file). Not the "What We Create" copy — do not merge the two.
 */
export const TALENT_CATEGORY_OPTIONS: TalentCategoryOption[] = [
  {
    value: "story-draft",
    label: "Story Draft",
    description: "Scripts, treatments and story ideas ready for the room.",
  },
  {
    value: "illustration-design",
    label: "Illustration Design",
    description: "Character art, key visuals and design work for the slate.",
  },
];

