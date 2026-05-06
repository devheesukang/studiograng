'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

const LINKS = [
  { href: '/admin/photography', label: 'Photography' },
  { href: '/admin/videos', label: 'Videos' },
  { href: '/admin/info', label: 'Info' },
  { href: '/admin/design', label: 'Design' },
]

function NavLinks({ pathname, onNav }: { pathname: string; onNav?: () => void }) {
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/')
  }

  return (
    <div className="flex flex-col h-full">
      <Link
        href="/admin/dashboard"
        onClick={onNav}
        className="text-white text-xs tracking-[0.3em] uppercase font-light hover:opacity-70 transition-opacity mb-8"
      >
        Studio Grang
      </Link>

      <nav className="flex flex-col gap-0.5 flex-1">
        {LINKS.map(({ href, label }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              onClick={onNav}
              className="px-3 py-2 text-xs tracking-widest uppercase transition-colors"
              style={{
                background: active ? 'white' : 'transparent',
                color: active ? 'black' : '#888',
              }}
            >
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="flex flex-col gap-1 mt-auto pt-6 border-t border-neutral-800">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-2 text-xs tracking-widest uppercase text-neutral-500 hover:text-white transition-colors"
        >
          View Site ↗
        </Link>
        <button
          onClick={handleLogout}
          className="px-3 py-2 text-xs tracking-widest uppercase text-neutral-500 hover:text-white transition-colors text-left"
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}

export function AdminNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-48 flex-col border-r border-neutral-800 bg-neutral-950 px-5 py-6 z-40">
        <NavLinks pathname={pathname} />
      </aside>

      {/* Mobile top bar */}
      <header className="flex md:hidden fixed top-0 inset-x-0 h-12 items-center justify-between px-4 border-b border-neutral-800 bg-neutral-950 z-40">
        <Link
          href="/admin/dashboard"
          className="text-white text-xs tracking-[0.3em] uppercase font-light"
        >
          Studio Grang
        </Link>
        <button
          onClick={() => setOpen((v) => !v)}
          className="text-neutral-400 hover:text-white transition-colors p-1"
          aria-label="Toggle menu"
        >
          {open ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 2L16 16M16 2L2 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </header>

      {/* Mobile drawer */}
      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40 md:hidden"
            onClick={() => setOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 w-48 flex flex-col bg-neutral-950 border-r border-neutral-800 px-5 py-6 z-50 md:hidden">
            <NavLinks pathname={pathname} onNav={() => setOpen(false)} />
          </aside>
        </>
      )}
    </>
  )
}
