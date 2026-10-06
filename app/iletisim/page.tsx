import type { Metadata } from 'next'
import { Subpage } from '@/components/subpage'

const description = 'Said Bayraktar ile iletişim: e-posta, WhatsApp, LinkedIn ve GitHub. İş teklifleri, yazılım geliştirici pozisyonları ve freelance projeler için.'

export const metadata: Metadata = {
  title: 'İletişim', description, alternates: { canonical: '/iletisim' },
  openGraph: { title: 'Said Bayraktar · İletişim', description, url: '/iletisim' },
}

export default function Page() {
  return <Subpage kind="contact" />
}
