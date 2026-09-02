'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { VideoConfig } from '@/lib/adminContent'

function getEmbedUrl(video: VideoConfig): string | null {
  if (video.youtubeIds && video.youtubeIds.length > 0) {
    return `https://www.youtube-nocookie.com/embed/${video.youtubeIds[0]}?rel=0&modestbranding=1`
  }
  if (video.youtubeId) {
    return `https://www.youtube-nocookie.com/embed/${video.youtubeId}?rel=0&modestbranding=1`
  }
  if (video.playlistId) {
    return `https://www.youtube-nocookie.com/embed/videoseries?list=${video.playlistId}&rel=0&modestbranding=1`
  }
  return null
}

function VideoCard({ video, index }: { video: VideoConfig; index: number }) {
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
        <div className="flex items-baseline gap-3">
          <p
            className="text-xs tracking-wide leading-snug"
            style={{ color: 'var(--fg)' }}
          >
            {video.title}
          </p>
          {video.youtubeIds && video.youtubeIds.length > 1 && (
            <span
              className="text-[9px] tracking-widest uppercase shrink-0"
              style={{ color: 'var(--accent)' }}
            >
              {video.youtubeIds.length} videos
            </span>
          )}
        </div>
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

interface Props {
  videos: VideoConfig[]
  filterLabels: Record<string, string>
  filterOrder: string[]
}

export function Video({ videos, filterLabels, filterOrder }: Props) {
  const [active, setActive] = useState('all')
  const visibleVideos = useMemo(
    () => active === 'all'
      ? videos
      : videos.filter((video) => (video.filterGroup ?? 'videos') === active),
    [active, videos]
  )

  return (
    <section
      id="video"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-20 border-t"
      style={{ borderColor: 'var(--line)' }}
    >
      <motion.div
        className="mb-12 md:mb-16"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <p className="mb-4 text-[9px] uppercase tracking-[0.5em]" style={{ color: 'var(--muted)' }}>
          Video
        </p>
        <div className="flex flex-wrap gap-1">
          {filterOrder.map((group) => (
            <button
              key={group}
              onClick={() => setActive(group)}
              className="px-5 py-2 text-xs uppercase tracking-widest transition-all duration-300"
              style={{
                background: active === group ? 'var(--fg)' : 'transparent',
                color: active === group ? 'var(--bg)' : 'var(--muted)',
                border: '1px solid',
                borderColor: active === group ? 'var(--fg)' : 'var(--line)',
              }}
            >
              {filterLabels[group] ?? group}
            </button>
          ))}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:gap-14"
        >
          {visibleVideos.map((video, index) => (
            <VideoCard key={video.id} video={video} index={index} />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
