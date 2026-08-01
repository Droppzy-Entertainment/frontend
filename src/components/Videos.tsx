import Image from "next/image";
import { Play } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PLACEHOLDER_VIDEOS } from "@/lib/videos";

export function Videos() {
  return (
    <Section id="videos">
      <SectionHeading eyebrow="Latest videos" heading="Fresh off the feed" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {PLACEHOLDER_VIDEOS.map((video, index) => (
          <article key={video.id} className="group cursor-pointer">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-divider shadow-md transition-transform duration-300 group-hover:scale-[1.02]">
              <Image
                src={video.thumbnail ?? `https://picsum.photos/seed/droppzy-video-${index + 1}/640/360`}
                alt={video.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/20"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/90 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                  <Play size={22} className="translate-x-[1px] fill-bg text-bg" />
                </span>
              </div>
            </div>

            <h3 className="card-title mt-4 text-xl font-heading uppercase tracking-[-0.03em] text-text transition-colors group-hover:text-accent">
              {video.title}
            </h3>
            <p className="card-meta mt-1 text-sm text-text-dim">
              {video.views} · {video.category}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
