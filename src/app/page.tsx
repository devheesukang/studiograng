import { Hero } from '@/components/sections/Hero'
import { Photography } from '@/components/sections/Photography'
import { Video } from '@/components/sections/Video'
import { Design } from '@/components/sections/Design'
import { Info } from '@/components/sections/Info'

export default function Home() {
  return (
    <>
      <Hero />
      <Photography />
      <Video />
      <Design />
      <Info />
    </>
  )
}
