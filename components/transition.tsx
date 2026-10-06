'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { motion, useReducedMotion } from 'motion/react'
import { LogoMark } from '@/components/logo'

/*
  Page changes run behind a curtain: it rises over the old page, the route swaps
  while the screen is covered, then it lifts off the new page. Nothing from the
  two pages is ever on screen at the same time.
*/
type Phase = 'idle' | 'cover' | 'reveal'
const TransitionContext = createContext<(href: string) => void>(() => {})
const cover = 0.5

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const reduced = useReducedMotion()
  const [phase, setPhase] = useState<Phase>('idle')
  const target = useRef<string | null>(null)

  const go = useCallback((href: string) => {
    const path = href.split('#')[0] || '/'
    if (reduced || path === pathname) { router.push(href); return }
    target.current = path
    setPhase('cover')
    setTimeout(() => router.push(href), cover * 1000)
  }, [pathname, reduced, router])

  // The new route has rendered under the curtain: lift it.
  useEffect(() => {
    if (target.current && pathname === target.current) {
      target.current = null
      window.scrollTo(0, 0)
      const frame = requestAnimationFrame(() => setPhase('reveal'))
      return () => cancelAnimationFrame(frame)
    }
  }, [pathname])

  return (
    <TransitionContext.Provider value={go}>
      {children}
      {phase !== 'idle' && (
        <motion.div className="curtain" aria-hidden="true"
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          animate={{ clipPath: phase === 'cover' ? 'inset(0% 0 0 0)' : 'inset(0 0 100% 0)' }}
          transition={{ duration: cover, ease: [0.76, 0, 0.24, 1] }}
          onAnimationComplete={() => { if (phase === 'reveal') setPhase('idle') }}>
          <motion.span className="curtain-mark" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: phase === 'cover' ? 1 : 0, scale: 1 }} transition={{ duration: 0.3 }}>
            <LogoMark size={64} />
          </motion.span>
        </motion.div>
      )}
    </TransitionContext.Provider>
  )
}

/** A link that changes pages behind the curtain. Modified clicks (new tab and so on) keep the browser's default. */
export function PageLink({ href, onClick, children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: ReactNode }) {
  const go = useContext(TransitionContext)
  const handle = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    go(href)
  }
  return <a href={href} onClick={handle} {...rest}>{children}</a>
}
