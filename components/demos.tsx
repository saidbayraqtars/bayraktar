'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { AnimatePresence, motion, useInView, useMotionValueEvent, useReducedMotion, useTransform, type MotionValue } from 'motion/react'
import type { Lang } from '@/lib/content'

/*
  Hand-built product stories that replace screenshots where a picture explains less
  than the flow does. B2B and Neva follow the scene's scroll progress (0-1, the
  window swings in until 0.2, then one third per step); the WhatsApp story loops on
  its own so it also works in the horizontal strip and on its case page.
  Everything is sized in container units, so one drawing fits a card or a full stage.
*/
const clamp = (value: number) => Math.min(1, Math.max(0, value))
const ease = (value: number) => 1 - Math.pow(1 - value, 3)
const span = (p: number, from: number, to: number) => clamp((p - from) / (to - from))
const stepAt = (index: number) => 0.2 + (index * 0.8) / 3

/** Re-renders with the current scroll position; the stories are small enough that this stays cheap. */
function useProgress(progress: MotionValue<number>, reduced: boolean, still: number) {
  const [value, setValue] = useState(() => (reduced ? still : progress.get()))
  useMotionValueEvent(progress, 'change', (next) => { if (!reduced) setValue(next) })
  return reduced ? still : value
}

const tl = (n: number, lang: Lang) => '₺' + Math.round(n).toLocaleString(lang === 'tr' ? 'tr-TR' : 'en-US')

/* ---------- B2B: an order travels from a phone to the ERP, then ships and gets paid ---------- */

const orderLines = [
  { tr: 'Ayçiçek yağı 5 L', en: 'Sunflower oil 5 L', qty: 24, price: 420 },
  { tr: 'Un 25 kg', en: 'Flour 25 kg', qty: 10, price: 610 },
  { tr: 'Toz şeker 5 kg', en: 'Sugar 5 kg', qty: 40, price: 81 },
]
const orderTotal = orderLines.reduce((sum, line) => sum + line.qty * line.price, 0)

