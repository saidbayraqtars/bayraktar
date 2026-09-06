import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
export default function NotFound() {
  return <main className="not-found"><span>404</span><h1>Bu sayfayı bulamadım.</h1><p>Projelerimi ve iletişim bilgilerimi ana sayfada bulabilirsiniz.</p><Button asChild><Link href="/"><ArrowLeft />Ana sayfaya dön</Link></Button></main>
}
