import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Showcase } from '@/components/showcase'
import { showcaseProjects } from '@/lib/projects'
import { jsonLd, projectGraph } from '@/lib/seo'

export const dynamicParams = false
export function generateStaticParams() { return showcaseProjects.map(({ slug }) => ({ slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = showcaseProjects.find((item) => item.slug === slug)
  if (!project) return {}
  const description = `${project.pitch.tr} Geliştiren: Said Bayraktar, full stack yazılım geliştirici. Teknolojiler: ${project.stack.slice(0, 4).join(', ')}.`
  return {
    title: project.name, description,
    alternates: { canonical: `/p/${slug}` },
    openGraph: { title: `${project.name} · Said Bayraktar`, description, url: `/p/${slug}`, ...(project.image ? { images: [{ url: project.image, alt: `${project.name} ekran görüntüsü` }] } : {}) },
  }
}

export default async function ShowcasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = showcaseProjects.find((item) => item.slug === slug)
  if (!project) notFound()
  return <>
    <Showcase project={project} />
    <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(projectGraph(project))} />
  </>
}
