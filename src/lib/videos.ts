export interface Video {
  id: string;
  title: string;
  views: string;
  category: string;
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
  { id: "video-1", title: "The 3am writers room", views: "1.2M views", category: "Comedy" },
  { id: "video-2", title: "Backstage: Season 2", views: "840K views", category: "Docuseries" },
  { id: "video-3", title: "Late Night, Ep. 14", views: "610K views", category: "Late Night" },
];
