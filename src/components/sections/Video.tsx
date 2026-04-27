'use client'

import { motion } from 'framer-motion'
import { videos, type VideoProject } from '@/lib/portfolio'

function getEmbedUrl(video: VideoProject): string | null {
  if (video.youtubeId) {
    return `https://www.youtube-nocookie.com/embed/${video.youtubeId}?rel=0&modestbranding=1`
  }
  if (video.playlistId) {
    return `https://www.youtube-nocookie.com/embed/videoseries?list=${video.playlistId}&rel=0&modestbranding=1`
  }
  return null
}

function VideoCard({ video, index }: { video: VideoProject; index: number }) {
  const embedUrl = getEmbedUrl(video)

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      }}
      className="group"
    >
      {/* Video embed or placeholder */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: '16 / 9',
          background: 'var(--line)',
          border: '1px solid var(--line)',
        }}
      >
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-[9px] tracking-widest uppercase"
              style={{ color: 'var(--muted)' }}
            >
              Coming soon
            </span>
          </div>
        )}
      </div>

      {/* Card metadata */}
      <div className="mt-3 flex items-baseline justify-between gap-4">
        <p
          className="text-xs tracking-wide leading-snug"
          style={{ color: 'var(--fg)' }}
        >
          {video.title}
        </p>
        {video.year && (
          <span
            className="text-[9px] tracking-widest uppercase shrink-0"
            style={{ color: 'var(--muted)' }}
          >
            {video.year}
          </span>
        )}
      </div>
    </motion.div>
  )
}

export function Video() {
  return (
    <section
      id="video"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-20 border-t"
      style={{ borderColor: 'var(--line)' }}
    >
      <motion.p
        className="text-[9px] tracking-[0.5em] uppercase mb-12 md:mb-16"
        style={{ color: 'var(--muted)' }}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      >
        Video
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-14">
        {videos.map((video, i) => (
          <VideoCard key={video.id} video={video} index={i} />
        ))}
      </div>
    </section>
  )
}
