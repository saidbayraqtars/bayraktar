'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import { useSite } from '@/components/providers'
import { Icon } from '@/components/icons'
import { Kinetic } from '@/components/kinetic'
import { Scene } from '@/components/scene'
import { displayHost, projectHref, projects, type Project } from '@/lib/projects'
import type { Copy, Lang } from '@/lib/content'

const featured = projects.filter((project) => project.rank <= 4)
const middle = projects.filter((project) => project.rank > 4 && project.rank <= 10)
const small = projects.filter((project) => project.rank > 10)

const brand = (project: Project) => ({ '--c': project.color, '--ci': project.ink }) as CSSProperties
const two = (rank: number) => String(rank).padStart(2, '0')

/** Real screenshot when we have one, otherwise the name set as a poster in the project's colour. */
function Media({ project, sizes }: { project: Project; sizes: string }) {
  return (
    <div className="media" style={brand(project)}>
      {project.image ? (
        <div className="media-shot">
          <Image src={project.image} alt="" fill sizes={sizes} className="media-img" />
        </div>
      ) : (
        <div className="media-poster" aria-hidden="true">
          <span data-text={project.name}>{project.name}</span>
        </div>
      )}
    </div>
  )
}

function ProjectLink({ project, t, className }: { project: Project; t: Copy; className?: string }) {
  const content = <>{project.url ? t.work.open : t.work.view}<Icon name={project.url ? 'external' : 'back'} className={project.url ? undefined : 'flip'} /></>
  return project.url
    ? <a href={project.url} target="_blank" rel="noreferrer" className={className}>{content}</a>
    : <Link href={projectHref(project)} className={className}>{content}</Link>
}

function Meta({ project, t, lang }: { project: Project; t: Copy; lang: Lang }) {
  return (
    <p className="meta">
      <span>{project.kind[lang]}</span>
      <span className="meta-status" data-status={project.status}>{t.status[project.status]}</span>
    </p>
  )
}

export function Work() {
  const { t, lang } = useSite()
  return (
    <section id="work" className="work">
      <header className="work-head">
        <h2 className="section-title"><Kinetic text={t.work.title} base={92} max={120} /></h2>
        <p className="work-lead">{t.work.lead}</p>
      </header>
      <FeatureScenes t={t} lang={lang} />
      <Pan t={t} lang={lang} />
      <IndexList t={t} lang={lang} />
    </section>
  )
}

/* Ranks 1-4: one pinned scroll scene each. */
function FeatureScenes({ t, lang }: { t: Copy; lang: Lang }) {
  return (
    <div className="scenes">
      {featured.map((project) => (
        <Scene key={project.slug} project={project} t={t} lang={lang} link={<ProjectLink project={project} t={t} className="btn btn-solid" />} />
      ))}
    </div>
  )
}

/* Ranks 5-10: a horizontal strip driven by vertical scroll. */
function Pan({ t, lang }: { t: Copy; lang: Lang }) {
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const reach = useMotionValue(0)
  const x = useTransform(() => -scrollYProgress.get() * reach.get())
  const smooth = useSpring(x, { stiffness: 120, damping: 24, mass: 0.3 })
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1])

  useEffect(() => {
    const element = track.current
    if (!element) return
    const measure = () => { const value = Math.max(0, element.scrollWidth - window.innerWidth); reach.set(value); setDistance(value) }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    window.addEventListener('resize', measure)
    return () => { observer.disconnect(); window.removeEventListener('resize', measure) }
  }, [reach])

  return (
    <section ref={section} className="pan" style={{ height: `calc(100dvh + ${distance}px)` }} aria-label={t.work.title}>
      <div className="pan-stage">
        <motion.div ref={track} className="pan-track" style={{ x: smooth }}>
          {middle.map((project) => (
            <article key={project.slug} className="pan-card">
              <Media project={project} sizes="(max-width: 768px) 80vw, 34vw" />
              <div className="pan-info">
                <span className="pan-rank">{two(project.rank)}</span>
                <h3 className="pan-name">{project.name}</h3>
                <Meta project={project} t={t} lang={lang} />
                <p className="pan-pitch">{project.pitch[lang]}</p>
                <ProjectLink project={project} t={t} className="text-link" />
              </div>
            </article>
          ))}
        </motion.div>
        <div className="pan-progress" aria-hidden="true"><motion.i style={{ scaleX: bar }} /></div>
      </div>
    </section>
  )
}

/* Ranks 11-19: a typographic index. */
function IndexList({ t, lang }: { t: Copy; lang: Lang }) {
  return (
    <div className="index">
      <h3 className="index-title">{t.work.more}</h3>
      <ol className="index-list">
        {small.map((project, index) => (
          <motion.li key={project.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: (index % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}>
            <IndexRow project={project} t={t} lang={lang} />
          </motion.li>
        ))}
      </ol>
    </div>
  )
}

function IndexRow({ project, t, lang }: { project: Project; t: Copy; lang: Lang }) {
  const inner = <>
    <span className="row-rank">{two(project.rank)}</span>
    <span className="row-name" style={brand(project)}>{project.name}</span>
    <span className="row-kind">{project.kind[lang]}</span>
    <span className="row-dest">{project.url ? displayHost(project.url) : t.work.view}<Icon name={project.url ? 'external' : 'back'} className={project.url ? undefined : 'flip'} /></span>
  </>
  return project.url
    ? <a className="row" href={project.url} target="_blank" rel="noreferrer">{inner}</a>
    : <Link className="row" href={projectHref(project)}>{inner}</Link>
}
