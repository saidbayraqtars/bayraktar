import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Showcase } from '@/components/showcase'
import { showcaseProjects } from '@/lib/projects'

export const dynamicParams = false
export function generateStaticParams() { return showcaseProjects.map(({ slug }) => ({ slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = showcaseProjects.find((item) => item.slug === slug)
  if (!project) return {}
  return {
    title: project.name, description: project.pitch.tr,
    alternates: { canonical: `/p/${slug}` },
    openGraph: { title: `${project.name} · Said Bayraktar`, description: project.pitch.tr, url: `/p/${slug}` },
  }
}

export default async function ShowcasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = showcaseProjects.find((item) => item.slug === slug)
  if (!project) notFound()
  return <Showcase project={project} />
}
