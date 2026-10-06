import type { Metadata, Viewport } from 'next'
import { Archivo } from 'next/font/google'
import { SiteProvider } from '@/components/providers'
import { TransitionProvider } from '@/components/transition'
import { siteUrl } from '@/lib/site'
import { profile } from '@/lib/content'
import { jsonLd, seo, siteGraph } from '@/lib/seo'
import './globals.css'
import './demos.css'
import './demo-neva.css'
import './demo-okka.css'
import './demo-seawatch.css'
import './demo-loops.css'

// One variable family carries the whole identity: the width axis (62-125) is animated for the kinetic type.
const archivo = Archivo({ subsets: ['latin', 'latin-ext'], axes: ['wdth'], variable: '--font-archivo', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: seo.title, template: '%s · Said Bayraktar' },
  description: seo.description,
  keywords: seo.keywords,
  applicationName: 'Said Bayraktar',
  alternates: { canonical: '/' },
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  publisher: profile.name,
  category: 'technology',
  openGraph: {
    type: 'profile', firstName: 'Said', lastName: 'Bayraktar', username: profile.githubUser,
    locale: 'tr_TR', alternateLocale: 'en_US', url: siteUrl, siteName: 'Said Bayraktar',
    title: 'Said Bayraktar · Full stack yazılım geliştirici',
    description: 'Arayüzü de, arkasındaki sunucuyu da kuran full stack yazılım geliştirici. Samsun’dan, 19 proje.',
  },
  twitter: { card: 'summary_large_image', title: 'Said Bayraktar · Full stack yazılım geliştirici', description: 'Ekrandan sunucuya. Samsun’dan, 19 proje.' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  // Set these in Vercel once Search Console / Bing Webmaster give a token.
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : {}),
    ...(process.env.YANDEX_VERIFICATION ? { yandex: process.env.YANDEX_VERIFICATION } : {}),
    ...(process.env.BING_VERIFICATION ? { other: { 'msvalidate.01': process.env.BING_VERIFICATION } } : {}),
  },
}

export const viewport: Viewport = {
  width: 'device-width', initialScale: 1,
  themeColor: [{ media: '(prefers-color-scheme: light)', color: '#f9f9f9' }, { media: '(prefers-color-scheme: dark)', color: '#092634' }],
}

// Runs before paint: applies the saved or system theme, and flags the first home visit of the session for the intro.
const headScript = "(function(){var r=document.documentElement;try{var s=localStorage.getItem('sb-theme');var d=s?s==='dark':matchMedia('(prefers-color-scheme: dark)').matches;r.classList.toggle('dark',d);r.style.colorScheme=d?'dark':'light';}catch(e){}try{if(location.pathname==='/'&&!sessionStorage.getItem('sb-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)r.dataset.intro='on';}catch(e){}})()"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="tr" className={archivo.variable} suppressHydrationWarning>
    <head><script dangerouslySetInnerHTML={{ __html: headScript }} /></head>
    <body><SiteProvider><TransitionProvider>{children}</TransitionProvider></SiteProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(siteGraph())} />
    </body>
  </html>
}
