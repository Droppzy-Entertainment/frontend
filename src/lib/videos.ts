export interface Video {
  id: string;
  title: string;
  views: string;
  category: string;
  /** Overrides the picsum.photos placeholder with a real local thumbnail. */
  thumbnail?: string;
}

/**
 * PLACEHOLDER: static stand-in for the "Latest videos" section.
 *
 * v2 swap point — fetch real data server-side from the YouTube Data API v3
 * (search.list / playlistItems.list on the channel's uploads playlist)
 * inside a Server Component or a route handler, using a server-only API key
 * env var (e.g. YOUTUBE_API_KEY, never NEXT_PUBLIC_*) so the key never
 * reaches the client bundle. Keep the same `Video` shape (or extend it) so
 * downstream components don't need to change.
 */
export const PLACEHOLDER_VIDEOS: Video[] = [
  {
    id: "video-1",
    title: "Send help, not spoilers",
    views: "Right after the coffee kicks in",
    category: "Coming Soon",
    thumbnail: "/photos/videos/coming-soon.png",
  },
  {
    id: "video-2",
    title: "Plot twist: it's not out yet",
    views: "Currently lost in the edit bay",
    category: "Coming Soon",
    thumbnail: "/photos/videos/coming-soon.png",
  },
  {
    id: "video-3",
    title: "Premiering whenever we feel like it",
    views: "Buffering faster than our excuses",
    category: "Coming Soon",
    thumbnail: "/photos/videos/coming-soon.png",
  },
];
