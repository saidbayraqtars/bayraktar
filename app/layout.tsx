import type { Metadata, Viewport } from 'next'
import { Archivo } from 'next/font/google'
import { SiteProvider } from '@/components/providers'
import { TransitionProvider } from '@/components/transition'
import { siteUrl } from '@/lib/site'
import { profile } from '@/lib/content'
import './globals.css'
import './demos.css'

// One variable family carries the whole identity: the width axis (62-125) is animated for the kinetic type.
const archivo = Archivo({ subsets: ['latin', 'latin-ext'], axes: ['wdth'], variable: '--font-archivo', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Said Bayraktar, full stack geliştirici', template: '%s · Said Bayraktar' },
  description: 'Web, mobil ve masaüstü yazılım. B2B sipariş sistemi, ERP’ler, masaüstü iş yazılımları ve kurumsal siteler. Samsun’dan, her yere.',
  alternates: { canonical: '/' },
  authors: [{ name: profile.name, url: profile.github }],
  creator: profile.name,
  openGraph: {
    type: 'website', locale: 'tr_TR', alternateLocale: 'en_US', url: siteUrl,
    title: 'Said Bayraktar, ekrandan sunucuya',
    description: 'Arayüzü de, arkasındaki sunucuyu da kuran full stack geliştirici. 19 proje, büyükten küçüğe.',
    siteName: 'Said Bayraktar',
  },
  twitter: { card: 'summary_large_image', title: 'Said Bayraktar, full stack geliştirici', description: 'Ekrandan sunucuya. 19 proje, büyükten küçüğe.' },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width: 'device-width', initialScale: 1,
  themeColor: [{ media: '(prefers-color-scheme: light)', color: '#eceef2' }, { media: '(prefers-color-scheme: dark)', color: '#0d0f14' }],
}

// Runs before paint: applies the saved or system theme, and flags the first home visit of the session for the intro.
const headScript = "(function(){var r=document.documentElement;try{var s=localStorage.getItem('sb-theme');var d=s?s==='dark':matchMedia('(prefers-color-scheme: dark)').matches;r.classList.toggle('dark',d);r.style.colorScheme=d?'dark':'light';}catch(e){}try{if(location.pathname==='/'&&!sessionStorage.getItem('sb-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)r.dataset.intro='on';}catch(e){}})()"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Person', name: profile.name,
    url: siteUrl, jobTitle: 'Full Stack Developer', email: profile.email,
    sameAs: [profile.github, profile.linkedin], address: { '@type': 'PostalAddress', addressLocality: 'Samsun', addressCountry: 'TR' },
    knowsAbout: ['Web development', 'ERP integration', 'React', 'Next.js', 'Electron', 'Laravel'] }
  return <html lang="tr" className={archivo.variable} suppressHydrationWarning>
    <head><script dangerouslySetInnerHTML={{ __html: headScript }} /></head>
    <body><SiteProvider><TransitionProvider>{children}</TransitionProvider></SiteProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
    </body>
  </html>
}
