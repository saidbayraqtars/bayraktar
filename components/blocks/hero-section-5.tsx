'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import { cn } from '@/lib/utils'
import { profile } from '@/lib/content'
import { useSite } from '@/components/providers'
import { Menu, X, ChevronRight, ArrowDownToLine, Github, Linkedin, Moon, Sun, Languages } from 'lucide-react'
import { useScroll, motion } from 'motion/react'

const techLogos = [
    { name: 'React', slug: 'react', height: 'h-6' },
    { name: 'Next.js', slug: 'nextdotjs', height: 'h-5' },
    { name: 'TypeScript', slug: 'typescript', height: 'h-5' },
    { name: 'Node.js', slug: 'nodedotjs', height: 'h-6' },
    { name: 'PostgreSQL', slug: 'postgresql', height: 'h-6' },
    { name: 'Prisma', slug: 'prisma', height: 'h-5' },
    { name: 'Tailwind CSS', slug: 'tailwindcss', height: 'h-4' },
    { name: 'Electron', slug: 'electron', height: 'h-6' },
    { name: 'Expo', slug: 'expo', height: 'h-5' },
    { name: 'Docker', slug: 'docker', height: 'h-5' },
    { name: 'Vercel', slug: 'vercel', height: 'h-5' },
    { name: 'Git', slug: 'git', height: 'h-5' },
]

