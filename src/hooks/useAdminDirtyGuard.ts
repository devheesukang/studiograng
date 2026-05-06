'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

export const UNSAVED_MESSAGE = '변경사항이 저장되지 않을 수도 있습니다. 페이지를 떠나시겠습니까?'

function serialize(value: unknown): string {
  return JSON.stringify(value)
}

export function useAdminDirtyGuard<T>(value: T | null) {
  const currentSnapshot = useMemo(() => (value ? serialize(value) : null), [value])
  const [savedSnapshot, setSavedSnapshot] = useState<string | null>(null)

  const dirty = Boolean(currentSnapshot && savedSnapshot && currentSnapshot !== savedSnapshot)

  useEffect(() => {
    if (!dirty) return

    function handleBeforeUnload(event: BeforeUnloadEvent) {
      event.preventDefault()
      event.returnValue = UNSAVED_MESSAGE
    }

    function handleDocumentClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const target = event.target
      if (!(target instanceof Element)) return

      const link = target.closest('a[href]')
      if (!link) return
      const href = link.getAttribute('href')
      if (!href) return

      const url = new URL(href, window.location.href)
      if (url.origin === window.location.origin && url.pathname.startsWith('/admin')) return

      const confirmed = window.confirm(UNSAVED_MESSAGE)
      if (!confirmed) {
        event.preventDefault()
        event.stopPropagation()
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    document.addEventListener('click', handleDocumentClick, true)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      document.removeEventListener('click', handleDocumentClick, true)
    }
  }, [dirty])

  const markSaved = useCallback((nextValue: T) => {
    setSavedSnapshot(serialize(nextValue))
  }, [])

  return { dirty, markSaved }
}
