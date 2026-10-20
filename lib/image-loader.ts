'use client'

// next/image loader for the static export. In production every width listed in
// next.config.ts exists as /_img/<name>-<width>.webp (scripts/images.mjs).
// The dev server has no /_img, so it serves the original file.
export default function imageLoader({ src, width }: { src: string; width: number }) {
    if (process.env.NODE_ENV === 'development') return src
    const name = src.replace(/^\//, '').replace(/\.[a-z0-9]+$/i, '').replace(/\//g, '_')
    return `/_img/${name}-${width}.webp`
}
