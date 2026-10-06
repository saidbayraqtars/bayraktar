'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { animate, motion, useReducedMotion, useSpring, useTransform, type MotionValue } from 'motion/react'
import { layers, type Lang } from '@/lib/content'

type LayerStackProps = {
  /** Distance between layers in px; the scroll story pulls them apart. */
  spread: MotionValue<number>
  /** Index into `layers` (0 = interface on top) or -1 when no layer is singled out. */
  active: number
  lang: Lang
}

// Drawn bottom-up so the interface layer sits on top of the pile.
const order = [...layers].reverse()

/** An isometric pile of the four layers. Tilts toward the mouse, drifts on its own on touch screens. */
export function LayerStack({ spread, active, lang }: LayerStackProps) {
  const reduced = useReducedMotion()
  const tiltX = useSpring(56, { stiffness: 70, damping: 18 })
  const tiltZ = useSpring(-42, { stiffness: 70, damping: 18 })

  useEffect(() => {
    if (reduced) return
    if (matchMedia('(pointer: fine)').matches) {
      const onMove = (event: PointerEvent) => {
        tiltZ.set(-42 + (event.clientX / innerWidth - 0.5) * 18)
        tiltX.set(56 - (event.clientY / innerHeight - 0.5) * 14)
      }
      window.addEventListener('pointermove', onMove)
      return () => window.removeEventListener('pointermove', onMove)
    }
    const drift = animate(tiltZ, [-48, -34], { duration: 7, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' })
    return () => drift.stop()
  }, [reduced, tiltX, tiltZ])

  return (
    <div className="stack" aria-hidden="true">
      <motion.div className="stack-rig" style={{ rotateX: tiltX, rotateZ: tiltZ }}>
        {order.map((layer, position) => (
          <Slab key={layer.id} position={position} spread={spread} layerIndex={layers.indexOf(layer)} active={active} label={layer.name[lang]} tools={layer.tools} />
        ))}
      </motion.div>
    </div>
  )
}

type SlabProps = { position: number; spread: MotionValue<number>; layerIndex: number; active: number; label: string; tools: string[] }

function Slab({ position, spread, layerIndex, active, label, tools }: SlabProps) {
  const z = useTransform(spread, (gap) => position * gap)
  const isActive = active === layerIndex
  const dimmed = active >= 0 && !isActive
  return (
    <motion.div className="slab-pos" style={{ z }}>
      <motion.div className={`slab slab-${layers[layerIndex].id}`} data-active={isActive || undefined}
        animate={{ z: isActive ? 46 : 0, opacity: dimmed ? 0.28 : 1 }}
        transition={{ type: 'spring', stiffness: 160, damping: 20 }}>
        {layerIndex === 0 ? (
          <Image src="/work/b2b.png" alt="" fill sizes="(max-width: 768px) 80vw, 520px" className="slab-shot" priority />
        ) : (
          <span className="slab-pattern" />
        )}
        <span className="slab-label">{label}</span>
        <span className="slab-tools">{tools.slice(0, 3).join('  ')}</span>
      </motion.div>
    </motion.div>
  )
}
