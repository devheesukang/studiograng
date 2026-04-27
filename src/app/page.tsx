import { Hero } from '@/components/sections/Hero'

export default function Home() {
  return (
    <>
      <Hero />

      {/* Photography — Phase 3 */}
      <section
        id="photography"
        className="min-h-screen flex items-center justify-center border-t"
        style={{ borderColor: 'var(--line)' }}
      >
        <p className="text-[10px] tracking-widest uppercase opacity-30">
          Photography — Phase 3
        </p>
      </section>

      {/* Video — Phase 4 */}
      <section
        id="video"
        className="min-h-screen flex items-center justify-center border-t"
        style={{ borderColor: 'var(--line)' }}
      >
        <p className="text-[10px] tracking-widest uppercase opacity-30">
          Video — Phase 4
        </p>
      </section>

      {/* Design — Phase 4 */}
      <section
        id="design"
        className="min-h-screen flex items-center justify-center border-t"
        style={{ borderColor: 'var(--line)' }}
      >
        <p className="text-[10px] tracking-widest uppercase opacity-30">
          Design — Phase 4
        </p>
      </section>

      {/* Info — Phase 4 */}
      <section
        id="info"
        className="min-h-[50vh] flex items-center justify-center border-t"
        style={{ borderColor: 'var(--line)' }}
      >
        <p className="text-[10px] tracking-widest uppercase opacity-30">
          Info — Phase 4
        </p>
      </section>
    </>
  )
}
