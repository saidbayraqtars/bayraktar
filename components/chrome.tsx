'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useSite } from '@/components/providers'
import { Icon } from '@/components/icons'
import { LogoMark, Wordmark } from '@/components/logo'
import { profile } from '@/lib/content'
import { PageLink } from '@/components/transition'

/** Fixed header: hides while scrolling down, comes back on the way up. Full-screen menu on small screens. */
export function Header() {
  const { t, theme, toggleLang, toggleTheme } = useSite()
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useMotionValueEvent(scrollY, 'change', (value) => {
    const previous = scrollY.getPrevious() ?? 0
    setSolid(value > 24)
    setHidden(value > 320 && value > previous + 4 ? true : value < previous - 4 ? false : hidden)
  })

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const links = [
    { href: '/isler', label: t.nav.work },
    { href: '/hakkimda', label: t.nav.about },
    { href: '/iletisim', label: t.nav.contact },
  ]

  return (
    <>
      <a href="#main" className="skip-link">{t.skip}</a>
      <motion.header className="header" data-solid={solid || open || undefined}
        animate={{ y: hidden && !open ? '-110%' : '0%' }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
        <PageLink href="/" className="header-logo" aria-label="Said Bayraktar" onClick={() => setOpen(false)}><Wordmark caption={t.role} /></PageLink>
        <nav className="header-nav" aria-label={t.nav.menu}>
          {links.map((link) => <PageLink key={link.href} href={link.href} aria-current={pathname === link.href ? 'page' : undefined}>{link.label}</PageLink>)}
        </nav>
        <div className="header-tools">
          <button type="button" className="tool" onClick={toggleLang} aria-label={t.language}>{t.langShort}</button>
          <button type="button" className="tool" onClick={toggleTheme} aria-label={t.theme}><Icon name={theme === 'dark' ? 'sun' : 'moon'} /></button>
          <button type="button" className="tool tool-menu" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="menu" aria-label={open ? t.nav.close : t.nav.menu}>
            <span className="burger" data-open={open || undefined}><i /><i /></span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div id="menu" className="menu" role="dialog" aria-modal="true" aria-label={t.nav.menu}
            initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}>
            <nav className="menu-links">
              {links.map((link, index) => (
                <motion.span key={link.href} className="menu-link"
                  initial={{ y: '110%' }} animate={{ y: '0%' }} exit={{ y: '-110%' }}
                  transition={{ duration: 0.6, delay: 0.15 + index * 0.07, ease: [0.16, 1, 0.3, 1] }}>
                  <PageLink href={link.href} onClick={() => setOpen(false)}>{link.label}</PageLink>
                </motion.span>
              ))}
            </nav>
            <motion.a className="menu-mail" href={`mailto:${profile.email}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>{profile.email}</motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export function Footer() {
  const { t } = useSite()
  return (
    <footer className="footer">
      <div className="footer-mark" aria-hidden="true"><LogoMark size={120} /></div>
      <p className="footer-name">Said Bayraktar</p>
      <div className="footer-row">
        <span>© {new Date().getFullYear()} Said Bayraktar. {t.footer.rights}</span>
        <span className="footer-links">
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="#main">{t.footer.top}</a>
        </span>
      </div>
    </footer>
  )
}
