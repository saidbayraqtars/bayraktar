'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { LogoMark } from '@/components/logo'
import { useSite } from '@/components/providers'

const bands = [0, 1, 2, 3]
const name = 'Said Bayraktar'

/**
 * First home visit of a session: the three layers drop in and lock into the S,
 * the name types out, then the screen splits into four layers that slide away.
 * The head script in app/layout.tsx sets html[data-intro="on"] before paint when this should run.
 */
export function Intro({ onDone }: { onDone: () => void }) {
  const { t } = useSite()
  const [phase, setPhase] = useState<'idle' | 'build' | 'open' | 'gone'>('idle')
  const finished = useRef(false)
  const told = useRef(false)
  // The page starts revealing while the layers slide away, not after.
  const reveal = useCallback(() => { if (!told.current) { told.current = true; onDone() } }, [onDone])

  const finish = useCallback(() => {
    if (finished.current) return
    finished.current = true
    try { sessionStorage.setItem('sb-intro', '1') } catch {}
    delete document.documentElement.dataset.intro
    setPhase('gone')
    reveal()
  }, [reveal])

  useEffect(() => {
    if (document.documentElement.dataset.intro !== 'on') { reveal(); return }
    const timers = [
      setTimeout(() => setPhase('build'), 0),
      setTimeout(() => { setPhase('open'); reveal() }, 1900),
      setTimeout(finish, 2900),
    ]
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') finish() }
    window.addEventListener('keydown', onKey)
    return () => { timers.forEach(clearTimeout); window.removeEventListener('keydown', onKey) }
  }, [finish, reveal])

  if (phase === 'gone') return null
  const open = phase === 'open'
  return (
    <div className="intro" aria-hidden="true">
      {bands.map((band) => (
        <motion.div key={band} className="intro-band" style={{ top: `${band * 25}%` }}
          initial={false} animate={{ x: open ? (band % 2 ? '102%' : '-102%') : '0%' }}
          transition={{ duration: 0.85, delay: band * 0.07, ease: [0.76, 0, 0.24, 1] }} />
      ))}
      <motion.div className="intro-lockup" animate={open ? { opacity: 0, scale: 0.92, y: -20 } : { opacity: 1 }} transition={{ duration: 0.4 }}>
        {phase !== 'idle' && <LogoMark size={96} build className="intro-mark" />}
        <p className="intro-name">
          {phase !== 'idle' && name.split('').map((letter, index) => (
            <motion.span key={index} initial={{ y: '110%', opacity: 0 }} animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.95 + index * 0.035, ease: [0.2, 0.8, 0.2, 1] }}>
              {letter === ' ' ? ' ' : letter}
            </motion.span>
          ))}
        </p>
      </motion.div>
      <button type="button" className="intro-skip" onClick={finish} tabIndex={-1}>{t.intro.skip}</button>
    </div>
  )
}
