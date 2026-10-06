import type { MetadataRoute } from 'next'
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Said Bayraktar, full stack geliştirici',
    short_name: 'Said Bayraktar',
    description: 'Ekrandan sunucuya: web, mobil ve masaüstü yazılım.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0d0f14',
    theme_color: '#0d0f14',
    lang: 'tr',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  }
}
