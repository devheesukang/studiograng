'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { usePathname } from 'next/navigation'
import { useAdminDirtyGuard } from '@/hooks/useAdminDirtyGuard'
import type { ContentConfig } from '@/lib/adminContent'

type SaveStatus = 'idle' | 'saved' | 'error'

interface AdminContentContextValue {
  config: ContentConfig | null
  setConfig: Dispatch<SetStateAction<ContentConfig | null>>
  loading: boolean
  saving: boolean
  status: SaveStatus
  dirty: boolean
  save: () => Promise<void>
}

const AdminContentContext = createContext<AdminContentContextValue | null>(null)

export function AdminContentProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const shouldLoadContent = pathname !== '/admin'
  const [config, setConfig] = useState<ContentConfig | null>(null)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState<SaveStatus>('idle')
  const { dirty, markSaved } = useAdminDirtyGuard(config)
  const loading = shouldLoadContent && !config && status !== 'error'

  useEffect(() => {
    if (!shouldLoadContent || config) return

    let cancelled = false

    fetch('/api/admin/content')
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return
        setConfig(data)
        markSaved(data)
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [config, markSaved, shouldLoadContent])

  async function save() {
    if (!config || saving || !dirty) return

    setSaving(true)
    setStatus('idle')
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      })

      if (res.ok) {
        markSaved(config)
        setStatus('saved')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    } finally {
      setSaving(false)
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <AdminContentContext.Provider value={{ config, setConfig, loading, saving, status, dirty, save }}>
      {children}
    </AdminContentContext.Provider>
  )
}

export function useAdminContent() {
  const context = useContext(AdminContentContext)
  if (!context) {
    throw new Error('useAdminContent must be used inside AdminContentProvider')
  }
  return context
}
