import { useEffect, useRef } from 'react'

import { useTestimonials, type Testimonial } from '../data/testimonials'
import { Container } from '@/components/ui/container'
import { SectionLabel, SectionTitle } from '@/components/ui/section-heading'

function TestiCard({ t }: { t: Testimonial }) {
  return (
    <article className="flex w-[400px] flex-shrink-0 flex-col gap-4 border border-white/10 border-t-primary bg-white/[.08] p-[30px] transition-colors hover:bg-white/[.13]" dir="rtl">
      <div className="text-[13px] tracking-[2px] text-[#c8884a]">★★★★★</div>
      <p className="flex-1 font-serif text-[17px] font-normal leading-[1.72] text-[#f0eee9] before:me-1 before:align-[-16px] before:text-[44px] before:leading-none before:text-brand-3 before:content-['„']">
        {t.q}
      </p>
      <div className="flex items-center gap-3 border-t border-white/10 pt-4">
        <div className="grid h-9 w-9 place-items-center border-[1.5px] border-brand-line bg-brand-soft font-serif text-[15px] font-bold text-[#c88888]">
          {t.n[0]}
        </div>
        <div>
          <b className="block text-sm font-semibold text-[#f4f4f4]">{t.n}</b>
          <span className="text-[11.5px] text-white/45">{t.r}</span>
        </div>
      </div>
    </article>
  )
}

export default function Testimonials() {
  const { meta: TESTIMONIALS_META, items: TESTIMONIALS } = useTestimonials()
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Duplicate cards for seamless loop
    const track = trackRef.current
    if (!track) return
    const clone = track.innerHTML
    track.innerHTML += clone
  }, [TESTIMONIALS])

  return (
    <div className="bg-charcoal py-[100px]" id="testimonials">
      <Container>
        <div className="mb-[52px] flex flex-wrap items-end justify-between gap-10">
          <div>
            <SectionLabel className="text-white/50 before:bg-white/40">{TESTIMONIALS_META.label}</SectionLabel>
            <SectionTitle className="mt-[22px] text-[#f4f4f4]">
              {TESTIMONIALS_META.title_plain} <em className="text-[#c88888]">{TESTIMONIALS_META.title_em}</em>
            </SectionTitle>
          </div>
          <div className="flex items-center gap-3 text-[13.5px] text-white/50">
            <span className="text-[15px] tracking-[1px] text-[#c8884a]">★★★★★</span>
            <div>
              <b className="font-serif text-[22px] font-bold text-[#f4f4f4]">{TESTIMONIALS_META.google_rating}</b> ·{' '}
              {TESTIMONIALS_META.google_label}
            </div>
          </div>
        </div>
      </Container>
      <div className="marquee-mask relative overflow-hidden">
        <div className="flex w-max animate-marquee gap-5 [direction:ltr] hover:[animation-play-state:paused]" ref={trackRef}>
          {TESTIMONIALS.map((t, i) => (
            <TestiCard key={i} t={t} />
          ))}
        </div>
      </div>
    </div>
  )
}
