'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useReducedMotion, useScroll, useSpring, useTransform, useVelocity, useMotionValue, useAnimationFrame } from 'motion/react'
import { useSite } from '@/components/providers'
import { Icon } from '@/components/icons'
import { Kinetic } from '@/components/kinetic'
import { Magnetic } from '@/components/magnetic'
import { cvFiles, education, experience, profile, skillGroups, stats } from '@/lib/content'

/* Counts up when it scrolls into view; the digits widen as they grow. */
function Counter({ value, suffix, lang }: { value: number; suffix: string; lang: 'tr' | 'en' }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduced = useReducedMotion()
  useEffect(() => {
    const element = ref.current
    if (!element || !inView) return
    const format = (n: number) => Math.round(n).toLocaleString(lang === 'tr' ? 'tr-TR' : 'en-US') + suffix
    if (reduced) { element.textContent = format(value); return }
    const controls = animate(0, value, {
      duration: 1.6, ease: [0.16, 1, 0.3, 1],
      onUpdate: (n) => {
        element.textContent = format(n)
        element.style.fontVariationSettings = `"wdth" ${(62 + (n / value) * 38).toFixed(1)}`
      },
    })
    return () => controls.stop()
  }, [inView, lang, reduced, suffix, value])
  return <span ref={ref} className="stat-value">0</span>
}

export function Stats() {
  const { t, lang } = useSite()
  return (
    <section className="stats" aria-label={t.statsTitle}>
      {stats.map((stat) => (
        <div key={stat.value} className="stat">
          <Counter value={stat.value} suffix={stat.suffix} lang={lang} />
          <p>{stat.label[lang]}</p>
        </div>
      ))}
    </section>
  )
}

/* One marquee on the page: the tools, moving faster and skewing with scroll speed. */
export function ToolBelt() {
  const reduced = useReducedMotion()
  const tools = skillGroups.flatMap((group) => group.items).slice(0, 18)
  const x = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const skew = useTransform(velocity, [-2500, 0, 2500], [8, 0, -8])
  const boost = useTransform(velocity, [-2500, 0, 2500], [-4, 1, 6], { clamp: false })
  const track = useRef<HTMLDivElement>(null)
  useAnimationFrame((_, delta) => {
    if (reduced || !track.current) return
    const half = track.current.scrollWidth / 2
    let next = x.get() - (delta / 1000) * 60 * Math.max(0.6, Math.abs(boost.get())) * Math.sign(boost.get() || 1)
    if (next <= -half) next += half
    if (next > 0) next -= half
    x.set(next)
  })
  return (
    <div className="belt" aria-label={tools.join(', ')} role="img">
      <motion.div ref={track} className="belt-track" style={{ x, skewX: reduced ? 0 : skew }} aria-hidden="true">
        {[...tools, ...tools].map((tool, index) => <span key={index}>{tool}</span>)}
      </motion.div>
    </div>
  )
}

export function About() {
  const { t, lang } = useSite()
  const line = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: line, offset: ['start 75%', 'end 60%'] })
  const draw = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })
  return (
    <section id="about" className="about">
      <div className="about-lead">
        <h2 className="section-title"><Kinetic text={t.about.title} base={92} max={118} /></h2>
        <ul className="about-facts">{t.about.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul>
      </div>
      <div className="about-body">
        <p className="about-p1">{t.about.p1}</p>
        <p>{t.about.p2}</p>
        <h3 className="about-h">{t.about.experience}</h3>
        <div ref={line} className="timeline">
          <motion.span className="timeline-line" style={{ scaleY: draw }} aria-hidden="true" />
          <ol>
            {experience.map((job) => (
              <motion.li key={job.company} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                <span className="timeline-dot" data-current={job.current || undefined} aria-hidden="true" />
                <div className="timeline-head"><strong>{job.company}</strong><span>{job.period[lang]}</span></div>
                <p className="timeline-role">{job.role[lang]}</p>
                <ul>{job.bullets.map((bullet) => <li key={bullet.en}>{bullet[lang]}</li>)}</ul>
              </motion.li>
            ))}
          </ol>
        </div>
        <h3 className="about-h">{t.about.education}</h3>
        <ul className="edu">
          {education.map((item) => <li key={item.period}><strong>{item.school[lang]}</strong><span>{item.degree[lang]}, {item.period}</span></li>)}
        </ul>
      </div>
    </section>
  )
}

export function Contact() {
  const { t } = useSite()
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { setCopied(false) }
  }
  const cvs = (['dev', 'it'] as const).map((role) => ({ role, label: role === 'dev' ? t.contact.cvDev : t.contact.cvIt, files: cvFiles.filter((file) => file.role === role) }))
  return (
    <section id="contact" className="contact">
      <h2 className="contact-title"><Kinetic text={t.contact.title} base={100} max={125} /></h2>
      <p className="contact-lead">{t.contact.lead}</p>
      <div className="contact-mail">
        <Magnetic strength={0.12}><a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}</a></Magnetic>
        <button type="button" className="btn btn-line" onClick={copy}><Icon name={copied ? 'copied' : 'copy'} />{copied ? t.contact.copied : t.contact.copy}</button>
        <span className="sr-only" aria-live="polite">{copied ? t.contact.copied : ''}</span>
      </div>
      <div className="contact-grid">
        <a className="contact-card" href={`https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(t.contact.whatsappText)}`} target="_blank" rel="noreferrer">
          <Icon name="message" /><span><strong>{t.contact.whatsapp}</strong>{profile.phone}</span>
        </a>
        <div className="contact-card contact-cv">
          <Icon name="file" />
          <span><strong>{t.contact.cv}</strong>
            {cvs.map((group) => (
              <span key={group.role} className="cv-row">{group.label}
                {group.files.map((file) => <a key={file.file} href={file.file} download>{file.lang.toUpperCase()}</a>)}
              </span>
            ))}
          </span>
        </div>
        <div className="contact-card">
          <Icon name="code" /><span><strong>{t.contact.links}</strong>
            <span className="cv-row"><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></span>
          </span>
        </div>
      </div>
    </section>
  )
}
