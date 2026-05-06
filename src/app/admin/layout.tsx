import type { Metadata } from 'next'
import { AdminNav } from '@/components/admin/AdminNav'
import { AdminThemeProvider } from '@/components/admin/AdminTheme'

export const metadata: Metadata = {
  title: 'Admin — Studio Grang',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminThemeProvider>
      <div className="min-h-screen w-full overflow-x-hidden bg-neutral-950 antialiased text-white flex">
        <AdminNav />
        {/* Content area — offset right of sidebar on desktop, below top bar on mobile */}
        <div className="min-w-0 w-full flex-1 overflow-x-hidden md:ml-48 pt-12 md:pt-0">
          {children}
        </div>
      </div>
    </AdminThemeProvider>
  )
}
