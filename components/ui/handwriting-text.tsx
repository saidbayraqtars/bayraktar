'use client'

import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import type { Font } from 'opentype.js'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

export interface HandwritingTextProps {
  text?: string
  words?: string[]
  interval?: number
  fontUrl?: string
  duration?: number
  delay?: number
  strokeWidth?: number
  fill?: boolean
  height?: string
  className?: string
  paused?: boolean
}
const fontCache = new Map<string, Promise<Font>>()
function loadFont(url: string) {
  let pending = fontCache.get(url)
  if (!pending) {
    pending = Promise.all([
      import('opentype.js'),
      fetch(url).then((response) => {
        if (!response.ok) throw new Error('Font unavailable')
        return response.arrayBuffer()
      }),
    ]).then(([opentype, buffer]) => opentype.parse(buffer))
    fontCache.set(url, pending)
    pending.catch(() => fontCache.delete(url))
  }
  return pending
}

/** Local font + lazy npm import, accessible fallback, and normalized SVG strokes. */
export function HandwritingText({
  text, words, interval = 4000, fontUrl = '/fonts/Kalam-Regular.ttf', duration = 1.5,
  delay = 0.05, strokeWidth = 1.1, fill = true, height = '1.15em', className, paused = false,
}: HandwritingTextProps) {
  const [index, setIndex] = useState(0)
  const [loaded, setLoaded] = useState<{ url: string; font: Font } | null>(null)
  const reduced = useReducedMotion()
  const count = words?.length ?? 0
  const current = count ? words![index % count] : text ?? ''
  useEffect(() => {
    if (count < 2 || reduced || paused) return
    const timer = window.setInterval(() => {
      if (!document.hidden) setIndex((value) => value + 1)
    }, Math.max(interval, (delay + duration + 1) * 1000))
    return () => window.clearInterval(timer)
  }, [count, interval, reduced, duration, delay, paused])
  useEffect(() => {
    let active = true
    loadFont(fontUrl).then((font) => { if (active) setLoaded({ url: fontUrl, font }) }).catch(() => {})
    return () => { active = false }
  }, [fontUrl])
  const geometry = useMemo(() => {
    if (!loaded || loaded.url !== fontUrl || !current.trim()) return null
    try {
      const path = loaded.font.getPath(current, 0, 100, 100)
      const box = path.getBoundingBox()
      const full = path.toPathData(2)
      return { full, contours: full.split(/(?=M)/).filter((part) => part.trim().length > 1),
        x: box.x1 - 9, y: box.y1 - 9, width: box.x2 - box.x1 + 18, height: box.y2 - box.y1 + 18 }
    } catch { return null }
  }, [loaded, fontUrl, current])
  if (!geometry) return <span className={cn('handwriting-fallback', className)}>{current}</span>
  return (
    <svg key={current} className={cn('handwriting', className)} role="img" aria-label={current} data-paused={paused || undefined}
      viewBox={`${geometry.x} ${geometry.y} ${geometry.width} ${geometry.height}`}
      style={{ height, width: `calc(${height} * ${geometry.width / geometry.height})` }}>
      {fill && <path d={geometry.full} fill="currentColor" className={reduced ? undefined : 'handwriting-fill'}
        style={{ animationDelay: `${delay + duration * 0.72}s` }} />}
      {geometry.contours.map((path, i) => (
        <path key={i} d={path} fill="none" stroke="currentColor" strokeWidth={strokeWidth}
          strokeLinecap="round" strokeLinejoin="round" pathLength={1}
          className={reduced ? undefined : 'handwriting-stroke'}
          style={{ '--pen-duration': `${duration / geometry.contours.length * 2.4}s`,
            '--pen-delay': `${delay + i / geometry.contours.length * duration}s` } as CSSProperties} />
      ))}
    </svg>
  )
}
export default HandwritingText
