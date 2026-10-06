'use client'

import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'

type KineticProps = {
  text: string
  /** Start the reveal (the intro holds it back on the first visit). */
  ready?: boolean
  delay?: number
  /** Width axis at rest and at its widest (Archivo goes from 62 to 125). */
  base?: number
  max?: number
  className?: string
}

/**
 * A line of display type whose letters stretch along Archivo's width axis.
 * With a mouse, letters near the pointer widen; on touch screens a slow wave runs through them.
 */
export function Kinetic({ text, ready = true, delay = 0, base = 100, max = 125, className }: KineticProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const root = ref.current
    if (!root || reduced || !ready) return
    const letters = [...root.querySelectorAll<HTMLElement>('[data-letter]')]
    const current = letters.map(() => base)
    const fine = matchMedia('(pointer: fine)').matches
    let pointer: { x: number; y: number } | null = null
    let visible = false
    let live = false
    let frame = 0
    let running = false
    let start = 0

    // Reads all positions first, then writes all widths: one layout per frame, and the loop stops once settled.
    const tick = (time: number) => {
      if (!start) start = time
      let targets: number[]
      if (fine) {
        const box = root.getBoundingClientRect()
        const near = pointer && pointer.y > box.top - 220 && pointer.y < box.bottom + 220
        const centers = near ? letters.map((letter) => { const r = letter.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2] }) : null
        targets = letters.map((_, index) => centers && pointer
          ? base + (max - base) * Math.max(0, 1 - Math.hypot(pointer.x - centers[index][0], pointer.y - centers[index][1]) / 260)
          : base)
      } else {
        targets = letters.map((_, index) => base + (max - base) * 0.5 * (1 + Math.sin((time - start) / 900 + index * 0.55)))
      }
      let moving = !fine
      letters.forEach((_, index) => {
        const next = current[index] + (targets[index] - current[index]) * 0.14
        if (Math.abs(next - current[index]) > 0.05) moving = true
        current[index] = next
      })
      if (live) letters.forEach((letter, index) => { letter.style.fontVariationSettings = `"wdth" ${current[index].toFixed(1)}` })
      if (visible && moving) frame = requestAnimationFrame(tick)
      else running = false
    }
    const kick = () => {
      if (running || !visible || !live) return
      running = true
      frame = requestAnimationFrame(tick)
    }
    const settle = setTimeout(() => { live = true; kick() }, 1300 + delay * 1000)
    const onMove = (event: PointerEvent) => { pointer = { x: event.clientX, y: event.clientY }; kick() }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) kick()
    })
    observer.observe(root)
    if (fine) window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      clearTimeout(settle)
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('pointermove', onMove)
    }
  }, [base, max, ready, reduced, delay])

  return (
    <span ref={ref} className={`kinetic ${className ?? ''}`}>
      <span className="sr-only">{text}</span>
      {text.split('').map((letter, index) => (
        <span key={index} className="kinetic-cell" aria-hidden="true">
          <motion.span data-letter className="kinetic-letter"
            style={{ fontVariationSettings: `"wdth" ${base}` }}
            initial={reduced ? false : { y: '105%', fontVariationSettings: '"wdth" 62' }}
            animate={ready ? { y: '0%', fontVariationSettings: `"wdth" ${base}` } : undefined}
            transition={{ duration: 0.9, delay: delay + index * 0.045, ease: [0.16, 1, 0.3, 1] }}>
            {letter === ' ' ? ' ' : letter}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
