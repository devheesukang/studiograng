'use client'

import { createContext, useContext, useEffect, useState } from 'react'

export type Variant = 'v1' | 'v2' | 'v3'

const VARIANTS: Variant[] = ['v1', 'v2', 'v3']
const STORAGE_KEY = 'grang-design-variant'
const DEFAULT: Variant = 'v1'

interface VariantContextValue {
  variant: Variant
  setVariant: (v: Variant) => void
}

const VariantContext = createContext<VariantContextValue>({
  variant: DEFAULT,
  setVariant: () => {},
})

export function DesignVariantProvider({ children }: { children: React.ReactNode }) {
  const [variant, setVariantState] = useState<Variant>(DEFAULT)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Variant | null
    if (stored && VARIANTS.includes(stored)) {
      setVariantState(stored)
    }
  }, [])

  const setVariant = (v: Variant) => {
    setVariantState(v)
    localStorage.setItem(STORAGE_KEY, v)
    document.documentElement.setAttribute('data-design', v)
  }

  return (
    <VariantContext.Provider value={{ variant, setVariant }}>
      {children}
    </VariantContext.Provider>
  )
}

export const useVariant = () => useContext(VariantContext)
