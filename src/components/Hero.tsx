import heroFallback from '../../content/hero'
import { useContent } from '@/lib/content'
import { s3 } from '../config/media'
import LazyImage from './LazyImage'

export default function Hero() {
  const t = useContent('hero', heroFallback)
  const quoteWords = t.quote.split(' ')

  return (
    <div className="relative z-[2] flex h-screen min-h-[760px] items-center overflow-hidden max-lg:h-auto max-lg:min-h-[100svh] max-lg:flex-col max-lg:items-stretch" id="top">
      <div className="absolute inset-y-0 end-0 z-[1] flex w-[54%] items-end justify-center overflow-visible before:absolute before:inset-0 before:z-0 before:[background:radial-gradient(58%_60%_at_46%_64%,theme(colors.brand.soft),transparent_72%)] max-lg:static max-lg:h-[62vw] max-lg:min-h-[320px] max-lg:max-h-[460px] max-lg:w-full max-lg:after:absolute max-lg:after:inset-x-0 max-lg:after:bottom-0 max-lg:after:z-[2] max-lg:after:h-20 max-lg:after:bg-gradient-to-t max-lg:after:from-background max-lg:after:to-transparent max-lg:after:content-['']">
        <LazyImage
          priority
          src={s3('yaara-cutout.png')}
          alt="עו״ד יערה לוי"
          className="relative z-[1] h-[150%] w-auto max-w-full object-contain object-bottom drop-shadow-[0_24px_38px_rgba(20,16,14,.22)] max-lg:h-full"
        />
      </div>
      <div className="relative z-[2] flex w-full justify-start">
        <div className="hero-text relative flex w-[46%] flex-col justify-start pt-[56px] pb-[190px] ps-5 pe-[72px] before:absolute before:top-[14%] before:bottom-[14%] before:end-0 before:w-px before:[background:linear-gradient(to_bottom,transparent,theme(colors.brand.line),transparent)] max-lg:static max-lg:w-full max-lg:px-6 max-lg:pt-8 max-lg:pb-20 max-lg:before:hidden">
          <p className="hero-quote">
            {quoteWords.map((word, i) => (
              <span
                key={i}
                className="hero-quote-word"
                style={{ animationDelay: `${0.2 + i * 0.55}s` }}
              >
                {word}
                {i < quoteWords.length - 1 ? ' ' : ''}
              </span>
            ))}
          </p>
          <div className="mb-9 max-w-[42ch] text-[clamp(18px,2.1vw,32px)] leading-[1.65] text-ink-soft">
            {t.eyebrow_line1}{' '}
            <b className="font-semibold text-foreground">{t.eyebrow_line2_bold}</b>
          </div>
          <div className="mb-1 flex items-center gap-3.5 text-[13.5px] font-semibold uppercase tracking-[.1em] text-primary after:h-0.5 after:max-w-[80px] after:flex-1 after:bg-primary after:content-['']">
            {t.firm_label}
          </div>
          <h1 className="mb-[30px] font-serif text-[clamp(68px,8.2vw,120px)] font-black leading-[.93] tracking-[-.025em] text-foreground max-lg:text-[64px]">
            {t.name}
          </h1>
          <div className="inline-flex self-start bg-primary px-6 py-[13px] text-[13px] font-semibold uppercase tracking-[.08em] text-primary-foreground">
            {t.badge}
          </div>
        </div>
      </div>
    </div>
  )
}
