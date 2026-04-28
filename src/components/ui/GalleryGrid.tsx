'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

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
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
      {items.map(({ src, alt }, i) => (
        <motion.div
          key={src}
          custom={i}
          variants={itemVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="self-start overflow-hidden"
          style={{ border: '1px solid var(--line)' }}
          onContextMenu={(e) => e.preventDefault()}
        >
          <div className="relative w-full group cursor-pointer">
            <Image
              src={src}
              alt={alt}
              width={800}
              height={600}
              draggable={false}
              className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Transparent overlay — deters casual right-click / drag download */}
            <div className="absolute inset-0 z-10" />
          </div>
        </motion.div>
      ))}
    </div>
  )
}
