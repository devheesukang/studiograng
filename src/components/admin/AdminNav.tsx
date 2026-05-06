'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAdminContent } from './AdminContentProvider'
import { AdminThemeToggle } from './AdminThemeToggle'
import { UNSAVED_MESSAGE } from '@/hooks/useAdminDirtyGuard'

const LINKS = [
  { href: '/admin/photography', label: 'Photography' },
  { href: '/admin/videos', label: 'Videos' },
  { href: '/admin/info', label: 'Info' },
  { href: '/admin/design', label: 'Design' },
]

function SaveControls() {
  const { dirty, saving, status, save } = useAdminContent()

  return (
    <div className="flex items-center gap-3">
      {dirty && (
        <span className="hidden text-[10px] tracking-widest uppercase text-amber-400 sm:inline">
          Unsaved
        </span>
      )}
      {!dirty && status === 'saved' && (
        <span className="hidden text-[10px] tracking-widest uppercase text-emerald-400 sm:inline">
          Saved
        </span>
      )}
      {status === 'error' && (
        <span className="hidden text-[10px] tracking-widest uppercase text-red-400 sm:inline">
          Error
        </span>
      )}
      <button
        onClick={save}
        disabled={saving || !dirty}
        className="bg-white px-4 py-2 text-xs font-medium tracking-widest uppercase text-black transition-colors hover:bg-neutral-200 disabled:opacity-50"
      >
        {saving ? 'Saving...' : 'Save'}
      </button>
    </div>
  )
}

function NavLinks({
  pathname,
  onNav,
  direction = 'row',
}: {
  pathname: string
  onNav?: () => void
  direction?: 'row' | 'column'
}) {
  const linkClass = direction === 'row'
    ? 'px-2 py-2 text-xs tracking-widest uppercase transition-colors'
    : 'px-3 py-2 text-xs tracking-widest uppercase transition-colors'

  return (
    <nav className={direction === 'row' ? 'flex items-center gap-4' : 'flex flex-col gap-0.5'}>
      {LINKS.map(({ href, label }) => {
        const active = pathname === href || pathname.startsWith(href + '/')
        return (
          <Link
            key={href}
            href={href}
            onClick={onNav}
            className={linkClass}
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
  )
}

function DrawerContent({ pathname, onNav }: { pathname: string; onNav: () => void }) {
  const router = useRouter()
  const { dirty } = useAdminContent()

  async function handleLogout() {
    if (dirty && !confirm(UNSAVED_MESSAGE)) return
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/')
  }

  function handleViewSite() {
    if (dirty && !confirm(UNSAVED_MESSAGE)) return
    const siteTab = window.open('/', '_blank')
    if (siteTab) siteTab.opener = null
    onNav?.()
  }

  return (
    <div className="flex flex-col h-full">
      <Link
        href="/admin/dashboard"
        onClick={onNav}
        className="text-white text-xs tracking-[0.3em] uppercase font-light hover:opacity-70 transition-opacity mb-8 truncate"
      >
        Studio Grang
      </Link>

      <div className="flex-1">
        <NavLinks pathname={pathname} onNav={onNav} direction="column" />
      </div>

      <div className="flex flex-col gap-1 mt-auto pt-6 border-t border-neutral-800">
        <div className="px-3 py-2">
          <AdminThemeToggle />
        </div>
        <button
          type="button"
          onClick={handleViewSite}
          className="px-3 py-2 text-left text-xs tracking-widest uppercase text-neutral-500 hover:text-white transition-colors"
        >
          View Site ↗
        </button>
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
      <header className="fixed top-0 inset-x-0 z-40 flex h-14 items-center justify-between gap-4 border-b border-neutral-800 bg-neutral-950/95 px-4 backdrop-blur md:px-6">
        <Link
          href="/admin/dashboard"
          className="min-w-0 truncate text-white text-xs tracking-[0.3em] uppercase font-light"
        >
          Studio Grang
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          <NavLinks pathname={pathname} direction="row" />
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-3">
          <SaveControls />
          <div className="hidden lg:block">
            <AdminThemeToggle />
          </div>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="shrink-0 text-neutral-400 hover:text-white transition-colors p-1 lg:hidden"
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

      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setOpen(false)}
          />
          <aside className="fixed inset-y-0 right-0 z-50 flex w-56 max-w-[calc(100vw-3rem)] flex-col border-l border-neutral-800 bg-neutral-950 px-5 py-6 lg:hidden">
            <DrawerContent pathname={pathname} onNav={() => setOpen(false)} />
          </aside>
        </>
      )}
    </>
  )
}
