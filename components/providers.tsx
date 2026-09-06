'use client'

import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from 'react'
import { dict, type Dict, type Lang } from '@/lib/content'

type Theme = 'light' | 'dark'
type SiteContextValue = { lang: Lang; setLang: (lang: Lang) => void; toggleLang: () => void; t: Dict; theme: Theme; toggleTheme: () => void }
const SiteContext = createContext<SiteContextValue | null>(null)
const event = 'sb-preferences'
const volatile = new Map<string, string>()
function subscribe(callback: () => void) {
  window.addEventListener('storage', callback)
  window.addEventListener(event, callback)
  return () => { window.removeEventListener('storage', callback); window.removeEventListener(event, callback) }
}
function read(key: string, fallback: string) {
  if (volatile.has(key)) return volatile.get(key)!
  try { return localStorage.getItem(key) ?? fallback } catch { return fallback }
}
function write(key: string, value: string) {
  try { localStorage.setItem(key, value); volatile.delete(key) } catch { volatile.set(key, value) }
  window.dispatchEvent(new Event(event))
}
export function SiteProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, () => read('sb-lang', 'tr') === 'en' ? 'en' : 'tr', () => 'tr') as Lang
  const theme = useSyncExternalStore(subscribe, () => read('sb-theme', 'dark') === 'light' ? 'light' : 'dark', () => 'dark') as Theme
  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.style.colorScheme = theme
  }, [lang, theme])
  return <SiteContext.Provider value={{ lang, theme, setLang: (value) => write('sb-lang', value),
    toggleLang: () => write('sb-lang', lang === 'tr' ? 'en' : 'tr'),
    toggleTheme: () => write('sb-theme', theme === 'light' ? 'dark' : 'light'), t: dict[lang] as Dict }}>
    {children}
  </SiteContext.Provider>
}
export function useSite() {
  const context = useContext(SiteContext)
  if (!context) throw new Error('useSite requires SiteProvider')
  return context
}

