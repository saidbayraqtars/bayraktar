'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Box, Code2, ExternalLink, GitBranch, Github, LoaderCircle, Monitor, Star } from 'lucide-react'
import { useSite } from '@/components/providers'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { ProjectVisual } from '@/components/project-visual'
import { ScrollStack } from '@/components/ui/smooth-scroll'
import { caseStudies, portfolio, profile, type Category, type CaseStudy } from '@/lib/content'
import type { Repo } from '@/app/api/github/route'

export function ProjectLinks({ project }: { project: CaseStudy }) {
  const { lang } = useSite()
  const t = portfolio[lang].work
  return <div className="project-links">
    {project.live && <a href={project.live} target="_blank" rel="noreferrer">{t.live}<ExternalLink /></a>}
    {project.repo && <a href={project.repo} target="_blank" rel="noreferrer"><Github />{project.repoType === 'releases' ? t.releases : t.source}<ArrowUpRight /></a>}
  </div>
}

export function ProjectShowcase() {
  const { lang } = useSite()
  const t = portfolio[lang].work
  return <section id="projects" className="work-section section-pad">
    <div className="shell"><div className="section-intro"><div><p className="eyebrow">{t.eyebrow}</p><h2>{t.title}</h2></div><p>{t.lead}</p></div>
      <ScrollStack className="stack-projects">{caseStudies.slice(0, 3).map((project, index) => <article key={project.slug} className={`project-stage stage-${project.theme}`} style={{ '--stage-index': index } as CSSProperties}>
        <div className="stage-copy"><div className="project-meta"><span>{project.type[lang]}</span><span aria-hidden="true">↗</span></div>
          <div><p className="project-name">{project.name}</p><h3>{project.headline[lang]}</h3><p className="stage-description">{project.description[lang]}</p></div>
          <div className="stage-bottom"><div className="tag-list">{project.stack.slice(0, 4).map((tech) => <Badge key={tech} variant="outline">{tech}</Badge>)}</div>
            <Button asChild variant="outline"><Link href={`/projects/${project.slug}`}>{t.details}<ArrowUpRight data-icon="inline-end" /></Link></Button><ProjectLinks project={project} /></div>
        </div><ProjectVisual project={project} />
      </article>)}</ScrollStack>
    </div>
  </section>
}

export function ProjectArchive() {
  const { lang } = useSite()
  const t = portfolio[lang].work
  const [filter, setFilter] = useState<Category | 'all'>('all')
  const visible = caseStudies.filter((project) => filter === 'all' || project.category === filter)
  const icons = { web: Code2, business: Box, desktop: Monitor, tools: GitBranch }
  return <section className="archive-section section-pad" id="all-projects"><div className="shell">
    <div className="section-intro"><div><p className="eyebrow">{t.all.toLocaleUpperCase(lang)} · {caseStudies.length} {t.count.toLocaleUpperCase(lang)}</p><h2>{t.more}</h2></div><p>{t.moreLead}</p></div>
    <div className="filter-line"><ToggleGroup type="single" value={filter} onValueChange={(value) => { if (value) setFilter(value as typeof filter) }} aria-label={t.more} variant="outline" className="project-filters">
      {(['all', 'web', 'business', 'desktop', 'tools'] as const).map((key) => <ToggleGroupItem key={key} value={key}>{t[key]}</ToggleGroupItem>)}
    </ToggleGroup><span className="filter-count" role="status">{visible.length} {t.count}</span></div>
    <div className="archive-grid">{visible.map((project) => { const Icon = icons[project.category]; return <Link key={project.slug} href={`/projects/${project.slug}`} className="archive-item"><span className={`archive-icon archive-${project.theme}`}><Icon /></span><span className="archive-item-copy"><span className="archive-type">{project.type[lang]}</span><h3>{project.name}</h3><p>{project.description[lang]}</p><span className="archive-stack">{project.stack.slice(0, 3).join(' / ')}</span></span><ArrowUpRight className="archive-arrow" /></Link> })}</div>
    <GithubArchive />
  </div></section>
}

function GithubArchive() {
  const { lang } = useSite()
  const t = portfolio[lang].work
  const ref = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const [repos, setRepos] = useState<Repo[]>([])
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [attempt, setAttempt] = useState(0)
  const [expanded, setExpanded] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setEnabled(true); observer.disconnect() } }, { rootMargin: '400px' })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    if (!enabled) return
    const controller = new AbortController()
    fetch('/api/github', { signal: controller.signal }).then(async (response) => {
      if (!response.ok) throw new Error('GitHub unavailable')
      const result: { repos?: Repo[]; error?: string } = await response.json()
      if (!Array.isArray(result.repos) || result.error) throw new Error('GitHub unavailable')
      setRepos(result.repos); setStatus('ready')
    }).catch(() => { if (!controller.signal.aborted) setStatus('error') })
    return () => controller.abort()
  }, [enabled, attempt])
  return <div className="github-section" ref={ref}>
    <div className="github-heading"><div><Github /><h3>{t.github}</h3></div><a className="text-link" href={profile.github} target="_blank" rel="noreferrer">{t.githubLink}<ArrowUpRight /></a></div>
    <p className="github-lead">{t.githubLead}</p>
    {status === 'loading' && <p className="github-status" role="status"><LoaderCircle className="loading-spinner" />{t.githubLoading}</p>}
    {status === 'error' && <div className="github-status" role="status"><p>{t.githubError}</p><Button variant="outline" onClick={() => { setStatus('loading'); setAttempt((value) => value + 1) }}>{t.retry}</Button></div>}
    {status === 'ready' && <><div className="repo-grid">{repos.slice(0, expanded ? repos.length : 6).map((repo) => <a href={repo.url} key={repo.name} className="repo-item" target="_blank" rel="noreferrer"><div><GitBranch /><span>{repo.name}</span><ArrowUpRight /></div><p>{repo.name.endsWith('-releases') ? t.releaseLabel : repo.language ?? t.repoLabel}{repo.stars > 0 && <span><Star />{repo.stars}</span>}</p></a>)}</div>{repos.length > 6 && <Button variant="outline" onClick={() => setExpanded((value) => !value)} aria-expanded={expanded}>{expanded ? t.githubHide : `${t.githubShow} (${repos.length})`}<ArrowUpRight /></Button>}</>}
  </div>
}
