'use client'

import { useState } from 'react'
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
import type { VideoConfig } from '@/lib/adminContent'

function toYouTubeWatchUrl(id: string): string {
  return `https://www.youtube.com/watch?v=${id}`
}

function toYouTubePlaylistUrl(id: string): string {
  return `https://www.youtube.com/playlist?list=${id}`
}

function normalizeVideoForForm(video: VideoConfig): VideoConfig {
  return {
    ...video,
    youtubeId: video.playlistId
      ? toYouTubePlaylistUrl(video.playlistId)
      : video.youtubeId
        ? toYouTubeWatchUrl(video.youtubeId)
        : '',
    youtubeIds: video.youtubeIds?.map(toYouTubeWatchUrl) ?? [],
    playlistId: undefined,
  }
}

function parseYouTubeUrl(value: string): { youtubeId?: string; playlistId?: string } {
  const trimmed = value.trim()
  if (!trimmed) return {}

  try {
    const url = new URL(trimmed)
    const host = url.hostname.replace(/^www\./, '')
    const list = url.searchParams.get('list') ?? undefined

    if (host === 'youtu.be') {
      const id = url.pathname.split('/').filter(Boolean)[0]
      return id ? { youtubeId: id } : {}
    }

    if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtube-nocookie.com') {
      const watchId = url.searchParams.get('v')
      if (watchId) return { youtubeId: watchId }

      if (list) return { playlistId: list }

      const parts = url.pathname.split('/').filter(Boolean)
      const embedIndex = parts.findIndex((part) => ['embed', 'shorts', 'live'].includes(part))
      if (embedIndex >= 0 && parts[embedIndex + 1]) {
        return { youtubeId: parts[embedIndex + 1] }
      }
    }
  } catch {
    return { youtubeId: trimmed }
  }

  return { youtubeId: trimmed }
}

function splitYouTubeUrls(value: string): string[] {
  return value
    .split(/[\n,]+/)
    .map((item) => item.trim())
    .filter(Boolean)
}

function SortableVideoRow({
  video,
  onToggle,
  onEdit,
  onDelete,
}: {
  video: VideoConfig
  onToggle: () => void
  onEdit: () => void
  onDelete: () => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: video.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex flex-wrap items-center gap-x-3 gap-y-2 border border-neutral-800 px-3 py-3 sm:flex-nowrap"
    >
      <button
        {...attributes}
        {...listeners}
        className="text-neutral-600 hover:text-neutral-400 cursor-grab active:cursor-grabbing shrink-0 touch-none"
        aria-label="Drag to reorder"
      >
        ⠿
      </button>

      <div className="min-w-0 flex-1">
        <p className="text-xs text-white truncate">{video.title}</p>
        {video.titleKo && (
          <p className="text-[10px] text-neutral-500 truncate mt-0.5">{video.titleKo}</p>
        )}
      </div>

      {video.year && (
        <span className="basis-full pl-7 text-[10px] text-neutral-500 tracking-widest sm:basis-auto sm:pl-0 sm:shrink-0">
          {video.year}
        </span>
      )}

      <div className="flex basis-full items-center gap-3 pl-7 sm:basis-auto sm:pl-0 sm:shrink-0">
        <button
          onClick={onEdit}
          className="text-[10px] tracking-widest uppercase text-neutral-400 hover:text-white transition-colors"
        >
          Edit
        </button>
        <button
          onClick={onToggle}
          className="text-[10px] tracking-widest uppercase transition-colors"
          style={{ color: video.visible ? '#6ee7b7' : '#6b7280' }}
        >
          {video.visible ? 'On' : 'Off'}
        </button>
        <button
          onClick={onDelete}
          className="text-[10px] tracking-widest uppercase text-red-500 hover:text-red-400 transition-colors"
        >
          Del
        </button>
      </div>
    </div>
  )
}

function VideoForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: VideoConfig
  onSave: (v: VideoConfig) => void
  onCancel: () => void
}) {
  const [form, setForm] = useState<VideoConfig>(
    initial
      ? normalizeVideoForForm(initial)
      : {
          id: '',
          visible: true,
          title: '',
          titleKo: '',
          year: '',
          youtubeId: '',
          youtubeIds: [],
        }
  )

  function set(key: keyof VideoConfig, value: string | boolean | string[]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function handleSave() {
    const id = form.id.trim() || form.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    const single = parseYouTubeUrl(form.youtubeId ?? '')
    const youtubeIds = (form.youtubeIds ?? [])
      .flatMap(splitYouTubeUrls)
      .map((url) => parseYouTubeUrl(url).youtubeId)
      .filter((youtubeId): youtubeId is string => Boolean(youtubeId))

    onSave({
      ...form,
      id,
      youtubeId: single.youtubeId,
      playlistId: single.playlistId,
      youtubeIds: youtubeIds.length ? youtubeIds : undefined,
    })
  }

  return (
    <div className="border border-neutral-700 p-4 mb-6 bg-neutral-900 sm:p-5">
      <p className="text-xs tracking-widest uppercase text-neutral-400 mb-4">
        {initial ? 'Edit Video' : 'Add Video'}
      </p>
      <div className="flex flex-col gap-3">
        {[
          { key: 'title', label: 'Title (English)', placeholder: '59-Second Film Festival' },
          { key: 'titleKo', label: 'Title (Korean)', placeholder: '희망리턴패키지 59초 영화제' },
          { key: 'year', label: 'Year', placeholder: '2023' },
          { key: 'youtubeId', label: 'YouTube URL', placeholder: 'https://www.youtube.com/watch?v=IIzokW_guBs' },
        ].map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className="text-[10px] text-neutral-500 tracking-widest uppercase block mb-1">{label}</label>
            <input
              type="text"
              value={(form[key as keyof VideoConfig] as string) ?? ''}
              onChange={(e) => set(key as keyof VideoConfig, e.target.value)}
              placeholder={placeholder}
              className="w-full bg-neutral-800 border border-neutral-700 text-white text-xs px-3 py-2 outline-none focus:border-neutral-500 placeholder:text-neutral-600"
            />
          </div>
        ))}
        <div>
          <label className="text-[10px] text-neutral-500 tracking-widest uppercase block mb-1">
            YouTube URLs (multiple — comma or newline separated)
          </label>
          <textarea
            value={Array.isArray(form.youtubeIds) ? form.youtubeIds.join('\n') : ''}
            onChange={(e) => set('youtubeIds', splitYouTubeUrls(e.target.value))}
            placeholder={'https://youtu.be/AtQdyh_kXz0\nhttps://www.youtube.com/watch?v=2NIGykeWHKg'}
            rows={3}
            className="w-full resize-y bg-neutral-800 border border-neutral-700 text-white text-xs px-3 py-2 outline-none focus:border-neutral-500 placeholder:text-neutral-600"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-3 mt-5">
        <button
          onClick={handleSave}
          className="bg-white text-black text-xs font-medium px-5 py-2 tracking-widest uppercase hover:bg-neutral-200 transition-colors"
        >
          {initial ? 'Update' : 'Add'}
        </button>
        <button
          onClick={onCancel}
          className="text-xs tracking-widest uppercase text-neutral-500 hover:text-white transition-colors px-2"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default function VideosAdminPage() {
  const { config, setConfig, loading } = useAdminContent()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)

  const sensors = useSensors(useSensor(PointerSensor))

  function setVideos(updater: (prev: VideoConfig[]) => VideoConfig[]) {
    setConfig((prev) => (prev ? { ...prev, videos: updater(prev.videos) } : prev))
  }

  function toggleVideo(id: string) {
    setVideos((videos) =>
      videos.map((v) => (v.id === id ? { ...v, visible: !v.visible } : v))
    )
  }

  function deleteVideo(id: string) {
    if (!confirm('Delete this video entry?')) return
    setVideos((videos) => videos.filter((v) => v.id !== id))
  }

  function updateVideo(updated: VideoConfig) {
    setVideos((videos) => videos.map((v) => (v.id === updated.id ? updated : v)))
    setEditingId(null)
  }

  function addVideo(video: VideoConfig) {
    setVideos((videos) => [...videos, video])
    setShowAddForm(false)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!config || !over || active.id === over.id) return
    const oldIndex = config.videos.findIndex((v) => v.id === active.id)
    const newIndex = config.videos.findIndex((v) => v.id === over.id)
    setVideos((videos) => arrayMove(videos, oldIndex, newIndex))
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

        {showAddForm && (
          <VideoForm onSave={addVideo} onCancel={() => setShowAddForm(false)} />
        )}

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext
            items={config.videos.map((v) => v.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="flex flex-col gap-1.5 mb-6">
              {config.videos.map((video) => (
                <div key={video.id}>
                  <SortableVideoRow
                    video={video}
                    onToggle={() => toggleVideo(video.id)}
                    onEdit={() => setEditingId(editingId === video.id ? null : video.id)}
                    onDelete={() => deleteVideo(video.id)}
                  />
                  {editingId === video.id && (
                    <VideoForm
                      initial={video}
                      onSave={updateVideo}
                      onCancel={() => setEditingId(null)}
                    />
                  )}
                </div>
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="text-xs tracking-widest uppercase text-neutral-500 hover:text-white transition-colors border border-neutral-800 px-5 py-3 w-full hover:border-neutral-600"
          >
            + Add Video
          </button>
        )}
      </main>
    </div>
  )
}
