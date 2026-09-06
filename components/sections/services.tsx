'use client'

import { ArrowUpRight, Blocks, Code2, Workflow } from 'lucide-react'
import { useSite } from '@/components/providers'
import { Badge } from '@/components/ui/badge'
import { portfolio } from '@/lib/content'

export function Services() {
  const { lang } = useSite()
  const t = portfolio[lang].services
  const icons = [Code2, Blocks, Workflow]
  return <section className="services-section section-pad" id="services"><div className="shell">
    <div className="section-intro"><div><p className="eyebrow">{t.eyebrow}</p><h2>{t.title}</h2></div><p>{t.lead}</p></div>
    <div className="services-grid">{t.items.map((service, i) => { const Icon = icons[i]; return <a key={service.title} className="service-item" href="#contact"><div className="service-icon"><Icon /><ArrowUpRight /></div><h3>{service.title}</h3><p>{service.description}</p><div className="tag-list">{service.tags.map((tag) => <Badge key={tag} variant="secondary">{tag}</Badge>)}</div></a> })}</div>
    <div className="process-heading"><span className="process-spark" aria-hidden="true">✳</span><h3>{t.processTitle}</h3></div>
    <ol className="process-grid">{t.steps.map((step, i) => <li key={step.title}><span className="step-number">0{i + 1}</span><h4>{step.title}</h4><p>{step.description}</p></li>)}</ol>
  </div></section>
}
