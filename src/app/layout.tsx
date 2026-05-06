import type { Metadata } from 'next'
import {
  Inter,
  Cormorant_Garamond,
  Bebas_Neue,
  DM_Sans,
  Syne,
} from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { DesignVariantProvider } from '@/lib/design-variant'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Studio Grang',
  description: 'Photography & Video Direction by Kang Bosun',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={[
        inter.variable,
        cormorant.variable,
        bebas.variable,
        dmSans.variable,
        syne.variable,
      ].join(' ')}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var v = localStorage.getItem('grang-design-variant') || 'v1';
                if (!['v1','v2','v3'].includes(v)) v = 'v1';
                document.documentElement.setAttribute('data-design', v);
              } catch(e) {
                document.documentElement.setAttribute('data-design', 'v1');
              }
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <DesignVariantProvider>
            <Nav />
            <main className="flex-1">{children}</main>
            <Footer />
          </DesignVariantProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
