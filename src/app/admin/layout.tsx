import type { Metadata } from 'next'
import { AdminNav } from '@/components/admin/AdminNav'
import { AdminContentProvider } from '@/components/admin/AdminContentProvider'
import { AdminThemeProvider } from '@/components/admin/AdminTheme'

export const metadata: Metadata = {
  title: 'Admin — Studio Grang',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminThemeProvider>
      <AdminContentProvider>
        <div className="min-h-screen w-full overflow-x-hidden bg-neutral-950 antialiased text-white">
          <AdminNav />
          <div className="min-w-0 w-full overflow-x-hidden pt-14">
            {children}
          </div>
        </div>
      </AdminContentProvider>
    </AdminThemeProvider>
  )
}
