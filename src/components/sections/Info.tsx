'use client'

import { motion } from 'framer-motion'

export function Info() {
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
          className="text-[9px] tracking-[0.5em] uppercase mb-5"
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
          Visual storyteller based in Seoul,
          <br />
          specializing in brand and content direction.
        </motion.p>

        <motion.a
          href="mailto:wolfkang0514@naver.com"
          className="text-[10px] tracking-widest uppercase transition-opacity hover:opacity-60 inline-block"
          style={{ color: 'var(--fg)' }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.28 }}
        >
          wolfkang0514@naver.com
        </motion.a>
      </div>
    </section>
  )
}