export function HeroSection() {
    const { t } = useSite()

    return (
        <>
            <HeroHeader />
            <section id="top">
                <div className="py-24 md:pb-32 lg:pb-36 lg:pt-72">
                    <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-6 lg:block lg:px-12">
                        <div className="mx-auto max-w-lg text-center lg:ml-0 lg:max-w-full lg:text-left">
                            <span className="bg-background/60 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs backdrop-blur-md">
                                <span className="relative flex size-2">
                                    <span className="bg-brand-b absolute inline-flex size-full animate-ping rounded-full opacity-60" />
                                    <span className="bg-brand-b relative inline-flex size-2 rounded-full" />
                                </span>
                                {t.hero.badge}
                            </span>

                            <h1 className="mt-8 max-w-2xl text-balance text-5xl md:text-6xl lg:mt-10 xl:text-7xl">
                                {t.hero.title1} <span className="text-gradient">{t.hero.title2}</span> {t.hero.title3}
                            </h1>
                            <p className="text-muted-foreground mt-8 max-w-2xl text-balance text-lg">{t.hero.lead}</p>

                            <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
                                <Button
                                    asChild
                                    size="lg"
                                    className="h-12 rounded-full pl-5 pr-3 text-base">
                                    <Link href="#projects">
                                        <span className="text-nowrap">{t.hero.cta}</span>
                                        <ChevronRight className="ml-1" />
                                    </Link>
                                </Button>
                                <Button
                                    key={2}
                                    asChild
                                    size="lg"
                                    variant="ghost"
                                    className="h-12 rounded-full px-5 text-base hover:bg-zinc-950/5 dark:hover:bg-white/5">
                                    <Link href="#cv">
                                        <ArrowDownToLine className="mr-1 size-4" />
                                        <span className="text-nowrap">{t.hero.cta2}</span>
                                    </Link>
                                </Button>
                            </div>

                            <div className="text-muted-foreground mt-10 flex items-center justify-center gap-5 text-sm lg:justify-start">
                                <a
                                    href={profile.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:text-foreground inline-flex items-center gap-2 duration-150">
                                    <Github className="size-4" /> GitHub
                                </a>
                                <a
                                    href={profile.linkedin}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:text-foreground inline-flex items-center gap-2 duration-150">
                                    <Linkedin className="size-4" /> LinkedIn
                                </a>
                                <span className="hidden sm:inline">{profile.location}</span>
                            </div>
                        </div>
                    </div>
                    <div className="aspect-[2/3] absolute inset-1 -z-10 overflow-hidden rounded-3xl border border-black/10 sm:aspect-video lg:rounded-[3rem] dark:border-white/5">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="size-full object-cover opacity-50 invert dark:opacity-35 dark:invert-0 dark:lg:opacity-75"
                            src="https://ik.imagekit.io/lrigu76hy/tailark/dna-video.mp4?updatedAt=1745736251477"></video>
                        <div className="from-background absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
                    </div>
                </div>
            </section>
            <section className="bg-background pb-2">
                <div className="group relative m-auto max-w-7xl px-6">
                    <div className="flex flex-col items-center md:flex-row">
                        <div className="md:max-w-44 md:border-r md:pr-6">
                            <p className="text-muted-foreground text-end text-sm">{t.hero.trusted}</p>
                        </div>
                        <div className="relative py-6 md:w-[calc(100%-11rem)]">
                            <InfiniteSlider
                                speedOnHover={20}
                                speed={40}
                                gap={112}>
                                {techLogos.map((logo) => (
                                    <div
                                        key={logo.slug}
                                        className="flex">
                                        <Image
                                            className={cn('mx-auto w-fit opacity-70 dark:invert', logo.height)}
                                            src={`https://cdn.simpleicons.org/${logo.slug}/000000`}
                                            alt={`${logo.name} logo`}
                                            width={120}
                                            height={28}
                                            unoptimized
                                        />
                                    </div>
                                ))}
                            </InfiniteSlider>

                            <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
                            <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>
                            <ProgressiveBlur
                                className="pointer-events-none absolute left-0 top-0 h-full w-20"
                                direction="left"
                                blurIntensity={1}
                            />
                            <ProgressiveBlur
                                className="pointer-events-none absolute right-0 top-0 h-full w-20"
                                direction="right"
                                blurIntensity={1}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

const HeroHeader = () => {
    const { t, toggleLang, theme, toggleTheme } = useSite()
    const [menuState, setMenuState] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)
    const { scrollYProgress } = useScroll()

    const menuItems = [
        { name: t.nav.about, href: '#about' },
        { name: t.nav.skills, href: '#skills' },
        { name: t.nav.work, href: '#work' },
        { name: t.nav.projects, href: '#projects' },
        { name: t.nav.contact, href: '#contact' },
    ]

    React.useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            setScrolled(latest > 0.02)
        })
        return () => unsubscribe()
    }, [scrollYProgress])

    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="group fixed z-20 w-full pt-2">
                <div
                    className={cn(
                        'mx-auto max-w-7xl rounded-3xl px-6 transition-all duration-300 lg:px-12',
                        scrolled && 'bg-background/50 backdrop-blur-2xl',
                    )}>
                    <motion.div
                        key={1}
                        className={cn(
                            'relative flex flex-wrap items-center justify-between gap-6 py-3 duration-200 lg:gap-0 lg:py-6',
                            scrolled && 'lg:py-4',
                        )}>
                        <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
                            <Link
                                href="#top"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                <Logo />
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className="group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>

                            <div className="hidden lg:block">
                                <ul className="flex gap-8 text-sm">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                onClick={() => setMenuState(false)}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <div className="flex items-center gap-1">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        aria-label="Toggle theme"
                                        onClick={toggleTheme}
                                        className="size-9 rounded-full">
                                        {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        aria-label="Change language"
                                        onClick={toggleLang}
                                        className="gap-1.5 rounded-full px-3">
                                        <Languages className="size-4" />
                                        <span className="text-xs font-medium">{t.lang}</span>
                                    </Button>
                                </div>
                                <Button
                                    asChild
                                    variant="outline"
                                    size="sm"
                                    className="rounded-full">
                                    <a
                                        href={profile.github}
                                        target="_blank"
                                        rel="noreferrer">
                                        <Github className="mr-1.5 size-4" />
                                        <span>GitHub</span>
                                    </a>
                                </Button>
                                <Button
                                    asChild
                                    size="sm"
                                    className="rounded-full">
                                    <Link href="#contact">
                                        <span>{t.nav.contact}</span>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </nav>
        </header>
    )
}

export const Logo = ({ className }: { className?: string }) => {
    return (
        <span className={cn('flex items-center gap-2.5', className)}>
            <svg
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-auto">
                <path
                    d="M3 0H5V18H3V0ZM13 0H15V18H13V0ZM18 3V5H0V3H18ZM0 15V13H18V15H0Z"
                    fill="url(#logo-gradient)"
                />
                <defs>
                    <linearGradient
                        id="logo-gradient"
                        x1="10"
                        y1="0"
                        x2="10"
                        y2="20"
                        gradientUnits="userSpaceOnUse">
                        <stop stopColor="#9B99FE" />
                        <stop
                            offset="1"
                            stopColor="#2BC8B7"
                        />
                    </linearGradient>
                </defs>
            </svg>
            <span className="text-sm font-semibold tracking-tight">Said Bayraktar</span>
        </span>
    )
}
