import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site'
import { showcaseProjects } from '@/lib/projects'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return [{ url: siteUrl, lastModified, changeFrequency: 'monthly', priority: 1 },
    ...showcaseProjects.map((project) => ({ url: `${siteUrl}/p/${project.slug}`, lastModified, changeFrequency: 'monthly' as const, priority: 0.7 }))]
}
