'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useAdminContent } from '@/components/admin/AdminContentProvider'
import { projects as defaultProjects } from '@/lib/portfolio'
import { getUploadedBlobPathname } from '@/lib/blobPath'
import type { ContentConfig, ProjectConfig, ImageEntry } from '@/lib/adminContent'

const DEFAULT_PROJECT_IDS = new Set(defaultProjects.map((project) => project.id))

// ─── Sortable image tile ───────────────────────────────────────────────────

function SortableImage({
  entry,
  onToggle,
  onDelete,
}: {
  entry: ImageEntry
  onToggle: () => void
  onDelete: () => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: entry.src })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex min-w-0 items-center gap-3 border border-neutral-800 px-3 py-2"
    >
      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        className="text-neutral-600 hover:text-neutral-400 cursor-grab active:cursor-grabbing shrink-0 touch-none"
        aria-label="Drag to reorder"
      >
        ⠿
      </button>

      {/* Thumbnail */}
      <div className="w-10 h-10 relative shrink-0 bg-neutral-800 overflow-hidden">
        <Image src={entry.src} alt="" fill className="object-cover" unoptimized />
      </div>

      {/* Filename */}
      <span className="text-xs text-neutral-400 truncate flex-1 min-w-0">
        {entry.src.split('/').pop()}
      </span>

      {/* Visibility toggle */}
      <button
        onClick={onToggle}
        className="shrink-0 text-xs tracking-widest uppercase transition-colors"
        style={{ color: entry.visible ? '#6ee7b7' : '#6b7280' }}
        aria-label={entry.visible ? 'Hide image' : 'Show image'}
      >
        {entry.visible ? 'On' : 'Off'}
      </button>

      <button
        onClick={onDelete}
        className="shrink-0 text-xs tracking-widest uppercase text-red-500 hover:text-red-400 transition-colors"
        aria-label="Delete image"
      >
        Del
      </button>
    </div>
  )
}

// ─── Category block ────────────────────────────────────────────────────────

function CategoryBlock({
  project,
  onToggleCategory,
  onToggleImage,
  onDeleteImage,
  onReorderImages,
  onUpload,
}: {
  project: ProjectConfig
  onToggleCategory: () => void
  onToggleImage: (src: string) => void
  onDeleteImage: (src: string) => void
  onReorderImages: (images: ImageEntry[]) => void
  onUpload: (projectId: string, file: File) => Promise<void>
}) {
  const sensors = useSensors(useSensor(PointerSensor))
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = project.images.findIndex((img) => img.src === active.id)
      const newIndex = project.images.findIndex((img) => img.src === over.id)
      onReorderImages(arrayMove(project.images, oldIndex, newIndex))
    }
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    await onUpload(project.id, file)
    setUploading(false)
    e.target.value = ''
  }

  return (
    <div className="min-w-0 border border-neutral-800 mb-6">
      {/* Category header */}
      <div className="flex flex-col gap-3 px-4 py-3 border-b border-neutral-800 bg-neutral-900 sm:flex-row sm:items-center sm:justify-between">
        <span className="min-w-0 break-words text-xs tracking-widest uppercase text-white">
          {project.title ?? project.id} <span className="text-neutral-500">({project.images.length})</span>
        </span>
        <div className="flex flex-wrap items-center gap-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="text-xs tracking-widest uppercase text-neutral-400 hover:text-white transition-colors disabled:opacity-40"
          >
            {uploading ? 'Uploading…' : '+ Upload'}
          </button>
          <button
            onClick={onToggleCategory}
            className="text-xs tracking-widest uppercase transition-colors"
            style={{ color: project.visible ? '#6ee7b7' : '#6b7280' }}
          >
            {project.visible ? 'Visible' : 'Hidden'}
          </button>
        </div>
      </div>

      {/* Image list */}
      <div className="p-3 flex flex-col gap-1.5">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext
            items={project.images.map((img) => img.src)}
            strategy={verticalListSortingStrategy}
          >
            {project.images.map((entry) => (
              <SortableImage
                key={entry.src}
                entry={entry}
                onToggle={() => onToggleImage(entry.src)}
                onDelete={() => onDeleteImage(entry.src)}
              />
            ))}
          </SortableContext>
        </DndContext>
        {!project.images.length && (
          <p className="px-1 py-5 text-center text-xs tracking-widest uppercase text-neutral-600">
            No images yet
          </p>
        )}
      </div>
    </div>
  )
}

