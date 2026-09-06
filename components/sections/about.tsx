'use client'

import { useSite } from '@/components/providers'
import { Reveal, SectionHeading } from '@/components/ui/reveal'
import { stats } from '@/lib/content'
import { Code2, Server, Smartphone, MonitorCog } from 'lucide-react'

const pillars = [
    {
        icon: Code2,
        tr: { title: 'Web', desc: 'Next.js ve TypeScript ile portal, panel ve kurumsal siteler.' },
        en: { title: 'Web', desc: 'Portals, dashboards and corporate sites with Next.js and TypeScript.' },
    },
    {
        icon: Smartphone,
        tr: { title: 'Mobil', desc: 'Expo ile saha ekiplerinin gerçekten kullandığı uygulamalar.' },
        en: { title: 'Mobile', desc: 'Expo apps that field teams actually use every day.' },
    },
    {
        icon: MonitorCog,
        tr: { title: 'Masaüstü', desc: 'Electron + NSIS, otomatik güncelleme ve donanım bağlı lisanslama.' },
        en: { title: 'Desktop', desc: 'Electron + NSIS, auto-update and hardware-bound licensing.' },
    },
    {
        icon: Server,
        tr: { title: 'Sistem', desc: 'Windows Server, Active Directory, Hyper-V, SQL Server yönetimi.' },
        en: { title: 'Systems', desc: 'Windows Server, Active Directory, Hyper-V and SQL Server administration.' },
    },
]

export function About() {
    const { t, lang } = useSite()

    return (
        <section
            id="about"
            className="relative scroll-mt-24 py-24 md:py-32">
            <div className="grid-bg mask-fade-b pointer-events-none absolute inset-0 -z-10 opacity-40" />
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                <SectionHeading
                    eyebrow={t.about.eyebrow}
                    title={t.about.title}
                />

                <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
                    <Reveal className="text-muted-foreground space-y-5 text-base leading-relaxed md:text-lg">
                        <p>{t.about.p1}</p>
                        <p>{t.about.p2}</p>
                        <p className="text-foreground font-medium">{t.about.p3}</p>
                    </Reveal>

                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        {pillars.map((pillar, i) => {
                            const copy = lang === 'tr' ? pillar.tr : pillar.en
                            const Icon = pillar.icon
                            return (
                                <Reveal
                                    key={copy.title}
                                    delay={i * 0.06}>
                                    <div className="bg-card/40 hover:border-brand-b/40 group h-full rounded-2xl border p-5 backdrop-blur-sm transition-colors">
                                        <Icon className="text-brand-b size-5" />
                                        <h3 className="mt-4 text-base font-semibold">{copy.title}</h3>
                                        <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">{copy.desc}</p>
                                    </div>
                                </Reveal>
                            )
                        })}
                    </div>
                </div>

                <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border md:grid-cols-4">
                    {stats.map((stat, i) => (
                        <Reveal
                            key={stat.value + i}
                            delay={i * 0.06}
                            className="bg-background">
                            <div className="p-6 md:p-8">
                                <p className="text-gradient text-3xl font-semibold md:text-4xl">{stat.value}</p>
                                <p className="text-muted-foreground mt-2 text-sm">{lang === 'tr' ? stat.tr : stat.en}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
