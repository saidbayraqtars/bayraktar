'use client'

import { Children, Fragment, forwardRef, useEffect, useRef, type ComponentPropsWithoutRef } from 'react'
import { ReactLenis } from 'lenis/react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

/** The supplied sticky-section demo, adapted to wrap real page content. */
const SmoothScroll = forwardRef<HTMLElement, ComponentPropsWithoutRef<'main'>>(
  ({ children, ...props }, ref) => (
    <ReactLenis root options={{ autoRaf: true, anchors: true, lerp: 0.085, smoothWheel: true, respectReducedMotion: true }}>
      <main ref={ref} {...props}>{children}</main>
    </ReactLenis>
  ),
)
SmoothScroll.displayName = 'SmoothScroll'
export default SmoothScroll

/**
 * Shared sticky container keeps each full-height panel pinned while its successor
 * slides over it. Flow markers stay untransformed so scrolling backwards is exact.
 */
export function ScrollStack({ children, className, ...props }: ComponentPropsWithoutRef<'div'>) {
  const container = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  useEffect(() => {
    const root = container.current
    if (!root) return
    const panels = Array.from(root.querySelectorAll<HTMLElement>('.project-stage'))
    const markers = Array.from(root.querySelectorAll<HTMLElement>('[data-scroll-marker]'))
    if (!panels.length) return
    if (reduced) {
      panels.forEach((panel) => panel.style.removeProperty('--covered'))
      return
    }
    let frame = 0
    const update = () => {
      frame = 0
      const height = window.innerHeight
      const tops = markers.map((marker) => marker.getBoundingClientRect().top)
      const dock = parseFloat(getComputedStyle(panels[0]).top) || 90
      panels.forEach((panel, index) => {
        const next = tops[index + 1]
        const covered = next === undefined ? 0 : Math.min(1, Math.max(0, (height - next) / Math.max(1, height - dock)))
        panel.style.setProperty('--covered', covered.toFixed(4))
      })
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    const observer = new ResizeObserver(schedule)
    observer.observe(root)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    schedule()
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      cancelAnimationFrame(frame)
    }
  }, [reduced])
  return <div ref={container} className={cn('scroll-stack', className)} {...props}>
    {Children.map(children, (child, index) => <Fragment key={index}><div data-scroll-marker aria-hidden="true" />{child}</Fragment>)}
  </div>
}
