import { Hero } from '@/components/sections/Hero'
import { Photography } from '@/components/sections/Photography'
import { Video } from '@/components/sections/Video'
import { Design } from '@/components/sections/Design'
import { Info } from '@/components/sections/Info'
import { getEffectiveConfig } from '@/lib/adminContent'
import { projects as defaultProjects } from '@/lib/portfolio'

export const revalidate = 0

export default async function Home() {
  const config = await getEffectiveConfig()
  const normalizedFilterOrder = [
    'all',
    ...config.photography.filterOrder.filter((key) => key !== 'all'),
  ]
  const filterOrder = new Map(
    normalizedFilterOrder
      .filter((key) => key !== 'all')
      .map((key, index) => [key, index])
  )

  const photoProjects = config.photography.projects
    .filter((pc) => pc.visible)
    .flatMap((pc) => {
      const base = defaultProjects.find((p) => p.id === pc.id)
      const visibleImages = pc.images.filter((img) => img.visible).map((img) => img.src)
      if (!visibleImages.length) return []
      return [{
        id: pc.id,
        title: pc.title ?? base?.title ?? config.photography.filterLabels[pc.id] ?? pc.id,
        filterGroup: pc.filterGroup ?? base?.filterGroup ?? pc.id,
        images: visibleImages,
      }]
    })
    .map((project, index) => ({ project, index }))
    .sort((a, b) => {
      const aOrder = filterOrder.get(a.project.filterGroup) ?? Number.MAX_SAFE_INTEGER
      const bOrder = filterOrder.get(b.project.filterGroup) ?? Number.MAX_SAFE_INTEGER
      return aOrder - bOrder || a.index - b.index
    })
    .map(({ project }) => project)

  const videoFilterOrder = ['all', ...config.video.filterOrder.filter((key) => key !== 'all')]
  const videoOrder = new Map(
    videoFilterOrder.filter((key) => key !== 'all').map((key, index) => [key, index])
  )
  const visibleVideos = config.videos
    .filter((video) => video.visible)
    .map((video, index) => ({ video, index }))
    .sort((a, b) => {
      const aOrder = videoOrder.get(a.video.filterGroup ?? 'videos') ?? Number.MAX_SAFE_INTEGER
      const bOrder = videoOrder.get(b.video.filterGroup ?? 'videos') ?? Number.MAX_SAFE_INTEGER
      return aOrder - bOrder || a.index - b.index
    })
    .map(({ video }) => video)

  return (
    <>
      <Hero />
      <Photography
        projects={photoProjects}
        filterLabels={config.photography.filterLabels}
        filterOrder={normalizedFilterOrder}
      />
      <Video
        videos={visibleVideos}
        filterLabels={config.video.filterLabels}
        filterOrder={videoFilterOrder}
      />
      <Design />
      <Info info={config.info} />
    </>
  )
}
