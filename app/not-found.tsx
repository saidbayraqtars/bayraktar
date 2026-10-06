'use client'

import Link from 'next/link'
import { useSite } from '@/components/providers'
import { LogoMark } from '@/components/logo'

export default function NotFound() {
  const { t } = useSite()
  return <main className="not-found">
    <LogoMark size={72} build />
    <h1>{t.notFound.title}</h1>
    <p>{t.notFound.body}</p>
    <Link href="/" className="btn btn-solid">{t.notFound.back}</Link>
  </main>
}
