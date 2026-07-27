import { useAreas } from '../data/areas'
import { Container } from '@/components/ui/container'
import { SectionLabel, SectionTitle, SectionLede } from '@/components/ui/section-heading'

export default function Areas() {
  const { meta: AREAS_META, items: AREAS } = useAreas()

  return (
    <div className="bg-background py-[120px] max-lg:py-20" id="areas">
      <Container>
        <SectionLabel>{AREAS_META.label}</SectionLabel>
        <SectionTitle className="mt-[22px]">
          {AREAS_META.title_plain} <em>{AREAS_META.title_em}</em>
        </SectionTitle>
        <SectionLede>{AREAS_META.lede}</SectionLede>
        <div className="mt-[52px] grid grid-cols-3 gap-px overflow-hidden border border-hairline bg-hairline max-lg:grid-cols-2 max-sm:grid-cols-1">
          {AREAS.map((a, i) => (
            <article
              key={i}
              className="group relative flex min-h-[210px] flex-col gap-3.5 bg-card p-8 transition-colors hover:bg-panel-2"
            >
              <div className="text-xs font-semibold tracking-[.18em] text-primary">{a.num}</div>
              <div className="font-serif text-[22px] font-bold leading-[1.2] text-foreground">{a.title}</div>
              <div className="mt-auto text-[13.5px] leading-[1.75] text-ink-soft">{a.desc}</div>
              <div className="absolute bottom-8 start-8 h-0.5 w-5 bg-primary opacity-35 transition-all duration-300 group-hover:w-[42px] group-hover:opacity-100" />
            </article>
          ))}
        </div>
      </Container>
    </div>
  )
}
