'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ArrowDown, ArrowDownRight, ArrowUpRight, MapPin, Pause, Play } from 'lucide-react'
import { useSite } from '@/components/providers'
import { Button } from '@/components/ui/button'
import { HandwritingText } from '@/components/ui/handwriting-text'
import { portfolio } from '@/lib/content'

export function PortfolioHero() {
  const { lang } = useSite()
  const t = portfolio[lang].hero
  const [paused, setPaused] = useState(false)
  return <section className="hero-section">
    <div className="shell">
      <div className="hero-kicker"><span className="availability"><i />{t.available}</span><span className="hero-location"><MapPin />{t.location}</span></div>
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">{t.role}</p><p className="hero-greeting">{t.greeting}</p>
          <h1 aria-label={[t.line1, t.handwriting, t.line3].filter(Boolean).join(' ')}><span>{t.line1}</span><span className="hero-script"><HandwritingText key={lang} words={t.words} interval={4200} duration={1.7} height="1.22em" paused={paused} /></span>{t.line3 && <span>{t.line3}</span>}</h1>
          <p className="hero-lead">{t.lead}</p>
          <div className="hero-ctas"><Button asChild size="lg"><a href="#contact">{t.cta}<ArrowUpRight data-icon="inline-end" /></a></Button><a href="#projects" className="text-link">{t.secondary}<ArrowDownRight /></a></div>
          <div className="hero-meta"><p className="remote-note"><span />{t.remote}</p><button type="button" className="animation-toggle" onClick={() => setPaused((value) => !value)} aria-label={paused ? t.resumeAnimation : t.pauseAnimation} aria-pressed={paused} title={paused ? t.resumeAnimation : t.pauseAnimation}>{paused ? <Play /> : <Pause />}</button></div>
        </div>
        <div className="hero-art" aria-label={t.imageLabel}>
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="hero-annotation">{t.annotation}<svg viewBox="0 0 90 56" fill="none" aria-hidden="true"><path d="M5 8c13 39 61 6 60 32m-13-9 13 12 11-13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></div>
          <div className="browser-shot hero-browser"><div className="browser-chrome"><span className="window-dots"><i /><i /><i /></span><span>B2B · {t.disciplines[1]}</span><ArrowUpRight /></div><Image src="/projects/b2b-dashboard.png" alt={t.imageAlt} width={1440} height={960} sizes="(max-width: 700px) 90vw, 48vw" priority /></div>
          <div className="hero-phone"><div className="phone-speaker" /><Image src="/projects/neva-menu.png" alt={t.miniLabel} width={1280} height={1000} sizes="220px" priority /><span className="phone-label">Neva QR <ArrowUpRight /></span></div>
          <div className="hero-stamp"><span aria-hidden="true">✳</span><p>Web.<br />Mobile.<br />Desktop.</p></div>
          <span className="art-caption">{t.imageLabel}<span className="art-caption-line" /></span>
        </div>
      </div>
      <div className="hero-bottom"><a href="#projects"><span className="scroll-circle"><ArrowDown /></span>{t.scroll}</a><div className="hero-disciplines">{t.disciplines.map((item) => <span key={item}>{item}</span>)}</div></div>
    </div>
    <div className="tech-band"><div className="shell tech-band-inner"><p>{t.stack}</p><div><span>Next.js</span><span>React</span><span>Laravel</span><span>Node.js</span><span>Electron</span><span>PostgreSQL</span></div></div></div>
  </section>
}