export function B2BDemo({ progress, lang, reduced }: { progress: MotionValue<number>; lang: Lang; reduced: boolean }) {
  const p = useProgress(progress, reduced, 1)
  const tr = lang === 'tr'
  const typed = span(p, stepAt(0) + 0.02, stepAt(1) - 0.06)
  const sent = p >= stepAt(1) - 0.04
  const travel = ease(span(p, stepAt(1) - 0.03, stepAt(1) + 0.12))
  const reserve = ease(span(p, stepAt(1) + 0.1, stepAt(2) - 0.04))
  const ship = ease(span(p, stepAt(2), stepAt(2) + 0.16))
  const paid = ease(span(p, stepAt(2) + 0.08, 0.9))
  const shipLabel = ship < 0.34 ? (tr ? 'Hazırlanıyor' : 'Packing') : ship < 0.99 ? (tr ? 'Yolda' : 'On the way') : (tr ? 'Teslim edildi' : 'Delivered')

  // The order chip rides phone → hub → ERP along the connector lines.
  const chipX = travel < 0.5 ? 27 + (50 - 27) * (travel / 0.5) : 50 + (73 - 50) * ((travel - 0.5) / 0.5)
  const chipY = travel < 0.5 ? 52 : 52 - 22 * ((travel - 0.5) / 0.5)

  return (
    <div className="demo demo-b2b" aria-hidden="true"><div className="demo-in">
      <svg className="b2b-wires" viewBox="0 0 100 62.5" preserveAspectRatio="none">
        <path d="M27 32.5 H50" className={travel > 0 ? 'on' : ''} />
        <path d="M50 32.5 C60 32.5 62 19 73 19" className={travel > 0.5 ? 'on' : ''} />
        <path d="M50 32.5 C60 32.5 62 32.5 73 32.5" className={ship > 0 ? 'on' : ''} />
        <path d="M50 32.5 C60 32.5 62 46 73 46" className={paid > 0 ? 'on' : ''} />
      </svg>

      <div className="b2b-phone">
        <div className="b2b-phone-top"><b>{tr ? 'Plasiyer' : 'Field sales'}</b><span>Yıldız Market</span></div>
        <ul className="b2b-lines">
          {orderLines.map((line, index) => {
            const shown = typed * orderLines.length > index
            return (
              <li key={line.en} data-on={shown || undefined}>
                <span>{line[lang]}</span><em>× {line.qty}</em>
              </li>
            )
          })}
        </ul>
        <div className="b2b-total"><span>{tr ? 'Toplam' : 'Total'}</span><b>{tl(orderTotal * clamp(typed * 1.05), lang)}</b></div>
        <div className="b2b-send" data-sent={sent || undefined}>{sent ? (tr ? 'Gönderildi ✓' : 'Sent ✓') : (tr ? 'Siparişi gönder' : 'Send order')}</div>
      </div>

      <div className="b2b-hub" data-pulse={(travel > 0.35 && travel < 0.7) || undefined}>
        <span className="b2b-hub-ring" />
        <b>B2B</b>
        <small>{tr ? 'Sipariş sistemi' : 'Order system'}</small>
      </div>

      <div className="b2b-node b2b-erp" data-on={reserve > 0 || undefined}>
        <small>ERP · {tr ? 'Merkez depo' : 'Main warehouse'}</small>
        <b>{Math.round(240 - 24 * reserve)} {tr ? 'koli' : 'cases'}</b>
        <span className="b2b-bar"><i style={{ transform: `scaleX(${(240 - 24 * reserve) / 240})` }} /></span>
        <em data-on={reserve > 0.98 || undefined}>{tr ? '24 koli ayrıldı' : '24 cases reserved'}</em>
      </div>
      <div className="b2b-node b2b-ship" data-on={ship > 0 || undefined}>
        <small>{tr ? 'Sevkiyat' : 'Shipment'} · #1042</small>
        <b>{shipLabel}</b>
        <span className="b2b-road"><i style={{ left: `${ship * 100}%` }} /></span>
      </div>
      <div className="b2b-node b2b-pay" data-on={paid > 0 || undefined}>
        <small>{tr ? 'Tahsilat' : 'Payment'}</small>
        <b>{tl(orderTotal * paid, lang)}{paid > 0.99 && ' ✓'}</b>
      </div>

      {travel > 0 && travel < 1 && (
        <span className="b2b-chip" style={{ left: `${chipX}%`, top: `${(chipY / 62.5) * 100}%` }}>#1042</span>
      )}
    </div></div>
  )
}

/* ---------- Neva QR: scan the table's code, the menu opens, designs and prices change ---------- */

// A fixed QR-like pattern: three finder squares and seeded modules, drawn once.
const qrCells = (() => {
  const size = 25
  const cells: [number, number][] = []
  let seed = 11
  const random = () => (seed = (seed * 16807) % 2147483647) / 2147483647
  const finder = (x: number, y: number) => (x < 7 && y < 7) || (x >= size - 7 && y < 7) || (x < 7 && y >= size - 7)
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) if (!finder(x, y) && random() < 0.48) cells.push([x, y])
  return cells
})()

function QrCode() {
  const finder = (x: number, y: number) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width={7} height={7} rx={1.2} />
      <rect x={x + 1} y={y + 1} width={5} height={5} rx={0.8} fill="#fff" />
      <rect x={x + 2} y={y + 2} width={3} height={3} rx={0.5} />
    </g>
  )
  return (
    <svg viewBox="-1 -1 27 27" className="qr-code">
      {qrCells.map(([x, y]) => <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} />)}
      {finder(0, 0)}{finder(18, 0)}{finder(0, 18)}
    </svg>
  )
}

