'use client'

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type RefObject } from 'react'
import Image from 'next/image'
import type { MotionValue } from 'motion/react'
import type { Lang } from '@/lib/content'
import { qrRows } from '@/lib/qr-data'
import { clamp, ease, span, useProgress } from '@/components/demo-kit'

/*
  Neva QR, ported from the product scene on neva.technology: the table's QR builds
  itself module by module, a laser scans it, the phone rises and three real menu
  templates open one after another with their own intro animations (Noir Lounge,
  Cadı Kulübesi, Liman). The intros are plain CSS animations kept paused; scroll
  progress sets their currentTime, so a fast scroller still sees every frame.
*/

// Module pop-in order is random but fixed, so server and client agree.
const qrCells = (() => {
  const cells: { x: number; y: number; d: number }[] = []
  let seed = 7
  const random = () => (seed = (seed * 16807) % 2147483647) / 2147483647
  qrRows.forEach((row, y) => { for (let x = 0; x < row.length; x++) if (row[x] === '1') cells.push({ x, y, d: random() * 0.75 }) })
  return cells
})()

/** Seconds of each template intro, from the `--k` scale in demo-neva.css. */
const introLength = [2.5, 3.0, 2.5]
const noirCountEnd = 1.9

/** Scene timeline in scroll progress: the window swings in until 0.2, steps start at 0.2, 0.467 and 0.733. */
const at = {
  qr: [0.08, 0.22] as const,
  laser: [0.22, 0.29] as const,
  phone: [0.25, 0.33] as const,
  intro: [[0.31, 0.43], [0.49, 0.6], [0.62, 0.71]] as const,
  body: [[0.43, 0.47], [0.6, 0.64]] as const,
  curtain: [[0.465, 0.495], [0.6, 0.635]] as const,
  panel: [0.46, 0.53] as const,
  toast: 0.74,
  price: 0.8,
}

/** Holds every CSS animation under `ref` at `seconds`. */
function useScrub(ref: RefObject<HTMLElement | SVGSVGElement | null>, seconds: number) {
  useLayoutEffect(() => {
    const element = ref.current
    if (!element || typeof element.getAnimations !== 'function') return
    const ms = seconds * 1000
    for (const animation of element.getAnimations({ subtree: true })) {
      try { animation.currentTime = ms } catch { /* finished or cancelled */ }
    }
  })
}

let fontsRequested = false
const latin = 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD'
const latinExt = 'U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+1E00-1E9F,U+20A0-20AB,U+20AD-20C0,U+2C60-2C7F,U+A720-A7FF'
/** The three template display faces (~50 KB) load only when this story mounts. */
function loadTemplateFonts() {
  if (fontsRequested || typeof FontFace === 'undefined') return
  fontsRequested = true
  for (const [family, file] of [['Cormorant Garamond', 'cormorant'], ['Fredoka', 'fredoka'], ['Fraunces', 'fraunces']]) {
    for (const [suffix, range] of [['', latin], ['-ext', latinExt]]) {
      new FontFace(family, `url(/fonts/${file}-600${suffix}.woff2) format('woff2')`, { weight: '600', display: 'swap', unicodeRange: range })
        .load().then((face) => document.fonts.add(face)).catch(() => {})
    }
  }
}

