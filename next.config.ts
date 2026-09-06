import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'cdn.simpleicons.org' },
            { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
        ],
    },
}

export default nextConfig
