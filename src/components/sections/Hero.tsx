'use client'

import Image from 'next/image'
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

const heroBg = '/images/cosmetics/foundation-1.jpg'

/* ─── V1: Cinematic / Gold ──────────────────────────────────── */
function HeroV1() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-end pb-20 px-8 md:px-16 overflow-hidden"
    >
      {/* Background image — atmospheric, not dominant */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 62%, transparent 96%)',
          maskImage: 'linear-gradient(to bottom, black 0%, black 62%, transparent 96%)',
        }}
      >
        <Image
          src={heroBg}
          alt=""
          fill
          priority
          className="object-cover opacity-[0.32]"
          sizes="100vw"
        />
      </div>

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

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--bg))' }}
      />
    </section>
  )
}

/* ─── V2: Embers / Copper ──────────────────────────────────── */
function HeroV2() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-end pb-20 px-8 md:px-16 overflow-hidden"
    >
      {/* Background image — atmospheric, not dominant */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 62%, transparent 96%)',
          maskImage: 'linear-gradient(to bottom, black 0%, black 62%, transparent 96%)',
        }}
      >
        <Image
          src={heroBg}
          alt=""
          fill
          priority
          className="object-cover opacity-[0.32]"
          sizes="100vw"
        />
      </div>

      {/* Subtle noise grain */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px',
        }}
      />

      {/* Copper accent rule */}
      <motion.div
        className="absolute top-16 left-8 md:left-16 h-px w-12"
        style={{ background: 'var(--accent)' }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
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

        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-4 flex items-center gap-4"
        >
          <div className="w-8 h-px shrink-0" style={{ background: 'var(--accent)' }} />
          <p
            className="text-sm tracking-[0.3em] uppercase"
            style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--accent)' }}
          >
            Photography &amp; Video Direction
          </p>
        </motion.div>
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
            stroke="var(--accent)"
            strokeWidth="1.2"
          >
            <polyline points="4,7 9,12 14,7" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--bg))' }}
      />
    </section>
  )
}

/* ─── V3: Slate / Contemporary ──────────────────────────────── */
function HeroV3() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 overflow-hidden"
    >
      {/* Background image — atmospheric, not dominant */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 62%, transparent 96%)',
          maskImage: 'linear-gradient(to bottom, black 0%, black 62%, transparent 96%)',
        }}
      >
        <Image
          src={heroBg}
          alt=""
          fill
          priority
          className="object-cover opacity-[0.32]"
          sizes="100vw"
        />
      </div>

      {/* Geometric accent — vertical right bar */}
      <motion.div
        className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 w-px"
        style={{ height: 120, background: 'var(--accent)' }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      />

      <div className="relative z-10 max-w-4xl">
        <motion.p
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-xs tracking-[0.5em] uppercase mb-8"
          style={{ color: 'var(--accent)', fontFamily: 'var(--font-dm-sans)' }}
        >
          Photography &amp; Video Direction
        </motion.p>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="leading-[0.9] mb-10"
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 800,
            fontSize: 'clamp(4.5rem, 14vw, 14rem)',
            color: 'var(--fg)',
          }}
        >
          Grang
          <br />
          Studio
        </motion.h1>

        <motion.div
          className="w-16 h-0.5"
          style={{ background: 'var(--accent)' }}
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        />
      </div>

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--bg))' }}
      />
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
