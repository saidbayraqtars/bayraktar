'use client'

import * as React from 'react'
import { useSite } from '@/components/providers'
import { Reveal, SectionHeading } from '@/components/ui/reveal'
import { Button } from '@/components/ui/button'
import { projects, profile } from '@/lib/content'
import type { Repo } from '@/app/api/github/route'
import { ArrowUpRight, Github, Star, GitBranch } from 'lucide-react'
import { cn } from '@/lib/utils'

const languageColor: Record<string, string> = {
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Python: '#3572A5',
    'C#': '#178600',
    Astro: '#ff5d01',
}

export function Projects() {
    const { t, lang } = useSite()
    const [filter, setFilter] = React.useState<'featured' | 'all'>('featured')
    const [repos, setRepos] = React.useState<Repo[]>([])

    React.useEffect(() => {
        let active = true
        fetch('/api/github')
            .then((res) => res.json())
            .then((data: { repos?: Repo[] }) => {
                if (active) setRepos(data.repos ?? [])
            })
            .catch(() => undefined)
        return () => {
            active = false
        }
    }, [])

    const visible = filter === 'featured' ? projects.filter((project) => project.featured) : projects

    return (
        <section
            id="projects"
            className="relative scroll-mt-24 py-24 md:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                <div className="flex flex-wrap items-end justify-between gap-6">
                    <SectionHeading
                        eyebrow={t.projects.eyebrow}
                        title={t.projects.title}
                        lead={t.projects.lead}
                    />

                    <Reveal delay={0.1}>
                        <div className="bg-secondary/60 flex rounded-full border p-1">
                            {(['featured', 'all'] as const).map((key) => (
                                <button
                                    key={key}
                                    onClick={() => setFilter(key)}
                                    className={cn(
                                        'rounded-full px-4 py-1.5 text-sm transition-colors',
                                        filter === key
                                            ? 'bg-background text-foreground shadow-sm'
                                            : 'text-muted-foreground hover:text-foreground',
                                    )}>
                                    {key === 'featured' ? t.projects.featured : t.projects.all}
                                </button>
                            ))}
                        </div>
                    </Reveal>
                </div>

                <div className="mt-14 grid gap-4 md:grid-cols-2">
                    {visible.map((project, i) => (
                        <Reveal
                            key={project.slug}
                            delay={(i % 2) * 0.08}
                            className={cn(project.featured && filter === 'featured' && i === 0 && 'md:col-span-2')}>
                            <article className="group bg-card/40 relative flex h-full flex-col overflow-hidden rounded-3xl border p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 md:p-8">
                                <div className="from-brand-a/15 pointer-events-none absolute inset-x-0 -top-40 -z-10 h-64 bg-gradient-to-b to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                                <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest">
                                    {lang === 'tr' ? project.kindTr : project.kindEn}
                                </p>
                                <h3 className="mt-3 text-xl font-semibold md:text-2xl">
                                    {lang === 'tr' ? project.titleTr : project.titleEn}
                                </h3>
                                <p className="text-muted-foreground mt-3 text-sm leading-relaxed md:text-base">
                                    {lang === 'tr' ? project.descTr : project.descEn}
                                </p>

                                <div className="mt-6 flex flex-wrap gap-2">
                                    {project.stack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="bg-secondary/60 rounded-full border px-2.5 py-1 text-xs">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-6 flex flex-wrap items-center gap-3 pt-2">
                                    {project.repo ? (
                                        <Button
                                            asChild
                                            variant="outline"
                                            size="sm"
                                            className="rounded-full">
                                            <a
                                                href={project.repo}
                                                target="_blank"
                                                rel="noreferrer">
                                                <Github className="mr-1.5 size-4" />
                                                {t.projects.code}
                                            </a>
                                        </Button>
                                    ) : null}
                                    {project.live ? (
                                        <Button
                                            asChild
                                            size="sm"
                                            className="rounded-full">
                                            <a
                                                href={project.live}
                                                target="_blank"
                                                rel="noreferrer">
                                                {t.projects.live}
                                                <ArrowUpRight className="ml-1 size-4" />
                                            </a>
                                        </Button>
                                    ) : null}
                                </div>
                            </article>
                        </Reveal>
                    ))}
                </div>

                {repos.length > 0 ? (
                    <div className="mt-24">
                        <Reveal className="flex flex-wrap items-end justify-between gap-4">
                            <div>
                                <h3 className="text-2xl font-semibold md:text-3xl">{t.projects.githubTitle}</h3>
                                <p className="text-muted-foreground mt-2">{t.projects.githubLead}</p>
                            </div>
                            <Button
                                asChild
                                variant="ghost"
                                size="sm"
                                className="rounded-full">
                                <a
                                    href={profile.github}
                                    target="_blank"
                                    rel="noreferrer">
                                    <Github className="mr-1.5 size-4" />
                                    {t.projects.viewGithub}
                                    <ArrowUpRight className="ml-1 size-4" />
                                </a>
                            </Button>
                        </Reveal>

                        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {repos.slice(0, 12).map((repo, i) => (
                                <Reveal
                                    key={repo.name}
                                    delay={(i % 3) * 0.05}>
                                    <a
                                        href={repo.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="hover:border-brand-b/50 hover:bg-card/60 flex h-full flex-col rounded-2xl border p-5 transition-colors">
                                        <div className="flex items-start justify-between gap-3">
                                            <p className="inline-flex items-center gap-2 font-mono text-sm font-medium">
                                                <GitBranch className="text-muted-foreground size-3.5 shrink-0" />
                                                <span className="break-all">{repo.name}</span>
                                            </p>
                                            {repo.stars > 0 ? (
                                                <span className="text-muted-foreground inline-flex shrink-0 items-center gap-1 text-xs">
                                                    <Star className="size-3" />
                                                    {repo.stars}
                                                </span>
                                            ) : null}
                                        </div>

                                        {repo.description ? (
                                            <p className="text-muted-foreground mt-3 line-clamp-2 text-sm">{repo.description}</p>
                                        ) : null}

                                        <div className="text-muted-foreground mt-auto flex items-center gap-3 pt-4 text-xs">
                                            {repo.language ? (
                                                <span className="inline-flex items-center gap-1.5">
                                                    <span
                                                        className="size-2 rounded-full"
                                                        style={{ background: languageColor[repo.language] ?? '#8b8b8b' }}
                                                    />
                                                    {repo.language}
                                                </span>
                                            ) : null}
                                            <span>
                                                {new Date(repo.updatedAt).toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-GB', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                })}{' '}
                                                {t.projects.updated}
                                            </span>
                                        </div>
                                    </a>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                ) : null}
            </div>
        </section>
    )
}
