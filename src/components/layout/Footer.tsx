export function Footer() {
  return (
    <footer
      className="py-12 px-6 border-t"
      style={{ borderColor: 'var(--line)' }}
    >
      <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <span className="text-xs tracking-widest uppercase opacity-40">
          Grang Studio
        </span>
        <span className="text-xs opacity-30">
          © {new Date().getFullYear()} Kang Bosun
        </span>
        <a
          href="mailto:wolfkang0514@naver.com"
          className="text-xs opacity-40 hover:opacity-80 transition-opacity"
        >
          wolfkang0514@naver.com
        </a>
      </div>
    </footer>
  )
}
