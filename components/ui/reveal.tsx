'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

export function Reveal({
    children,
    className,
    delay = 0,
    y = 24,
}: {
    children: React.ReactNode
    className?: string
    delay?: number
    y?: number
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
            className={className}>
            {children}
        </motion.div>
    )
}

export function SectionHeading({
    eyebrow,
    title,
    lead,
    className,
}: {
    eyebrow: string
    title: string
    lead?: string
    className?: string
}) {
    return (
        <Reveal className={cn('max-w-3xl', className)}>
            <p className="text-brand-b flex items-center gap-2 text-sm font-medium uppercase tracking-[0.18em]">
                <span className="from-brand-a to-brand-b h-px w-8 bg-gradient-to-r" />
                {eyebrow}
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl">{title}</h2>
            {lead ? <p className="text-muted-foreground mt-4 text-lg text-balance">{lead}</p> : null}
        </Reveal>
    )
}
