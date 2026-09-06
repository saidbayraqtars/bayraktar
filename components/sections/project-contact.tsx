'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { useSite } from '@/components/providers'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { HandwritingText } from '@/components/ui/handwriting-text'
import { portfolio, profile } from '@/lib/content'

export function ProjectContact() {
  const { lang } = useSite()
  const t = portfolio[lang].contact
  const [notice, setNotice] = useState<'copied' | 'copyError' | 'drafted' | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])
  async function copyEmail() {
    if (timer.current) clearTimeout(timer.current)
    try { await navigator.clipboard.writeText(profile.email); setNotice('copied') } catch { setNotice('copyError') }
    timer.current = setTimeout(() => setNotice(null), 6000)
  }
  function createDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const service = String(data.get('service') ?? '')
    const message = String(data.get('message') ?? '').trim()
    const body = `${t.mailGreeting}\n\n${t.name}: ${name}\n${t.email}: ${email}\n${t.service}: ${service}\n\n${message}`
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(t.mailSubject + ' — ' + name)}&body=${encodeURIComponent(body)}`
    setNotice('drafted')
  }
  return <section className="contact-section section-pad" id="contact"><div className="shell">
    <div className="contact-heading"><p className="eyebrow">{t.eyebrow}</p><h2>{t.title}<span><HandwritingText text={t.handwriting} duration={1.3} height="1.2em" /></span></h2></div>
    <div className="contact-grid"><div className="contact-copy"><p className="contact-lead">{t.lead}</p><a className="big-email" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight /></a>
      <div className="contact-quick"><Button variant="outline" onClick={copyEmail}>{notice === 'copied' ? <Check /> : <Copy />}{t.copy}</Button><a href={`https://wa.me/${profile.phone.replace(/\D/g, '')}?text=${encodeURIComponent(t.whatsappText)}`} target="_blank" rel="noreferrer" className="text-link"><MessageCircle />{t.whatsapp}<ArrowUpRight /></a></div>
      <p className="direct-label">{t.direct}</p><div className="contact-direct"><a href={`tel:${profile.phone.replace(/\s/g, '')}`}><Phone />{profile.phone}</a><span><MapPin />{profile.location}</span><a href={profile.github} target="_blank" rel="noreferrer"><Github />GitHub<ArrowUpRight /></a><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin />LinkedIn<ArrowUpRight /></a></div>
      <div className="contact-notice" role="status" aria-live="polite">{notice && t[notice]}</div>
    </div><form className="project-form" onSubmit={createDraft}>
      <h3>{t.brief}</h3><FieldGroup>
        <div className="form-pair"><Field><FieldLabel htmlFor="contact-name">{t.name}</FieldLabel><Input id="contact-name" name="name" autoComplete="name" placeholder={t.namePlaceholder} required minLength={2} maxLength={80} /></Field><Field><FieldLabel htmlFor="contact-email">{t.email}</FieldLabel><Input id="contact-email" name="email" type="email" autoComplete="email" placeholder={t.emailPlaceholder} required maxLength={120} /></Field></div>
        <Field><FieldLabel htmlFor="contact-service">{t.service}</FieldLabel><select id="contact-service" name="service" className="native-select" defaultValue=""><option value="" disabled>{t.service}</option>{t.choice.map((choice) => <option value={choice} key={choice}>{choice}</option>)}</select></Field>
        <Field><FieldLabel htmlFor="contact-message">{t.message}</FieldLabel><Textarea id="contact-message" name="message" placeholder={t.messagePlaceholder} required minLength={10} maxLength={1200} rows={4} /></Field>
        <Button type="submit" size="lg"><Mail />{t.submit}<ArrowUpRight /></Button><p className="form-note">{t.note}</p>
      </FieldGroup>
    </form></div>
    <div className="faq-grid"><h3>{t.faqTitle}</h3><Accordion type="single" collapsible>{t.faqs.map((faq, index) => <AccordionItem value={`faq-${index}`} key={index}><AccordionTrigger>{faq.q}</AccordionTrigger><AccordionContent>{faq.a}</AccordionContent></AccordionItem>)}</Accordion></div>
  </div></section>
}
