'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="w-8 h-8" />

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className="w-8 h-8 flex items-center justify-center transition-opacity opacity-60 hover:opacity-100"
    >
      {isDark ? (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.2">
          <circle cx="7.5" cy="7.5" r="2.5" />
          <line x1="7.5" y1="1" x2="7.5" y2="2.5" />
          <line x1="7.5" y1="12.5" x2="7.5" y2="14" />
          <line x1="1" y1="7.5" x2="2.5" y2="7.5" />
          <line x1="12.5" y1="7.5" x2="14" y2="7.5" />
          <line x1="2.93" y1="2.93" x2="3.99" y2="3.99" />
          <line x1="11.01" y1="11.01" x2="12.07" y2="12.07" />
          <line x1="2.93" y1="12.07" x2="3.99" y2="11.01" />
          <line x1="11.01" y1="3.99" x2="12.07" y2="2.93" />
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M12 10A5.5 5.5 0 0 1 5 3a5.5 5.5 0 1 0 7 7z" />
        </svg>
      )}
    </button>
  )
}
