'use client'

import type { CSSProperties } from 'react'
import type { MotionValue } from 'motion/react'
import type { Lang } from '@/lib/content'
import { clamp, ease, span, stepAt, tl, useProgress } from '@/components/demo-kit'

/*
  Okka ERP: an invoice is approved and posts itself to the stock and account ledgers,
  then the same flow runs in bulk with a linked return and a shared freight cost,
  and finally the test runner proves each of those rules. Scroll drives it, like B2B.
*/

const lines = [
  { tr: 'Ayçiçek yağı 5 L', en: 'Sunflower oil 5 L', qty: 24, price: 420, stock: 240 },
  { tr: 'Un 25 kg', en: 'Flour 25 kg', qty: 10, price: 610, stock: 86 },
  { tr: 'Toz şeker 5 kg', en: 'Sugar 5 kg', qty: 40, price: 81, stock: 410 },
]
const total = lines.reduce((sum, line) => sum + line.qty * line.price, 0)
const balanceBefore = 42150
const freight = 1200
// Freight is shared by line value, the way Okka's cost allocation does it.
const shares = lines.map((line) => (line.qty * line.price) / total)

const tests = [
  { tr: 'onaylı fatura stok defterine yazar', en: 'approved invoice posts to the stock ledger' },
  { tr: 'cari bakiye belgeyle birlikte değişir', en: 'account balance moves with the document' },
  { tr: 'iade bağlı faturayı bulur', en: 'a return finds its linked invoice' },
  { tr: 'masraf satır tutarına göre dağılır', en: 'cost is shared by line value' },
  { tr: 'toplu faturalama 12 belge keser', en: 'batch invoicing issues 12 documents' },
]