// ─── Main page ─────────────────────────────────────────────────────────────

export default function PhotographyAdminPage() {
  const { config, setConfig, loading } = useAdminContent()
  const [newTabKey, setNewTabKey] = useState('')
  const [newTabLabel, setNewTabLabel] = useState('')

  function updatePhotoConfig(updater: (prev: ContentConfig['photography']) => ContentConfig['photography']) {
    setConfig((prev) =>
      prev ? { ...prev, photography: updater(prev.photography) } : prev
    )
  }

  function toggleCategory(projectId: string) {
    updatePhotoConfig((photo) => ({
      ...photo,
      projects: photo.projects.map((p) =>
        p.id === projectId ? { ...p, visible: !p.visible } : p
      ),
    }))
  }

  function toggleImage(projectId: string, src: string) {
    updatePhotoConfig((photo) => ({
      ...photo,
      projects: photo.projects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              images: p.images.map((img) =>
                img.src === src ? { ...img, visible: !img.visible } : img
              ),
            }
          : p
      ),
    }))
  }

  async function deleteImage(projectId: string, src: string) {
    if (!confirm('Delete this image from the category?')) return

    const deleted = await deleteUploadedBlob(src)
    if (!deleted) {
      alert('Blob delete failed. The image was not removed.')
      return
    }

    updatePhotoConfig((photo) => ({
      ...photo,
      projects: photo.projects.map((p) =>
        p.id === projectId
          ? { ...p, images: p.images.filter((img) => img.src !== src) }
          : p
      ),
    }))
  }

  function reorderImages(projectId: string, images: ImageEntry[]) {
    updatePhotoConfig((photo) => ({
      ...photo,
      projects: photo.projects.map((p) =>
        p.id === projectId ? { ...p, images } : p
      ),
    }))
  }

  async function handleUpload(projectId: string, file: File) {
    const formData = new FormData()
    formData.append('file', file)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
    if (!res.ok) {
      alert('Upload failed.')
      return
    }
    const { url } = await res.json()
    updatePhotoConfig((photo) => ({
      ...photo,
      projects: photo.projects.map((p) =>
        p.id === projectId
          ? { ...p, images: [...p.images, { src: url, visible: true }] }
          : p
      ),
    }))
  }

  function updateFilterLabel(key: string, value: string) {
    updatePhotoConfig((photo) => ({
      ...photo,
      filterLabels: { ...photo.filterLabels, [key]: value },
      projects: photo.projects.map((project) =>
        project.id === key ? { ...project, title: value } : project
      ),
    }))
  }

  async function deleteUploadedBlob(src: string): Promise<boolean> {
    if (!getUploadedBlobPathname(src)) return true

    const res = await fetch('/api/admin/blob', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ src }),
    })

    return res.ok
  }

  async function deleteFilterTab(key: string) {
    const confirmed = confirm('Delete this tab? Custom categories will also delete uploaded Blob images inside them.')
    if (!confirmed) return

    const customProject = config?.photography.projects.find((project) => (
      project.id === key && !DEFAULT_PROJECT_IDS.has(project.id)
    ))

    if (customProject?.images.length) {
      const uploadedImages = customProject.images.filter((image) => getUploadedBlobPathname(image.src))
      const deleted = await Promise.all(uploadedImages.map((image) => deleteUploadedBlob(image.src)))

      if (deleted.some((ok) => !ok)) {
        alert('Blob delete failed. The category was not removed.')
        return
      }
    }

    updatePhotoConfig((photo) => {
      const rest = { ...photo.filterLabels }
      delete rest[key]
      return {
        ...photo,
        filterLabels: rest,
        filterOrder: photo.filterOrder.filter((k) => k !== key),
        projects: photo.projects.filter((project) => (
          DEFAULT_PROJECT_IDS.has(project.id) || project.id !== key
        )),
      }
    })
  }

  function addFilterTab(key: string, label: string) {
    updatePhotoConfig((photo) => ({
      ...photo,
      filterLabels: { ...photo.filterLabels, [key]: label },
      filterOrder: [...photo.filterOrder, key],
      projects: photo.projects.some((project) => project.id === key)
        ? photo.projects
        : [
            ...photo.projects,
            {
              id: key,
              title: label,
              filterGroup: key,
              visible: true,
              images: [],
            },
          ],
    }))
  }

  if (loading || !config) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-xs text-neutral-500 tracking-widest uppercase">Loading…</span>
      </div>
    )
  }

  return (
    <div className="w-full overflow-x-hidden">
      <main className="w-full max-w-3xl mx-auto px-4 py-8 sm:px-6 sm:py-10">

        {/* Filter label editor */}
        <div className="mb-10">
          <p className="text-xs tracking-widest uppercase text-neutral-500 mb-4">Filter Tab Labels</p>
          <div className="flex flex-col gap-1.5 mb-3">
            {config.photography.filterOrder.map((key) => {
              const label = config.photography.filterLabels[key] ?? key
              const isDeletable = key !== 'all'
              return (
                <div key={key} className="flex min-w-0 items-center gap-2 border border-neutral-800 px-3 py-2">
                  <span className="text-xs text-neutral-600 w-24 shrink-0 font-mono">{key}</span>
                  <input
                    type="text"
                    value={label}
                    onChange={(e) => updateFilterLabel(key, e.target.value)}
                    className="bg-transparent text-xs text-white outline-none flex-1 min-w-0 border-b border-transparent focus:border-neutral-600"
                  />
                  <button
                    onClick={() => isDeletable && deleteFilterTab(key)}
                    disabled={!isDeletable}
                    className="text-xs tracking-widest uppercase shrink-0 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                    style={{ color: isDeletable ? '#ef4444' : undefined }}
                    title={isDeletable ? 'Delete tab' : '"all" cannot be deleted'}
                  >
                    ×
                  </button>
                </div>
              )
            })}
          </div>

          {/* Add new filter tab */}
          <div className="flex flex-col gap-2 border border-dashed border-neutral-700 px-3 py-2 sm:flex-row sm:items-center">
            <input
              type="text"
              value={newTabKey}
              onChange={(e) => setNewTabKey(e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''))}
              placeholder="key (e.g. commercial)"
              className="w-full min-w-0 bg-transparent text-xs text-white outline-none border-b border-transparent focus:border-neutral-600 placeholder:text-neutral-700 sm:w-36 sm:shrink-0"
            />
            <input
              type="text"
              value={newTabLabel}
              onChange={(e) => setNewTabLabel(e.target.value)}
              placeholder="Label (e.g. Commercial)"
              className="w-full min-w-0 bg-transparent text-xs text-white outline-none border-b border-transparent focus:border-neutral-600 placeholder:text-neutral-700 sm:flex-1"
            />
            <button
              onClick={() => {
                const k = newTabKey.trim()
                const l = newTabLabel.trim()
                if (!k || !l || config.photography.filterLabels[k] !== undefined) return
                addFilterTab(k, l)
                setNewTabKey('')
                setNewTabLabel('')
              }}
              disabled={
                !newTabKey.trim() ||
                !newTabLabel.trim() ||
                config.photography.filterLabels[newTabKey.trim()] !== undefined
              }
              className="text-xs tracking-widest uppercase text-neutral-400 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
            >
              + Add
            </button>
          </div>
        </div>

        {/* Category blocks */}
        <div>
          <p className="text-xs tracking-widest uppercase text-neutral-500 mb-4">Categories</p>
          {config.photography.projects.map((project) => (
            <CategoryBlock
              key={project.id}
              project={project}
              onToggleCategory={() => toggleCategory(project.id)}
              onToggleImage={(src) => toggleImage(project.id, src)}
              onDeleteImage={(src) => deleteImage(project.id, src)}
              onReorderImages={(images) => reorderImages(project.id, images)}
              onUpload={handleUpload}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