export function NevaDemo({ progress, lang, reduced }: { progress: MotionValue<number>; lang: Lang; reduced: boolean }) {
  const p = useProgress(progress, reduced, 1)
  const tr = lang === 'tr'
  const qrRef = useRef<SVGSVGElement>(null)
  const noirRef = useRef<HTMLDivElement>(null)
  const witchRef = useRef<HTMLDivElement>(null)
  const coastalRef = useRef<HTMLDivElement>(null)
  const noirBody = useRef<HTMLDivElement>(null)
  const witchBody = useRef<HTMLDivElement>(null)
  const screenRef = useRef<HTMLDivElement>(null)
  const [overflow, setOverflow] = useState([0, 0])

  useEffect(loadTemplateFonts, [])

  // How far each menu body runs past the screen; changes with fonts and size.
  useEffect(() => {
    const screen = screenRef.current
    if (!screen) return
    const bodies = [noirBody.current, witchBody.current]
    const measure = () => setOverflow(bodies.map((body) => Math.max(0, (body?.offsetHeight ?? 0) - screen.offsetHeight + 12)))
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(screen)
    bodies.forEach((body) => body && observer.observe(body))
    return () => observer.disconnect()
  }, [])

  const qrTime = span(p, ...at.qr)
  const laser = span(p, ...at.laser)
  const flash = p > at.laser[1] && p < at.laser[1] + 0.03
  const phoneIn = ease(span(p, ...at.phone))
  // The template gallery joins with step two (42 designs); the price toast belongs to step three.
  const intro = at.intro.map(([from, to], index) => span(p, from, to) * introLength[index])
  const body = at.body.map(([from, to]) => Math.sin(span(p, from, to) * Math.PI / 2))
  const curtain = at.curtain.map(([from, to]) => ease(span(p, from, to)))
  const template = curtain[1] > 0.5 ? 2 : curtain[0] > 0.5 ? 1 : 0
  const panel = ease(span(p, ...at.panel))
  const repriced = p >= at.price
  const noirCount = String(Math.round(clamp(intro[0] / noirCountEnd) * 100)).padStart(3, '0')

  useScrub(qrRef, qrTime)
  useScrub(noirRef, intro[0])
  useScrub(witchRef, intro[1])
  useScrub(coastalRef, intro[2])

  const names = [tr ? 'Noir Lounge · işletmeye özel' : 'Noir Lounge · made for one venue', 'Cadı Kulübesi', 'Liman · Coastal Breeze']

  return (
    <div className="demo demo-neva" aria-hidden="true"><div className="demo-in">
      <span className="nv-glow" />

      <div className="nv-panel" style={{ opacity: panel, transform: `perspective(1600px) translateY(${(1 - panel) * 8}%) scale(${0.9 + 0.1 * panel}) rotateY(${-10 * (1 - panel)}deg)`, filter: `blur(${(1 - panel) * 10}px)` }}>
        <div className="nv-panel-bar"><i /><i /><i /><span>nevaqr.com · {tr ? 'Tasarım & Şablon' : 'Design & Templates'}</span></div>
        <div className="nv-panel-shot"><Image src="/work/neva-studio.webp" alt="" fill sizes="(max-width: 900px) 60vw, 34vw" /></div>
        <div className="nv-toast" data-show={p >= at.toast || undefined} data-on={repriced || undefined}>
          <small>{tr ? 'Ürünler · Deniz Börülcesi' : 'Products · Sea Beans'}</small>
          <span><s>₺180</s><b>₺195</b></span>
          <em>{repriced ? (tr ? 'Yayında ✓' : 'Live ✓') : (tr ? 'Kaydediliyor…' : 'Saving…')}</em>
        </div>
      </div>

      <div className="nv-card" data-flash={flash || undefined}>
        <svg ref={qrRef} className="nv-qr nv-scrub" viewBox="-2 -2 29 29" shapeRendering="crispEdges">
          {qrCells.map(({ x, y, d }) => <rect key={`${x}-${y}`} x={x} y={y} width={1.02} height={1.02} style={{ '--d': `${d.toFixed(3)}s` } as CSSProperties} />)}
        </svg>
        <span className="nv-laser" style={{ top: `${4 + laser * 74}%`, opacity: laser > 0 && laser < 1 ? 1 : 0 }} />
        <div className="nv-card-foot">
          <b>{tr ? 'Masa 4' : 'Table 4'}</b>
          <span>{repriced ? (tr ? 'QR aynı kaldı ✓' : 'Same QR ✓') : (tr ? 'Okut · menü açılsın' : 'Scan · menu opens')}</span>
        </div>
      </div>

      <div className="nv-label" style={{ opacity: phoneIn }}>
        <span className="nv-label-count">{String(template + 1).padStart(2, '0')} / 42</span>
        <span className="nv-label-roll"><span style={{ transform: `translateY(${-100 * template / 3}%)` }}>{names.map((name) => <i key={name}>{name}</i>)}</span></span>
      </div>

      <div className="nv-phone" style={{ opacity: phoneIn, transform: `translateY(${(1 - phoneIn) * 26}%)` }}>
        <div className="nv-notch" />
        <div ref={screenRef} className="nv-screen">
          <NoirTemplate scrubRef={noirRef} bodyRef={noirBody} bodyY={-overflow[0] * body[0]} count={noirCount} />
          <WitchTemplate scrubRef={witchRef} bodyRef={witchBody} bodyY={-overflow[1] * body[1]} clip={curtain[0]} />
          <CoastalTemplate scrubRef={coastalRef} clip={curtain[1]} repriced={repriced} />
        </div>
      </div>
    </div></div>
  )
}

