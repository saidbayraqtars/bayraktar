import type { Metadata } from 'next'
import { Subpage } from '@/components/subpage'

export const metadata: Metadata = { title: 'İşler', alternates: { canonical: '/isler' } }

export default function Page() {
  return <Subpage kind="work" />
}
