'use client'

import { useEffect } from 'react'
import { animate, motion, useReducedMotion, useSpring, useTransform, type MotionValue } from 'motion/react'
import { layers, type Lang } from '@/lib/content'

type LayerStackProps = {
  /** Distance between layers in px; the scroll story pulls them apart. */
  spread: MotionValue<number>
  /** Index into `layers` (0 = interface on top) or -1 when no layer is singled out. */
  active: number
  lang: Lang
}

const packets = [
  { x: 30, y: 38, dir: 'down', delay: 0 },
  { x: 62, y: 30, dir: 'up', delay: 0.8 },
  { x: 48, y: 64, dir: 'down', delay: 1.5 },
  { x: 72, y: 58, dir: 'up', delay: 2.2 },
]

const requests = ['GET /orders 200 · 12ms', 'POST /invoice 201 · 48ms', 'PUT /stock 200 · 9ms', 'GET /customers 200 · 15ms', 'POST /whatsapp 202 · 31ms', 'GET /reports 200 · 22ms']

/** A small live drawing per layer: a dashboard, a request log, a table, a rack. */
function SlabScene({ id }: { id: string }) {
  if (id === 'ui') return (
    <span className="scene-ui">
      <span className="ui-bar"><i /><i /><i /></span>
      <span className="ui-kpis"><b>₺3,26M</b><b>1.204</b><b>%98</b></span>
      <span className="ui-chart">{[42, 64, 38, 80, 56, 92, 70, 86].map((h, i) => <i key={i} style={{ '--h': `${h}%`, animationDelay: `${i * 0.12}s` } as never} />)}</span>
    </span>
  )
  if (id === 'api') return (
    <span className="scene-api"><span className="api-roll">{[...requests, ...requests].map((line, i) => <code key={i}>{line}</code>)}</span></span>
  )
  if (id === 'data') return (
    <span className="scene-data">{Array.from({ length: 6 }, (_, i) => <span key={i} className="data-row" style={{ animationDelay: `${i * 0.5}s` }}><i /><i /><i /></span>)}</span>
  )
  return (
    <span className="scene-infra">{Array.from({ length: 4 }, (_, i) => <span key={i} className="rack"><i style={{ animationDelay: `${i * 0.3}s` }} /><i style={{ animationDelay: `${i * 0.3 + 0.6}s` }} /><em /></span>)}</span>
  )
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
      <motion.div className="stack-rig" style={{ rotateX: tiltX, rotateZ: tiltZ, '--gap': spread } as never}>
        {order.map((layer, position) => (
          <Slab key={layer.id} position={position} spread={spread} layerIndex={layers.indexOf(layer)} active={active} label={layer.name[lang]} tools={layer.tools} />
        ))}
        {/* Requests rise from the interface to the infrastructure and answers come back down. */}
        {!reduced && packets.map((packet, index) => (
          <span key={index} className={`packet packet-${packet.dir}`} style={{ left: `${packet.x}%`, top: `${packet.y}%`, animationDelay: `${packet.delay}s` }} />
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
        <SlabScene id={layers[layerIndex].id} />
        <span className="slab-label">{label}</span>
        <span className="slab-tools">{tools.slice(0, 3).join('  ')}</span>
      </motion.div>
    </motion.div>
  )
}
