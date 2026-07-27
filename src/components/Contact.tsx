import { useState, type FormEvent, type ReactNode } from 'react'
import { Phone, Smartphone, Mail, MapPin, Clock } from 'lucide-react'

import contactFallback from '../../content/contact'
import { useContent } from '@/lib/content'
import { Container } from '@/components/ui/container'
import { SectionLabel, SectionTitle, SectionLede } from '@/components/ui/section-heading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export default function Contact() {
  const t = useContent('contact', contactFallback)
  const [msg, setMsg] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = e.currentTarget
    const name = (f.elements.namedItem('name') as HTMLInputElement).value.trim()
    const phone = (f.elements.namedItem('phone') as HTMLInputElement).value.trim()
    const message = (f.elements.namedItem('message') as HTMLTextAreaElement).value.trim()
    if (!name || !phone || !message) {
      setMsg(t.error_msg)
      return
    }
    setMsg(t.success_msg)
    f.reset()
  }

  return (
    <div className="bg-card py-[120px] max-lg:py-20" id="contact">
      <Container>
        <SectionLabel>{t.label}</SectionLabel>
        <SectionTitle className="mt-[22px]">
          {t.title_plain} <em>{t.title_em}</em>
        </SectionTitle>
        <SectionLede>{t.lede}</SectionLede>

        <div className="mt-[18px] grid grid-cols-[1.1fr_.9fr] items-start gap-20 max-lg:grid-cols-1 max-lg:gap-11">
          <form className="flex flex-col gap-[22px]" onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-2 gap-[22px] max-lg:grid-cols-1">
              <div className="flex flex-col gap-[7px]">
                <Label htmlFor="f-name">{t.name_label}</Label>
                <Input id="f-name" name="name" type="text" placeholder={t.name_placeholder} required
                  className="rounded-none border-0 border-b bg-transparent px-0 py-[13px] focus-visible:bg-transparent" />
              </div>
              <div className="flex flex-col gap-[7px]">
                <Label htmlFor="f-phone">{t.phone_label}</Label>
                <Input id="f-phone" name="phone" type="tel" placeholder={t.phone_placeholder} required
                  className="rounded-none border-0 border-b bg-transparent px-0 py-[13px] focus-visible:bg-transparent" />
              </div>
            </div>
            <div className="flex flex-col gap-[7px]">
              <Label htmlFor="f-email">{t.email_label}</Label>
              <Input id="f-email" name="email" type="email" placeholder={t.email_placeholder}
                className="rounded-none border-0 border-b bg-transparent px-0 py-[13px] focus-visible:bg-transparent" />
            </div>
            <div className="flex flex-col gap-[7px]">
              <Label htmlFor="f-msg">{t.message_label}</Label>
              <Textarea id="f-msg" name="message" placeholder={t.message_placeholder} required
                className="rounded-none px-0 py-[13px]" />
            </div>
            <Button type="submit" className="self-start">
              {t.submit}
            </Button>
            {msg && <div className="border border-brand-line bg-brand-soft px-[18px] py-3.5 text-[13.5px] text-primary">{msg}</div>}
          </form>

          <aside className="flex flex-col gap-[26px] bg-background p-10 shadow-card">
            <InfoItem icon={<Phone className="h-[19px] w-[19px]" />} label={t.office_phone_label}>
              <a href={`tel:${t.office_phone.replace(/-/g, '')}`} dir="ltr" className="hover:text-primary">
                {t.office_phone}
              </a>
            </InfoItem>
            <hr className="border-hairline" />
            <InfoItem icon={<Smartphone className="h-[19px] w-[19px]" />} label={t.mobile_label}>
              <a href={`tel:${t.mobile.replace(/-/g, '')}`} dir="ltr" className="hover:text-primary">
                {t.mobile}
              </a>
            </InfoItem>
            <hr className="border-hairline" />
            <InfoItem icon={<Mail className="h-[19px] w-[19px]" />} label={t.email_label2}>
              <a href={`mailto:${t.email}`} dir="ltr" className="hover:text-primary">
                {t.email}
              </a>
            </InfoItem>
            <hr className="border-hairline" />
            <InfoItem icon={<MapPin className="h-[19px] w-[19px]" />} label={t.address_label}>
              <p>{t.address}</p>
            </InfoItem>
            <hr className="border-hairline" />
            <InfoItem icon={<Clock className="h-[19px] w-[19px]" />} label={t.hours_label}>
              <p>{t.hours}</p>
            </InfoItem>

            <div className="relative grid aspect-video place-items-center overflow-hidden border border-hairline bg-panel-2">
              <div className="grid h-[42px] w-[42px] animate-pin-pulse place-items-center rounded-full bg-primary text-white">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="absolute bottom-4 end-4 border border-hairline bg-card px-4 py-2.5 text-xs text-ink-soft shadow-card">
                <b className="mb-0.5 block font-serif text-[13px] font-bold text-foreground">{t.map_title}</b>
                {t.map_address}
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  )
}

function InfoItem({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <div className="grid h-[38px] w-[38px] flex-shrink-0 place-items-center text-primary">{icon}</div>
      <div className="min-w-0 [&_a]:font-serif [&_a]:text-[17px] [&_a]:text-foreground [&_p]:font-serif [&_p]:text-[17px] [&_p]:font-normal [&_p]:leading-[1.5] [&_p]:text-foreground">
        <h4 className="mb-[5px] font-sans text-[10.5px] font-medium uppercase tracking-[.3em] text-ink-soft">{label}</h4>
        {children}
      </div>
    </div>
  )
}
