'use client'

import { useSite } from '@/components/providers'
import { Reveal, SectionHeading } from '@/components/ui/reveal'
import { skillGroups } from '@/lib/content'

export function Skills() {
    const { t, lang } = useSite()

    return (
        <section
            id="skills"
            className="scroll-mt-24 py-24 md:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                <SectionHeading
                    eyebrow={t.skills.eyebrow}
                    title={t.skills.title}
                    lead={t.skills.lead}
                />

                <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {skillGroups.map((group, i) => (
                        <Reveal
                            key={group.en}
                            delay={i * 0.05}>
                            <div className="group relative h-full overflow-hidden rounded-2xl border p-6">
                                <div className="from-brand-a/10 pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                <h3 className="text-sm font-semibold uppercase tracking-wider">
                                    {lang === 'tr' ? group.tr : group.en}
                                </h3>
                                <ul className="mt-5 flex flex-wrap gap-2">
                                    {group.items.map((item) => (
                                        <li
                                            key={item}
                                            className="bg-secondary/60 text-secondary-foreground rounded-full border px-3 py-1 text-xs">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
