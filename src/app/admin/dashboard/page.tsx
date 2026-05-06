import Link from 'next/link'

const SECTIONS = [
  {
    href: '/admin/photography',
    label: 'Photography',
    description: 'Toggle images, reorder gallery, upload new photos, rename filter tabs.',
  },
  {
    href: '/admin/videos',
    label: 'Videos',
    description: 'Toggle videos, reorder, add new entries, edit titles and YouTube IDs.',
  },
  {
    href: '/admin/info',
    label: 'Info',
    description: 'Edit bio, email, phone number, and Instagram handle.',
  },
  {
    href: '/admin/design',
    label: 'Design',
    description: 'Choose which design variant (V1 / V2 / V3) appears on the public site.',
  },
]

export default function DashboardPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <main className="w-full max-w-3xl mx-auto px-4 py-10 sm:px-6 sm:py-16">
        <h1 className="text-xs tracking-[0.5em] uppercase text-neutral-500 mb-12">Dashboard</h1>
        <div className="flex flex-col gap-4">
          {SECTIONS.map(({ href, label, description }) => (
            <Link
              key={href}
              href={href}
              className="group min-w-0 border border-neutral-800 px-4 py-5 hover:border-neutral-600 transition-colors sm:px-6"
            >
              <p className="text-sm tracking-widest uppercase text-white mb-1 group-hover:opacity-80 transition-opacity">
                {label}
              </p>
              <p className="text-xs text-neutral-500 leading-relaxed">{description}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
