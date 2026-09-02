'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ImageLightbox } from '@/components/ui/ImageLightbox'

interface GalleryItem {
  src: string
  alt: string
}

interface GalleryGridProps {
  items: GalleryItem[]
}

const itemVariant = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: (i % 9) * 0.07,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
}

export function GalleryGrid({ items }: GalleryGridProps) {
  const [selected, setSelected] = useState<GalleryItem | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
        {items.map(({ src, alt }, index) => (
          <motion.div
            key={src}
            custom={index}
            variants={itemVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="self-start overflow-hidden"
            style={{ border: '1px solid var(--line)' }}
            onContextMenu={(event) => event.preventDefault()}
          >
            <div className="group relative w-full" style={{ aspectRatio: '4 / 5' }}>
              <Image
                src={src}
                alt={alt}
                fill
                draggable={false}
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <button
                type="button"
                className="absolute inset-0 z-10 cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-white"
                onClick={() => setSelected({ src, alt })}
                aria-label={`Open ${alt || 'image'} preview`}
              />
            </div>
          </motion.div>
        ))}
      </div>
      {selected ? (
        <ImageLightbox
          src={selected.src}
          alt={selected.alt}
          onClose={() => setSelected(null)}
        />
      ) : null}
    </>
  )
}