type TemplateProps = { scrubRef: RefObject<HTMLDivElement | null> }
const clipFrom = (value: number): CSSProperties => ({ clipPath: `inset(0 0 0 ${(1 - value) * 100}%)` })

function NoirTemplate({ scrubRef, bodyRef, bodyY, count }: TemplateProps & { bodyRef: RefObject<HTMLDivElement | null>; bodyY: number; count: string }) {
  const guide = (d: string, delay: number) => <path className="tmn-g" pathLength={1} vectorEffect="non-scaling-stroke" d={d} style={{ '--d': `${delay}s` } as CSSProperties} />
  const key = (d: string, delay: number) => <path className="tmn-g tmn-key" pathLength={1} vectorEffect="non-scaling-stroke" d={d} style={{ '--d': `${delay}s` } as CSSProperties} />
  return (
    <div ref={scrubRef} className="tm tm--noir is-run nv-scrub">
      <div className="tm-intro tmn-intro">
        <p className="tmn-hud tmn-hud--tl">NOCTURNE LOUNGE</p>
        <p className="tmn-hud tmn-hud--tr">MENU — 2026</p>
        <p className="tmn-hud tmn-hud--bl">LOADING <b>{count}</b></p>
        <p className="tmn-hud tmn-hud--br">9 KATEGORİ</p>
        <div className="tmn-stage">
          <span className="tmn-halo" />
          <svg className="tmn-blue" viewBox="0 0 400 208" overflow="visible">
            <g className="tmn-guides">
              {guide('M-900 -46H1300', 0.15)}{guide('M1300 104H-900', 0.3)}{guide('M-900 254H1300', 0.42)}
              {guide('M0 -900V1100', 0.3)}{guide('M400 1100V-900', 0.42)}
              {guide('M-620 -420L1020 640', 0.5)}{guide('M1020 -420L-620 640', 0.62)}
              <circle className="tmn-dot" cx="200" cy="104" r="104" vectorEffect="non-scaling-stroke" style={{ '--d': '.55s' } as CSSProperties} />
              <circle className="tmn-dot" cx="200" cy="104" r="168" vectorEffect="non-scaling-stroke" style={{ '--d': '.75s' } as CSSProperties} />
            </g>
            {key('M0 30V0H30', 1.1)}{key('M370 0H400V30', 1.2)}{key('M400 178V208H370', 1.3)}{key('M30 208H0V178', 1.4)}
          </svg>
          <div className="tmn-wordmark">
            <span className="tmn-mark">NOCTURNE</span>
            <span className="tmn-rule"><i />LOUNGE · DINING<i /></span>
          </div>
          <span className="tmn-scan" />
        </div>
      </div>
      <div ref={bodyRef} className="tm-body" style={{ transform: `translateY(${bodyY}px)` }}>
        <div className="tmn-hero">
          <span className="tmn-corner tmn-corner--tl" /><span className="tmn-corner tmn-corner--tr" />
          <span className="tmn-corner tmn-corner--bl" /><span className="tmn-corner tmn-corner--br" />
          <span className="tmn-mark">NOCTURNE</span>
          <span className="tmn-rule"><i />LOUNGE · DINING<i /></span>
        </div>
        <p className="tmn-tagline">Gece boyu süren lezzet ve ışık</p>
        <span className="tmn-orn"><i /><b /><i /></span>
        <div className="tmn-rows">
          {['Kahvaltı:6', 'Salatalar:5', 'Mezeler:7', 'Ana Yemekler:6', 'Deniz Ürünleri:5', 'Şarap Eşliği:4', 'Tatlılar:5', 'Kokteyller:6'].map((row, index) => {
            const [name, count] = row.split(':')
            return <div key={name} className="tmn-row"><em>{String(index + 1).padStart(2, '0')}</em><span>{name}</span><b>{count} çeşit</b></div>
          })}
        </div>
        <div className="tmn-dish"><span>Kuzu Tandır</span><b>₺520</b></div>
        <div className="tmn-dish"><span>Izgara Levrek</span><b>₺480</b></div>
        <div className="tmn-dish"><span>Burrata</span><b>₺240</b></div>
      </div>
    </div>
  )
}

