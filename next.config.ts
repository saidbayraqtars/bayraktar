import type { NextConfig } from 'next'
import { projects } from './lib/projects'

const securityHeaders = [
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
    { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
]

const nextConfig: NextConfig = {
    async headers() {
        return [{ source: '/:path*', headers: securityHeaders }]
    },
    // Old /projects/<slug> pages from the previous design go to the site or the showcase page.
    async redirects() {
        return [
            ...projects.map((project) => ({ source: `/projects/${project.slug}`, destination: project.url ?? `/p/${project.slug}`, permanent: true })),
            { source: '/projects/:slug', destination: '/', permanent: true },
        ]
    },
}

export default nextConfig
