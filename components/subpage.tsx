'use client'

import { Header, Footer } from '@/components/chrome'
import { Work } from '@/components/work'
import { About, Contact, Stats, ToolBelt } from '@/components/sections'

/** Stand-alone pages behind the header links, so moving between sections never scrolls through the pinned scenes. */
export function Subpage({ kind }: { kind: 'work' | 'about' | 'contact' }) {
  return (
    <>
      <Header />
      <main id="main" className="subpage">
        {kind === 'work' && <Work heading="h1" />}
        {kind === 'about' && <><About heading="h1" /><Stats /><ToolBelt /></>}
        {kind === 'contact' && <Contact heading="h1" />}
      </main>
      <Footer />
    </>
  )
}
