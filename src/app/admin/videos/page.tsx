'use client'

import { useState } from 'react'
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core'
import { SortableContext, useSortable, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useAdminContent } from '@/components/admin/AdminContentProvider'
import type { ContentConfig, VideoConfig } from '@/lib/adminContent'

function normalizeVideoForForm(video: VideoConfig): VideoConfig {
  return {
    ...video,
    youtubeId: video.playlistId
      ? `https://www.youtube.com/playlist?list=${video.playlistId}`
      : video.youtubeId ? `https://www.youtube.com/watch?v=${video.youtubeId}` : '',
    youtubeIds: video.youtubeIds?.map((id) => `https://www.youtube.com/watch?v=${id}`) ?? [],
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
      const index = parts.findIndex((part) => ['embed', 'shorts', 'live'].includes(part))
      if (index >= 0 && parts[index + 1]) return { youtubeId: parts[index + 1] }
    }
  } catch {
    return { youtubeId: trimmed }
  }
  return { youtubeId: trimmed }
}

function splitYouTubeUrls(value: string) {
  return value.split(/[\n,]+/).map((item) => item.trim()).filter(Boolean)
}

function sortVideos(videos: VideoConfig[], filterOrder: string[]) {
  const order = new Map(filterOrder.filter((key) => key !== 'all').map((key, index) => [key, index]))
  return videos
    .map((video, index) => ({ video, index }))
    .sort((a, b) => {
      const aOrder = order.get(a.video.filterGroup ?? 'videos') ?? Number.MAX_SAFE_INTEGER
      const bOrder = order.get(b.video.filterGroup ?? 'videos') ?? Number.MAX_SAFE_INTEGER
      return aOrder - bOrder || a.index - b.index
    })
    .map(({ video }) => video)
}

function FilterRow({ filterKey, label, draggable, onChange, onDelete }: {
  filterKey: string
  label: string
  draggable: boolean
  onChange: (value: string) => void
  onDelete: () => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: filterKey, disabled: !draggable })
  return (
    <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 }} className="flex min-w-0 items-center gap-2 border border-neutral-800 px-3 py-2">
      <button {...(draggable ? attributes : {})} {...(draggable ? listeners : {})} disabled={!draggable} className="w-5 shrink-0 cursor-grab touch-none text-xs text-neutral-600 disabled:cursor-default disabled:opacity-20" title={draggable ? 'Drag to reorder' : 'All stays first'}>::</button>
      <span className="w-24 shrink-0 font-mono text-xs text-neutral-600">{filterKey}</span>
      <input value={label} onChange={(event) => onChange(event.target.value)} className="min-w-0 flex-1 border-b border-transparent bg-transparent text-xs text-white outline-none focus:border-neutral-600" />
      <button onClick={onDelete} disabled={!draggable} className="text-xs uppercase tracking-widest text-red-500 disabled:opacity-20" title={draggable ? 'Delete tab and its videos' : 'All cannot be deleted'}>X</button>
    </div>
  )
}

function SortableVideoRow({ video, onToggle, onEdit, onDelete }: {
  video: VideoConfig
  onToggle: () => void
  onEdit: () => void
  onDelete: () => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: video.id })
  return (
    <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1 }} className="flex flex-wrap items-center gap-x-3 gap-y-2 border border-neutral-800 px-3 py-3 sm:flex-nowrap">
      <button {...attributes} {...listeners} className="shrink-0 cursor-grab touch-none text-neutral-600" aria-label="Drag to reorder video">::</button>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs text-white">{video.title}</p>
        {video.titleKo && <p className="mt-0.5 truncate text-[10px] text-neutral-500">{video.titleKo}</p>}
      </div>
      {video.year && <span className="text-[10px] tracking-widest text-neutral-500">{video.year}</span>}
      <div className="flex items-center gap-3">
        <button onClick={onEdit} className="text-[10px] uppercase tracking-widest text-neutral-400">Edit</button>
        <button onClick={onToggle} className="text-[10px] uppercase tracking-widest" style={{ color: video.visible ? '#6ee7b7' : '#6b7280' }}>{video.visible ? 'On' : 'Off'}</button>
        <button onClick={onDelete} className="text-[10px] uppercase tracking-widest text-red-500">Del</button>
      </div>
    </div>
  )
}

