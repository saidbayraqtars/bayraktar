'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUp, ArrowUpRight, Download, Github, Linkedin, Menu, Moon, Sun } from 'lucide-react'
import { useSite } from '@/components/providers'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { portfolio, profile } from '@/lib/content'

export function Wordmark() {
  return <span className="wordmark"><span className="wordmark-icon" aria-hidden="true">s<span>b</span><i /></span><span>Said Bayraktar<span className="wordmark-caption">Full Stack Developer</span></span></span>
}

export function SiteHeader({ inner = false }: { inner?: boolean }) {
  const { lang, toggleLang, theme, toggleTheme } = useSite()
  const t = portfolio[lang].nav
  const [open, setOpen] = useState(false)
  const prefix = inner ? '/' : ''
  const links = [{ id: 'projects', text: t.projects }, { id: 'services', text: t.services }, { id: 'about', text: t.about }]
  return <>
    <a href="#main-content" className="skip-link">{t.skip}</a>
    <header className="site-header" id="top">
      <div className="shell header-inner">
        <Link href="/" aria-label={`Said Bayraktar · ${t.home}`} className="logo-link"><Wordmark /></Link>
        <nav className="desktop-nav" aria-label={t.menuTitle}>
          {links.map((link) => <a href={`${prefix}#${link.id}`} key={link.id}>{link.text}</a>)}
        </nav>
        <div className="header-actions">
          <Button variant="ghost" size="icon" aria-label={t.theme} onClick={toggleTheme}>{theme === 'light' ? <Moon /> : <Sun />}</Button>
          <Button variant="ghost" size="icon" aria-label={t.language} onClick={toggleLang} className="language-button">{lang === 'tr' ? 'EN' : 'TR'}</Button>
          <Button asChild variant="outline" className="header-cv"><a href={`${prefix}#cv`}><Download data-icon="inline-start" />{t.cv}</a></Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild><Button size="icon" variant="outline" className="mobile-menu-trigger" aria-label={t.menu}><Menu /></Button></SheetTrigger>
            <SheetContent data-lenis-prevent className="mobile-menu" closeLabel={t.close}>
              <SheetHeader><SheetTitle>{t.menuTitle}</SheetTitle><SheetDescription>Said Bayraktar · Full Stack Developer</SheetDescription></SheetHeader>
              <nav aria-label={t.menuTitle} className="mobile-nav">
                {[...links, { id: 'cv', text: t.cv }, { id: 'contact', text: t.contact }].map((link) => <a key={link.id} onClick={() => setOpen(false)} href={`${prefix}#${link.id}`}>{link.text}<ArrowUpRight /></a>)}
              </nav>
              <a className="mobile-menu-email" href={`mailto:${profile.email}`}>{profile.email}</a>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  </>
}

export function SiteFooter() {
  const { lang } = useSite()
  const t = portfolio[lang].footer
  return <footer className="site-footer"><div className="shell">
    <div className="footer-top"><Link href="/" aria-label={portfolio[lang].nav.home}><Wordmark /></Link><p>{t.line}</p><a href="#top" className="back-top">{t.top}<ArrowUp /></a></div>
    <div className="footer-bottom"><p>© {new Date().getFullYear()} Said Bayraktar. {t.rights}</p><span>{t.made}</span><div><a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a><a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a></div></div>
  </div></footer>
}
