import type { Metadata, Viewport } from 'next'
import { Manrope, DM_Sans } from 'next/font/google'
import { SiteProvider } from '@/components/providers'
import { siteUrl } from '@/lib/site'
import { profile } from '@/lib/content'
import './globals.css'

const display = Manrope({ subsets: ['latin', 'latin-ext'], variable: '--font-display', display: 'swap' })
const body = DM_Sans({ subsets: ['latin', 'latin-ext'], variable: '--font-body', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Said Bayraktar — Full Stack Developer & Freelance Yazılım', template: '%s · Said Bayraktar' },
  description: 'Fikrinizi çalışan bir ürüne dönüştürelim. Web siteleri, SaaS, ERP entegrasyonları ve masaüstü uygulamaları. Said Bayraktar — Samsun, Türkiye.',
  alternates: { canonical: '/' },
  authors: [{ name: profile.name, url: profile.github }],
  creator: profile.name,
  openGraph: {
    type: 'website', locale: 'tr_TR', alternateLocale: 'en_US', url: siteUrl,
    title: 'Said Bayraktar — İyi fikirlerden gerçek ürünlere.',
    description: 'Web, mobil ve masaüstü. İşinizi anlayan, yazılımınızı geliştiren ve yayına taşıyan çözüm ortağınız.',
    siteName: 'Said Bayraktar',
  },
  twitter: { card: 'summary_large_image', title: 'Said Bayraktar — Full Stack Developer',
    description: 'Web siteleri, iş uygulamaları ve ERP entegrasyonları. Fikirden yayına.' },
  robots: { index: true, follow: true },
}
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#111d29' }
const themeScript = "(function(){try{var d=localStorage.getItem('sb-theme')!=='light';document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light';}catch(e){document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark';}})()"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Person', name: profile.name,
    url: siteUrl, jobTitle: 'Full Stack Developer', email: profile.email,
    sameAs: [profile.github, profile.linkedin], address: { '@type': 'PostalAddress', addressLocality: 'Samsun', addressCountry: 'TR' },
    knowsAbout: ['Web development', 'ERP integration', 'React', 'Next.js', 'Electron', 'Laravel'] }
  return <html lang="tr" className={display.variable + ' ' + body.variable + ' dark'} suppressHydrationWarning>
    <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
    <body><SiteProvider>{children}</SiteProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
    </body>
  </html>
}

