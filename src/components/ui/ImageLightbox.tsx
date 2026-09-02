'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'

interface ImageLightboxProps {
  src: string
  alt: string
  onClose: () => void
}

export function ImageLightbox({ src, alt, onClose }: ImageLightboxProps) {
  function handleImageAreaClick(event: React.MouseEvent<HTMLDivElement>) {
    const image = event.currentTarget.querySelector('img')
    if (!image || !image.naturalWidth || !image.naturalHeight) {
      onClose()
      return
    }

    const container = event.currentTarget.getBoundingClientRect()
    const imageRatio = image.naturalWidth / image.naturalHeight
    const containerRatio = container.width / container.height
    const renderedWidth = imageRatio > containerRatio
      ? container.width
      : container.height * imageRatio
    const renderedHeight = imageRatio > containerRatio
      ? container.width / imageRatio
      : container.height
    const imageLeft = container.left + (container.width - renderedWidth) / 2
    const imageTop = container.top + (container.height - renderedHeight) / 2
    const clickedImage =
      event.clientX >= imageLeft &&
      event.clientX <= imageLeft + renderedWidth &&
      event.clientY >= imageTop &&
      event.clientY <= imageTop + renderedHeight

    if (!clickedImage) onClose()
  }

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${alt || 'Image'} preview`}
      className="image-lightbox-protected fixed inset-0 z-[1000] bg-black/85 backdrop-blur-sm"
      onClick={onClose}
      onContextMenu={(event) => event.preventDefault()}
      onDragStart={(event) => event.preventDefault()}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/40 text-2xl font-light text-white transition-colors hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-6 sm:top-6"
        aria-label="Close image preview"
        autoFocus
      >
        ×
      </button>
      <div
        className="absolute inset-x-3 bottom-3 top-16 overflow-hidden sm:inset-x-8 sm:bottom-8 sm:top-20 lg:inset-x-12 lg:bottom-12"
        onClick={(event) => {
          event.stopPropagation()
          handleImageAreaClick(event)
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          unoptimized
          sizes="100vw"
          className="select-none object-contain"
          draggable={false}
        />
      </div>
    </div>,
    document.body
  )
}
