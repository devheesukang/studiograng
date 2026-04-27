'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { designWork } from '@/lib/portfolio'

export function Design() {
  return (
    <section
      id="design"
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
        Design
      </motion.p>

      <div className="space-y-16 md:space-y-24">
        {designWork.map((work, wi) => (
          <motion.div
            key={work.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
              duration: 0.8,
              delay: wi * 0.05,
              ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
            }}
          >
            <p
              className="text-[9px] tracking-widest uppercase mb-5"
              style={{ color: 'var(--muted)' }}
            >
              {work.title}
            </p>

            <div
              className={`grid gap-3 md:gap-4 ${
                work.images.length === 1
                  ? 'grid-cols-1 max-w-lg'
                  : work.images.length === 2
                    ? 'grid-cols-1 sm:grid-cols-2'
                    : work.images.length === 3
                      ? 'grid-cols-1 sm:grid-cols-3'
                      : 'grid-cols-2 sm:grid-cols-4'
              }`}
            >
              {work.images.map((src, ii) => (
                <motion.div
                  key={src}
                  className="overflow-hidden group"
                  style={{ border: '1px solid var(--line)' }}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: ii * 0.08,
                    ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
                  }}
                >
                  <Image
                    src={src}
                    alt={work.title}
                    width={600}
                    height={800}
                    className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
