'use client'

import * as React from 'react'
import { useSite } from '@/components/providers'
import { Reveal, SectionHeading } from '@/components/ui/reveal'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/blocks/hero-section-5'
import { profile } from '@/lib/content'
import { Check, Copy, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react'

export function Contact() {
    const { t } = useSite()
    const [copied, setCopied] = React.useState(false)

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(profile.email)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch {
            /* clipboard unavailable */
        }
    }

    return (
        <section
            id="contact"
            className="scroll-mt-24 py-24 md:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
                    <div>
                        <SectionHeading
                            eyebrow={t.contact.eyebrow}
                            title={t.contact.title}
                            lead={t.contact.lead}
                        />

                        <Reveal
                            delay={0.1}
                            className="mt-10 flex flex-wrap gap-3">
                            <Button
                                asChild
                                size="lg"
                                className="h-12 rounded-full px-6">
                                <a href={`mailto:${profile.email}`}>
                                    <Mail className="mr-2 size-4" />
                                    {t.contact.mail}
                                </a>
                            </Button>
                            <Button
                                onClick={copyEmail}
                                variant="outline"
                                size="lg"
                                className="h-12 rounded-full px-6">
                                {copied ? <Check className="mr-2 size-4" /> : <Copy className="mr-2 size-4" />}
                                {copied ? t.contact.copied : t.contact.copy}
                            </Button>
                        </Reveal>
                    </div>

                    <Reveal
                        delay={0.15}
                        className="lg:pt-4">
                        <ul className="divide-border divide-y overflow-hidden rounded-3xl border">
                            <ContactRow
                                icon={<Mail className="size-4" />}
                                label={profile.email}
                                href={`mailto:${profile.email}`}
                            />
                            <ContactRow
                                icon={<Phone className="size-4" />}
                                label={profile.phone}
                                href={`tel:${profile.phone.replace(/\s/g, '')}`}
                            />
                            <ContactRow
                                icon={<Github className="size-4" />}
                                label={`github.com/${profile.githubUser}`}
                                href={profile.github}
                                external
                            />
                            <ContactRow
                                icon={<Linkedin className="size-4" />}
                                label="linkedin.com/in/said-bayraktar9"
                                href={profile.linkedin}
                                external
                            />
                            <ContactRow
                                icon={<MapPin className="size-4" />}
                                label={profile.location}
                            />
                        </ul>
                    </Reveal>
                </div>
            </div>
        </section>
    )
}

function ContactRow({
    icon,
    label,
    href,
    external,
}: {
    icon: React.ReactNode
    label: string
    href?: string
    external?: boolean
}) {
    const content = (
        <span className="hover:bg-card/60 flex items-center gap-4 px-6 py-5 transition-colors">
            <span className="text-brand-b">{icon}</span>
            <span className="text-sm md:text-base">{label}</span>
        </span>
    )

    return (
        <li>
            {href ? (
                <a
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noreferrer' : undefined}
                    className="block">
                    {content}
                </a>
            ) : (
                content
            )}
        </li>
    )
}

export function Footer() {
    const { t } = useSite()

    return (
        <footer className="border-t py-10">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row lg:px-12">
                <Logo />
                <p className="text-muted-foreground text-center text-xs sm:text-right">
                    © {new Date().getFullYear()} {profile.name}. {t.footer.rights}
                    <br className="sm:hidden" />
                    <span className="hidden sm:inline"> · </span>
                    {t.footer.built}
                </p>
            </div>
        </footer>
    )
}