function Pumpkin() {
  return <>
    <ellipse cx="50" cy="55" rx="43" ry="33" fill="#FF8A2B" />
    <ellipse cx="29" cy="55" rx="25" ry="32" fill="#FF9B45" />
    <ellipse cx="71" cy="55" rx="25" ry="32" fill="#FF9B45" />
    <ellipse cx="50" cy="55" rx="16" ry="33" fill="#FFAE66" />
    <path d="M46 24c0-9 3-15 9-17-1 6 1 11 5 17z" fill="#4CB050" />
    <path d="M57 13c8-6 15-3 17 4" fill="none" stroke="#4CB050" strokeWidth="3" strokeLinecap="round" />
    <path d="M30 51l8-9 8 9z M54 51l8-9 8 9z" fill="#FFE58F" stroke="#7A2E00" strokeWidth="3" strokeLinejoin="round" />
    <path d="M33 63q17 17 34 0-4 4-9 3l-4 5-4-5-4 5-4-5q-5 1-9-3z" fill="#FFE58F" stroke="#7A2E00" strokeWidth="3" strokeLinejoin="round" />
    <circle cx="23" cy="63" r="5.5" fill="#FF7AB6" opacity=".55" />
    <circle cx="77" cy="63" r="5.5" fill="#FF7AB6" opacity=".55" />
  </>
}
function Bat() {
  return <>
    <path d="M46 30C38 10 20 6 2 14c6 6 6 14 4 22 8-4 14-2 18 6 4-6 12-8 22-6z" fill="#6B4BC0" />
    <path d="M54 30c8-20 26-24 44-16-6 6-6 14-4 22-8-4-14-2-18 6-4-6-12-8-22-6z" fill="#6B4BC0" />
    <ellipse cx="50" cy="34" rx="13" ry="15" fill="#7C5AD6" />
    <path d="M40 24l3-13 7 9 7-9 3 13z" fill="#7C5AD6" />
    <circle cx="45" cy="32" r="4" fill="#fff" /><circle cx="55" cy="32" r="4" fill="#fff" />
    <circle cx="46" cy="33" r="1.9" fill="#231348" /><circle cx="56" cy="33" r="1.9" fill="#231348" />
  </>
}
function Ghost() {
  return <>
    <path d="M16 94V44C16 16 34 4 50 4s34 12 34 40v50l-11-9-11 10-12-10-12 10-11-10z" fill="#FFF6E8" />
    <ellipse cx="38" cy="42" rx="5.5" ry="8" fill="#2A1A57" /><ellipse cx="62" cy="42" rx="5.5" ry="8" fill="#2A1A57" />
    <circle cx="30" cy="56" r="5" fill="#FF8FC1" opacity=".7" /><circle cx="70" cy="56" r="5" fill="#FF8FC1" opacity=".7" />
    <path d="M43 56q7 8 14 0" fill="none" stroke="#2A1A57" strokeWidth="3.4" strokeLinecap="round" />
  </>
}

const bolt = (d: string, branch: string) => <>
  <path className="halo" pathLength={1} d={d} /><path className="mid" pathLength={1} d={d} />
  <path className="core" pathLength={1} d={d} /><path className="core br" pathLength={1} d={branch} />
