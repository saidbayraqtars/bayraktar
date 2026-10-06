'use client'

import { useState } from 'react'
import { useMotionValueEvent, type MotionValue } from 'motion/react'
import type { Lang } from '@/lib/content'

/* Shared timing helpers for the product stories (components/demos.tsx and demo-*.tsx). */
export const clamp = (value: number) => Math.min(1, Math.max(0, value))
export const ease = (value: number) => 1 - Math.pow(1 - value, 3)
export const span = (p: number, from: number, to: number) => clamp((p - from) / (to - from))
export const stepAt = (index: number) => 0.2 + (index * 0.8) / 3

/** Re-renders with the current scroll position; the stories are small enough that this stays cheap. */
export function useProgress(progress: MotionValue<number>, reduced: boolean, still: number) {
  const [value, setValue] = useState(() => (reduced ? still : progress.get()))
  useMotionValueEvent(progress, 'change', (next) => { if (!reduced) setValue(next) })
  return reduced ? still : value
}

export const tl = (n: number, lang: Lang) => '₺' + Math.round(n).toLocaleString(lang === 'tr' ? 'tr-TR' : 'en-US')

