'use client'

import { createContext, useContext, useState } from 'react'

type AdminTheme = 'dark' | 'light'

const STORAGE_KEY = 'studio-grang-admin-theme'

const AdminThemeContext = createContext<{
  theme: AdminTheme
  toggleTheme: () => void
} | null>(null)

function getInitialTheme(): AdminTheme {
  if (typeof window === 'undefined') return 'dark'
  return localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark'
}

export function AdminThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<AdminTheme>(getInitialTheme)

  function toggleTheme() {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark'
      localStorage.setItem(STORAGE_KEY, next)
      return next
    })
  }

  return (
    <AdminThemeContext.Provider value={{ theme, toggleTheme }}>
      <div data-admin-theme={theme} className="admin-shell min-h-screen w-full">
        {children}
      </div>
    </AdminThemeContext.Provider>
  )
}

export function useAdminTheme() {
  const context = useContext(AdminThemeContext)
  if (!context) {
    throw new Error('useAdminTheme must be used inside AdminThemeProvider')
  }
  return context
}
