import type { Metadata } from 'next'
import { Subpage } from '@/components/subpage'

export const metadata: Metadata = { title: 'Hakkımda', alternates: { canonical: '/hakkimda' } }

export default function Page() {
  return <Subpage kind="about" />
}
