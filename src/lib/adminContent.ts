import { cache } from 'react'
import { projects, videos, FILTER_LABELS } from './portfolio'

export type Variant = 'v1' | 'v2' | 'v3'

export interface ImageEntry {
  src: string
  visible: boolean
}

export interface ProjectConfig {
  id: string
  visible: boolean
  images: ImageEntry[]
}

export interface VideoConfig {
  id: string
  visible: boolean
  title: string
  titleKo: string
  year?: string
  youtubeId?: string
  youtubeIds?: string[]
  playlistId?: string
}

export interface ContentConfig {
  activeVariant: Variant
  photography: {
    filterLabels: Record<string, string>
    filterOrder: string[]
    projects: ProjectConfig[]
  }
  videos: VideoConfig[]
  info: {
    bio: string
    email: string
    phone: string
    instagram: string
  }
}

export function buildDefaultConfig(): ContentConfig {
  return {
    activeVariant: 'v1',
    photography: {
      filterLabels: { ...FILTER_LABELS },
      filterOrder: ['all', 'cosmetics', 'product', 'portrait', 'fine-art', 'ai', 'interior'],
      projects: projects.map((p) => ({
        id: p.id,
        visible: true,
        images: p.images.map((src) => ({ src, visible: true })),
      })),
    },
    videos: videos.map((v) => ({
      id: v.id,
      visible: true,
      title: v.title,
      titleKo: v.titleKo,
      year: v.year,
      youtubeId: v.youtubeId,
      youtubeIds: v.youtubeIds,
      playlistId: v.playlistId,
    })),
    info: {
      bio: 'Visual storyteller based in Seoul, specializing in brand and content direction.',
      email: 'wolfkang0514@naver.com',
      phone: '010-6401-0514',
      instagram: 'studio.grang',
    },
  }
}

const BLOB_KEY = 'content.json'
const BLOB_ACCESS = 'private'

async function streamToText(stream: ReadableStream<Uint8Array>): Promise<string> {
  const reader = stream.getReader()
  const decoder = new TextDecoder()
  let text = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    text += decoder.decode(value, { stream: true })
  }

  return text + decoder.decode()
}

async function _readContentConfig(): Promise<ContentConfig | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null
  try {
    const { get } = await import('@vercel/blob')
    const result = await get(BLOB_KEY, { access: BLOB_ACCESS, useCache: false })
    if (!result || result.statusCode !== 200) return null
    return JSON.parse(await streamToText(result.stream)) as ContentConfig
  } catch {
    return null
  }
}

export async function writeContentConfig(config: ContentConfig): Promise<void> {
  const { put } = await import('@vercel/blob')
  await put(BLOB_KEY, JSON.stringify(config), {
    access: BLOB_ACCESS,
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
  })
}

// Cached per request — multiple Server Components calling this in the same render get one Blob fetch
export const getEffectiveConfig = cache(async (): Promise<ContentConfig> => {
  const saved = await _readContentConfig()
  return saved ?? buildDefaultConfig()
})
