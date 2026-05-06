'use client'

import { useAdminTheme } from './AdminTheme'

export function AdminThemeToggle() {
  const { theme, toggleTheme } = useAdminTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle admin theme"
      className="flex h-8 w-8 items-center justify-center text-neutral-500 transition-colors hover:text-white"
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