function VideoForm({ initial, categoryKey, categories, onSave, onCancel }: {
  initial?: VideoConfig
  categoryKey: string
  categories: Array<{ key: string; label: string }>
  onSave: (video: VideoConfig) => void
  onCancel: () => void
}) {
  const [form, setForm] = useState<VideoConfig>(initial ? normalizeVideoForForm(initial) : {
    id: '', filterGroup: categoryKey, visible: true, title: '', titleKo: '', year: '', youtubeId: '', youtubeIds: [],
  })
  function set(key: keyof VideoConfig, value: string | boolean | string[]) {
    setForm((previous) => ({ ...previous, [key]: value }))
  }
  function handleSave() {
    const id = form.id.trim() || form.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    const single = parseYouTubeUrl(form.youtubeId ?? '')
    const youtubeIds = (form.youtubeIds ?? []).flatMap(splitYouTubeUrls).map((url) => parseYouTubeUrl(url).youtubeId).filter((id): id is string => Boolean(id))
    onSave({ ...form, id, filterGroup: form.filterGroup ?? categoryKey, youtubeId: single.youtubeId, playlistId: single.playlistId, youtubeIds: youtubeIds.length ? youtubeIds : undefined })
  }
  return (
    <div className="border border-neutral-700 bg-neutral-900 p-4 sm:p-5">
      <p className="mb-4 text-xs uppercase tracking-widest text-neutral-400">{initial ? 'Edit Video' : 'Add Video'}</p>
      <div className="flex flex-col gap-3">
        <label className="text-[10px] uppercase tracking-widest text-neutral-500">Category
          <select value={form.filterGroup ?? categoryKey} onChange={(event) => set('filterGroup', event.target.value)} className="mt-1 w-full border border-neutral-700 bg-neutral-800 px-3 py-2 text-xs text-white">
            {categories.map((category) => <option key={category.key} value={category.key}>{category.label}</option>)}
          </select>
        </label>
        {[
          ['title', 'Title (English)', 'Project title'], ['titleKo', 'Title (Korean)', 'Korean title'], ['year', 'Year', '2026'], ['youtubeId', 'YouTube URL', 'https://www.youtube.com/watch?v=...'],
        ].map(([key, label, placeholder]) => (
          <label key={key} className="text-[10px] uppercase tracking-widest text-neutral-500">{label}
            <input value={(form[key as keyof VideoConfig] as string) ?? ''} onChange={(event) => set(key as keyof VideoConfig, event.target.value)} placeholder={placeholder} className="mt-1 w-full border border-neutral-700 bg-neutral-800 px-3 py-2 text-xs normal-case tracking-normal text-white outline-none placeholder:text-neutral-600" />
          </label>
        ))}
        <label className="text-[10px] uppercase tracking-widest text-neutral-500">YouTube URLs (comma or newline separated)
          <textarea value={form.youtubeIds?.join('\n') ?? ''} onChange={(event) => set('youtubeIds', splitYouTubeUrls(event.target.value))} rows={3} className="mt-1 w-full resize-y border border-neutral-700 bg-neutral-800 px-3 py-2 text-xs normal-case tracking-normal text-white" />
        </label>
      </div>
      <div className="mt-5 flex gap-3">
        <button onClick={handleSave} disabled={!form.title.trim()} className="bg-white px-5 py-2 text-xs font-medium uppercase tracking-widest text-black disabled:opacity-30">{initial ? 'Update' : 'Add'}</button>
        <button onClick={onCancel} className="px-2 text-xs uppercase tracking-widest text-neutral-500">Cancel</button>
      </div>
    </div>
  )
}

