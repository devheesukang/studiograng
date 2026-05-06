'use client'

import { useEffect, useState } from 'react'
import { ThemeToggle } from './ThemeToggle'
import { VariantSwitcher } from './VariantSwitcher'

const NAV_LINKS = [
  { label: 'Photography', href: '#photography' },
  { label: 'Video', href: '#video' },
  { label: 'Design', href: '#design' },
  { label: 'Info', href: '#info' },
]

const NAV_HEIGHT = 72

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT
  window.scrollTo({ top, behavior: 'smooth' })
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1))
    const observers: IntersectionObserver[] = []

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0.4 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'var(--nav-scrolled-bg)' : 'var(--nav-initial-bg)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
          color: 'var(--nav-fg)',
        }}
      >
        <nav className="max-w-screen-xl mx-auto px-6 h-[72px] flex items-center justify-between">
          {/* Wordmark */}
          <a
            href="#"
            className="text-xs tracking-[0.25em] uppercase font-body transition-opacity hover:opacity-60"
            style={{ fontFamily: 'var(--grang-font-body)' }}
          >
            Studio Grang
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.slice(1)
              return (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(id) }}
                    className={`text-xs tracking-widest uppercase transition-opacity ${
                      activeSection === id ? 'opacity-100' : 'opacity-40 hover:opacity-80'
                    }`}
                  >
                    {label}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <VariantSwitcher />
            <div className="w-px h-3 bg-current opacity-20" />
            <ThemeToggle />

            {/* Hamburger (mobile) */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="md:hidden w-8 h-8 flex flex-col justify-center items-center gap-1.5"
            >
              <span
                className="block w-5 h-px bg-current transition-all duration-300 origin-center"
                style={{ transform: menuOpen ? 'rotate(45deg) translateY(3px)' : 'none' }}
              />
              <span
                className="block w-5 h-px bg-current transition-all duration-300"
                style={{ opacity: menuOpen ? 0 : 1 }}
              />
              <span
                className="block w-5 h-px bg-current transition-all duration-300 origin-center"
                style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-3px)' : 'none' }}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <div
        className="fixed inset-0 z-40 md:hidden flex flex-col justify-center items-center transition-all duration-500"
        style={{
          background: 'var(--bg)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
        }}
      >
        <ul className="flex flex-col items-center gap-10">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={(e) => { e.preventDefault(); setMenuOpen(false); scrollToSection(href.slice(1)) }}
                className="text-2xl tracking-widest uppercase opacity-80 hover:opacity-100 transition-opacity"
                style={{ fontFamily: 'var(--grang-font-display)' }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
