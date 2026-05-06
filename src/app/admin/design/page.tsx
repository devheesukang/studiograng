'use client'

import { useEffect, useState } from 'react'
import type { ContentConfig, Variant } from '@/lib/adminContent'

const VARIANTS: { id: Variant; name: string; font: string; accent: string; accentHex: string }[] = [
  { id: 'v1', name: 'Cinematic / Gold', font: 'Bebas Neue', accent: 'Gold', accentHex: '#C8A96E' },
  { id: 'v2', name: 'Embers / Copper', font: 'Bebas Neue', accent: 'Copper', accentHex: '#C1714A' },
  { id: 'v3', name: 'Slate / Contemporary', font: 'Syne', accent: 'Slate', accentHex: '#6B8CAE' },
]

export default function DesignAdminPage() {
  const [config, setConfig] = useState<ContentConfig | null>(null)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState<'idle' | 'saved' | 'error'>('idle')

  useEffect(() => {
    fetch('/api/admin/content')
      .then((r) => r.json())
      .then(setConfig)
  }, [])

  function selectVariant(v: Variant) {
    setConfig((prev) => (prev ? { ...prev, activeVariant: v } : prev))
  }

  async function handleSave() {
    if (!config) return
    setSaving(true)
    setStatus('idle')
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      })
      setStatus(res.ok ? 'saved' : 'error')
    } catch {
      setStatus('error')
    } finally {
      setSaving(false)
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  if (!config) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-xs text-neutral-500 tracking-widest uppercase">Loading…</span>
      </div>
    )
  }

  return (
    <div>
      <main className="max-w-2xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-xs tracking-[0.5em] uppercase text-neutral-500">Design Variant</h1>
          <div className="flex items-center gap-4">
            {status === 'saved' && (
              <span className="text-xs text-emerald-400 tracking-widest uppercase">Saved</span>
            )}
            {status === 'error' && (
              <span className="text-xs text-red-400 tracking-widest uppercase">Error — check Blob config</span>
            )}
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-white text-black text-xs font-medium px-5 py-2 tracking-widest uppercase hover:bg-neutral-200 transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>

        <p className="text-xs text-neutral-500 mb-8 leading-relaxed">
          Select which design variant appears on the public site. Changes take effect immediately after saving.
        </p>

        <div className="flex flex-col gap-3">
          {VARIANTS.map((v) => {
            const active = config.activeVariant === v.id
            return (
              <button
                key={v.id}
                onClick={() => selectVariant(v.id)}
                className="flex items-center gap-5 border px-5 py-4 text-left transition-colors"
                style={{
                  borderColor: active ? 'white' : '#262626',
                  background: active ? '#111' : 'transparent',
                }}
              >
                {/* Accent swatch */}
                <div
                  className="w-4 h-4 shrink-0"
                  style={{ background: v.accentHex }}
                />

                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white tracking-wide">{v.name}</p>
                  <p className="text-xs text-neutral-500 mt-0.5">{v.font} — {v.accent}</p>
                </div>

                <span
                  className="text-xs tracking-widest uppercase shrink-0"
                  style={{ color: active ? '#6ee7b7' : '#404040' }}
                >
                  {active ? 'Active' : v.id.toUpperCase()}
                </span>
              </button>
            )
          })}
        </div>
      </main>
    </div>
  )
}