const themes = [
  { id: 'nocturne', name: 'Nocturne', sub: 'Lounge · Dining' },
  { id: 'liman', name: 'Liman', sub: 'Ege mutfağı' },
  { id: 'cadi', name: 'Cadı Kulübesi', sub: 'Kafe · Tatlı' },
]
const menuItems = [
  { tr: 'Kuzu Tandır', en: 'Lamb Tandoor', price: 480 },
  { tr: 'Izgara Levrek', en: 'Grilled Sea Bass', price: 460 },
  { tr: 'Burrata', en: 'Burrata', price: 240 },
  { tr: 'Ahtapot Salata', en: 'Octopus Salad', price: 420 },
  { tr: 'Çipura Izgara', en: 'Grilled Sea Bream', price: 540 },
  { tr: 'İncir Tatlısı', en: 'Fig Dessert', price: 180 },
]

export function NevaDemo({ progress, lang, reduced }: { progress: MotionValue<number>; lang: Lang; reduced: boolean }) {
  const p = useProgress(progress, reduced, 0.9)
  const tr = lang === 'tr'
  const scan = span(p, stepAt(0), stepAt(1) - 0.04)
  const phoneIn = ease(span(p, stepAt(0) - 0.02, stepAt(0) + 0.12))
  const open = ease(span(p, stepAt(1) - 0.05, stepAt(1) + 0.04))
  const themeIndex = Math.min(themes.length - 1, Math.floor(span(p, stepAt(1) + 0.04, stepAt(2)) * themes.length))
  const theme = themes[p < stepAt(2) ? themeIndex : 0]
  const panel = ease(span(p, stepAt(2), stepAt(2) + 0.08))
  const repriced = p > stepAt(2) + 0.12

  return (
    <div className="demo demo-neva" aria-hidden="true"><div className="demo-in">
      <span className="neva-glow" />
      <div className="neva-card" style={{ transform: `rotate(${-6 + 6 * phoneIn}deg)` }}>
        <QrCode />
        <span className="neva-scan" style={{ top: `${8 + 70 * (scan < 1 ? (scan * 2) % 1 : 1)}%`, opacity: scan > 0 && scan < 1 ? 1 : 0 }} />
        <div className="neva-card-foot"><b>{tr ? 'MASA 4' : 'TABLE 4'}</b><span>{tr ? 'Okut · menü açılsın' : 'Scan · open the menu'}</span></div>
      </div>

      <motion.div className="neva-panel" style={{ opacity: panel, transform: `translateY(${(1 - panel) * 30}%)` }}>
        <small>{tr ? 'Panel · Ürünler' : 'Panel · Products'}</small>
        <div className="neva-panel-row"><span>{menuItems[0][lang]}</span><s>₺480</s><b>₺520</b></div>
        <em>{repriced ? (tr ? 'Yayında ✓' : 'Live ✓') : (tr ? 'Kaydediliyor…' : 'Saving…')}</em>
      </motion.div>

      <div className="neva-phone" style={{ transform: `translateX(${(1 - phoneIn) * 60}%) rotate(${(1 - phoneIn) * 8}deg)`, opacity: phoneIn }}>
        <div className="neva-screen">
          <div className="neva-camera">
            <i /><i /><i /><i />
            <span>{tr ? 'QR aranıyor…' : 'Looking for a QR…'}</span>
          </div>
          <div className={`neva-menu neva-${theme.id}`} style={{ clipPath: `circle(${open * 150}% at 50% 45%)` }}>
            <AnimatePresence mode="wait">
              <motion.div key={theme.id} className="neva-menu-in" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
                <span className="neva-table">{tr ? 'Masa 4' : 'Table 4'}</span>
                <b className="neva-brand">{theme.name}</b>
                <small className="neva-sub">{theme.sub}</small>
                <ul>
                  {menuItems.map((item, index) => (
                    <li key={item.en}>
                      <span>{item[lang]}</span>
                      <b data-new={(index === 0 && repriced) || undefined}>₺{index === 0 && repriced ? 520 : item.price}</b>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <span className="neva-badge" style={{ opacity: p > stepAt(1) + 0.04 && p < stepAt(2) ? 1 : 0 }}>{tr ? '42 tasarım' : '42 designs'} · {themeIndex + 1}/3</span>
    </div></div>
  )
}

/* ---------- Vega WhatsApp: a balance reminder leaves the ERP and lands on the customer's phone ---------- */

const loop = 10
export function WhatsAppDemo({ lang }: { lang: Lang }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.3 })
  const reduced = useReducedMotion()
  const [t, setT] = useState(reduced ? 8 : 0)
  const tr = lang === 'tr'

  useEffect(() => {
    if (reduced || !inView) return
    const started = performance.now() - t * 1000
    const timer = setInterval(() => setT(((performance.now() - started) / 1000) % loop), 100)
    return () => clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced])

  const message = tr
    ? 'Sayın Yıldız Market, 06.10.2026 itibarıyla cari bakiyeniz 12.450,00 TL’dir. Ekstreniz ektedir.'
    : 'Dear Yıldız Market, your balance as of 06.10.2026 is 12,450.00 TL. Your statement is attached.'
  const typed = Math.round(message.length * clamp((t - 1.2) / 1.6))
  const ticks = t < 3.4 ? 1 : t < 4.4 ? 2 : 3

  return (
    <div ref={ref} className="demo demo-wa" aria-hidden="true"><div className="demo-in">
      <div className="wa-erp" data-sent={t > 1 || undefined}>
        <span className="wa-erp-tag">Vega</span>
        <span>120.01.101 · Yıldız Market</span>
        <b>₺12.450,00</b>
        <span className="wa-erp-btn">{t > 1 ? (tr ? 'Kuyrukta ✓' : 'Queued ✓') : (tr ? 'Gönder' : 'Send')}</span>
      </div>
      <div className="wa-phone">
        <div className="wa-head"><span className="wa-avatar">YM</span><div><b>Yıldız Market</b><small>{t > 5.2 && t < 6.6 ? (tr ? 'yazıyor…' : 'typing…') : (tr ? 'çevrimiçi' : 'online')}</small></div></div>
        <div className="wa-body">
          <AnimatePresence>
            {t > 1.2 && (
              <motion.div key="m1" className="wa-bubble wa-out" initial={{ opacity: 0, y: 14, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }}>
                {message.slice(0, typed)}
                <span className="wa-meta">14:02 <i data-ticks={ticks}>{ticks === 1 ? '✓' : '✓✓'}</i></span>
              </motion.div>
            )}
            {t > 3 && (
              <motion.div key="m2" className="wa-bubble wa-out wa-file" initial={{ opacity: 0, y: 14, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }}>
                <span className="wa-pdf">PDF</span>
                <span><b>Ekstre_Ekim_2026.pdf</b><small>2 {tr ? 'sayfa' : 'pages'} · 84 KB</small></span>
                <span className="wa-meta">14:02 <i data-ticks={ticks}>{ticks === 1 ? '✓' : '✓✓'}</i></span>
              </motion.div>
            )}
            {t > 5.2 && t < 6.6 && (
              <motion.div key="typing" className="wa-bubble wa-in wa-typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><i /><i /><i /></motion.div>
            )}
            {t > 6.6 && (
              <motion.div key="m3" className="wa-bubble wa-in" initial={{ opacity: 0, y: 14, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }}>
                {tr ? 'Teşekkürler, yarın havale ediyoruz.' : 'Thanks, we will transfer it tomorrow.'}
                <span className="wa-meta">14:05</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {t > 1 && t < 2.4 && <span className="wa-flight" style={{ '--k': clamp((t - 1) / 1.4) } as CSSProperties} />}
    </div></div>
  )
}

/** Picks the story for a project; scroll stories need the scene's progress. */
export function ProjectDemo({ kind, progress, lang, reduced }: { kind: 'b2b' | 'neva' | 'whatsapp'; progress?: MotionValue<number>; lang: Lang; reduced: boolean }) {
  const fallback = useTransform(() => 1)
  const value = progress ?? fallback
  if (kind === 'b2b') return <B2BDemo progress={value} lang={lang} reduced={reduced} />
  if (kind === 'neva') return <NevaDemo progress={value} lang={lang} reduced={reduced} />
  return <WhatsAppDemo lang={lang} />
}
