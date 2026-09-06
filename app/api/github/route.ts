import { NextResponse } from 'next/server'
import { profile } from '@/lib/content'

export const revalidate = 3600

export type Repo = {
    name: string
    description: string | null
    language: string | null
    stars: number
    url: string
    homepage: string | null
    updatedAt: string
    topics: string[]
}

export async function GET() {
    try {
        const res = await fetch(`https://api.github.com/users/${profile.githubUser}/repos?per_page=100&sort=updated`, {
            headers: {
                Accept: 'application/vnd.github+json',
                'User-Agent': 'said-bayraktar-portfolio',
            },
            next: { revalidate: 3600 },
            signal: AbortSignal.timeout(8000),
        })

        if (!res.ok) {
            return NextResponse.json({ repos: [] as Repo[], error: 'github_unavailable' }, { status: 503 })
        }

        const data = (await res.json()) as Array<Record<string, unknown>>

        const repos: Repo[] = data
            .filter((repo) => !repo.fork && !repo.archived)
            .map((repo) => ({
                name: String(repo.name),
                description: (repo.description as string | null) ?? null,
                language: (repo.language as string | null) ?? null,
                stars: Number(repo.stargazers_count ?? 0),
                url: String(repo.html_url),
                homepage: (repo.homepage as string | null) || null,
                updatedAt: String(repo.pushed_at ?? repo.updated_at ?? ''),
                topics: (repo.topics as string[] | undefined) ?? [],
            }))
            .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))

        return NextResponse.json({ repos })
    } catch {
        return NextResponse.json({ repos: [] as Repo[], error: 'github_unavailable' }, { status: 503 })
    }
}
