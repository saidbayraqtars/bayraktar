'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useSite } from '@/components/providers'
import { Kinetic } from '@/components/kinetic'
import { LayerStack } from '@/components/layer-stack'
import { Magnetic } from '@/components/magnetic'
import { PageLink } from '@/components/transition'
import { layers } from '@/lib/content'

const heroEnd = 0.14

/**
 * Hero and the layer story share one pinned stage: the headline gives way as you scroll,
 * the pile of layers pulls apart and each layer is explained in turn.
 */
export function Opening({ ready }: { ready: boolean }) {
  const { t, lang } = useSite()
  const reduced = useReducedMotion()
  const wrap = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] })
  const [active, setActive] = useState(-1)

  // Function form on purpose: Motion would hand a range-mapped opacity to a ViewTimeline, which misreads this sticky stage.
  const copyOpacity = useTransform(() => Math.max(0, 1 - scrollYProgress.get() / (heroEnd * 0.8)))
  const copyY = useTransform(scrollYProgress, [0, heroEnd], [0, -90])
  // Narrow screens get a tighter pile so the exploded layers stay below the text.
  const factor = useMotionValue(1)
  useEffect(() => { if (window.matchMedia('(max-width: 900px)').matches) factor.set(0.55) }, [factor])
  const spread = useTransform(() => {
    const progress = scrollYProgress.get()
    const gap = progress < heroEnd ? 26 + 38 * (progress / heroEnd) : 64 + 10 * ((progress - heroEnd) / (1 - heroEnd))
    return gap * factor.get()
  })
  const stackScale = useTransform(scrollYProgress, [0, heroEnd], [1, 1.06])
  const rail = useTransform(scrollYProgress, [heroEnd, 0.98], [0, 1])

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const next = value < heroEnd ? -1 : Math.min(layers.length - 1, Math.floor(((value - heroEnd) / (0.98 - heroEnd)) * layers.length))
    setActive((current) => (current === next ? current : next))
  })

  const layer = active >= 0 ? layers[active] : null

  return (
    <section ref={wrap} className="opening" aria-label={t.layersTitle}>
      <div className="opening-stage">
        <motion.div className="hero-copy" style={reduced ? undefined : { opacity: copyOpacity, y: copyY }} data-hidden={active >= 0 || undefined}>
          <h1 className="hero-title">
            <motion.span className="hero-kicker" initial={{ opacity: 0, y: 12 }} animate={ready ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.7, delay: 0.1 }}>{t.hero.kicker}</motion.span>
            <Kinetic text={t.hero.line1} ready={ready} base={104} />
            <Kinetic text={t.hero.line2} ready={ready} delay={0.18} base={104} />
          </h1>
          <motion.p className="hero-lead" initial={{ opacity: 0, y: 16 }} animate={ready ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.8, delay: 0.7 }}>
            {t.hero.lead}
          </motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 16 }} animate={ready ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.8, delay: 0.85 }}>
            <Magnetic><PageLink href="/isler" className="btn btn-solid">{t.hero.work}</PageLink></Magnetic>
            <Magnetic><PageLink href="/iletisim" className="btn btn-line">{t.hero.contact}</PageLink></Magnetic>
          </motion.div>
        </motion.div>

        <motion.div className="hero-visual" style={reduced ? undefined : { scale: stackScale }}
          initial={{ opacity: 0, y: 60 }} animate={ready ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 1.2, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}>
          <LayerStack spread={spread} active={active} lang={lang} />
        </motion.div>

        <div className="layer-copy" aria-live="polite">
          <AnimatePresence mode="wait">
            {layer && (
              <motion.div key={layer.id + lang} className="layer-text"
                initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
                <p className="layer-kicker">{t.layersTitle}</p>
                <h2 className="layer-name"><Kinetic text={layer.name[lang]} base={96} max={122} /></h2>
                <p className="layer-line">{layer.line[lang]}</p>
                <p className="layer-body">{layer.body[lang]}</p>
                <ul className="layer-tools">{layer.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="layer-rail" data-show={active >= 0 || undefined} aria-hidden="true">
          {layers.map((item, index) => (
            <span key={item.id} data-on={index === active || undefined}>{item.name[lang]}</span>
          ))}
          <motion.i style={{ scaleX: rail }} />
        </div>
      </div>
    </section>
  )
}
