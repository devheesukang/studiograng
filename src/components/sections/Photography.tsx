'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GalleryGrid } from '@/components/ui/GalleryGrid'

interface PhotoProject {
  id: string
  title: string
  filterGroup: string
  images: string[]
}

interface Props {
  projects: PhotoProject[]
  filterLabels: Record<string, string>
  filterOrder: string[]
}

export function Photography({ projects, filterLabels, filterOrder }: Props) {
  const [active, setActive] = useState<string>('all')

  const items = useMemo(() => {
    const filtered =
      active === 'all'
        ? projects
        : projects.filter((p) => p.filterGroup === active)

    return filtered.flatMap((project) =>
      project.images.map((src) => ({
        src,
        alt: project.title,
      }))
    )
  }, [active, projects])

  return (
    <section
      id="photography"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-20 border-t"
      style={{ borderColor: 'var(--line)' }}
    >
      {/* Section header */}
      <motion.div
        className="mb-12 md:mb-16"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <p
          className="text-xs tracking-[0.5em] uppercase mb-4"
          style={{ color: 'var(--muted)' }}
        >
          Photography
        </p>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-1">
          {filterOrder.map((group) => (
            <button
              key={group}
              onClick={() => setActive(group)}
              className="px-5 py-2 text-xs tracking-widest uppercase transition-all duration-300"
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

      {/* Gallery */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <GalleryGrid items={items} />
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
