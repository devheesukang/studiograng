import type { Metadata } from 'next'
import { AdminNav } from '@/components/admin/AdminNav'

export const metadata: Metadata = {
  title: 'Admin — Studio Grang',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-950 antialiased text-white flex">
      <AdminNav />
      {/* Content area — offset right of sidebar on desktop, below top bar on mobile */}
      <div className="flex-1 md:ml-48 pt-12 md:pt-0">
        {children}
      </div>
    </div>
  )
}
