'use client'

import { useSite } from '@/components/providers'
import { Reveal, SectionHeading } from '@/components/ui/reveal'
import { Button } from '@/components/ui/button'
import { cvFiles } from '@/lib/content'
import { ArrowDownToLine, FileText } from 'lucide-react'

export function CV() {
    const { t, lang } = useSite()

    return (
        <section
            id="cv"
            className="scroll-mt-24 py-24 md:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                <div className="relative overflow-hidden rounded-[2rem] border p-8 md:p-14">
                    <div className="from-brand-a/12 via-brand-b/8 pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br to-transparent" />
                    <div className="grid-bg pointer-events-none absolute inset-0 -z-10 opacity-30" />

                    <SectionHeading
                        eyebrow={t.cv.eyebrow}
                        title={t.cv.title}
                        lead={t.cv.lead}
                    />

                    <div className="mt-10 grid gap-3 sm:grid-cols-2">
                        {cvFiles.map((cv, i) => (
                            <Reveal
                                key={cv.file}
                                delay={i * 0.05}>
                                <div className="bg-background/60 flex items-center justify-between gap-4 rounded-2xl border p-4 backdrop-blur-sm">
                                    <div className="flex min-w-0 items-center gap-3">
                                        <span className="bg-secondary/70 grid size-10 shrink-0 place-items-center rounded-xl border">
                                            <FileText className="text-brand-b size-4" />
                                        </span>
                                        <p className="text-sm font-medium leading-snug">{lang === 'tr' ? cv.labelTr : cv.labelEn}</p>
                                    </div>
                                    <Button
                                        asChild
                                        size="sm"
                                        variant="outline"
                                        className="shrink-0 rounded-full">
                                        <a
                                            href={cv.file}
                                            download>
                                            <ArrowDownToLine className="mr-1.5 size-4" />
                                            PDF
                                        </a>
                                    </Button>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
