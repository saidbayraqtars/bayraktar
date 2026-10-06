import type { Metadata } from 'next'
import { Subpage } from '@/components/subpage'
import { projects } from '@/lib/projects'
import { jsonLd, projectListGraph } from '@/lib/seo'

const description = 'Said Bayraktar’ın geliştirdiği 19 yazılım projesi: B2B sipariş sistemi, Okka ERP, SeaWatch gemi takibi, Neva QR menü, Vega ERP’ye bağlı masaüstü ürünler ve kurumsal web siteleri.'

export const metadata: Metadata = {
  title: 'İşler ve projeler', description, alternates: { canonical: '/isler' },
  openGraph: { title: 'Said Bayraktar · İşler ve projeler', description, url: '/isler' },
}

export default function Page() {
  return <>
    <Subpage kind="work" />
    <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(projectListGraph(projects))} />
  </>
}