function VideoCategory({ categoryKey, label, videos, editingId, adding, categories, onToggle, onEdit, onDelete, onSaveEdit, onAdd, onStartAdd, onCancel, onReorder }: {
  categoryKey: string
  label: string
  videos: VideoConfig[]
  editingId: string | null
  adding: boolean
  categories: Array<{ key: string; label: string }>
  onToggle: (id: string) => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onSaveEdit: (video: VideoConfig) => void
  onAdd: (video: VideoConfig) => void
  onStartAdd: () => void
  onCancel: () => void
  onReorder: (videos: VideoConfig[]) => void
}) {
  const sensors = useSensors(useSensor(PointerSensor))
  function handleDragEnd(event: DragEndEvent) {
    if (!event.over || event.active.id === event.over.id) return
    const oldIndex = videos.findIndex((video) => video.id === event.active.id)
    const newIndex = videos.findIndex((video) => video.id === event.over?.id)
    if (oldIndex >= 0 && newIndex >= 0) onReorder(arrayMove(videos, oldIndex, newIndex))
  }
  return (
    <section className="mb-6 border border-neutral-800">
      <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-900 px-4 py-3">
        <span className="text-xs uppercase tracking-widest text-white">{label} <span className="text-neutral-500">({videos.length})</span></span>
        <button onClick={onStartAdd} className="text-xs uppercase tracking-widest text-neutral-400">+ Add Video</button>
      </div>
      <div className="flex flex-col gap-1.5 p-3">
        {adding && <VideoForm categoryKey={categoryKey} categories={categories} onSave={onAdd} onCancel={onCancel} />}
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={videos.map((video) => video.id)} strategy={verticalListSortingStrategy}>
            {videos.map((video) => <div key={video.id}>
              <SortableVideoRow video={video} onToggle={() => onToggle(video.id)} onEdit={() => onEdit(video.id)} onDelete={() => onDelete(video.id)} />
              {editingId === video.id && <VideoForm initial={video} categoryKey={categoryKey} categories={categories} onSave={onSaveEdit} onCancel={onCancel} />}
            </div>)}
          </SortableContext>
        </DndContext>
        {!videos.length && !adding && <p className="py-5 text-center text-xs uppercase tracking-widest text-neutral-600">No videos yet</p>}
      </div>
    </section>
  )
}

