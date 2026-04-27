'use client'

import { useVariant, type Variant } from '@/lib/design-variant'

const VARIANTS: { key: Variant; label: string }[] = [
  { key: 'v1', label: 'V1' },
  { key: 'v2', label: 'V2' },
  { key: 'v3', label: 'V3' },
]

export function VariantSwitcher() {
  const { variant, setVariant } = useVariant()

  return (
    <div className="flex items-center gap-0.5" role="group" aria-label="Design variant">
      {VARIANTS.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => setVariant(key)}
          aria-pressed={variant === key}
          className={`px-1.5 py-0.5 text-[10px] tracking-widest uppercase transition-opacity ${
            variant === key
              ? 'opacity-100'
              : 'opacity-30 hover:opacity-60'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
