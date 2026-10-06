import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site'
import { showcaseProjects } from '@/lib/projects'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return [{ url: siteUrl, lastModified, changeFrequency: 'monthly', priority: 1 },
    ...['isler', 'hakkimda', 'iletisim'].map((path) => ({ url: `${siteUrl}/${path}`, lastModified, changeFrequency: 'monthly' as const, priority: 0.8 })),
    ...showcaseProjects.map((project) => ({ url: `${siteUrl}/p/${project.slug}`, lastModified, changeFrequency: 'monthly' as const, priority: 0.7 }))]
}
