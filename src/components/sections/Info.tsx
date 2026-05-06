'use client'

import { motion } from 'framer-motion'
import type { ContentConfig } from '@/lib/adminContent'

interface Props {
  info: ContentConfig['info']
}

export function Info({ info }: Props) {
  return (
    <section
      id="info"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-20 border-t"
      style={{ borderColor: 'var(--line)' }}
    >
      <div className="max-w-lg">
        <motion.div
          className="w-8 h-px mb-10"
          style={{ background: 'var(--fg)' }}
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        />

        <motion.p
          className="text-xs md:text-sm tracking-[0.35em] uppercase mb-5"
          style={{ color: 'var(--muted)' }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Photographer &amp; Video Director
        </motion.p>

        <motion.h2
          className="leading-none mb-6"
          style={{
            fontFamily: 'var(--grang-font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            color: 'var(--fg)',
          }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Kang Bosun
        </motion.h2>

        <motion.p
          className="text-sm leading-relaxed mb-10"
          style={{ color: 'var(--muted)', fontFamily: 'var(--grang-font-body)' }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {info.bio}
        </motion.p>

        <motion.div
          className="flex flex-col gap-3"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.28 }}
        >
          <a
            href={`mailto:${info.email}`}
            className="text-sm md:text-base tracking-widest lowercase transition-opacity hover:opacity-60 inline-block"
            style={{ color: 'var(--fg)' }}
          >
            {info.email}
          </a>

          <span
            className="text-sm md:text-base tracking-widest inline-block"
            style={{ color: 'var(--muted)' }}
          >
            {info.phone}
          </span>

          <a
            href={`https://www.instagram.com/${info.instagram}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-opacity hover:opacity-60"
            style={{ color: 'var(--muted)' }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
            </svg>
            <span className="text-sm md:text-base tracking-widest">{info.instagram}</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
