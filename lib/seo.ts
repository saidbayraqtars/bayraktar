import { education, profile, skillGroups } from '@/lib/content'
import { projectHref, type Project } from '@/lib/projects'
import { siteUrl } from '@/lib/site'

/*
  Search copy and structured data in one place. The Person node carries the name,
  role and city people search for ("Said Bayraktar", "yazılımcı Samsun"); every
  page links back to it by @id so search engines see one person behind the site.
*/
export const seo = {
  title: 'Said Bayraktar · Full Stack Yazılım Geliştirici, Samsun',
  description: 'Said Bayraktar, Samsun’da full stack yazılım geliştirici (yazılımcı). React, Next.js, Node.js, Electron ve SQL Server ile web, mobil ve masaüstü iş yazılımları, ERP entegrasyonları. Tam zamanlı, uzaktan ve freelance işlere açık.',
  keywords: ['Said Bayraktar', 'yazılımcı', 'yazılım geliştirici', 'full stack developer', 'full stack yazılımcı', 'Samsun yazılımcı', 'Samsun yazılım geliştirici', 'freelance yazılımcı', 'React geliştirici', 'Next.js geliştirici', 'Node.js', 'Electron', 'ERP entegrasyonu', 'Vega ERP', 'SQL Server', 'web yazılım', 'masaüstü yazılım'],
}

const personId = `${siteUrl}/#person`
const websiteId = `${siteUrl}/#website`

const person = {
  '@type': 'Person',
  '@id': personId,
  name: profile.name,
  givenName: 'Said',
  familyName: 'Bayraktar',
  url: siteUrl,
  email: `mailto:${profile.email}`,
  telephone: profile.phone.replace(/\s/g, ''),
  jobTitle: 'Full Stack Yazılım Geliştirici',
  description: 'Samsun’da yaşayan full stack yazılım geliştirici. Web, mobil ve masaüstü iş yazılımları ile ERP entegrasyonları geliştiriyor.',
  address: { '@type': 'PostalAddress', addressLocality: 'Samsun', addressCountry: 'TR' },
  nationality: { '@type': 'Country', name: 'Türkiye' },
  knowsLanguage: ['tr', 'en'],
  alumniOf: education.map((item) => ({ '@type': 'EducationalOrganization', name: item.school.tr })),
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Full Stack Yazılım Geliştirici',
    occupationLocation: { '@type': 'City', name: 'Samsun' },
    skills: skillGroups.flatMap((group) => group.items).join(', '),
  },
  knowsAbout: ['Full stack web geliştirme', 'ERP entegrasyonu', 'Masaüstü yazılım', ...skillGroups.slice(0, 4).flatMap((group) => group.items)],
  sameAs: [profile.github, profile.linkedin],
}

/** Site-wide graph: the website, the profile page and the person behind both. */
export function siteGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebSite', '@id': websiteId, url: siteUrl, name: 'Said Bayraktar', alternateName: 'Said Bayraktar · Yazılım Geliştirici', inLanguage: 'tr-TR', publisher: { '@id': personId } },
      { '@type': 'ProfilePage', '@id': `${siteUrl}/#profile`, url: siteUrl, name: seo.title, isPartOf: { '@id': websiteId }, mainEntity: { '@id': personId }, inLanguage: 'tr-TR' },
      person,
    ],
  }
}

const absolute = (path: string) => (path.startsWith('http') ? path : `${siteUrl}${path}`)

/** One project as software made by the person. */
function software(project: Project) {
  return {
    '@type': 'SoftwareApplication',
    name: project.name,
    description: project.summary.tr,
    applicationCategory: 'BusinessApplication',
    url: absolute(projectHref(project)),
    ...(project.image ? { image: absolute(project.image) } : {}),
    author: { '@id': personId },
    keywords: project.stack.join(', '),
  }
}

export function projectListGraph(projects: Project[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Said Bayraktar’ın yazılım projeleri',
    itemListElement: projects.map((project, index) => ({ '@type': 'ListItem', position: index + 1, item: software(project) })),
  }
}

export function projectGraph(project: Project) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      software(project),
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Said Bayraktar', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'İşler', item: `${siteUrl}/isler` },
          { '@type': 'ListItem', position: 3, name: project.name, item: absolute(projectHref(project)) },
        ],
      },
    ],
  }
}

/** Serialises structured data for a <script type="application/ld+json">. */
export const jsonLd = (data: unknown) => ({ __html: JSON.stringify(data).replace(/</g, '\\u003c') })
