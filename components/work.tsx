'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react'
import { useSite } from '@/components/providers'
import { Icon } from '@/components/icons'
import { Kinetic } from '@/components/kinetic'
import { displayHost, projectHref, projects, type Project } from '@/lib/projects'
import type { Copy, Lang } from '@/lib/content'

const featured = projects.filter((project) => project.rank <= 4)
const middle = projects.filter((project) => project.rank > 4 && project.rank <= 10)
const small = projects.filter((project) => project.rank > 10)

const brand = (project: Project) => ({ '--c': project.color, '--ci': project.ink }) as CSSProperties
const two = (rank: number) => String(rank).padStart(2, '0')

/** Real screenshot when we have one, otherwise the name set as a poster in the project's colour. */
function Media({ project, sizes, parallax }: { project: Project; sizes: string; parallax?: MotionValue<string> }) {
  return (
    <div className="media" style={brand(project)}>
      {project.image ? (
        <motion.div className="media-shot" style={parallax ? { y: parallax } : undefined}>
          <Image src={project.image} alt="" fill sizes={sizes} className="media-img" />
        </motion.div>
      ) : (
        <motion.div className="media-poster" style={parallax ? { y: parallax } : undefined} aria-hidden="true">
          <span data-text={project.name}>{project.name}</span>
        </motion.div>
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
      <FeatureStack t={t} lang={lang} />
      <Pan t={t} lang={lang} />
      <IndexList t={t} lang={lang} />
    </section>
  )
}

/* Ranks 1-4: full cards that pin and pile up like layers. */
function FeatureStack({ t, lang }: { t: Copy; lang: Lang }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  return (
    <div ref={ref} className="feature-stack">
      {featured.map((project, index) => (
        <FeatureCard key={project.slug} project={project} index={index} progress={scrollYProgress} t={t} lang={lang} />
      ))}
    </div>
  )
}

function FeatureCard({ project, index, progress, t, lang }: { project: Project; index: number; progress: MotionValue<number>; t: Copy; lang: Lang }) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const total = featured.length
  const scale = useTransform(progress, [index / total, 1], [1, 1 - (total - 1 - index) * 0.045])
  const shade = useTransform(() => index === total - 1 ? 0 : 0.5 * Math.min(1, Math.max(0, (progress.get() - index / total) * total)))
  const { scrollYProgress: own } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const parallax = useTransform(own, [0, 1], ['-8%', '8%'])
  return (
    <div ref={ref} className="feature-slot" style={{ '--i': index } as CSSProperties}>
      <motion.article className="feature" style={reduced ? undefined : { scale }}>
        <div className="feature-info">
          <span className="feature-rank" style={brand(project)}>{two(project.rank)}</span>
          <h3 className="feature-name">{project.name}</h3>
          <Meta project={project} t={t} lang={lang} />
          <p className="feature-pitch">{project.pitch[lang]}</p>
          <ul className="chips">{project.stack.slice(0, 5).map((item) => <li key={item}>{item}</li>)}</ul>
          <div className="feature-foot">
            <ProjectLink project={project} t={t} className="btn btn-solid" />
            {project.employer && <span className="feature-note">{t.work.employer}</span>}
          </div>
        </div>
        <Media project={project} sizes="(max-width: 900px) 92vw, 52vw" parallax={reduced ? undefined : parallax} />
        <motion.span className="feature-shade" style={{ opacity: shade }} aria-hidden="true" />
      </motion.article>
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

/* Ranks 11-19: a typographic index; on desktop a preview follows the pointer. */
function IndexList({ t, lang }: { t: Copy; lang: Lang }) {
  const [hover, setHover] = useState<Project | null>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const px = useSpring(x, { stiffness: 260, damping: 26 })
  const py = useSpring(y, { stiffness: 260, damping: 26 })
  return (
    <div className="index" onPointerMove={(event) => { x.set(event.clientX); y.set(event.clientY) }} onPointerLeave={() => setHover(null)}>
      <h3 className="index-title">{t.work.more}</h3>
      <ol className="index-list">
        {small.map((project, index) => (
          <motion.li key={project.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: (index % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}>
            <IndexRow project={project} t={t} lang={lang} onEnter={() => setHover(project)} />
          </motion.li>
        ))}
      </ol>
      <div className="preview-clip" aria-hidden="true">
        <motion.div className="index-preview" style={{ x: px, y: py }} data-show={hover ? true : undefined}>
          {hover && <Media project={hover} sizes="320px" />}
        </motion.div>
      </div>
    </div>
  )
}

function IndexRow({ project, t, lang, onEnter }: { project: Project; t: Copy; lang: Lang; onEnter: () => void }) {
  const inner = <>
    <span className="row-rank">{two(project.rank)}</span>
    <span className="row-name" style={brand(project)}>{project.name}</span>
    <span className="row-kind">{project.kind[lang]}</span>
    <span className="row-dest">{project.url ? displayHost(project.url) : t.work.view}<Icon name={project.url ? 'external' : 'back'} className={project.url ? undefined : 'flip'} /></span>
  </>
  return project.url
    ? <a className="row" href={project.url} target="_blank" rel="noreferrer" onPointerEnter={onEnter}>{inner}</a>
    : <Link className="row" href={projectHref(project)} onPointerEnter={onEnter}>{inner}</Link>
}
