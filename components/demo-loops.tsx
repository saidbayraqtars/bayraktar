'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'motion/react'
import type { Lang } from '@/lib/content'
import { clamp, ease } from '@/components/demo-kit'

/*
  Small looping stories for the horizontal strip and the case pages: each one shows
  the single moment that product is built for. They run on their own clock, only
  while visible, and rest on their last frame when motion is reduced.
*/

function useLoop(length: number, still: number) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.3 })
  const reduced = useReducedMotion()
  const [t, setT] = useState(still)
  useEffect(() => {
    if (reduced || !inView) return
    const started = performance.now() - t * 1000
    const timer = setInterval(() => setT(((performance.now() - started) / 1000) % length), 80)
    return () => clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced, length])
  return [ref, reduced ? still : t] as const
}

const at = (t: number, from: number, to: number) => clamp((t - from) / (to - from))

/* ArcTeknik ERP: a phone comes in for repair and moves through the service pipeline, offline. */
export function ArcTeknikDemo({ lang }: { lang: Lang }) {
  const [ref, t] = useLoop(9, 7.5)
  const tr = lang === 'tr'
  const stages = tr ? ['Kabul', 'Arıza tespiti', 'Parça', 'Hazır', 'Teslim'] : ['Intake', 'Diagnosis', 'Parts', 'Ready', 'Delivered']
  const stage = Math.min(stages.length - 1, Math.floor(at(t, 0.8, 7) * stages.length))
  const slip = ease(at(t, 6.6, 7.6))
  return (
    <div ref={ref} className="demo demo-loop demo-arc" aria-hidden="true"><div className="demo-in">
      <div className="lp-card arc-ticket">
        <div className="lp-row"><b>S-1187</b><span className="lp-pill">{stages[stage]}</span></div>
        <p className="arc-device">iPhone 13 · {tr ? 'Ekran kırık' : 'Cracked screen'}</p>
        <p className="lp-muted">{tr ? 'Müşteri' : 'Customer'}: Yıldız Market · 0535 *** ** 01</p>
        <ol className="arc-steps">
          {stages.map((name, index) => <li key={name} data-on={index <= stage || undefined} data-now={index === stage || undefined}><i />{name}</li>)}
        </ol>
      </div>
      <div className="arc-badges">
        <span className="lp-chip lp-chip-dark"><i className="lp-dot" />{tr ? 'İnternetsiz çalışıyor' : 'Works offline'}</span>
        <span className="lp-chip">RSA-2048 {tr ? 'lisans' : 'licence'} ✓</span>
      </div>
      <div className="arc-slip" style={{ transform: `translateY(${(1 - slip) * 110}%)` }}>
        <b>{tr ? 'Teslim fişi' : 'Delivery slip'} · S-1187</b>
        <span>{tr ? 'Ekran değişimi' : 'Screen replacement'}<em>₺3.450</em></span>
      </div>
    </div></div>
  )
}

/* Hızlı Belge: rows typed from the keyboard; tare and net weight fill themselves in. */
const produce = [
  { tr: 'Domates', en: 'Tomatoes', crates: 40, gross: 812, tare: 2 },
  { tr: 'Biber', en: 'Peppers', crates: 25, gross: 330, tare: 1.6 },
  { tr: 'Patlıcan', en: 'Aubergines', crates: 30, gross: 486, tare: 1.8 },
]
export function HizliBelgeDemo({ lang }: { lang: Lang }) {
  const [ref, t] = useLoop(8, 7)
  const tr = lang === 'tr'
  const row = Math.min(produce.length, Math.floor(at(t, 0.4, 6) * produce.length * 1.02))
  const key = Math.floor(t * 3) % 3
  const keys = ['F2', '↵', 'Tab']
  const net = produce.slice(0, row).reduce((sum, item) => sum + item.gross - item.crates * item.tare, 0)
  return (
    <div ref={ref} className="demo demo-loop demo-hb" aria-hidden="true"><div className="demo-in">
      <div className="lp-card hb-sheet">
        <div className="hb-row hb-head"><span>{tr ? 'Ürün' : 'Item'}</span><span>{tr ? 'Kasa' : 'Crates'}</span><span>{tr ? 'Brüt' : 'Gross'}</span><span>{tr ? 'Dara' : 'Tare'}</span><span>Net</span></div>
        {produce.map((item, index) => (
          <div key={item.en} className="hb-row" data-on={index < row || undefined} data-typing={index === row || undefined}>
            <span>{index <= row ? item[lang] : ''}{index === row && <i className="hb-caret" />}</span>
            <span>{index < row ? item.crates : ''}</span>
            <span>{index < row ? `${item.gross} kg` : ''}</span>
            <span className="hb-auto">{index < row ? `${(item.crates * item.tare).toFixed(0)} kg` : ''}</span>
            <b>{index < row ? `${(item.gross - item.crates * item.tare).toFixed(0)} kg` : ''}</b>
          </div>
        ))}
        <div className="hb-foot"><span>{tr ? 'Kasa depozitosu' : 'Crate deposit'}: {produce.slice(0, row).reduce((sum, item) => sum + item.crates, 0)}</span><b>{tr ? 'Net' : 'Net'} {net.toFixed(0)} kg</b></div>
      </div>
      <div className="hb-keys">{keys.map((name, index) => <kbd key={name} data-down={index === key || undefined}>{name}</kbd>)}</div>
      <span className="lp-chip lp-chip-dark hb-vega" data-on={row >= produce.length || undefined}>{row >= produce.length ? (tr ? 'Vega’ya kaydedildi ✓' : 'Saved to Vega ✓') : (tr ? 'Klavyeyle giriş' : 'Keyboard entry')}</span>
    </div></div>
  )
}

