// Old /projects/<slug> pages from the previous design go to the project's own
// site or its /p/<slug> showcase page. Used by the nginx config generator and
// the local static server, so both behave the same.
import { projects } from '../lib/projects.ts'

export const redirects = [
    ...projects.map((p) => ({ from: `/projects/${p.slug}`, to: p.url ?? `/p/${p.slug}` })),
]
/** Any other /projects/... path goes home. */
export const fallback = { prefix: '/projects/', to: '/' }
