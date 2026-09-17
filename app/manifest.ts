import type { MetadataRoute } from 'next'
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Said Bayraktar — Full Stack Developer',
    short_name: 'Said Bayraktar',
    description: 'Web siteleri, SaaS, ERP entegrasyonları ve masaüstü uygulamaları.',
    start_url: '/',
    display: 'standalone',
    background_color: '#111d29',
    theme_color: '#111d29',
    lang: 'tr',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  }
}
