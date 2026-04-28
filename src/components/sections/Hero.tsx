'use client'

import { motion } from 'framer-motion'
import { useVariant } from '@/lib/design-variant'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay: i * 0.15,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
}

/* ─── V1: Minimal ─────────────────────────────────────────── */
function HeroV1() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      <div className="flex flex-col items-center gap-5 text-center">
        <motion.h1
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="leading-none italic select-none"
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 300,
            fontSize: 'clamp(4.5rem, 15vw, 13rem)',
            color: 'var(--fg)',
          }}
        >
          Grang Studio
        </motion.h1>

        <motion.p
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-[10px] tracking-[0.5em] uppercase"
          style={{ color: 'var(--muted)' }}
        >
          Photography &amp; Video Direction
        </motion.p>
      </div>

      {/* Scroll indicator — pulsing vertical line */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
      >
        <span
          className="text-[9px] tracking-[0.4em] uppercase"
          style={{ color: 'var(--muted)' }}
        >
          Scroll
        </span>
        <motion.div
          className="w-px origin-top"
          style={{ height: 48, background: 'var(--muted)' }}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--bg))' }}
      />
    </section>
  )
}

/* ─── V2: Cinematic ───────────────────────────────────────── */
function HeroV2() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-end pb-20 px-8 md:px-16 overflow-hidden"
    >
      {/* Subtle noise grain */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.h1
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="leading-none"
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(5rem, 18vw, 18rem)',
            letterSpacing: '0.01em',
            color: 'var(--fg)',
          }}
        >
          Grang Studio
        </motion.h1>

        <motion.p
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-4 text-lg md:text-xl italic"
          style={{
            fontFamily: 'var(--font-cormorant)',
            color: 'var(--muted)',
          }}
        >
          Photography &amp; Video Direction
        </motion.p>
      </div>

      {/* Scroll chevron */}
      <motion.div
        className="absolute bottom-10 right-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            stroke="var(--muted)"
            strokeWidth="1.2"
          >
            <polyline points="4,7 9,12 14,7" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Bottom gradient into page bg */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to bottom, transparent, var(--bg))',
        }}
      />
    </section>
  )
}

/* ─── V3: Editorial ───────────────────────────────────────── */
function HeroV3() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center border-b px-8 md:px-16 lg:px-24"
      style={{ borderColor: 'var(--line)' }}
    >
      <div className="max-w-md">
        {/* Editorial horizontal rule */}
        <motion.div
          className="w-10 h-px mb-10"
          style={{ background: 'var(--fg)' }}
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        />

        <motion.h1
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="leading-none"
          style={{
            fontFamily: 'var(--font-playfair)',
            fontWeight: 700,
            fontSize: 'clamp(3.5rem, 8vw, 7rem)',
            color: 'var(--fg)',
          }}
        >
          Grang
          <br />
          <em>Studio</em>
        </motion.h1>

        <motion.p
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-[10px] tracking-[0.4em] uppercase mt-7"
          style={{ color: 'var(--muted)' }}
        >
          Photography &amp; Video Direction
        </motion.p>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-sm leading-relaxed mt-5"
          style={{ color: 'var(--muted)', fontFamily: 'var(--font-dm-sans)' }}
        >
          Visual storytelling based in Seoul,
          <br />
          specializing in brand and content direction.
        </motion.p>
      </div>
    </section>
  )
}

/* ─── Switcher ─────────────────────────────────────────────── */
export function Hero() {
  const { variant } = useVariant()
  if (variant === 'v2') return <HeroV2 />
  if (variant === 'v3') return <HeroV3 />
  return <HeroV1 />
}
