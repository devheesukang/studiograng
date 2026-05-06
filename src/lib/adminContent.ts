import { projects, videos, FILTER_LABELS } from './portfolio'

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

// Returns null when BLOB_READ_WRITE_TOKEN is not set (local dev without Blob)
export async function readContentConfig(): Promise<ContentConfig | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null
  try {
    const { list } = await import('@vercel/blob')
    const { blobs } = await list({ prefix: BLOB_KEY })
    const blob = blobs.find((b) => b.pathname === BLOB_KEY)
    if (!blob) return null
    const res = await fetch(blob.url, { next: { revalidate: 0 } })
    if (!res.ok) return null
    return (await res.json()) as ContentConfig
  } catch {
    return null
  }
}

export async function writeContentConfig(config: ContentConfig): Promise<void> {
  const { put } = await import('@vercel/blob')
  await put(BLOB_KEY, JSON.stringify(config), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
  })
}

// Returns merged config: Blob config if available, otherwise built-in defaults
export async function getEffectiveConfig(): Promise<ContentConfig> {
  const saved = await readContentConfig()
  return saved ?? buildDefaultConfig()
}
