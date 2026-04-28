export type Category =
  | 'cosmetics'
  | 'watch'
  | 'glass'
  | 'glasses'
  | 'vase'
  | 'portrait'
  | 'light-painting'
  | 'ai-work'
  | 'fine-art'
  | 'assignment'
  | 'airbnb'
  | 'rise-interior'
  | 'rise-website'

export type FilterGroup = 'all' | 'product' | 'portrait' | 'fine-art' | 'ai' | 'interior'

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
    filterGroup: 'product',
    featured: true,
    images: [
      '/images/cosmetics/foundation-1.jpg',
      '/images/cosmetics/foundation-2.jpg',
      '/images/cosmetics/object-2.jpg',
      '/images/cosmetics/object-3.jpg',
      '/images/cosmetics/cosmetic-1.jpg',
      '/images/cosmetics/cosmetic-2.jpg',
      '/images/cosmetics/cosmetic-3.jpg',
      '/images/cosmetics/tube.jpg',
      '/images/cosmetics/sunscreen-1.jpg',
      '/images/cosmetics/sunscreen-2.jpg',
      '/images/cosmetics/magnolia.jpg',
      '/images/cosmetics/cosmetics-set.jpg',
    ],
  },
  {
    id: 'watch',
    title: 'Watch',
    category: 'watch',
    filterGroup: 'product',
    featured: true,
    images: [
      '/images/watch/watch-prx.jpg',
      '/images/watch/watch-1.png',
      '/images/watch/watch-2.jpg',
      '/images/watch/watch-3.png',
      '/images/watch/watch-4.jpg',
    ],
  },
  {
    id: 'glass',
    title: 'Glass Objects',
    category: 'glass',
    filterGroup: 'product',
    images: [
      '/images/glass/perfume-1.png',
      '/images/glass/glass-still.jpg',
      '/images/glass/glass-bottle.jpg',
    ],
  },
  {
    id: 'glasses',
    title: 'Eyewear',
    category: 'glasses',
    filterGroup: 'product',
    images: [
      '/images/glasses/glasses-1.jpg',
      '/images/glasses/glasses-2.jpg',
      '/images/glasses/sunglasses.jpg',
    ],
  },
  {
    id: 'vase',
    title: 'Vase',
    category: 'vase',
    filterGroup: 'product',
    images: [
      '/images/vase/vase-1.jpeg',
      '/images/vase/vase-2.jpeg',
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
    ],
  },
  {
    id: 'light-painting',
    title: 'Light Painting',
    category: 'light-painting',
    filterGroup: 'fine-art',
    featured: true,
    images: [
      '/images/light-painting/light-painting-1.jpeg',
      '/images/light-painting/light-painting-2.jpeg',
      '/images/light-painting/light-painting-3.jpeg',
      '/images/light-painting/light-painting-4.jpeg',
      '/images/light-painting/light-painting-5.jpeg',
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
    id: 'assignment',
    title: 'Assignment',
    category: 'assignment',
    filterGroup: 'fine-art',
    images: [
      '/images/assignment/assignment-1.jpeg',
      '/images/assignment/assignment-2.jpeg',
      '/images/assignment/assignment-3.jpeg',
      '/images/assignment/assignment-4.jpeg',
    ],
  },
  {
    id: 'airbnb',
    title: 'Airbnb Interior',
    category: 'airbnb',
    filterGroup: 'interior',
    images: [
      '/images/airbnb/bedroom-1.jpeg',
      '/images/airbnb/bedroom-2.jpeg',
      '/images/airbnb/bedroom-3.jpeg',
      '/images/airbnb/bedroom-4.jpeg',
      '/images/airbnb/kitchen.jpeg',
    ],
  },
  {
    id: 'rise-interior',
    title: 'RISE Campus',
    category: 'rise-interior',
    filterGroup: 'interior',
    images: [
      '/images/rise-interior/front-desk.jpeg',
      '/images/rise-interior/library.jpeg',
      '/images/rise-interior/hallway.jpeg',
      '/images/rise-interior/library-3.jpeg',
      '/images/rise-interior/restroom.jpeg',
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
]

export const videos: VideoProject[] = [
  {
    id: 'rise-campus-tour',
    title: 'RISE Campus Tour',
    titleKo: 'RISE 캠퍼스 투어',
    playlistId: 'PLRwWCXTQW9LmoaKsVpJ91k8QDC94L4oi4',
  },
  {
    id: 'rise-parent-interview',
    title: 'RISE Parent Interview',
    titleKo: 'RISE 학부모 인터뷰',
    youtubeId: 'cwtHU1EBCYU',
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
    youtubeId: '2nlyITLXdY0',
  },
  {
    id: 'lotte-winter',
    title: 'Lotte World — Winter Season',
    titleKo: '롯데월드 겨울 시즌 홍보영상',
    year: '2024',
    youtubeId: 'AtQdyh_kXz0',
  },
  {
    id: 'rise-online-lectures',
    title: 'RISE Online English Lectures',
    titleKo: 'RISE 온라인 영어 강의 47편',
    year: '2022',
    youtubeId: 'zbGUMiUtid0',
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