</>
const stars = [[11, 7, 0], [48, 12, 0.4], [85, 6, 0.9], [22, 31, 1.3], [69, 38, 0.6], [92, 52, 1.7], [7, 58, 2.1], [37, 64, 1], [78, 70, 0.2], [56, 24, 2.4]]
const cloud = 'M20 72Q0 72 6 54Q12 38 32 42Q34 16 62 18Q80 0 104 16Q126 4 146 22Q176 16 184 42Q206 46 196 66Q192 74 176 72z'

function WitchTemplate({ scrubRef, bodyRef, bodyY, clip }: TemplateProps & { bodyRef: RefObject<HTMLDivElement | null>; bodyY: number; clip: number }) {
  const cards = [
    ['Yarasa Kurabiyesi', '₺95', 'Kakaolu, süslü kurabiye.', '210'],
    ['Zencefilli Kurabiye', '₺90', 'Baharatlı, çıtır zencefilli kurabiye.', '190'],
    ['Balkabağı Muffin', '₺110', 'Tarçınlı balkabağı, ceviz kırığı.', '280'],
    ['Hayalet Makaron', '₺75', 'Vanilyalı ganaj, krem şekerleme.', '150'],
  ]
  return (
    <div ref={scrubRef} className="tm tm--witch is-run nv-scrub" style={clipFrom(clip)}>
      <div className="tm-intro tmw-intro">
        <div className="tmw-stars">{stars.map(([left, top, delay]) => <i key={`${left}-${top}`} style={{ left: `${left}%`, top: `${top}%`, '--d': `${delay}s` } as CSSProperties} />)}</div>
        <svg className="tmw-cloud tmw-cloud--1" viewBox="0 0 200 80"><path d={cloud} fill="currentColor" /></svg>
        <svg className="tmw-cloud tmw-cloud--2" viewBox="0 0 200 80"><path d={cloud} fill="currentColor" /></svg>
        <svg className="tmw-bolts" viewBox="0 0 200 400" preserveAspectRatio="xMidYMin slice">
          <g className="tmw-bolt tmw-bolt--1">{bolt('M118 0 104 62 126 70 96 132 118 140 82 214', 'M126 70 152 108 140 124')}</g>
          <g className="tmw-bolt tmw-bolt--2">{bolt('M58 0 74 54 50 66 78 118 58 130 86 186', 'M50 66 22 96 32 116')}</g>
        </svg>
        <div className="tmw-flash tmw-flash--1" /><div className="tmw-flash tmw-flash--2" /><div className="tmw-flash tmw-flash--3" />
        <div className="tmw-logo">
          <span className="tmw-glow" />
          <span className="tmw-word">
            <svg className="tmw-hat" viewBox="0 0 100 80">
              <path d="M30 56C34 32 42 12 56 4c-1 9 2 16 8 22 6 8 8 18 8 30z" fill="#7C5AD6" />
              <path d="M56 4c8-2 14 4 16 12-5-3-11-4-16-3z" fill="#7C5AD6" />
              <path d="M32 46h40v10H32z" fill="#FF8A2B" />
              <rect x="47" y="45" width="10" height="12" rx="2" fill="none" stroke="#FFE58F" strokeWidth="3" />
              <path d="M6 62c14 10 74 10 88 0-6-10-20-10-44-10S12 52 6 62z" fill="#6B4BC0" />
            </svg>
            <b>Şeker Kazanı</b>
          </span>
          <span className="tmw-sub">tatlı büyüler dükkânı</span>
        </div>
        <svg className="tmw-pk" style={{ left: '4%', bottom: '6%', '--w': '26%', '--d': '2.5s' } as CSSProperties} viewBox="0 0 100 90"><Pumpkin /></svg>
        <svg className="tmw-pk" style={{ right: '5%', bottom: '4%', '--w': '32%', '--d': '2.7s' } as CSSProperties} viewBox="0 0 100 90"><Pumpkin /></svg>
        <svg className="tmw-pk" style={{ left: '30%', bottom: '1%', '--w': '18%', '--d': '3s' } as CSSProperties} viewBox="0 0 100 90"><Pumpkin /></svg>
        <svg className="tmw-gh" style={{ left: '42%', top: '66%', '--d': '3.2s' } as CSSProperties} viewBox="0 0 100 100"><Ghost /></svg>
        <svg className="tmw-bat" style={{ top: '10%', '--d': '2.4s' } as CSSProperties} viewBox="0 0 100 60"><Bat /></svg>
        <svg className="tmw-bat" style={{ top: '24%', '--d': '2.9s', '--bs': '.75' } as CSSProperties} viewBox="0 0 100 60"><Bat /></svg>
        <p className="tmw-skip">Dokun ve geç</p>
      </div>
      <div ref={bodyRef} className="tm-body" style={{ transform: `translateY(${bodyY}px)` }}>
        <div className="tmw-tabs"><span>Çikolata Büyüleri</span><span className="is-on">Kek &amp; Kurabiye</span><span>Waffle &amp; Krep</span></div>
        <div className="tmw-cathead"><i>03</i><b>Kek &amp; Kurabiye</b><svg className="tmw-gh tmw-gh--static" viewBox="0 0 100 100"><Ghost /></svg></div>
        <article className="tmw-card tmw-card--star">
          <span className="tmw-pill">★ ÖNE ÇIKAN</span>
          <div className="tmw-line"><span>Cadı Şapkası Cupcake</span><b>₺130</b></div>
          <p>Vanilyalı kek, mor krema ve şeker yıldızlar.</p>
          <div className="tmw-tags"><i className="is-kcal">360 kcal</i><i className="is-alg">3 alerjen</i></div>
        </article>
        {cards.map(([name, price, text, kcal]) => (
          <article key={name} className="tmw-card">
            <div className="tmw-line"><span>{name}</span><b>{price}</b></div>
            <p>{text}</p>
            <div className="tmw-tags"><i className="is-kcal">{kcal} kcal</i><i className="is-alg">2 alerjen</i></div>
          </article>
        ))}
      </div>
    </div>
  )
}

