'use client'

import { useSite } from '@/components/providers'
import { Reveal, SectionHeading } from '@/components/ui/reveal'
import { education, experience } from '@/lib/content'
import { GraduationCap, MapPin } from 'lucide-react'

export function Experience() {
    const { t, lang } = useSite()

    return (
        <section
            id="work"
            className="scroll-mt-24 py-24 md:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                <SectionHeading
                    eyebrow={t.work.eyebrow}
                    title={t.work.title}
                />

                <div className="relative mt-14 lg:pl-8">
                    <div className="via-border absolute left-[7px] top-2 hidden h-full w-px bg-gradient-to-b from-transparent to-transparent lg:block" />

                    <div className="space-y-10">
                        {experience.map((job, i) => (
                            <Reveal
                                key={job.company}
                                delay={i * 0.08}>
                                <div className="relative">
                                    <span className="absolute -left-8 top-6 hidden size-[15px] items-center justify-center lg:flex">
                                        <span
                                            className={
                                                job.current
                                                    ? 'bg-brand-b size-2.5 rounded-full ring-4 ring-[color-mix(in_oklch,var(--brand-b)_25%,transparent)]'
                                                    : 'bg-muted-foreground/50 size-2.5 rounded-full'
                                            }
                                        />
                                    </span>

                                    <div className="bg-card/40 rounded-3xl border p-6 backdrop-blur-sm md:p-8">
                                        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                                            <div>
                                                <h3 className="text-xl font-semibold md:text-2xl">
                                                    {lang === 'tr' ? job.roleTr : job.roleEn}
                                                </h3>
                                                <p className="text-brand-b mt-1 text-sm font-medium">{job.company}</p>
                                            </div>
                                            <div className="text-muted-foreground text-right text-sm">
                                                <p className="font-mono">{lang === 'tr' ? job.periodTr : job.periodEn}</p>
                                                <p className="mt-1 inline-flex items-center gap-1">
                                                    <MapPin className="size-3" />
                                                    {job.location}
                                                </p>
                                            </div>
                                        </div>

                                        <ul className="mt-6 space-y-3">
                                            {(lang === 'tr' ? job.bulletsTr : job.bulletsEn).map((bullet, index) => (
                                                <li
                                                    key={index}
                                                    className="text-muted-foreground flex gap-3 text-sm leading-relaxed md:text-base">
                                                    <span className="bg-brand-a/60 mt-2 size-1.5 shrink-0 rounded-full" />
                                                    <span>{bullet}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="mt-6 flex flex-wrap gap-2">
                                            {job.stack.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="bg-secondary/60 rounded-full border px-2.5 py-1 text-xs">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>

                <Reveal className="mt-16">
                    <h3 className="inline-flex items-center gap-2 text-lg font-semibold">
                        <GraduationCap className="text-brand-b size-5" />
                        {t.work.education}
                    </h3>
                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                        {education.map((edu) => (
                            <div
                                key={edu.period}
                                className="rounded-2xl border p-6">
                                <p className="font-medium">{lang === 'tr' ? edu.degreeTr : edu.degreeEn}</p>
                                <p className="text-muted-foreground mt-1 text-sm">{lang === 'tr' ? edu.schoolTr : edu.schoolEn}</p>
                                <p className="text-muted-foreground/70 mt-3 font-mono text-xs">{edu.period}</p>
                                {(lang === 'tr' ? edu.noteTr : edu.noteEn) ? (
                                    <p className="text-muted-foreground mt-3 text-sm">{lang === 'tr' ? edu.noteTr : edu.noteEn}</p>
                                ) : null}
                            </div>
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    )
}
