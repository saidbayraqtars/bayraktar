import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { caseStudies } from '@/lib/content'
import { SiteFooter, SiteHeader } from '@/components/site-header'
import SmoothScroll from '@/components/ui/smooth-scroll'
import { ProjectDetail } from '@/components/project-detail'

export const dynamicParams = false
export function generateStaticParams() { return caseStudies.map(({ slug }) => ({ slug })) }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = caseStudies.find((item) => item.slug === slug)
  if (!project) return {}
  return { title: project.name, description: project.description.tr,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: { title: `${project.name} · Said Bayraktar`, description: project.description.tr, url: `/projects/${slug}`, images: [{ url: '/opengraph-image', width: 1200, height: 630 }] },
  }
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const index = caseStudies.findIndex((item) => item.slug === slug)
  if (index < 0) notFound()
  return <><SiteHeader inner /><SmoothScroll id="main-content"><ProjectDetail project={caseStudies[index]} next={caseStudies[(index + 1) % caseStudies.length]} /></SmoothScroll><SiteFooter /></>
}
