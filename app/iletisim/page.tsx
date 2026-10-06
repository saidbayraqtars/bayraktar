import type { Metadata } from 'next'
import { Subpage } from '@/components/subpage'

export const metadata: Metadata = { title: 'İletişim', alternates: { canonical: '/iletisim' } }

export default function Page() {
  return <Subpage kind="contact" />
}