export function OkkaDemo({ progress, lang, reduced }: { progress: MotionValue<number>; lang: Lang; reduced: boolean }) {
  const p = useProgress(progress, reduced, 1)
  const tr = lang === 'tr'

  // Step 1: lines fill in, the approval stamp lands, both ledgers take the entry.
  const typed = span(p, stepAt(0) - 0.04, stepAt(0) + 0.1)
  const review = p >= stepAt(0) + 0.12
  const stamp = ease(span(p, stepAt(0) + 0.17, stepAt(0) + 0.2))
  const approved = stamp > 0.5
  const post = ease(span(p, stepAt(0) + 0.2, stepAt(1) - 0.02))
  // Step 2: the batch fans out, the return links back, freight splits over the lines.
  const batch = ease(span(p, stepAt(1), stepAt(1) + 0.08))
  const issued = Math.round(1 + 11 * span(p, stepAt(1) + 0.02, stepAt(1) + 0.12))
  const link = ease(span(p, stepAt(1) + 0.1, stepAt(1) + 0.16))
  const split = ease(span(p, stepAt(1) + 0.14, stepAt(2) - 0.02))
  // Step 3: the test runner rises and checks each rule.
  const runner = ease(span(p, stepAt(2), stepAt(2) + 0.06))
  const passed = Math.floor(span(p, stepAt(2) + 0.05, 0.94) * (tests.length + 0.99))

  const status = approved ? (tr ? 'Onaylandı' : 'Approved') : review ? (tr ? 'Onay bekliyor' : 'Awaiting approval') : (tr ? 'Taslak' : 'Draft')

  return (
    <div className="demo demo-okka" aria-hidden="true"><div className="demo-in">
      <svg className="ok-wires" viewBox="0 0 100 62.5" preserveAspectRatio="none">
        <path d="M41 18 C47 18 46 12 52 12" className={post > 0 ? 'on' : ''} />
        <path d="M41 26 C47 26 46 31 52 31" className={post > 0.3 ? 'on' : ''} />
        <path d="M41 40 C47 40 46 49 52 49" className={split > 0 ? 'on' : ''} />
      </svg>

      <div className="ok-stack" style={{ '--fan': batch } as CSSProperties}>
        <i /><i /><i />
        <span className="ok-batch" data-on={batch > 0.2 || undefined}>{tr ? 'Toplu fatura' : 'Batch'} · {issued}/12</span>
      </div>

      <div className="ok-doc" data-state={approved ? 'ok' : review ? 'wait' : 'draft'}>
        <header className="ok-doc-head">
          <div><small>{tr ? 'Satış faturası' : 'Sales invoice'}</small><b>FT-2026-0412</b></div>
          <span className="ok-status">{status}</span>
        </header>
        <p className="ok-party">120.01.101 · Yıldız Market</p>
        <dl className="ok-meta">
          <div><dt>{tr ? 'Tarih' : 'Date'}</dt><dd>06.10.2026</dd></div>
          <div><dt>{tr ? 'Vade' : 'Due'}</dt><dd>{tr ? '30 gün' : '30 days'}</dd></div>
          <div><dt>{tr ? 'Depo' : 'Warehouse'}</dt><dd>{tr ? 'Merkez' : 'Main'}</dd></div>
          <div><dt>{tr ? 'Satır' : 'Lines'}</dt><dd>{Math.min(lines.length, Math.ceil(typed * lines.length))}/{lines.length}</dd></div>
        </dl>
        <ul className="ok-lines">
          {lines.map((line, index) => (
            <li key={line.en} data-on={typed * lines.length > index || undefined}>
              <span>{line[lang]}</span><em>{line.qty}</em><b>{tl(line.qty * line.price, lang)}</b>
            </li>
          ))}
        </ul>
        <div className="ok-total"><span>{tr ? 'Genel toplam' : 'Grand total'}</span><b>{tl(total * clamp(typed * 1.05), lang)}</b></div>
        <span className="ok-approve" data-done={approved || undefined}>{approved ? (tr ? 'Deftere işlendi ✓' : 'Posted ✓') : (tr ? 'Onayla' : 'Approve')}</span>
        <span className="ok-stamp" style={{ opacity: stamp, transform: `rotate(-14deg) scale(${2.2 - 1.2 * stamp})` }}>{tr ? 'ONAYLI' : 'APPROVED'}</span>
        <div className="ok-return" style={{ opacity: link, transform: `translateY(${(1 - link) * 40}%)` }}>
          <b>{tr ? 'İade' : 'Return'} IR-0031</b><span>↔ FT-2026-0412 · 2 × {lines[0][lang]}</span>
        </div>
      </div>

      <section className="ok-panel ok-stock" data-on={post > 0 || undefined}>
        <small>{tr ? 'Stok defteri · Merkez depo' : 'Stock ledger · Main warehouse'}</small>
        <ol>
          <li className="ok-old"><span>FT-0409</span><span>{lines[1][lang]}</span><em>−6</em></li>
          <li className="ok-new" style={{ opacity: post, transform: `translateX(${(1 - post) * 30}%)` }}>
            <span>FT-0412</span><span>{lines[0][lang]}</span><em>−24</em>
          </li>
        </ol>
        <span className="ok-meter"><i><u style={{ transform: `scaleX(${(lines[0].stock - 24 * post) / lines[0].stock})` }} /></i><b>{Math.round(lines[0].stock - 24 * post)} {tr ? 'koli' : 'cases'}</b></span>
      </section>

      <section className="ok-panel ok-account" data-on={post > 0.3 || undefined}>
        <small>{tr ? 'Cari · Yıldız Market' : 'Account · Yıldız Market'}</small>
        <b className="ok-balance">{tl(balanceBefore + total * ease(span(post, 0.3, 1)), lang)}</b>
        <span className="ok-delta" data-on={post > 0.98 || undefined}>+{tl(total, lang)} {tr ? 'borç' : 'debit'}</span>
      </section>

      <section className="ok-panel ok-cost" data-on={split > 0 || undefined}>
        <small>{tr ? 'Masraf dağıtımı · Nakliye' : 'Cost allocation · Freight'} {tl(freight, lang)}</small>
        {lines.map((line, index) => (
          <div key={line.en} className="ok-share">
            <span>{line[lang]}</span>
            <i><u style={{ transform: `scaleX(${shares[index] * split})` }} /></i>
            <b>{tl(freight * shares[index] * split, lang)}</b>
          </div>
        ))}
      </section>

      <div className="ok-runner" style={{ opacity: runner, transform: `translateY(${(1 - runner) * 18}%)` }}>
        <div className="ok-runner-bar"><i /><i /><i /><span>npm test</span><em>Vitest · Playwright · Storybook</em></div>
        <ul>
          {tests.map((test, index) => (
            <li key={test.en} data-pass={index < passed || undefined}>
              <span className="ok-tick">{index < passed ? '✓' : '·'}</span>{test[lang]}<em>{index < passed ? `${(0.4 + index * 0.3).toFixed(1)}s` : ''}</em>
            </li>
          ))}
        </ul>
        <p className="ok-summary" data-on={passed >= tests.length || undefined}>{passed >= tests.length ? (tr ? `${tests.length}/${tests.length} geçti` : `${tests.length}/${tests.length} passed`) : (tr ? 'Çalışıyor…' : 'Running…')}</p>
      </div>
    </div></div>
  )
}
