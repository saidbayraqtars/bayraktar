'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react'
import { useSite } from '@/components/providers'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ProjectVisual } from '@/components/project-visual'
import { ProjectLinks } from '@/components/sections/project-showcase'
import { portfolio, type CaseStudy } from '@/lib/content'

export function ProjectDetail({ project, next }: { project: CaseStudy; next: CaseStudy }) {
  const { lang } = useSite()
  const t = portfolio[lang].detail
  return <div className="detail-page shell"><Link href="/#projects" className="text-link"><ArrowLeft />{t.back}</Link>
    <div className="detail-heading"><p className="eyebrow">{t.eyebrow} · {project.type[lang]}</p><p className="detail-name">{project.name}</p><h1>{project.headline[lang]}</h1><p className="detail-description">{project.description[lang]}</p><ProjectLinks project={project} />{project.repoType === 'releases' && <small className="repo-note">{t.repoNote}</small>}</div>
    <ProjectVisual project={project} priority />
    <div className="detail-body"><aside><p className="eyebrow">{t.role}</p><p>{t.roleValue}</p><p className="eyebrow">{t.tools}</p><div className="tag-list">{project.stack.map((tech) => <Badge key={tech} variant="secondary">{tech}</Badge>)}</div></aside><div><section><h2>{t.challenge}</h2><p>{project.challenge[lang]}</p></section><section><h2>{t.solution}</h2><p>{project.solution[lang]}</p></section><section><h2>{t.outcomes}</h2><ul>{project.outcomes.map((outcome) => <li key={outcome.en}><Check />{outcome[lang]}</li>)}</ul></section></div></div>
    <div className="detail-cta"><h2>{t.cta}</h2><Button asChild size="lg"><Link href="/#contact">{t.discuss}<ArrowUpRight /></Link></Button></div>
    <Link href={`/projects/${next.slug}`} className="next-project"><div><p className="eyebrow">{t.next}</p><h2>{next.name}</h2></div><ArrowUpRight /></Link>
  </div>
}
