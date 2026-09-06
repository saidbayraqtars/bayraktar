import SmoothScroll from '@/components/ui/smooth-scroll'
import { SiteHeader, SiteFooter } from '@/components/site-header'
import { PortfolioHero } from '@/components/sections/portfolio-hero'
import { ProjectShowcase, ProjectArchive } from '@/components/sections/project-showcase'
import { Services } from '@/components/sections/services'
import { ProfileSection } from '@/components/sections/profile-section'
import { ProjectContact } from '@/components/sections/project-contact'

export default function Home() {
  return <>
    <SiteHeader />
    <SmoothScroll id="main-content">
      <PortfolioHero />
      <ProjectShowcase />
      <Services />
      <ProjectArchive />
      <ProfileSection />
      <ProjectContact />
    </SmoothScroll>
    <SiteFooter />
  </>
}

