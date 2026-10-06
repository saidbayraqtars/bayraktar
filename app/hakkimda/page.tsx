import type { Metadata } from 'next'
import { Subpage } from '@/components/subpage'

const description = 'Said Bayraktar kimdir? Samsun’da full stack yazılım geliştirici: deneyim, eğitim, kullandığı teknolojiler ve indirilebilir özgeçmiş (CV).'

export const metadata: Metadata = {
  title: 'Hakkımda, deneyim ve özgeçmiş', description, alternates: { canonical: '/hakkimda' },
  openGraph: { title: 'Said Bayraktar · Hakkımda', description, url: '/hakkimda' },
}

export default function Page() {
  return <Subpage kind="about" />
}
