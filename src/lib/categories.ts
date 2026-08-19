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
 * form's checklist is checked server-side against lib/validation.ts's
 * TalentCategoryEnum, which only recognizes its own 4 values. Expanding
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
  value: "video-editor" | "videographer" | "content-creator" | "social-media-seo";
  label: string;
  description: string;
}

/**
 * The talent form's own category checklist — kept independent from
 * CATEGORIES above on purpose, since its values must match
 * lib/validation.ts's TalentCategoryEnum exactly (server-side validated,
 * not sourced from this file). Not the "What We Create" copy — do not
 * merge the two.
 */
export const TALENT_CATEGORY_OPTIONS: TalentCategoryOption[] = [
  {
    value: "video-editor",
    label: "Video Editor",
    description: "Cuts, pacing and post-production on finished episodes.",
  },
  {
    value: "videographer",
    label: "Videographer",
    description: "Shoots the footage that becomes the show.",
  },
  {
    value: "content-creator",
    label: "Content Creator",
    description: "Makes original content front to back.",
  },
  {
    value: "social-media-seo",
    label: "Social Media SEO",
    description: "Grows reach and discoverability across platforms.",
  },
];