export default function VideosAdminPage() {
  const { config, setConfig, loading } = useAdminContent()
  const [newTabKey, setNewTabKey] = useState('')
  const [newTabLabel, setNewTabLabel] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [addingCategory, setAddingCategory] = useState<string | null>(null)
  const filterSensors = useSensors(useSensor(PointerSensor))

  function update(updater: (previous: Pick<ContentConfig, 'video' | 'videos'>) => Pick<ContentConfig, 'video' | 'videos'>) {
    setConfig((previous) => previous ? { ...previous, ...updater({ video: previous.video, videos: previous.videos }) } : previous)
  }
  function setVideos(updater: (previous: VideoConfig[]) => VideoConfig[]) {
    update((previous) => ({ ...previous, videos: updater(previous.videos) }))
  }
  function reorderFilters(event: DragEndEvent) {
    if (!event.over || event.active.id === event.over.id) return
    update((previous) => {
      const movable = previous.video.filterOrder.filter((key) => key !== 'all')
      const oldIndex = movable.indexOf(String(event.active.id))
      const newIndex = movable.indexOf(String(event.over?.id))
      if (oldIndex < 0 || newIndex < 0) return previous
      const filterOrder = ['all', ...arrayMove(movable, oldIndex, newIndex)]
      return { video: { ...previous.video, filterOrder }, videos: sortVideos(previous.videos, filterOrder) }
    })
  }
  function addFilter() {
    const key = newTabKey.trim()
    const label = newTabLabel.trim()
    if (!key || !label || config?.video.filterLabels[key] !== undefined) return
    update((previous) => ({ ...previous, video: { filterLabels: { ...previous.video.filterLabels, [key]: label }, filterOrder: [...previous.video.filterOrder, key] } }))
    setNewTabKey(''); setNewTabLabel('')
  }
  function deleteFilter(key: string) {
    const count = config?.videos.filter((video) => (video.filterGroup ?? 'videos') === key).length ?? 0
    if (!confirm(`Delete this tab and its ${count} video${count === 1 ? '' : 's'}?`)) return
    update((previous) => {
      const filterLabels = { ...previous.video.filterLabels }; delete filterLabels[key]
      return { video: { filterLabels, filterOrder: previous.video.filterOrder.filter((item) => item !== key) }, videos: previous.videos.filter((video) => (video.filterGroup ?? 'videos') !== key) }
    })
  }
  function deleteVideo(id: string) {
    if (!confirm('Delete this video entry?')) return
    update((previous) => {
      const target = previous.videos.find((video) => video.id === id)
      if (!target) return previous
      const category = target.filterGroup ?? 'videos'
      const videos = previous.videos.filter((video) => video.id !== id)
      if (videos.some((video) => (video.filterGroup ?? 'videos') === category)) return { ...previous, videos }
      const filterLabels = { ...previous.video.filterLabels }; delete filterLabels[category]
      return { video: { filterLabels, filterOrder: previous.video.filterOrder.filter((key) => key !== category) }, videos }
    })
  }
  function saveEditedVideo(updated: VideoConfig) {
    update((previous) => {
      const original = previous.videos.find((video) => video.id === updated.id)
      const originalCategory = original?.filterGroup ?? 'videos'
      const updatedCategory = updated.filterGroup ?? 'videos'
      let videoConfig = previous.video
      let videos = previous.videos.map((video) => video.id === updated.id ? updated : video)

      if (originalCategory !== updatedCategory && !videos.some((video) => (video.filterGroup ?? 'videos') === originalCategory)) {
        const filterLabels = { ...videoConfig.filterLabels }
        delete filterLabels[originalCategory]
        videoConfig = {
          filterLabels,
          filterOrder: videoConfig.filterOrder.filter((key) => key !== originalCategory),
        }
      }

      videos = sortVideos(videos, videoConfig.filterOrder)
      return { video: videoConfig, videos }
    })
    setEditingId(null)
  }
  function reorderCategory(category: string, ordered: VideoConfig[]) {
    setVideos((videos) => { let index = 0; return videos.map((video) => (video.filterGroup ?? 'videos') === category ? ordered[index++] : video) })
  }

  if (loading || !config) return <div className="flex h-64 items-center justify-center"><span className="text-xs uppercase tracking-widest text-neutral-500">Loading...</span></div>

  const filterOrder = ['all', ...config.video.filterOrder.filter((key) => key !== 'all')]
  const categoryKeys = filterOrder.filter((key) => key !== 'all')
  const categories = categoryKeys.map((key) => ({ key, label: config.video.filterLabels[key] ?? key }))
  const orderedVideos = sortVideos(config.videos, filterOrder)

  return <div className="w-full overflow-x-hidden"><main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
    <div className="mb-10">
      <p className="mb-4 text-xs uppercase tracking-widest text-neutral-500">Filter Tab Labels</p>
      <DndContext sensors={filterSensors} collisionDetection={closestCenter} onDragEnd={reorderFilters}><SortableContext items={categoryKeys} strategy={verticalListSortingStrategy}><div className="mb-3 flex flex-col gap-1.5">
        {filterOrder.map((key) => <FilterRow key={key} filterKey={key} label={config.video.filterLabels[key] ?? key} draggable={key !== 'all'} onChange={(label) => update((previous) => ({ ...previous, video: { ...previous.video, filterLabels: { ...previous.video.filterLabels, [key]: label } } }))} onDelete={() => key !== 'all' && deleteFilter(key)} />)}
      </div></SortableContext></DndContext>
      <div className="flex flex-col gap-2 border border-dashed border-neutral-700 px-3 py-2 sm:flex-row">
        <input value={newTabKey} onChange={(event) => setNewTabKey(event.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''))} placeholder="key (e.g. commercial)" className="min-w-0 bg-transparent text-xs text-white outline-none placeholder:text-neutral-700 sm:w-40" />
        <input value={newTabLabel} onChange={(event) => setNewTabLabel(event.target.value)} placeholder="Label (e.g. Commercial)" className="min-w-0 flex-1 bg-transparent text-xs text-white outline-none placeholder:text-neutral-700" />
        <button onClick={addFilter} disabled={!newTabKey.trim() || !newTabLabel.trim() || config.video.filterLabels[newTabKey.trim()] !== undefined} className="text-xs uppercase tracking-widest text-neutral-400 disabled:opacity-30">+ Add</button>
      </div>
    </div>
    <p className="mb-4 text-xs uppercase tracking-widest text-neutral-500">Categories</p>
    {categories.map((category) => <VideoCategory key={category.key} categoryKey={category.key} label={category.label} videos={orderedVideos.filter((video) => (video.filterGroup ?? 'videos') === category.key)} editingId={editingId} adding={addingCategory === category.key} categories={categories}
      onToggle={(id) => setVideos((videos) => videos.map((video) => video.id === id ? { ...video, visible: !video.visible } : video))}
      onEdit={(id) => { setEditingId(editingId === id ? null : id); setAddingCategory(null) }} onDelete={deleteVideo}
      onSaveEdit={saveEditedVideo}
      onAdd={(video) => { setVideos((videos) => sortVideos([...videos, video], filterOrder)); setAddingCategory(null) }}
      onStartAdd={() => { setAddingCategory(category.key); setEditingId(null) }} onCancel={() => { setEditingId(null); setAddingCategory(null) }} onReorder={(videos) => reorderCategory(category.key, videos)} />)}
  </main></div>
}