/* Galya Panel: two ERPs are read side by side and the count difference surfaces. */
export function GalyaDemo({ lang }: { lang: Lang }) {
  const [ref, t] = useLoop(8, 6.5)
  const tr = lang === 'tr'
  const flow = at(t, 0.3, 2.6)
  const merged = t > 2.6
  const alert = t > 3.6
  const rows = [
    { name: tr ? 'Dana kıyma' : 'Minced beef', a: '42,0', b: '42,0', diff: '' },
    { name: tr ? 'Tavuk göğsü' : 'Chicken breast', a: '18,5', b: '15,3', diff: '−3,2 kg' },
    { name: tr ? 'Kaşar' : 'Cheese', a: '9,0', b: '9,0', diff: '' },
  ]
  return (
    <div ref={ref} className="demo demo-loop demo-galya" aria-hidden="true"><div className="demo-in">
      <span className="lp-chip gl-src gl-a">VegaWin</span>
      <span className="lp-chip gl-src gl-b">Vega Şefim</span>
      {[16, 84].map((start) => (
        <span key={start} className="gl-packet" style={{ left: `${start + (50 - start) * ease(flow)}%`, top: `${15 + 22 * flow}%`, opacity: flow > 0 && flow < 1 ? 1 : 0 }} />
      ))}
      <div className="lp-card gl-table" data-on={merged || undefined}>
        <div className="gl-row gl-head"><span>{tr ? 'Ürün' : 'Item'}</span><span>{tr ? 'Stok' : 'Stock'}</span><span>{tr ? 'Sayım' : 'Count'}</span><span /></div>
        {rows.map((row) => (
          <div key={row.name} className="gl-row" data-alert={(alert && row.diff) || undefined}>
            <span>{row.name}</span><span>{merged ? row.a : '—'}</span><span>{merged ? row.b : '—'}</span><b>{alert ? row.diff : ''}</b>
          </div>
        ))}
        <p className="lp-muted gl-note">{tr ? 'Salt okunur · ERP’ye yazmaz' : 'Read-only · never writes to the ERP'}</p>
      </div>
    </div></div>
  )
}

/* Vega Ticket: a support job moves across the board, the customer gets a WhatsApp, the slip prints. */
export function TicketDemo({ lang }: { lang: Lang }) {
  const [ref, t] = useLoop(9, 8)
  const tr = lang === 'tr'
  const columns = tr ? ['Yeni', 'İşlemde', 'Tamam'] : ['New', 'In progress', 'Done']
  // Column position: hops to the middle at 2 s, to the right at 4.4 s.
  const x = (ease(at(t, 2, 2.6)) + ease(at(t, 4.4, 5))) * 33.33
  const sent = t > 5.4
  const print = ease(at(t, 6.2, 7.4))
  return (
    <div ref={ref} className="demo demo-loop demo-ticket" aria-hidden="true"><div className="demo-in">
      <div className="tk-board">
        {columns.map((name) => <div key={name} className="tk-col"><small>{name}</small></div>)}
        <div className="lp-card tk-card" style={{ left: `calc(${x}% + 2%)` }}>
          <b>#2291 · Yıldız Market</b>
          <span>{tr ? 'Yazıcı kurulumu, 45 dk' : 'Printer setup, 45 min'}</span>
          <em>₺750</em>
        </div>
      </div>
      <span className="lp-chip tk-wa" data-on={sent || undefined}><i className="lp-dot" />WhatsApp · {sent ? (tr ? 'müşteriye bildirildi ✓' : 'customer notified ✓') : (tr ? 'kuyrukta' : 'queued')}</span>
      <div className="tk-slip" style={{ clipPath: `inset(0 0 ${(1 - print) * 100}% 0)` }}>
        <b>A5 · {tr ? 'Servis fişi' : 'Service slip'}</b>
        <span>#2291 · 06.10.2026</span>
        <i /><i /><i />
      </div>
    </div></div>
  )
}

export type LoopKind = 'arcteknik' | 'hizli' | 'galya' | 'ticket'
export const isLoopKind = (kind: string | undefined): kind is LoopKind => kind === 'arcteknik' || kind === 'hizli' || kind === 'galya' || kind === 'ticket'
export function LoopDemo({ kind, lang }: { kind: LoopKind; lang: Lang }) {
  if (kind === 'arcteknik') return <ArcTeknikDemo lang={lang} />
  if (kind === 'hizli') return <HizliBelgeDemo lang={lang} />
  if (kind === 'galya') return <GalyaDemo lang={lang} />
  return <TicketDemo lang={lang} />
}
