import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site'
import { caseStudies } from '@/lib/content'
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return [{ url: siteUrl, lastModified, changeFrequency: 'monthly', priority: 1 },
    ...caseStudies.map((project) => ({ url: siteUrl + '/projects/' + project.slug, lastModified, changeFrequency: 'monthly' as const, priority: 0.7 }))]
}
