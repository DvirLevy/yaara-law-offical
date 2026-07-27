import pillarsFallback from '../../content/pillars'
import { useContent } from '@/lib/content'
import { Container } from '@/components/ui/container'

export default function Pillars() {
  const PILLARS = useContent('pillars', pillarsFallback)

  return (
    <div className="bg-background py-20 max-lg:py-12">
      <Container>
        <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-1 max-lg:gap-4">
          {PILLARS.map((p, i) => (
            <div
              key={i}
              className="group relative flex flex-col items-center overflow-hidden bg-card px-12 py-16 text-center max-lg:px-6 max-lg:py-12"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 [background:linear-gradient(135deg,theme(colors.brand.soft)_0%,transparent_55%)] group-hover:opacity-100" />
              <div className="relative mb-3.5 flex items-center gap-2.5 text-[10.5px] font-semibold uppercase tracking-[.42em] text-primary before:h-0.5 before:w-[18px] before:bg-primary before:content-['']">
                {p.label}
              </div>
              <h3 className="relative mb-[18px] font-serif text-[clamp(22px,2.2vw,30px)] font-bold leading-[1.2] text-foreground">
                <span>{p.title_line1}</span>
                <br />
                <span>{p.title_line2}</span>
              </h3>
              <p className="relative mt-auto max-w-[30ch] text-[14.5px] leading-[1.8] text-ink-soft">{p.desc}</p>
              <div className="relative mt-[30px] h-0.5 w-8 bg-border transition-all duration-300 group-hover:w-14 group-hover:bg-primary" />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}
