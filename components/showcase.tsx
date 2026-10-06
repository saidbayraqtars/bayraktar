'use client'

import type { CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { useSite } from '@/components/providers'
import { Header, Footer } from '@/components/chrome'
import { Icon } from '@/components/icons'
import { Kinetic } from '@/components/kinetic'
import { PageLink } from '@/components/transition'
import { WhatsAppDemo } from '@/components/demos'
import { profile } from '@/lib/content'
import { projectHref, showcaseProjects, type Project } from '@/lib/projects'

/** Case study page for a project without a public website. */
export function Showcase({ project }: { project: Project }) {
  const { lang, t } = useSite()
  const s = t.showcase
  const index = showcaseProjects.findIndex((item) => item.slug === project.slug)
  const next = showcaseProjects[(index + 1) % showcaseProjects.length]
  return (
    <>
      <Header />
      <main id="main" className="case" style={{ '--c': project.color, '--ci': project.ink } as CSSProperties}>
        <PageLink href="/isler" className="text-link case-back"><Icon name="back" />{s.back}</PageLink>
        <header className="case-head">
          <p className="meta"><span>{project.kind[lang]}</span><span className="meta-status" data-status={project.status}>{t.status[project.status]}</span></p>
          <h1 className="case-title"><Kinetic text={project.name} base={100} max={125} /></h1>
          <motion.p className="case-pitch" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}>{project.pitch[lang]}</motion.p>
        </header>
        <motion.div className="case-media" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}>
          {project.demo === 'whatsapp'
            ? <WhatsAppDemo lang={lang} />
            : project.image
            ? <div className="media-shot"><Image src={project.image} alt="" fill sizes="92vw" className="media-img" priority /></div>
            : <div className="media-poster" aria-hidden="true"><span data-text={project.name}>{project.name}</span></div>}
        </motion.div>
        <section className="case-body">
          <p className="case-summary">{project.summary[lang]}</p>
          <div className="case-cols">
            {project.highlights.length > 0 && (
              <div>
                <h2>{s.highlights}</h2>
                <ul className="case-list">{project.highlights.map((item) => <li key={item.en}>{item[lang]}</li>)}</ul>
              </div>
            )}
            <div>
              <h2>{s.stack}</h2>
              <ul className="chips">{project.stack.map((item) => <li key={item}>{item}</li>)}</ul>
              {project.employer && <p className="case-note">{s.employer}</p>}
              {project.repo && <a className="text-link case-repo" href={project.repo} target="_blank" rel="noreferrer">{s.repo}<Icon name="external" /></a>}
            </div>
          </div>
        </section>
        <section className="case-end">
          <a className="case-cta" href={`mailto:${profile.email}?subject=${encodeURIComponent(project.name)}`}>
            <span>{s.cta}</span><strong>{t.hero.contact}</strong>
          </a>
          <Link className="case-next" href={projectHref(next)}>
            <span>{s.next}</span><strong>{next.name}</strong>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  )
}
