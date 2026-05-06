export type Category =
  | 'cosmetics'
  | 'still-life'
  | 'food'
  | 'portrait'
  | 'ai-work'
  | 'fine-art'
  | 'interior'
  | 'rise-website'

export type FilterGroup = 'all' | 'cosmetics' | 'product' | 'portrait' | 'fine-art' | 'ai' | 'interior'

export interface Project {
  id: string
  title: string
  category: Category
  filterGroup: FilterGroup
  images: string[]
  featured?: boolean
}

export interface VideoProject {
  id: string
  title: string
  titleKo: string
  year?: string
  youtubeId?: string
  youtubeIds?: string[]
  playlistId?: string
  thumbnail?: string
}

export interface DesignWork {
  id: string
  title: string
  images: string[]
}

export const FILTER_LABELS: Record<FilterGroup, string> = {
  all: 'All',
  cosmetics: 'Cosmetics',
  product: 'Still Life',
  portrait: 'Portrait',
  'fine-art': 'Fine Art',
  ai: 'AI',
  interior: 'Interior',
}

export const projects: Project[] = [
  {
    id: 'cosmetics',
    title: 'Cosmetics',
    category: 'cosmetics',
    filterGroup: 'cosmetics',
    featured: true,
    images: [
      '/images/cosmetics/foundation-1.jpg',
      '/images/cosmetics/object-2.jpg',
      '/images/cosmetics/object-3.jpg',
      '/images/cosmetics/cosmetic-1.jpg',
      '/images/cosmetics/cosmetic-2.jpg',
      '/images/cosmetics/tube.jpg',
      '/images/cosmetics/sunscreen-2.jpg',
      '/images/cosmetics/magnolia.jpg',
      '/images/cosmetics/cosmetics-set.jpg',
      '/images/cosmetics/cosmetics-full.jpg',
      '/images/cosmetics/perfume.png',
    ],
  },
  {
    id: 'still-life',
    title: 'Still Life',
    category: 'still-life',
    filterGroup: 'product',
    images: [
      '/images/still-life/watch-1.png',
      '/images/still-life/watch-2.jpg',
      '/images/still-life/watch-3.png',
      '/images/still-life/watch-4.jpg',
      '/images/still-life/light-painting-1.jpeg',
      '/images/still-life/light-painting-2.jpeg',
      '/images/still-life/light-painting-3.jpeg',
      '/images/still-life/light-painting-4.jpeg',
      '/images/still-life/light-painting-5.jpeg',
      '/images/still-life/personal-work-1.jpeg',
      '/images/still-life/personal-work-2.jpeg',
      '/images/still-life/personal-work-3.jpeg',
      '/images/still-life/personal-work-4.jpeg',
      '/images/still-life/vase-1.jpeg',
      '/images/still-life/vase-2.jpeg',
    ],
  },
  {
    id: 'food',
    title: 'Food',
    category: 'food',
    filterGroup: 'product',
    images: [
      '/images/food/food-1.jpeg',
      '/images/food/food-2.jpg',
      '/images/food/food-3.jpg',
    ],
  },
  {
    id: 'fine-art',
    title: 'Fine Art',
    category: 'fine-art',
    filterGroup: 'fine-art',
    featured: true,
    images: [
      '/images/fine-art/fine-art-1.jpeg',
      '/images/fine-art/fine-art-2.jpeg',
      '/images/fine-art/fine-art-3.jpeg',
      '/images/fine-art/fine-art-4.jpeg',
      '/images/fine-art/fine-art-5.jpeg',
    ],
  },
  {
    id: 'portrait',
    title: 'Portrait',
    category: 'portrait',
    filterGroup: 'portrait',
    featured: true,
    images: [
      '/images/portrait/portrait-1-lg.jpeg',
      '/images/portrait/portrait-2-lg.jpeg',
      '/images/portrait/portrait-3-lg.jpeg',
      '/images/portrait/portrait-1.jpg',
      '/images/portrait/portrait-2.jpg',
      '/images/portrait/portrait-3.jpg',
      '/images/portrait/portrait-4.jpg',
      '/images/portrait/portrait-5.jpg',
    ],
  },
  {
    id: 'ai-work',
    title: 'AI Work',
    category: 'ai-work',
    filterGroup: 'ai',
    images: [
      '/images/ai-work/ai-portrait-1.png',
      '/images/ai-work/ai-portrait-2.png',
      '/images/ai-work/ai-portrait-3.png',
      '/images/ai-work/ai-portrait-4.png',
    ],
  },
  {
    id: 'rise-website',
    title: 'RISE Language School',
    category: 'rise-website',
    filterGroup: 'interior',
    featured: true,
    images: [
      '/images/rise-website/teacher-1.jpg',
      '/images/rise-website/teacher-2.jpg',
      '/images/rise-website/teacher-3.jpg',
      '/images/rise-website/class-1.jpg',
      '/images/rise-website/class-2.jpg',
      '/images/rise-website/library-students.jpg',
      '/images/rise-website/library-class.jpg',
      '/images/rise-website/uniform.jpg',
      '/images/rise-website/screen.jpg',
      '/images/rise-website/elementary.jpg',
    ],
  },
  {
    id: 'interior',
    title: 'Interior',
    category: 'interior',
    filterGroup: 'interior',
    images: [
      '/images/interior/kitchen.jpeg',
      '/images/interior/bedroom.jpeg',
      '/images/interior/front-desk.jpeg',
      '/images/interior/library.jpeg',
      '/images/interior/hallway.jpeg',
      '/images/interior/library-3.jpeg',
      '/images/interior/restroom.jpeg',
    ],
  },
]

