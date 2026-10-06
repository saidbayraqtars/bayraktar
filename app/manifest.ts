import type { MetadataRoute } from 'next'
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Said Bayraktar, full stack yazılım geliştirici',
    short_name: 'Said Bayraktar',
    description: 'Ekrandan sunucuya: web, mobil ve masaüstü yazılım.',
    start_url: '/',
    display: 'standalone',
    background_color: '#092634',
    theme_color: '#092634',
    lang: 'tr',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  }
}
