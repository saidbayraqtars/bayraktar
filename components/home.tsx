'use client'

import { useCallback, useState } from 'react'
import { ReactLenis } from 'lenis/react'
import { useReducedMotion } from 'motion/react'
import { Header, Footer } from '@/components/chrome'
import { Intro } from '@/components/intro'
import { Opening } from '@/components/opening'
import { Work } from '@/components/work'
import { About, Contact, Stats, ToolBelt } from '@/components/sections'

export function Home() {
  const reduced = useReducedMotion()
  const [ready, setReady] = useState(false)
  const onIntroDone = useCallback(() => setReady(true), [])
  const page = (
    <>
      <Header />
      <main id="main">
        <Opening ready={ready} />
        <Work />
        <Stats />
        <ToolBelt />
        <About />
        <Contact />
      </main>
      <Footer />
      <Intro onDone={onIntroDone} />
    </>
  )
  // Smooth scrolling makes the pinned scenes glide; touch devices keep native scrolling.
  return reduced ? page : <ReactLenis root options={{ lerp: 0.1, anchors: { offset: -72 } }}>{page}</ReactLenis>
}
