'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useSpring } from 'motion/react'

/** Pulls its child a few pixels toward the mouse. Does nothing on touch screens or with reduced motion. */
export function Magnetic({ children, strength = 0.28 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()
  const x = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 })
  const y = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 })
  if (reduced) return <span className="magnetic">{children}</span>
  return (
    <motion.span ref={ref} className="magnetic" style={{ x, y }}
      onPointerMove={(event) => {
        if (event.pointerType !== 'mouse' || !ref.current) return
        const box = ref.current.getBoundingClientRect()
        x.set((event.clientX - (box.left + box.width / 2)) * strength)
        y.set((event.clientY - (box.top + box.height / 2)) * strength)
      }}
      onPointerLeave={() => { x.set(0); y.set(0) }}>
      {children}
    </motion.span>
  )
}
