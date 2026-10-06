'use client'

import { motion, type Transition } from 'motion/react'

/**
 * The mark: three layers (interface, server, data) joined into an S.
 * The top layer carries the accent because it is the one people see.
 * `build` plays the assembly used by the intro; otherwise the layers shift slightly on hover.
 */
export function LogoMark({ size = 32, build = false, className }: { size?: number; build?: boolean; className?: string }) {
  const drop = (index: number): Transition => ({ type: 'spring', stiffness: 260, damping: 18, delay: 0.15 + index * 0.16 })
  const slab = (index: number) => build
    ? { initial: { y: -60, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: drop(index) }
    : {}
  const joint = (index: number) => build
    ? { initial: { scaleY: 0 }, animate: { scaleY: 1 }, transition: { duration: 0.28, delay: 0.75 + index * 0.12, ease: [0.2, 0.8, 0.2, 1] as const } }
    : {}
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} className={`logo-mark ${className ?? ''}`} aria-hidden="true">
      <motion.rect className="logo-joint" x="6" y="10" width="8" height="8" style={{ originY: 0 }} {...joint(0)} />
      <motion.rect className="logo-joint" x="26" y="22" width="8" height="8" style={{ originY: 0 }} {...joint(1)} />
      <motion.rect className="logo-slab logo-top" x="6" y="4" width="28" height="8" rx="2" {...slab(0)} />
      <motion.rect className="logo-slab" x="6" y="16" width="28" height="8" rx="2" {...slab(1)} />
      <motion.rect className="logo-slab" x="6" y="28" width="28" height="8" rx="2" {...slab(2)} />
    </svg>
  )
}

export function Wordmark({ caption }: { caption?: string }) {
  return (
    <span className="wordmark">
      <LogoMark />
      <span className="wordmark-text">
        <span className="wordmark-name">Said Bayraktar</span>
        {caption && <span className="wordmark-caption">{caption}</span>}
      </span>
    </span>
  )
}