function CoastalTemplate({ scrubRef, clip, repriced }: TemplateProps & { clip: number; repriced: boolean }) {
  const rows: [string, string, string][] = [
    ['Mezeler', '', ''],
    ['Deniz Börülcesi', repriced ? '₺195' : '₺180', 'Limon, zeytinyağı, sarımsak'],
    ['Girit Ezme', '₺160', 'Ceviz, dereotu, taze peynir'],
    ['Şevketi Bostan', '₺190', 'Zeytinyağlı, günün tazesi'],
    ['Deniz Ürünleri', '', ''],
    ['Çipura Izgara', '₺540', 'Roka, közlenmiş biber'],
    ['Ahtapot Salata', '₺420', 'Kapari, kırmızı soğan'],
  ]
  return (
    <div ref={scrubRef} className="tm tm--coastal is-run nv-scrub" style={clipFrom(clip)}>
      <div className="tm-intro tmc-intro">
        <div className="tmc-waves"><i /><i /><i /></div>
        <div className="tmc-logo"><span className="tmc-word">LİMAN</span><span className="tmc-sub">Ege Mutfağı</span></div>
      </div>
      <div className="tm-body">
        <header className="tmc-head">
          <span className="tmc-word">LİMAN</span>
          <span className="tmc-sub">Ege Mutfağı</span>
          <svg className="tmc-wave" viewBox="0 0 120 8"><path d="M0 4q7.5-4 15 0t15 0 15 0 15 0 15 0 15 0 15 0 15 0" fill="none" stroke="currentColor" strokeWidth="1.2" /></svg>
        </header>
        {rows.map(([name, price, text], index) => price
          ? <div key={name}>
              <div className="tmc-row"><span>{name}</span><i /><b key={price} data-new={(index === 1 && repriced) || undefined}>{price}</b></div>
              <p className="tmc-desc">{text}</p>
            </div>
          : <p key={name} className="tmc-cat">{name}</p>)}
      </div>
    </div>
  )
}
