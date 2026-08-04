import { useState, type FormEvent } from 'react'

import ctaFallback from '../../content/cta'
import { useContent } from '@/lib/content'
import { submitContactForm } from '@/lib/contactSubmit'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'

interface Props {
  onPrivacyOpen: () => void
}

export default function CtaCard({ onPrivacyOpen }: Props) {
  const t = useContent('cta', ctaFallback)
  const [msg, setMsg] = useState('')
  const [consent, setConsent] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = e.currentTarget
    const name = (f.elements.namedItem('name') as HTMLInputElement).value.trim()
    const phone = (f.elements.namedItem('phone') as HTMLInputElement).value.trim()
    const email = (f.elements.namedItem('email') as HTMLInputElement).value.trim()
    if (!name || !phone) {
      setMsg(t.error_msg)
      return
    }
    setSubmitting(true)
    try {
      await submitContactForm({ fullName: name, email, phone, message: '', subject: t.email_subject })
      setMsg(t.success_msg)
      f.reset()
    } catch {
      setMsg(t.submit_error_msg)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="relative z-[5] mt-[calc(clamp(-130px,-9vw,-70px)_+_3px)] pb-1.5 max-lg:mt-[-44px]">
      <Container>
        <div className="relative bg-card px-14 pb-[38px] pt-[58px] shadow-card-lg before:pointer-events-none before:absolute before:inset-[11px] before:border before:border-brand-line max-lg:px-[22px] max-lg:pb-7 max-lg:pt-10 max-lg:before:inset-2">
          <div className="absolute top-0 end-[46px] -translate-y-1/2 whitespace-nowrap bg-primary px-6 py-[11px] text-xs font-semibold tracking-[.14em] text-primary-foreground shadow-card max-lg:end-[18px] max-lg:px-4 max-lg:py-2 max-lg:text-[10.5px] max-lg:tracking-[.1em]">
            {t.tab}
          </div>
          <h2 className="mb-3.5 mt-1 max-w-[24ch] font-serif text-[clamp(28px,3.5vw,48px)] font-bold leading-[1.12] text-foreground">
            {t.title}
          </h2>
          <p className="mb-[34px] max-w-[62ch] text-[clamp(15px,1.5vw,18.5px)] leading-[1.7] text-ink-soft">
            {t.sub_plain} <b className="font-semibold text-foreground">{t.sub_bold}</b>
          </p>
          <form className="flex flex-wrap items-stretch gap-3.5" onSubmit={handleSubmit} noValidate>
            <Input name="name" type="text" aria-label={t.name_placeholder} placeholder={t.name_placeholder} required className="min-w-0 flex-[1_1_180px]"/>
            <Input name="phone" type="tel" aria-label={t.phone_placeholder} placeholder={t.phone_placeholder} required className="min-w-0 flex-[1_1_180px]" />
            <Input name="email" type="email" aria-label={t.email_placeholder} placeholder={t.email_placeholder} className="min-w-0 flex-[1_1_180px]" />
            <Button type="submit" className="flex-none" disabled={submitting}>
              {t.submit}
            </Button>
          </form>
          <label className="mt-[22px] flex flex-wrap items-center justify-center gap-2.5 text-[13px] text-ink-soft">
            <Checkbox checked={consent} onCheckedChange={(c) => setConsent(c === true)} />
            <span>
              {t.consent_pre}{' '}
              <a
                href="#"
                className="text-primary underline underline-offset-[3px]"
                onClick={(e) => {
                  e.preventDefault()
                  onPrivacyOpen()
                }}
              >
                {t.consent_link}
              </a>{' '}
              {t.consent_post}
            </span>
          </label>
          {msg && (
            <div role="status" aria-live="polite" className="mt-3.5 min-h-px text-center text-sm font-medium text-primary">
              {msg}
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}
