import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site'
import { caseStudies } from '@/lib/content'
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteUrl, changeFrequency: 'monthly', priority: 1 },
    ...caseStudies.map((project) => ({ url: siteUrl + '/projects/' + project.slug, changeFrequency: 'monthly' as const, priority: 0.7 }))]
}

