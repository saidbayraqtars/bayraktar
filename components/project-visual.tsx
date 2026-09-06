'use client'

import Image from 'next/image'
import { ArrowRight, Check, Database, FileCheck2, Globe2, MessageCircle, Monitor, Radio, Users } from 'lucide-react'
import { useSite } from '@/components/providers'
import { portfolio, type CaseStudy } from '@/lib/content'

export function ProjectVisual({ project, priority = false }: { project: CaseStudy; priority?: boolean }) {
  const { lang } = useSite()
  const t = portfolio[lang]
  if (project.image) return <figure className={`project-visual visual-${project.theme}`}>
    <div className="visual-disc" />
    <div className="browser-shot showcase-browser"><div className="browser-chrome"><span className="window-dots"><i /><i /><i /></span><span>{project.name}</span><Globe2 /></div>
      <Image src={project.image} alt={`${project.name} — ${project.slug === 'b2b-order-system' ? t.work.demoScreenshot : t.work.screenshot}`} width={project.slug === 'b2b-order-system' ? 1440 : 1280} height={project.slug === 'b2b-order-system' ? 960 : 1000} sizes="(max-width: 760px) 92vw, 62vw" priority={priority} />
    </div>
    <figcaption>{project.slug === 'b2b-order-system' ? t.work.demoScreenshot : t.work.screenshot}</figcaption>
  </figure>
  const isVega = project.theme === 'vega'
  const isSea = project.slug === 'seawatch'
  if (project.slug !== 'vega-ticket') return <figure className={`project-visual flow-visual visual-${project.theme}`}>
    <div className="visual-disc" /><div className="flow-window">
      <div className="flow-title"><span className="flow-app-icon">{isSea ? <Radio /> : <Monitor />}</span><span>{project.name}<small>{project.type[lang]}</small></span></div>
      <ul className="capability-list">{project.outcomes.map((outcome) => <li key={outcome.en}><Check /><span>{outcome[lang]}</span></li>)}</ul>
      <div className="flow-data"><Database /><span>{project.stack.join(' · ')}</span></div>
    </div><figcaption>{t.detail.illustration}</figcaption>
  </figure>
  return <figure className={`project-visual flow-visual visual-${project.theme}`}>
    <div className="visual-disc" /><div className="flow-window">
      <div className="flow-title"><span className="flow-app-icon">{isSea ? <Radio /> : <Monitor />}</span><span>{project.name}<small>{project.type[lang]}</small></span><span className="flow-dot" /></div>
      <div className="flow-grid">
        <div><Users /><span>{t.visuals.customer}</span></div><ArrowRight />
        <div className="flow-node-highlight"><FileCheck2 /><span>{t.visuals.operation}</span></div><ArrowRight />
        <div>{isVega ? <MessageCircle /> : <Check />}<span>{isVega ? t.visuals.notify : t.visuals.web}</span></div>
      </div>
      <div className="flow-data"><Database /><span>{isSea ? 'AIS / PostGIS' : isVega ? t.visuals.source : project.stack[0]}</span><span className="flow-data-line" /><span>{isSea ? t.visuals.sea : t.visuals.own}</span></div>
      <p className="flow-message"><Check />{isSea ? t.visuals.sea : t.visuals.complete}</p>
    </div><figcaption>{t.detail.illustration}</figcaption>
  </figure>
}
