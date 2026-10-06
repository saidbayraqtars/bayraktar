'use client'

import { useRef, useState, type CSSProperties } from 'react'
import Image from 'next/image'
import { animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { Icon } from '@/components/icons'
import { ProjectDemo } from '@/components/demos'
import { displayHost, type Project } from '@/lib/projects'
import type { Copy, Lang } from '@/lib/content'

/*
  One pinned scroll scene per featured project. Scroll drives a fixed script:
  the window swings in, facts float out, a pointer clicks and the screen switches,
  while the steps on the left fill in turn.
*/
const enterEnd = 0.2
const pointerIn: [number, number] = [0.34, 0.48]
const clickAt = 0.5
const revealEnd = 0.64
const factAt = [0.22, 0.4, 0.58]

const clamp = (value: number) => Math.min(1, Math.max(0, value))
const ease = (value: number) => 1 - Math.pow(1 - value, 3)

type SceneProps = {
  project: Project
  t: Copy
  lang: Lang
  /** The project link, rendered by the caller so the scene keeps one link style. */
  link: React.ReactNode
}

export function Scene({ project, t, lang, link }: SceneProps) {
  const reduced = useReducedMotion() ?? false
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const steps = project.highlights
  const [step, setStep] = useState(0)

  useMotionValueEvent(p, 'change', (value) => {
    const next = Math.min(steps.length - 1, Math.max(0, Math.floor(((value - enterEnd) / (1 - enterEnd)) * steps.length)))
    setStep((current) => (current === next ? current : next))
  })

  // Function forms throughout: Motion would hand range-mapped values to a ViewTimeline, which misreads sticky stages.
  const enter = useTransform(() => ease(clamp(p.get() / enterEnd)))
  const rotateX = useTransform(() => 34 * (1 - enter.get()))
  const rotateY = useTransform(() => -16 * (1 - enter.get()))
  const winY = useTransform(() => `${22 * (1 - enter.get())}%`)
  const winScale = useTransform(() => 0.78 + 0.22 * enter.get())
  const winOpacity = useTransform(() => clamp(enter.get() * 2.2))

  const [tx, ty] = project.target ?? [50, 40]
  const second = project.shots?.[0]

  return (
    <section ref={ref} className="scene" style={{ '--c': project.color, '--ci': project.ink } as CSSProperties} aria-label={project.name}>
      <div className="scene-stage">
        <div className="scene-info">
          <span className="scene-rank" aria-hidden="true">{String(project.rank).padStart(2, '0')}</span>
          <h3 className="scene-name">{project.name}</h3>
          <p className="meta">
            <span>{project.kind[lang]}</span>
            <span className="meta-status" data-status={project.status}>{t.status[project.status]}</span>
          </p>
          <p className="scene-pitch">{project.pitch[lang]}</p>
          {steps.length > 0 && (
            <ol className="scene-steps">
              {steps.map((item, index) => (
                <Step key={item.en} index={index} count={steps.length} progress={p} on={reduced || index === step} reduced={reduced} text={item[lang]} />
              ))}
            </ol>
          )}
          <div className="scene-foot">
            {link}
            {project.employer && <span className="feature-note">{t.work.employer}</span>}
          </div>
        </div>

        <div className="scene-view" data-demo={project.demo}>
          <span className="scene-glow" aria-hidden="true" />
          {project.demo ? (
            <motion.div className="stage-demo" style={reduced ? undefined : { rotateX, rotateY, y: winY, scale: winScale, opacity: winOpacity }}>
              <ProjectDemo kind={project.demo} progress={p} lang={lang} reduced={reduced} />
            </motion.div>
          ) : (
          <motion.div className="win" aria-hidden="true"
              style={reduced ? undefined : { rotateX, rotateY, y: winY, scale: winScale, opacity: winOpacity }}>
              <div className="win-bar">
                <i /><i /><i />
                <span>{project.url ? displayHost(project.url) : project.name}</span>
              </div>
              <div className="win-screen">
                {project.image ? (
                  <>
                    <Zoom progress={p} reduced={reduced || Boolean(second)} origin={`${tx}% ${ty}%`}>
                      <Image src={project.image} alt="" fill sizes="(max-width: 900px) 92vw, 56vw" className="win-img" />
                    </Zoom>
                    {second && !reduced && <Reveal progress={p} src={second} at={`${tx}% ${ty}%`} />}
                  </>
                ) : (
                  <div className="media-poster"><span data-text={project.name}>{project.name}</span></div>
                )}
                {!reduced && project.image && <Pointer progress={p} x={tx} y={ty} />}
              </div>
            </motion.div>
          )}
          {project.stats?.map((fact, index) => (
            <Fact key={fact.en} index={index} progress={p} reduced={reduced} text={fact[lang]} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Step({ index, count, progress, on, reduced, text }: { index: number; count: number; progress: MotionValue<number>; on: boolean; reduced: boolean; text: string }) {
  const fill = useTransform(() => reduced ? 1 : clamp(((progress.get() - enterEnd) / (1 - enterEnd)) * count - index))
  return (
    <li className="scene-step" data-on={on || undefined}>
      <span className="scene-step-num">{String(index + 1).padStart(2, '0')}</span>
      <span className="scene-step-text">{text}</span>
      <span className="scene-step-bar" aria-hidden="true"><motion.i style={{ scaleX: fill }} /></span>
    </li>
  )
}

/** With a single screenshot the click zooms into the target instead of switching screens. */
function Zoom({ progress, reduced, origin, children }: { progress: MotionValue<number>; reduced: boolean; origin: string; children: React.ReactNode }) {
  const scale = useTransform(() => 1 + 0.32 * ease(clamp((progress.get() - clickAt) / (revealEnd - clickAt))))
  return <motion.div className="win-layer" style={reduced ? undefined : { scale, transformOrigin: origin }}>{children}</motion.div>
}

function Reveal({ progress, src, at }: { progress: MotionValue<number>; src: string; at: string }) {
  const clipPath = useTransform(() => `circle(${ease(clamp((progress.get() - clickAt) / (revealEnd - clickAt))) * 150}% at ${at})`)
  return (
    <motion.div className="win-layer" style={{ clipPath }}>
      <Image src={src} alt="" fill sizes="(max-width: 900px) 92vw, 56vw" className="win-img" />
    </motion.div>
  )
}

/** A pointer that glides to the target, clicks once with a ripple, then fades. */
function Pointer({ progress, x, y }: { progress: MotionValue<number>; x: number; y: number }) {
  const travel = useTransform(() => ease(clamp((progress.get() - pointerIn[0]) / (pointerIn[1] - pointerIn[0]))))
  const left = useTransform(() => `${108 + (x - 108) * travel.get()}%`)
  const top = useTransform(() => `${104 + (y - 104) * travel.get()}%`)
  const opacity = useTransform(() => {
    const value = progress.get()
    return value < pointerIn[0] ? 0 : value < revealEnd + 0.06 ? 1 : clamp(1 - (value - revealEnd - 0.06) / 0.06)
  })
  const press = useMotionValue(1)
  const ring = useMotionValue(0)
  const clicked = useRef(false)

  useMotionValueEvent(progress, 'change', (value) => {
    if (value >= clickAt && !clicked.current) {
      clicked.current = true
      animate(press, [1, 0.78, 1], { duration: 0.32 })
      ring.set(0)
      animate(ring, 1, { duration: 0.6, ease: 'easeOut' })
    } else if (value < clickAt - 0.02 && clicked.current) {
      clicked.current = false
    }
  })

  const ringScale = useTransform(() => 0.2 + ring.get() * 2.4)
  const ringOpacity = useTransform(() => ring.get() > 0 && ring.get() < 1 ? 1 - ring.get() : 0)

  return (
    <motion.div className="pointer" style={{ left, top, opacity }}>
      <motion.span className="pointer-ring" style={{ scale: ringScale, opacity: ringOpacity }} />
      <motion.span className="pointer-arrow" style={{ scale: press }}><Icon name="cursor" /></motion.span>
    </motion.div>
  )
}

function Fact({ index, progress, reduced, text }: { index: number; progress: MotionValue<number>; reduced: boolean; text: string }) {
  const start = factAt[index] ?? 0.6
  const opacity = useTransform(() => reduced ? 1 : clamp((progress.get() - start) / 0.06))
  // Each fact floats at its own depth, so they drift apart as the scene scrolls.
  const y = useTransform(() => reduced ? 0 : (0.5 - progress.get()) * (60 + index * 50) + 24 * (1 - clamp((progress.get() - start) / 0.08)))
  const scale = useTransform(() => reduced ? 1 : 0.8 + 0.2 * ease(clamp((progress.get() - start) / 0.08)))
  return <motion.span className={`fact fact-${index}`} style={{ opacity, y, scale }}>{text}</motion.span>
}
