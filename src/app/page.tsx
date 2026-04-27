export default function Home() {
  return (
    <>
      {/* Hero placeholder — Phase 2 */}
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'var(--bg)' }}
      >
        <p className="text-xs tracking-widest uppercase opacity-30">Hero — Phase 2</p>
      </section>

      {/* Photography */}
      <section
        id="photography"
        className="min-h-screen flex items-center justify-center border-t"
        style={{ background: 'var(--bg)', borderColor: 'var(--line)' }}
      >
        <p className="text-xs tracking-widest uppercase opacity-30">Photography — Phase 3</p>
      </section>

      {/* Video */}
      <section
        id="video"
        className="min-h-screen flex items-center justify-center border-t"
        style={{ background: 'var(--bg)', borderColor: 'var(--line)' }}
      >
        <p className="text-xs tracking-widest uppercase opacity-30">Video — Phase 4</p>
      </section>

      {/* Design */}
      <section
        id="design"
        className="min-h-screen flex items-center justify-center border-t"
        style={{ background: 'var(--bg)', borderColor: 'var(--line)' }}
      >
        <p className="text-xs tracking-widest uppercase opacity-30">Design — Phase 4</p>
      </section>

      {/* Info */}
      <section
        id="info"
        className="min-h-[50vh] flex items-center justify-center border-t"
        style={{ background: 'var(--bg)', borderColor: 'var(--line)' }}
      >
        <p className="text-xs tracking-widest uppercase opacity-30">Info — Phase 4</p>
      </section>
    </>
  )
}