export const videos: VideoProject[] = [
  {
    id: 'rise-campus-tour',
    title: 'RISE Campus Tour',
    titleKo: 'RISE 캠퍼스 투어',
    playlistId: 'PLRwWCXTQW9LmoaKsVpJ91k8QDC94L4oi4',
    youtubeIds: ['NIfNigY9BTM', 'SpHT7xw2H_8', '40CKVKMa0GM', 'zYayAeEKgVU', 'ZsN0wKJjzwk', 'lwX0TnVOSIo', 'sPqSIZe9ZWA'],
  },
  {
    id: 'rise-parent-interview',
    title: 'RISE Parent Interview',
    titleKo: 'RISE 학부모 인터뷰',
    youtubeIds: ['SII47SSbrQ4', 'ocwCbBGUd3E', '_xhvE1EbZlI', 'Bii3D2FXJgU', '_ACOgVSNbFw'],
  },
  {
    id: 'rise-lecture-sketch',
    title: 'RISE Lecture Sketch',
    titleKo: 'RISE 학부모 강연 스케치',
    year: '2024',
    youtubeId: 'QNbOoEFlRXY',
  },
  {
    id: 'lotte-autumn',
    title: 'Lotte World — Autumn Season',
    titleKo: '롯데월드 가을 시즌 홍보영상',
    year: '2024',
    youtubeIds: ['2nlyITLXdY0', 'opO4k4Wro9U', 'xL1va8khc-c'],
  },
  {
    id: 'lotte-winter',
    title: 'Lotte World — Winter Season',
    titleKo: '롯데월드 겨울 시즌 홍보영상',
    year: '2024',
    youtubeIds: ['AtQdyh_kXz0', '2NIGykeWHKg', 'UeEYKEIezi8', 'X5-gw-XTbiI'],
  },
  {
    id: 'rise-online-lectures',
    title: 'RISE Online English Lectures',
    titleKo: 'RISE 온라인 영어 강의 47편',
    year: '2022',
    youtubeId: 'zbGUMiUtid0',
  },
  {
    id: 'ai-2d-video',
    title: 'AI-Assisted 2D Graphic Video',
    titleKo: 'AI 활용 2D 그래픽 영상 제작',
    year: '2024',
    youtubeId: '1GEKvSYF1qU',
  },
]

export const designWork: DesignWork[] = [
  {
    id: 'christmas-posters',
    title: 'Christmas Event Poster — Lotte World',
    images: [
      '/images/design/christmas-poster-1.png',
      '/images/design/christmas-poster-2.png',
      '/images/design/christmas-poster-3.png',
      '/images/design/christmas-poster-4.png',
    ],
  },
  {
    id: 'theater-thumbnails',
    title: 'Lotte World Theater — YouTube Thumbnails',
    images: [
      '/images/design/theater-thumbnail-1.png',
      '/images/design/theater-thumbnail-2.png',
      '/images/design/theater-thumbnail-3.png',
    ],
  },
  {
    id: 'no-seat-banner',
    title: 'No Seat Saving Banner — Lotte World',
    images: ['/images/design/no-seat-banner.png'],
  },
]
