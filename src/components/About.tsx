import aboutFallback from '../../content/about'
import { useContent } from '@/lib/content'
import { s3 } from '../config/media'
import { Container } from '@/components/ui/container'
import { SectionLabel, SectionTitle } from '@/components/ui/section-heading'
import LazyImage from './LazyImage'

export default function About() {
  const t = useContent('about', aboutFallback)

  return (
    <div className="bg-card py-[110px] max-lg:py-20" id="about">
      <Container>
        <SectionLabel>{t.label}</SectionLabel>
        <SectionTitle className="mt-[18px]">
          {t.title_line1} <em>{t.title_line2_em}</em>
          <br />
          {t.title_line3}
        </SectionTitle>
        <div className="mt-[18px] grid grid-cols-[.78fr_1.22fr] items-start gap-20 max-lg:grid-cols-1 max-lg:gap-10">
          <div className="relative aspect-[4/5] overflow-hidden bg-ink-faint/40 shadow-card-lg after:pointer-events-none after:absolute after:inset-0 after:[background:linear-gradient(180deg,transparent_55%,rgba(15,18,20,.4)_100%)] max-lg:max-w-[360px]">
            <LazyImage
              src={s3('yaara-portrait.jpg')}
              alt="Adv. Yaara Levy"
              className="h-full w-full object-cover object-[center_18%]"
            />
            <div className="absolute bottom-0 start-0 z-[3] bg-primary px-6 py-4">
              <b className="block font-serif text-xl font-bold leading-none text-white">{t.portrait_name}</b>
              <span className="mt-[5px] block text-[10px] uppercase tracking-[.3em] text-white/75">{t.portrait_role}</span>
            </div>
          </div>
          <div>
            <p className="mb-[1.2em] max-w-[54ch] text-xl leading-[1.85] text-foreground">{t.p1}</p>
            <p className="mb-[1.2em] max-w-[54ch] text-lg leading-[1.85] text-ink-soft">{t.p2}</p>
            <div className="mt-11 flex items-center gap-5 border-t border-hairline pt-[26px]">
              <div className="font-serif text-[22px] italic text-foreground">{t.sign_name}</div>
              <div className="border-e-2 border-primary pe-[18px] text-[11.5px] uppercase tracking-[.2em] text-ink-soft">
                {t.sign_role}
              </div>
            </div>
            <div className="mt-9 flex items-center gap-7 border-e-2 border-primary pe-[22px]">
              <div className="flex-1">
                <div className="mb-3 text-[11px] font-semibold uppercase tracking-[.38em] text-primary">
                  {t.phrase_label}
                </div>
                <p className="m-0 font-serif text-[clamp(15px,1.55vw,19px)] leading-[1.65] text-foreground">
                  {t.phrase_quote}
                </p>
              </div>
              <svg className="flex-shrink-0 opacity-90" width="52" height="52" viewBox="0 0 44 44" fill="none" aria-hidden="true">
                {/* old low-rise, left */}
                <path d="M3 40 L3 27 L9 22 L15 27 L15 40 Z" fill="rgba(125,40,37,.06)" stroke="rgba(125,40,37,.3)" strokeWidth="1.1" strokeLinejoin="round" />
                <line x1="6" y1="31" x2="6" y2="34" stroke="rgba(125,40,37,.25)" strokeWidth=".8" />
                <line x1="11" y1="31" x2="11" y2="34" stroke="rgba(125,40,37,.25)" strokeWidth=".8" />
                {/* renewed tower, right */}
                <path d="M23 40 L23 8 L37 8 L37 40 Z" fill="rgba(125,40,37,.07)" stroke="rgba(125,40,37,.4)" strokeWidth="1.2" strokeLinejoin="round" />
                <line x1="27" y1="13" x2="27" y2="36" stroke="rgba(125,40,37,.2)" strokeWidth=".7" strokeDasharray="1.6 3" />
                <line x1="33" y1="13" x2="33" y2="36" stroke="rgba(125,40,37,.2)" strokeWidth=".7" strokeDasharray="1.6 3" />
                <line x1="23" y1="17" x2="37" y2="17" stroke="rgba(125,40,37,.18)" strokeWidth=".7" />
                <line x1="23" y1="24" x2="37" y2="24" stroke="rgba(125,40,37,.18)" strokeWidth=".7" />
                <line x1="23" y1="31" x2="37" y2="31" stroke="rgba(125,40,37,.18)" strokeWidth=".7" />
                {/* ascending path from old roof to new rooftop marker */}
                <path d="M16 25 C19 21 21 17 24 13" stroke="rgba(125,40,37,.65)" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="2.5 2.5" />
                <circle cx="30" cy="4.5" r="2.5" fill="rgba(125,40,37,.55)" />
                <line x1="30" y1="2" x2="30" y2="0" stroke="rgba(125,40,37,.5)" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="30" y1="8" x2="30" y2="6.7" stroke="rgba(125,40,37,.5)" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
