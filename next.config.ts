import type { NextConfig } from 'next'

// The site is a static export served by nginx on the Neva VPS (deploy/).
// Response headers and the old /projects/<slug> redirects live in the nginx
// config there (deploy/nginx/), since a static export cannot set them.
// Images: scripts/images.mjs writes WebP widths into out/_img at build time
// and lib/image-loader.ts points next/image at them.
const nextConfig: NextConfig = {
    output: 'export',
    images: {
        loader: 'custom',
        loaderFile: './lib/image-loader.ts',
        deviceSizes: [480, 768, 1080, 1440, 1920],
        imageSizes: [256],
    },
}

export default nextConfig
