'use client'

import { useState } from 'react'
import { ArrowDownToLine, ArrowUpRight, BriefcaseBusiness, Code2, FileText, Globe2, GraduationCap, Languages, Monitor, Server } from 'lucide-react'
import { useSite } from '@/components/providers'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { cvFiles, education, experience, portfolio, skillGroups, type Lang } from '@/lib/content'

export function ProfileSection() {
  const { lang } = useSite()
  const t = portfolio[lang].about
  const facts = [{ Icon: Code2, label: t.fact1 }, { Icon: Monitor, label: t.fact2 }, { Icon: Languages, label: t.fact3 }, { Icon: Globe2, label: t.fact4 }]
  return <section className="about-section section-pad" id="about"><div className="shell">
    <div className="about-grid"><div className="about-portrait">
      <div className="portrait-top"><span><i />{t.local}</span><ArrowUpRight /></div>
      <div className="monogram" aria-hidden="true">S<span>B</span><i>✳</i></div>
      <div className="portrait-bottom"><p>Said Bayraktar</p><span>Developer. Builder. Problem solver.</span></div>
    </div><div className="about-copy"><p className="eyebrow">{t.eyebrow}</p><h2>{t.title}</h2><p>{t.p1}</p><p>{t.p2}</p><p>{t.p3}</p><span className="personal-signature">{t.signature}</span></div></div>
    <div className="profile-facts">{facts.map(({ Icon, label }) => <div key={label}><Icon /><span>{label}</span></div>)}</div>
    <div className="background-grid"><div><div className="minor-heading"><BriefcaseBusiness /><h3>{t.experience}</h3></div><Accordion type="single" collapsible defaultValue="experience-0" className="experience-list">{experience.map((job, i) => <AccordionItem key={job.company} value={`experience-${i}`}><AccordionTrigger className="experience-trigger"><span><span className="job-period">{lang === 'tr' ? job.periodTr : job.periodEn}</span><strong>{job.company}</strong><span className="job-role">{lang === 'tr' ? job.roleTr : job.roleEn}</span></span></AccordionTrigger><AccordionContent><ul className="job-bullets">{(lang === 'tr' ? job.bulletsTr : job.bulletsEn).map((bullet) => <li key={bullet}>{bullet}</li>)}</ul><div className="tag-list">{job.stack.map((tech) => <Badge key={tech} variant="outline">{tech}</Badge>)}</div></AccordionContent></AccordionItem>)}</Accordion></div>
      <div><div className="minor-heading"><GraduationCap /><h3>{t.education}</h3></div><div className="education-list">{education.map((item) => <div key={item.period}><span className="job-period">{item.period}</span><h4>{lang === 'tr' ? item.schoolTr : item.schoolEn}</h4><p>{lang === 'tr' ? item.degreeTr : item.degreeEn}</p>{item.noteTr && <small>{lang === 'tr' ? item.noteTr : item.noteEn}</small>}</div>)}</div>
      <div className="minor-heading toolkit-heading"><Server /><h3>{t.skills}</h3></div><Accordion type="single" collapsible>{skillGroups.map((group, i) => <AccordionItem key={group.en} value={`skill-${i}`}><AccordionTrigger>{group[lang]}</AccordionTrigger><AccordionContent><div className="tag-list">{group.items.map((skill) => <Badge variant="secondary" key={skill}>{skill}</Badge>)}</div></AccordionContent></AccordionItem>)}</Accordion></div>
    </div><ResumeSelector />
  </div></section>
}

function ResumeSelector() {
  const { lang } = useSite()
  const t = portfolio[lang].about
  const [role, setRole] = useState('developer')
  const [language, setLanguage] = useState<Lang | null>(null)
  const effectiveLang = language ?? lang
  const file = cvFiles[(role === 'developer' ? 0 : 2) + (effectiveLang === 'en' ? 1 : 0)]
  return <div className="cv-panel" id="cv"><div className="cv-intro"><span className="cv-icon"><FileText /></span><div><h3>{t.cvTitle}</h3><p>{t.cvLead}</p></div></div>
    <div className="cv-controls"><div><span className="control-label" id="cv-role-label">{t.cvRole}</span><ToggleGroup type="single" value={role} onValueChange={(value) => { if (value) setRole(value) }} variant="outline" aria-labelledby="cv-role-label"><ToggleGroupItem value="developer">{t.developer}</ToggleGroupItem><ToggleGroupItem value="support">{t.support}</ToggleGroupItem></ToggleGroup></div>
      <div><span className="control-label" id="cv-language-label">{t.cvLanguage}</span><ToggleGroup type="single" value={effectiveLang} onValueChange={(value) => { if (value) setLanguage(value as Lang) }} variant="outline" aria-labelledby="cv-language-label"><ToggleGroupItem value="tr">TR</ToggleGroupItem><ToggleGroupItem value="en">EN</ToggleGroupItem></ToggleGroup></div>
      <div className="cv-actions"><Button asChild><a href={file.file} download><ArrowDownToLine />{t.download}</a></Button><a href={file.file} target="_blank" rel="noreferrer" className="text-link">{t.preview}<ArrowUpRight /></a></div>
    </div><p className="cv-note">{t.cvNote}</p>
  </div>
}
